"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { KeyboardLink } from "@/components/ui/keyboard-button";
import { IMacFrame } from "@/components/ui/imac-frame";
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
  deliverables: string[];
  process: string[];
  timeline: string;
  type: string;
  hasContent?: boolean;
}

const SERVICES: Service[] = [
  {
    id: "web-mobile",
    title: "Web Platforms & Mobile Apps",
    short: "High-scale web & native apps.",
    desc: "Product-grade UI/UX with scalable backends. Store-ready mobile builds using React Native or Flutter.",
    proof: ["Production-ready", "99.9% Uptime", "Store Compliant"],
    deliverables: ["Responsive Web App", "iOS & Android Builds", "Admin Dashboard", "Analytics Integration", "Payment Gateway"],
    process: ["Discovery", "UX Wireframes", "High-fi Design", "Sprint Dev", "QA & Launch"],
    timeline: "8-12 Weeks",
    type: "platform",
    hasContent: true,
  },
  {
    id: "software-tools",
    title: "Software & Tools",
    short: "CLI, Desktop & DevTools.",
    desc: "Developer-first tooling, cross-platform desktop apps (Electron/Rust), and robust CLI utilities.",
    proof: ["Cross-platform", "Rust/Go Core", "Auto-update"],
    deliverables: ["Binary Executables", "Install Scripts", "Documentation Site", "CI/CD Release Pipeline", "Signing Certs"],
    process: ["Arch Spec", "Core Logic", "Interface Layer", "Packaging", "Distribution"],
    timeline: "6-10 Weeks",
    type: "terminal",
    hasContent: true,
  },
  {
    id: "ai-systems",
    title: "AI & Chat Interfaces",
    short: "LLM integration & RAG.",
    desc: "Custom RAG pipelines, fine-tuned models, and conversational UI for Support, Sales, or Ops.",
    proof: ["Context-aware", "Secure Data", "Low Latency"],
    deliverables: ["Chat Widget", "Vector Database", "Prompt Engineering", "Guardrails System", "Usage Analytics"],
    process: ["Data Audit", "Model Select", "Vector Ingest", "App Integration", "Tuning"],
    timeline: "4-8 Weeks",
    type: "ai",
  },
  {
    id: "blockchain",
    title: "Blockchain & Web3",
    short: "DeFi, NFTs & On-chain.",
    desc: "Secure smart contracts, dApps, and on-chain telemetry dashboards for DeFi and DAOs.",
    proof: ["Audited Code", "Gas Optimized", "Multi-chain"],
    deliverables: ["Smart Contracts", "dApp Frontend", "Indexer API", "Wallet Connect", "Mainnet Deploy"],
    process: ["Tokenomics", "Contract Dev", "Testnet", "Security Audit", "Mainnet Launch"],
    timeline: "10-14 Weeks",
    type: "crypto",
    hasContent: true,
  },
  {
    id: "security",
    title: "Security & Audit",
    short: "Pen-testing & Compliance.",
    desc: "Comprehensive security audits, vulnerability assessments, and automated monitoring setups.",
    proof: ["OWASP Top 10", "Whitehat", "Detailed Reports"],
    deliverables: ["Audit Report", "Remediation Plan", "Static Analysis", "Dependency Scan", "Monitoring Alerts"],
    process: ["Reconnaissance", "Scanning", "Exploitation", "Reporting", "Re-test"],
    timeline: "2-4 Weeks",
    type: "audit",
  },
  {
    id: "hardware",
    title: "Hardware & Devices",
    short: "Custom builds on demand.",
    desc: "We design and prototype custom computing hardware, enclosures, and IoT devices.",
    proof: ["Industrial Design", "PCB Layout", "Prototyping"],
    deliverables: ["CAD Models", "BOM", "Functional Prototype", "Firmware", "Fabrication Docs"],
    process: ["Concept", "EVT", "DVT", "PVT", "Pilot Run"],
    timeline: "12-24 Weeks",
    type: "hardware",
    hasContent: true,
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    short: "AWS/GCP & K8s Infra.",
    desc: "Scalable infrastructure as code. Kubernetes clusters, CI/CD pipelines, and cost optimization.",
    proof: ["Terraform", "Zero Downtime", "Auto-scaling"],
    deliverables: ["IaC Scripts", "CI/CD Pipeline", "K8s Cluster", "Monitoring Stack", "Disaster Recovery"],
    process: ["Audit", "Architecture", "Migration", "Automation", "Handoff"],
    timeline: "4-8 Weeks",
    type: "cloud",
  },
  {
    id: "retainer",
    title: "Product Engineering",
    short: "Dedicated dev teams.",
    desc: "Augment your workforce with a dedicated pod of engineers, PMs, and designers.",
    proof: ["Agile", "Full Transparency", "Senior Talent"],
    deliverables: ["Dedicated Pod", "Weekly Sprints", "Roadmap Execution", "Daily Standups", "Jira/Linear Mgmt"],
    process: ["Onboarding", "Backlog Groom", "Sprint 1", "Review", "Iterate"],
    timeline: "Monthly Retainer",
    type: "team",
  },
  {
    id: "integrations",
    title: "Integrations & APIs",
    short: "Middleware & connectors.",
    desc: "Robust API development and third-party integrations (Stripe, Salesforce, Twilio).",
    proof: ["Idempotent", "Rate Limited", "Documented"],
    deliverables: ["REST/GraphQL API", "Webhooks", "SDK Generation", "Postman Collection", "Test Suite"],
    process: ["Spec (OpenAPI)", "Mock Server", "Implementation", "Load Test", "Docs"],
    timeline: "3-6 Weeks",
    type: "api",
  },
  {
    id: "data",
    title: "Data & Analytics",
    short: "Pipelines & BI.",
    desc: "Modern data stack implementation. ETL pipelines, warehouses (Snowflake/BigQuery), and dashboards.",
    proof: ["Real-time", "Governance", "Actionable"],
    deliverables: ["Tracking Plan", "ETL Pipeline", "Data Warehouse", "BI Dashboards", "Data Dictionary"],
    process: ["Mapping", "Instrumentation", "Pipeline Build", "Visualization", "Training"],
    timeline: "6-10 Weeks",
    type: "data",
  },
  {
    id: "qa",
    title: "QA & Reliability",
    short: "Testing automation.",
    desc: "End-to-end testing frameworks, load testing, and site reliability engineering (SRE).",
    proof: ["95% Coverage", "Auto-revert", "Chaos Testing"],
    deliverables: ["E2E Suite", "Load Test Report", "Incident Runbooks", "SLO/SLA Definition", "On-call Setup"],
    process: ["Strategy", "Scripting", "CI Integration", "Stress Test", "Monitoring"],
    timeline: "3-5 Weeks",
    type: "qa",
  },
  {
    id: "design",
    title: "UI/UX & Design Systems",
    short: "Figma & tokens.",
    desc: "Complete design systems, component libraries, and accessible UI kits.",
    proof: ["Accessible (WCAG)", "Token-based", "Pixel Perfect"],
    deliverables: ["Figma Files", "Design Tokens", "Component Library", "Storybook", "Brand Guidelines"],
    process: ["Audit", "Visual Language", "Component Build", "Documentation", "Handoff"],
    timeline: "4-8 Weeks",
    type: "design",
  },
];

