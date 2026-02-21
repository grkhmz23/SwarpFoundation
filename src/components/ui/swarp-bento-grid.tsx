"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface BentoItemProps {
  className?: string;
  children: ReactNode;
}

const BentoItem = ({ className, children }: BentoItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty("--mouse-x", `${x}px`);
      item.style.setProperty("--mouse-y", `${y}px`);
    };
    item.addEventListener("mousemove", handleMouseMove);
    return () => item.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={itemRef}
      className={cn(
        "group relative rounded-xl border border-[#00D4FF]/10 bg-[#0A0E27]/40 backdrop-blur-sm p-6 transition-all duration-300",
        "hover:border-[#00D4FF]/30 hover:bg-[#0A0E27]/60",
        "before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300",
        "before:bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(0,212,255,0.06),transparent_60%)]",
        "hover:before:opacity-100",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

interface SwarpBentoGridProps {
  className?: string;
}

const SwarpBentoGrid = ({ className }: SwarpBentoGridProps) => {
  const t = useTranslations("sections.bentoGrid.products");

  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
        <BentoItem className="md:col-span-2 md:row-span-2">
          <div className="flex flex-col justify-between h-full min-h-[280px]">
            <div>
              <div className="inline-block px-2 py-1 rounded-md bg-[#00D4FF]/10 text-[#00D4FF] text-xs font-medium mb-3">
                {t("swarppay.badge")}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{t("swarppay.title")}</h3>
              <p className="text-gray-400 leading-relaxed">
                {t("swarppay.description")}
              </p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-[#00D4FF]/5 border border-[#00D4FF]/10 p-3 text-center">
                <div className="text-[#00D4FF] text-lg font-bold">{t("swarppay.features.0")}</div>
                <div className="text-gray-500 text-xs mt-1">{t("swarppay.featureLabels.0")}</div>
              </div>
              <div className="rounded-lg bg-[#9D4EDD]/5 border border-[#9D4EDD]/10 p-3 text-center">
                <div className="text-[#9D4EDD] text-lg font-bold">{t("swarppay.features.1")}</div>
                <div className="text-gray-500 text-xs mt-1">{t("swarppay.featureLabels.1")}</div>
              </div>
              <div className="rounded-lg bg-[#00FFF0]/5 border border-[#00FFF0]/10 p-3 text-center">
                <div className="text-[#00FFF0] text-lg font-bold">{t("swarppay.features.2")}</div>
                <div className="text-gray-500 text-xs mt-1">{t("swarppay.featureLabels.2")}</div>
              </div>
            </div>
          </div>
        </BentoItem>

        <BentoItem>
          <div className="inline-block px-2 py-1 rounded-md bg-[#9D4EDD]/10 text-[#9D4EDD] text-xs font-medium mb-3">
            {t("swarplaunch.badge")}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{t("swarplaunch.title")}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t("swarplaunch.description")}
          </p>
        </BentoItem>

        <BentoItem>
          <div className="inline-block px-2 py-1 rounded-md bg-[#00FFF0]/10 text-[#00FFF0] text-xs font-medium mb-3">
            {t("swarpid.badge")}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{t("swarpid.title")}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t("swarpid.description")}
          </p>
        </BentoItem>

        <BentoItem className="md:row-span-2">
          <div className="inline-block px-2 py-1 rounded-md bg-[#00D4FF]/10 text-[#00D4FF] text-xs font-medium mb-3">
            {t("psol.badge")}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{t("psol.title")}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {t("psol.description")}
          </p>
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
              <span>{t("psol.specs.0")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-[#9D4EDD]" />
              <span>{t("psol.specs.1")}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FFF0]" />
              <span>{t("psol.specs.2")}</span>
            </div>
          </div>
        </BentoItem>

        <BentoItem className="md:col-span-2">
          <div className="inline-block px-2 py-1 rounded-md bg-[#9D4EDD]/10 text-[#9D4EDD] text-xs font-medium mb-3">
            {t("humanrail.badge")}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{t("humanrail.title")}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {t("humanrail.description")}
          </p>
        </BentoItem>
      </div>
    </div>
  );
};

export { SwarpBentoGrid, BentoItem };
