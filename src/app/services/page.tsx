"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, Globe, Wrench, Bot, 
  Blocks, Shield, Cpu, Cloud, Users, Plug, Database, 
  TestTube, Palette, ArrowRight, Sparkles, CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { KeyboardLink } from "@/components/ui/keyboard-button";
import { AetherBackground } from "@/components/ui/aether-background";

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
  color: string;
}

const SERVICES: Service[] = [
  {
    id: "web-mobile",
    title: "Web & Mobile",
    short: "High-scale applications",
    desc: "Product-grade UI/UX with scalable backends. Store-ready mobile builds using React Native or Flutter.",
    proof: ["Production-ready", "99.9% Uptime", "Store Compliant"],
    timeline: "8-12 Weeks",
    hasContent: true,
    icon: <Globe className="w-5 h-5" />,
    color: "cyan"
  },
  {
    id: "software-tools",
    title: "Software Tools",
    short: "CLI & Desktop Apps",
    desc: "Developer-first tooling, cross-platform desktop apps (Electron/Rust), and robust CLI utilities.",
    proof: ["Cross-platform", "Rust/Go Core", "Auto-update"],
    timeline: "6-10 Weeks",
    hasContent: true,
    icon: <Wrench className="w-5 h-5" />,
    color: "purple"
  },
  {
    id: "ai-systems",
    title: "AI Systems",
    short: "LLM & Chat Interfaces",
    desc: "Custom RAG pipelines, fine-tuned models, and conversational UI for Support, Sales, or Ops.",
    proof: ["Context-aware", "Secure Data", "Low Latency"],
    timeline: "4-8 Weeks",
    hasContent: false,
    icon: <Bot className="w-5 h-5" />,
    color: "emerald"
  },
  {
    id: "blockchain",
    title: "Blockchain",
    short: "DeFi & Smart Contracts",
    desc: "Secure smart contracts, dApps, and on-chain telemetry dashboards for DeFi and DAOs.",
    proof: ["Audited Code", "Gas Optimized", "Multi-chain"],
    timeline: "10-14 Weeks",
    hasContent: true,
    icon: <Blocks className="w-5 h-5" />,
    color: "amber"
  },
  {
    id: "security",
    title: "Security",
    short: "Audit & Pen-testing",
    desc: "Comprehensive security audits, vulnerability assessments, and automated monitoring setups.",
    proof: ["OWASP Top 10", "Whitehat", "Detailed Reports"],
    timeline: "2-4 Weeks",
    hasContent: false,
    icon: <Shield className="w-5 h-5" />,
    color: "rose"
  },
  {
    id: "hardware",
    title: "Hardware",
    short: "Devices & IoT",
    desc: "We design and prototype custom computing hardware, enclosures, and IoT devices.",
    proof: ["Industrial Design", "PCB Layout", "Prototyping"],
    timeline: "12-24 Weeks",
    hasContent: true,
    icon: <Cpu className="w-5 h-5" />,
    color: "orange"
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    short: "AWS/GCP & K8s",
    desc: "Scalable infrastructure as code. Kubernetes clusters, CI/CD pipelines, and cost optimization.",
    proof: ["Terraform", "Zero Downtime", "Auto-scaling"],
    timeline: "4-8 Weeks",
    hasContent: false,
    icon: <Cloud className="w-5 h-5" />,
    color: "sky"
  },
  {
    id: "retainer",
    title: "Engineering",
    short: "Dedicated Teams",
    desc: "Augment your workforce with a dedicated pod of engineers, PMs, and designers.",
    proof: ["Agile", "Full Transparency", "Senior Talent"],
    timeline: "Monthly Retainer",
    hasContent: false,
    icon: <Users className="w-5 h-5" />,
    color: "indigo"
  },
  {
    id: "integrations",
    title: "Integrations",
    short: "APIs & Middleware",
    desc: "Robust API development and third-party integrations (Stripe, Salesforce, Twilio).",
    proof: ["Idempotent", "Rate Limited", "Documented"],
    timeline: "3-6 Weeks",
    hasContent: false,
    icon: <Plug className="w-5 h-5" />,
    color: "teal"
  },
  {
    id: "data",
    title: "Data & Analytics",
    short: "Pipelines & BI",
    desc: "Modern data stack implementation. ETL pipelines, warehouses (Snowflake/BigQuery), and dashboards.",
    proof: ["Real-time", "Governance", "Actionable"],
    timeline: "6-10 Weeks",
    hasContent: false,
    icon: <Database className="w-5 h-5" />,
    color: "violet"
  },
  {
    id: "qa",
    title: "QA & Testing",
    short: "Automation & SRE",
    desc: "End-to-end testing frameworks, load testing, and site reliability engineering (SRE).",
    proof: ["95% Coverage", "Auto-revert", "Chaos Testing"],
    timeline: "3-5 Weeks",
    hasContent: false,
    icon: <TestTube className="w-5 h-5" />,
    color: "pink"
  },
  {
    id: "design",
    title: "UI/UX Design",
    short: "Systems & Prototyping",
    desc: "Complete design systems, component libraries, and accessible UI kits.",
    proof: ["Accessible (WCAG)", "Token-based", "Pixel Perfect"],
    timeline: "4-8 Weeks",
    hasContent: false,
    icon: <Palette className="w-5 h-5" />,
    color: "fuchsia"
  },
];

