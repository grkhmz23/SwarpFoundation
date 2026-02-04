import Link from "next/link";
import { AetherBackground } from "@/components/ui/aether-background";
import SwarpAIChat from "./_components/SwarpAIChat";

export default function SwarpAiPage() {
  return (
    <AetherBackground className="min-h-[100svh]">
      <main className="min-h-[100svh] text-zinc-100 flex flex-col">
        <div className="relative flex-1 flex flex-col min-h-[100svh]">
          {/* Minimal Header */}
          <header className="relative z-20 px-4 py-4">
            <div className="mx-auto max-w-3xl flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2 text-white/40 hover:text-[#00FFF0] transition-colors group"
              >
                <svg
                  className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
                <span className="text-sm">Back</span>
              </Link>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#00FFF0] shadow-[0_0_8px_rgba(0,255,240,0.6)]" />
                  <span className="text-[11px] text-white/40">Online</span>
                </div>
                <span 
                  className="rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#00FFF0]"
                  style={{
                    background: "linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(157, 78, 221, 0.15) 100%)",
                    border: "1px solid rgba(0, 212, 255, 0.3)",
                    boxShadow: "0 0 20px rgba(0, 212, 255, 0.1)",
                  }}
                >
                  Beta
                </span>
              </div>
            </div>
          </header>

          {/* Main Chat Area */}
          <div className="relative z-10 flex-1 flex flex-col">
            <SwarpAIChat />
          </div>
        </div>
      </main>
    </AetherBackground>
  );
}