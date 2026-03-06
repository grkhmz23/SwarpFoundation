import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";

const allocations = [
  { label: "Team", value: "12%" },
  { label: "Investors (Seed + Strategic)", value: "15%" },
  { label: "Advisors and Partners", value: "3%" },
  { label: "Ecosystem Rewards", value: "28%" },
  { label: "Treasury and Reserve", value: "17%" },
  { label: "DEX Liquidity (Protocol-Owned)", value: "5%" },
  { label: "CEX Liquidity Reserve", value: "3%" },
  { label: "Community and Public Float", value: "17%" },
];

export default function TokenomicsPage() {
  return (
    <main className="relative isolate overflow-hidden px-4 py-16 text-white sm:px-6 md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(0,255,240,0.14),transparent_44%),radial-gradient(ellipse_at_80%_60%,rgba(0,110,255,0.15),transparent_50%)]" />
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-3xl border border-cyan-300/25 bg-[linear-gradient(145deg,rgba(5,8,22,0.96),rgba(6,17,36,0.9)_45%,rgba(5,8,22,0.96))] p-6 shadow-[0_30px_100px_rgba(2,8,22,0.75)] md:p-10">
          <p className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cyan-100">
            SWARP Tokenomics
          </p>

          <h1 className="mt-6 text-balance text-3xl font-semibold leading-tight md:text-5xl">
            SWARP Allocation and Utility Overview
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            SWARP powers payments, governance, premium access, and ecosystem incentives across Swarp products. Purchase
            operations are run on SwarpPay when presale opens.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.05] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Network</p>
              <p className="mt-1 text-lg font-semibold text-cyan-100">Solana (SPL)</p>
            </div>
            <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.05] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Total Supply</p>
              <p className="mt-1 text-lg font-semibold text-cyan-100">1,000,000,000 SWARP</p>
            </div>
            <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.05] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">Initial Price</p>
              <p className="mt-1 text-lg font-semibold text-cyan-100">~$0.03 SWARP</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {allocations.map((item) => (
              <div key={item.label} className="rounded-xl border border-cyan-300/20 bg-cyan-300/[0.05] px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-400">{item.label}</p>
                <p className="mt-1 text-xl font-semibold text-cyan-100">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Purchase Notice</p>
            <p className="mt-2 text-sm text-slate-200">
              This is an informational page on swarpfoundation.com. The live purchase route is on{" "}
              <span className="font-semibold text-cyan-100">swarppay.com</span>, opening soon.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/presale"
              className="inline-flex items-center gap-2 rounded-xl border border-cyan-200/40 bg-cyan-300/20 px-5 py-2.5 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/30"
            >
              Presale Status
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://swarppay.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              Open SwarpPay
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
