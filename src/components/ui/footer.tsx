"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import swarpLogo from "@/assets/swarplogo.png";
import { useLegalModal } from "./legal-modal";
import { useTranslations } from "next-intl";

/* ─────────────────────────────────────────────
   useScramble — hacker decode effect
   ───────────────────────────────────────────── */

function useScramble(text: string) {
  const [display, setDisplay] = useState(text);
  const [isHovering, setIsHovering] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterationRef = useRef(0);

  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>/?~`";

  const trigger = useCallback(() => {
    setIsHovering(true);
    iterationRef.current = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterationRef.current) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      iterationRef.current += 1 / 3;

      if (iterationRef.current >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplay(text);
      }
    }, 30);
  }, [text, chars]);

  const reset = useCallback(() => {
    setIsHovering(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplay(text);
  }, [text]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Sync display with text changes
  useEffect(() => {
    if (!isHovering) setDisplay(text);
  }, [text, isHovering]);

  return { display, trigger, reset, isHovering };
}

/* ─────────────────────────────────────────────
   DATA
   ───────────────────────────────────────────── */

type FooterLink = { nameKey: string; href?: string; legal?: string; badge?: string };
type FooterSection = { titleKey: string; links: FooterLink[] };

const footerSections: FooterSection[] = [
  {
    titleKey: "products.title",
    links: [
      { nameKey: "products.swarpPay", href: "/products" },
      { nameKey: "products.swarpId", href: "/products/swarp-id" },
      { nameKey: "products.psolProtocol", href: "/products" },
      { nameKey: "products.swarpLaunch", href: "/products" },
    ],
  },
  {
    titleKey: "services.title",
    links: [
      { nameKey: "services.aiSystems", href: "/services" },
      { nameKey: "services.webMobile", href: "/services" },
      { nameKey: "services.blockchain", href: "/services" },
      { nameKey: "services.securityAudits", href: "/services" },
    ],
  },
  {
    titleKey: "explore.title",
    links: [
      { nameKey: "explore.swarpAi", href: "/swarp-ai", badge: "BETA" },
      { nameKey: "explore.works", href: "/works" },
      { nameKey: "explore.aboutUs", href: "/about" },
      { nameKey: "explore.contact", href: "/contact" },
    ],
  },
  {
    titleKey: "legal.title",
    links: [
      { nameKey: "legal.privacyPolicy", legal: "privacy" },
      { nameKey: "legal.termsOfService", legal: "terms" },
      { nameKey: "legal.security", legal: "security" },
      { nameKey: "legal.cookiePolicy", legal: "cookies" },
    ],
  },
];

type Stat = { target: number; labelKey: string; duration: number; suffix?: string };

const stats: Stat[] = [
  { target: 50, labelKey: "stats.projects", duration: 1400, suffix: "+" },
  { target: 99, labelKey: "stats.uptime", duration: 1800, suffix: "%" },
  { target: 25, labelKey: "stats.countries", duration: 1600 },
  { target: 10, labelKey: "stats.products", duration: 1200, suffix: "+" },
];

type SocialLink = { name: string; url: string; icon: React.ReactNode };

const socialLinks: SocialLink[] = [
  {
    name: "X / Twitter",
    url: "https://x.com/Swarp_Pay",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/swarp_pay/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/swarp-pay/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@swarp.pay",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/people/Swarp-Pay/61579879769479/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
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
    const blended = p < 0.8 ? out : String(numeric).padStart(targetStr.length, "0").slice(-targetStr.length);
    onUpdate(`${formatCompact(Number(blended.replace(/\D/g, "")) || numeric)}${suffix}`);
    if (p < 1) raf = requestAnimationFrame(tick);
    else { onUpdate(`${formatCompact(target)}${suffix}`); onDone(); }
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
        .sparkline { position: absolute; inset: 8px; border-radius: 10px; overflow: hidden; opacity: 0.55; pointer-events: none; mix-blend-mode: screen; }
        .sparkline__wave { position: absolute; inset: -40% -40%; background: radial-gradient(circle at 20% 50%, rgba(0,255,240,0.15), transparent 45%), radial-gradient(circle at 50% 40%, rgba(140,80,255,0.12), transparent 50%), radial-gradient(circle at 75% 55%, rgba(154,255,90,0.1), transparent 48%); filter: blur(10px); transform: translate3d(0,0,0); animation: ${reducedMotion ? "none" : "spark-drift 6s ease-in-out infinite"}; }
        .sparkline__scan { position: absolute; left: -30%; top: 0; height: 100%; width: 35%; background: linear-gradient(90deg, transparent, rgba(0,255,240,0.12), rgba(255,255,255,0.06), transparent); transform: skewX(-18deg); animation: ${reducedMotion ? "none" : "spark-scan 3.8s ease-in-out infinite"}; opacity: 0.6; }
        @keyframes spark-drift { 0% { transform: translate3d(-2%,-2%,0) scale(1.02); } 50% { transform: translate3d(2%,3%,0) scale(1.05); } 100% { transform: translate3d(-2%,-2%,0) scale(1.02); } }
        @keyframes spark-scan { 0% { transform: translateX(-120%) skewX(-18deg); } 45% { transform: translateX(50%) skewX(-18deg); } 100% { transform: translateX(260%) skewX(-18deg); } }
      `}</style>
    </div>
  );
}

