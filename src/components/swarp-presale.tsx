"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const credibilityBadges = ["Solana-Powered", "Audited", "Live Q2 2025"];

export function SwarpPresale() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-400/10 via-cyan-400/5 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyan-400/10 via-cyan-400/5 to-transparent" />
        <div className="absolute left-1/2 top-8 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-full max-w-3xl"
        >
          <div className="group relative">
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-[1px] rounded-[30px] bg-[linear-gradient(120deg,rgba(0,255,240,0.2),rgba(120,119,255,0.18),rgba(0,255,240,0.2))] blur-[1px]"
              style={{ backgroundSize: "220% 220%" }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            />

            <div className="relative overflow-hidden rounded-[30px] border border-cyan-300/20 bg-slate-950/65 p-7 shadow-[0_20px_70px_rgba(2,8,22,0.65)] backdrop-blur-xl sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(0,255,240,0.12),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.12),transparent_50%)]" />
              <div className="pointer-events-none absolute -left-24 top-20 h-44 w-44 rounded-full bg-cyan-400/8 blur-3xl" />
              <div className="pointer-events-none absolute -right-24 bottom-4 h-44 w-44 rounded-full bg-indigo-400/10 blur-3xl" />

              <div className="relative flex flex-col gap-7">
                <div className="space-y-4 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-300/90">
                    Token Presale
                  </p>
                  <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                    SWARP Token Presale Is Launching Soon
                  </h2>
                  <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-300/90 sm:text-base">
                    Early access opens for ecosystem participants. Get positioned for rewards, cashback mechanics,
                    and utility expansion across the Swarp network.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {credibilityBadges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-cyan-300/25 bg-cyan-400/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <motion.a
                    href="https://swarppay.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-cyan-300/35 bg-cyan-400/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-100 transition-colors hover:bg-cyan-300/22 sm:w-auto"
                  >
                    Visit Presale Page
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.a>
                  <p className="text-center text-xs text-slate-400 sm:text-left">
                    Public details and participation updates are live on swarppay.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
