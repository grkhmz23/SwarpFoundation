"use client";

import { Blocks, Wallet, BarChart3, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

const categoryIcons = [Blocks, Wallet, BarChart3, Lock];

export function EcosystemPartners() {
  const t = useTranslations("sections.ecosystemPartners");

  const ecosystemCategories = [
    {
      icon: 0,
      title: t("categories.0.title"),
      partners: [t("categories.0.partners.0"), t("categories.0.partners.1"), t("categories.0.partners.2"), t("categories.0.partners.3")],
    },
    {
      icon: 1,
      title: t("categories.1.title"),
      partners: [t("categories.1.partners.0"), t("categories.1.partners.1"), t("categories.1.partners.2"), t("categories.1.partners.3")],
    },
    {
      icon: 2,
      title: t("categories.2.title"),
      partners: [t("categories.2.partners.0"), t("categories.2.partners.1"), t("categories.2.partners.2"), t("categories.2.partners.3")],
    },
    {
      icon: 3,
      title: t("categories.3.title"),
      partners: [t("categories.3.partners.0"), t("categories.3.partners.1"), t("categories.3.partners.2"), t("categories.3.partners.3")],
    },
  ];

  const stats = [
    { value: t("stats.0.value"), label: t("stats.0.label") },
    { value: t("stats.1.value"), label: t("stats.1.label") },
    { value: t("stats.2.value"), label: t("stats.2.label") },
    { value: t("stats.3.value"), label: t("stats.3.label") },
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-swarp-darker" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-swarp-cyan/10 border border-swarp-cyan/20 mb-6">
            <span className="text-sm text-swarp-cyan font-medium">{t("eyebrow")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{t("title")}</span>{" "}
            <span className="text-white">{t("titleAccent")}</span>
          </h2>
          <p className="text-lg text-gray-400">
            {t("description")}
          </p>
        </div>

        {/* Ecosystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ecosystemCategories.map((category) => {
            const Icon = categoryIcons[category.icon];
            return (
              <div
                key={category.title}
                className="p-6 rounded-xl bg-swarp-dark/50 backdrop-blur-sm border border-swarp-blue/20 hover:border-swarp-cyan/50 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="mb-4 p-3 w-fit rounded-lg bg-gradient-to-br from-swarp-blue/20 to-swarp-purple/20 border border-swarp-blue/30 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-swarp-cyan" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-gradient transition-colors">
                  {category.title}
                </h3>
                
                {/* Partners */}
                <ul className="space-y-2">
                  {category.partners.map((partner) => (
                    <li
                      key={partner}
                      className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-swarp-cyan mr-2" />
                      {partner}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-swarp-blue/10 to-swarp-purple/10 border border-swarp-blue/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
