"use client";

import { Search, Palette, Code, Rocket, Settings } from "lucide-react";
import { useTranslations } from "next-intl";

const phaseIcons = [Search, Palette, Code, Rocket, Settings];

export function CapabilitiesTimeline() {
  const t = useTranslations("sections.capabilitiesTimeline");
  
  const phases = [
    {
      title: t("phases.0.title"),
      description: t("phases.0.description"),
      deliverables: [t("phases.0.deliverables.0"), t("phases.0.deliverables.1"), t("phases.0.deliverables.2")],
    },
    {
      title: t("phases.1.title"),
      description: t("phases.1.description"),
      deliverables: [t("phases.1.deliverables.0"), t("phases.1.deliverables.1"), t("phases.1.deliverables.2")],
    },
    {
      title: t("phases.2.title"),
      description: t("phases.2.description"),
      deliverables: [t("phases.2.deliverables.0"), t("phases.2.deliverables.1"), t("phases.2.deliverables.2")],
    },
    {
      title: t("phases.3.title"),
      description: t("phases.3.description"),
      deliverables: [t("phases.3.deliverables.0"), t("phases.3.deliverables.1"), t("phases.3.deliverables.2")],
    },
    {
      title: t("phases.4.title"),
      description: t("phases.4.description"),
      deliverables: [t("phases.4.deliverables.0"), t("phases.4.deliverables.1"), t("phases.4.deliverables.2")],
    },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-swarp-darker" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-swarp-cyan/10 border border-swarp-cyan/20 mb-6">
            <span className="text-sm text-swarp-cyan font-medium">{t("eyebrow")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">{t("title")}</span>
            <br />
            <span className="text-gradient">{t("titleAccent")}</span>
          </h2>
          <p className="text-lg text-gray-400">
            {t("description")}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-0 left-6 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-swarp-blue via-swarp-purple to-swarp-cyan md:-translate-x-1/2" />

            {/* Phases */}
            <div className="space-y-12">
              {phases.map((phase, index) => {
                const Icon = phaseIcons[index];
                return (
                  <div
                    key={phase.title}
                    className={`relative flex flex-col md:flex-row gap-8 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 md:w-1/2 flex justify-start md:justify-center">
                      <div className="relative">
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-swarp-blue/30 rounded-full blur-xl" />
                        {/* Icon Container */}
                        <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-swarp-blue to-swarp-purple border-2 border-swarp-cyan flex items-center justify-center glow-blue">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 md:w-1/2">
                      <div className="p-6 rounded-xl bg-swarp-dark/50 backdrop-blur-sm border border-swarp-blue/20 hover:border-swarp-cyan/50 transition-all duration-300 group">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="text-sm font-mono text-swarp-cyan">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-colors">
                            {phase.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 mb-4">{phase.description}</p>
                        
                        {/* Deliverables */}
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-gray-300">{t("deliverablesLabel")}</div>
                          <div className="flex flex-wrap gap-2">
                            {phase.deliverables.map((deliverable) => (
                              <span
                                key={deliverable}
                                className="px-3 py-1 rounded-full bg-swarp-blue/10 border border-swarp-blue/20 text-xs text-gray-300"
                              >
                                {deliverable}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
