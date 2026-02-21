"use client";

import { Shield, Lock, Eye, AlertTriangle, CheckCircle, FileCheck } from "lucide-react";
import { useTranslations } from "next-intl";

const featureIcons = [Shield, Eye, Lock, AlertTriangle, CheckCircle, FileCheck];

export function Security() {
  const t = useTranslations("sections.security");

  const securityFeatures = [
    {
      icon: 0,
      title: t("features.0.title"),
      description: t("features.0.description"),
    },
    {
      icon: 1,
      title: t("features.1.title"),
      description: t("features.1.description"),
    },
    {
      icon: 2,
      title: t("features.2.title"),
      description: t("features.2.description"),
    },
    {
      icon: 3,
      title: t("features.3.title"),
      description: t("features.3.description"),
    },
    {
      icon: 4,
      title: t("features.4.title"),
      description: t("features.4.description"),
    },
    {
      icon: 5,
      title: t("features.5.title"),
      description: t("features.5.description"),
    },
  ];

  const auditBadges = [
    { name: t("auditBadges.0.name"), status: t("auditBadges.0.status") },
    { name: t("auditBadges.1.name"), status: t("auditBadges.1.status") },
    { name: t("auditBadges.2.name"), status: t("auditBadges.2.status") },
    { name: t("auditBadges.3.name"), status: t("auditBadges.3.status") },
  ];

  return (
    <section id="security" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-swarp-darker via-swarp-dark to-swarp-darker" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">{t("eyebrow")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">{t("title")}</span>{" "}
            <span className="text-gradient">{t("titleAccent")}</span>
          </h2>
          <p className="text-lg text-gray-400">
            {t("description")}
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature) => {
            const Icon = featureIcons[feature.icon];
            return (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-swarp-dark/50 backdrop-blur-sm border border-swarp-blue/20 hover:border-green-500/50 transition-all duration-300 group"
              >
                <div className="mb-4 p-3 w-fit rounded-lg bg-green-500/10 border border-green-500/20 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Audit Badges */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">{t("auditSection.title")}</h3>
            <p className="text-gray-400">{t("auditSection.description")}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {auditBadges.map((badge) => (
              <div
                key={badge.name}
                className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-swarp-blue/10 border border-green-500/20 text-center group hover:border-green-500/50 transition-all duration-300"
              >
                <div className="text-lg font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
                  {badge.name}
                </div>
                <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-full bg-green-500/20 text-xs text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>{badge.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Stats */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-green-500/10 to-swarp-blue/10 border border-green-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">{t("stats.0.value")}</div>
              <div className="text-sm text-gray-400">{t("stats.0.label")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">{t("stats.1.value")}</div>
              <div className="text-sm text-gray-400">{t("stats.1.label")}</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">{t("stats.2.value")}</div>
              <div className="text-sm text-gray-400">{t("stats.2.label")}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
