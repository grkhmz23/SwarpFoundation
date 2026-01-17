"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Code2,
  Globe,
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  Database,
  Network,
  Activity,
  Rocket,
  Terminal,
  Copy,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { LiveWebsitePreview, LiveToolsPreview, LiveSoftwarePreview } from "@/components/lab/InteractivePreviews";

/**
 * Swarp Build Lab – Interactive playground for building systems
 * Adapted to Swarp Foundation theme with REAL working demos
 */

const MODES = {
  website: {
    key: "website",
    title: "Website",
    subtitle: "UI / Front-end + CMS",
    icon: Globe,
    accent: "from-swarp-cyan/25 via-swarp-blue/10 to-transparent",
    modules: [
      { key: "landing", label: "Landing", icon: Layers },
      { key: "auth", label: "Auth", icon: ShieldCheck },
      { key: "payments", label: "Payments", icon: Sparkles },
      { key: "cms", label: "CMS", icon: Code2 },
      { key: "analytics", label: "Analytics", icon: Activity },
    ],
  },
  tools: {
    key: "tools",
    title: "Tools",
    subtitle: "Bots, dashboards, automations, devtools",
    icon: Bot,
    accent: "from-swarp-purple/25 via-swarp-accent/10 to-transparent",
    modules: [
      { key: "bots", label: "Bots", icon: Bot },
      { key: "admin", label: "Admin", icon: ShieldCheck },
      { key: "alerts", label: "Alerts", icon: AlertTriangle },
      { key: "integrations", label: "Integrations", icon: Network },
      { key: "ai", label: "AI assistant", icon: Sparkles },
    ],
  },
  software: {
    key: "software",
    title: "Software",
    subtitle: "Full-stack apps, infra, Solana programs",
    icon: Cpu,
    accent: "from-swarp-neon-green/25 via-swarp-cyan/10 to-transparent",
    modules: [
      { key: "api", label: "API", icon: Code2 },
      { key: "db", label: "DB", icon: Database },
      { key: "queue", label: "Queue", icon: Layers },
      { key: "observability", label: "Observability", icon: Activity },
      { key: "solana", label: "Solana program", icon: Rocket },
    ],
  },
} as const;

const STEPS = [
  { key: "plan", label: "Plan" },
  { key: "design", label: "Design" },
  { key: "build", label: "Build" },
  { key: "test", label: "Test" },
  { key: "deploy", label: "Deploy" },
];

type ModeKey = keyof typeof MODES;

type BuildState =
  | { phase: "idle" }
  | { phase: "selecting" }
  | { phase: "arming" }
  | { phase: "building"; stepIndex: number }
  | { phase: "complete" };

type Toast = { id: string; title: string; detail?: string; tone?: "ok" | "warn" | "info" };

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(" ");
}

function useInterval(callback: () => void, delay: number | null) {
  const saved = useRef(callback);
  useEffect(() => {
    saved.current = callback;
  }, [callback]);
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function uid(prefix = "t") {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

function formatNow() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function moduleKeysForMode(mode: ModeKey) {
  return MODES[mode].modules.map((m) => m.key);
}

function defaultModules(mode: ModeKey) {
  const keys = moduleKeysForMode(mode);
  return new Set(keys.slice(0, 3));
}

function buildBrief(mode: ModeKey, modules: Set<string>) {
  const picks = MODES[mode].modules
    .filter((m) => modules.has(m.key))
    .map((m) => m.label);
  const picksText = picks.length ? picks.join(", ") : "(no modules selected)";

  const deliverables = (() => {
    if (mode === "website") {
      const d = ["Design system", "Responsive UI", "Content model", "Deployment pipeline"];
      if (modules.has("auth")) d.push("Auth + roles");
      if (modules.has("payments")) d.push("Payment checkout");
      if (modules.has("cms")) d.push("CMS integration");
      if (modules.has("analytics")) d.push("Analytics dashboards");
      return d;
    }
    if (mode === "tools") {
      const d = ["Dashboard UI", "Automation engine", "Integrations layer", "Observability"];
      if (modules.has("bots")) d.push("Bots + scheduling");
      if (modules.has("alerts")) d.push("Alert rules + routing");
      if (modules.has("admin")) d.push("Admin + permissions");
      if (modules.has("ai")) d.push("AI assistant workflows");
      return d;
    }
    const d = ["API + services", "Data layer", "CI/CD", "Monitoring + logging"];
    if (modules.has("db")) d.push("Database schema + migrations");
    if (modules.has("queue")) d.push("Queue + workers");
    if (modules.has("observability")) d.push("Tracing + SLOs");
    if (modules.has("solana")) d.push("Solana program + tooling");
    return d;
  })();

  const timeline = (() => {
    const count = clamp(modules.size, 0, 5);
    const weeks = 2 + count;
    return `${weeks}–${weeks + 2} weeks`;
  })();

  const stack = (() => {
    if (mode === "website") return ["Next.js", "Tailwind", "CMS", "Edge deploy"];
    if (mode === "tools") return ["React", "API", "Workers", "Integrations"];
    return ["API", "DB", "Queue", "Solana", "Observability"];
  })();

  return {
    picksText,
    deliverables,
    timeline,
    stack,
    copyText:
      `Swarp Build Lab Scope\n` +
      `Mode: ${MODES[mode].title}\n` +
      `Modules: ${picksText}\n` +
      `Estimated timeline: ${timeline}\n` +
      `Deliverables: ${deliverables.join(", ")}\n` +
      `Notes: Demo preview — finalize requirements in discovery.`,
  };
}

function ProgressRing({ value }: { value: number }) {
  const r = 18;
  const c = 2 * Math.PI * r;
  const pct = clamp(value, 0, 1);
  const dash = c * pct;
  return (
    <div className="relative h-12 w-12">
      <svg viewBox="0 0 48 48" className="h-12 w-12">
        <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(0,212,255,0.1)" strokeWidth="4" />
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform="rotate(-90 24 24)"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00D4FF" />
            <stop offset="100%" stopColor="#9D4EDD" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center text-xs text-swarp-cyan font-bold">
        {Math.round(pct * 100)}%
      </div>
    </div>
  );
}

function TabButton({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 text-xs rounded-full border transition",
        active
          ? "bg-swarp-blue/20 border-swarp-cyan/40 text-swarp-cyan glow-blue"
          : "bg-transparent border-swarp-blue/20 text-gray-400 hover:text-swarp-cyan hover:border-swarp-cyan/30"
      )}
    >
      {children}
    </button>
  );
}

