"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BellNotify } from "@/components/ui/bell-notify";
import { KeyboardLink } from "@/components/ui/keyboard-button";
import { ArrowRight, Zap, Shield, Rocket } from "lucide-react";
import { useTranslations } from "next-intl";

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

function PipelineChip({
  icon,
  title,
  index,
  active,
  reducedMotion,
}: {
  icon: React.ReactNode;
  title: string;
  index: number;
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.3 + index * 0.1 }}
      className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden px-3 py-2 sm:px-4 sm:py-3 flex gap-2 sm:gap-2.5 items-center shadow-lg"
    >
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg grid place-items-center border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 shadow-lg flex-shrink-0">
        {icon}
      </div>
      <span className="text-xs sm:text-sm font-bold tracking-wide text-white/90">{title}</span>
    </motion.div>
  );
}

export function IdeaSection() {
  const t = useTranslations("ideaSection");
  const reducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const lampRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Two-stage visibility:
  // 1. lampVisible: triggers when section enters view (shows dark lamp)
  // 2. lightOn: triggers when more of section is visible (turns light on + shows text)
  const lampVisible = useInView(sectionRef, { amount: 0.1, once: false });
  const lightOn = useInView(sectionRef, { amount: isMobile ? 0.15 : 0.35, once: false });

  const [lamp, setLamp] = useState({ x: 30, y: 40 });

  useEffect(() => {
    const host = sectionRef.current;
    const lampEl = lampRef.current;
    if (!host || !lampEl) return;

    const update = () => {
      const r = host.getBoundingClientRect();
      const lr = lampEl.getBoundingClientRect();

      const cx = (lr.left + lr.width / 2 - r.left) / Math.max(1, r.width);
      const cy = (lr.top + lr.height * 0.8 - r.top) / Math.max(1, r.height);

      setLamp({
        x: Math.max(0, Math.min(100, cx * 100)),
        y: Math.max(0, Math.min(100, cy * 100)),
      });
    };

    update();
    const supportsResizeObserver = typeof window !== "undefined" && "ResizeObserver" in window;
    const ro = supportsResizeObserver ? new ResizeObserver(update) : null;
    ro?.observe(host);
    ro?.observe(lampEl);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      ro?.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const chips = useMemo(
    () => [
      { icon: <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, title: t("chips.idea") },
      { icon: <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, title: t("chips.spec") },
      { icon: <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4" />, title: t("chips.ship") },
    ],
    [t]
  );

  const lightVars: React.CSSProperties = {
    ["--lx" as any]: `${lamp.x}%`,
    ["--ly" as any]: `${lamp.y}%`,
  };

  return (
    <section
      ref={sectionRef}
      style={lightVars}
      className="idea-section relative w-full overflow-hidden min-h-[500px] md:min-h-[650px] flex items-center justify-center py-12 md:py-16"
      aria-label={t("ariaLabel")}
    >
      {/* Light cone effect - only visible when lightOn */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className={`cone ${lightOn ? "on" : ""}`} />
        <div className={`beamNoise ${lightOn ? "on" : ""}`} />
      </div>

      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-8">
        {/* Mobile Layout - Stacked */}
        <div className="flex flex-col md:hidden items-center gap-6">
          {/* Lamp - smaller on mobile */}
          <motion.div
            ref={isMobile ? lampRef : undefined}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={lampVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className={`lampHalo ${lightOn ? "on" : ""}`} aria-hidden="true" />
            <BellNotify
              size={180}
              isOn={lightOn}
              showButton={false}
              rotationAmplitude={lightOn ? 0.65 : 0}
              disableToggle={true}
            />
          </motion.div>

          {/* Pipeline chips - horizontal on mobile */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-16">
            {chips.map((c, idx) => (
              <PipelineChip
                key={c.title}
                icon={c.icon}
                title={c.title}
                index={idx}
                active={lightOn}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          {/* Text content - centered on mobile */}
          <AnimatePresence mode="wait">
            {lightOn && (
              <motion.div
                key="copy-mobile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.1 }}
                className="text-center px-2 mt-16"
              >
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  {t("titlePrefix")} <span className="text-cyan-400">{t("titleAccent")}</span>?
                </h2>

                <p className="mt-3 text-slate-300 text-base leading-relaxed">
                  {t("subtitle")}
                </p>

                <div className="mt-4 flex flex-wrap gap-3 justify-center text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {t("bullets.scope")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {t("bullets.iterations")}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    {t("bullets.quality")}
                  </span>
                </div>

                <div className="mt-6 flex flex-col gap-3 items-center">
                  <KeyboardLink
                    href="/services"
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                  >
                    {t("actions.exploreServices")}
                  </KeyboardLink>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/30 transition-colors text-sm"
                  >
                    {t("actions.sendMessage")} →
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Layout - Grid */}
        <div className="hidden md:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT: Lamp + pipeline chips */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            {/* Lamp - always visible when in view, but light state changes */}
            <motion.div
              ref={!isMobile ? lampRef : undefined}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={lampVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className={`lampHalo ${lightOn ? "on" : ""}`} aria-hidden="true" />
              <BellNotify
                size={260}
                isOn={lightOn}
                showButton={false}
                rotationAmplitude={lightOn ? 0.65 : 0}
                disableToggle={true}
              />
            </motion.div>

            {/* Pipeline chips - well below lamp, only show when light is on */}
            <div className="mt-32 lg:mt-44 w-full flex flex-wrap items-center justify-center lg:justify-start gap-3">
              {chips.map((c, idx) => (
                <PipelineChip
                  key={c.title}
                  icon={c.icon}
                  title={c.title}
                  index={idx}
                  active={lightOn}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Text content - only shows after light turns on */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {lightOn && (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.2 }}
                  className="text-center lg:text-left"
                >
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                    {t("titlePrefix")} <span className="text-cyan-400">{t("titleAccent")}</span>?
                  </h2>

                  <p className="mt-5 text-slate-300 text-lg leading-relaxed max-w-lg">
                    {t("subtitle")}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {t("bullets.scope")}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {t("bullets.iterations")}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {t("bullets.quality")}
                    </span>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                    <KeyboardLink
                      href="/services"
                      variant="primary"
                      size="lg"
                      icon={<ArrowRight className="w-5 h-5" />}
                    >
                      {t("actions.exploreServices")}
                    </KeyboardLink>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/30 transition-colors text-sm"
                    >
                      {t("actions.sendMessage")} →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style jsx>{`
        .lampHalo {
          position: absolute;
          inset: -50%;
          border-radius: 999px;
          background:
            radial-gradient(circle at 50% 60%, rgba(0, 255, 240, 0.25), transparent 55%),
            radial-gradient(circle at 55% 40%, rgba(140, 80, 255, 0.18), transparent 50%);
          filter: blur(40px);
          opacity: 0;
          transition: opacity 0.8s ease;
          pointer-events: none;
        }
        .lampHalo.on {
          opacity: 1;
        }

        .cone {
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateZ(0);
          transition: opacity 0.8s ease;
          background:
            radial-gradient(
              ellipse 120% 100% at var(--lx) var(--ly),
              rgba(0, 255, 240, 0.12) 0%,
              rgba(0, 255, 240, 0.08) 25%,
              rgba(140, 80, 255, 0.05) 45%,
              transparent 70%
            );
        }
        .cone.on {
          opacity: 1;
        }

        .beamNoise {
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.8s ease;
          background:
            radial-gradient(circle at 25% 35%, rgba(255, 255, 255, 0.08), transparent 40%),
            radial-gradient(circle at 60% 60%, rgba(0, 255, 240, 0.08), transparent 45%),
            radial-gradient(circle at 40% 50%, rgba(140, 80, 255, 0.06), transparent 50%);
          filter: blur(30px);
          mix-blend-mode: screen;
        }
        .beamNoise.on {
          opacity: 0.8;
        }

        @media (prefers-reduced-motion: reduce) {
          .lampHalo,
          .cone,
          .beamNoise {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default IdeaSection;
