"use client";

import { Brain, Globe, Server, Blocks, Wrench, Shield } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription, GlassCardContent } from "@/components/ui/glass-card";
import { StatusChip } from "@/components/ui/status-chip";

const capabilities = [
  {
    icon: Brain,
    title: "AI Development",
    description: "Custom AI models, ML pipelines, and intelligent automation solutions tailored to your business needs.",
    features: ["LLM Integration", "Model Training", "AI Agents", "Predictive Analytics"],
    glowColor: "cyan" as const,
  },
  {
    icon: Globe,
    title: "Web Applications",
    description: "Full-stack web applications with modern frameworks, responsive design, and scalable architecture.",
    features: ["React/Next.js", "Real-time Apps", "API Development", "Cloud Deployment"],
    glowColor: "blue" as const,
  },
  {
    icon: Server,
    title: "Infrastructure",
    description: "Enterprise-grade infrastructure with 99.9% uptime, automated scaling, and 24/7 monitoring.",
    features: ["Cloud Architecture", "DevOps", "Load Balancing", "Disaster Recovery"],
    glowColor: "purple" as const,
  },
  {
    icon: Blocks,
    title: "Solana Programs",
    description: "Smart contracts, on-chain programs, and DeFi protocols built for security and performance.",
    features: ["Smart Contracts", "Token Programs", "DeFi Protocols", "NFT Solutions"],
    glowColor: "cyan" as const,
  },
  {
    icon: Wrench,
    title: "Developer Tooling",
    description: "SDKs, APIs, and developer tools that accelerate your team's productivity and deployment velocity.",
    features: ["Custom SDKs", "API Gateways", "CLI Tools", "Documentation"],
    glowColor: "blue" as const,
  },
  {
    icon: Shield,
    title: "Security Audits",
    description: "Comprehensive security assessments, smart contract audits, and penetration testing services.",
    features: ["Smart Contract Audits", "Pen Testing", "Code Review", "Compliance"],
    glowColor: "green" as const,
  },
];

export function WhatWeBuild() {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-swarp-darker via-swarp-dark to-swarp-darker" />
      <div className="absolute inset-0 foundation-grid opacity-10" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <StatusChip label="OUR CAPABILITIES" status="success" pulse={false} className="mb-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">What We Build</span>
          </h2>
          <p className="text-lg text-gray-400">
            From AI agents to blockchain infrastructure, we deliver production-ready solutions across the entire technology stack.
          </p>
        </div>

        {/* Capabilities Grid with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((capability) => (
            <TiltCard key={capability.title} glowColor={capability.glowColor}>
              <GlassCard intensity="strong" neonBorder cornerBrackets className="h-full">
                <GlassCardHeader>
                  <div className="mb-4 p-3 w-fit rounded-lg bg-gradient-to-br from-swarp-blue/20 to-swarp-purple/20 border border-swarp-blue/30">
                    <capability.icon className="w-6 h-6 text-swarp-cyan" />
                  </div>
                  <GlassCardTitle>{capability.title}</GlassCardTitle>
                  <GlassCardDescription className="text-base">
                    {capability.description}
                  </GlassCardDescription>
                </GlassCardHeader>
                <GlassCardContent>
                  <ul className="space-y-2">
                    {capability.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 rounded-full bg-swarp-cyan mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GlassCardContent>
              </GlassCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
