"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface LegalSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
  contactEmail?: string;
  contactAddress?: string;
}

export function LegalPageLayout({
  title,
  subtitle,
  lastUpdated,
  sections,
  contactEmail = "info@swarppay.com",
  contactAddress = "Viale Tunisia 22, 20124, Milano, Italy",
}: LegalPageLayoutProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen relative z-10 py-8 px-4 sm:px-6 lg:px-8">
      {/* Glass container */}
      <div className="max-w-4xl mx-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
          >
            <X size={16} />
            Close
          </Link>
        </div>

        {/* Main glass panel */}
        <div className="legal-glass relative overflow-hidden rounded-2xl border border-white/[0.08]">
          {/* Solid base */}
          <div className="absolute inset-0 z-0 bg-[#060a1a]/95 backdrop-blur-xl" />

          {/* Subtle glow */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-gradient-to-b from-[#00D4FF]/[0.06] to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-gradient-to-t from-[#9D4EDD]/[0.04] to-transparent rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Title section */}
            <div className="px-8 sm:px-12 pt-10 pb-8 border-b border-white/[0.06]">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-8 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#9D4EDD]" />
                <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#00FFF0]/70">
                  {subtitle}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                {title}
              </h1>
              <p className="text-sm text-white/40">
                Last updated: {lastUpdated}
              </p>
            </div>

            {/* Table of contents */}
            <div className="px-8 sm:px-12 py-6 border-b border-white/[0.06] bg-white/[0.02]">
              <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30 mb-4">
                Contents
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sections.map((section, i) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center gap-3 text-sm text-white/60 hover:text-[#00D4FF] transition-colors group py-1"
                  >
                    <span className="font-mono text-[11px] text-white/20 group-hover:text-[#00D4FF]/50 w-5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </a>
                ))}
              </div>
            </div>

            {/* Sections */}
            <div className="px-8 sm:px-12 py-8 space-y-10">
              {sections.map((section, i) => (
                <div key={section.id} id={section.id} className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-[12px] text-[#00D4FF]/60 font-semibold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="text-lg font-semibold text-white tracking-tight">
                      {section.title}
                    </h2>
                  </div>
                  <div className="legal-content text-[14px] text-white/65 leading-relaxed pl-8 space-y-3">
                    {section.content}
                  </div>
                </div>
              ))}

              {/* Contact section */}
              <div className="pt-8 border-t border-white/[0.06]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-1 w-6 rounded-full bg-gradient-to-r from-[#00FFF0] to-[#00D4FF]" />
                  <h2 className="text-lg font-semibold text-white tracking-tight">
                    Contact Us
                  </h2>
                </div>
                <div className="pl-8 text-[14px] text-white/65 leading-relaxed space-y-2">
                  <p>
                    If you have any questions about this policy, please contact us at:
                  </p>
                  <div className="mt-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] inline-block">
                    <p>
                      <span className="text-white/40">Email: </span>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-[#00D4FF] hover:text-[#00FFF0] transition-colors"
                      >
                        {contactEmail}
                      </a>
                    </p>
                    <p className="mt-1">
                      <span className="text-white/40">Address: </span>
                      <span className="text-white/70">{contactAddress}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer navigation */}
            <div className="px-8 sm:px-12 py-6 border-t border-white/[0.06] bg-white/[0.02] flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="text-[12px] text-white/40 hover:text-[#00D4FF] transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-[12px] text-white/40 hover:text-[#00D4FF] transition-colors">
                  Terms
                </Link>
                <Link href="/security" className="text-[12px] text-white/40 hover:text-[#00D4FF] transition-colors">
                  Security
                </Link>
                <Link href="/cookies" className="text-[12px] text-white/40 hover:text-[#00D4FF] transition-colors">
                  Cookies
                </Link>
              </div>
              <p className="text-[11px] text-white/25 font-mono">
                SWARP FOUNDATION S.R.L. — Milano, Italy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
