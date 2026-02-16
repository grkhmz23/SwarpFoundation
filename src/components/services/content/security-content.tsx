"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, ShieldAlert, ShieldCheck, Terminal, Search, Bug, Lock, Unlock,
  Server, Globe, AlertTriangle, CheckCircle2, XCircle, Activity, Radar,
  FileSearch, Cpu, Eye, EyeOff, Zap, ChevronRight, AlertOctagon,
  Network, Fingerprint, Key, RefreshCw, Play, Pause, Download,
  Clock, Target, Radio, Wifi, WifiOff, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ServiceContentLayout,
  ServiceHeader,
  ServiceCard,
  ServiceTab,
  ServiceCTA,
} from "../service-content-layout";

// Types
interface Vulnerability {
  id: string;
  name: string;
  severity: "critical" | "high" | "medium" | "low";
  category: string;
  status: "open" | "scanning" | "fixed";
  cwe: string;
}

interface Threat {
  id: string;
  type: string;
  origin: string;
  timestamp: Date;
  blocked: boolean;
  severity: "high" | "medium" | "low";
}

// Live Threat Radar Component
function ThreatRadar() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      const newThreat: Threat = {
        id: Math.random().toString(36).substr(2, 9),
        type: ["SQL Injection", "XSS Attempt", "DDoS", "Brute Force", "Malware"][Math.floor(Math.random() * 5)],
        origin: ["192.168.x.x", "10.0.x.x", "172.16.x.x"][Math.floor(Math.random() * 3)],
        timestamp: new Date(),
        blocked: true,
        severity: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as any,
      };

      setThreats(prev => [newThreat, ...prev].slice(0, 8));
    }, 2500);

    return () => clearInterval(interval);
  }, [isScanning]);

  return (
    <div className="relative bg-[#0c0e12] rounded-xl border border-red-500/20 p-4 overflow-hidden h-full">
      {/* Animated Radar Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="w-48 h-48 rounded-full border border-red-500/30 border-dashed"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 rounded-full border border-cyan-500/30"
        />
        <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-pulse" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Radar className="w-5 h-5 text-red-400" />
          <h4 className="text-sm font-bold text-white">Live Threat Monitor</h4>
        </div>
        <button
          onClick={() => setIsScanning(!isScanning)}
          className={cn(
            "p-1.5 rounded-lg transition-colors",
            isScanning ? "bg-red-500/20 text-red-400" : "bg-gray-700 text-gray-400"
          )}
        >
          {isScanning ? <Radio className="w-4 h-4 animate-pulse" /> : <WifiOff className="w-4 h-4" />}
        </button>
      </div>

      {/* Stats */}
      <div className="relative z-10 grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Blocked", value: "1,284", color: "emerald" },
          { label: "Active", value: "3", color: "red" },
          { label: "Severity", value: "High", color: "orange" },
        ].map((stat) => (
          <div key={stat.label} className="bg-black/40 rounded-lg p-2 text-center border border-white/5">
            <div className={cn("text-lg font-bold", `text-${stat.color}-400`)}>{stat.value}</div>
            <div className="text-[9px] text-gray-500 uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Threat List */}
      <div className="relative z-10 space-y-2 max-h-[180px] overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {threats.map((threat) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-red-500/10"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className={cn(
                  "w-4 h-4",
                  threat.severity === "high" ? "text-red-400" : 
                  threat.severity === "medium" ? "text-orange-400" : "text-yellow-400"
                )} />
                <div>
                  <div className="text-[10px] font-medium text-gray-200">{threat.type}</div>
                  <div className="text-[8px] text-gray-500 font-mono">{threat.origin}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  BLOCKED
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {threats.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-xs">
            <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-emerald-500/50" />
            No active threats detected
          </div>
        )}
      </div>
    </div>
  );
}

