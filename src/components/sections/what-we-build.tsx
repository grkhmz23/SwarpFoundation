"use client";

import HolographicCard from "@/components/ui/holographic-card";
import { Code, Blocks, Cpu, Globe, Lock, Zap } from "lucide-react";

const services = [
  {
    title: "Smart Contracts",
    description: "Production-grade Solana programs with formal verification and comprehensive testing.",
    icon: <Code className="h-8 w-8" />,
  },
  {
    title: "DeFi Protocols",
    description: "Yield optimization, liquid staking, and privacy-preserving financial infrastructure.",
    icon: <Blocks className="h-8 w-8" />,
  },
  {
    title: "Web3 Apps",
    description: "Full-stack decentralized applications with seamless UX and wallet integration.",
    icon: <Globe className="h-8 w-8" />,
  },
  {
    title: "Blockchain Infrastructure",
    description: "Custom RPC nodes, MEV protection, and high-performance validator setups.",
    icon: <Cpu className="h-8 w-8" />,
  },
  {
    title: "Security Audits",
    description: "Comprehensive smart contract audits and penetration testing for Web3.",
    icon: <Lock className="h-8 w-8" />,
  },
  {
    title: "High-Frequency Trading",
    description: "Ultra-low latency trading bots and market-making infrastructure.",
    icon: <Zap className="h-8 w-8" />,
  },
];

export function WhatWeBuild() {
  return (
    <section id="services" className="py-24 bg-swarp-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(157,78,221,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            What We Build
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            End-to-end blockchain solutions from concept to production
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <HolographicCard
              key={i}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhatWeBuild;