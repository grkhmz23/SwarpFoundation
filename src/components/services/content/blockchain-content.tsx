"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import VectorPad from "@/components/ui/vector-pad";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Cpu,
  ShieldCheck,
  Globe,
  Zap,
  ArrowRight,
  Code2,
  Activity,
  Coins,
  Wallet,
  FileCode,
  Database,
  Blocks,
} from "lucide-react";
import {
  ServiceContentLayout,
  ServiceHeader,
  ServiceCard,
  ServiceCTA,
} from "../service-content-layout";

// Service Card Component
function BlockchainServiceCard({ title, icon, description, lightSource, index }: {
  title: string;
  icon: React.ReactNode;
  description: string;
  lightSource: { x: number; y: number };
  index: number;
}) {
  const quadrantX = index % 2 === 0 ? 25 : 75;
  const quadrantY = index < 2 ? 25 : 75;
  const dist = Math.sqrt(Math.pow(lightSource.x - quadrantX, 2) + Math.pow(lightSource.y - quadrantY, 2));
  const intensity = Math.max(0, 1 - dist / 100);

  return (
    <div
      className="group relative p-5 border border-swarp-blue/20 bg-swarp-dark/60 backdrop-blur-sm rounded-lg overflow-hidden hover:border-swarp-blue/50 transition-colors duration-300"
      style={{
        boxShadow: `0 0 ${intensity * 30}px rgba(0,212,255, ${intensity * 0.2})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-swarp-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="w-10 h-10 rounded bg-swarp-blue/10 border border-swarp-blue/20 flex items-center justify-center text-swarp-blue group-hover:text-white group-hover:border-swarp-blue transition-colors">
          {icon}
        </div>
        <h3 className="text-base font-bold text-gray-100 group-hover:text-swarp-blue transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>

      <div className="absolute top-2 right-2 flex gap-1 opacity-20 group-hover:opacity-50 transition-opacity">
        <div className="w-1 h-1 bg-swarp-blue rounded-full" />
        <div className="w-1 h-1 bg-swarp-blue rounded-full" />
      </div>
    </div>
  );
}

// Main Blockchain Content
export function BlockchainContent() {
  const t = useTranslations("servicesContent.blockchain");
  const [lightSource, setLightSource] = useState({ x: 50, y: 50 });
  const [isLocked, setIsLocked] = useState(false);

  const services = [
    {
      title: "Smart Contracts",
      icon: <Code2 className="w-5 h-5" />,
      description: "Solidity & Rust development with formal verification and gas optimization.",
    },
    {
      title: "DApp Interfaces",
      icon: <Globe className="w-5 h-5" />,
      description: "Responsive React/Next.js frontends with Wagmi and wallet integration.",
    },
    {
      title: "Security Audits",
      icon: <ShieldCheck className="w-5 h-5" />,
      description: "Comprehensive vulnerability analysis and penetration testing.",
    },
    {
      title: "Indexer & Subgraphs",
      icon: <Cpu className="w-5 h-5" />,
      description: "Custom subgraphs and real-time event indexing pipelines.",
    },
  ];

  const deliverables = [
    { icon: FileCode, text: "Audited Smart Contracts" },
    { icon: Globe, text: "dApp Frontend" },
    { icon: Database, text: "Indexer API" },
    { icon: Wallet, text: "Wallet Connect" },
    { icon: Coins, text: "Mainnet Deploy" },
  ];

  return (
    <ServiceContentLayout accentColor="purple">
      <div className="relative min-h-full">
        {/* Interactive Background */}
        <div className="absolute inset-0 z-0">
          <VectorPad
            className="pointer-events-auto"
            onUpdate={setLightSource}
            onLockStatus={setIsLocked}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_90%)] pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-10 pointer-events-none">
          {/* Hero */}
          <div className="pt-12 pb-8 px-6 text-center pointer-events-auto">
            <ServiceHeader
              icon={<Blocks className="w-5 h-5" />}
              title={t("badge")}
              subtitle="DeFi & Smart Contracts"
              accentColor="purple"
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-swarp-purple/30 bg-swarp-purple/10 text-swarp-purple text-[10px] font-mono tracking-widest mb-4 mt-6">
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  isLocked ? "bg-red-500 animate-pulse" : "bg-emerald-500"
                )}
              />
              SYSTEM_ONLINE // {lightSource.x.toFixed(0)}:{lightSource.y.toFixed(0)}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-swarp-blue/80 to-swarp-blue/20 drop-shadow-[0_0_30px_rgba(0,212,255,0.3)] mb-4">
              {t("title")}
            </h1>

            <p className="text-sm text-swarp-blue/60 max-w-lg mx-auto leading-relaxed mb-6">
              {t("description")}
            </p>

            <div className="flex items-center justify-center gap-3">
              {[t("features.audited"), t("features.gas"), t("features.multichain")].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-full border border-swarp-blue/30 bg-swarp-blue/10 text-[10px] text-swarp-blue font-mono"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Interaction Zone Label */}
          <div className="h-32 flex items-center justify-center pointer-events-none">
            <div className="text-[10px] text-swarp-blue/30 font-mono tracking-[0.5em] uppercase animate-pulse">
              ↕ Drag to Control Light Source ↕
            </div>
          </div>

          {/* Services Grid */}
          <div className="px-6 pb-8 pointer-events-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {services.map((service, index) => (
                <BlockchainServiceCard
                  key={service.title}
                  title={service.title}
                  icon={service.icon}
                  description={service.description}
                  lightSource={lightSource}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Telemetry Section */}
          <div className="px-6 pb-8 pointer-events-auto">
            <ServiceCard accentColor="purple" className="max-w-3xl mx-auto relative overflow-hidden">
              {/* Dynamic Glow */}
              <div
                className="absolute w-[300px] h-[300px] bg-swarp-blue/10 blur-[80px] rounded-full transition-all duration-300 -z-10"
                style={{
                  left: `${lightSource.x}%`,
                  top: `${lightSource.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />

              <div className="flex items-center gap-3 text-swarp-blue mb-4">
                <Activity className="w-5 h-5" />
                <h3 className="text-sm font-mono tracking-widest uppercase">
                  Real-time Telemetry
                </h3>
              </div>

              <h2 className="text-xl font-bold text-white mb-3">
                Monitor your Protocol{" "}
                <span className="text-swarp-blue">On-Chain & Live.</span>
              </h2>

              <p className="text-sm text-gray-400 mb-4">
                Our dashboards provide instant visibility into TVL, volume, and user activity
                with custom indexers for actionable insights.
              </p>

              {/* Mock Dashboard */}
              <div className="h-32 border border-swarp-blue/20 bg-black/50 rounded overflow-hidden font-mono text-[9px]">
                <div className="bg-swarp-blue/10 p-2 border-b border-swarp-blue/20 flex justify-between text-swarp-blue/70">
                  <span>STATUS: OPTIMAL</span>
                  <span>BLOCK: 18,239,102</span>
                </div>
                <div className="p-3 h-24">
                  <div className="flex items-end justify-between h-full gap-0.5">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 bg-swarp-blue/40 rounded-t"
                        initial={{ height: "10%" }}
                        animate={{
                          height: [`${20 + Math.random() * 50}%`, `${30 + Math.random() * 60}%`],
                        }}
                        transition={{
                          duration: 1.5 + Math.random(),
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ServiceCard>
          </div>

          {/* Deliverables */}
          <div className="px-6 pb-8 pointer-events-auto">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-center text-xs uppercase tracking-widest text-gray-500 mb-4">
                What You Get
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {deliverables.map((item) => (
                  <div
                    key={item.text}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-swarp-blue/10 border border-swarp-blue/20"
                  >
                    <item.icon className="w-4 h-4 text-swarp-blue" />
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="px-6 py-12 text-center pointer-events-auto border-t border-swarp-blue/20">
            <ServiceCTA
              title="Ready to Deploy?"
              description="Schedule a technical consultation with our blockchain engineers."
              accentColor="purple"
            />
          </div>
        </div>
      </div>
    </ServiceContentLayout>
  );
}

export default BlockchainContent;
