"use client";

import { TrendingUp, Users, Zap, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export function Metrics() {
  const t = useTranslations("metricsSection");
  const metrics = [
    {
      icon: TrendingUp,
      value: "99.9%",
      label: t("items.0.label"),
      description: t("items.0.description"),
    },
    {
      icon: Zap,
      value: "10M+",
      label: t("items.1.label"),
      description: t("items.1.description"),
    },
    {
      icon: Users,
      value: "500K+",
      label: t("items.2.label"),
      description: t("items.2.description"),
    },
    {
      icon: Shield,
      value: "100+",
      label: t("items.3.label"),
      description: t("items.3.description"),
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-swarp-blue/5 to-swarp-purple/5" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="relative group"
              >
                {/* Card */}
                <div className="p-6 rounded-xl bg-swarp-dark/50 backdrop-blur-sm border border-swarp-blue/20 hover:border-swarp-cyan/50 transition-all duration-300 hover:shadow-xl hover:shadow-swarp-blue/10">
                  {/* Icon */}
                  <div className="mb-4 p-3 w-fit rounded-lg bg-gradient-to-br from-swarp-blue/20 to-swarp-purple/20 border border-swarp-blue/30 group-hover:scale-110 transition-transform">
                    <metric.icon className="w-6 h-6 text-swarp-cyan" />
                  </div>
                  
                  {/* Value */}
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {metric.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm font-semibold text-white mb-1">
                    {metric.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-xs text-gray-400">
                    {metric.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
