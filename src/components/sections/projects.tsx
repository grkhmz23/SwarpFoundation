"use client";

import HolographicCard from "@/components/ui/holographic-card";
import { Rocket, Shield, Lock, Zap, TrendingUp, Sparkles } from "lucide-react";

const projects = [
  {
    name: "SwarpPay",
    description: "Multi-currency payment infrastructure for Web3. $10M+ processed.",
    icon: <Rocket className="h-8 w-8" />,
  },
  {
    name: "HumanRail Protocol",
    description: "Identity verification + AI accountability on Solana. 50K+ verified users.",
    icon: <Shield className="h-8 w-8" />,
  },
  {
    name: "pSOL v2",
    description: "Multi-Asset Shielded Pool privacy protocol. 99.9% uptime.",
    icon: <Lock className="h-8 w-8" />,
  },
  {
    name: "BSC Nexus",
    description: "Enterprise blockchain infrastructure for BNB Chain. Ultra-fast trading.",
    icon: <Zap className="h-8 w-8" />,
  },
  {
    name: "SimFi.fun",
    description: "Solana paper trading platform. 10K+ traders.",
    icon: <TrendingUp className="h-8 w-8" />,
  },
  {
    name: "Desert Rose Gin",
    description: "Luxury brand website with 3D interactive elements. Award-winning UX.",
    icon: <Sparkles className="h-8 w-8" />,
  },
];

export function Projects() {
  return (
    <section id="work" className="py-24 bg-swarp-darker relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,212,255,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
            Our Work
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building the future of blockchain infrastructure
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <HolographicCard
              key={i}
              title={project.name}
              description={project.description}
              icon={project.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;