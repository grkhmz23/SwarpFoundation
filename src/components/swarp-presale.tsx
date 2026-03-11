"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Terminal,
  Zap,
  Shield,
  Sparkles,
  Activity,
  Globe,
  Database,
  Coins,
  Fingerprint,
  Cpu,
  Crosshair,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

// --- DATA CONFIGURATION ---
const METRICS = [
  { id: "network", label: "Token Network", value: "Solana SPL", icon: Globe, highlight: true },
  { id: "price", label: "Initial Price", value: 0.03, prefix: "~$", icon: Zap },
  { id: "supply", label: "Total Supply", value: 1000000000, icon: Database, isNumber: true },
  { id: "access", label: "Access", value: "SwarpPay.com", icon: Shield },
];

const ALLOCATIONS = [
  { id: "ecosystem", label: "Ecosystem Rewards", percentage: 28, color: "#9D4EDD" },
  { id: "community", label: "Community", percentage: 17, color: "#7209B7" },
  { id: "treasury", label: "Treasury", percentage: 17, color: "#F72585" },
  { id: "investors", label: "Investors", percentage: 15, color: "#0066FF" },
  { id: "team", label: "Team", percentage: 12, color: "#00D4FF" },
  { id: "dex", label: "DEX Liquidity", percentage: 5, color: "#4CC9F0" },
  { id: "advisors", label: "Advisors", percentage: 3, color: "#4A00E0" },
  { id: "cex", label: "CEX Reserve", percentage: 3, color: "#4361EE" },
];

const SIGNAL_CHIPS = ["Solana SPL", "Presale Soon", "Compliance-First"];

const SWARPPAY_HREF = "https://swarppay.com";

// --- UTILITY COMPONENTS ---

