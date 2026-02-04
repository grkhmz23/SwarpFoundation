import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Incoming = {
  messages: Array<{ role: "user" | "assistant"; content: string }>;
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function pickModel(): string {
  return process.env.SWARP_AI_MODEL || "kimi-k2-turbo-preview";
}

const SYSTEM_PROMPT = `You are Swarp AI, an AI assistant created by Swarp Foundation.

Style rules:
- Warm, casual, short sentences.
- Don't write big paragraphs unless asked.
- Ask at most 1 follow-up question only when needed.
- Be direct. No long disclaimers.
- Light emoji allowed, sparingly.
- Mirror the user's tone (terse -> terse, detailed -> detailed).

About Swarp Foundation:
- Swarp Foundation builds blockchain infrastructure and developer tools.
- Core products include: SwarpPay (payments), SwarpID (identity), pSOL (privacy protocol), SwarpLaunch (token launchpad).
- Tech stack: Solana, Rust, TypeScript, Next.js.

If the user asks for code, provide production-ready code with no placeholders.
If you don't know something specific about Swarp products, say so honestly.`;

export async function POST(req: Request) {
  const key = process.env.MOONSHOT_API_KEY;

  if (!key) {
    console.error("MOONSHOT_API_KEY is not set in environment variables");
    return jsonError("Missing MOONSHOT_API_KEY on server. Please configure environment variables.", 500);
  }

  let body: Incoming;
  try {
    body = (await req.json()) as Incoming;
  } catch {
    return jsonError("Invalid JSON in request body.");
  }

  if (!body?.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
    return jsonError("messages must be a non-empty array.");
  }

  // Size guardrails - limit history and content length
  const safeMessages = body.messages
    .slice(-30) // Keep last 30 messages max
    .map((m) => ({
      role: m.role,
      content: String(m.content || "").slice(0, 8000), // Max 8000 chars per message
    }))
    .filter((m) => m.content.trim().length > 0);

  if (safeMessages.length === 0) {
    return jsonError("No valid messages provided.");
  }

  const upstreamBody = {
    model: pickModel(),
    stream: true,
    temperature: 1,
    max_tokens: 700, // Keep replies concise
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...safeMessages,
    ],
  };

  try {
    const upstream = await fetch("https://api.moonshot.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!upstream.ok) {
      const errorText = await upstream.text().catch(() => "Unknown error");
      console.error(`Moonshot API error: ${upstream.status}`, errorText);

      // Return user-friendly error messages based on status
      if (upstream.status === 401) {
        return jsonError("Invalid API key. Please check MOONSHOT_API_KEY.", 502);
      }
      if (upstream.status === 429) {
        return jsonError("Rate limit exceeded. Please try again in a moment.", 429);
      }
      if (upstream.status >= 500) {
        return jsonError("Kimi AI service is temporarily unavailable. Please try again.", 502);
      }

      return NextResponse.json(
        { 
          error: "Upstream API error", 
          status: upstream.status, 
          details: errorText.slice(0, 500) 
        },
        { status: 502 }
      );
    }

    // Pass-through SSE stream for low-latency token delivery
    const headers = new Headers();
    headers.set("Content-Type", "text/event-stream; charset=utf-8");
    headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    headers.set("Connection", "keep-alive");
    headers.set("X-Accel-Buffering", "no"); // Disable nginx buffering if present

    return new Response(upstream.body, { 
      status: 200, 
      headers 
    });

  } catch (error) {
    console.error("Network error calling Moonshot API:", error);
    return jsonError("Failed to connect to AI service. Please check your connection.", 503);
  }
}

// Handle OPTIONS for CORS if needed
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}