// Typing animation for default screen
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

// Default screen content
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

// Coming Soon screen for services without custom content
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

        <p className="text-gray-600 text-xs mt-8">
          Timeline: {service.timeline}
        </p>
      </div>
    </div>
  );
}

// 3D Keyboard-style Service Button
function ServiceButton({ 
  service, 
  isSelected, 
  onClick 
}: { 
  service: Service; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      className={cn(
        "group relative w-full select-none rounded-lg transition-all duration-75 ease-out",
        isPressed ? "translate-y-0.5" : "translate-y-0",
      )}
    >
      {/* Shadow/depth layer */}
      <span
        className={cn(
          "absolute inset-0 rounded-lg transition-all duration-75",
          isSelected ? "bg-cyan-700" : "bg-gray-800",
          isPressed ? "translate-y-0" : "translate-y-1",
        )}
      />

      {/* Main button surface */}
      <span
        className={cn(
          "relative flex flex-col items-start rounded-lg border p-3 transition-all duration-75",
          isSelected 
            ? "border-cyan-400/50 bg-gradient-to-b from-cyan-500/20 to-cyan-600/10" 
            : "border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900 hover:border-gray-600",
        )}
      >
        {/* Shine effect */}
        <span
          className={cn(
            "absolute inset-x-2 top-1 h-px rounded-full bg-gradient-to-r from-transparent to-transparent transition-opacity duration-75",
            isSelected ? "via-cyan-400/30" : "via-white/10",
            isPressed ? "opacity-0" : "opacity-100",
          )}
        />

        {/* Content */}
        <div className="relative z-10 w-full text-left">
          <div className="flex items-center justify-between mb-1">
            <span className={cn(
              "text-sm font-bold tracking-wide transition-colors",
              isSelected ? "text-cyan-400" : "text-gray-200 group-hover:text-white"
            )}>
              {service.title}
            </span>
            <ChevronRight className={cn(
              "w-4 h-4 transition-all",
              isSelected ? "text-cyan-400 translate-x-0" : "text-gray-600 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
            )} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-gray-500 font-mono">{service.short}</span>
            {service.hasContent && (
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 font-semibold uppercase">
                Live
              </span>
            )}
          </div>
        </div>
      </span>
    </button>
  );
}

// Get content component for a service
function ServiceContent({ service }: { service: Service }) {
  switch (service.id) {
    case "software-tools":
      return <SoftwareToolsContent />;
    case "web-mobile":
      return <WebMobileContent />;
    case "blockchain":
      return <BlockchainContent />;
    case "hardware":
      return <HardwareContent />;
    default:
      return <ComingSoonScreen service={service} />;
  }
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const service = SERVICES.find((s) => s.id === selectedService);

  return (
    <div className="min-h-screen bg-swarp-darker pt-24 pb-12">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,240,0.15) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="fixed top-20 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

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
          {/* Sidebar */}
          <motion.nav 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {/* Service count badge */}
            <div className="flex items-center justify-between px-1 mb-2">
              <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Available Services</span>
              <span className="text-[10px] px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold">
                {SERVICES.length}
              </span>
            </div>

            {/* Service buttons */}
            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
              {SERVICES.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.03 }}
                >
                  <ServiceButton
                    service={s}
                    isSelected={selectedService === s.id}
                    onClick={() => setSelectedService(s.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-cyan-500/20">
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

        {/* Bottom info */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { label: "Architecture", title: "Microservices & Monoliths", desc: "Built for scale from day one" },
            { label: "Stack", title: "Modern & Type-safe", desc: "TypeScript, Rust, Go, Python" },
            { label: "Speed", title: "Rapid Prototyping", desc: "MVP in weeks, not months" },
          ].map((item, i) => (
            <motion.div 
              key={item.label} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="group relative"
            >
              {/* Shadow */}
              <div className="absolute inset-0 rounded-xl bg-gray-800 translate-y-1" />
              {/* Surface */}
              <div className="relative text-center p-4 rounded-xl bg-gradient-to-b from-gray-800/80 to-gray-900/80 border border-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                <span className="text-[10px] uppercase tracking-wider text-gray-500">{item.label}</span>
                <h4 className="text-sm font-semibold text-white mt-1">{item.title}</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}