// Vulnerability Scanner
function VulnScanner() {
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [vulns, setVulns] = useState<Vulnerability[]>([
    { id: "1", name: "SQL Injection", severity: "critical", category: "Injection", status: "open", cwe: "CWE-89" },
    { id: "2", name: "XSS Vulnerability", severity: "high", category: "XSS", status: "fixed", cwe: "CWE-79" },
    { id: "3", name: "Insecure Direct Object Ref", severity: "medium", category: "Access", status: "open", cwe: "CWE-639" },
    { id: "4", name: "Security Misconfiguration", severity: "medium", category: "Config", status: "scanning", cwe: "CWE-16" },
  ]);

  const startScan = () => {
    setScanning(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const getSeverityColor = (s: string) => {
    switch(s) {
      case "critical": return "text-red-400 bg-red-500/10 border-red-500/30";
      case "high": return "text-orange-400 bg-orange-500/10 border-orange-500/30";
      case "medium": return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30";
      default: return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
    }
  };

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-orange-500/20 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bug className="w-5 h-5 text-orange-400" />
          <h4 className="text-sm font-bold text-white">Vulnerability Scanner</h4>
        </div>
        <button
          onClick={startScan}
          disabled={scanning}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-medium hover:bg-orange-500/30 disabled:opacity-50 transition-colors"
        >
          {scanning ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
          {scanning ? "Scanning..." : "Start Scan"}
        </button>
      </div>

      {/* Progress */}
      {scanning && (
        <div className="mb-4">
          <div className="flex justify-between text-[10px] text-gray-400 mb-1">
            <span>Scanning target: https://api.target.com</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-red-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Vuln List */}
      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {vulns.map((vuln) => (
          <motion.div
            key={vuln.id}
            layout
            className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-orange-500/30 transition-colors group cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center border",
                  vuln.status === "fixed" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-orange-500/10 border-orange-500/30 text-orange-400"
                )}>
                  {vuln.status === "fixed" ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-200 group-hover:text-white transition-colors">
                    {vuln.name}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] text-gray-500 font-mono">{vuln.cwe}</span>
                    <span className="text-[9px] text-gray-600">•</span>
                    <span className="text-[9px] text-gray-500">{vuln.category}</span>
                  </div>
                </div>
              </div>
              <span className={cn("text-[9px] px-2 py-0.5 rounded border uppercase font-bold", getSeverityColor(vuln.severity))}>
                {vuln.severity}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-4 gap-2">
        {[
          { label: "Critical", value: "1", color: "red" },
          { label: "High", value: "1", color: "orange" },
          { label: "Medium", value: "2", color: "yellow" },
          { label: "Fixed", value: "1", color: "emerald" },
        ].map((item) => (
          <div key={item.label} className="text-center">
            <div className={cn("text-sm font-bold", `text-${item.color}-400`)}>{item.value}</div>
            <div className="text-[8px] text-gray-500 uppercase">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Penetration Testing Terminal
function PentestTerminal() {
  const [lines, setLines] = useState<string[]>([
    "[INFO] Initializing penetration test suite...",
    "[INFO] Target: swarp-foundation.com",
    "[INFO] Scope: OWASP Top 10 + API Security",
    "[OK]   Connection established via VPN tunnel",
  ]);
  const [currentCommand, setCurrentCommand] = useState(0);
  const commands = [
    { cmd: "nmap -sV -p- target.com", output: "Scanning 65535 ports... Discovered: 22/ssh, 80/http, 443/https, 3306/mysql" },
    { cmd: "sqlmap -u 'target.com/api?id=1'", output: "Parameter 'id' appears vulnerable to SQL injection (Boolean-based blind)" },
    { cmd: "nikto -h target.com", output: "Found: /admin/ panel exposed, Outdated jQuery v1.2, Missing X-Frame-Options header" },
    { cmd: "burp-scan --scope=api", output: "JWT signature not verified, CORS misconfiguration detected, Rate limiting bypass possible" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentCommand < commands.length) {
        const command = commands[currentCommand];
        setLines(prev => [...prev, `$ ${command.cmd}`, `[RESULT] ${command.output}`]);
        setCurrentCommand(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentCommand]);

  return (
    <div className="bg-[#09090b] rounded-xl border border-emerald-500/20 p-4 font-mono text-xs h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-400 font-bold">swarp-pentest</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-1.5 custom-scrollbar text-[11px]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "break-all",
              line.startsWith("[INFO]") && "text-blue-400",
              line.startsWith("[OK]") && "text-emerald-400",
              line.startsWith("[RESULT]") && "text-gray-300",
              line.startsWith("$") && "text-white mt-2"
            )}
          >
            {line}
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-emerald-400"
        >
          ▊
        </motion.div>
      </div>

      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-500">
        <span>Status: <span className="text-emerald-400">Active</span></span>
        <span>Tests: {currentCommand}/{commands.length}</span>
      </div>
    </div>
  );
}

// Security Score Card
function SecurityScore() {
  const [score, setScore] = useState(0);
  const targetScore = 87;

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prev => {
        if (prev >= targetScore) {
          clearInterval(interval);
          return targetScore;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const checks = [
    { name: "SSL/TLS Configuration", status: true },
    { name: "Content Security Policy", status: true },
    { name: "SQL Injection Protection", status: true },
    { name: "XSS Filtering", status: false },
    { name: "Rate Limiting", status: true },
    { name: "Authentication", status: true },
  ];

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-cyan-500/20 p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-bold text-white">Security Score</h4>
        </div>
        <div className="text-2xl font-bold text-cyan-400">{score}<span className="text-sm text-gray-500">/100</span></div>
      </div>

      {/* Circular Progress */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-800"
          />
          <motion.circle
            cx="48"
            cy="48"
            r="40"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={251.2}
            strokeDashoffset={251.2 - (251.2 * score) / 100}
            className="text-cyan-400"
            initial={{ strokeDashoffset: 251.2 }}
            animate={{ strokeDashoffset: 251.2 - (251.2 * score) / 100 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Activity className="w-8 h-8 text-cyan-400" />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {checks.map((check, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-gray-400">{check.name}</span>
            {check.status ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Component
export function SecurityContent() {
  const [activeTab, setActiveTab] = useState<"overview" | "pentest" | "compliance">("overview");

  const services = [
    { icon: Shield, title: "Penetration Testing", desc: "OWASP Top 10, API, Network" },
    { icon: Eye, title: "Vulnerability Assessment", desc: "Automated + Manual testing" },
    { icon: Lock, title: "Security Audit", desc: "Code review & Architecture" },
    { icon: FileSearch, title: "Compliance", desc: "GDPR, ISO 27001, SOC2" },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "pentest", label: "PenTest", icon: Terminal },
    { id: "compliance", label: "Compliance", icon: FileSearch },
  ];

  return (
    <ServiceContentLayout accentColor="cyan">
      <div className="h-full flex flex-col">
        {/* Header with Tabs */}
        <ServiceHeader
          icon={<ShieldAlert className="w-5 h-5" />}
          title="Security"
          subtitle="Audit & Pen-testing"
          accentColor="cyan"
        >
          {/* Tabs */}
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
            {tabs.map((tab) => (
              <ServiceTab
                key={tab.id}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                accentColor="cyan"
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </ServiceTab>
            ))}
          </div>
        </ServiceHeader>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Left Column */}
            <div className="space-y-4 overflow-y-auto custom-scrollbar">
              {activeTab === "overview" && (
                <>
                  <ThreatRadar />
                  <div className="grid grid-cols-2 gap-4">
                    <SecurityScore />
                    <ServiceCard accentColor="cyan">
                      <h4 className="text-sm font-bold text-white mb-3">OWASP Coverage</h4>
                      <div className="space-y-2">
                        {["Injection", "Broken Auth", "Sensitive Data", "XXE", "Access Control"].map((item, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span className="text-[10px] text-gray-400">{item}</span>
                          </div>
                        ))}
                      </div>
                    </ServiceCard>
                  </div>
                </>
              )}
              {activeTab === "pentest" && <PentestTerminal />}
              {activeTab === "compliance" && (
                <ServiceCard accentColor="cyan" className="text-center p-6">
                  <FileSearch className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <h4 className="text-lg font-bold text-white mb-2">Compliance Ready</h4>
                  <p className="text-sm text-gray-400 mb-4">We help you meet industry standards</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {["GDPR", "ISO 27001", "SOC 2", "HIPAA", "PCI DSS"].map((std) => (
                      <span key={std} className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs">
                        {std}
                      </span>
                    ))}
                  </div>
                </ServiceCard>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <VulnScanner />

              {/* Services Grid */}
              <ServiceCard accentColor="cyan" title="Our Services">
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service) => (
                    <motion.div
                      key={service.title}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-cyan-500/30 transition-colors cursor-pointer group"
                    >
                      <service.icon className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xs font-medium text-white">{service.title}</div>
                      <div className="text-[9px] text-gray-500">{service.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </ServiceCard>

              {/* CTA */}
              <ServiceCTA
                title="Request Security Audit"
                description="Get detailed report in 2-4 weeks"
                accentColor="cyan"
              />
            </div>
          </div>
        </div>
      </div>
    </ServiceContentLayout>
  );
}

export default SecurityContent;
