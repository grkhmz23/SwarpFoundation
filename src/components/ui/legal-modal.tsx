"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type SectionNode = {
  id: string;
  title: string;
  intro?: string;
  items?: string[];
  note?: string;
};

type LegalModalCtx = {
  openLegal: (page: string) => void;
  closeLegal: () => void;
};

const Ctx = createContext<LegalModalCtx>({ openLegal: () => {}, closeLegal: () => {} });

export function useLegalModal() {
  return useContext(Ctx);
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-none space-y-2 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-[#00D4FF] mt-1 text-xs shrink-0">›</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function buildPage(t: ReturnType<typeof useTranslations>, key: "privacy" | "terms" | "security" | "cookies") {
  const base = `legal.${key}`;
  const sectionKeys =
    key === "privacy"
      ? ["s1", "s2", "s3", "s4", "s5", "s6"]
      : key === "terms"
        ? ["s1", "s2", "s3", "s4", "s5", "s6", "s7"]
        : ["s1", "s2", "s3", "s4", "s5", "s6"];

  const sections: SectionNode[] = sectionKeys.map((id) => ({
    id: t(`${base}.sections.${id}.id`),
    title: t(`${base}.sections.${id}.title`),
    intro: t(`${base}.sections.${id}.intro`),
    items: [
      t(`${base}.sections.${id}.items.0`),
      t(`${base}.sections.${id}.items.1`),
      t(`${base}.sections.${id}.items.2`),
      t(`${base}.sections.${id}.items.3`),
    ].filter((v) => v.trim().length > 0),
    note: t(`${base}.sections.${id}.note`),
  }));

  return {
    title: t(`${base}.title`),
    subtitle: t(`${base}.subtitle`),
    lastUpdated: t(`${base}.lastUpdated`),
    email: t(`${base}.contactEmail`),
    sections,
  };
}

function ModalOverlay({ activeKey, onSwitch, onClose }: { activeKey: string; onSwitch: (k: string) => void; onClose: () => void }) {
  const t = useTranslations();
  const scrollRef = useRef<HTMLDivElement>(null);

  const safeKey = (activeKey === "privacy" || activeKey === "terms" || activeKey === "security" || activeKey === "cookies")
    ? activeKey
    : "privacy";

  const page = buildPage(t, safeKey);
  const keys = ["privacy", "terms", "security", "cookies"] as const;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [activeKey]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl border border-white/[0.1] shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(10, 14, 26, 0.97) 0%, rgba(6, 10, 20, 0.98) 100%)",
          backdropFilter: "blur(40px)",
          animation: "legalIn 0.22s ease-out",
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[80px] bg-gradient-to-b from-[#00D4FF]/[0.06] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/[0.06] shrink-0 bg-white/[0.01]">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="h-[3px] w-5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#9D4EDD]" />
              <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#00FFF0]/50">{page.subtitle}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">{page.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 hover:bg-white/[0.08] transition-all cursor-pointer shrink-0 ml-4"
            aria-label={t("legalLayout.close")}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1l10 10M11 1L1 11" /></svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-7 legal-scroll">
          <p className="text-[11px] text-white/25 font-mono">{t("legalLayout.lastUpdated")}: {page.lastUpdated}</p>

          {page.sections.map((sec, i) => (
            <div key={sec.id ?? i}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="font-mono text-[11px] text-[#00D4FF]/40 font-semibold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[14px] font-semibold text-white/85">{sec.title}</h3>
              </div>
              <div className="text-[13px] text-white/50 leading-relaxed pl-7 space-y-2">
                {sec.intro ? <p>{sec.intro}</p> : null}
                {sec.items?.length ? <List items={sec.items} /> : null}
                {sec.note ? <p>{sec.note}</p> : null}
              </div>
            </div>
          ))}

          <div className="pt-5 border-t border-white/[0.06]">
            <p className="text-[13px] text-white/35">
              {t("legalLayout.contactDescription")}{" "}
              <a href={`mailto:${page.email}`} className="text-[#00D4FF] hover:text-[#00FFF0] transition-colors">{page.email}</a>
            </p>
          </div>
        </div>

        <div className="px-6 sm:px-8 py-3 border-t border-white/[0.06] bg-white/[0.015] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1">
            {keys.map((key) => (
              <button
                key={key}
                onClick={() => onSwitch(key)}
                className={`text-[11px] px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  safeKey === key
                    ? "bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/25"
                    : "text-white/30 hover:text-white/60 border border-transparent hover:border-white/10"
                }`}
              >
                {t(`legalLayout.${key}`)}
              </button>
            ))}
          </div>
          <span className="text-[9px] text-white/15 font-mono tracking-wider hidden sm:block">SWARP FOUNDATION S.R.L.</span>
        </div>
      </div>

      <style jsx global>{`
        @keyframes legalIn {
          from {
            transform: translateY(8px) scale(0.99);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export function LegalModalProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<string | null>(null);

  const openLegal = useCallback((page: string) => setActive(page), []);
  const closeLegal = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [active]);

  return (
    <Ctx.Provider value={{ openLegal, closeLegal }}>
      {children}
      {active ? <ModalOverlay activeKey={active} onSwitch={setActive} onClose={closeLegal} /> : null}
    </Ctx.Provider>
  );
}
