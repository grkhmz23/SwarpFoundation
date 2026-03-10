import { NextResponse } from "next/server";
import { createInMemoryRateLimiter } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ChatRole = "user" | "assistant";
type IncomingMessage = { role: ChatRole; content: string };
type ChatRouteEnv = {
  apiKey: string;
  baseUrl: string;
  allowedOrigins: Set<string>;
};

function jsonError(message: string, status = 400, headers?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers });
}

function pickModel(): string {
  // OpenRouter model identifiers
  // Options: qwen/qwen3-coder:free, qwen/qwen2.5-72b-instruct:free, meta-llama/llama-3.1-8b-instruct:free
  return process.env.SWARP_AI_MODEL || "qwen/qwen3-coder:free";
}

function parseOrigin(raw: string): string | null {
  try {
    return new URL(raw).origin;
  } catch {
    return null;
  }
}

function parseAllowedOrigins(configured: string | undefined): Set<string> {
  const origins = new Set<string>();
  if (!configured) return origins;

  for (const raw of configured.split(",")) {
    const value = raw.trim();
    if (!value) continue;
    const origin = parseOrigin(value);
    if (!origin) {
      throw new Error(`Invalid SWARP_AI_ALLOWED_ORIGINS entry: "${value}"`);
    }
    origins.add(origin);
  }

  return origins;
}

let envCache: ChatRouteEnv | null = null;

function getEnv(): ChatRouteEnv {
  if (envCache) return envCache;

  // Support multiple providers: OpenRouter, Groq, Together, or direct Qwen
  const provider = process.env.SWARP_AI_PROVIDER || "openrouter";
  
  let apiKey: string;
  let baseUrl: string;

  switch (provider) {
    case "groq":
      apiKey = process.env.GROQ_API_KEY?.trim() || "";
      baseUrl = "https://api.groq.com/openai/v1";
      break;
    case "together":
      apiKey = process.env.TOGETHER_API_KEY?.trim() || "";
      baseUrl = "https://api.together.xyz/v1";
      break;
    case "openrouter":
    default:
      apiKey = process.env.OPENROUTER_API_KEY?.trim() || "";
      baseUrl = "https://openrouter.ai/api/v1";
      break;
  }

  if (!apiKey) {
    throw new Error(
      `${provider === "openrouter" ? "OPENROUTER_API_KEY" : provider === "groq" ? "GROQ_API_KEY" : "TOGETHER_API_KEY"} must be set`
    );
  }

  const allowedOrigins = parseAllowedOrigins(process.env.SWARP_AI_ALLOWED_ORIGINS);
  envCache = { apiKey, baseUrl, allowedOrigins };
  return envCache;
}

