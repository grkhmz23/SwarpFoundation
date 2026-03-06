import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

export default function PresalePage() {
  return (
    <main className="relative isolate overflow-hidden px-4 py-16 text-white sm:px-6 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,255,240,0.18),transparent_44%),radial-gradient(ellipse_at_78%_72%,rgba(0,120,255,0.15),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(0,212,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="mx-auto w-full max-w-4xl">
        <div className="rounded-3xl border border-cyan-300/25 bg-[linear-gradient(145deg,rgba(5,8,22,0.95),rgba(6,17,36,0.9)_45%,rgba(5,8,22,0.95))] p-6 shadow-[0_30px_100px_rgba(2,8,22,0.75)] md:p-10">
          <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100">
            SWARP Presale
          </p>

          <h1 className="mt-6 text-balance text-3xl font-semibold leading-tight md:text-5xl">
            Presale Purchase Opens Soon on SwarpPay
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
            This Swarp Foundation site provides project and token information. The real SWARP purchase flow is hosted
            on SwarpPay. Presale access will be opened there soon.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Purchase Platform</p>
              <p className="mt-1 text-lg font-semibold text-white">SwarpPay.com</p>
            </div>
            <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Status</p>
              <p className="mt-1 text-lg font-semibold text-cyan-100">Opening Soon</p>
            </div>
            <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.06] p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Project Site</p>
              <p className="mt-1 text-lg font-semibold text-white">Swarp Foundation</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://swarppay.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/40 bg-cyan-300/20 px-5 py-2.5 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/30"
            >
              Visit SwarpPay
              <ExternalLink className="h-4 w-4" />
            </a>
            <Link
              href="/tokenomics"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Read Tokenomics
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
