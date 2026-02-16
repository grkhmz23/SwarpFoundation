"use client";

import HolographicCard from "@/components/ui/holographic-card";
import { Code, Blocks, Cpu, Globe, Lock, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export function WhatWeBuild() {
  const t = useTranslations("whatWeBuildSection");
  const services = [
    {
      title: t("items.smartContracts.title"),
      description: t("items.smartContracts.description"),
      icon: <Code className="h-8 w-8" />,
    },
    {
      title: t("items.defi.title"),
      description: t("items.defi.description"),
      icon: <Blocks className="h-8 w-8" />,
    },
    {
      title: t("items.web3Apps.title"),
      description: t("items.web3Apps.description"),
      icon: <Globe className="h-8 w-8" />,
    },
    {
      title: t("items.infrastructure.title"),
      description: t("items.infrastructure.description"),
      icon: <Cpu className="h-8 w-8" />,
    },
    {
      title: t("items.audits.title"),
      description: t("items.audits.description"),
      icon: <Lock className="h-8 w-8" />,
    },
    {
      title: t("items.hft.title"),
      description: t("items.hft.description"),
      icon: <Zap className="h-8 w-8" />,
    },
  ];

  return (
    <section id="services" className="py-24 bg-swarp-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(157,78,221,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <HolographicCard
              key={i}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatWeBuild;
