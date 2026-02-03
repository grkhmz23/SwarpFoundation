"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BellNotify } from "@/components/ui/bell-notify";
import { KeyboardLink } from "@/components/ui/keyboard-button";
import { ArrowRight, Zap, Shield, Rocket } from "lucide-react";

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

/** Detect CSS mask support (Safari/Chrome good; fallback to opacity reveal if missing). */
function useMaskSupport() {
  const [ok, setOk] = useState(true);
  useEffect(() => {
    try {
      const s = (window as any).CSS?.supports?.("mask-image", "radial-gradient(circle, #000, transparent)");
      const ws = (window as any).CSS?.supports?.("-webkit-mask-image", "radial-gradient(circle, #000, transparent)");
      setOk(Boolean(s || ws));
    } catch {
      setOk(true);
    }
  }, []);
  return ok;
}

function PipelineChip({
  icon,
  title,
  desc,
  index,
  active,
  reducedMotion,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
  active: boolean;
  reducedMotion: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0.78, y: 6 }}
      transition={{ duration: 0.55, delay: reducedMotion ? 0 : 0.08 + index * 0.08 }}
      className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden p-3 flex gap-2.5 items-start shadow-lg"
    >
      <div className="w-8 h-8 rounded-xl grid place-items-center border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 shadow-lg flex-shrink-0 relative z-10">
        {icon}
      </div>
      <div className="relative z-10 flex flex-col gap-0.5">
        <div className="text-xs font-extrabold tracking-widest uppercase text-white/90">{title}</div>
        <div className="text-xs leading-relaxed text-slate-300/90 max-w-[28ch]">{desc}</div>
      </div>

      {/* micro circuit shimmer */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -left-10 top-1/2 h-[2px] w-40 -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent" />
      </div>
    </motion.div>
  );
}

