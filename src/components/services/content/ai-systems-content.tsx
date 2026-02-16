"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useIntervalWhenVisible } from "@/components/services/service-content-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Database,
  Shield,
  LineChart,
  Settings,
  Sparkles,
  Send,
  Search,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Play,
  RefreshCw,
  Zap,
  ChevronRight,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ServiceContentLayout,
  ServiceHeader,
  ServiceCard,
  ServiceTab,
  ServiceCTA,
} from "../service-content-layout";

type Tab = "assistant" | "knowledge" | "ops";
type AgentMode = "support" | "analyst" | "dev";

type PipelineStage =
  | "intent"
  | "retrieve"
  | "generate"
  | "guardrails"
  | "log";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
  citations?: { title: string; note: string }[];
  isStreaming?: boolean;
}

interface KBDoc {
  id: string;
  title: string;
  category: "Product" | "Security" | "Platform" | "Pricing";
  tags: string[];
  body: string;
}

const KB_DOCS: KBDoc[] = [
  {
    id: "platform-rag",
    title: "RAG pipeline (index → retrieve → cite)",
    category: "Platform",
    tags: ["rag", "citations", "vector", "rerank"],
    body:
      "We ship Retrieval-Augmented Generation using chunking + embeddings + vector search, with optional re-ranking. Answers can include citations and confidence, and we log retrieval context for debugging.",
  },
  {
    id: "security-guardrails",
    title: "Guardrails: PII redaction + jailbreak filtering",
    category: "Security",
    tags: ["pii", "redaction", "safety", "policy"],
    body:
      "We add guardrails for production: PII detection/redaction, jailbreak detection, sensitive-topic policies, and audit logs. We can enforce tool permissions per role and environment.",
  },
  {
    id: "product-agents",
    title: "Agents: tools, actions, workflows",
    category: "Product",
    tags: ["agents", "tools", "workflow", "automation"],
    body:
      "Agents orchestrate multi-step actions: triage → lookup → draft → execute. We integrate tools (CRM, tickets, email, databases) with least-privilege access and structured outputs.",
  },
  {
    id: "platform-observability",
    title: "Observability: latency, cost, grounding, errors",
    category: "Platform",
    tags: ["metrics", "slo", "tracing", "cost"],
    body:
      "We instrument AI systems end-to-end: token usage, latency breakdown, model routing, fallback rates, grounding score, and error taxonomy. Dashboards + alerts + replay for regressions.",
  },
  {
    id: "pricing-cost",
    title: "Cost controls: caching, routing, fallbacks",
    category: "Pricing",
    tags: ["cache", "router", "fallback", "budget"],
    body:
      "We control cost with prompt caching, deterministic routing, and fallback strategies. You get per-route budgets, spend limits, and predictable unit economics.",
  },
];

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function scoreDoc(query: string, doc: KBDoc) {
  const q = query.trim().toLowerCase();
  if (!q) return 0;
  const hay = (doc.title + " " + doc.tags.join(" ") + " " + doc.body)
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ");
  const parts = q.split(/\s+/).filter(Boolean);
  let s = 0;
  for (const p of parts) {
    if (doc.title.toLowerCase().includes(p)) s += 6;
    if (doc.tags.some((t) => t.toLowerCase().includes(p))) s += 4;
    if (hay.includes(p)) s += 2;
  }
  // mild boost for shorter docs (easier to cite)
  s += Math.max(0, 2 - doc.body.length / 400);
  return s;
}

function excerpt(body: string, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return body.slice(0, 160) + (body.length > 160 ? "…" : "");
  const idx = body.toLowerCase().indexOf(q.split(/\s+/)[0] ?? "");
  if (idx === -1) return body.slice(0, 160) + (body.length > 160 ? "…" : "");
  const start = clamp(idx - 40, 0, body.length);
  const end = clamp(idx + 140, 0, body.length);
  const head = start > 0 ? "…" : "";
  const tail = end < body.length ? "…" : "";
  return head + body.slice(start, end) + tail;
}