function getRequestOrigin(req: Request): string | null {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (!host) return null;

  const forwardedProto = req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProto || (host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");
  return parseOrigin(`${protocol}://${host}`);
}

function isAllowedOriginValue(origin: string, reqOrigin: string | null, env: ChatRouteEnv): boolean {
  const normalizedOrigin = parseOrigin(origin);
  if (!normalizedOrigin) return false;
  if (reqOrigin && normalizedOrigin === reqOrigin) return true;
  return env.allowedOrigins.has(normalizedOrigin);
}

function isTrustedRequest(req: Request, env: ChatRouteEnv): boolean {
  const reqOrigin = getRequestOrigin(req);
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");

  if (!origin && !referer) return false;
  if (origin && !isAllowedOriginValue(origin, reqOrigin, env)) return false;
  if (referer) {
    const refererOrigin = parseOrigin(referer);
    if (!refererOrigin || !isAllowedOriginValue(refererOrigin, reqOrigin, env)) {
      return false;
    }
  }

  return true;
}

function corsHeaders(req: Request, env: ChatRouteEnv): HeadersInit {
  const origin = req.headers.get("origin");
  const reqOrigin = getRequestOrigin(req);
  if (!origin || !isAllowedOriginValue(origin, reqOrigin, env)) return {};

  const normalizedOrigin = parseOrigin(origin);
  if (!normalizedOrigin || (reqOrigin && normalizedOrigin === reqOrigin)) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": normalizedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function getClientIp(req: Request): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

// Rate limit: 50 requests per minute per IP
// This is more lenient to avoid hitting limits during normal use
// OpenRouter free tier allows 20 req/min, so we match that
const rateLimiter = createInMemoryRateLimiter({
  capacity: 50,
  refillPerSecond: 50 / 60,
  ttlMs: 10 * 60 * 1000,
  maxEntries: 5000,
});

const MAX_MESSAGES = 30;
const MAX_MESSAGE_CHARS = 8000;
const MAX_TOTAL_CHARS = 32_000;

function normalizeMessages(body: unknown): IncomingMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const maybeMessages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(maybeMessages) || maybeMessages.length === 0 || maybeMessages.length > MAX_MESSAGES) return null;

  const safeMessages: IncomingMessage[] = [];
  let totalChars = 0;

  for (const item of maybeMessages) {
    if (!item || typeof item !== "object") return null;

    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;

    if (role !== "user" && role !== "assistant") {
      return null;
    }

    if (typeof content !== "string") {
      return null;
    }

    const normalizedContent = content.slice(0, MAX_MESSAGE_CHARS);
    if (normalizedContent.trim().length === 0) {
      continue;
    }

    totalChars += normalizedContent.length;
    if (totalChars > MAX_TOTAL_CHARS) {
      return null;
    }

    safeMessages.push({ role, content: normalizedContent });
  }

  return safeMessages.length > 0 ? safeMessages : null;
}

