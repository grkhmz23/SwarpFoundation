"use client";

import React, { useEffect, useMemo, useState } from "react";
import { KeyboardLink } from "@/components/ui/keyboard-button";
import { ArrowRight, MessageCircle, Shield, Zap, Cpu, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const codeLines = [
  "// Initializing Swarp Foundation...",
  "import { Web, Mobile, AI, Blockchain, Security } from '@swarp/stack';",
  "",
  "const services = {",
  "  platforms: ['Web Apps', 'Mobile Apps', 'APIs'],",
  "  intelligence: ['AI Chat', 'ML Models', 'Automation'],",
  "  web3: ['DeFi', 'Smart Contracts', 'Wallets'],",
  "  security: ['Audits', 'Penetration Testing', 'Monitoring'],",
  "  devops: ['Cloud Infrastructure', 'CI/CD', 'Kubernetes'],",
  "};",
  "",
  "const deploy = await Swarp.build(services);",
  "console.log('✨ Innovation deployed successfully');",
];

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

function CircuitFrame({ active, reducedMotion }: { active: boolean; reducedMotion: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="cframe" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="cgrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(0,255,240,0.0)" />
            <stop offset="0.18" stopColor="rgba(0,255,240,0.22)" />
            <stop offset="0.55" stopColor="rgba(140,80,255,0.16)" />
            <stop offset="0.78" stopColor="rgba(154,255,90,0.10)" />
            <stop offset="1" stopColor="rgba(0,255,240,0.0)" />
          </linearGradient>
          <filter id="cglow">
            <feGaussianBlur stdDeviation="0.75" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="8"
          ry="8"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
        />
        <rect
          x="2"
          y="2"
          width="96"
          height="96"
          rx="8"
          ry="8"
          fill="none"
          stroke="url(#cgrad)"
          strokeWidth="1.0"
          vectorEffect="non-scaling-stroke"
          filter="url(#cglow)"
          strokeDasharray="10 140"
          strokeDashoffset="0"
          className={active && !reducedMotion ? "trace" : ""}
          opacity={active ? 1 : 0.45}
        />

        <g opacity={active ? 0.85 : 0.55}>
          {[
            { x: 9, y: 9 },
            { x: 91, y: 9 },
            { x: 9, y: 91 },
            { x: 91, y: 91 },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="1.4" fill="rgba(0,255,240,0.55)" />
              <circle cx={p.x} cy={p.y} r="3.4" fill="none" stroke="rgba(0,255,240,0.12)" strokeWidth="0.9" />
            </g>
          ))}
        </g>
      </svg>

      <style jsx>{`
        .cframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.95;
        }
        .trace {
          animation: ctrace 7s linear infinite;
        }
        @keyframes ctrace {
          0% {
            stroke-dashoffset: 0;
            opacity: 0.55;
          }
          50% {
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -220;
            opacity: 0.55;
          }
        }
      `}</style>
    </div>
  );
}

function MetricChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="mchip">
      <div className="mchip__icon">{icon}</div>
      <div className="mchip__text">
        <div className="mchip__label">{label}</div>
        <div className="mchip__value">{value}</div>
      </div>

      <style jsx>{`
        .mchip {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          overflow: hidden;
        }
        @media (min-width: 640px) {
          .mchip {
            gap: 10px;
            padding: 10px 12px;
            border-radius: 16px;
          }
        }
        .mchip::before {
          content: "";
          position: absolute;
          inset: -50%;
          background: radial-gradient(circle at 30% 30%, rgba(0, 255, 240, 0.12), transparent 55%),
            radial-gradient(circle at 70% 60%, rgba(140, 80, 255, 0.10), transparent 60%);
          filter: blur(18px);
          opacity: 0.75;
          pointer-events: none;
        }
        .mchip__icon {
          width: 28px;
          height: 28px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(0, 255, 240, 0.16);
          background: rgba(0, 255, 240, 0.05);
          color: rgba(0, 255, 240, 0.9);
          box-shadow: 0 0 18px rgba(0, 255, 240, 0.08);
          position: relative;
          z-index: 1;
          flex: 0 0 auto;
        }
        @media (min-width: 640px) {
          .mchip__icon {
            width: 34px;
            height: 34px;
            border-radius: 12px;
          }
        }
        .mchip__text {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          line-height: 1.1;
        }
        .mchip__label {
          font-size: 9px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(148, 163, 184, 0.85);
          font-weight: 800;
        }
        @media (min-width: 640px) {
          .mchip__label {
            font-size: 10px;
          }
        }
        .mchip__value {
          font-size: 11px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.92);
        }
        @media (min-width: 640px) {
          .mchip__value {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}

export function Hero() {
  const t = useTranslations("hero");
  const reducedMotion = usePrefersReducedMotion();

  const codeLines = useMemo(
    () => [
      t("codeLines.0"),
      t("codeLines.1"),
      "",
      t("codeLines.3"),
      t("codeLines.4"),
      t("codeLines.5"),
      t("codeLines.6"),
      t("codeLines.7"),
      t("codeLines.8"),
      t("codeLines.9"),
      t("codeLines.10"),
      "",
      t("codeLines.12"),
      t("codeLines.13"),
    ],
    [t]
  );

  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplayedLines(codeLines);
      setCurrentLineIndex(codeLines.length);
      setCurrentText("");
      setCharIndex(0);
      return;
    }
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setCurrentText("");
    setCharIndex(0);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    if (currentLineIndex >= codeLines.length) return;

    const line = codeLines[currentLineIndex];

    if (charIndex < line.length) {
      const t = window.setTimeout(() => {
        setCurrentText(line.slice(0, charIndex + 1));
        setCharIndex((v) => v + 1);
      }, 34);
      return () => window.clearTimeout(t);
    } else {
      const t = window.setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentLineIndex((v) => v + 1);
        setCurrentText("");
        setCharIndex(0);
      }, 340);
      return () => window.clearTimeout(t);
    }
  }, [charIndex, currentLineIndex, reducedMotion]);

  const metrics = useMemo(
    () => [
      {
        icon: <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
        label: t("metrics.delivery.label"),
        value: t("metrics.delivery.value"),
      },
      {
        icon: <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
        label: t("metrics.quality.label"),
        value: t("metrics.quality.value"),
      },
      {
        icon: <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" />,
        label: t("metrics.stack.label"),
        value: t("metrics.stack.value"),
      },
    ],
    [t]
  );

  return (
    <section
      className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-24 pb-24 sm:pb-12 px-4 overflow-hidden"
      aria-label={t("ariaLabel")}
    >
      {/* Main content */}
      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left */}
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="badge">
              <span className="badge__dot" aria-hidden="true" />
              <span className="badge__text">{t("badge.text")}</span>
              <span className="badge__sep hidden sm:inline">•</span>
              <span className="badge__mono hidden sm:inline">{t("badge.mono")}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.02] tracking-tight">
              <span className="text-white">Swarp</span>
              <br />
              <span className="title-accent">{t("titleAccent")}</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-300/90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap gap-2 sm:gap-3 pt-1 justify-center lg:justify-start">
              {metrics.map((m) => (
                <MetricChip key={m.label} icon={m.icon} label={m.label} value={m.value} />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 items-center lg:items-start">
              <div className="cta-primary w-full sm:w-auto">
                <KeyboardLink
                  href="/works"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  {t("actions.exploreProjects")}
                </KeyboardLink>
              </div>

              <div className="cta-secondary w-full sm:w-auto">
                <KeyboardLink
                  href="/contact"
                  variant="ghost"
                  size="lg"
                  icon={<MessageCircle className="w-4 h-4" />}
                >
                  {t("actions.getInTouch")}
                </KeyboardLink>
              </div>
            </div>

            <div className="hint">
              <Sparkles className="w-4 h-4 text-cyan-300/80 flex-shrink-0" />
              <span>
                {t("hint")}
              </span>
            </div>
          </div>

          {/* Right — IDE/Telemetry panel (hidden on mobile) */}
          <div className="relative hidden lg:block">
            <div className="absolute -inset-5 glow" aria-hidden="true" />

            <div className="panel relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
              <CircuitFrame active={true} reducedMotion={reducedMotion} />

              <div className="pointer-events-none absolute inset-0">
                <div className={`rail rail--top ${reducedMotion ? "" : "on"}`} />
                <div className={`rail rail--bottom ${reducedMotion ? "" : "on"}`} />
              </div>

              <div className="winbar">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>

                <div className="winbar__title">{t("panel.fileName")}</div>

                <div className="winbar__right">
                  <span className="live-dot" />
                  <span className="live-text">{t("panel.live")}</span>
                </div>
              </div>

              <div className="codewrap">
                <div className="code">
                  {displayedLines.map((line, i) => (
                    <div key={i} className="row">
                      <span className="ln">{String(i + 1).padStart(2, "0")}</span>
                      <code className={classForLine(line)}>{line || " "}</code>
                    </div>
                  ))}

                  {currentText && !reducedMotion && (
                    <div className="row">
                      <span className="ln">{String(displayedLines.length + 1).padStart(2, "0")}</span>
                      <code className={classForLine(currentText)}>
                        {currentText}
                        <span className="caret" aria-hidden="true" />
                      </code>
                    </div>
                  )}
                </div>

                <div className="scan" aria-hidden="true" />
              </div>

              <div className="footbar">
                <span className="footbar__left">{t("panel.footerLeft")}</span>
                <span className="footbar__right">
                  <span className="ok-dot" />
                  {t("panel.uptime")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className={`scroll hidden sm:flex ${reducedMotion ? "" : "bounce"}`} aria-hidden="true">
        <span className="scroll__text">{t("scroll")}</span>
        <div className="mouse">
          <div className="wheel" />
        </div>
      </div>

      <style jsx>{`
        /* Badge */
        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 10px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(226, 232, 240, 0.9);
          width: fit-content;
          margin: 0 auto;
        }
        @media (min-width: 640px) {
          .badge {
            gap: 10px;
            padding: 10px 12px;
            margin: 0;
          }
        }
        @media (min-width: 1024px) {
          .badge {
            margin: 0;
          }
        }
        .badge__dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(0, 255, 240, 0.9);
          box-shadow: 0 0 16px rgba(0, 255, 240, 0.25);
          animation: ${reducedMotion ? "none" : "pulse 2.8s ease-in-out infinite"};
        }
        @media (min-width: 640px) {
          .badge__dot {
            width: 8px;
            height: 8px;
          }
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.75;
          }
          50% {
            transform: scale(1.18);
            opacity: 1;
          }
        }
        .badge__text {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        @media (min-width: 640px) {
          .badge__text {
            font-size: 12px;
            letter-spacing: 0.14em;
          }
        }
        .badge__sep {
          opacity: 0.5;
        }
        .badge__mono {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
            monospace;
          font-size: 12px;
          color: rgba(148, 163, 184, 0.9);
        }

        .title-accent {
          background: linear-gradient(90deg, rgba(34, 211, 238, 1), rgba(96, 165, 250, 1), rgba(168, 85, 247, 1));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0 0 40px rgba(0, 255, 240, 0.10);
        }

        .hint {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: rgba(148, 163, 184, 0.82);
          padding-top: 4px;
          text-align: left;
          justify-content: center;
        }
        @media (min-width: 640px) {
          .hint {
            font-size: 13px;
            gap: 10px;
          }
        }
        @media (min-width: 1024px) {
          .hint {
            justify-content: flex-start;
          }
        }

        /* Right panel */
        .glow {
          background: radial-gradient(circle at 30% 30%, rgba(0, 255, 240, 0.20), transparent 55%),
            radial-gradient(circle at 70% 60%, rgba(140, 80, 255, 0.18), transparent 60%),
            radial-gradient(circle at 60% 80%, rgba(154, 255, 90, 0.10), transparent 62%);
          border-radius: 28px;
          filter: blur(26px);
          opacity: 0.9;
        }
        .panel {
          transform: translateZ(0);
        }

        /* Rails */
        .rail {
          position: absolute;
          left: 14px;
          right: 14px;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(0, 255, 240, 0),
            rgba(0, 255, 240, 0.18),
            rgba(140, 80, 255, 0.14),
            rgba(154, 255, 90, 0.10),
            rgba(0, 255, 240, 0)
          );
          opacity: 0.55;
          filter: drop-shadow(0 0 10px rgba(0, 255, 240, 0.12));
        }
        .rail--top {
          top: 12px;
        }
        .rail--bottom {
          bottom: 12px;
        }
        .rail.on::after {
          content: "";
          position: absolute;
          top: -1px;
          left: -20%;
          width: 22%;
          height: 3px;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 240, 0.28), rgba(255, 255, 255, 0.10), transparent);
          filter: blur(1px);
          transform: skewX(-18deg);
          animation: ${reducedMotion ? "none" : "scan 4.4s ease-in-out infinite"};
          opacity: 0.85;
        }
        @keyframes scan {
          0% {
            left: -25%;
            opacity: 0.4;
          }
          45% {
            opacity: 0.95;
          }
          100% {
            left: 110%;
            opacity: 0.4;
          }
        }

        /* Window bar */
        .winbar {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .winbar__title {
          font-size: 12px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
            monospace;
          color: rgba(148, 163, 184, 0.9);
        }
        .winbar__right {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 4px 10px;
          border-radius: 999px;
          border: 1px solid rgba(0, 255, 240, 0.16);
          background: rgba(0, 255, 240, 0.05);
        }
        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: rgba(0, 255, 240, 0.9);
          box-shadow: 0 0 14px rgba(0, 255, 240, 0.25);
        }
        .live-text {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0, 255, 240, 0.85);
        }

        /* Code area */
        .codewrap {
          position: relative;
          padding: 14px 16px;
          height: 340px;
          overflow: hidden;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
            monospace;
          font-size: 13px;
          background: rgba(0, 0, 0, 0.20);
        }
        .code {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          line-height: 1.5;
          white-space: pre;
        }
        .ln {
          width: 30px;
          text-align: right;
          color: rgba(100, 116, 139, 0.75);
          user-select: none;
          flex: 0 0 auto;
        }
        .caret {
          display: inline-block;
          width: 8px;
          height: 14px;
          margin-left: 6px;
          background: rgba(0, 255, 240, 0.9);
          animation: ${reducedMotion ? "none" : "caret 1s ease-in-out infinite"};
          border-radius: 2px;
        }
        @keyframes caret {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }

        .scan {
          position: absolute;
          inset: 0;
          opacity: 0.18;
          background: repeating-linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.05) 0px,
            rgba(255, 255, 255, 0.05) 1px,
            transparent 1px,
            transparent 7px
          );
          mask-image: radial-gradient(70% 70% at 50% 35%, black, transparent 85%);
          mix-blend-mode: overlay;
          pointer-events: none;
          z-index: 1;
        }

        /* Footer bar */
        .footbar {
          background: rgba(255, 255, 255, 0.04);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          font-size: 12px;
        }
        .footbar__left {
          color: rgba(148, 163, 184, 0.85);
        }
        .footbar__right {
          color: rgba(0, 255, 240, 0.85);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
        }
        .ok-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: rgba(154, 255, 90, 0.9);
          box-shadow: 0 0 14px rgba(154, 255, 90, 0.22);
        }

        /* Scroll */
        .scroll {
          position: absolute;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          flex-direction: column;
          align-items: center;
          gap: 10px;
          opacity: 0.9;
          z-index: 10;
        }
        .bounce {
          animation: ${reducedMotion ? "none" : "bounce 1.9s ease-in-out infinite"};
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-8px);
          }
        }
        .scroll__text {
          font-size: 12px;
          color: rgba(100, 116, 139, 0.9);
        }
        .mouse {
          width: 26px;
          height: 42px;
          border-radius: 999px;
          border: 2px solid rgba(0, 255, 240, 0.18);
          display: flex;
          justify-content: center;
          padding-top: 8px;
          background: rgba(255, 255, 255, 0.02);
        }
        .wheel {
          width: 4px;
          height: 10px;
          border-radius: 999px;
          background: rgba(0, 255, 240, 0.7);
        }
      `}</style>
    </section>
  );
}

function classForLine(line: string) {
  if (line.startsWith("//")) return "text-slate-500";
  if (line.includes("import") || line.includes("const") || line.includes("await")) return "text-purple-300";
  if (line.includes(":")) return "text-cyan-300";
  if (line.includes("console.log")) return "text-emerald-300";
  return "text-slate-200";
}