function Sparkline({
  values,
  className,
}: {
  values: number[];
  className?: string;
}) {
  const w = 160;
  const h = 36;
  const pad = 4;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(1e-6, max - min);

  const points = values
    .map((v, i) => {
      const x = pad + (i * (w - pad * 2)) / Math.max(1, values.length - 1);
      const y =
        pad +
        (h - pad * 2) -
        ((v - min) * (h - pad * 2)) / range;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className={cn("block", className)}
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
        opacity="0.9"
      />
      <polyline
        points={`${pad},${h - pad} ${w - pad},${h - pad}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.12"
      />
    </svg>
  );
}

function Pill({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[10px] font-medium transition-colors",
        active
          ? "bg-swarp-blue/15 border-swarp-blue/30 text-swarp-blue"
          : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function ToggleRow({
  label,
  desc,
  enabled,
  onChange,
}: {
  label: string;
  desc: string;
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
      <div className="min-w-0">
        <div className="text-[10px] font-semibold text-white">{label}</div>
        <div className="text-[9px] text-gray-500">{desc}</div>
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
          enabled
            ? "bg-swarp-blue/25 border-swarp-blue/35"
            : "bg-black/30 border-white/10"
        )}
        aria-pressed={enabled}
        aria-label={label}
      >
        <span
          className={cn(
            "absolute top-1 h-4 w-4 rounded-full transition-all",
            enabled ? "left-6 bg-swarp-blue" : "left-1 bg-white/40"
          )}
        />
      </button>
    </div>
  );
}

function PipelineBar({
  stages,
  activeIdx,
  status,
}: {
  stages: { id: PipelineStage; label: string }[];
  activeIdx: number;
  status: "idle" | "running" | "done";
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {stages.map((s, i) => {
        const done = status !== "idle" && i < activeIdx;
        const active = status === "running" && i === activeIdx;
        const finalDone = status === "done" && i === stages.length - 1;

        return (
          <div
            key={s.id}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 text-[10px] font-medium",
              done || finalDone
                ? "bg-swarp-blue/12 border-swarp-blue/25 text-swarp-blue"
                : active
                ? "bg-swarp-blue/18 border-swarp-blue/35 text-white"
                : "bg-white/5 border-white/10 text-gray-500"
            )}
          >
            {done || finalDone ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : active ? (
              <motion.span
                className="h-2 w-2 rounded-full bg-swarp-blue"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.1, repeat: Infinity }}
              />
            ) : (
              <span className="h-2 w-2 rounded-full bg-white/20" />
            )}
            {s.label}
          </div>
        );
      })}
    </div>
  );
}

function useClipboardToast() {
  const [copied, setCopied] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  };
  return { copied, copy };
}

/** Assistant demo: mode + optional KB + guardrails + realistic pipeline steps */
function AssistantDemo({
  kbQuerySeed,
}: {
  kbQuerySeed: string;
}) {
  const [mode, setMode] = useState<AgentMode>("support");
  const [useKB, setUseKB] = useState(true);
  const [guardrails, setGuardrails] = useState(true);

  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const [pipelineStatus, setPipelineStatus] = useState<
    "idle" | "running" | "done"
  >("idle");
  const [pipelineIdx, setPipelineIdx] = useState(0);

  const stages = useMemo(
    () => [
      { id: "intent" as const, label: "Intent" },
      { id: "retrieve" as const, label: "Retrieve" },
      { id: "generate" as const, label: "Generate" },
      { id: "guardrails" as const, label: "Guardrails" },
      { id: "log" as const, label: "Logs" },
    ],
    []
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m0",
      role: "assistant",
      ts: Date.now(),
      content:
        "Hey — pick a mode, then ask a real question. I'll show the pipeline (retrieve → cite → guardrails) like it runs in production.",
    },
  ]);

  const retrieve = (q: string, topK: number) => {
    const scored = KB_DOCS.map((d) => ({
      doc: d,
      score: scoreDoc(q, d),
      note: excerpt(d.body, q),
    }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return scored;
  };

  const genReply = (q: string) => {
    const trimmed = q.trim();
    const citations = useKB ? retrieve(trimmed || kbQuerySeed, 2) : [];
    const citePayload =
      citations.length > 0
        ? citations.map((c) => ({ title: c.doc.title, note: c.note }))
        : undefined;

    const modePrefix =
      mode === "support"
        ? "Support"
        : mode === "analyst"
        ? "Analyst"
        : "Dev";

    const base = (() => {
      const lower = trimmed.toLowerCase();

      if (mode === "support") {
        if (lower.includes("refund") || lower.includes("charge")) {
          return "I can draft a clean refund reply + policy excerpt and log the case. Want the short version or detailed steps for the user?";
        }
        if (lower.includes("integrat") || lower.includes("api")) {
          return "Yep. We can ship an in-app assistant with citations + an agent to file tickets / update CRM. I'll show the architecture in the right panel.";
        }
        return "Got it. I can summarize, draft a response, and (optionally) call tools like tickets/CRM. What channel is this for — email, chat, or helpdesk?";
      }

      if (mode === "analyst") {
        if (lower.includes("kpi") || lower.includes("retention") || lower.includes("growth")) {
          return "I can compute the KPI deltas and explain drivers. If you enable Knowledge, I'll cite definitions and dashboards (so the report is consistent).";
        }
        return "I can turn that into an analysis: assumptions, metric definition, and a short executive summary. Want a 1-pager or a dashboard-style readout?";
      }

      // dev
      if (lower.includes("latency") || lower.includes("timeout")) {
        return "We'd instrument the full chain (retrieval + model + tools), add caching, and route by budget/SLO. The Ops tab shows how we ship this safely.";
      }
      if (lower.includes("rag")) {
        return "For RAG, we chunk + embed + index with re-ranking, then generate answers with citations. You'll get replayable traces for debugging.";
      }
      return "I can build this as a production-grade service: model routing, eval harness, guardrails, and monitoring. Tell me the target product surface (web app, mobile, internal tool).";
    })();

    // If KB is on, produce a short cited addendum.
    const cited =
      citations.length > 0
        ? `\n\nFrom docs: ${citations
            .map((c) => `• ${c.doc.title}`)
            .join("\n")}`
        : "";

    // If guardrails on, mention briefly.
    const safety =
      guardrails
        ? "\n\nSafety: PII redaction + jailbreak checks enabled."
        : "";

    const content = `[${modePrefix}] ${base}${cited}${safety}`;

    return { content, citations: citePayload };
  };

  const runPipelineAndRespond = (q: string) => {
    setTyping(true);
    setPipelineStatus("running");
    setPipelineIdx(0);

    const stepMs = 380;
    const totalSteps = stages.length;

    let idx = 0;
    const t = window.setInterval(() => {
      idx += 1;
      setPipelineIdx(clamp(idx, 0, totalSteps - 1));
      if (idx >= totalSteps - 1) {
        window.clearInterval(t);
        window.setTimeout(() => {
          setPipelineStatus("done");
        }, 180);
      }
    }, stepMs);

    window.setTimeout(() => {
      const { content, citations } = genReply(q);

      const aiId = `a-${Date.now()}`;
      const aiMsg: ChatMessage = {
        id: aiId,
        role: "assistant",
        ts: Date.now(),
        content,
        citations,
        isStreaming: true,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // streaming feel: flip isStreaming off after a moment
      window.setTimeout(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === aiId ? { ...m, isStreaming: false } : m))
        );
        setTyping(false);
        window.setTimeout(() => setPipelineStatus("idle"), 600);
      }, 750);
    }, stepMs * 2.0);
  };

  const send = () => {
    const v = input.trim();
    if (!v) return;

    const u: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      ts: Date.now(),
      content: v,
    };

    setMessages((prev) => [...prev, u]);
    setInput("");
    runPipelineAndRespond(v);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  return (
    <div className="h-full rounded-xl border border-swarp-blue/20 bg-[#0c0e12] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-swarp-blue/15 bg-swarp-blue/10 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-9 w-9 rounded-xl bg-swarp-blue/18 border border-swarp-blue/25 flex items-center justify-center">
            <Bot className="h-4 w-4 text-swarp-blue" />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white leading-tight">
              AI Assistant Demo
            </div>
            <div className="text-[10px] text-swarp-blue/80">
              Mode + optional Knowledge + Guardrails
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Pill
            icon={<Sparkles className="h-3.5 w-3.5" />}
            label="Support"
            active={mode === "support"}
            onClick={() => setMode("support")}
          />
          <Pill
            icon={<LineChart className="h-3.5 w-3.5" />}
            label="Analyst"
            active={mode === "analyst"}
            onClick={() => setMode("analyst")}
          />
          <Pill
            icon={<Settings className="h-3.5 w-3.5" />}
            label="Dev"
            active={mode === "dev"}
            onClick={() => setMode("dev")}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 py-3 border-b border-white/10 bg-black/25">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <PipelineBar
            stages={stages}
            activeIdx={pipelineIdx}
            status={pipelineStatus}
          />
          <div className="flex items-center gap-2">
            <Pill
              icon={<Database className="h-3.5 w-3.5" />}
              label={useKB ? "Knowledge: ON" : "Knowledge: OFF"}
              active={useKB}
              onClick={() => setUseKB((v) => !v)}
            />
            <Pill
              icon={<Shield className="h-3.5 w-3.5" />}
              label={guardrails ? "Guardrails: ON" : "Guardrails: OFF"}
              active={guardrails}
              onClick={() => setGuardrails((v) => !v)}
            />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="h-[calc(100%-176px)] overflow-y-auto px-4 py-4 space-y-3 custom-scrollbar"
      >
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-3",
              m.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div
              className={cn(
                "h-8 w-8 rounded-lg border flex items-center justify-center shrink-0",
                m.role === "assistant"
                  ? "bg-swarp-blue/15 border-swarp-blue/25"
                  : "bg-white/5 border-white/10"
              )}
            >
              {m.role === "assistant" ? (
                <Bot className="h-4 w-4 text-swarp-blue" />
              ) : (
                <span className="text-[10px] font-bold text-gray-200">You</span>
              )}
            </div>

            <div
              className={cn(
                "max-w-[82%] rounded-xl border px-3 py-2.5 text-xs leading-relaxed",
                m.role === "assistant"
                  ? "bg-swarp-blue/10 border-swarp-blue/20 text-gray-200"
                  : "bg-white/5 border-white/10 text-gray-200"
              )}
            >
              <div className="whitespace-pre-wrap">
                {m.isStreaming ? (
                  <span className="animate-pulse">{m.content}▊</span>
                ) : (
                  m.content
                )}
              </div>

              {m.citations && m.citations.length > 0 && (
                <div className="mt-2 pt-2 border-t border-white/10">
                  <div className="text-[10px] font-semibold text-swarp-blue/90">
                    Citations
                  </div>
                  <div className="mt-1 space-y-1">
                    {m.citations.map((c, idx) => (
                      <div
                        key={`${m.id}-c-${idx}`}
                        className="rounded-lg border border-white/10 bg-black/20 px-2 py-1"
                      >
                        <div className="text-[10px] text-white font-medium">
                          {c.title}
                        </div>
                        <div className="text-[9px] text-gray-500">
                          {c.note}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-1.5 text-[9px] text-gray-600">
                {new Date(m.ts).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </motion.div>
        ))}

        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="h-8 w-8 rounded-lg bg-swarp-blue/15 border border-swarp-blue/25 flex items-center justify-center">
              <Bot className="h-4 w-4 text-swarp-blue" />
            </div>
            <div className="rounded-xl border border-swarp-blue/20 bg-swarp-blue/10 px-3 py-2 flex items-center gap-1.5">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-swarp-blue"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: 0 }}
              />
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-swarp-blue"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: 0.12 }}
              />
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-swarp-blue"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 0.7, repeat: Infinity, delay: 0.24 }}
              />
              <span className="ml-1 text-[10px] text-swarp-blue/80">
                thinking…
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="px-3 py-3 border-t border-white/10 bg-[#09090b]">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder={
                mode === "support"
                  ? 'Ask: "Draft a refund reply for a subscription charge"'
                  : mode === "analyst"
                  ? 'Ask: "Summarize KPIs and what changed vs last month"'
                  : 'Ask: "How do we make RAG fast + debuggable?"'
              }
              className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-swarp-blue/35"
            />
          </div>
          <button
            onClick={send}
            className="inline-flex items-center gap-1.5 rounded-lg border border-swarp-blue/25 bg-swarp-blue/15 px-3 py-2 text-xs font-semibold text-swarp-blue hover:bg-swarp-blue/20 transition-colors"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

/** Knowledge demo: search + topK + rerank + doc viewer */
function KnowledgeDemo() {
  const [query, setQuery] = useState("How do you ship guardrails in production?");
  const [topK, setTopK] = useState(3);
  const [rerank, setRerank] = useState(true);
  const [selectedId, setSelectedId] = useState<string>("security-guardrails");

  const results = useMemo(() => {
    const q = query.trim();
    const scored = KB_DOCS.map((d) => ({
      doc: d,
      score: scoreDoc(q, d),
      note: excerpt(d.body, q),
    }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score);

    const sliced = scored.slice(0, topK);

    if (!rerank) return sliced;

    // pseudo rerank: slightly boost Security + Platform for safety queries
    const qLower = q.toLowerCase();
    const wantsSafety =
      qLower.includes("pii") ||
      qLower.includes("guard") ||
      qLower.includes("jailbreak") ||
      qLower.includes("policy") ||
      qLower.includes("security");

    return sliced
      .map((x) => {
        const boost =
          wantsSafety && (x.doc.category === "Security" || x.doc.category === "Platform")
            ? 2.2
            : 0;
        return { ...x, score: x.score + boost };
      })
      .sort((a, b) => b.score - a.score);
  }, [query, topK, rerank]);

  useEffect(() => {
    if (results.length > 0 && !results.some((r) => r.doc.id === selectedId)) {
      setSelectedId(results[0]!.doc.id);
    }
  }, [results, selectedId]);

  const selected = useMemo(
    () => KB_DOCS.find((d) => d.id === selectedId) ?? KB_DOCS[0]!,
    [selectedId]
  );

  return (
    <div className="h-full rounded-xl border border-swarp-blue/20 bg-[#0c0e12] overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/25 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              <Database className="h-4 w-4 text-swarp-blue" />
              Knowledge Search (RAG)
            </div>
            <div className="text-[10px] text-gray-500">
              Search docs → retrieve top-K → (optional) rerank → cite sources
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Pill
              icon={<CheckCircle2 className="h-3.5 w-3.5" />}
              label={`top-K: ${topK}`}
              active
            />
            <Pill
              icon={<Zap className="h-3.5 w-3.5" />}
              label={rerank ? "Rerank: ON" : "Rerank: OFF"}
              active={rerank}
              onClick={() => setRerank((v) => !v)}
            />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-600" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/5 pl-9 pr-3 py-2 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-swarp-blue/35"
              placeholder="Search the knowledge base…"
            />
          </div>

          <div className="w-40">
            <input
              type="range"
              min={2}
              max={5}
              step={1}
              value={topK}
              onChange={(e) => setTopK(parseInt(e.target.value, 10))}
              className="w-full accent-swarp-blue"
              aria-label="Top K"
            />
            <div className="mt-1 flex justify-between text-[9px] text-gray-600">
              <span>2</span>
              <span>5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="h-[calc(100%-116px)] grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Results */}
        <div className="border-r border-white/10 overflow-y-auto custom-scrollbar">
          <div className="p-3">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Retrieved
            </div>
            <div className="mt-2 space-y-2">
              {results.length === 0 ? (
                <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-gray-400">
                  No matches yet — try &quot;RAG citations&quot;, &quot;guardrails&quot;, or &quot;observability&quot;.
                </div>
              ) : (
                results.map((r) => {
                  const active = r.doc.id === selectedId;
                  return (
                    <button
                      key={r.doc.id}
                      onClick={() => setSelectedId(r.doc.id)}
                      className={cn(
                        "w-full rounded-lg border px-3 py-2 text-left transition-colors",
                        active
                          ? "bg-swarp-blue/12 border-swarp-blue/25"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-white truncate">
                            {r.doc.title}
                          </div>
                          <div className="text-[9px] text-gray-500">
                            {r.doc.category} • score {r.score.toFixed(1)}
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="mt-1 text-[10px] text-gray-400">
                        {r.note}
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {r.doc.tags.slice(0, 3).map((t) => (
                          <span
                            key={`${r.doc.id}-${t}`}
                            className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-[9px] text-gray-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Viewer */}
        <div className="overflow-y-auto custom-scrollbar">
          <div className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">
                  {selected.title}
                </div>
                <div className="text-[10px] text-gray-500">
                  {selected.category} • {selected.tags.join(" · ")}
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-swarp-blue/25 bg-swarp-blue/12 px-2.5 py-1 text-[10px] font-semibold text-swarp-blue">
                <FileText className="h-3.5 w-3.5" />
                source
              </span>
            </div>

            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-gray-200 leading-relaxed whitespace-pre-wrap">
              {selected.body}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-black/25 p-3">
              <div className="text-xs font-semibold text-white">
                Answer preview (with citations)
              </div>
              <div className="mt-1 text-[10px] text-gray-500">
                This is how the assistant answers when Knowledge is enabled.
              </div>

              <div className="mt-3 rounded-lg border border-swarp-blue/20 bg-swarp-blue/10 p-3">
                <div className="text-xs text-gray-200 leading-relaxed">
                  We implement production RAG with retrieval + re-ranking and
                  attach citations for trust and debugging. For safety, we add
                  guardrails and keep audit logs so you can reproduce answers.
                </div>
                <div className="mt-2 text-[10px] font-semibold text-swarp-blue">
                  Citations
                </div>
                <div className="mt-1 space-y-1">
                  {[selected, ...KB_DOCS.filter((d) => d.id !== selected.id).slice(0, 1)].map(
                    (d) => (
                      <div
                        key={`cite-${d.id}`}
                        className="rounded-lg border border-white/10 bg-black/20 px-2 py-1"
                      >
                        <div className="text-[10px] text-white font-medium">
                          {d.title}
                        </div>
                        <div className="text-[9px] text-gray-500">
                          {excerpt(d.body, query)}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-3 text-[9px] text-gray-600">
                Tip: we can plug this into your docs, help center, tickets, CRM, or internal tools.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Ops demo: live metrics + config toggles (router, fallback, budgets, SLO) */
function OpsDemo() {
  const [live, setLive] = useState(true);

  const [fallback, setFallback] = useState(true);
  const [cache, setCache] = useState(true);
  const [pii, setPii] = useState(true);
  const [jailbreak, setJailbreak] = useState(true);

  const [lat, setLat] = useState(182);
  const [cost, setCost] = useState(0.014);
  const [ground, setGround] = useState(0.86);
  const [err, setErr] = useState(0.7);
  const [tps, setTps] = useState(24.2);

  const [latSeries, setLatSeries] = useState<number[]>([165, 172, 181, 177, 191, 184, 178, 182, 176, 188, 179, 182]);

  useIntervalWhenVisible(() => {
    // deterministic-ish movement
    setLat((v) => clamp(Math.round(v + (Math.random() * 18 - 9)), 120, 320));
    setCost((v) => clamp(parseFloat((v + (Math.random() * 0.008 - 0.004)).toFixed(3)), 0.006, 0.035));
    setGround((v) => clamp(parseFloat((v + (Math.random() * 0.04 - 0.02)).toFixed(2)), 0.72, 0.95));
    setErr((v) => clamp(parseFloat((v + (Math.random() * 0.5 - 0.25)).toFixed(1)), 0.0, 2.5));
    setTps((v) => clamp(parseFloat((v + (Math.random() * 2.2 - 1.1)).toFixed(1)), 10, 60));

    setLatSeries((prev) => {
      const next = [...prev.slice(1), clamp(prev[prev.length - 1]! + (Math.random() * 26 - 13), 120, 320)];
      return next;
    });
  }, live ? 1100 : null);

  const configText = useMemo(() => {
    const lines: string[] = [];
    lines.push("routes:");
    lines.push("  - match: /assistant/*");
    lines.push("    model: gpt-4o");
    lines.push(`    fallback: ${fallback ? "claude-3.5" : "off"}`);
    lines.push(`    cache: ${cache ? "on" : "off"}`);
    lines.push("");
    lines.push("rag:");
    lines.push("  vector_db: pgvector");
    lines.push("  top_k: 4");
    lines.push("  rerank: on");
    lines.push("");
    lines.push("guardrails:");
    lines.push(`  pii_redaction: ${pii ? "true" : "false"}`);
    lines.push(`  jailbreak_filter: ${jailbreak ? "true" : "false"}`);
    lines.push("  audit_logs: true");
    lines.push("");
    lines.push("slo:");
    lines.push("  p95_latency_ms: 350");
    lines.push("  error_budget_pct: 1.0");
    return lines.join("\n");
  }, [fallback, cache, pii, jailbreak]);

  const { copied, copy } = useClipboardToast();

  return (
    <div className="h-full rounded-xl border border-swarp-blue/20 bg-[#0c0e12] overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/25 px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              <LineChart className="h-4 w-4 text-swarp-blue" />
              Production Ops
            </div>
            <div className="text-[10px] text-gray-500">
              Monitoring, routing, cost controls, and safe deploy patterns.
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Pill
              icon={<Play className="h-3.5 w-3.5" />}
              label={live ? "Live: ON" : "Live: OFF"}
              active={live}
              onClick={() => setLive((v) => !v)}
            />
            <Pill
              icon={<RefreshCw className="h-3.5 w-3.5" />}
              label="Reset"
              onClick={() => {
                setLat(182);
                setCost(0.014);
                setGround(0.86);
                setErr(0.7);
                setTps(24.2);
                setLatSeries([165, 172, 181, 177, 191, 184, 178, 182, 176, 188, 179, 182]);
              }}
            />
          </div>
        </div>
      </div>

      <div className="h-[calc(100%-56px)] grid grid-cols-1 lg:grid-cols-2">
        {/* Metrics */}
        <div className="p-4 border-r border-white/10 overflow-y-auto custom-scrollbar space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-[10px] text-gray-500">p95 latency</div>
              <div className="mt-1 flex items-end justify-between gap-2">
                <div className="text-xl font-bold text-white">
                  {lat}
                  <span className="text-[10px] text-gray-500 ml-1">ms</span>
                </div>
                <div className="text-swarp-blue">
                  <Sparkline values={latSeries} />
                </div>
              </div>
              <div className="mt-2 text-[9px] text-gray-600">
                Breakdown: retrieval + model + tools (traceable).
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-[10px] text-gray-500">unit cost / request</div>
              <div className="mt-1 text-xl font-bold text-white">
                ${cost.toFixed(3)}
              </div>
              <div className="mt-2 text-[9px] text-gray-600">
                Budgets + caching keep spend predictable.
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-[10px] text-gray-500">grounding score</div>
              <div className="mt-1 text-xl font-bold text-white">
                {(ground * 100).toFixed(0)}
                <span className="text-[10px] text-gray-500 ml-1">/100</span>
              </div>
              <div className="mt-2 text-[9px] text-gray-600">
                Higher = answers align with sources.
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-[10px] text-gray-500">error rate</div>
              <div className="mt-1 text-xl font-bold text-white">
                {err.toFixed(1)}
                <span className="text-[10px] text-gray-500 ml-1">%</span>
              </div>
              <div className="mt-2 text-[9px] text-gray-600">
                Retries + fallbacks reduce incidents.
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/25 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-semibold text-white">Throughput</div>
                <div className="text-[10px] text-gray-500">requests / second</div>
              </div>
              <div className="text-lg font-bold text-swarp-blue">{tps.toFixed(1)}</div>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[10px] text-gray-500">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-swarp-blue" />
                autoscaling ready
              </span>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="inline-flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-swarp-blue" />
                audit logs
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-xs font-semibold text-white flex items-center gap-2">
              <Shield className="h-4 w-4 text-swarp-blue" />
              Production switches
            </div>
            <div className="mt-3 space-y-2">
              <ToggleRow
                label="Fallback model"
                desc="Auto-route on timeouts or tool failures"
                enabled={fallback}
                onChange={setFallback}
              />
              <ToggleRow
                label="Prompt caching"
                desc="Reduce cost for repeat requests"
                enabled={cache}
                onChange={setCache}
              />
              <ToggleRow
                label="PII redaction"
                desc="Mask sensitive data before logging"
                enabled={pii}
                onChange={setPii}
              />
              <ToggleRow
                label="Jailbreak filter"
                desc="Block prompt-injection patterns"
                enabled={jailbreak}
                onChange={setJailbreak}
              />
            </div>
          </div>

          <div className="rounded-xl border border-swarp-blue/20 bg-swarp-blue/10 p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-swarp-blue mt-0.5" />
              <div>
                <div className="text-xs font-semibold text-white">
                  What you get in delivery
                </div>
                <div className="text-[10px] text-gray-500 mt-0.5">
                  Tracing + eval harness + rollback plan + dashboards — so AI features don&apos;t break silently.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Config viewer */}
        <div className="p-4 overflow-y-auto custom-scrollbar space-y-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs font-semibold text-white">
                  Deploy config (router + guardrails)
                </div>
                <div className="text-[10px] text-gray-500">
                  This is the kind of config we wire into your app + infra.
                </div>
              </div>
              <button
                onClick={() => copy(configText)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/25 px-2.5 py-1.5 text-[10px] font-semibold text-gray-300 hover:text-white hover:border-white/20"
              >
                <Copy className="h-3.5 w-3.5" />
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <pre className="mt-3 rounded-lg border border-white/10 bg-black/30 p-3 text-[10px] text-gray-200 overflow-x-auto">
              <code>{configText}</code>
            </pre>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-white/10 bg-black/25 p-3">
                <div className="text-[10px] text-gray-500">Release strategy</div>
                <div className="mt-1 text-xs font-semibold text-white">
                  Canary → 25% → 100%
                </div>
                <div className="mt-1 text-[9px] text-gray-600">
                  Rollback triggers on error budget burn.
                </div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/25 p-3">
                <div className="text-[10px] text-gray-500">Security posture</div>
                <div className="mt-1 text-xs font-semibold text-white">
                  Least-privilege tools
                </div>
                <div className="mt-1 text-[9px] text-gray-600">
                  Role-based tool access + audit trails.
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="text-xs font-semibold text-white">SLO snapshot</div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                { k: "Uptime", v: "99.9%" },
                { k: "p95", v: "< 350ms" },
                { k: "Error budget", v: "1.0%" },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-lg border border-white/10 bg-black/25 p-2 text-center"
                >
                  <div className="text-sm font-bold text-swarp-blue">{x.v}</div>
                  <div className="text-[9px] text-gray-500">{x.k}</div>
                </div>
              ))}
            </div>
            <div className="mt-2 text-[9px] text-gray-600">
              We can tune model routing by SLO (latency) and budget (cost).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AISystemsContent() {
  const [tab, setTab] = useState<Tab>("assistant");

  return (
    <ServiceContentLayout accentColor="cyan">
      <div className="h-full flex flex-col">
        {/* Top header */}
        <ServiceHeader
          icon={<Bot className="h-5 w-5" />}
          title="AI Systems"
          subtitle="LLM & Chat Interfaces"
          accentColor="cyan"
        >
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/35 p-1">
            <ServiceTab
              isActive={tab === "assistant"}
              onClick={() => setTab("assistant")}
              accentColor="cyan"
            >
              <Bot className="h-3.5 w-3.5" />
              Assistant
            </ServiceTab>
            <ServiceTab
              isActive={tab === "knowledge"}
              onClick={() => setTab("knowledge")}
              accentColor="cyan"
            >
              <Database className="h-3.5 w-3.5" />
              Knowledge
            </ServiceTab>
            <ServiceTab
              isActive={tab === "ops"}
              onClick={() => setTab("ops")}
              accentColor="cyan"
            >
              <LineChart className="h-3.5 w-3.5" />
              Ops
            </ServiceTab>
          </div>
        </ServiceHeader>

        {/* Body */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Left: interactive demo */}
            <div className="h-full">
              <AnimatePresence mode="wait">
                {tab === "assistant" && (
                  <motion.div
                    key="assistant"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="h-full"
                  >
                    <AssistantDemo kbQuerySeed="rag citations guardrails observability" />
                  </motion.div>
                )}
                {tab === "knowledge" && (
                  <motion.div
                    key="knowledge"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="h-full"
                  >
                    <KnowledgeDemo />
                  </motion.div>
                )}
                {tab === "ops" && (
                  <motion.div
                    key="ops"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="h-full"
                  >
                    <OpsDemo />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: clarity + vision (what clients need to understand quickly) */}
            <div className="h-full overflow-y-auto custom-scrollbar space-y-3">
              <ServiceCard
                title="What we build"
                icon={<Zap className="h-4 w-4" />}
                accentColor="cyan"
              >
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      title: "Customer assistants",
                      desc: "Support, onboarding, self-serve help",
                      icon: <Bot className="h-4 w-4 text-swarp-blue" />,
                    },
                    {
                      title: "Knowledge search",
                      desc: "Docs + tickets + CRM, with citations",
                      icon: <Database className="h-4 w-4 text-swarp-blue" />,
                    },
                    {
                      title: "Guardrails",
                      desc: "PII redaction + jailbreak resistance",
                      icon: <Shield className="h-4 w-4 text-swarp-blue" />,
                    },
                    {
                      title: "Production ops",
                      desc: "Routing, evals, dashboards, SLOs",
                      icon: <LineChart className="h-4 w-4 text-swarp-blue" />,
                    },
                  ].map((x) => (
                    <div
                      key={x.title}
                      className="rounded-lg border border-white/10 bg-white/5 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg border border-swarp-blue/20 bg-swarp-blue/10 flex items-center justify-center">
                          {x.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[11px] font-semibold text-white">
                            {x.title}
                          </div>
                          <div className="text-[9px] text-gray-500">
                            {x.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ServiceCard>

              <ServiceCard
                title="Delivery flow"
                icon={<CheckCircle2 className="h-4 w-4" />}
                accentColor="cyan"
              >
                <div className="space-y-2">
                  {[
                    {
                      step: "Week 1",
                      title: "Scope + data surfaces",
                      note: "Docs, tickets, CRM, internal dashboards",
                    },
                    {
                      step: "Week 2",
                      title: "RAG + agent tools",
                      note: "Citations + structured actions",
                    },
                    {
                      step: "Week 3",
                      title: "Evals + guardrails",
                      note: "PII, injection, regressions, QA",
                    },
                    {
                      step: "Week 4",
                      title: "Deploy + monitoring",
                      note: "SLOs, dashboards, rollback plan",
                    },
                  ].map((s) => (
                    <div
                      key={s.step}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-[10px] font-semibold text-swarp-blue">
                          {s.step}
                        </div>
                        <CheckCircle2 className="h-4 w-4 text-swarp-blue/80" />
                      </div>
                      <div className="text-xs font-semibold text-white">
                        {s.title}
                      </div>
                      <div className="text-[9px] text-gray-500">{s.note}</div>
                    </div>
                  ))}
                </div>
              </ServiceCard>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { k: "Latency", v: "< 350ms" },
                  { k: "Uptime", v: "99.9%" },
                  { k: "Models", v: "multi-provider" },
                ].map((x) => (
                  <div
                    key={x.k}
                    className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                  >
                    <div className="text-sm font-bold text-swarp-blue">
                      {x.v}
                    </div>
                    <div className="text-[9px] text-gray-500">{x.k}</div>
                  </div>
                ))}
              </div>

              <ServiceCTA
                title="Why this matters"
                description="Most AI demos fail in production because they're not observable, not grounded, and not safe. We ship AI like software: evals, traces, budgets, and rollback."
                accentColor="cyan"
              />
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div className="px-4 pb-4 -mt-2">
          <div className="text-[10px] text-gray-600">
            Tip: Click <span className="text-swarp-blue font-semibold">Knowledge</span> to see citations, then <span className="text-swarp-blue font-semibold">Ops</span> for routing + SLOs.
          </div>
        </div>
      </div>
    </ServiceContentLayout>
  );
}

export default AISystemsContent;