function ToastStack({ toasts }: { toasts: Toast[] }) {
  return (
    <div className="fixed right-4 top-20 z-50 w-[320px] max-w-[calc(100vw-2rem)] space-y-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="rounded-2xl border border-swarp-blue/30 backdrop-blur-xl p-3 shadow-lg bg-swarp-dark/90 glow-blue"
          >
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                {t.tone === "ok" ? (
                  <CheckCircle2 className="h-4 w-4 text-swarp-neon-green" />
                ) : t.tone === "warn" ? (
                  <AlertTriangle className="h-4 w-4 text-swarp-accent" />
                ) : (
                  <Terminal className="h-4 w-4 text-swarp-cyan" />
                )}
              </div>
              <div className="min-w-0">
                <div className="text-sm text-swarp-cyan font-medium">{t.title}</div>
                {t.detail ? <div className="text-xs text-gray-400 mt-0.5">{t.detail}</div> : null}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function HintPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-swarp-blue/20 bg-swarp-dark/50 px-3 py-1.5 text-xs text-gray-400">
      <span className="h-1.5 w-1.5 rounded-full bg-swarp-cyan animate-pulse" />
      <span>{children}</span>
    </div>
  );
}

function ModeCard({
  mode,
  selected,
  onClick,
}: {
  mode: (typeof MODES)[ModeKey];
  selected: boolean;
  onClick: () => void;
}) {
  const Icon = mode.icon;
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative w-full rounded-3xl border backdrop-blur-xl text-left transition",
        selected ? "border-swarp-cyan/50 glow-cyan" : "border-swarp-blue/30 hover:border-swarp-cyan/40",
        "bg-gradient-to-b from-swarp-dark/80 to-swarp-darker/90"
      )}
    >
      <div className={cn("absolute inset-0 rounded-3xl bg-gradient-to-br opacity-40", mode.accent)} />
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition grid-pattern" />
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-2 glow-blue">
              <Icon className="h-5 w-5 text-swarp-cyan" />
            </div>
            <div>
              <div className="text-swarp-cyan font-semibold">{mode.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{mode.subtitle}</div>
            </div>
          </div>
          {selected && <div className="text-xs text-swarp-neon-green">✓ Selected</div>}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {mode.modules.slice(0, 3).map((m) => (
            <span key={m.key} className="text-[11px] rounded-full border border-swarp-blue/30 bg-swarp-darker/60 px-2 py-1 text-gray-400">
              {m.label}
            </span>
          ))}
          <span className="text-[11px] rounded-full border border-swarp-blue/20 bg-swarp-darker/40 px-2 py-1 text-gray-500">
            +{Math.max(0, mode.modules.length - 3)}
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function ModuleToggle({
  icon: Icon,
  label,
  active,
  onToggle,
}: {
  icon: React.ComponentType<any>;
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm transition",
        active ? "border-swarp-cyan/40 bg-swarp-blue/20 glow-blue" : "border-swarp-blue/20 bg-swarp-dark/50 hover:bg-swarp-dark/80"
      )}
    >
      <Icon className="h-4 w-4 text-swarp-cyan" />
      <span className={cn(active ? "text-swarp-cyan" : "text-gray-400")}>{label}</span>
      <span className={cn(
        "ml-auto h-5 w-9 rounded-full border p-0.5 transition",
        active ? "border-swarp-cyan/40 bg-swarp-blue/30" : "border-swarp-blue/20 bg-swarp-darker/80"
      )}>
        <span
          className={cn(
            "block h-4 w-4 rounded-full transition",
            active ? "translate-x-4 bg-swarp-cyan shadow-[0_0_10px_rgba(0,212,255,0.8)]" : "translate-x-0 bg-gray-600"
          )}
        />
      </span>
    </motion.button>
  );
}