const colorMap: Record<string, { bg: string; border: string; glow: string; text: string }> = {
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "shadow-cyan-500/20", text: "text-cyan-400" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", glow: "shadow-purple-500/20", text: "text-purple-400" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", glow: "shadow-emerald-500/20", text: "text-emerald-400" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "shadow-amber-500/20", text: "text-amber-400" },
  rose: { bg: "bg-rose-500/10", border: "border-rose-500/30", glow: "shadow-rose-500/20", text: "text-rose-400" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/30", glow: "shadow-orange-500/20", text: "text-orange-400" },
  sky: { bg: "bg-sky-500/10", border: "border-sky-500/30", glow: "shadow-sky-500/20", text: "text-sky-400" },
  indigo: { bg: "bg-indigo-500/10", border: "border-indigo-500/30", glow: "shadow-indigo-500/20", text: "text-indigo-400" },
  teal: { bg: "bg-teal-500/10", border: "border-teal-500/30", glow: "shadow-teal-500/20", text: "text-teal-400" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/30", glow: "shadow-violet-500/20", text: "text-violet-400" },
  pink: { bg: "bg-pink-500/10", border: "border-pink-500/30", glow: "shadow-pink-500/20", text: "text-pink-400" },
  fuchsia: { bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30", glow: "shadow-fuchsia-500/20", text: "text-fuchsia-400" },
};

function ServiceCard({ 
  service, 
  isSelected, 
  onClick 
}: { 
  service: Service; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  const colors = colorMap[service.color] || colorMap.cyan;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative w-full p-4 rounded-xl transition-all duration-300",
        "backdrop-blur-md border text-left",
        isSelected 
          ? cn(colors.bg, colors.border, "shadow-lg", colors.glow) 
          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
      )}
    >
      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
        "bg-gradient-to-r from-white/5 to-transparent",
        isSelected ? "opacity-100" : "group-hover:opacity-100"
      )} />

      <div className="relative flex items-start gap-3">
        {/* Icon */}
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg shrink-0",
          "backdrop-blur-sm border transition-all duration-300",
          isSelected 
            ? cn(colors.bg, colors.border, colors.text) 
            : "bg-white/5 border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/20"
        )}>
          {service.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn(
              "font-semibold truncate transition-colors",
              isSelected ? "text-white" : "text-gray-200 group-hover:text-white"
            )}>
              {service.title}
            </span>
            {service.hasContent && (
              <Sparkles className={cn("w-3 h-3", colors.text)} />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{service.short}</p>
        </div>

        {/* Arrow */}
        <ArrowRight className={cn(
          "w-4 h-4 shrink-0 transition-all duration-300",
          isSelected ? cn(colors.text, "translate-x-0 opacity-100") : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
        )} />
      </div>
    </motion.button>
  );
}

function ComingSoonPreview({ service }: { service: Service }) {
  const colors = colorMap[service.color] || colorMap.cyan;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          "w-24 h-24 rounded-2xl flex items-center justify-center mb-6",
          "border-2 border-dashed",
          colors.bg, colors.border
        )}
      >
        <Clock className={cn("w-10 h-10", colors.text)} />
      </motion.div>

      <motion.h3 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-white mb-3"
      >
        {service.title}
      </motion.h3>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 max-w-md mb-8"
      >
        {service.desc}
      </motion.p>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full border",
          colors.bg, colors.border
        )}
      >
        <span className={cn("w-2 h-2 rounded-full animate-pulse", colors.text.replace('text-', 'bg-'))} />
        <span className={cn("text-sm font-medium", colors.text)}>Coming Soon</span>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        {service.proof.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs text-gray-400">{item}</span>
          </div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-xs text-gray-600"
      >
        Expected timeline: <span className="text-gray-400">{service.timeline}</span>
      </motion.div>
    </div>
  );
}

function ServicePreview({ service }: { service: Service | null }) {
  if (!service) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-6"
        >
          <Sparkles className="w-12 h-12 text-cyan-400" />
        </motion.div>

        <motion.h3 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Explore Our Services
        </motion.h3>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-sm"
        >
          Select any service from the grid to view details, features, and delivery timelines.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center gap-2 text-sm text-gray-500"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>{SERVICES.filter(s => s.hasContent).length} interactive previews available</span>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full overflow-auto"
      >
        {service.hasContent ? (
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{service.title}</h2>
                <p className="text-gray-400">{service.desc}</p>
              </div>
              <div className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border",
                colorMap[service.color].bg,
                colorMap[service.color].border,
                colorMap[service.color].text
              )}>
                {service.timeline}
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
              {service.id === "web-mobile" && <WebMobileContent />}
              {service.id === "software-tools" && <SoftwareToolsContent />}
              {service.id === "blockchain" && <BlockchainContent />}
              {service.id === "hardware" && <HardwareContent />}
            </div>
          </div>
        ) : (
          <ComingSoonPreview service={service} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <AetherBackground className="min-h-screen">
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">What We Do</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                Engineering
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                {" "}Excellence
              </span>
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Full-stack software development from concept to production. 
              Select a service to explore our capabilities.
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Services Grid - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start"
            >
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <ServiceCard
                    service={service}
                    isSelected={selectedService?.id === service.id}
                    onClick={() => setSelectedService(service)}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Preview Panel - Right Side */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={cn(
                "relative min-h-[600px] rounded-3xl overflow-hidden",
                "backdrop-blur-xl border border-white/10",
                "bg-gradient-to-b from-white/[0.08] to-white/[0.02]",
                "shadow-[0_0_60px_-20px_rgba(0,255,240,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]"
              )}
            >
              {/* Top glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg" />

              {/* Content */}
              <div className="relative h-full">
                <ServicePreview service={selectedService} />
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-4">Ready to start your project?</p>
            <KeyboardLink
              href="/contact"
              variant="primary"
              size="lg"
              icon={<Calendar className="w-4 h-4" />}
            >
              Book a Consultation
            </KeyboardLink>
          </motion.div>
        </div>
      </div>
    </AetherBackground>
  );
}