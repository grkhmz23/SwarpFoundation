"use client";

import Link from "next/link";
import { ArrowRight, TrendingDown, Zap, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const resultIcons = [TrendingDown, Zap, DollarSign];

export function CaseStudies() {
  const t = useTranslations("sections.caseStudies");

  const caseStudies = [
    {
      title: t("studies.0.title"),
      client: t("studies.0.client"),
      challenge: t("studies.0.challenge"),
      solution: t("studies.0.solution"),
      results: [
        { icon: 0, metric: t("studies.0.results.0.metric"), label: t("studies.0.results.0.label") },
        { icon: 1, metric: t("studies.0.results.1.metric"), label: t("studies.0.results.1.label") },
        { icon: 2, metric: t("studies.0.results.2.metric"), label: t("studies.0.results.2.label") },
      ],
      tags: [t("studies.0.tags.0"), t("studies.0.tags.1"), t("studies.0.tags.2")],
    },
    {
      title: t("studies.1.title"),
      client: t("studies.1.client"),
      challenge: t("studies.1.challenge"),
      solution: t("studies.1.solution"),
      results: [
        { icon: 0, metric: t("studies.1.results.0.metric"), label: t("studies.1.results.0.label") },
        { icon: 1, metric: t("studies.1.results.1.metric"), label: t("studies.1.results.1.label") },
        { icon: 2, metric: t("studies.1.results.2.metric"), label: t("studies.1.results.2.label") },
      ],
      tags: [t("studies.1.tags.0"), t("studies.1.tags.1"), t("studies.1.tags.2")],
    },
    {
      title: t("studies.2.title"),
      client: t("studies.2.client"),
      challenge: t("studies.2.challenge"),
      solution: t("studies.2.solution"),
      results: [
        { icon: 0, metric: t("studies.2.results.0.metric"), label: t("studies.2.results.0.label") },
        { icon: 1, metric: t("studies.2.results.1.metric"), label: t("studies.2.results.1.label") },
        { icon: 2, metric: t("studies.2.results.2.metric"), label: t("studies.2.results.2.label") },
      ],
      tags: [t("studies.2.tags.0"), t("studies.2.tags.1"), t("studies.2.tags.2")],
    },
  ];

  return (
    <section id="case-studies" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-swarp-darker via-swarp-dark to-swarp-darker" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-swarp-purple/10 border border-swarp-purple/20 mb-6">
            <span className="text-sm text-swarp-purple font-medium">{t("eyebrow")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">{t("title")}</span>{" "}
            <span className="text-gradient">{t("titleAccent")}</span>
          </h2>
          <p className="text-lg text-gray-400">
            {t("description")}
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study) => (
            <Card key={study.title} hover>
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-full bg-swarp-blue/10 border border-swarp-blue/20 text-xs text-swarp-cyan"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <CardTitle className="text-2xl">{study.title}</CardTitle>
                <CardDescription className="text-sm text-gray-500">
                  {study.client}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Challenge & Solution */}
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-gray-400 mb-1">{t("challengeLabel")}</div>
                    <p className="text-sm text-gray-300">{study.challenge}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 mb-1">{t("solutionLabel")}</div>
                    <p className="text-sm text-gray-300">{study.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="pt-4 border-t border-swarp-blue/20">
                  <div className="text-xs font-semibold text-gray-400 mb-3">{t("keyResultsLabel")}</div>
                  <div className="space-y-3">
                    {study.results.map((result) => {
                      const ResultIcon = resultIcons[result.icon];
                      return (
                        <div key={result.label} className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-swarp-blue/10 border border-swarp-blue/20">
                            <ResultIcon className="w-4 h-4 text-swarp-cyan" />
                          </div>
                          <div className="flex-1">
                            <div className="text-lg font-bold text-gradient">{result.metric}</div>
                            <div className="text-xs text-gray-400">{result.label}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="#contact">
            <Button size="lg" variant="outline" className="group">
              {t("viewAll")}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