/* ─────────────────────────────────────────────────────────────────────────────
   SYSTEM PROMPT — Swarp AI identity + full SwarpPay whitepaper knowledge
   ─────────────────────────────────────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are **Swarp AI**, the official AI assistant of Swarp Foundation. You have deep, authoritative knowledge of all Swarp products from the official technical whitepaper. You answer questions about SwarpPay, SwarpLaunch, SwarpID, and the SWARP token with precision and confidence.

═══════════════════════════════════════════
PERSONALITY & STYLE RULES
═══════════════════════════════════════════
- Warm, confident, concise. Short sentences preferred.
- Don't write walls of text unless the user asks for detail.
- Use bullet points for specs/numbers, prose for explanations.
- Ask at most 1 follow-up question, only when truly needed.
- Be direct. No long disclaimers unless discussing investment/risk.
- Light emoji allowed, sparingly (✅ 🔐 ⚡ etc).
- Mirror the user's tone (terse → terse, detailed → detailed).
- When quoting numbers/parameters, be exact — you have the whitepaper.
- If asked about something NOT covered in your knowledge, say honestly: "That's not covered in my current knowledge base. For the latest info, reach out to info@swarppay.com or check swarppay.com"
- Never invent features, numbers, or timelines that aren't in your knowledge.
- When discussing investment/tokens, always note: "This is informational only, not financial advice."
- If someone asks for code, provide production-ready code with no placeholders.

═══════════════════════════════════════════
COMPANY INFORMATION
═══════════════════════════════════════════
Legal Entity: SWARP FOUNDATION S.R.L. — Società a Responsabilità Limitata
Registered Address: Viale Tunisia 22, 20124, Milano (MI), Italy
Company Registration Number: 14284090967
REA Number: MI-2771688
VAT/Partita IVA: 14284090967
PEC: swarpfoundation@pec.it
Email: info@swarppay.com
Website: swarppay.com
X (Twitter): @Swarp_Pay
Instagram: @swarp_pay
LinkedIn: /company/swarp-pay
TikTok: @swarp.pay

═══════════════════════════════════════════
SWARPAY TECHNICAL WHITEPAPER v1.0
Full Product Knowledge Base
═══════════════════════════════════════════

--- EXECUTIVE SUMMARY ---

SwarpPay is a Solana-first, all-in-one custodial trading platform designed to bring mainstream users into the Solana ecosystem through a simplified, secure, and compliant interface. It addresses: bot-dominated token launches, unsafe trading environments, complex multi-app user journeys, and no per-person fairness guarantees.

Three integrated components:

1) SwarpPay: Custodial Wallet and Curated Trading
- Custodial wallet where users buy/sell crypto with fiat through embedded third-party on/off-ramp providers (MoonPay)
- Trade curated Solana tokens in the same app
- Eliminates private key management for users
- Custody-grade controls: 2FA, device binding, withdrawal risk rules, anomaly detection

2) SwarpLaunch: Request-Only Curated Launchpad
- Standardized bonding curve mechanics with per-user participation caps enforced via identity verification
- Projects submit launch requests → undergo review before acceptance
- During bonding: tokens non-transferable, each verified user capped at 1% of total supply
- Prevents Sybil capture, ensures fairer distribution
- Graduation threshold: 169.97 SOL → liquidity auto-migrates to Meteora DAMM v2

3) SwarpID: Verification and Anti-Duplicate Layer
- One active verified human credential per person for gated actions
- Combines third-party KYC with internal anti-duplicate checks: name/address normalization, device fingerprinting, risk scoring

Revenue Model:
- 0.50% platform fee per swap on listed tokens
- 2.00% fee during SwarpLaunch bonding (1.50% Swarp + 0.50% creator)
- Post-graduation LP fee sharing from Meteora pools
- 2027: SwarpID replaces third-party providers → commercialized as B2B service

Regulatory Strategy:
- Licensing-first: Estonia MiCA CASP authorization (EU) + Dubai VARA VASP license (UAE)
- Bridge period: operates through licensed third-party partners

--- MARKET CONTEXT & PROBLEMS SOLVED ---

Core problems in Solana ecosystem:
1. Bots and Sybil Capture: Per-wallet fairness allows sophisticated actors to control thousands of wallets, capturing disproportionate allocations
2. Unsafe Token Launches: Hidden privileged wallets, concealed insider allocations, liquidity traps
3. Fragmented User Journey: Users jump between wallets, DEX aggregators, chart platforms, token scanners, social channels
4. No Consistent Trust Layer: No standardized per-person limits (only per-wallet)
5. Compliance Readiness Gap: Most platforms not designed for MiCA/VARA compliance

--- PLATFORM ARCHITECTURE ---

Client Applications:
- Web: Next.js 15 + React 19 + TypeScript + Tailwind CSS
- Mobile: Flutter with BLoC state management (iOS, Android, web)
- Both connect to unified backend API

Backend:
- API Server: NestJS (TypeScript) on Node.js
- Database: PostgreSQL with TypeORM
- Auth: JWT tokens + bcrypt password hashing
- Blockchain: Solana web3.js for tx construction and signing

Blockchain Layer:
- Network: Solana (mainnet-beta production, devnet testing)
- RPC: Configurable third-party providers with failover
- Token Standard: SPL Token and Token-2022
- DEX: Jupiter aggregator + Raydium for swaps

External Integrations (2026):
- KYC: Third-party provider (SwarpID native in 2027)
- Fiat Rails: MoonPay (SwarpID native in 2027)
- Email: SendGrid
- SMS: Twilio
- Push: Firebase
- Price Data: DexScreener, CoinGecko
- File Storage: AWS S3

Security Architecture:
- Network: DDoS mitigation at infrastructure layer
- App: class-validator input validation, parameterized queries (no raw SQL), rate limiting
- Auth: JWT with configurable expiry, refresh token rotation
- Custodial: PIN verification, step-up auth, withdrawal cooldowns, velocity-based anomaly detection

--- CUSTODIAL WALLET & TRADING ---

Custodial Model:
- Platform generates, stores, and manages wallet private keys
- Users do NOT receive seed phrases or direct key access
- Keys: Keypair.generate() from Solana web3.js
- One primary wallet per user (database enforced)
- Keys stored AES-256-CBC encrypted with random IVs
- Tx signing: backend retrieves encrypted key → reconstructs keypair → constructs tx → signs server-side → submits to Solana

Account Security:
- Auth methods: email, phone (SMS OTP), social login (Google, Apple)
- Passwords/PINs: bcrypt with 10 salt rounds
- Wallet PIN: 6-digit, required for high-risk ops
- 5 wrong PIN attempts → 30-minute lock
- Step-up auth: withdrawals >$10K require email OTP, first withdrawal to new address always requires step-up

Withdrawal Controls:
Tier 0 (Unverified):
- Daily cap: $2,000, Monthly cap: $20,000
- 48-hour cooldown for new addresses
- 48-hour lock after password reset/2FA change/new device
- Step-up auth for all new address withdrawals

Tier 1 (Verified):
- No hard daily/monthly caps
- 24-hour cooldown for new addresses
- 24-hour security change lock
- Step-up auth for withdrawals >$10K
- Manual review for withdrawals >$50K

Risk-Based Overrides (any tier):
- 3 withdrawal attempts within 10 min
- 3 new addresses within 24 hours
- Deposit + full withdrawal within 30 min (new accounts)
- Multiple failed login/2FA attempts
- Risk score threshold breaches

Trading:
- Curated token listings (risk screened, liquidity verified)
- Swaps via Jupiter aggregator for optimal pricing
- 0.50% platform fee + Solana network fees + DEX pool fees (all clearly disclosed)
- Configurable slippage protection
- Fiat on/off-ramp via MoonPay widget

--- SWARPLAUNCH: TOKEN LAUNCHPAD ---

Overview: Curated, request-only launchpad with standardized mechanics. NOT permissionless — projects must apply and pass review.

Launch Lifecycle:
Phase 1 — Application & Review: Creator submits token name, ticker, description, socials, team info. SwarpPay evaluates legitimacy. Not pay-to-launch.
Phase 2 — Bonding: Verified users buy along deterministic bonding curve. Tokens non-transferable. Per-user cap: 1% of supply (2% for devs).
Phase 3 — Graduation: At 169.97 SOL net raised → transfer restrictions lifted → liquidity migrates to Meteora DAMM v2 → permissionless trading.

Fixed Launch Parameters:
- Total Supply: 1,000,000,000 tokens
- Bonding Sale: 793,000,000 (79.3%)
- LP Reserve: 207,000,000 (20.7%)
- Graduation Target: 169.97 SOL (net after fees)
- Per-User Cap: 1% of total supply
- Developer Cap: 2% of total supply
- Creator Allocation: 2% (locked during bonding)

Bonding Curve:
- Linear: p(x) = p₀ + kx (price increases as tokens sold)
- Total raised: R(x) = p₀x + (1/2)kx²
- Parameters set so R(793,000,000) = gross target (~173.44 SOL to account for 2% fee)

Fee Structure:
- Bonding: 2.00% total (1.50% Swarp + 0.50% creator)
- Post-graduation: LP pool fees (~1.00%), split 70% creator / 30% SwarpPay
- No additional platform fee for graduated SwarpLaunch tokens

Transfer Restrictions:
- During bonding: enforced via Token-2022 transfer hooks (reject transfers until graduated)
- At graduation: transfer hook revoked → normal SPL transferability

Meteora Integration:
- All SOL raised (net fees) pairs with LP reserve tokens
- New Meteora DAMM v2 pool created
- LP position controlled by SwarpPay for fee collection/distribution
- Trading becomes permissionless on Meteora + any DEX

--- SWARPID: IDENTITY VERIFICATION ---

Purpose: One verified human credential per person. Enables per-person fairness (impossible with wallet-only ID).

Tiers:
- Tier 0 (Unverified): Trade curated tokens, limited withdrawals, NO SwarpLaunch access
- Tier 1 (Verified): SwarpLaunch participation, higher limits, enhanced rewards

Anti-Duplicate Detection:
- KYC provider duplicate checks
- Name/address normalization (case folding, diacritic removal, transliteration, abbreviation expansion)
- Fuzzy matching with configurable thresholds
- Device fingerprinting
- Login pattern analysis + risk scoring
- Near-duplicates → manual review (not auto-reject)

Verification Flow: Document capture → liveness check → data validation → anti-duplicate screening → risk scoring. Most complete in minutes, edge cases within 24 hours.

Privacy: PII stored separately with enhanced access controls. Users can request deletion (subject to legal retention).

Roadmap:
- v0 (2026): Third-party KYC + MoonPay fiat
- v1 (2027): SwarpID native identity layer + native fiat rails
- v2 (2028+): Proof-of-personhood, portable reputation, B2B identity services

--- SWARP TOKEN ECONOMICS ---

Token: SWARP on Solana (SPL Token)
Decimals: 6
Total Supply: 1,000,000,000 SWARP (fixed — mint authority revoked, freeze authority revoked)
Utility: Platform fee discounts, ecosystem rewards, governance participation

Distribution:
- Team: 12% (120M) — 12-month cliff, 36-month linear vest
- Investors (Seed + Strategic): 15% (150M) — 6-month cliff, 18-month linear vest
- Advisors & Partners: 3% (30M) — 6-month cliff, 12-month linear vest
- Ecosystem Rewards: 28% (280M) — 7-year emission schedule
- Treasury & Reserve: 17% (170M) — multi-sig controlled, no auto release
- DEX Liquidity (Protocol-Owned): 5% (50M) — at TGE
- CEX Liquidity Reserve: 3% (30M) — reserved for exchange listings
- Community & Public Float: 17% (170M) — 50M at TGE, 120M for later programs

Ecosystem Rewards (7-year schedule):
Year 1: 56M (20%), Year 2: 50.4M (18%), Year 3: 44.8M (16%), Year 4: 39.2M (14%), Year 5: 33.6M (12%), Year 6: 28M (10%), Year 7: 28M (10%)

Treasury: Multi-sig (Squads protocol on Solana), governance approval required, monthly reporting, annual budget cap.

Initial Liquidity: 50M SWARP paired with $1.5M → initial price ~$0.03/SWARP → FDV $30M

Buyback: Post-break-even, 10% of net protocol revenue → monthly SWARP market purchases. Published formula, schedule, receiving wallets.

--- COMPLIANCE FRAMEWORK ---

Licensing Strategy:
- Estonia: MiCA CASP authorization (EU passporting)
- Dubai: VARA VASP license (UAE market)
- Italian registration does NOT authorize custodial trading or fiat services

Bridge Period (until licenses obtained):
Partners handle: KYC/AML, transaction monitoring, fiat on/off-ramp (MoonPay), custody oversight
SwarpPay handles: Product UX, tech, trading ops, customer support, security

Compliance Controls:
- Automated transaction monitoring with threshold flagging
- Sanctions screening on withdrawals
- Risk-based manual review
- Comprehensive audit trail
- Tiered CDD (Customer Due Diligence)
- Documented outsourcing framework with RACI matrix

SwarpPay will NOT represent itself as authorized until authorization is granted.

--- TECHNICAL INFRASTRUCTURE ---

Backend: Node.js LTS / NestJS / TypeScript / PostgreSQL / TypeORM / JWT+bcrypt / class-validator
Database: Users, Wallets (encrypted keys), Transactions, Rewards, Launchpad Projects
Blockchain: Configurable RPC, connection pooling, finalized confirmation for accounting, polling-based tx monitoring (30s intervals)
DEX: Jupiter aggregator + Raydium SDK, quote fetching with slippage calc, compute budget optimization
Deployment: Cloud infrastructure, horizontal scaling, environment separation (dev/staging/prod), managed PostgreSQL with automated backups, SSL enforced

═══════════════════════════════════════════
END OF KNOWLEDGE BASE
═══════════════════════════════════════════

IMPORTANT RESPONSE GUIDELINES:
- When users ask about SwarpPay features, quote exact numbers and parameters from the whitepaper.
- For token economics questions, provide exact figures (supply, percentages, vesting schedules).
- For security questions, detail the specific layers and controls.
- For regulatory questions, be precise about the licensing strategy and bridge model.
- Always distinguish between what's live NOW vs what's planned (2027 SwarpID native, 2028+ advanced features).
- If asked "what is SwarpPay?" give a concise elevator pitch first, then offer to go deeper.
- If asked about competitors or comparisons, focus on SwarpPay's unique value (per-person fairness, curated launches, integrated identity).
- For technical questions about the architecture, reference the specific tech stack components.
- Never share private keys, wallet seeds, or sensitive security implementation details.
- For investment/price questions: "I can share the tokenomics and planned metrics, but this is informational only — not financial advice. Always do your own research."`;

/* ─────────────────────────────────────────────────────────────────────────── */

