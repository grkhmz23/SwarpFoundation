"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Server,
  Cpu,
  Zap,
  Box,
  BrainCircuit,
  Database,
  Layers,
  Activity,
  Bot,
  Share2,
  Wifi,
  Shield,
  Scan,
} from "lucide-react";

// ============================================================================
// SVG HARDWARE ILLUSTRATIONS (Swarp Branded)
// ============================================================================

const MonitorSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 410 360" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="monitorGlass" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#0d1a2d" />
        <stop offset="1" stopColor="#1a3a5c" />
      </linearGradient>
    </defs>
    <g filter="drop-shadow(0 8px 16px rgba(0,0,0,0.4))">
      <rect x="0" y="0" width="410" height="250" rx="18" fill="url(#monitorGlass)" stroke="#00d4ff" strokeWidth="3" strokeOpacity="0.5" />
      <rect x="20" y="20" width="370" height="210" rx="14" fill="#0a0f1a" opacity=".85" />
      <path stroke="#00d4ff" strokeWidth="1" fill="none" d="M70 40 L140 115 M105 32 L180 150 M245 40 L315 120" opacity=".25" />
      <path fill="#0d1a2d" stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.3" d="M170 250 C150 285 150 300 150 318 L260 318 C260 294 258 281 240 250 Z" />
      <path fill="#0a1525" stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.3" d="M120 318 L290 318 L320 360 L90 360 Z" />
      {/* Screen glow */}
      <rect x="30" y="30" width="350" height="190" rx="10" fill="#00d4ff" opacity="0.03" />
    </g>
  </svg>
);

const CpuSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 180 150" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="cpuPins" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="3" cy="3" r="1.2" fill="#00d4ff" opacity="0.6" />
        <circle cx="8" cy="7" r="1.2" fill="#00d4ff" opacity="0.6" />
      </pattern>
    </defs>
    <g filter="drop-shadow(0 6px 12px rgba(0,0,0,0.4))">
      <rect x="0" y="0" width="180" height="150" rx="14" fill="#1a2a3a" stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.5" />
      <rect x="14" y="14" width="152" height="122" rx="10" fill="url(#cpuPins)" stroke="#0a1525" strokeWidth="2" />
      <rect x="42" y="46" width="96" height="60" rx="10" fill="#0d2030" stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.6" />
      <text x="90" y="78" textAnchor="middle" fontFamily="monospace" fontSize="14" fill="#00d4ff" opacity=".9">SWARP</text>
      <text x="90" y="96" textAnchor="middle" fontFamily="monospace" fontSize="10" fill="#00d4ff" opacity=".7">SILICON</text>
    </g>
  </svg>
);

const RamSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 220 55" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="ramChipPattern" width="28" height="18" patternUnits="userSpaceOnUse">
        <rect x="2" y="2" width="22" height="14" rx="2" fill="#0a1525" opacity=".85" />
        <rect x="5" y="5" width="16" height="8" rx="2" fill="#0d2535" opacity=".75" />
      </pattern>
    </defs>
    <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))">
      <rect x="0" y="0" width="220" height="55" rx="14" fill="#0d3040" stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.5" />
      <rect x="14" y="10" width="188" height="35" rx="10" fill="url(#ramChipPattern)" opacity=".95" />
      <path d="M14 50 H206" stroke="#00d4ff" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
    </g>
  </svg>
);

const HardDriveSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 260 310" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hddMetal" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#2a3a4a" />
        <stop offset="1" stopColor="#1a2535" />
      </linearGradient>
      <linearGradient id="hddNeon" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#00d4ff" />
        <stop offset="1" stopColor="#7b4fff" />
      </linearGradient>
    </defs>
    <g filter="drop-shadow(0 8px 16px rgba(0,0,0,0.4))">
      <rect x="0" y="0" width="260" height="310" rx="20" fill="#0d1a2d" stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.4" />
      <rect x="18" y="18" width="224" height="274" rx="16" fill="#1a2535" opacity=".7" />
      {/* Platter */}
      <circle cx="130" cy="140" r="92" fill="url(#hddMetal)" stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.5" />
      <circle cx="130" cy="140" r="62" fill="#2a3a4a" opacity=".75" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.3" />
      <circle cx="130" cy="140" r="18" fill="#1a2a3a" stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.5" />
      {/* Arm */}
      <path fill="#2a3a4a" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.3" d="M175 225 C205 205 210 165 196 136 C188 120 170 110 154 110 C182 125 176 155 166 168 C152 190 120 205 88 214 C74 218 58 224 52 236 C44 252 54 262 70 266 C104 275 148 258 175 225 Z" />
      {/* Screws */}
      <circle cx="36" cy="40" r="6" fill="#1a2535" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="224" cy="40" r="6" fill="#1a2535" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="36" cy="270" r="6" fill="#1a2535" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="224" cy="270" r="6" fill="#1a2535" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
      {/* Neon wire */}
      <path fill="none" d="M40 290 C80 270 90 285 120 300 C155 318 190 300 230 286" stroke="url(#hddNeon)" strokeWidth="3" opacity=".6" />
    </g>
  </svg>
);

const MotherboardSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 410 230" className={className} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pcbGrad" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#0d2535" />
        <stop offset="1" stopColor="#051520" />
      </linearGradient>
    </defs>
    <g filter="drop-shadow(0 8px 16px rgba(0,0,0,0.4))">
      <rect x="0" y="0" width="410" height="230" rx="26" fill="url(#pcbGrad)" stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.4" />
      {/* Traces */}
      <path fill="none" d="M40 40 C120 25 180 40 240 30 C290 22 350 30 380 50" stroke="#00d4ff" strokeWidth="1" opacity=".25" />
      <path fill="none" d="M35 190 C95 165 140 175 190 150 C250 120 310 160 375 130" stroke="#7b4fff" strokeWidth="1" opacity=".2" />
      {/* Slots */}
      <rect x="40" y="70" width="120" height="95" rx="14" fill="#0a1a25" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.3" />
      <rect x="58" y="88" width="84" height="58" rx="10" fill="#051520" opacity=".8" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.2" />
      <rect x="190" y="60" width="90" height="80" rx="12" fill="#0d2030" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.3" />
      <rect x="200" y="70" width="70" height="60" rx="10" fill="#051520" opacity=".85" />
      <rect x="300" y="55" width="70" height="150" rx="14" fill="#0a1a25" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.3" />
      {/* RAM slots */}
      <g opacity=".85">
        <rect x="312" y="68" width="46" height="16" rx="6" fill="#051520" />
        <rect x="312" y="92" width="46" height="16" rx="6" fill="#051520" />
        <rect x="312" y="116" width="46" height="16" rx="6" fill="#051520" />
        <rect x="312" y="140" width="46" height="16" rx="6" fill="#051520" />
      </g>
      {/* Heatsink */}
      <g transform="translate(170 150)">
        <rect x="0" y="0" width="115" height="55" rx="14" fill="#0a1a25" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.3" />
        <path fill="none" d="M10 12 H105 M10 22 H105 M10 32 H105 M10 42 H105" stroke="#00d4ff" strokeWidth="1" opacity=".2" />
      </g>
      {/* IO LEDs */}
      <g transform="translate(28 22)">
        <rect x="0" y="0" width="70" height="36" rx="10" fill="#0d2030" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="16" cy="18" r="5" fill="#ff4d7b" opacity="0.8" />
        <circle cx="36" cy="18" r="5" fill="#ffd35a" opacity="0.8" />
        <circle cx="56" cy="18" r="5" fill="#00d4ff" opacity="0.8" />
      </g>
      <text x="28" y="220" fontFamily="monospace" fontSize="10" fill="#00d4ff" opacity=".5">SWARP / BUS GRID</text>
    </g>
  </svg>
);

const MouseSVG = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 90" className={className} xmlns="http://www.w3.org/2000/svg">
    <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))">
      <ellipse cx="60" cy="50" rx="50" ry="38" fill="#1a3a5c" stroke="#00d4ff" strokeWidth="2" strokeOpacity="0.5" />
      <path fill="none" d="M30 30 C45 18 75 18 90 30" stroke="#00d4ff" strokeWidth="1" opacity=".4" />
      <path fill="none" d="M60 24 L60 44" stroke="#00d4ff" strokeWidth="1" opacity=".4" />
      <ellipse cx="60" cy="34" rx="8" ry="10" fill="#0d2535" stroke="#00d4ff" strokeWidth="1" strokeOpacity="0.4" />
    </g>
  </svg>
);

// ============================================================================
// REALISTIC DEVICE RENDER (3D Configurator)
// ============================================================================

