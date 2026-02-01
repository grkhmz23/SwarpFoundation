"use client";

import { useState, useEffect } from "react";
import { PlatformPreview, TerminalPreview, AIPreview, CryptoPreview, DefaultPreview } from "@/components/services/service-previews";
const SERVICES = [
  {
    id: "web-mobile",
    title: "Web Platforms & Mobile Apps",
    short: "High-scale web & native apps.",
    desc: "Product-grade UI/UX with scalable backends. Store-ready mobile builds using React Native or Flutter.",
    proof: ["Production-ready", "99.9% Uptime", "Store Compliant"],
    deliverables: ["Responsive Web App", "iOS & Android Builds", "Admin Dashboard", "Analytics Integration", "Payment Gateway"],
    process: ["Discovery", "UX Wireframes", "High-fi Design", "Sprint Dev", "QA & Launch"],
    timeline: "8-12 Weeks",
    type: "platform"
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
    type: "terminal"
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
    type: "ai"
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
    type: "crypto"
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
    type: "audit"
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
    type: "hardware"
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
    type: "cloud"
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
    type: "team"
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
    type: "api"
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
    type: "data"
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
    type: "qa"
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
    type: "design"
  }
];

function TypingText() {
  const [text, setText] = useState("");
  const fullText = "// Select a service to initialize preview...";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-mono text-gray-500 text-lg">
      {text}<span className="inline-block w-2 h-5 bg-swarp-cyan ml-1 animate-pulse"></span>
    </div>
  );
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const service = selectedService ? SERVICES.find(s => s.id === selectedService) : null;

  return (
    <div className="min-h-screen bg-swarp-darker pt-24" style={{ backgroundImage: "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
      {!service ? (
        <div className="grid lg:grid-cols-[280px_1fr] gap-6 p-6">
          <nav className="bg-swarp-dark/90 backdrop-blur-sm border border-swarp-cyan/20 rounded-lg p-4 h-fit">
            <ul className="space-y-1">
              {SERVICES.map(s => (
                <li key={s.id} onClick={() => setSelectedService(s.id)} className="px-4 py-3 cursor-pointer border-l-2 border-transparent hover:border-swarp-cyan hover:bg-swarp-cyan/10 transition-all text-sm text-gray-400 hover:text-white">{s.title}</li>
              ))}
            </ul>
            <button className="w-full mt-6 pt-6 border-t border-swarp-cyan/20 px-6 py-3 bg-swarp-darker border-2 border-swarp-cyan text-white rounded-lg font-semibold shadow-[0_0_20px_rgba(0,255,240,0.3)] hover:shadow-[0_0_30px_rgba(0,255,240,0.5)] transition-all text-center">Book Consultation</button>
          </nav>

          <main className="bg-swarp-dark/90 backdrop-blur-sm border border-swarp-cyan/20 rounded-lg p-8 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-swarp-cyan">Services Hub</h2>
              <span className="px-3 py-1 rounded-full border border-swarp-cyan/30 text-xs font-mono text-gray-400">v2.4.0 Live</span>
            </div>

            <div className="relative flex-1 min-h-[500px]">
              <div className="absolute -inset-2 bg-gradient-to-r from-swarp-cyan via-swarp-blue to-swarp-purple rounded-3xl blur-xl opacity-30 animate-pulse"></div>

              <div className="relative rounded-2xl border-4 border-swarp-cyan/50 bg-swarp-darker/90 backdrop-blur-sm shadow-2xl shadow-swarp-cyan/20 overflow-hidden h-full">
                <div className="bg-gradient-to-r from-swarp-dark to-swarp-darker border-b border-swarp-cyan/30 px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">services-hub.ts</div>
                  <div className="text-xs text-swarp-cyan">●</div>
                </div>

                <div className="p-12 h-[400px] overflow-hidden font-mono text-sm relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-swarp-cyan/5 to-transparent animate-scan"></div>
                  <div className="relative z-10 text-center">
                    <TypingText />
                  </div>
                </div>

                <div className="bg-swarp-dark/80 border-t border-swarp-cyan/20 px-4 py-2 flex items-center justify-between text-xs">
                  <span className="text-gray-500">12 Services Available</span>
                  <span className="text-swarp-cyan">Ready</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-swarp-cyan/20">
              <div>
                <span className="text-xs uppercase tracking-wide text-gray-500 block mb-2">Architecture</span>
                <h4 className="text-sm font-semibold mb-1">Microservices & Monoliths</h4>
                <p className="text-xs text-gray-400">We build for scale from day one.</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wide text-gray-500 block mb-2">Stack</span>
                <h4 className="text-sm font-semibold mb-1">Modern & Type-safe</h4>
                <p className="text-xs text-gray-400">TypeScript, Rust, Go, Python.</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wide text-gray-500 block mb-2">Speed</span>
                <h4 className="text-sm font-semibold mb-1">Rapid Prototyping</h4>
                <p className="text-xs text-gray-400">MVP in weeks, not months.</p>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[350px_1fr]">
          <aside className="bg-swarp-dark border-r border-swarp-cyan/20 p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-6rem)]">
            <button onClick={() => setSelectedService(null)} className="px-4 py-2 text-sm border border-swarp-cyan/30 rounded hover:bg-swarp-cyan/10 transition-all">← Back to Hub</button>
            <div>
              <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
              <p className="text-gray-400">{service.desc}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {service.proof.map((p, i) => <span key={i} className="px-3 py-1 rounded-full bg-swarp-cyan/10 border border-swarp-cyan/30 text-xs text-swarp-cyan font-semibold">{p}</span>)}
            </div>
            <hr className="border-swarp-cyan/20" />
            <div>
              <span className="text-xs uppercase tracking-wide text-swarp-purple block mb-2">What You Get</span>
              <ul className="font-mono text-sm text-gray-400 space-y-1 list-disc list-inside">
                {service.deliverables.map((d, i) => <li key={i}>{d}</li>)}
              </ul>
            </div>
            <div>
              <span className="text-xs uppercase tracking-wide text-green-400 block mb-2">Process</span>
              <div className="space-y-2">
                {service.process.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-500">
                    <div className="w-5 h-5 rounded-full border border-swarp-cyan/40 flex items-center justify-center text-xs">{i+1}</div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-6 space-y-4">
              <div>
                <span className="text-xs uppercase tracking-wide text-gray-500 block mb-1">Est. Timeline</span>
                <h3 className="text-xl font-mono font-bold">{service.timeline}</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-3 bg-swarp-darker border-2 border-swarp-cyan text-white rounded-lg font-semibold shadow-[0_0_20px_rgba(0,255,240,0.3)] hover:shadow-[0_0_30px_rgba(0,255,240,0.5)] text-sm">Request Proposal</button>
                <a href="mailto:info@swarppay.com" className="px-4 py-3 border border-swarp-cyan/30 rounded-lg text-center hover:bg-swarp-cyan/10 transition-all text-sm">Email Us</a>
              </div>
            </div>
          </aside>

          <main className="p-8 space-y-8 overflow-y-auto max-h-[calc(100vh-6rem)]">
            <div className="bg-black border-2 border-swarp-cyan/30 rounded-lg overflow-hidden min-h-[500px] shadow-[0_0_40px_rgba(0,255,240,0.2)]">
              <div className="h-10 bg-swarp-dark/80 border-b border-swarp-cyan/20 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-auto font-mono text-xs text-gray-500">Interactive Demo: {service.type.toUpperCase()}</span>
              </div>
              <div className="h-[450px]">
                {service.type === 'platform' && <PlatformPreview />}
                {service.type === 'terminal' && <TerminalPreview />}
                {service.type === 'ai' && <AIPreview />}
                {service.type === 'crypto' && <CryptoPreview />}
                {!['platform', 'terminal', 'ai', 'crypto'].includes(service.type) && <DefaultPreview type={service.type} />}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-swarp-dark/90 border border-swarp-cyan/20 rounded-lg p-4">
                <span className="text-xs uppercase tracking-wide text-gray-500 block mb-3">Technology</span>
                <div className="flex gap-2 flex-wrap">
                  {["React", "Node.js", "Python", "AWS"].map(t => <span key={t} className="px-3 py-1 rounded-full border border-swarp-cyan/20 text-xs font-mono text-gray-400">{t}</span>)}
                </div>
              </div>
              <div className="bg-swarp-dark/90 border border-swarp-cyan/20 rounded-lg p-4">
                <span className="text-xs uppercase tracking-wide text-gray-500 block mb-3">Engagement Mode</span>
                <div className="font-mono text-sm">Fixed Scope <span className="text-gray-500">or</span> Monthly Retainer</div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}