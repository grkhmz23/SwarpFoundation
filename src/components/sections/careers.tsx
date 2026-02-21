"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { useTranslations } from "next-intl";

const perksIcons = ["🌍", "💰", "🏥", "🏖️", "📚", "💻"];

export function Careers() {
  const t = useTranslations("sections.careers");

  const openRoles = [
    {
      title: t("roles.0.title"),
      department: t("roles.0.department"),
      location: t("roles.0.location"),
      type: t("roles.0.type"),
      salary: t("roles.0.salary"),
      description: t("roles.0.description"),
    },
    {
      title: t("roles.1.title"),
      department: t("roles.1.department"),
      location: t("roles.1.location"),
      type: t("roles.1.type"),
      salary: t("roles.1.salary"),
      description: t("roles.1.description"),
    },
    {
      title: t("roles.2.title"),
      department: t("roles.2.department"),
      location: t("roles.2.location"),
      type: t("roles.2.type"),
      salary: t("roles.2.salary"),
      description: t("roles.2.description"),
    },
  ];

  const perks = [
    t("perks.0"),
    t("perks.1"),
    t("perks.2"),
    t("perks.3"),
    t("perks.4"),
    t("perks.5"),
  ];

  return (
    <section id="careers" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-swarp-darker" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-swarp-accent/10 border border-swarp-accent/20 mb-6">
            <span className="text-sm text-swarp-accent font-medium">{t("eyebrow")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">{t("title")}</span>{" "}
            <span className="text-gradient">{t("titleAccent")}</span>
          </h2>
          <p className="text-lg text-gray-400">
            {t("description")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left: Open Roles */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">{t("openPositionsTitle")}</h3>
            {openRoles.map((role) => (
              <Card key={role.title} hover>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{role.title}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="px-3 py-1 rounded-full bg-swarp-blue/10 border border-swarp-blue/20 text-xs text-swarp-cyan font-medium whitespace-nowrap">
                        {role.department}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-swarp-cyan" />
                      {role.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-swarp-cyan" />
                      {role.type}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1 text-swarp-cyan" />
                      {role.salary}
                    </div>
                  </div>
                  <Link href="#contact">
                    <Button variant="outline" size="sm" className="group">
                      {t("applyNow")}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right: Perks & Culture */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-swarp-dark/50 backdrop-blur-sm border border-swarp-blue/20">
              <h3 className="text-xl font-bold text-white mb-4">{t("whySwarpTitle")}</h3>
              <div className="space-y-3">
                {perks.map((perk, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-swarp-cyan mr-2" />
                    {perk}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-swarp-blue/10 to-swarp-purple/10 border border-swarp-blue/20">
              <h3 className="text-xl font-bold text-white mb-2">{t("cultureTitle")}</h3>
              <p className="text-sm text-gray-400 mb-4">
                {t("cultureDescription")}
              </p>
              <Link href="#about">
                <Button variant="ghost" size="sm" className="group">
                  {t("learnMore")}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">{t("generalApplyText")}</p>
          <Link href="#contact">
            <Button size="lg" variant="outline">
              {t("sendResume")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