const RealisticDeviceRender = ({
  config,
  animating,
}: {
  config: ConfigType;
  animating: boolean;
}) => {
  const renderProcessor = () => {
    const type = config.compute;
    const colors = {
      arm: "from-emerald-700 to-emerald-900 border-emerald-500",
      x86: "from-slate-300 to-slate-500 border-slate-400",
      gpu: "from-gray-800 to-black border-purple-500",
    };

    return (
      <motion.div
        className={`relative z-20 w-14 h-14 rounded-md shadow-[0_4px_8px_rgba(0,0,0,0.5)] flex items-center justify-center border-b-2 ${
          type === "x86" ? "bg-green-700 border-green-800" : "bg-gray-900 border-gray-800"
        }`}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:3px_3px]" />
        <div className={`relative w-9 h-9 bg-gradient-to-br ${colors[type as keyof typeof colors]} shadow-inner rounded-sm flex items-center justify-center`}>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-sm" />
          <div className="text-[5px] font-mono font-bold opacity-70 tracking-widest text-white/80 text-center">
            {type.toUpperCase()}
          </div>
        </div>
      </motion.div>
    );
  };

  const renderRam = () => (
    <div className="flex gap-0.5 absolute right-2 top-1/2 -translate-y-1/2 z-10 transform -skew-y-6">
      {[1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.4 + i * 0.1 }}
          className="w-1 h-10 bg-gradient-to-b from-gray-800 to-black border-l border-gray-700 relative shadow-xl"
        >
          <div className="absolute top-1 left-0 right-0 h-1.5 bg-black border border-gray-700" />
          <div className="absolute top-3 left-0 right-0 h-1.5 bg-black border border-gray-700" />
          <div className="absolute bottom-0 w-full h-0.5 bg-yellow-600" />
        </motion.div>
      ))}
    </div>
  );

  const renderChassis = () => {
    const f = config.formFactor;
    const styles = {
      dock: "w-28 h-8 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg",
      edge: "w-24 h-14 bg-gray-800 rounded-lg",
      mini: "w-22 h-6 bg-gray-900 border border-gray-700",
      node: "w-16 h-20 bg-gray-950 border-x-2 border-gray-800",
    };

    return (
      <motion.div
        className={`relative z-0 shadow-xl ${styles[f as keyof typeof styles]} flex items-center justify-center overflow-hidden transition-all duration-500`}
        layoutId="chassis"
      >
        <div className="absolute bottom-1 left-1.5 flex gap-0.5">
          <div className="w-2 h-1 bg-black rounded-sm" />
          <div className="w-1 h-1 bg-black rounded-full" />
        </div>
        <div className="absolute top-1 right-1.5">
          <div className={`w-1 h-1 rounded-full ${animating ? "bg-orange-500 animate-pulse" : "bg-emerald-500 shadow-[0_0_3px_#10b981]"}`} />
        </div>
        <div className="absolute bottom-0.5 right-1.5 text-[3px] font-mono text-gray-500">
          {f.toUpperCase()}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ rotateX: 10, rotateY: animating ? 180 : -15 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute w-24 h-16 bg-emerald-900/40 border border-emerald-500/30 rounded blur-[1px]" style={{ transform: "rotateX(60deg) translateY(15px)" }} />
        <div className="relative flex flex-col items-center justify-center gap-1.5">
          <div className="relative">
            {renderProcessor()}
            {renderRam()}
          </div>
          {renderChassis()}
        </div>
        <div className="absolute -bottom-6 w-20 h-4 bg-cyan-500/20 blur-xl rounded-full" style={{ transform: "scaleX(1.5)" }} />
      </motion.div>
    </div>
  );
};

// ============================================================================
// UTILS
// ============================================================================
const ScrambleText = ({ text, trigger }: { text: string; trigger: unknown }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split("").map((l, i) => (i < iteration ? text[i] : chars[Math.floor(Math.random() * chars.length)])).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.5;
    }, 30);
    return () => clearInterval(interval);
  }, [text, trigger]);

  return <span>{display}</span>;
};

// ============================================================================
// CONFIG
// ============================================================================
type ConfigType = {
  formFactor: string;
  compute: string;
  io: string;
};

