"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { TypeWriter } from "@/components/ui/type-writer";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-swarp-blue/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-swarp-purple/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-swarp-blue/10 border border-swarp-blue/20 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-swarp-cyan" />
            <span className="text-sm text-gray-300">Enterprise-Grade Infrastructure</span>
          </div>

          {/* Main Heading with TypeWriter Animation */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight min-h-[200px] flex flex-col items-center justify-center">
            <TypeWriter
              texts={[
                "Build & Ship on Solana",
                "Build & Ship with AI",
                "Build & Ship Smart Contracts",
                "Build & Ship DeFi Protocols",
                "Build & Ship at Scale",
              ]}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              typingSpeed={80}
              deletingSpeed={40}
              delayBetweenTexts={2500}
            />
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            We build production-grade blockchain infrastructure, AI-powered solutions, and custom software that scales from prototype to enterprise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="#swarppay">
              <Button size="lg" variant="gradient" className="w-full sm:w-auto group">
                Explore SwarpPay
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto group">
                <Zap className="mr-2 w-5 h-5" />
                Talk to Us
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "99.9%", label: "Uptime SLA" },
              { value: "10M+", label: "Transactions" },
              { value: "50+", label: "Projects Delivered" },
              { value: "24/7", label: "Support" },
            ].map((stat) => (
              <div key={stat.label} className="group">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-swarp-blue/50 rounded-full p-1">
          <div className="w-1.5 h-3 bg-swarp-cyan rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}