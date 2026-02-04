"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, Globe, Wrench, Bot, 
  Blocks, Shield, Cpu, Cloud, Users, Plug, Database, 
  TestTube, Palette
} from "lucide-react";
import { cn } from "@/lib/utils";
import { KeyboardLink } from "@/components/ui/keyboard-button";
import { IMacFrame } from "@/components/ui/imac-frame";
import { AetherBackground } from "@/components/ui/aether-background";
import { SiReact, SiTailwindcss, SiTypescript, SiRust, SiGo, SiPython } from "react-icons/si";

// Content components
import { SoftwareToolsContent } from "@/components/services/content/software-tools-content";
import { HardwareContent } from "@/components/services/content/hardware-content";
import { WebMobileContent } from "@/components/services/content/web-mobile-content";
import { BlockchainContent } from "@/components/services/content/blockchain-content";

interface Service {
  id: string;
  title: string;
  short: string;
  desc: string;
  proof: string[];
  timeline: string;
  hasContent: boolean;
  icon: React.ReactNode;
}

const SERVICES: Service[] = [
  {
    id: "web-mobile",
    title: "Web Platforms & Mobile Apps",
    short: "High-scale web & native apps.",
    desc: "Product-grade UI/UX with scalable backends. Store-ready mobile builds using React Native or Flutter.",
    proof: ["Production-ready", "99.9% Uptime", "Store Compliant"],
    timeline: "8-12 Weeks",
    hasContent: true,
    icon: <Globe className="w-4 h-4" />,
  },
  {
    id: "software-tools",
    title: "Software & Tools",
    short: "CLI, Desktop & DevTools.",
    desc: "Developer-first tooling, cross-platform desktop apps (Electron/Rust), and robust CLI utilities.",
    proof: ["Cross-platform", "Rust/Go Core", "Auto-update"],
    timeline: "6-10 Weeks",
    hasContent: true,
    icon: <Wrench className="w-4 h-4" />,
  },
  {
    id: "ai-systems",
    title: "AI & Chat Interfaces",
    short: "LLM integration & RAG.",
    desc: "Custom RAG pipelines, fine-tuned models, and conversational UI for Support, Sales, or Ops.",
    proof: ["Context-aware", "Secure Data", "Low Latency"],
    timeline: "4-8 Weeks",
    hasContent: false,
    icon: <Bot className="w-4 h-4" />,
  },
  {
    id: "blockchain",
    title: "Blockchain & Web3",
    short: "DeFi, NFTs & On-chain.",
    desc: "Secure smart contracts, dApps, and on-chain telemetry dashboards for DeFi and DAOs.",
    proof: ["Audited Code", "Gas Optimized", "Multi-chain"],
    timeline: "10-14 Weeks",
    hasContent: true,
    icon: <Blocks className="w-4 h-4" />,
  },
  {
    id: "security",
    title: "Security & Audit",
    short: "Pen-testing & Compliance.",
    desc: "Comprehensive security audits, vulnerability assessments, and automated monitoring setups.",
    proof: ["OWASP Top 10", "Whitehat", "Detailed Reports"],
    timeline: "2-4 Weeks",
    hasContent: false,
    icon: <Shield className="w-4 h-4" />,
  },
  {
    id: "hardware",
    title: "Hardware & Devices",
    short: "Custom builds on demand.",
    desc: "We design and prototype custom computing hardware, enclosures, and IoT devices.",
    proof: ["Industrial Design", "PCB Layout", "Prototyping"],
    timeline: "12-24 Weeks",
    hasContent: true,
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    short: "AWS/GCP & K8s Infra.",
    desc: "Scalable infrastructure as code. Kubernetes clusters, CI/CD pipelines, and cost optimization.",
    proof: ["Terraform", "Zero Downtime", "Auto-scaling"],
    timeline: "4-8 Weeks",
    hasContent: false,
    icon: <Cloud className="w-4 h-4" />,
  },
  {
    id: "retainer",
    title: "Product Engineering",
    short: "Dedicated dev teams.",
    desc: "Augment your workforce with a dedicated pod of engineers, PMs, and designers.",
    proof: ["Agile", "Full Transparency", "Senior Talent"],
    timeline: "Monthly Retainer",
    hasContent: false,
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "integrations",
    title: "Integrations & APIs",
    short: "Middleware & connectors.",
    desc: "Robust API development and third-party integrations (Stripe, Salesforce, Twilio).",
    proof: ["Idempotent", "Rate Limited", "Documented"],
    timeline: "3-6 Weeks",
    hasContent: false,
    icon: <Plug className="w-4 h-4" />,
  },
  {
    id: "data",
    title: "Data & Analytics",
    short: "Pipelines & BI.",
    desc: "Modern data stack implementation. ETL pipelines, warehouses (Snowflake/BigQuery), and dashboards.",
    proof: ["Real-time", "Governance", "Actionable"],
    timeline: "6-10 Weeks",
    hasContent: false,
    icon: <Database className="w-4 h-4" />,
  },
  {
    id: "qa",
    title: "QA & Reliability",
    short: "Testing automation.",
    desc: "End-to-end testing frameworks, load testing, and site reliability engineering (SRE).",
    proof: ["95% Coverage", "Auto-revert", "Chaos Testing"],
    timeline: "3-5 Weeks",
    hasContent: false,
    icon: <TestTube className="w-4 h-4" />,
  },
  {
    id: "design",
    title: "UI/UX & Design Systems",
    short: "Figma & tokens.",
    desc: "Complete design systems, component libraries, and accessible UI kits.",
    proof: ["Accessible (WCAG)", "Token-based", "Pixel Perfect"],
    timeline: "4-8 Weeks",
    hasContent: false,
    icon: <Palette className="w-4 h-4" />,
  },
];

