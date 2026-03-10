import { NextResponse } from "next/server";
import { createInMemoryRateLimiter } from "@/lib/rate-limit";
import { SWARP_AI_KNOWLEDGE } from "@/lib/swarp-ai-knowledge";

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

// Use the knowledge base from the separate file (easy to update)
const SYSTEM_PROMPT = SWARP_AI_KNOWLEDGE;

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