export async function POST(req: Request) {
  let env: ChatRouteEnv;
  try {
    env = getEnv();
  } catch (error) {
    console.error("Swarp AI chat env validation failed:", error);
    return jsonError("Service temporarily unavailable.", 500);
  }

  if (!isTrustedRequest(req, env)) {
    return jsonError("Forbidden.", 403);
  }

  // Rate limiting disabled for Vercel (in-memory doesn't work across instances)
  // TODO: Implement Redis/Upstash rate limiter for production
  // const clientId = getClientIp(req);
  // const rateLimit = rateLimiter.consume(clientId);
  // if (!rateLimit.allowed) {
  //   return jsonError("Too many requests. Please try again shortly.", 429, {
  //     ...corsHeaders(req, env),
  //     "Retry-After": String(rateLimit.retryAfterSec),
  //   });
  // }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid JSON in request body.");
  }

  const safeMessages = normalizeMessages(body);
  if (!safeMessages) {
    return jsonError("Invalid messages payload.");
  }

  const upstreamBody = {
    model: pickModel(),
    stream: true,
    temperature: 1,
    max_tokens: 1500,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...safeMessages,
    ],
  };

  try {
    const upstream = await fetch(`${env.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.apiKey}`,
        "Content-Type": "application/json",
        // OpenRouter specific headers for better tracking
        ...(env.baseUrl.includes("openrouter") && {
          "HTTP-Referer": req.headers.get("referer") || "https://swarppay.com",
          "X-Title": "Swarp AI",
        }),
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!upstream.ok) {
      const errorText = await upstream.text().catch(() => "Unknown error");
      console.error(`LLM API error: ${upstream.status}`, errorText);
      
      // Log to help debug on Vercel
      console.error(`Provider: ${env.baseUrl}, Model: ${upstreamBody.model}`);

      if (upstream.status === 429) {
        return jsonError("OpenRouter rate limit exceeded. Free tier: 20 req/min. Wait 1 minute and try again.", 429);
      }

      if (upstream.status === 401) {
        return jsonError("AI authentication failed. Check OPENROUTER_API_KEY in Vercel environment variables.", 502);
      }
      
      if (upstream.status === 400) {
        return jsonError(`AI request error: ${errorText.slice(0, 200)}`, 502);
      }

      return jsonError(`AI service error (${upstream.status}): ${errorText.slice(0, 100)}`, 502);
    }

    // Pass-through SSE stream
    const headers = new Headers();
    headers.set("Content-Type", "text/event-stream; charset=utf-8");
    headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    headers.set("Connection", "keep-alive");
    headers.set("X-Accel-Buffering", "no");
    for (const [key, value] of Object.entries(corsHeaders(req, env))) {
      headers.set(key, value);
    }

    return new Response(upstream.body, { status: 200, headers });
  } catch (error) {
    console.error("Network error calling LLM API:", error);
    return jsonError("AI service is temporarily unavailable. Please try again.", 503);
  }
}

// CORS
export async function OPTIONS(req: Request) {
  let env: ChatRouteEnv;
  try {
    env = getEnv();
  } catch (error) {
    console.error("Swarp AI chat env validation failed:", error);
    return new Response(null, { status: 500 });
  }

  if (!isTrustedRequest(req, env)) {
    return new Response(null, { status: 403 });
  }

  return new Response(null, {
    status: 204,
    headers: corsHeaders(req, env),
  });
}
