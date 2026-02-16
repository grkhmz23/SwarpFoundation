"use client";

import HolographicCard from "@/components/ui/holographic-card";
import { Rocket, Shield, Lock, Zap, TrendingUp, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

export function Projects() {
  const t = useTranslations("projectsSection");
  const projects = [
    {
      name: "SwarpPay",
      description: t("items.swarppay.description"),
      icon: <Rocket className="h-8 w-8" />,
    },
    {
      name: "HumanRail Protocol",
      description: t("items.humanRail.description"),
      icon: <Shield className="h-8 w-8" />,
    },
    {
      name: "pSOL v2",
      description: t("items.psol.description"),
      icon: <Lock className="h-8 w-8" />,
    },
    {
      name: "BSC Nexus",
      description: t("items.bscNexus.description"),
      icon: <Zap className="h-8 w-8" />,
    },
    {
      name: "SimFi.fun",
      description: t("items.simfi.description"),
      icon: <TrendingUp className="h-8 w-8" />,
    },
    {
      name: "Desert Rose Gin",
      description: t("items.desertRose.description"),
      icon: <Sparkles className="h-8 w-8" />,
    },
  ];

  return (
    <section id="work" className="py-24 bg-swarp-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,212,255,0.05),transparent_50%)]" />

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
          {projects.map((project, i) => (
            <HolographicCard
              key={i}
              title={project.name}
              description={project.description}
              icon={project.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