function DotTelemetryCard({ target = 100, duration = 2000, label = "Stats", suffix = "", reducedMotion }: { target?: number; duration?: number; label?: string; suffix?: string; reducedMotion: boolean }) {
  const [text, setText] = useState(`${formatCompact(0)}${suffix}`);
  const [isDone, setIsDone] = useState(false);
  useEffect(() => {
    setIsDone(false);
    const stop = scrambleToTarget(target, duration, (s) => setText(s), () => setIsDone(true), suffix, reducedMotion);
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
      </div>
      <style jsx>{`
        .telemetry-card { position: relative; width: 132px; height: 86px; }
        .telemetry-card__dot { position: absolute; top: -7px; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; border-radius: 999px; background: rgba(0,255,240,0.95); box-shadow: 0 0 14px rgba(0,255,240,0.8), 0 0 34px rgba(0,255,240,0.35); animation: ${reducedMotion ? "none" : "dot-pulse 3s ease-in-out infinite"}; z-index: 2; }
        @keyframes dot-pulse { 0%, 100% { opacity: 0.75; transform: translateX(-50%) scale(1); } 50% { opacity: 1; transform: translateX(-50%) scale(1.18); } }
        .telemetry-card__inner { position: relative; width: 100%; height: 100%; border-radius: 14px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); backdrop-filter: blur(12px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); display: flex; flex-direction: column; align-items: center; justify-content: center; transition: transform 260ms ease, border-color 260ms ease, background 260ms ease; overflow: hidden; }
        .group:hover .telemetry-card__inner { transform: translateY(-2px); border-color: rgba(0,255,240,0.22); background: rgba(0,255,240,0.06); }
        .telemetry-card__hud { position: absolute; top: 8px; left: 8px; right: 8px; display: flex; align-items: center; justify-content: space-between; gap: 8px; opacity: 0.9; pointer-events: none; }
        .telemetry-card__chip { font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; padding: 3px 6px; border-radius: 999px; border: 1px solid rgba(0,255,240,0.22); background: rgba(0,255,240,0.06); color: rgba(0,255,240,0.9); }
        .telemetry-card__ok { font-size: 9px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(220,230,240,0.9); }
        .telemetry-card__ok.ok { color: rgba(154,255,90,0.9); text-shadow: 0 0 12px rgba(154,255,90,0.25); }
        .telemetry-card__value { position: relative; z-index: 1; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; color: rgba(255,255,255,0.98); text-shadow: 0 0 18px rgba(0,255,240,0.12); }
        .telemetry-card__label { position: relative; z-index: 1; margin-top: 3px; font-size: 9px; font-weight: 650; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(220,230,240,0.95); }
      `}</style>
    </div>
  );
}

function CircuitDivider({ reducedMotion, className }: { reducedMotion: boolean; className?: string }) {
  return (
    <div className={className ?? ""} aria-hidden="true">
      <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="w-full h-6" role="presentation">
        <defs>
          <linearGradient id="wireGrad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="rgba(0,255,240,0)" /><stop offset="0.15" stopColor="rgba(0,255,240,0.25)" /><stop offset="0.5" stopColor="rgba(140,80,255,0.25)" /><stop offset="0.85" stopColor="rgba(154,255,90,0.18)" /><stop offset="1" stopColor="rgba(0,255,240,0)" />
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
        <pre className="devconsole__body">{`[${build.ts}] boot: swarp.foundation\n[${build.ts}] env: ${build.node}  region=${build.region}\n[${build.ts}] build: commit=${build.commit}\n[${build.ts}] status: ${build.status}\n[${build.ts}] hint: press "~" to toggle, type "swarp" anywhere`}</pre>
      </div>
      <style jsx>{`
        .devconsole { position: fixed; right: 16px; bottom: 16px; z-index: 50; width: min(420px, calc(100% - 32px)); }
        .devconsole__panel { border-radius: 16px; border: 1px solid rgba(0,255,240,0.16); background: rgba(8,10,14,0.98); backdrop-filter: blur(14px); box-shadow: 0 18px 60px rgba(0,0,0,0.6); overflow: hidden; animation: ${reducedMotion ? "none" : "pop 220ms ease-out"}; }
        @keyframes pop { from { opacity: 0; transform: translateY(10px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .devconsole__top { display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.04); }
        .devconsole__title { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 650; color: rgba(255,255,255,0.95); letter-spacing: 0.02em; }
        .devconsole__title .dot { width: 8px; height: 8px; border-radius: 999px; background: rgba(154,255,90,0.9); box-shadow: 0 0 14px rgba(154,255,90,0.25); }
        .devconsole__title .muted { color: rgba(180,190,200,0.8); font-weight: 600; }
        .devconsole__close { width: 28px; height: 28px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.9); font-size: 18px; line-height: 1; display: grid; place-items: center; cursor: pointer; transition: transform 120ms ease, border-color 120ms ease; }
        .devconsole__close:hover { transform: translateY(-1px); border-color: rgba(0,255,240,0.2); }
        .devconsole__body { margin: 0; padding: 12px 12px 10px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 12px; line-height: 1.5; color: rgba(240,245,250,0.95); white-space: pre-wrap; }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ScrambleLink — hacker decode on hover
   ───────────────────────────────────────────── */

function ScrambleLink({ href, children, badge }: { href: string; children: string; badge?: string }) {
  const { display, trigger, reset, isHovering } = useScramble(children);

  return (
    <li className="mb-3 w-fit">
      <Link
        href={href}
        onMouseEnter={trigger}
        onMouseLeave={reset}
        className="group/link flex items-center gap-2"
      >
        <span className={`font-mono text-[13px] transition-colors duration-300 ${isHovering ? "text-[#00FFF0]" : "text-gray-400"}`}>
          {isHovering ? "> " : ""}{display}
        </span>
        {badge && (
          <span className="text-[8px] font-bold tracking-[0.14em] uppercase px-1.5 py-0.5 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
            {badge}
          </span>
        )}
      </Link>
    </li>
  );
}

/* ScrambleButton — for legal modal triggers (not <a> / <Link>) */
function ScrambleButton({ onClick, children, badge }: { onClick: () => void; children: string; badge?: string }) {
  const { display, trigger, reset, isHovering } = useScramble(children);

  return (
    <li className="mb-3 w-fit">
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={trigger}
        onMouseLeave={reset}
        className="group/link flex items-center gap-2 bg-transparent border-none p-0 cursor-pointer text-left"
      >
        <span className={`font-mono text-[13px] transition-colors duration-300 ${isHovering ? "text-[#00FFF0]" : "text-gray-400"}`}>
          {isHovering ? "> " : ""}{display}
        </span>
        {badge && (
          <span className="text-[8px] font-bold tracking-[0.14em] uppercase px-1.5 py-0.5 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]">
            {badge}
          </span>
        )}
      </button>
    </li>
  );
}

/* ScrambleBottomLink — small bottom-bar legal links */
function ScrambleBottomLink({ onClick, children }: { onClick: () => void; children: string }) {
  const { display, trigger, reset, isHovering } = useScramble(children);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={trigger}
      onMouseLeave={reset}
      className="bg-transparent border-none p-0 cursor-pointer text-left"
    >
      <span className={`font-mono text-[12px] transition-colors duration-300 ${isHovering ? "text-[#00FFF0]" : "text-white/50"}`}>
        {display}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────────
   SOCIAL ICONS ROW
   ───────────────────────────────────────────── */

function SocialIcons() {
  return (
    <div className="flex items-center gap-2">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-[#00FFF0] hover:border-[#00FFF0]/25 hover:bg-[#00FFF0]/[0.06] transition-all duration-200 hover:-translate-y-0.5"
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN FOOTER
   ───────────────────────────────────────────── */

export function Footer() {
  const t = useTranslations("footer");
  const reducedMotion = usePrefersReducedMotion();
  const [devOpen, setDevOpen] = useState(false);
  const { openLegal } = useLegalModal();

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

  return (
    <div className="px-4 sm:px-8 lg:px-12 pb-6 mt-12 relative z-20">
      <footer className="relative rounded-3xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl">

        <div className="container mx-auto px-6 lg:px-12 py-10">

          {/* ── STATS ROW ── */}
          <div className="mb-10 pb-10 border-b border-white/[0.08]">
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-12">
              {stats.map((stat, i) => (
                <DotTelemetryCard key={i} target={stat.target} label={t(stat.labelKey)} duration={stat.duration} suffix={stat.suffix ?? ""} reducedMotion={reducedMotion} />
              ))}
            </div>
            <div className="mt-8"><CircuitDivider reducedMotion={reducedMotion} /></div>
          </div>

          {/* ── BRAND + LINKS GRID ── */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-start">

            {/* Brand column */}
            <div className="lg:col-span-4 space-y-5">
              <Link href="/" className="group w-fit flex items-center space-x-3">
                <div className="relative w-10 h-10 grid place-items-center rounded-full border border-white/15 bg-white/[0.06] overflow-hidden">
                  <Image src={swarpLogo} alt="Swarp" width={34} height={34} className="object-contain brightness-125 transition-transform group-hover:rotate-6" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-lg font-semibold tracking-tight text-white">Swarp Foundation</span>
                  <span className="text-[11px] tracking-[0.22em] uppercase text-white/50">{t("brand.tagline")}</span>
                </div>
              </Link>

              <p className="text-sm text-white/60 leading-relaxed max-w-xs">
                {t("brand.description")}
              </p>

              {/* Social icons */}
              <div className="pt-1">
                <SocialIcons />
              </div>

              <div className="text-[11px] text-white/30">
                <span className="font-mono">{t("tip.label")}</span> {t("tip.press")}{" "}
                <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded-md border border-white/15 bg-white/[0.06] text-white/80 mx-0.5">~</kbd>
                {" "}{t("tip.forLog")}
              </div>
            </div>

            {/* Link columns — with scramble effect */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {footerSections.map((section) => (
                <div key={section.titleKey}>
                  <h3 className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-[#00FFF0]/80 mb-5">
                    {t(section.titleKey)}
                  </h3>
                  <ul className="list-none p-0 m-0">
                    {section.links.map((link) =>
                      link.legal ? (
                        <ScrambleButton
                          key={link.nameKey}
                          onClick={() => openLegal(link.legal!)}
                          badge={link.badge}
                        >
                          {t(link.nameKey)}
                        </ScrambleButton>
                      ) : (
                        <ScrambleLink
                          key={link.nameKey}
                          href={link.href!}
                          badge={link.badge}
                        >
                          {t(link.nameKey)}
                        </ScrambleLink>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ── COMPANY INFO ── */}
          <div className="mt-10 pt-6 border-t border-white/[0.06]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px] text-white/30 leading-relaxed">
              <div className="space-y-1.5">
                <p className="text-white/50 font-semibold font-mono text-[10px] tracking-[0.1em] uppercase mb-2">{t("company.title")}</p>
                <p><span className="text-white/45">SWARP FOUNDATION S.R.L.</span> — Società a Responsabilità Limitata</p>
                <p>Viale Tunisia 22, 20124, Milano (MI), Italy</p>
                <p>Reg. No: 14284090967 &nbsp;·&nbsp; REA: MI-2771688 &nbsp;·&nbsp; P.IVA: 14284090967</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-white/50 font-semibold font-mono text-[10px] tracking-[0.1em] uppercase mb-2">{t("contact.title")}</p>
                <p>PEC: <a href="mailto:swarpfoundation@pec.it" className="text-[#00D4FF]/60 hover:text-[#00FFF0] transition-colors">swarpfoundation@pec.it</a></p>
                <p>Email: <a href="mailto:info@swarppay.com" className="text-[#00D4FF]/60 hover:text-[#00FFF0] transition-colors">info@swarppay.com</a></p>
              </div>
            </div>

          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[12px] text-white/50 font-medium font-mono">
              {t("copyright")}
            </p>
            <div className="flex items-center gap-6">
              <ScrambleBottomLink onClick={() => openLegal("privacy")}>{t("bottom.privacy")}</ScrambleBottomLink>
              <ScrambleBottomLink onClick={() => openLegal("terms")}>{t("bottom.terms")}</ScrambleBottomLink>
              <ScrambleBottomLink onClick={() => openLegal("security")}>{t("bottom.security")}</ScrambleBottomLink>
              <ScrambleBottomLink onClick={() => openLegal("cookies")}>{t("bottom.cookies")}</ScrambleBottomLink>
              <button
                type="button"
                onClick={() => setDevOpen((v) => !v)}
                className="font-mono text-[11px] px-2.5 py-1 rounded-full border border-white/15 bg-white/[0.06] text-white/80 hover:border-[#00FFF0]/25 hover:text-white transition-all cursor-pointer"
                aria-label="Toggle system log"
              >
                log
              </button>
            </div>
          </div>
        </div>

        <DevConsole open={devOpen} onClose={() => setDevOpen(false)} reducedMotion={reducedMotion} />
      </footer>
    </div>
  );
}