// Custom scrollbar styles
const globalStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 255, 240, 0.15);
    border-radius: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 255, 240, 0.3);
  }
  @keyframes float-1 {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
    25% { transform: translateY(-20px) translateX(10px); opacity: 0.8; }
    50% { transform: translateY(-10px) translateX(-5px); opacity: 0.6; }
    75% { transform: translateY(-30px) translateX(-10px); opacity: 0.9; }
  }
  @keyframes float-2 {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
    33% { transform: translateY(-15px) translateX(-8px); opacity: 0.7; }
    66% { transform: translateY(-25px) translateX(5px); opacity: 0.8; }
  }
  @keyframes float-3 {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
    50% { transform: translateY(-18px) translateX(12px); opacity: 0.9; }
  }
`;

function TypingText() {
  const [text, setText] = useState("");
  const fullText = "// Select a service to preview...";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) {
        index = 0;
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-cyan-500/70 text-lg">
      {text}
      <span className="inline-block w-3 h-5 ml-1 bg-cyan-500 animate-pulse" />
    </div>
  );
}

function DefaultScreen() {
  return (
    <div className="min-h-[500px] bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
              <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 21h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        <TypingText />
        <p className="text-gray-600 text-sm mt-4">Click any service from the sidebar</p>
      </div>
    </div>
  );
}

function ComingSoonScreen({ service }: { service: Service }) {
  return (
    <div className="min-h-[500px] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
      <div className="text-center px-8">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <Clock className="w-10 h-10 text-cyan-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">{service.title}</h2>
        <p className="text-gray-400 mb-6 max-w-md">{service.desc}</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm text-cyan-400 font-medium">Coming Soon</span>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {service.proof.map((item, i) => (
            <div key={i} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <span className="text-xs text-gray-400">{item}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-xs mt-8">Timeline: {service.timeline}</p>
      </div>
    </div>
  );
}

// Glass Service Button
function GlassServiceButton({ 
  service, 
  isSelected, 
  onClick 
}: { 
  service: Service; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative w-full overflow-hidden rounded-xl transition-all duration-300",
        "backdrop-blur-md border",
        isSelected 
          ? "bg-gradient-to-b from-cyan-500/15 to-cyan-600/5 border-cyan-500/30 shadow-[0_0_20px_-5px_rgba(0,255,240,0.3)]" 
          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
      )}
    >
      {/* Glow effect on hover/selected */}
      <div className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-300",
        "bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10",
        isSelected ? "opacity-100" : "group-hover:opacity-50"
      )} />

      {/* Inner highlight */}
      <div className={cn(
        "absolute inset-x-0 top-0 h-px",
        "bg-gradient-to-r from-transparent via-white/20 to-transparent"
      )} />

      <div className="relative flex items-center gap-3 p-3">
        {/* Icon */}
        <div className={cn(
          "flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300",
          "backdrop-blur-sm border",
          isSelected 
            ? "bg-cyan-500/20 border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_-3px_rgba(0,255,240,0.4)]" 
            : "bg-white/5 border-white/10 text-gray-500 group-hover:text-gray-300 group-hover:border-white/20"
        )}>
          {service.icon}
        </div>

        {/* Text */}
        <div className="flex-1 text-left min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn(
              "text-sm font-medium truncate transition-colors",
              isSelected ? "text-white" : "text-gray-300 group-hover:text-white"
            )}>
              {service.title}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-gray-500 font-mono truncate">{service.short}</span>
            {service.hasContent && (
              <span className="flex-shrink-0 text-[8px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-semibold uppercase">
                Live
              </span>
            )}
          </div>
        </div>

        {/* Arrow indicator */}
        <div className={cn(
          "w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300",
          isSelected 
            ? "bg-cyan-500/20 text-cyan-400" 
            : "text-gray-600 opacity-0 group-hover:opacity-100"
        )}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </button>
  );
}

function ServiceContent({ service }: { service: Service }) {
  switch (service.id) {
    case "web-mobile":
      return <WebMobileContent />;
    case "software-tools":
      return <SoftwareToolsContent />;
    case "blockchain":
      return <BlockchainContent />;
    case "hardware":
      return <HardwareContent />;
    default:
      return <ComingSoonScreen service={service} />;
  }
}

// Floating Orb for Stack Section
function FloatingOrb({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn(
        "absolute h-2 w-2 rounded-full",
        "bg-gradient-to-r from-cyan-400 to-purple-400",
        "blur-[2px] opacity-60",
        className
      )}
      style={style}
    />
  );
}

// Icon Tile for Stack Section
function IconTile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "group relative h-20 w-20 md:h-24 md:w-24",
        "rounded-2xl overflow-hidden",
        "backdrop-blur-md border transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-xl",
        "bg-gradient-to-b from-white/[0.08] to-white/[0.02]",
        "border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_20px_50px_-20px_rgba(0,0,0,0.5)]",
        className
      )}
    >
      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// Stack Integrator Section
function StackIntegratorSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={cn(
        "group relative w-full max-w-[880px] mx-auto overflow-hidden mt-16",
        "rounded-3xl border backdrop-blur-xl",
        "border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_40px_100px_-30px_rgba(0,0,0,0.6)]"
      )}
    >
      {/* Background glows */}
      <div className="pointer-events-none absolute -top-28 -left-28 h-80 w-80 rounded-full blur-3xl bg-[radial-gradient(closest-side,rgba(0,255,240,0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-24 -right-28 h-96 w-96 rounded-full blur-3xl bg-[radial-gradient(closest-side,rgba(139,92,246,0.15),transparent_70%)]" />

      {/* Floating orbs on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <FloatingOrb className="top-1/4 left-1/4" style={{ animation: 'float-1 6s ease-in-out infinite' }} />
        <FloatingOrb className="top-1/3 right-1/3" style={{ animation: 'float-2 5s ease-in-out infinite 0.5s' }} />
        <FloatingOrb className="bottom-1/4 left-1/3" style={{ animation: 'float-3 7s ease-in-out infinite 1s' }} />
        <FloatingOrb className="bottom-1/3 right-1/4" style={{ animation: 'float-1 6s ease-in-out infinite 1.5s' }} />
      </div>

      <div className="relative p-10 md:p-14">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent">
          Fits right into your stack
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-400">
          Seamlessly connect with your existing infrastructure and favorite tools
        </p>

        {/* Diamond icon layout */}
        <div className="mx-auto mt-10 grid grid-cols-3 gap-6 md:gap-10 place-items-center max-w-[480px]">
          {/* Top Center - React */}
          <div />
          <IconTile>
            <SiReact className="h-8 w-8 text-cyan-400" />
          </IconTile>
          <div />

          {/* Middle Row - Tailwind, empty, Rust */}
          <IconTile>
            <SiTailwindcss className="h-8 w-8 text-cyan-400" />
          </IconTile>
          <div />
          <IconTile>
            <SiRust className="h-8 w-8 text-orange-400" />
          </IconTile>

          {/* Bottom Row - Go, TS, Python */}
          <IconTile>
            <SiGo className="h-8 w-8 text-cyan-300" />
          </IconTile>
          <IconTile>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 ring-1 ring-white/20">
              <SiTypescript className="h-5 w-5 text-blue-400" />
            </div>
          </IconTile>
          <IconTile>
            <SiPython className="h-8 w-8 text-yellow-400" />
          </IconTile>
        </div>

        {/* Bottom info chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {[
            { label: "Microservices Ready", icon: "⚡" },
            { label: "Type-safe APIs", icon: "🔒" },
            { label: "Rapid Prototyping", icon: "🚀" },
          ].map((chip) => (
            <div
              key={chip.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400"
            >
              <span>{chip.icon}</span>
              <span>{chip.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const service = SERVICES.find((s) => s.id === selectedService);

  return (
    <AetherBackground className="min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="pt-24 pb-12">
        <div className="relative z-10 max-w-[1600px] mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Service Catalog</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-3"
            >
              <span className="text-white">Services</span>{" "}
              <span className="text-gradient">Hub</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 max-w-xl mx-auto"
            >
              Explore our full range of development services. Select a service to preview it inside our interactive workspace.
            </motion.p>
          </div>

          {/* Main Layout */}
          <div className="grid lg:grid-cols-[320px_1fr] gap-6">
            {/* Glass Sidebar */}
            <motion.nav 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              {/* Glass Container */}
              <div className={cn(
                "relative rounded-2xl overflow-hidden",
                "backdrop-blur-xl border border-white/10",
                "bg-gradient-to-b from-white/[0.06] to-white/[0.02]",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_30px_60px_-20px_rgba(0,0,0,0.5)]"
              )}>
                {/* Gradient accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-purple-500 to-pink-500" />

                {/* Top highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* Content */}
                <div className="relative p-4">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 px-1">
                    <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Available Services</span>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 font-mono font-bold">
                      {SERVICES.length}
                    </span>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1 custom-scrollbar">
                    {SERVICES.map((s, i) => (
                      <motion.div
                        key={s.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.02 }}
                      >
                        <GlassServiceButton
                          service={s}
                          isSelected={selectedService === s.id}
                          onClick={() => setSelectedService(s.id)}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-4" />

                  {/* CTA Button */}
                  <KeyboardLink
                    href="/contact"
                    variant="primary"
                    size="lg"
                    fullWidth
                    icon={<Calendar className="w-4 h-4" />}
                  >
                    Book Consultation
                  </KeyboardLink>
                </div>
              </div>
            </motion.nav>

            {/* iMac Display */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start justify-center"
            >
              <IMacFrame
                title={service ? service.title : "Swarp Services"}
                onClose={() => setSelectedService(null)}
                className="w-full max-w-4xl"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedService || "default"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service ? <ServiceContent service={service} /> : <DefaultScreen />}
                  </motion.div>
                </AnimatePresence>
              </IMacFrame>
            </motion.div>
          </div>

          {/* Stack Integrator Section */}
          <StackIntegratorSection />
        </div>
      </div>
    </AetherBackground>
  );
}