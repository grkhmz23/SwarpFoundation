"use client";

import { GlassCard, GlassCardHeader, GlassCardTitle, GlassCardDescription } from "@/components/ui/glass-card";
import { TiltCard } from "@/components/ui/tilt-card";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    name: "SwarpPay",
    description: "Multi-currency payment infrastructure for Web3",
    client: "Internal Product",
    tech: ["Solana", "React", "Node.js"],
    impact: "$10M+ processed",
  },
  {
    name: "HumanRail Protocol",
    description: "Identity verification + AI accountability on Solana",
    client: "DeFi Platform",
    tech: ["Solana", "ZK-Proofs", "AI"],
    impact: "50K+ verified users",
  },
  {
    name: "pSOL v2",
    description: "Multi-Asset Shielded Pool privacy protocol",
    client: "Privacy Solution",
    tech: ["Solana", "Groth16", "Rust"],
    impact: "99.9% uptime",
  },
  {
    name: "BSC Nexus",
    description: "Enterprise blockchain infrastructure for BNB Chain",
    client: "Trading Platform",
    tech: ["BSC", "MEV Protection", "RPC"],
    impact: "Ultra-fast trading",
  },
  {
    name: "SimFi.fun",
    description: "Solana paper trading platform",
    client: "Trading Education",
    tech: ["Solana", "Next.js", "WebSocket"],
    impact: "10K+ traders",
  },
  {
    name: "Desert Rose Gin",
    description: "Luxury brand website with 3D interactive elements",
    client: "Premium Spirits",
    tech: ["Next.js", "Three.js", "GSAP"],
    impact: "Award-winning UX",
  },
];

export function Projects() {
  return (
    <section className="relative py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Our Work</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Production systems serving millions of users and billions in transaction volume.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <TiltCard key={project.name} glowColor="cyan">
              <GlassCard intensity="strong" neonBorder className="h-full">
                <GlassCardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <GlassCardTitle className="text-xl">{project.name}</GlassCardTitle>
                    <ExternalLink className="w-5 h-5 text-swarp-cyan" />
                  </div>
                  <GlassCardDescription>{project.description}</GlassCardDescription>
                  <div className="mt-4 text-xs text-swarp-cyan font-mono">{project.client}</div>
                </GlassCardHeader>
                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded-full bg-swarp-blue/10 border border-swarp-blue/20 text-xs text-gray-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-swarp-neon-green font-semibold">{project.impact}</div>
                </div>
              </GlassCard>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
