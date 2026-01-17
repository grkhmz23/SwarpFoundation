"use client";

import { useState, useEffect } from "react";
import { Activity, Zap, Shield, TrendingUp } from "lucide-react";

const terminalLines = [
  { text: "$ initializing swarp-protocol...", delay: 0 },
  { text: "> connecting to solana mainnet", delay: 800 },
  { text: "✓ connected | latency: 12ms", delay: 1600 },
  { text: "> loading smart contracts", delay: 2400 },
  { text: "✓ 15 contracts deployed", delay: 3200 },
  { text: "✓ security audit passed", delay: 4000 },
  { text: "$ system: ONLINE", delay: 4800 },
];

const stats = [
  { icon: Activity, label: "TPS", value: "50,000", color: "text-swarp-neon-cyan" },
  { icon: Zap, label: "Latency", value: "400ms", color: "text-swarp-neon-violet" },
  { icon: Shield, label: "Security", value: "A+", color: "text-swarp-neon-green" },
  { icon: TrendingUp, label: "Uptime", value: "99.9%", color: "text-swarp-blue" },
];

export function TerminalDashboard() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < terminalLines.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Terminal Window */}
      <div className="glass-strong rounded-xl overflow-hidden border-sweep hud-corner">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-swarp-blue/20">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs font-mono text-gray-400">swarp-terminal v2.1.0</span>
        </div>

        {/* Terminal Content */}
        <div className="p-6 font-mono text-sm h-64 overflow-hidden scan-line">
          {terminalLines.slice(0, visibleLines).map((line, index) => (
            <div
              key={index}
              className={`mb-2 ${
                line.text.includes("✓")
                  ? "text-swarp-neon-green"
                  : line.text.includes("$")
                  ? "text-swarp-neon-cyan"
                  : "text-gray-400"
              }`}
            >
              {line.text}
              {index === visibleLines - 1 && (
                <span className="inline-block w-2 h-4 bg-swarp-cyan ml-1 animate-pulse" />
              )}
            </div>
          ))}
        </div>

        {/* Stats Panel */}
        <div className="grid grid-cols-4 gap-4 p-4 border-t border-swarp-blue/20 bg-swarp-darker/50">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 rounded-lg glass hover:glass-strong transition-all group"
            >
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2 group-hover:scale-110 transition-transform`} />
              <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
              <div className={`text-sm font-bold ${stat.color}`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-swarp-darker/80 border-t border-swarp-blue/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-swarp-neon-green status-pulse" />
            <span className="text-xs text-gray-400">SYSTEM ONLINE</span>
          </div>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>SOLANA-NATIVE</span>
            <span>AUDITED</span>
            <span className="text-swarp-neon-cyan">PROD</span>
          </div>
        </div>
      </div>

      {/* Floating Glow Effects */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-swarp-blue/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-swarp-purple/20 rounded-full blur-3xl animate-pulse" />
    </div>
  );
}
