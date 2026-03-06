"use client";

import { ExternalLink, ShieldCheck, Sparkles, Wifi } from "lucide-react";
import Image from "next/image";

const signalChips = [
  { icon: Wifi, label: "Solana SPL" },
  { icon: Sparkles, label: "Presale Soon" },
  { icon: ShieldCheck, label: "Compliance-First" },
];

const metrics = [
  { label: "Token Network", value: "Solana (SPL)" },
  { label: "Initial Price", value: "~$0.03" },
  { label: "Total Supply", value: "1,000,000,000" },
  { label: "Access", value: "SwarpPay.com" },
];

const allocation = [
  { label: "Team", value: "12%" },
  { label: "Investors (Seed + Strategic)", value: "15%" },
  { label: "Advisors and Partners", value: "3%" },
  { label: "Ecosystem Rewards", value: "28%" },
  { label: "Treasury and Reserve", value: "17%" },
  { label: "DEX Liquidity", value: "5%" },
  { label: "CEX Liquidity Reserve", value: "3%" },
  { label: "Community and Public Float", value: "17%" },
];

const SWARPPAY_HREF = "https://swarppay.com";

export function SwarpPresale() {
  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,rgba(0,255,240,0.18),transparent_42%),radial-gradient(ellipse_at_78%_70%,rgba(0,110,255,0.16),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(rgba(0,212,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.05)_1px,transparent_1px)] bg-[size:46px_46px] [mask-image:radial-gradient(circle_at_center,black_42%,transparent_90%)]" />

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-[30px] border border-cyan-200/25 bg-[linear-gradient(145deg,rgba(5,8,24,0.96),rgba(6,16,38,0.92)_48%,rgba(4,8,24,0.96))] p-5 shadow-[0_30px_100px_rgba(2,8,22,0.82)] md:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06),transparent_24%,transparent_72%,rgba(255,255,255,0.06))]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/35 to-transparent" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/18 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-500/16 blur-3xl" />

          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
            <div className="space-y-9">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-300/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-50">
                <Sparkles className="h-3.5 w-3.5" />
                Cinematic Trading Desk
              </div>

              <div className="space-y-4">
                <h2 className="text-balance text-3xl font-semibold leading-tight text-white md:text-[3.2rem] md:leading-[1.04]">
                  SWARP Presale Terminal
                </h2>
                <p className="max-w-2xl text-pretty text-sm leading-relaxed text-slate-300 md:text-base">
                  Premium interface, verified tokenomics context, and direct access to the live platform.
                  SWARP purchase flow opens on SwarpPay.
                </p>
              </div>

              <div className="space-y-3 rounded-2xl border border-cyan-300/20 bg-[#07132b]/70 p-4 backdrop-blur-sm">
                <div className="flex flex-wrap gap-2">
                  {signalChips.map((chip) => {
                    const Icon = chip.icon;
                    return (
                      <span
                        key={chip.label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200/25 bg-cyan-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100/95"
                      >
                        <Icon className="h-3 w-3" />
                        {chip.label}
                      </span>
                    );
                  })}
                </div>
                <div className="relative h-1 overflow-hidden rounded-full bg-[#10284a]">
                  <div className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-cyan-300 via-cyan-200 to-blue-300 opacity-85" />
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={SWARPPAY_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-cyan-100/40 bg-gradient-to-r from-cyan-300/25 to-blue-300/20 px-5 py-2.5 text-sm font-semibold text-cyan-50 transition hover:from-cyan-300/35 hover:to-blue-300/30"
                >
                  Join Presale
                  <ExternalLink className="h-4 w-4" />
                </a>
                <a
                  href={SWARPPAY_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                >
                  Read Tokenomics
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl border border-cyan-200/20 bg-[linear-gradient(160deg,rgba(6,13,33,0.95),rgba(7,19,42,0.9))] p-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_14px_35px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-6">
              <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-cyan-100/35 to-transparent" />

              <div className="absolute -top-9 right-4 z-20 sm:right-6">
                <div className="relative rounded-full border border-cyan-200/40 bg-gradient-to-br from-cyan-200/20 via-cyan-300/15 to-blue-300/20 p-[6px] shadow-[0_0_42px_rgba(0,255,240,0.3)]">
                  <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-[#08162f] sm:h-24 sm:w-24">
                    <Image
                      src="/logo_transparent_original.png"
                      alt="SWARP token logo"
                      width={96}
                      height={96}
                      sizes="96px"
                      className="object-contain p-3.5"
                    />
                  </div>
                </div>
                <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-100/90">
                  SWARP Token
                </p>
              </div>

              <div className="mb-4 border-b border-cyan-300/15 pb-3 pr-24 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100/70">
                Trading Terminal
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {metrics.map((item, idx) => (
                  <div
                    key={item.label}
                    className={`rounded-xl border px-3 py-3 md:px-4 md:py-3.5 ${
                      idx === 1
                        ? "border-cyan-200/30 bg-gradient-to-br from-cyan-300/15 to-blue-300/10"
                        : "border-cyan-300/15 bg-cyan-300/[0.04]"
                    }`}
                  >
                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                    <p className="mt-1 text-lg font-semibold text-white md:text-xl">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-cyan-200/20 bg-gradient-to-r from-cyan-300/[0.08] to-blue-300/[0.07] p-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Live Purchase Notice</p>
                <p className="mt-1 text-sm font-semibold text-white">Real SWARP purchase flow is on swarppay.com.</p>
              </div>

              <div className="mt-5 rounded-xl border border-cyan-300/15 bg-[#051028]/75 p-4">
                <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-cyan-100/90">Allocation Matrix</p>
                <div className="space-y-2">
                  {allocation.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0"
                    >
                      <span className="text-xs text-slate-300">{item.label}</span>
                      <span className="font-mono text-xs tracking-wide text-cyan-100">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
