"use client";

import Link from "next/link";
import { ArrowRight, TrendingDown, Zap, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const caseStudies = [
  {
    title: "DeFi Protocol Scale-Up",
    client: "Leading DeFi Platform",
    challenge: "Handle 100x transaction volume growth",
    solution: "Optimized smart contracts and infrastructure scaling",
    results: [
      { icon: TrendingDown, metric: "85%", label: "Lower Gas Costs" },
      { icon: Zap, metric: "300ms", label: "Avg Response Time" },
      { icon: DollarSign, metric: "$2M+", label: "Saved Annually" },
    ],
    tags: ["Solana", "DeFi", "Smart Contracts"],
  },
  {
    title: "AI-Powered Trading Platform",
    client: "Crypto Exchange",
    challenge: "Real-time market analysis and automated trading",
    solution: "Custom ML models with sub-second execution",
    results: [
      { icon: TrendingDown, metric: "40%", label: "Reduced Latency" },
      { icon: Zap, metric: "50K", label: "TPS Capacity" },
      { icon: DollarSign, metric: "15%", label: "Better ROI" },
    ],
    tags: ["AI/ML", "Trading", "Infrastructure"],
  },
  {
    title: "Enterprise Payment Gateway",
    client: "E-commerce Giant",
    challenge: "Integrate crypto payments seamlessly",
    solution: "SwarpPay integration with fiat on-ramps",
    results: [
      { icon: TrendingDown, metric: "60%", label: "Lower Fees" },
      { icon: Zap, metric: "Instant", label: "Settlement" },
      { icon: DollarSign, metric: "$10M+", label: "Monthly Volume" },
    ],
    tags: ["Payments", "Integration", "SwarpPay"],
  },
];

export function CaseStudies() {
  return (
    <section id="case-studies" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-swarp-darker via-swarp-dark to-swarp-darker" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-swarp-purple/10 border border-swarp-purple/20 mb-6">
            <span className="text-sm text-swarp-purple font-medium">Success Stories</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Proven</span>{" "}
            <span className="text-gradient">Results</span>
          </h2>
          <p className="text-lg text-gray-400">
            Real projects, real outcomes. See how we&apos;ve helped clients scale, optimize, and innovate.
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
                    <div className="text-xs font-semibold text-gray-400 mb-1">CHALLENGE</div>
                    <p className="text-sm text-gray-300">{study.challenge}</p>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 mb-1">SOLUTION</div>
                    <p className="text-sm text-gray-300">{study.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="pt-4 border-t border-swarp-blue/20">
                  <div className="text-xs font-semibold text-gray-400 mb-3">KEY RESULTS</div>
                  <div className="space-y-3">
                    {study.results.map((result) => (
                      <div key={result.label} className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-swarp-blue/10 border border-swarp-blue/20">
                          <result.icon className="w-4 h-4 text-swarp-cyan" />
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-bold text-gradient">{result.metric}</div>
                          <div className="text-xs text-gray-400">{result.label}</div>
                        </div>
                      </div>
                    ))}
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
              View All Case Studies
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