export function IdeaSection() {
  const reducedMotion = usePrefersReducedMotion();
  const supportsMask = useMaskSupport();
  const sectionRef = useRef<HTMLElement>(null);
  const lampRef = useRef<HTMLDivElement>(null);

  const isVisible = useInView(sectionRef, { amount: 0.45, once: false });

  // track lamp position inside section for accurate light/copy masking
  const [lamp, setLamp] = useState({ x: 50, y: 22 }); // percentages

  useEffect(() => {
    const host = sectionRef.current;
    const lampEl = lampRef.current;
    if (!host || !lampEl) return;

    const update = () => {
      const r = host.getBoundingClientRect();
      const lr = lampEl.getBoundingClientRect();

      // lamp center (a bit below bell to feel like a "projector")
      const cx = (lr.left + lr.width / 2 - r.left) / Math.max(1, r.width);
      const cy = (lr.top + lr.height * 0.72 - r.top) / Math.max(1, r.height);

      setLamp({
        x: Math.max(0, Math.min(100, cx * 100)),
        y: Math.max(0, Math.min(100, cy * 100)),
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(host);
    ro.observe(lampEl);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const chips = useMemo(
    () => [
      { icon: <Zap className="w-4 h-4" />, title: "Idea", desc: "Drop the concept. We translate it into a build plan." },
      { icon: <Shield className="w-4 h-4" />, title: "Spec", desc: "Scope, timeline, and risks — locked in fast." },
      { icon: <Rocket className="w-4 h-4" />, title: "Ship", desc: "Production delivery with clean handoff + support." },
    ],
    []
  );

  const benefits = useMemo(
    () => [
      { k: "Scope in 24–48h", v: "We define deliverables, timeline, and risk boundaries." },
      { k: "Fast iterations", v: "Tight loops. Visible progress. No long silence." },
      { k: "Production quality", v: "Clean architecture, tests, and deployment readiness." },
      { k: "Developer-friendly", v: "Docs, handoff, and long-term maintainability." },
    ],
    []
  );

  // Light parameters (CSS variables)
  const lightVars: React.CSSProperties = {
    // lamp origin
    ["--lx" as any]: `${lamp.x}%`,
    ["--ly" as any]: `${lamp.y}%`,
    // cone size
    ["--coneW" as any]: "66%",
    ["--coneH" as any]: "78%",
    // glow intensity
    ["--pwr" as any]: isVisible ? 1 : 0,
  };

  return (
    <section
      ref={sectionRef}
      style={lightVars}
      className="relative w-full overflow-hidden min-h-[860px] flex items-center justify-center py-24"
      aria-label="Got an idea section"
    >
      <div className="relative z-10 w-full max-w-6xl px-4 sm:px-8">
        <div className="relative mx-auto rounded-[30px] border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Ambient circuitry + vignette */}
          <div className="pointer-events-none absolute inset-0">
            <div className="circuit-grid" />
            <div className="vignette" />
          </div>

          {/* Light cone + beam particles (powered by scroll / inView) */}
          <div className="pointer-events-none absolute inset-0">
            <div className={`cone ${isVisible ? "on" : ""}`} />
            <div className={`beamNoise ${isVisible ? "on" : ""}`} />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 p-8 sm:p-10 lg:p-12 items-center">
            {/* LEFT: Lamp + pipeline chips */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start">
              <div className="relative w-full flex items-center justify-center lg:justify-start">
                <div ref={lampRef} className="relative">
                  {/* power halo */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0.35, scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                    className="relative rounded-full p-2.5 border border-white/10 bg-white/5"
                  >
                    <div className={`lampHalo ${isVisible ? "on" : ""}`} aria-hidden="true" />
                    <BellNotify
                      size={360}
                      isOn={isVisible}
                      showButton={false}
                      rotationAmplitude={isVisible ? 0.65 : 0}
                      disableToggle={true}
                    />
                  </motion.div>
                </div>
              </div>

              <div className="mt-8 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                {chips.map((c, idx) => (
                  <PipelineChip
                    key={c.title}
                    icon={c.icon}
                    title={c.title}
                    desc={c.desc}
                    index={idx}
                    active={isVisible}
                    reducedMotion={reducedMotion}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT: Text that appears ONLY under the light */}
            <div className="lg:col-span-6">
              <AnimatePresence mode="wait">
                {isVisible && (
                  <motion.div
                    key="copy"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.65, delay: reducedMotion ? 0 : 0.10 }}
                    className="text-center lg:text-left"
                  >
                    <div className="inline-flex items-center gap-2.5 px-3 py-2 rounded-full border border-white/10 bg-white/5 text-slate-200 mb-5">
                      <span className={`w-2 h-2 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/25 ${reducedMotion ? "" : "animate-pulse"}`} />
                      <span className="text-xs font-extrabold tracking-widest uppercase">Rapid Delivery Mode</span>
                      <span className="opacity-50">•</span>
                      <span className="font-mono text-xs text-slate-400">idea → production</span>
                    </div>

                    {/* LIT COPY WRAP */}
                    <div className={`litWrap ${supportsMask ? "mask" : "fade"}`}>
                      <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                        Got an <span className="text-cyan-400">Idea</span>?
                      </h2>

                      <p className="mt-4 text-slate-300 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                        If you can describe it, we can build it. Swarp turns raw concepts into production-ready software —
                        fast, clean, and engineered for scale.
                      </p>

                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto lg:mx-0">
                        {benefits.map((b) => (
                          <div key={b.k} className="benefit rounded-2xl border border-white/10 bg-white/5 p-3">
                            <div className="text-xs font-extrabold text-white/90 tracking-wide">{b.k}</div>
                            <div className="mt-1 text-xs leading-relaxed text-slate-400">{b.v}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
                        <KeyboardLink
                          href="/services"
                          variant="primary"
                          size="lg"
                          icon={<ArrowRight className="w-5 h-5" />}
                        >
                          Explore Services
                        </KeyboardLink>

                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400/30 transition-colors"
                        >
                          Or send a message →
                        </Link>
                      </div>

                      <div className="mt-6 text-xs text-slate-500">
                        <span className="font-mono text-slate-400 mr-1.5">pro tip:</span>
                        include goals + constraints + deadline for a faster spec.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <style jsx>{`
            /* background texture */
            .circuit-grid {
              position: absolute;
              inset: 0;
              opacity: 0.20;
              background-image:
                linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
              background-size: 56px 56px;
              mask-image: radial-gradient(70% 70% at 50% 30%, black, transparent 85%);
            }
            .vignette {
              position: absolute;
              inset: 0;
              background: radial-gradient(80% 70% at 50% 30%, transparent, rgba(0, 0, 0, 0.70));
              opacity: 0.95;
            }

            /* lamp halo (tight, "powered") */
            .lampHalo {
              position: absolute;
              inset: -20%;
              border-radius: 999px;
              background:
                radial-gradient(circle at 50% 50%, rgba(0, 255, 240, 0.18), transparent 55%),
                radial-gradient(circle at 60% 35%, rgba(140, 80, 255, 0.14), transparent 60%);
              filter: blur(22px);
              opacity: 0.0;
              transition: opacity 700ms ease;
              pointer-events: none;
            }
            .lampHalo.on {
              opacity: 1;
            }

            /* Light cone */
            .cone {
              position: absolute;
              inset: 0;
              opacity: 0;
              transform: translateZ(0);
              transition: opacity 700ms ease;
              /* cone is built from gradients; crisp-ish */
              background:
                radial-gradient(
                  110% 85% at var(--lx) var(--ly),
                  rgba(0, 255, 240, 0.14) 0%,
                  rgba(0, 255, 240, 0.08) 18%,
                  rgba(140, 80, 255, 0.06) 34%,
                  transparent 62%
                ),
                conic-gradient(
                  from 200deg at var(--lx) var(--ly),
                  transparent 0deg,
                  rgba(0, 255, 240, 0.10) 20deg,
                  rgba(255, 255, 255, 0.06) 34deg,
                  rgba(140, 80, 255, 0.08) 52deg,
                  transparent 72deg,
                  transparent 360deg
                );
              mask-image:
                radial-gradient(
                  var(--coneW) var(--coneH) at var(--lx) var(--ly),
                  rgba(0, 0, 0, 0.95) 0%,
                  rgba(0, 0, 0, 0.65) 35%,
                  rgba(0, 0, 0, 0.0) 70%
                );
            }
            .cone.on {
              opacity: 1;
            }

            /* Beam noise / "dust in light" */
            .beamNoise {
              position: absolute;
              inset: 0;
              opacity: 0;
              transition: opacity 700ms ease;
              background:
                radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.10), transparent 40%),
                radial-gradient(circle at 70% 65%, rgba(0, 255, 240, 0.10), transparent 45%),
                radial-gradient(circle at 45% 55%, rgba(140, 80, 255, 0.08), transparent 50%);
              filter: blur(18px);
              mix-blend-mode: screen;
            }
            .beamNoise.on {
              opacity: 0.9;
            }

            /* LIT CONTENT MASK */
            .litWrap {
              position: relative;
            }

            /* mask mode: content only visible under light */
            .litWrap.mask {
              --m:
                radial-gradient(
                  54% 44% at var(--lx) calc(var(--ly) + 18%),
                  rgba(0, 0, 0, 1) 0%,
                  rgba(0, 0, 0, 0.92) 30%,
                  rgba(0, 0, 0, 0.22) 62%,
                  rgba(0, 0, 0, 0.0) 76%
                );
              -webkit-mask-image: var(--m);
              mask-image: var(--m);
              -webkit-mask-repeat: no-repeat;
              mask-repeat: no-repeat;
              -webkit-mask-size: 120% 120%;
              mask-size: 120% 120%;
              -webkit-mask-position: 0 0;
              mask-position: 0 0;
              transition: -webkit-mask-image 250ms ease;
            }

            /* fallback if mask unsupported: soft staged reveal */
            .litWrap.fade {
              opacity: 1;
            }

            /* benefits get a tiny "edge catch" when lit */
            .benefit {
              position: relative;
              overflow: hidden;
            }
            .benefit::before {
              content: "";
              position: absolute;
              inset: -40%;
              background: radial-gradient(circle at var(--lx) var(--ly), rgba(0, 255, 240, 0.10), transparent 55%);
              opacity: 0.65;
              pointer-events: none;
              transform: translateZ(0);
            }

            @media (prefers-reduced-motion: reduce) {
              .lampHalo,
              .cone,
              .beamNoise {
                transition: none !important;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

export default IdeaSection;