function Stepper({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="space-y-3">
      {STEPS.map((s, idx) => {
        const active = idx === activeIndex;
        const done = idx < activeIndex;
        return (
          <div key={s.key} className="flex items-center gap-3">
            <div className="relative">
              <div
                className={cn(
                  "h-8 w-8 rounded-2xl border grid place-items-center transition",
                  done ? "border-swarp-neon-green/50 bg-swarp-neon-green/20 glow-cyan" : active ? "border-swarp-cyan/50 bg-swarp-blue/20 glow-blue" : "border-swarp-blue/20 bg-swarp-dark/50"
                )}
              >
                {done ? <CheckCircle2 className="h-4 w-4 text-swarp-neon-green" /> : <span className="text-xs text-swarp-cyan">{idx + 1}</span>}
              </div>
              {idx < STEPS.length - 1 && (
                <div className="absolute left-1/2 top-9 -translate-x-1/2 h-6 w-px bg-swarp-blue/30" />
              )}
            </div>
            <div className="min-w-0">
              <div className={cn("text-sm", active || done ? "text-swarp-cyan" : "text-gray-500")}>{s.label}</div>
              <div className="text-xs text-gray-600">
                {done ? "Complete" : active ? "Running…" : "Queued"}
              </div>
            </div>
            {active && (
              <motion.div
                className="ml-auto h-1 w-16 rounded-full bg-swarp-dark/80 overflow-hidden border border-swarp-blue/30"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-swarp-blue via-swarp-cyan to-swarp-purple"
                  initial={{ x: "-60%" }}
                  animate={{ x: "120%" }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PreviewTabs({ tab, setTab }: { tab: string; setTab: (v: string) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <TabButton active={tab === "ui"} onClick={() => setTab("ui")}>UI</TabButton>
      <TabButton active={tab === "arch"} onClick={() => setTab("arch")}>Architecture</TabButton>
      <TabButton active={tab === "security"} onClick={() => setTab("security")}>Security</TabButton>
      <TabButton active={tab === "deploy"} onClick={() => setTab("deploy")}>Deploy</TabButton>
    </div>
  );
}

function WebsitePreview({ buildPulse, enabled }: { buildPulse: number; enabled: Set<string> }) {
  const sections = [
    { key: "hero", label: "Hero" },
    { key: "features", label: "Features" },
    { key: "pricing", label: "Pricing" },
    { key: "faq", label: "FAQ" },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
        <div className="flex items-center justify-between">
          <div className="text-swarp-cyan font-medium">Landing page</div>
          <span className="text-[11px] text-gray-500 border border-swarp-blue/20 bg-swarp-dark/50 rounded-full px-2 py-0.5">Demo preview</span>
        </div>
        <div className="mt-3 space-y-2">
          {sections.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 * i + 0.02 * buildPulse, duration: 0.25 }}
              className="rounded-xl border border-swarp-blue/30 bg-swarp-dark/50 p-3"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm text-swarp-cyan">{s.label}</div>
                <div className="text-xs text-gray-500">snap-in</div>
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-swarp-dark/80 overflow-hidden border border-swarp-blue/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-swarp-blue to-swarp-cyan"
                  initial={{ width: "0%" }}
                  animate={{ width: `${40 + (i * 12) % 60}%` }}
                  transition={{ duration: 0.35 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
          <div className="text-xs text-gray-500">Modules</div>
          <div className="mt-2 text-sm text-swarp-cyan">
            {enabled.size ? Array.from(enabled).join(" • ") : "none"}
          </div>
        </div>
        <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
          <div className="text-xs text-gray-500">Perf panel</div>
          <div className="mt-2 text-sm text-swarp-cyan">LCP ~ 1.2s • TTFB ~ 120ms</div>
          <div className="text-[11px] text-gray-600 mt-1">Demo metrics</div>
        </div>
      </div>
    </div>
  );
}

function ToolsPreview({ buildPulse, enabled }: { buildPulse: number; enabled: Set<string> }) {
  const widgets = [
    { key: "pipeline", label: "Automation pipeline" },
    { key: "alerts", label: "Alert stream" },
    { key: "integrations", label: "Integrations" },
    { key: "bot", label: "Bot control" },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
        <div className="flex items-center justify-between">
          <div className="text-swarp-cyan font-medium">Ops dashboard</div>
          <span className="text-[11px] text-gray-500 border border-swarp-blue/20 bg-swarp-dark/50 rounded-full px-2 py-0.5">Live-ish</span>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {widgets.map((w, i) => (
            <motion.div
              key={w.key}
              initial={{ opacity: 0, scale: 0.98, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.06 * i + 0.02 * buildPulse, duration: 0.25 }}
              className="rounded-xl border border-swarp-blue/30 bg-swarp-dark/50 p-3"
            >
              <div className="text-sm text-swarp-cyan">{w.label}</div>
              <div className="mt-2 h-16 rounded-lg bg-swarp-darker/80 border border-swarp-blue/20 overflow-hidden relative">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-swarp-blue/30"
                  initial={{ width: "10%" }}
                  animate={{ width: `${30 + ((i + buildPulse) * 17) % 60}%` }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 grid place-items-center text-[11px] text-gray-600">render</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
        <div className="text-xs text-gray-500">Enabled modules</div>
        <div className="mt-2 text-sm text-swarp-cyan">
          {enabled.size ? Array.from(enabled).join(" • ") : "none"}
        </div>
      </div>
    </div>
  );
}

function SoftwarePreview({ buildPulse, enabled }: { buildPulse: number; enabled: Set<string> }) {
  const nodes = [
    { key: "frontend", label: "Frontend" },
    { key: "api", label: "API" },
    { key: "db", label: "DB" },
    { key: "queue", label: "Queue" },
    { key: "obs", label: "Observability" },
  ];

  const apiLines = [
    "GET /health 200",
    "POST /jobs 202",
    "GET /metrics 200",
    "TRACE span=deploy:ok",
  ];

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
        <div className="flex items-center justify-between">
          <div className="text-swarp-cyan font-medium">System blueprint</div>
          <span className="text-[11px] text-gray-500 border border-swarp-blue/20 bg-swarp-dark/50 rounded-full px-2 py-0.5">Hologram</span>
        </div>

        <div className="mt-3 grid grid-cols-5 gap-2">
          {nodes.map((n, i) => (
            <motion.div
              key={n.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i + 0.02 * buildPulse, duration: 0.25 }}
              className="col-span-1 rounded-xl border border-swarp-blue/30 bg-swarp-dark/50 p-2 text-center"
            >
              <div className="text-[11px] text-swarp-cyan">{n.label}</div>
              <div className="mt-2 h-1.5 rounded-full bg-swarp-dark/80 overflow-hidden border border-swarp-blue/20">
                <motion.div
                  className="h-full bg-gradient-to-r from-swarp-blue to-swarp-cyan"
                  initial={{ width: "0%" }}
                  animate={{ width: `${25 + ((i + buildPulse) * 13) % 70}%` }}
                  transition={{ duration: 0.45 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 rounded-xl border border-swarp-blue/30 bg-swarp-darker/90 p-3">
          <div className="text-[11px] text-gray-500 mb-2">API responses</div>
          <div className="font-mono text-[11px] text-swarp-cyan space-y-1">
            {apiLines.map((l, i) => (
              <motion.div
                key={l}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i + 0.02 * buildPulse, duration: 0.2 }}
              >
                {formatNow()} {l}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
        <div className="text-xs text-gray-500">Enabled modules</div>
        <div className="mt-2 text-sm text-swarp-cyan">
          {enabled.size ? Array.from(enabled).join(" • ") : "none"}
        </div>
      </div>
    </div>
  );
}

function SecurityPanel({ mode }: { mode: ModeKey }) {
  const items = useMemo(() => {
    if (mode === "website") {
      return [
        "Auth flows + role gates",
        "Rate limiting + bot protection",
        "Secure headers + CSP",
        "Audit-ready logging",
        "Secrets management",
      ];
    }
    if (mode === "tools") {
      return [
        "Admin permissions + approval workflows",
        "Webhook validation",
        "Alert routing + incident playbooks",
        "Least-privilege integrations",
        "Tamper-evident logs",
      ];
    }
    return [
      "Service-to-service auth",
      "Key management + rotation",
      "Input validation + abuse controls",
      "Tracing + anomaly detection",
      "Solana program safeguards",
    ];
  }, [mode]);

  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <motion.div
          key={it}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * i, duration: 0.22 }}
          className="flex items-center gap-2 rounded-xl border border-swarp-blue/30 bg-swarp-dark/50 p-3"
        >
          <ShieldCheck className="h-4 w-4 text-swarp-cyan" />
          <div className="text-sm text-gray-300">{it}</div>
        </motion.div>
      ))}
    </div>
  );
}

function DeployPanel({ mode }: { mode: ModeKey }) {
  const envs = [
    { k: "staging", label: "Staging", status: "Green" },
    { k: "prod", label: "Production", status: "Green" },
  ];
  const notes =
    mode === "website"
      ? ["Edge deploy + rollback", "Preview URLs per PR", "Perf budgets"]
      : mode === "tools"
      ? ["Worker rollout", "Feature flags", "SLO alerts"]
      : ["Blue/green deploy", "Migrations", "On-chain + off-chain CI"];

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
        <div className="text-swarp-cyan font-medium">Environments</div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {envs.map((e) => (
            <div key={e.k} className="rounded-xl border border-swarp-blue/30 bg-swarp-dark/50 p-3">
              <div className="text-sm text-swarp-cyan">{e.label}</div>
              <div className="mt-1 text-xs text-gray-500">Status: {e.status}</div>
              <div className="mt-2 h-1.5 rounded-full bg-swarp-dark/80 overflow-hidden border border-swarp-blue/20">
                <div className="h-full w-4/5 bg-gradient-to-r from-swarp-neon-green to-swarp-cyan" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
        <div className="text-xs text-gray-500">Deploy checklist</div>
        <div className="mt-2 space-y-2">
          {notes.map((n) => (
            <div key={n} className="flex items-center gap-2 text-sm text-gray-400">
              <CheckCircle2 className="h-4 w-4 text-swarp-neon-green" />
              <span>{n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TerminalBuildLog({ running, stepIndex, mode, enabled }: { running: boolean; stepIndex: number; mode: ModeKey; enabled: Set<string> }) {
  const base = useMemo(() => {
    const modLabels = MODES[mode].modules.filter((m) => enabled.has(m.key)).map((m) => m.label);
    const mods = modLabels.length ? modLabels.join(", ") : "none";
    return [
      `[init] Swarp Lab runtime online`,
      `[mode] ${MODES[mode].title}`,
      `[modules] ${mods}`,
      `[plan] scope locked`,
      `[design] composing system`,
      `[build] assembling components`,
      `[test] running checks`,
      `[deploy] bringing services online`,
      `[done] build complete`,
    ];
  }, [mode, enabled]);

  const linesToShow = running ? clamp(stepIndex + 3, 3, base.length - 1) : 4;

  return (
    <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/90 p-4 glow-blue">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-swarp-cyan">
          <Terminal className="h-4 w-4" />
          <span className="text-sm font-medium">Terminal</span>
        </div>
        <span className="text-[11px] text-gray-600">demo</span>
      </div>
      <div className="mt-3 font-mono text-[11px] text-swarp-cyan space-y-1">
        {base.slice(0, linesToShow).map((l, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.16, delay: 0.03 * i }}
          >
            <span className="text-gray-600">{formatNow()}</span> <span className="text-swarp-cyan">{l}</span>
          </motion.div>
        ))}
        {running && (
          <motion.div
            className="inline-flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-gray-600">…</span>
            <motion.span
              className="h-2 w-2 rounded-full bg-swarp-cyan shadow-[0_0_10px_rgba(0,212,255,0.8)]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.0, repeat: Infinity }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function BlueprintCard({ mode, enabled, onCopy, copied }: { mode: ModeKey; enabled: Set<string>; onCopy: () => void; copied: boolean }) {
  const brief = useMemo(() => buildBrief(mode, enabled), [mode, enabled]);

  return (
    <div className="rounded-3xl border border-swarp-cyan/40 bg-gradient-to-b from-swarp-dark/90 to-swarp-darker/95 p-5 backdrop-blur-xl glow-cyan">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-swarp-cyan font-semibold text-lg">Blueprint</div>
          <div className="text-xs text-gray-400 mt-0.5">
            {MODES[mode].title} • {brief.timeline}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onCopy}
            className="inline-flex items-center gap-2 rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 px-3 py-2 text-xs text-swarp-cyan hover:border-swarp-cyan/50 hover:glow-blue transition"
          >
            <Copy className="h-4 w-4" />
            {copied ? "Copied" : "Copy scope"}
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-2xl border border-swarp-cyan/40 bg-swarp-blue/20 px-3 py-2 text-xs text-swarp-cyan hover:border-swarp-cyan/60 hover:glow-cyan transition"
            onClick={() => {
              alert("CTA: Start a request (wire this to your form / CRM)");
            }}
          >
            <ArrowRight className="h-4 w-4" />
            Start a request
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
          <div className="text-xs text-gray-500">Stack</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {brief.stack.map((s) => (
              <span key={s} className="text-[11px] rounded-full border border-swarp-blue/30 bg-swarp-dark/50 px-2 py-1 text-gray-400">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
          <div className="text-xs text-gray-500">Modules</div>
          <div className="mt-2 text-sm text-swarp-cyan break-words">{brief.picksText}</div>
        </div>
        <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
          <div className="text-xs text-gray-500">Deliverables</div>
          <ul className="mt-2 space-y-1 text-sm text-gray-400">
            {brief.deliverables.slice(0, 4).map((d) => (
              <li key={d} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-swarp-cyan" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-swarp-blue/30 bg-swarp-darker/90 p-4">
        <div className="text-xs text-gray-500">Generated brief</div>
        <pre className="mt-2 whitespace-pre-wrap text-[12px] text-gray-400 leading-relaxed font-mono">
{brief.copyText}
        </pre>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <HintPill>Tip: toggle modules, then BUILD again</HintPill>
        <HintPill>Everything is state-driven</HintPill>
      </div>
    </div>
  );
}

function CapLine({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-swarp-blue/30 bg-swarp-dark/50 p-3">
      <div className="rounded-xl border border-swarp-blue/30 bg-swarp-darker/80 p-2">
        <Icon className="h-4 w-4 text-swarp-cyan" />
      </div>
      <div className="min-w-0">
        <div className="text-sm text-swarp-cyan">{title}</div>
        <div className="text-xs text-gray-500">{desc}</div>
      </div>
    </div>
  );
}

export default function SwarpBuildLabPage() {
  const [mode, setMode] = useState<ModeKey>("website");
  const [enabled, setEnabled] = useState<Set<string>>(() => defaultModules("website"));
  const [state, setState] = useState<BuildState>({ phase: "idle" });
  const [tab, setTab] = useState("ui");
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [hold, setHold] = useState(0);
  const [copied, setCopied] = useState(false);
  const [buildPulse, setBuildPulse] = useState(0);

  const running = state.phase === "building";
  const stepIndex = state.phase === "building" ? state.stepIndex : 0;

  const progress = useMemo(() => {
    if (state.phase === "idle" || state.phase === "selecting") return 0;
    if (state.phase === "arming") return 0.05 + hold * 0.15;
    if (state.phase === "building") return 0.2 + (state.stepIndex / (STEPS.length - 1)) * 0.7;
    if (state.phase === "complete") return 1;
    return 0;
  }, [state, hold]);

  const brief = useMemo(() => buildBrief(mode, enabled), [mode, enabled]);

  function pushToast(t: Omit<Toast, "id">, ttl = 2400) {
    const id = uid("toast");
    setToasts((xs) => [{ id, ...t }, ...xs].slice(0, 4));
    window.setTimeout(() => {
      setToasts((xs) => xs.filter((x) => x.id !== id));
    }, ttl);
  }

  function setModeAndDefaults(next: ModeKey) {
    setMode(next);
    setEnabled(defaultModules(next));
    setTab("ui");
    setCopied(false);
    setBuildPulse((p) => p + 1);
    setState({ phase: "selecting" });
    pushToast({ title: "Mode selected", detail: MODES[next].title, tone: "info" }, 1400);
  }

  function toggleModule(k: string) {
    setEnabled((prev) => {
      const n = new Set(prev);
      if (n.has(k)) n.delete(k);
      else n.add(k);
      return n;
    });
  }

  function reset() {
    setState({ phase: "idle" });
    setHold(0);
    setCopied(false);
    setBuildPulse((p) => p + 1);
    pushToast({ title: "Reset", detail: "Lab is ready", tone: "info" }, 1200);
  }

  function startBuild() {
    if (enabled.size === 0) {
      pushToast({ title: "Pick at least one module", detail: "Select modules to include", tone: "warn" }, 2600);
      return;
    }
    setTab("ui");
    setCopied(false);
    setBuildPulse((p) => p + 1);
    setState({ phase: "building", stepIndex: 0 });
    pushToast({ title: "Compiling modules…", detail: `(${enabled.size}) selected`, tone: "info" }, 2000);
  }

  useInterval(
    () => {
      if (state.phase !== "building") return;
      const next = state.stepIndex + 1;
      if (next >= STEPS.length) {
        setState({ phase: "complete" });
        pushToast({ title: "Build complete", detail: "Blueprint generated", tone: "ok" }, 2200);
        return;
      }
      setState({ phase: "building", stepIndex: next });
      const label = STEPS[next].label;
      const hints: Record<string, string> = {
        Plan: "Locking requirements + milestones",
        Design: "Generating UI system + flows",
        Build: "Assembling services + components",
        Test: "Running checks + hardening",
        Deploy: "Bringing services online",
      };
      pushToast({ title: `${label}…`, detail: hints[label] ?? "", tone: "info" }, 1400);
    },
    state.phase === "building" ? 900 : null
  );

  useInterval(
    () => {
      if (state.phase !== "arming") return;
      setHold((h) => {
        const n = clamp(h + 0.08, 0, 1);
        if (n >= 1) {
          window.setTimeout(() => startBuild(), 80);
        }
        return n;
      });
    },
    state.phase === "arming" ? 50 : null
  );

  useEffect(() => {
    pushToast({ title: "Swarp Build Lab online", detail: "Select a mode to begin", tone: "info" }, 2200);
  }, []);

  async function copyScope() {
    try {
      await navigator.clipboard.writeText(brief.copyText);
      setCopied(true);
      pushToast({ title: "Copied", detail: "Scope copied to clipboard", tone: "ok" }, 1600);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      pushToast({ title: "Copy failed", detail: "Clipboard permission blocked", tone: "warn" }, 2200);
    }
  }

  const ModeIcon = MODES[mode].icon;

  return (
    <div className="min-h-screen bg-swarp-darker">
      <ToastStack toasts={toasts} />

      {/* Background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,212,255,0.08),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(157,78,221,0.06),transparent_45%)]" />
        <div className="absolute inset-0 opacity-20 grid-pattern" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
        {/* Header / Hero */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-swarp-blue/30 bg-swarp-dark/50 px-3 py-1.5 text-xs text-gray-400 glow-blue">
                <span className="h-1.5 w-1.5 rounded-full bg-swarp-cyan animate-pulse" />
                Swarp Foundation • Build Lab
              </div>
              <h1 className="mt-4 text-3xl md:text-5xl font-bold text-gradient">
                Build systems that ship.
              </h1>
              <p className="mt-3 max-w-2xl text-gray-400">
                Pick a mode, choose modules, then press-hold BUILD. Watch the lab assemble a blueprint you can copy into a real scope.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-[11px] rounded-full border border-swarp-blue/30 bg-swarp-darker/80 px-2 py-1 text-gray-400">
                  SOLANA READY
                </span>
                <span className="text-[11px] rounded-full border border-swarp-blue/30 bg-swarp-darker/80 px-2 py-1 text-gray-400">
                  AI ENABLED
                </span>
                <span className="text-[11px] rounded-full border border-swarp-blue/30 bg-swarp-darker/80 px-2 py-1 text-gray-400">
                  SECURE BY DESIGN
                </span>
              </div>
            </div>

            {/* Robot Core */}
            <div className="hidden md:block">
              <motion.div
                className="relative h-32 w-32 rounded-[32px] border border-swarp-cyan/40 bg-gradient-to-b from-swarp-dark/90 to-swarp-darker/95 backdrop-blur-xl glow-cyan"
                animate={{ y: [0, -6, 0], rotate: [0, 1.2, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 rounded-[32px] bg-[radial-gradient(circle_at_50%_30%,rgba(0,212,255,0.18),transparent_55%)]" />
                <div className="absolute inset-4 rounded-3xl border border-swarp-blue/30 bg-swarp-darker/90" />
                <div className="absolute inset-0 grid place-items-center">
                  <ModeIcon className="h-10 w-10 text-swarp-cyan" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full border border-swarp-blue/30 bg-swarp-darker/90 px-3 py-1.5 text-[11px] text-gray-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-swarp-cyan animate-pulse" />
                  core online
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mode selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.keys(MODES) as ModeKey[]).map((k) => (
              <ModeCard key={k} mode={MODES[k]} selected={mode === k} onClick={() => setModeAndDefaults(k)} />
            ))}
          </div>

          {/* Modules */}
          <div className="rounded-3xl border border-swarp-blue/30 bg-swarp-dark/50 backdrop-blur-xl p-5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div className="text-swarp-cyan font-medium">Choose modules</div>
                <div className="text-xs text-gray-400 mt-0.5">Your selections change the build sequence and generated scope.</div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <HintPill>Click modules to customize</HintPill>
                <HintPill>Press-hold BUILD to arm</HintPill>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {MODES[mode].modules.map((m) => (
                <ModuleToggle
                  key={m.key}
                  icon={m.icon}
                  label={m.label}
                  active={enabled.has(m.key)}
                  onToggle={() => toggleModule(m.key)}
                />
              ))}
            </div>
          </div>

          {/* Factory Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left: Assembly / timeline */}
            <div className="lg:col-span-4 rounded-3xl border border-swarp-blue/30 bg-gradient-to-b from-swarp-dark/90 to-swarp-darker/95 backdrop-blur-xl p-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-swarp-cyan font-medium">Assembly</div>
                  <div className="text-xs text-gray-400 mt-0.5">Plan → Design → Build → Test → Deploy</div>
                </div>
                <ProgressRing value={progress} />
              </div>

              <div className="mt-4">
                <Stepper activeIndex={state.phase === "building" ? stepIndex : state.phase === "complete" ? STEPS.length : 0} />
              </div>

              <div className="mt-4">
                <TerminalBuildLog
                  running={state.phase === "building"}
                  stepIndex={state.phase === "building" ? stepIndex : 0}
                  mode={mode}
                  enabled={enabled}
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 px-3 py-2 text-xs text-gray-400 hover:border-swarp-cyan/40 hover:text-swarp-cyan transition"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset
                </button>

                <button
                  onMouseDown={() => {
                    if (state.phase === "building") return;
                    if (state.phase === "complete") {
                      setState({ phase: "arming" });
                      setHold(0);
                      return;
                    }
                    setState({ phase: "arming" });
                    setHold(0);
                    pushToast({ title: "Arming BUILD", detail: "Hold to confirm", tone: "info" }, 1200);
                  }}
                  onMouseUp={() => {
                    if (state.phase !== "arming") return;
                    if (hold < 1) {
                      setState({ phase: "selecting" });
                      setHold(0);
                      pushToast({ title: "Arming canceled", detail: "Hold longer to start", tone: "warn" }, 1400);
                    }
                  }}
                  onMouseLeave={() => {
                    if (state.phase === "arming" && hold < 1) {
                      setState({ phase: "selecting" });
                      setHold(0);
                    }
                  }}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-xs font-medium transition overflow-hidden",
                    state.phase === "building"
                      ? "border-swarp-blue/20 bg-swarp-dark/50 text-gray-600 cursor-not-allowed"
                      : "border-swarp-cyan/40 bg-swarp-blue/20 text-swarp-cyan hover:border-swarp-cyan/60 glow-blue"
                  )}
                  disabled={state.phase === "building"}
                >
                  <span className="relative z-10">BUILD</span>
                  <span className="relative z-10 text-gray-400">(press-hold)</span>
                  <span className="relative z-10 ml-1">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-swarp-cyan/30"
                    initial={false}
                    animate={{ width: `${Math.round(hold * 100)}%` }}
                    transition={{ duration: 0.08 }}
                  />
                </button>
              </div>

              <div className="mt-3 text-[11px] text-gray-600">
                Current: <span className="text-gray-400">{MODES[mode].title}</span> • Modules: <span className="text-gray-400">{enabled.size}</span>
              </div>
            </div>

            {/* Right: Output preview */}
            <div className="lg:col-span-8 rounded-3xl border border-swarp-blue/30 bg-gradient-to-b from-swarp-dark/90 to-swarp-darker/95 backdrop-blur-xl p-5">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="text-swarp-cyan font-medium">Output Preview</div>
                  <div className="text-xs text-gray-400 mt-0.5">A live-ish mock that changes per mode + tab.</div>
                </div>
                <PreviewTabs tab={tab} setTab={setTab} />
              </div>

              <div className="mt-4 grid grid-cols-1 xl:grid-cols-12 gap-4">
                <div className="xl:col-span-7">
                  <div className="rounded-3xl border border-swarp-blue/30 bg-swarp-darker/90 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-swarp-cyan/60" />
                        <div className="h-2 w-2 rounded-full bg-swarp-blue/40" />
                        <div className="h-2 w-2 rounded-full bg-swarp-purple/20" />
                      </div>
                      <div className="text-[11px] text-gray-600">{tab.toUpperCase()} panel</div>
                    </div>

                    <div className="mt-4">
                      <AnimatePresence mode="wait">
                        {tab === "ui" ? (
                          <motion.div key="ui" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                            {mode === "website" ? (
                              <LiveWebsitePreview enabled={enabled} />
                            ) : mode === "tools" ? (
                              <LiveToolsPreview enabled={enabled} />
                            ) : (
                              <LiveSoftwarePreview enabled={enabled} />
                            )}
                          </motion.div>
                        ) : tab === "arch" ? (
                          <motion.div key="arch" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                            <div className="space-y-3">
                              <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-dark/50 p-4">
                                <div className="flex items-center gap-2 text-swarp-cyan">
                                  <Network className="h-4 w-4" />
                                  <span className="text-sm font-medium">Architecture</span>
                                </div>
                                <div className="mt-2 text-sm text-gray-400">
                                  {mode === "website"
                                    ? "Edge UI → API → CMS → Analytics"
                                    : mode === "tools"
                                    ? "UI → API → Workers → Integrations → Alerts"
                                    : "Frontend → API → DB/Queue → Observability → (Solana)"}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
                                  <div className="text-xs text-gray-500">Latency target</div>
                                  <div className="mt-2 text-sm text-swarp-cyan">p95 &lt; 250ms</div>
                                </div>
                                <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-4">
                                  <div className="text-xs text-gray-500">Reliability target</div>
                                  <div className="mt-2 text-sm text-swarp-cyan">99.9%+</div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ) : tab === "security" ? (
                          <motion.div key="security" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                            <SecurityPanel mode={mode} />
                          </motion.div>
                        ) : (
                          <motion.div key="deploy" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                            <DeployPanel mode={mode} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                {/* Capabilities + CTA */}
                <div className="xl:col-span-5 space-y-4">
                  <div className="rounded-3xl border border-swarp-blue/30 bg-swarp-darker/90 p-4">
                    <div className="flex items-center gap-2 text-swarp-cyan">
                      <ShieldCheck className="h-4 w-4" />
                      <span className="text-sm font-medium">Capabilities</span>
                    </div>
                    <div className="mt-3 space-y-2 text-sm text-gray-400">
                      {mode === "website" ? (
                        <>
                          <CapLine icon={Layers} title="Design system" desc="components + motion" />
                          <CapLine icon={Code2} title="CMS" desc="models + editing flows" />
                          <CapLine icon={Activity} title="Perf" desc="budgets + analytics" />
                        </>
                      ) : mode === "tools" ? (
                        <>
                          <CapLine icon={Bot} title="Automation" desc="bots + workflows" />
                          <CapLine icon={Network} title="Integrations" desc="APIs + webhooks" />
                          <CapLine icon={ShieldCheck} title="Admin" desc="roles + approvals" />
                        </>
                      ) : (
                        <>
                          <CapLine icon={Cpu} title="Systems" desc="services + infra" />
                          <CapLine icon={Database} title="Data" desc="schemas + pipelines" />
                          <CapLine icon={Rocket} title="Solana" desc="programs + tooling" />
                        </>
                      )}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        className="inline-flex items-center gap-2 rounded-2xl border border-swarp-cyan/40 bg-swarp-blue/20 px-3 py-2 text-xs text-swarp-cyan hover:border-swarp-cyan/60 transition"
                        onClick={() => alert("CTA: View case study (wire to page)")}
                      >
                        <Layers className="h-4 w-4" />
                        View case study
                      </button>
                      <button
                        className="inline-flex items-center gap-2 rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 px-3 py-2 text-xs text-gray-400 hover:border-swarp-cyan/40 hover:text-swarp-cyan transition"
                        onClick={() => alert("CTA: Talk to team (wire to calendar/contact)")}
                      >
                        <Terminal className="h-4 w-4" />
                        Talk to team
                      </button>
                    </div>
                  </div>

                  <div className="rounded-3xl border border-swarp-blue/30 bg-swarp-darker/90 p-4">
                    <div className="text-swarp-cyan font-medium">Quick scope</div>
                    <div className="mt-2 text-sm text-gray-400">Modules: {brief.picksText}</div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="text-xs text-gray-500">Estimated timeline</div>
                      <div className="text-sm text-swarp-cyan">{brief.timeline}</div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={copyScope}
                        className="inline-flex items-center gap-2 rounded-2xl border border-swarp-cyan/40 bg-swarp-blue/20 px-3 py-2 text-xs text-swarp-cyan hover:border-swarp-cyan/60 transition"
                      >
                        <Copy className="h-4 w-4" />
                        {copied ? "Copied" : "Copy scope"}
                      </button>
                      <button
                        onClick={() => alert("CTA: Request build (wire to form)")}
                        className="inline-flex items-center gap-2 rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 px-3 py-2 text-xs text-gray-400 hover:border-swarp-cyan/40 hover:text-swarp-cyan transition"
                      >
                        <ArrowRight className="h-4 w-4" />
                        Request build
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results / Blueprint */}
              <AnimatePresence>
                {state.phase === "complete" && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.2 }}
                    className="mt-5"
                  >
                    <BlueprintCard mode={mode} enabled={enabled} onCopy={copyScope} copied={copied} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-xs text-gray-600">
            Demo preview component • Replace alerts/CTAs with your real routes/forms
          </div>
        </div>
      </div>
    </div>
  );
}