// Number Count Up Animation
const CountUp = ({
  end,
  prefix = "",
  suffix = "",
  decimals = 0,
  isNumber = false,
}: {
  end: number | string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  isNumber?: boolean;
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (typeof end !== "number") return;

    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const update = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(start + (end - start) * easeProgress);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [end]);

  if (typeof end !== "number") {
    return (
      <span>
        {prefix}
        {end}
        {suffix}
      </span>
    );
  }

  const formattedValue = isNumber
    ? Math.floor(value).toLocaleString()
    : value.toFixed(decimals);

  return (
    <span>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

// Interactive Donut Chart
const AllocationChart = () => {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;

  const activeData = hoveredSlice
    ? ALLOCATIONS.find((a) => a.id === hoveredSlice)
    : { label: "Total Supply", percentage: 100, color: "#00D4FF" };

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 220 220"
        className="transform -rotate-90 drop-shadow-[0_0_15px_rgba(0,212,255,0.2)]"
      >
        {/* Background Track & Radar Rings */}
        <circle
          cx="110"
          cy="110"
          r="105"
          fill="none"
          stroke="rgba(0,212,255,0.15)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx="110"
          cy="110"
          r="60"
          fill="none"
          stroke="rgba(0,212,255,0.1)"
          strokeWidth="1"
        />
        <circle
          cx="110"
          cy="110"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="20"
        />

        {/* Allocation Slices */}
        {ALLOCATIONS.map((alloc) => {
          const dashArray = `${(alloc.percentage / 100) * circumference} ${circumference}`;
          const dashOffset = -currentOffset;
          currentOffset += (alloc.percentage / 100) * circumference;

          const isHovered = hoveredSlice === alloc.id;
          const isFaded = hoveredSlice && !isHovered;

          return (
            <motion.circle
              key={alloc.id}
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke={alloc.color}
              strokeWidth={isHovered ? 24 : 20}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              className="cursor-pointer transition-all duration-300 ease-in-out"
              style={{
                opacity: isFaded ? 0.3 : 1,
                filter: isHovered ? `drop-shadow(0 0 8px ${alloc.color})` : "none",
              }}
              onMouseEnter={() => setHoveredSlice(alloc.id)}
              onMouseLeave={() => setHoveredSlice(null)}
              initial={{ strokeDasharray: `0 ${circumference}` }}
              whileInView={{ strokeDasharray: dashArray }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            />
          );
        })}
      </svg>

      {/* Center Content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeData?.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center"
          >
            <span
              className="font-mono text-3xl font-bold tracking-tighter"
              style={{ color: activeData?.color || "#fff" }}
            >
              {activeData?.percentage}%
            </span>
            <span className="mt-1 max-w-[140px] px-4 text-xs uppercase leading-tight tracking-widest text-slate-400">
              {activeData?.label}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---

const HUDCorner = ({ className }: { className: string }) => (
  <div
    className={`pointer-events-none absolute z-50 h-8 w-8 border-[#00D4FF] opacity-60 ${className}`}
  />
);

export function SwarpPresale() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section className="relative isolate overflow-hidden py-16 md:py-24">
      {/* CRT Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(255,255,255,0.015)_50%,transparent_50%)] bg-[length:100%_4px] mix-blend-overlay" />

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Animated Radial Gradients */}
        <div className="absolute left-[-10%] top-[-10%] h-[50%] w-[50%] animate-pulse rounded-full bg-[#00D4FF]/20 blur-[150px] mix-blend-screen duration-[8000ms]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full bg-[#0066FF]/20 blur-[150px] mix-blend-screen" />
        <div className="absolute left-[60%] top-[40%] h-[30%] w-[30%] rounded-full bg-[#9D4EDD]/15 blur-[120px] mix-blend-screen" />

        {/* Grid Pattern with Mask */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />

        {/* Floating Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[#00D4FF]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Hex Data Background Matrix */}
        <div className="absolute inset-0 flex justify-around overflow-hidden pt-20 font-mono text-xs opacity-[0.04]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-[pulse_4s_ease-in-out_infinite] flex flex-col gap-2"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <span key={j}>
                  {Math.random().toString(16).substring(2, 8).toUpperCase()}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* --- HERO CONTAINER --- */}
      <div className="relative z-10 mx-auto flex min-h-[800px] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          className="group relative w-full overflow-hidden border border-[#00D4FF]/30 bg-[#050714]/80 p-6 shadow-[0_0_50px_-15px_rgba(0,212,255,0.3)] backdrop-blur-xl lg:p-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 40px), calc(100% - 40px) 100%, 0 100%)",
          }}
        >
          {/* HUD Corners */}
          <HUDCorner className="left-0 top-0 border-l-2 border-t-2" />
          <HUDCorner className="right-0 top-0 border-r-2 border-t-2" />
          <HUDCorner className="bottom-0 left-0 border-b-2 border-l-2" />

          {/* Inner Top Edge Glow */}
          <div className="pointer-events-none absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D4FF]/60 to-transparent" />
          <div className="pointer-events-none absolute left-[20%] right-[20%] top-0 h-[100px] bg-[#00D4FF]/10 blur-[60px]" />

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* --- LEFT SIDE: CONTENT --- */}
            <div className="relative z-10 flex flex-col space-y-8 lg:col-span-5">
              {/* Badge */}
              <motion.div
                className="inline-flex w-fit items-center gap-2 rounded-full border border-[#00D4FF]/30 bg-[#00D4FF]/10 px-4 py-2 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Sparkles className="h-4 w-4 text-[#00D4FF]" />
                <span className="text-xs font-semibold uppercase tracking-widest text-[#00D4FF]">
                  Cinematic Trading Desk
                </span>
              </motion.div>

              {/* Title & Description */}
              <div className="space-y-4">
                <motion.h2
                  className="text-5xl font-extrabold tracking-tight lg:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                    SWARP
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#00D4FF] to-[#0066FF] bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(0,212,255,0.4)]">
                    Presale Terminal
                  </span>
                </motion.h2>
                <motion.p
                  className="max-w-md text-lg leading-relaxed text-slate-400"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  Premium interface, verified tokenomics context, and direct access to the live
                  platform.
                </motion.p>
              </div>

              {/* Signal Chips */}
              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {SIGNAL_CHIPS.map((chip, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 shadow-[inset_0_0_10px_rgba(255,255,255,0.02)]"
                  >
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00D4FF]" />
                    {chip}
                  </div>
                ))}
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                className="space-y-2 pt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-end justify-between">
                  <span className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#00D4FF]">
                    <Cpu className="h-3.5 w-3.5" /> SYSTEM INITIALIZED
                  </span>
                  <span className="animate-pulse font-mono text-xs text-[#00D4FF]">100%</span>
                </div>
                <div className="flex h-2.5 w-full gap-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-full flex-1 bg-[#00D4FF]"
                      initial={{ opacity: 0.1, scaleY: 0.1 }}
                      whileInView={{ opacity: [0.1, 1, 0.8], scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.1, delay: 0.8 + i * 0.04 }}
                      style={{ boxShadow: "0 0 8px rgba(0, 212, 255, 0.4)" }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-col gap-4 pt-6 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <a
                  href={SWARPPAY_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden border border-[#00D4FF] bg-transparent px-8 py-4 font-mono font-bold uppercase tracking-widest text-[#00D4FF] transition-all hover:scale-[1.02] hover:bg-[#00D4FF]/10 hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
                >
                  <div className="absolute inset-0 translate-x-[-150%] bg-[linear-gradient(45deg,transparent_25%,rgba(0,212,255,0.2)_50%,transparent_75%)] transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]" />
                  <span className="relative flex items-center justify-center gap-2">
                    <Crosshair className="h-5 w-5" /> Join Presale
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </a>
                <Link
                  href="/tokenomics"
                  className="group relative flex items-center justify-center gap-2 overflow-hidden border border-white/10 bg-[#0a0d1c] px-8 py-4 font-mono text-sm tracking-wide text-slate-300 transition-all hover:bg-white/5 hover:text-white"
                >
                  <div className="absolute bottom-0 left-0 top-0 w-1 origin-bottom scale-y-0 transform bg-[#00D4FF] transition-transform group-hover:scale-y-100" />
                  <Database className="h-4 w-4 text-slate-500 transition-colors group-hover:text-[#00D4FF]" />{" "}
                  READ_TOKENOMICS
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>

            {/* --- RIGHT SIDE: TRADING TERMINAL --- */}
            <motion.div className="relative lg:col-span-7" style={{ y: yParallax }}>
              <div className="pointer-events-none absolute -inset-1 rounded-none bg-gradient-to-b from-[#00D4FF]/20 to-transparent opacity-50 blur-md" />

              <div
                className="relative overflow-hidden border border-white/10 bg-[#0a0d1c]/95 p-6 shadow-2xl backdrop-blur-3xl lg:p-8"
                style={{
                  clipPath:
                    "polygon(30px 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%, 0 30px)",
                }}
              >
                {/* Terminal Header */}
                <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-10 w-10 items-center justify-center border border-[#00D4FF]/40 bg-[#050714] shadow-[0_0_15px_rgba(0,212,255,0.2)]">
                      {/* Logo with fallback */}
                      <Image
                        src="/logo_transparent_original.png"
                        alt="SWARP Logo"
                        width={24}
                        height={24}
                        className="z-10 object-contain drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]"
                        onError={(e) => {
                          // Hide image and show icon fallback
                          (e.target as HTMLImageElement).style.display = "none";
                          const fallback = (e.target as HTMLImageElement).nextElementSibling;
                          if (fallback) fallback.classList.remove("hidden");
                        }}
                      />
                      <Fingerprint className="absolute hidden h-5 w-5 text-[#00D4FF]" />

                      {/* Rotating border glow */}
                      <div className="absolute inset-[-2px] animate-[spin_3s_linear_infinite] border border-t-[#00D4FF] border-r-transparent border-b-transparent border-l-transparent" />
                    </div>
                    <div>
                      <h3 className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-[#00D4FF]">
                        SYS.TERMINAL{" "}
                        <span className="relative top-[1px] inline-block h-4 w-2 animate-pulse bg-[#00D4FF]" />
                      </h3>
                      <p className="font-mono text-[10px] text-slate-500">
                        LINK_STATUS: ENCRYPTED // LIVE
                      </p>
                    </div>
                  </div>

                  {/* System Status Readout */}
                  <div className="flex items-center gap-2 border border-[#00D4FF]/30 bg-[#00D4FF]/5 px-3 py-1.5 font-mono text-xs text-[#00D4FF]">
                    <div className="h-2 w-2 animate-pulse bg-[#00D4FF] shadow-[0_0_8px_#00D4FF]" />
                    <span>NODE_SYNCED</span>
                  </div>
                </div>

                {/* Live Purchase Notice */}
                <div className="mb-8 flex items-center gap-3 rounded-lg border-l-2 border-[#9D4EDD] bg-gradient-to-r from-[#9D4EDD]/10 to-transparent p-3">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-[#9D4EDD] shadow-[0_0_8px_#9D4EDD]" />
                  <span className="text-xs font-medium tracking-wide text-slate-300">
                    Live allocation phase active. Token metrics below are verified on-chain.
                  </span>
                </div>

                {/* 2x2 Metrics Grid */}
                <div className="mb-8 grid grid-cols-2 gap-4">
                  {METRICS.map((metric, idx) => {
                    const Icon = metric.icon;
                    return (
                      <motion.div
                        key={metric.id}
                        className={`group relative overflow-hidden p-4 transition-all duration-300 ${
                          metric.highlight
                            ? "border border-[#00D4FF]/40 bg-gradient-to-br from-[#00D4FF]/10 to-transparent shadow-[inset_3px_0_0_#00D4FF]"
                            : "border border-white/5 bg-[#050714]/50 shadow-[inset_3px_0_0_rgba(255,255,255,0.1)] hover:border-[#00D4FF]/30 hover:shadow-[inset_3px_0_0_#00D4FF]"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * idx }}
                      >
                        <div className="relative z-10 mb-2 flex items-center gap-2 text-slate-400">
                          <Icon className={`h-4 w-4 ${metric.highlight ? "text-[#00D4FF]" : ""}`} />
                          <span className="text-[10px] font-semibold uppercase tracking-widest">
                            {metric.label}
                          </span>
                        </div>
                        <div
                          className={`relative z-10 font-mono text-xl font-bold sm:text-2xl ${
                            metric.highlight
                              ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                              : "text-slate-200"
                          }`}
                        >
                          <CountUp
                            end={metric.value}
                            prefix={metric.prefix}
                            isNumber={metric.isNumber}
                            decimals={metric.id === "price" ? 2 : 0}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Allocation Matrix */}
                <div className="rounded-xl border border-white/5 bg-[#050714]/50 p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h4 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-slate-300">
                      <Coins className="h-4 w-4 text-[#9D4EDD]" /> ALLOCATION MATRIX
                    </h4>
                    <span className="rounded bg-white/10 px-2 py-1 font-mono text-[10px] text-slate-400">
                      100% DISTRIBUTED
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-8 sm:flex-row">
                    {/* Interactive Donut Chart */}
                    <div className="w-full sm:w-1/2">
                      <AllocationChart />
                    </div>

                    {/* Legend Grid */}
                    <div className="grid w-full grid-cols-1 gap-x-2 gap-y-3 sm:w-1/2 sm:grid-cols-2">
                      {ALLOCATIONS.map((alloc) => (
                        <div key={alloc.id} className="group flex cursor-default items-center gap-2">
                          <div
                            className="h-2.5 w-2.5 rounded-full shadow-sm transition-transform group-hover:scale-125"
                            style={{
                              backgroundColor: alloc.color,
                              boxShadow: `0 0 8px ${alloc.color}80`,
                            }}
                          />
                          <span className="whitespace-nowrap text-xs text-slate-400 transition-colors group-hover:text-slate-200">
                            {alloc.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Subtle footer ticker */}
        <div className="mt-8 flex justify-center opacity-40 transition-opacity hover:opacity-100">
          <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-6 py-2 font-mono text-xs text-slate-400 backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> API STATUS: NOMINAL
            </span>
            <span className="text-white/20">|</span>
            <span>BLOCK: 254,091,882</span>
            <span className="text-white/20">|</span>
            <span>LATENCY: 12ms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
