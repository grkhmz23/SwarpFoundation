"use client";

import Link from "next/link";
import { ArrowRight, CreditCard, Zap, Shield, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const featureIcons = [CreditCard, Zap, Shield, Globe];

export function SwarpPaySpotlight() {
  const t = useTranslations("sections.swarpPaySpotlight");

  const features = [
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
  ];

  const paymentMethods = ["SOL", "USDC", "CARD"];

  return (
    <section id="swarppay" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-swarp-blue/5 via-transparent to-swarp-purple/5" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-swarp-purple/10 border border-swarp-purple/20 mb-6">
              <span className="text-sm text-swarp-purple font-medium">{t("eyebrow")}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">{t("title")}</span>
              <br />
              <span className="text-white">{t("subtitle")}</span>
            </h2>
            
            <p className="text-lg text-gray-400 mb-8">
              {t("description")}
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {features.map((feature) => {
                const Icon = featureIcons[feature.icon];
                return (
                  <div key={feature.title} className="flex items-start space-x-4 group">
                    <div className="p-2 rounded-lg bg-swarp-blue/10 border border-swarp-blue/20 group-hover:bg-swarp-blue/20 transition-colors">
                      <Icon className="w-5 h-5 text-swarp-cyan" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#contact">
                <Button size="lg" variant="gradient" className="w-full sm:w-auto group">
                  {t("getStarted")}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#docs">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  {t("viewDocs")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            {/* Glowing Card */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-swarp-dark to-swarp-darker border border-swarp-blue/30 glow-blue">
              {/* Mock Payment Interface */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-swarp-blue to-swarp-purple flex items-center justify-center">
                      <span className="text-white font-bold text-xl">S</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">{t("demo.poweredBy")}</div>
                      <div className="font-semibold text-white">SwarpPay</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 text-xs font-medium">
                    {t("demo.live")}
                  </div>
                </div>

                {/* Transaction Amount */}
                <div className="text-center py-8">
                  <div className="text-sm text-gray-400 mb-2">{t("demo.transactionAmount")}</div>
                  <div className="text-4xl font-bold text-gradient">$1,234.56</div>
                  <div className="text-sm text-gray-500 mt-1">≈ 12.34 SOL</div>
                </div>

                {/* Payment Methods */}
                <div className="grid grid-cols-3 gap-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method}
                      className="p-3 rounded-lg bg-swarp-blue/10 border border-swarp-blue/20 text-center hover:bg-swarp-blue/20 transition-colors cursor-pointer"
                    >
                      <div className="text-xs text-gray-400">{t("demo.payWith")}</div>
                      <div className="font-semibold text-swarp-cyan mt-1">{method}</div>
                    </div>
                  ))}
                </div>

                {/* Status Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-swarp-blue/20">
                  <div className="text-xs text-gray-500">{t("demo.fee")}</div>
                  <div className="text-xs text-gray-500">{t("demo.settlement")}</div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-swarp-purple/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-swarp-cyan/20 rounded-full blur-2xl animate-pulse delay-1000" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
