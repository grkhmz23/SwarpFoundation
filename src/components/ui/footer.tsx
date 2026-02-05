"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import swarpLogo from "@/assets/swarplogo.png";
import { SocialCard } from "./social-card";

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

type FooterLink = { name: string; href: string };
type FooterSection = { title: string; links: FooterLink[] };

const footerSections: FooterSection[] = [
  {
    title: "Products",
    links: [
      { name: "SwarpPay", href: "/products" },
      { name: "SwarpID", href: "/products/swarp-id" },
      { name: "pSOL Protocol", href: "/products" },
      { name: "SwarpLaunch", href: "/products" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "AI Systems", href: "/services" },
      { name: "Web & Mobile", href: "/services" },
      { name: "Blockchain", href: "/services" },
      { name: "Security Audits", href: "/services" },
    ],
  },
  {
    title: "Explore",
    links: [
      { name: "Swarp AI", href: "/swarp-ai" },
      { name: "Works", href: "/works" },
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Security", href: "/security" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
];

type Stat = { target: number; label: string; duration: number; suffix?: string };

const stats: Stat[] = [
  { target: 50, label: "Projects", duration: 1400, suffix: "+" },
  { target: 99, label: "Uptime", duration: 1800, suffix: "%" },
  { target: 25, label: "Countries", duration: 1600 },
  { target: 10, label: "Products", duration: 1200, suffix: "+" },
];

/* ─────────────────────────────────────────────
   HOOKS / UTILS
   ───────────────────────────────────────────── */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function formatCompact(num: number) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${Math.floor(num / 1_000)}k`;
  return String(num);
}

function scrambleToTarget(
  target: number,
  durationMs: number,
  onUpdate: (s: string) => void,
  onDone: () => void,
  suffix: string,
  reducedMotion: boolean
) {
  if (reducedMotion) {
    onUpdate(`${formatCompact(target)}${suffix}`);
    onDone();
    return () => {};
  }

  const charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%";
  const start = performance.now();
  const targetStr = String(target);

  let raf = 0;

  const tick = (t: number) => {
    const p = Math.min(1, (t - start) / durationMs);
    const settleCount = Math.floor(p * targetStr.length);

    let out = "";
    for (let i = 0; i < targetStr.length; i++) {
      if (i < settleCount) out += targetStr[i];
      else out += charset[Math.floor(Math.random() * charset.length)];
    }

    const numeric = Math.round(target * p);
    const blended =
      p < 0.8 ? out : String(numeric).padStart(targetStr.length, "0").slice(-targetStr.length);

    onUpdate(`${formatCompact(Number(blended.replace(/\D/g, "")) || numeric)}${suffix}`);

    if (p < 1) raf = requestAnimationFrame(tick);
    else {
      onUpdate(`${formatCompact(target)}${suffix}`);
      onDone();
    }
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
   ───────────────────────────────────────────── */

function Sparkline({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="sparkline" aria-hidden="true">
      <div className="sparkline__wave" />
      <div className="sparkline__scan" />
      <style jsx>{`
        .sparkline {
          position: absolute; inset: 8px; border-radius: 10px;
          overflow: hidden; opacity: 0.55; pointer-events: none; mix-blend-mode: screen;
        }
        .sparkline__wave {
          position: absolute; inset: -40% -40%;
          background:
            radial-gradient(circle at 20% 50%, rgba(0, 255, 240, 0.15), transparent 45%),
            radial-gradient(circle at 50% 40%, rgba(140, 80, 255, 0.12), transparent 50%),
            radial-gradient(circle at 75% 55%, rgba(154, 255, 90, 0.1), transparent 48%);
          filter: blur(10px); transform: translate3d(0, 0, 0);
          animation: ${reducedMotion ? "none" : "spark-drift 6s ease-in-out infinite"};
        }
        .sparkline__scan {
          position: absolute; left: -30%; top: 0; height: 100%; width: 35%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 240, 0.12), rgba(255, 255, 255, 0.06), transparent);
          transform: skewX(-18deg);
          animation: ${reducedMotion ? "none" : "spark-scan 3.8s ease-in-out infinite"};
          opacity: 0.6;
        }
        @keyframes spark-drift {
          0% { transform: translate3d(-2%, -2%, 0) scale(1.02); }
          50% { transform: translate3d(2%, 3%, 0) scale(1.05); }
          100% { transform: translate3d(-2%, -2%, 0) scale(1.02); }
        }
        @keyframes spark-scan {
          0% { transform: translateX(-120%) skewX(-18deg); }
          45% { transform: translateX(50%) skewX(-18deg); }
          100% { transform: translateX(260%) skewX(-18deg); }
        }
      `}</style>
    </div>
  );
}

function DotTelemetryCard({
  target = 100,
  duration = 2000,
  label = "Stats",
  suffix = "",
  reducedMotion,
}: {
  target?: number;
  duration?: number;
  label?: string;
  suffix?: string;
  reducedMotion: boolean;
}) {
  const [text, setText] = useState(`${formatCompact(0)}${suffix}`);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setIsDone(false);
    const stop = scrambleToTarget(
      target, duration,
      (s) => setText(s),
      () => setIsDone(true),
      suffix, reducedMotion
    );
    return () => stop();
  }, [target, duration, suffix, reducedMotion]);

  return (
    <div className="telemetry-card group">
      <div className="telemetry-card__dot" />
      <div className="telemetry-card__inner">
        <Sparkline reducedMotion={reducedMotion} />
        <div className="telemetry-card__hud" aria-hidden="true">
          <span className="telemetry-card__chip">LIVE</span>
          <span className={`telemetry-card__ok ${isDone ? "ok" : ""}`}>{isDone ? "SYNC" : "LOCK"}</span>
        </div>
        <div className="telemetry-card__value">{text}</div>
        <div className="telemetry-card__label">{label}</div>
        <div className="telemetry-card__frame" aria-hidden="true">
          <span className="line top" /><span className="line left" />
          <span className="line bottom" /><span className="line right" />
          <span className="corner tl" /><span className="corner tr" />
          <span className="corner bl" /><span className="corner br" />
        </div>
      </div>
      <style jsx>{`
        .telemetry-card { position: relative; width: 132px; height: 86px; transform: translateZ(0); }
        .telemetry-card__dot {
          position: absolute; top: -7px; left: 50%; transform: translateX(-50%);
          width: 10px; height: 10px; border-radius: 999px;
          background: rgba(0, 255, 240, 0.95);
          box-shadow: 0 0 14px rgba(0, 255, 240, 0.8), 0 0 34px rgba(0, 255, 240, 0.35);
          animation: ${reducedMotion ? "none" : "dot-pulse 3s ease-in-out infinite"};
          z-index: 2;
        }
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.75; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.18); }
        }
        .telemetry-card__inner {
          position: relative; width: 100%; height: 100%; border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(0, 0, 0, 0.7);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.35);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          transition: transform 260ms ease, border-color 260ms ease, background 260ms ease;
          overflow: hidden;
        }
        .group:hover .telemetry-card__inner {
          transform: translateY(-2px); border-color: rgba(0, 255, 240, 0.22);
          background: rgba(0, 255, 240, 0.08);
        }
        .telemetry-card__hud {
          position: absolute; top: 8px; left: 8px; right: 8px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px; opacity: 0.9; pointer-events: none;
        }
        .telemetry-card__chip {
          font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase;
          padding: 3px 6px; border-radius: 999px;
          border: 1px solid rgba(0, 255, 240, 0.22);
          background: rgba(0, 255, 240, 0.06); color: rgba(0, 255, 240, 0.9);
        }
        .telemetry-card__ok {
          font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(220, 230, 240, 0.9);
        }
        .telemetry-card__ok.ok { color: rgba(154, 255, 90, 0.9); text-shadow: 0 0 12px rgba(154, 255, 90, 0.25); }
        .telemetry-card__value {
          position: relative; z-index: 1; font-size: 22px; font-weight: 800;
          letter-spacing: -0.02em; color: rgba(255, 255, 255, 0.98);
          text-shadow: 0 0 18px rgba(0, 255, 240, 0.12);
        }
        .telemetry-card__label {
          position: relative; z-index: 1; margin-top: 3px; font-size: 9px; font-weight: 650;
          text-transform: uppercase; letter-spacing: 0.12em; color: rgba(220, 230, 240, 0.95);
        }
        .telemetry-card__frame .line { position: absolute; background: rgba(0, 255, 240, 0.12); opacity: 0.8; }
        .telemetry-card__frame .line.top, .telemetry-card__frame .line.bottom { height: 1px; left: 14%; right: 14%; }
        .telemetry-card__frame .line.left, .telemetry-card__frame .line.right { width: 1px; top: 18%; bottom: 18%; }
        .telemetry-card__frame .line.top { top: 0; }
        .telemetry-card__frame .line.bottom { bottom: 0; }
        .telemetry-card__frame .line.left { left: 0; }
        .telemetry-card__frame .line.right { right: 0; }
        .telemetry-card__frame .corner { position: absolute; width: 9px; height: 9px; border: 1px solid rgba(0, 255, 240, 0.22); opacity: 0.65; }
        .telemetry-card__frame .corner.tl { top: 7px; left: 7px; border-right: 0; border-bottom: 0; border-top-left-radius: 6px; }
        .telemetry-card__frame .corner.tr { top: 7px; right: 7px; border-left: 0; border-bottom: 0; border-top-right-radius: 6px; }
        .telemetry-card__frame .corner.bl { bottom: 7px; left: 7px; border-right: 0; border-top: 0; border-bottom-left-radius: 6px; }
        .telemetry-card__frame .corner.br { bottom: 7px; right: 7px; border-left: 0; border-top: 0; border-bottom-right-radius: 6px; }
      `}</style>
    </div>
  );
}

function KineticFooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="klink">
      <span className="klink__bracket" aria-hidden="true">[</span>
      <span className="klink__text">{children}</span>
      <span className="klink__cursor" aria-hidden="true">_</span>
      <style jsx>{`
        .klink {
          position: relative; display: inline-flex; align-items: baseline; gap: 6px;
          font-size: 13px; color: rgba(220, 230, 240, 0.95);
          transition: transform 200ms ease, color 200ms ease; outline: none;
        }
        .klink__bracket { opacity: 0; transform: translateX(-6px); transition: opacity 200ms ease, transform 200ms ease; color: rgba(0, 255, 240, 0.9); }
        .klink__cursor { opacity: 0; transform: translateX(-3px); transition: opacity 200ms ease, transform 200ms ease; color: rgba(0, 255, 240, 0.9); animation: blink 1.1s step-end infinite; }
        @keyframes blink { 0%, 50% { opacity: 0; } 51%, 100% { opacity: 1; } }
        .klink:hover { color: rgba(255, 255, 255, 0.98); transform: translateX(3px); }
        .klink:hover .klink__bracket { opacity: 1; transform: translateX(0); }
        .klink:hover .klink__cursor { opacity: 1; transform: translateX(0); }
        .klink:focus-visible { color: rgba(255, 255, 255, 0.96); }
        .klink:focus-visible::after {
          content: ""; position: absolute; left: -6px; right: -6px; bottom: -6px; height: 2px;
          border-radius: 999px; background: rgba(0, 255, 240, 0.45); box-shadow: 0 0 18px rgba(0, 255, 240, 0.25);
        }
      `}</style>
    </Link>
  );
}

function CircuitDivider({ reducedMotion, className }: { reducedMotion: boolean; className?: string }) {
  return (
    <div className={className ?? ""} aria-hidden="true">
      <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="w-full h-6" role="presentation">
        <defs>
          <linearGradient id="wireGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="rgba(0,255,240,0)" />
            <stop offset="0.15" stopColor="rgba(0,255,240,0.25)" />
            <stop offset="0.5" stopColor="rgba(140,80,255,0.25)" />
            <stop offset="0.85" stopColor="rgba(154,255,90,0.18)" />
            <stop offset="1" stopColor="rgba(0,255,240,0)" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="2.2" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>
        <path d="M0 12 H420 C480 12, 520 4, 580 4 H740 C820 4, 840 20, 920 20 H1200" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <path d="M0 12 H420 C480 12, 520 4, 580 4 H740 C820 4, 840 20, 920 20 H1200" fill="none" stroke="url(#wireGrad)" strokeWidth="2" filter="url(#glow)" className={reducedMotion ? "" : "trace"} strokeDasharray="120 680" strokeDashoffset="0" />
      </svg>
      <style jsx>{`
        .trace { animation: trace-run 4.8s linear infinite; }
        @keyframes trace-run { 0% { stroke-dashoffset: 0; opacity: 0.65; } 50% { opacity: 0.95; } 100% { stroke-dashoffset: -800; opacity: 0.65; } }
      `}</style>
    </div>
  );
}

function DevConsole({ open, onClose, reducedMotion }: { open: boolean; onClose: () => void; reducedMotion: boolean }) {
  const build = useMemo(() => {
    const now = new Date();
    const pad = (n: number) => String(n).padStart(2, "0");
    const ts = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}`;
    return { ts, node: "edge-runtime", region: "eu-west", commit: "7f3a2c1", status: "OK" };
  }, []);

  if (!open) return null;

  return (
    <div className="devconsole" role="dialog" aria-modal="true" aria-label="System log">
      <div className="devconsole__panel">
        <div className="devconsole__top">
          <div className="devconsole__title"><span className="dot" /><span>system.log</span><span className="muted">/footer</span></div>
          <button className="devconsole__close" onClick={onClose} aria-label="Close system log">×</button>
        </div>
        <pre className="devconsole__body">{`[${build.ts}] boot: swarp.foundation
[${build.ts}] env: ${build.node}  region=${build.region}
[${build.ts}] build: commit=${build.commit}
[${build.ts}] status: ${build.status}
[${build.ts}] hint: press "~" to toggle, type "swarp" anywhere`}</pre>
      </div>
      <style jsx>{`
        .devconsole { position: absolute; right: 16px; bottom: 16px; z-index: 40; width: min(420px, calc(100% - 32px)); pointer-events: none; }
        .devconsole__panel { pointer-events: auto; border-radius: 16px; border: 1px solid rgba(0, 255, 240, 0.16); background: rgba(8, 10, 14, 0.98); backdrop-filter: blur(14px); box-shadow: 0 18px 60px rgba(0, 0, 0, 0.6); overflow: hidden; transform: translateZ(0); animation: ${reducedMotion ? "none" : "pop 220ms ease-out"}; }
        @keyframes pop { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .devconsole__top { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.08); background: rgba(255, 255, 255, 0.04); }
        .devconsole__title { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 650; color: rgba(255, 255, 255, 0.95); letter-spacing: 0.02em; }
        .devconsole__title .dot { width: 8px; height: 8px; border-radius: 999px; background: rgba(154, 255, 90, 0.9); box-shadow: 0 0 14px rgba(154, 255, 90, 0.25); }
        .devconsole__title .muted { color: rgba(180, 190, 200, 0.8); font-weight: 600; }
        .devconsole__close { width: 28px; height: 28px; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.12); background: rgba(255, 255, 255, 0.06); color: rgba(255, 255, 255, 0.9); font-size: 18px; line-height: 1; display: grid; place-items: center; transition: transform 120ms ease, border-color 120ms ease; }
        .devconsole__close:hover { transform: translateY(-1px); border-color: rgba(0, 255, 240, 0.2); }
        .devconsole__body { margin: 0; padding: 12px 12px 10px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 12px; line-height: 1.5; color: rgba(240, 245, 250, 0.95); white-space: pre-wrap; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN FOOTER
   ───────────────────────────────────────────── */

export function Footer() {
  const reducedMotion = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLElement | null>(null);
  const [devOpen, setDevOpen] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    const onLeave = () => { el.style.setProperty("--mx", "50%"); el.style.setProperty("--my", "15%"); };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    onLeave();
    return () => { el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); };
  }, []);

  useEffect(() => {
    let buffer = "";
    let last = 0;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") { setDevOpen((v) => !v); return; }
      const now = Date.now();
      if (now - last > 900) buffer = "";
      last = now;
      if (e.key.length === 1) {
        buffer = (buffer + e.key.toLowerCase()).slice(-8);
        if (buffer.endsWith("swarp")) setDevOpen((v) => !v);
      }
      if (e.key === "Escape") setDevOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const year = new Date().getFullYear();

  return (
    <div className="px-4 sm:px-8 lg:px-12 pb-6 mt-12 relative z-20">
      <footer
        ref={(n) => { wrapRef.current = n as unknown as HTMLElement | null; }}
        className="footer-shell relative overflow-hidden rounded-3xl border border-white/[0.08]"
      >
        {/* ── SOLID OPAQUE BACKGROUND ── */}
        <div className="absolute inset-0 z-[0] bg-[#040610]" />

        {/* Backdrop effects - z-index 1 */}
        <div className="pointer-events-none absolute inset-0 z-[1]">
          <div className="aurora" />
          <div className="grid" />
          <div className="vignette" />
        </div>

        {/* Circuit border - z-index 2 */}
        <div className="pointer-events-none absolute inset-0 z-[2]">
          <svg className="circuit-border" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cbg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="rgba(0,255,240,0.0)" />
                <stop offset="0.25" stopColor="rgba(0,255,240,0.25)" />
                <stop offset="0.6" stopColor="rgba(140,80,255,0.18)" />
                <stop offset="1" stopColor="rgba(154,255,90,0.0)" />
              </linearGradient>
              <filter id="cbGlow"><feGaussianBlur stdDeviation="0.7" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <rect x="1" y="1" width="98" height="98" rx="6" ry="6" fill="none" stroke="url(#cbg)" strokeWidth="0.7" filter="url(#cbGlow)" className={reducedMotion ? "" : "border-trace"} strokeDasharray="10 140" strokeDashoffset="0" vectorEffect="non-scaling-stroke" />
          </svg>
        </div>

        {/* Main content - z-index 10 */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 py-10">

          {/* ── STATS ROW ── */}
          <div className="mb-10 pb-10 border-b border-white/[0.08]">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-12">
              {stats.map((stat, i) => (
                <DotTelemetryCard key={i} target={stat.target} label={stat.label} duration={stat.duration} suffix={stat.suffix ?? ""} reducedMotion={reducedMotion} />
              ))}
            </div>
            <div className="mt-8"><CircuitDivider reducedMotion={reducedMotion} /></div>
          </div>

          {/* ── BRAND + LINKS GRID ── */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">

            {/* Brand column */}
            <div className="lg:col-span-4 space-y-5">
              <Link href="/" className="brand group w-fit flex items-center space-x-3">
                <div className="brand__mark">
                  <Image src={swarpLogo} alt="Swarp" width={34} height={34} className="object-contain brightness-125 transition-transform group-hover:rotate-6" />
                  <span className="brand__ring" aria-hidden="true" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-lg font-semibold tracking-tight text-white">Swarp Foundation</span>
                  <span className="text-[11px] tracking-[0.22em] uppercase text-white/60">Software-native infrastructure</span>
                </div>
              </Link>

              <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                Full-stack software development from concept to production. We build blockchain infrastructure, AI systems, and scalable web platforms.
              </p>

              {/* Social links */}
              <div className="pt-2">
                <SocialCard
                  title=""
                  instagramUrl="https://instagram.com/swarpfoundation"
                  twitterUrl="https://x.com/swarpfoundation"
                  discordUrl="https://discord.gg/swarp"
                  telegramUrl="https://t.me/swarpfoundation"
                  githubUrl="https://github.com/swarp-foundation"
                />
              </div>

              <div className="text-[11px] text-white/40">
                <span className="font-mono">Tip:</span> press{" "}
                <span className="kbd">~</span> for system log
              </div>
            </div>

            {/* Link columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.title} className="section">
                  <h3 className="section__title">{section.title}</h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <KineticFooterLink href={link.href}>{link.name}</KineticFooterLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="mt-12 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-white/60 font-medium">
              © {year} Swarp Foundation. All rights reserved.
              <span className="mx-2 text-white/20">•</span>
              <span className="font-mono text-white/40">Lyon, France</span>
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-[12px] text-white/60 hover:text-cyan-400 transition-colors">Privacy</Link>
              <Link href="/terms" className="text-[12px] text-white/60 hover:text-cyan-400 transition-colors">Terms</Link>
              <Link href="/security" className="text-[12px] text-white/60 hover:text-cyan-400 transition-colors">Security</Link>
              <Link href="/cookies" className="text-[12px] text-white/60 hover:text-cyan-400 transition-colors">Cookies</Link>
              <button type="button" onClick={() => setDevOpen((v) => !v)} className="devbtn" aria-label="Toggle system log">log</button>
            </div>
          </div>
        </div>

        <DevConsole open={devOpen} onClose={() => setDevOpen(false)} reducedMotion={reducedMotion} />

        <style jsx>{`
          .footer-shell { --mx: 50%; --my: 15%; }
          .aurora {
            position: absolute; inset: -20%;
            background:
              radial-gradient(800px 400px at var(--mx) var(--my), rgba(0, 255, 240, 0.06), transparent 55%),
              radial-gradient(700px 380px at calc(var(--mx) + 16%) calc(var(--my) + 12%), rgba(140, 80, 255, 0.04), transparent 58%),
              radial-gradient(620px 360px at calc(var(--mx) - 14%) calc(var(--my) + 18%), rgba(154, 255, 90, 0.03), transparent 60%);
            filter: blur(24px); opacity: 0.6; transition: opacity 240ms ease;
          }
          .grid {
            position: absolute; inset: 0; opacity: 0.12;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
            background-size: 48px 48px;
            mask-image: radial-gradient(60% 60% at 50% 20%, black, transparent 80%);
          }
          .vignette { position: absolute; inset: 0; background: radial-gradient(80% 70% at 50% 30%, transparent, rgba(4, 6, 16, 0.5)); opacity: 0.7; }
          .circuit-border { position: absolute; inset: 10px; width: calc(100% - 20px); height: calc(100% - 20px); pointer-events: none; opacity: 0.9; }
          .border-trace { animation: border-run 7s linear infinite; }
          @keyframes border-run { 0% { stroke-dashoffset: 0; opacity: 0.55; } 50% { opacity: 0.95; } 100% { stroke-dashoffset: -220; opacity: 0.55; } }
          .brand__mark {
            position: relative; width: 40px; height: 40px; display: grid; place-items: center;
            border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.15);
            background: rgba(255, 255, 255, 0.06); overflow: hidden;
          }
          .brand__ring {
            position: absolute; inset: -40%;
            background: radial-gradient(circle at 30% 30%, rgba(0, 255, 240, 0.18), transparent 55%), radial-gradient(circle at 70% 70%, rgba(140, 80, 255, 0.14), transparent 58%);
            filter: blur(10px); opacity: 0.9; transform: translateZ(0);
          }
          .section__title {
            font-size: 10px; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase;
            color: rgba(0, 255, 240, 0.95); margin-bottom: 18px;
          }
          .kbd {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-size: 10px; padding: 2px 6px; border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.08);
            color: rgba(240, 245, 250, 0.95); margin: 0 2px;
          }
          .devbtn {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
            font-size: 11px; padding: 4px 10px; border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.15); background: rgba(255, 255, 255, 0.08);
            color: rgba(230, 235, 245, 0.95);
            transition: transform 140ms ease, border-color 140ms ease, color 140ms ease;
          }
          .devbtn:hover { transform: translateY(-1px); border-color: rgba(0, 255, 240, 0.25); color: rgba(255, 255, 255, 0.98); }
          .devbtn:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(0, 255, 240, 0.18); }
        `}</style>
      </footer>
    </div>
  );
}
