"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ChevronUp,
  Terminal,
  Activity,
  Cpu,
  Database,
  Globe,
  Shield,
  Zap,
} from "lucide-react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

function CircuitBorder({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2]">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="footer-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(0,255,240,0)" />
            <stop offset="18%" stopColor="rgba(0,255,240,0.22)" />
            <stop offset="55%" stopColor="rgba(140,80,255,0.16)" />
            <stop offset="78%" stopColor="rgba(154,255,90,0.10)" />
            <stop offset="100%" stopColor="rgba(0,255,240,0)" />
          </linearGradient>
          <filter id="footer-glow">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="3"
          ry="3"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
        <rect
          x="1"
          y="1"
          width="98"
          height="98"
          rx="3"
          ry="3"
          fill="none"
          stroke="url(#footer-grad)"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          filter="url(#footer-glow)"
          strokeDasharray="8 120"
          strokeDashoffset="0"
          style={{
            animation: reducedMotion ? "none" : "footer-trace 9s linear infinite",
          }}
        />
        {[
          { x: 4, y: 4 },
          { x: 96, y: 4 },
          { x: 4, y: 96 },
          { x: 96, y: 96 },
        ].map((p, i) => (
          <g key={i} opacity="0.7">
            <circle cx={p.x} cy={p.y} r="1" fill="rgba(0,255,240,0.5)" />
            <circle
              cx={p.x}
              cy={p.y}
              r="2.5"
              fill="none"
              stroke="rgba(0,255,240,0.12)"
              strokeWidth="0.6"
            />
          </g>
        ))}
      </svg>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes footer-trace {
          0% { stroke-dashoffset: 0; opacity: 0.5; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: -180; opacity: 0.5; }
        }
      `,
        }}
      />
    </div>
  );
}

function TelemetryCard({
  icon,
  label,
  value,
  sub,
  pulse,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  pulse?: boolean;
}) {
  return (
    <div className="relative flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2.5 backdrop-blur-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/5 text-cyan-400">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
          {value}
          {pulse && (
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
          )}
        </span>
        {sub && <span className="text-[10px] text-slate-500">{sub}</span>}
      </div>
    </div>
  );
}

function DevConsole({ reducedMotion }: { reducedMotion: boolean }) {
  const [logs, setLogs] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const logMessages = useMemo(
    () => [
      "[swarp] ✓ services.init()",
      "[swarp] ✓ telemetry.connect()",
      "[swarp] ✓ security.verify()",
      "[swarp] ✓ cache.warm()",
      "[swarp] ✓ deploy.ready()",
      "[swarp] ▸ awaiting request...",
    ],
    []
  );

  useEffect(() => {
    if (reducedMotion) {
      setLogs(logMessages);
      return;
    }
    let idx = 0;
    const iv = setInterval(() => {
      if (idx < logMessages.length) {
        setLogs((p) => [...p, logMessages[idx]]);
        idx++;
      } else {
        clearInterval(iv);
      }
    }, 600);
    return () => clearInterval(iv);
  }, [reducedMotion, logMessages]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/8 bg-black/60 backdrop-blur-md">
      <div className="flex items-center gap-2 border-b border-white/8 bg-white/[0.02] px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-2 font-mono text-[10px] text-slate-500">
          swarp-foundation.sh
        </span>
      </div>
      <div
        ref={containerRef}
        className="h-28 overflow-y-auto p-3 font-mono text-xs leading-relaxed"
      >
        {logs.map((log, i) => (
          <div key={i} className="text-emerald-400/90">
            {log}
          </div>
        ))}
        {!reducedMotion && logs.length < logMessages.length && (
          <span className="inline-block h-3.5 w-1.5 animate-pulse bg-cyan-400" />
        )}
      </div>
    </div>
  );
}

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Works", href: "/works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { icon: <Github className="h-4 w-4" />, href: "https://github.com/swarp", label: "GitHub" },
  { icon: <Twitter className="h-4 w-4" />, href: "https://twitter.com/swarp", label: "Twitter" },
  { icon: <Linkedin className="h-4 w-4" />, href: "https://linkedin.com/company/swarp", label: "LinkedIn" },
];

export function Footer() {
  const reducedMotion = usePrefersReducedMotion();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden py-12 px-4 sm:px-8" aria-label="Site footer">
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(60% 60% at 50% 40%, black, transparent 80%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="relative rounded-2xl border border-white/8 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
          <CircuitBorder reducedMotion={reducedMotion} />

          <div className="relative z-10 grid gap-10 p-8 md:grid-cols-12 md:gap-8 lg:p-10">
            <div className="md:col-span-4 space-y-5">
              <Link href="/" className="inline-flex items-center gap-2 group">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-lg shadow-cyan-500/10 transition-transform group-hover:scale-105">
                  <Zap className="h-5 w-5" />
                </div>
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Swarp<span className="text-cyan-400">.</span>
                </span>
              </Link>

              <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
                Full-stack software development from concept to production. Web, Mobile, AI, Blockchain, and beyond.
              </p>

              <div className="flex gap-2">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/8 bg-white/[0.02] text-slate-400 transition-colors hover:border-cyan-500/30 hover:text-cyan-400"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Navigate
              </h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-cyan-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-cyan-400/70" />
                  <a href="mailto:hello@swarp.dev" className="hover:text-cyan-400 transition-colors">
                    hello@swarp.dev
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-cyan-400/70" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-cyan-400/70 mt-0.5" />
                  <span>San Francisco, CA</span>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                System Status
              </h4>
              <div className="grid gap-2">
                <TelemetryCard
                  icon={<Activity className="h-4 w-4" />}
                  label="Uptime"
                  value="99.98%"
                  pulse
                />
                <TelemetryCard
                  icon={<Globe className="h-4 w-4" />}
                  label="Response"
                  value="42ms"
                  sub="avg latency"
                />
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-white/8 px-8 py-5 lg:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:gap-3">
                <TelemetryCard icon={<Cpu className="h-4 w-4" />} label="Projects" value="127+" />
                <TelemetryCard icon={<Database className="h-4 w-4" />} label="Commits" value="48K" />
                <TelemetryCard icon={<Shield className="h-4 w-4" />} label="Audits" value="89" />
                <TelemetryCard icon={<Terminal className="h-4 w-4" />} label="Deploys" value="2.1K" />
              </div>
              <div className="hidden md:block w-64">
                <DevConsole reducedMotion={reducedMotion} />
              </div>
            </div>
          </div>

          <div className="relative z-10 border-t border-white/8 px-8 py-4 lg:px-10">
            <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
              <span>© {new Date().getFullYear()} Swarp Foundation. All rights reserved.</span>
              <div className="flex gap-4">
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-cyan-400 transition-colors">
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-black/80 text-cyan-400 shadow-lg shadow-cyan-500/20 backdrop-blur-md transition-transform hover:scale-110"
            aria-label="Scroll to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

export default Footer;