const SPECS = {
  formFactor: {
    dock: { name: "Nano Dock", icon: Box },
    edge: { name: "Edge Box", icon: Shield },
    mini: { name: "Mini Server", icon: Server },
    node: { name: "Super Node", icon: Database },
  },
  compute: {
    arm: { name: "ARM64", cores: "128-Core", power: "45W" },
    x86: { name: "x86_64", cores: "16-Core", power: "65W" },
    gpu: { name: "Jetson", cores: "2048 CUDA", power: "60W" },
  },
  io: {
    usbc: { name: "TB4" },
    eth: { name: "10GbE" },
    pcie: { name: "PCIe5" },
  },
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export function HardwareContent() {
  const [config, setConfig] = useState<ConfigType>({
    formFactor: "mini",
    compute: "gpu",
    io: "eth",
  });
  const [animating, setAnimating] = useState(false);
  const [activeView, setActiveView] = useState<"config" | "gallery">("gallery");
  const [manifestId, setManifestId] = useState("----");

  useEffect(() => {
    setManifestId(Math.floor(1000 + Math.random() * 8999).toString());
  }, []);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [config]);

  const computeColors: Record<string, string> = {
    arm: "from-emerald-500/20 to-emerald-900/20 border-emerald-500/50 text-emerald-400",
    x86: "from-blue-500/20 to-blue-900/20 border-blue-500/50 text-blue-400",
    gpu: "from-purple-500/20 to-purple-900/20 border-purple-500/50 text-purple-400",
  };

  return (
    <div className="min-h-full bg-[#0a0f1a] text-gray-200 overflow-hidden relative">
      {/* Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 px-4 py-5">
        {/* Header */}
        <div className="mb-3">
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/50 mb-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500" />
            </span>
            <span className="text-[8px] font-medium text-cyan-400 tracking-wide uppercase">Fabrication Lab</span>
          </div>
          <h1 className="text-lg font-bold text-white mb-1">
            Hardware <span className="text-gray-500">&</span> Devices
          </h1>
        </div>

        {/* View Toggle */}
        <div className="flex gap-1 mb-3 bg-black/40 p-1 rounded-lg border border-gray-800 w-fit">
          <button
            onClick={() => setActiveView("gallery")}
            className={`px-3 py-1 rounded text-[8px] font-bold tracking-wider flex items-center gap-1 transition-all ${
              activeView === "gallery" ? "bg-cyan-500 text-black" : "text-gray-500"
            }`}
          >
            <Layers className="w-3 h-3" /> COMPONENTS
          </button>
          <button
            onClick={() => setActiveView("config")}
            className={`px-3 py-1 rounded text-[8px] font-bold tracking-wider flex items-center gap-1 transition-all ${
              activeView === "config" ? "bg-cyan-500 text-black" : "text-gray-500"
            }`}
          >
            <Activity className="w-3 h-3" /> CONFIGURATOR
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeView === "gallery" ? (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {/* Hardware Gallery */}
              <div className="relative bg-gradient-to-br from-[#0d1a2d] to-[#0a0f1a] border border-cyan-900/30 rounded-xl overflow-hidden h-[280px] p-4">
                {/* Floating Components */}
                <motion.div
                  className="absolute top-2 left-2 w-[100px]"
                  animate={{ y: [0, -5, 0], rotate: [-8, -6, -8] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MonitorSVG />
                </motion.div>

                <motion.div
                  className="absolute top-4 right-4 w-[70px]"
                  animate={{ y: [0, -4, 0], rotate: [8, 10, 8] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <CpuSVG />
                </motion.div>

                <motion.div
                  className="absolute bottom-16 left-6 w-[90px]"
                  animate={{ y: [0, -3, 0], rotate: [-10, -8, -10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <HardDriveSVG />
                </motion.div>

                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px]"
                  animate={{ y: [0, -6, 0], rotate: [4, 6, 4] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                  <MotherboardSVG />
                </motion.div>

                <motion.div
                  className="absolute top-8 right-1/4 w-[80px]"
                  animate={{ y: [0, -4, 0], rotate: [-14, -12, -14] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
                >
                  <RamSVG />
                </motion.div>

                <motion.div
                  className="absolute bottom-20 right-8 w-[80px]"
                  animate={{ y: [0, -3, 0], rotate: [-16, -14, -16] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                >
                  <RamSVG />
                </motion.div>

                <motion.div
                  className="absolute bottom-6 right-1/3 w-[50px]"
                  animate={{ y: [0, -3, 0], rotate: [6, 8, 6] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                >
                  <MouseSVG />
                </motion.div>

                {/* Center Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.08),transparent_70%)] pointer-events-none" />
              </div>

              {/* Component Labels */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: Cpu, label: "CPU / SoC" },
                  { icon: Database, label: "Storage" },
                  { icon: Layers, label: "Boards" },
                  { icon: Box, label: "Enclosures" },
                ].map((item, i) => (
                  <div key={i} className="p-2 rounded-lg bg-cyan-950/20 border border-cyan-900/30 text-center">
                    <item.icon className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                    <span className="text-[8px] text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded-lg flex items-center justify-center gap-2 transition-all text-xs"
              >
                START PROJECT <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="config"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {/* 3D Preview */}
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden h-[100px]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
                <RealisticDeviceRender config={config} animating={animating} />
              </div>

              {/* Configurator */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-3 space-y-3">
                {/* Form Factor */}
                <div>
                  <label className="text-[7px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1 mb-1.5">
                    <Box className="w-2.5 h-2.5" /> Chassis
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {Object.keys(SPECS.formFactor).map((f) => {
                      const key = f as keyof typeof SPECS.formFactor;
                      const Icon = SPECS.formFactor[key].icon;
                      return (
                        <button
                          key={key}
                          onClick={() => setConfig({ ...config, formFactor: key })}
                          className={`p-1.5 rounded-lg border text-center transition-all ${
                            config.formFactor === key
                              ? "bg-cyan-950/40 border-cyan-500 text-cyan-300"
                              : "bg-black/40 border-gray-800 text-gray-500"
                          }`}
                        >
                          <Icon className={`w-3 h-3 mx-auto mb-0.5 ${config.formFactor === key ? "text-cyan-400" : "text-gray-600"}`} />
                          <span className="block text-[7px] font-bold">{SPECS.formFactor[key].name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Compute */}
                <div>
                  <label className="text-[7px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1 mb-1.5">
                    <BrainCircuit className="w-2.5 h-2.5" /> Core
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {Object.keys(SPECS.compute).map((c) => {
                      const key = c as keyof typeof SPECS.compute;
                      return (
                        <button
                          key={key}
                          onClick={() => setConfig({ ...config, compute: key })}
                          className={`flex flex-col items-center p-1.5 rounded-lg border transition-all ${
                            config.compute === key
                              ? `bg-gradient-to-b ${computeColors[key]}`
                              : "bg-black/40 border-gray-800 text-gray-500"
                          }`}
                        >
                          <Cpu className={`w-3 h-3 mb-0.5 ${config.compute === key ? "" : "text-gray-600"}`} />
                          <span className="text-[8px] font-bold">{key.toUpperCase()}</span>
                          <span className="text-[6px] text-white/50">{SPECS.compute[key].cores}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* I/O */}
                <div>
                  <label className="text-[7px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-1 mb-1.5">
                    <Share2 className="w-2.5 h-2.5" /> I/O
                  </label>
                  <div className="flex gap-1.5">
                    {Object.keys(SPECS.io).map((io) => {
                      const key = io as keyof typeof SPECS.io;
                      return (
                        <button
                          key={key}
                          onClick={() => setConfig({ ...config, io: key })}
                          className={`flex-1 py-1 text-[8px] border rounded transition-all ${
                            config.io === key
                              ? "border-cyan-500 bg-cyan-900/20 text-cyan-300"
                              : "border-gray-800 text-gray-600"
                          }`}
                        >
                          {SPECS.io[key].name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Specs */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-2.5 font-mono text-[9px]">
                <div className="flex justify-between items-center mb-2 border-b border-gray-800 pb-1.5">
                  <span className="text-gray-500 flex items-center gap-1">
                    <Scan className="w-2.5 h-2.5" /> MANIFEST
                  </span>
                  <span className="text-cyan-400 bg-cyan-950/30 px-1.5 py-0.5 rounded">SWARP-{manifestId}</span>
                </div>
                <div className="space-y-1 mb-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">CORE</span>
                    <span className="text-gray-300">
                      <ScrambleText text={SPECS.compute[config.compute as keyof typeof SPECS.compute].name} trigger={config} />
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">TDP</span>
                    <span className="text-gray-300">
                      <ScrambleText text={SPECS.compute[config.compute as keyof typeof SPECS.compute].power} trigger={config} />
                    </span>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-sans font-bold py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all text-[10px]"
                >
                  REQUEST QUOTE <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default HardwareContent;