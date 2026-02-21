"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useIntervalWhenVisible } from "@/components/services/service-content-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bug, CheckCircle2, XCircle, AlertCircle, Play, Pause, RefreshCw,
  ChevronRight, Terminal, Activity, Gauge, Shield, Zap, Layers,
  Clock, TrendingUp, AlertTriangle, Check, X, MoreHorizontal,
  Search, Filter, Download, Share2, Settings, Eye, EyeOff,
  FileCode, GitBranch, Cpu, Server, Wifi, Radio, Circle
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
interface TestSuite {
  id: string;
  name: string;
  tests: number;
  passed: number;
  failed: number;
  skipped: number;
  duration: number;
  status: "running" | "passed" | "failed" | "idle";
}

interface Bug {
  id: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  status: "open" | "in-progress" | "resolved";
  assignee: string;
  created: string;
}

// Test Runner Dashboard
function TestRunner({ passedLabel, coverageLabel }: { passedLabel: string; coverageLabel: string }) {
  const [suites, setSuites] = useState<TestSuite[]>([
    { id: "1", name: "Unit Tests", tests: 156, passed: 148, failed: 2, skipped: 6, duration: 45, status: "passed" },
    { id: "2", name: "Integration Tests", tests: 89, passed: 85, failed: 4, skipped: 0, duration: 120, status: "failed" },
    { id: "3", name: "E2E Tests", tests: 34, passed: 0, failed: 0, skipped: 0, duration: 0, status: "idle" },
    { id: "4", name: "Performance Tests", tests: 12, passed: 12, failed: 0, skipped: 0, duration: 300, status: "passed" },
  ]);

  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "> npm test",
    "> jest --coverage",
    "PASS src/components/Button.test.tsx",
    "PASS src/utils/helpers.test.tsx",
    "FAIL src/api/auth.test.tsx",
    "  ● should validate JWT token",
    "    Expected: \"valid\"",
    "    Received: \"expired\"",
  ]);

  const runTests = () => {
    setIsRunning(true);
    setSuites(prev => prev.map(s => s.status === "idle" ? { ...s, status: "running" } : s));

    // Simulate test execution
    setTimeout(() => {
      setSuites(prev => prev.map((s, i) => i === 2 ? { 
        ...s, 
        status: "passed", 
        passed: 34, 
        duration: 180 
      } : s));
      setIsRunning(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "passed": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "failed": return "text-red-400 bg-red-500/10 border-red-500/30";
      case "running": return "text-amber-400 bg-amber-500/10 border-amber-500/30 animate-pulse";
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/30";
    }
  };

  const totalTests = suites.reduce((acc, s) => acc + s.tests, 0);
  const totalPassed = suites.reduce((acc, s) => acc + s.passed, 0);
  const coverage = 87;

  return (
    <div className="bg-swarp-dark/80 rounded-xl border border-swarp-blue/20 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileCode className="w-5 h-5 text-swarp-blue" />
          <h4 className="text-sm font-bold text-white">Test Automation</h4>
        </div>
        <button
          onClick={runTests}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-swarp-blue/10 border border-swarp-blue/30 text-swarp-blue text-xs font-medium hover:bg-swarp-blue/20 disabled:opacity-50 transition-colors"
        >
          {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
          {isRunning ? "Running..." : "Run All"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="p-2 rounded-lg bg-black/40 text-center">
          <div className="text-lg font-bold text-white">{totalTests}</div>
          <div className="text-[9px] text-gray-500">Total Tests</div>
        </div>
        <div className="p-2 rounded-lg bg-black/40 text-center">
          <div className="text-lg font-bold text-emerald-400">{totalPassed}</div>
          <div className="text-[9px] text-gray-500">{passedLabel}</div>
        </div>
        <div className="p-2 rounded-lg bg-black/40 text-center">
          <div className="text-lg font-bold text-swarp-blue">{coverage}%</div>
          <div className="text-[9px] text-gray-500">{coverageLabel}</div>
        </div>
      </div>

      {/* Test Suites */}
      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar mb-3">
        {suites.map((suite) => (
          <motion.div
            key={suite.id}
            layout
            className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-swarp-blue/30 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {suite.status === "passed" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> :
                 suite.status === "failed" ? <XCircle className="w-4 h-4 text-red-400" /> :
                 suite.status === "running" ? <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" /> :
                 <Circle className="w-4 h-4 text-gray-600" />}
                <span className="text-xs font-medium text-white">{suite.name}</span>
              </div>
              <span className={cn("text-[9px] px-2 py-0.5 rounded border", getStatusColor(suite.status))}>
                {suite.status}
              </span>
            </div>

            <div className="flex items-center gap-4 text-[10px] text-gray-400">
              <span className="text-emerald-400">{suite.passed} passed</span>
              <span className="text-red-400">{suite.failed} failed</span>
              {suite.skipped > 0 && <span className="text-amber-400">{suite.skipped} skipped</span>}
              <span className="ml-auto">{suite.duration}s</span>
            </div>

            {/* Progress Bar */}
            <div className="mt-2 h-1.5 bg-gray-800 rounded-full overflow-hidden flex">
              <div 
                className="h-full bg-emerald-500" 
                style={{ width: `${(suite.passed / suite.tests) * 100}%` }} 
              />
              <div 
                className="h-full bg-red-500" 
                style={{ width: `${(suite.failed / suite.tests) * 100}%` }} 
              />
              <div 
                className="h-full bg-amber-500" 
                style={{ width: `${(suite.skipped / suite.tests) * 100}%` }} 
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logs */}
      <div className="h-32 bg-[#09090b] rounded-lg border border-white/10 p-2 font-mono text-[10px] overflow-y-auto custom-scrollbar">
        {logs.map((log, i) => (
          <div 
            key={i} 
            className={cn(
              "mb-0.5",
              log.startsWith("PASS") ? "text-emerald-400" :
              log.startsWith("FAIL") ? "text-red-400" :
              log.startsWith(">") ? "text-blue-400" :
              "text-gray-500"
            )}
          >
            {log}
          </div>
        ))}
        {isRunning && (
          <motion.div 
            animate={{ opacity: [0, 1, 0] }} 
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-amber-400"
          >
            Running tests...
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Bug Tracker
function BugTracker() {
  const [bugs, setBugs] = useState<Bug[]>([
    { id: "BUG-001", title: "Login fails on Safari", severity: "high", status: "in-progress", assignee: "Alex", created: "2h ago" },
    { id: "BUG-002", title: "Memory leak in dashboard", severity: "critical", status: "open", assignee: "Unassigned", created: "5h ago" },
    { id: "BUG-003", title: "Button alignment off on mobile", severity: "low", status: "resolved", assignee: "Sarah", created: "1d ago" },
    { id: "BUG-004", title: "API timeout after 30s", severity: "medium", status: "open", assignee: "James", created: "3h ago" },
  ]);

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "critical": return "text-red-400 bg-red-500/10 border-red-500/30";
      case "high": return "text-orange-400 bg-orange-500/10 border-orange-500/30";
      case "medium": return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      default: return "text-blue-400 bg-blue-500/10 border-blue-500/30";
    }
  };

  const cycleStatus = (id: string) => {
    setBugs(prev => prev.map(bug => {
      if (bug.id === id) {
        const statuses = ["open", "in-progress", "resolved"] as const;
        const nextIndex = (statuses.indexOf(bug.status) + 1) % statuses.length;
        return { ...bug, status: statuses[nextIndex] };
      }
      return bug;
    }));
  };

  return (
    <div className="bg-swarp-dark/80 rounded-xl border border-swarp-blue/20 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bug className="w-5 h-5 text-swarp-blue" />
          <h4 className="text-sm font-bold text-white">Bug Tracker</h4>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1 text-red-400">
            <AlertCircle className="w-3 h-3" />
            {bugs.filter(b => b.severity === "critical" && b.status !== "resolved").length} Critical
          </span>
        </div>
      </div>

      {/* Bug List */}
      <div className="flex-1 overflow-y-auto space-y-2 custom-scrollbar">
        {bugs.map((bug) => (
          <motion.div
            key={bug.id}
            layout
            onClick={() => cycleStatus(bug.id)}
            className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-swarp-blue/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-500">{bug.id}</span>
                <span className={cn("text-[9px] px-1.5 py-0.5 rounded border", getSeverityColor(bug.severity))}>
                  {bug.severity}
                </span>
              </div>
              <span className={cn(
                "text-[9px] px-2 py-0.5 rounded-full",
                bug.status === "resolved" ? "bg-emerald-500/20 text-emerald-400" :
                bug.status === "in-progress" ? "bg-amber-500/20 text-amber-400" :
                "bg-red-500/20 text-red-400"
              )}>
                {bug.status}
              </span>
            </div>

            <div className="text-xs text-white mb-2 group-hover:text-swarp-blue transition-colors">
              {bug.title}
            </div>

            <div className="flex items-center justify-between text-[10px] text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-swarp-blue to-swarp-cyan flex items-center justify-center text-[8px] font-bold text-white">
                  {bug.assignee.charAt(0)}
                </div>
                <span>{bug.assignee}</span>
              </div>
              <span>{bug.created}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-4 gap-2">
        {[
          { label: "Open", value: bugs.filter(b => b.status === "open").length, color: "red" },
          { label: "In Progress", value: bugs.filter(b => b.status === "in-progress").length, color: "amber" },
          { label: "Resolved", value: bugs.filter(b => b.status === "resolved").length, color: "emerald" },
          { label: "Total", value: bugs.length, color: "gray" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className={cn("text-lg font-bold", `text-${stat.color}-400`)}>{stat.value}</div>
            <div className="text-[8px] text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Load Testing
function LoadTesting() {
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState({
    rps: 0,
    latency: 0,
    errors: 0,
    users: 0,
  });
  const [chartData, setChartData] = useState(Array(20).fill(0));

  useEffect(() => {
    if (!isRunning) {
      setMetrics({ rps: 0, latency: 0, errors: 0, users: 0 });
      setChartData(Array(20).fill(0));
    }
  }, [isRunning]);

  useIntervalWhenVisible(() => {
    if (!isRunning) return;
    setMetrics({
      rps: Math.floor(Math.random() * 500) + 1000,
      latency: Math.floor(Math.random() * 50) + 80,
      errors: Math.floor(Math.random() * 5),
      users: Math.floor(Math.random() * 1000) + 5000,
    });
    setChartData(prev => [...prev.slice(1), Math.floor(Math.random() * 80) + 20]);
  }, 500);

  return (
    <div className="bg-swarp-dark/80 rounded-xl border border-swarp-blue/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-swarp-blue" />
          <h4 className="text-sm font-bold text-white">Load Testing</h4>
        </div>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
            isRunning
              ? "bg-red-500/10 text-red-400 border border-red-500/30"
              : "bg-swarp-blue/10 text-swarp-blue border border-swarp-blue/30"
          )}
        >
          {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-black/40">
          <div className="text-[10px] text-gray-500 mb-1">Requests/sec</div>
          <div className="text-xl font-bold text-swarp-blue">{metrics.rps.toLocaleString()}</div>
        </div>
        <div className="p-3 rounded-lg bg-black/40">
          <div className="text-[10px] text-gray-500 mb-1">Avg Latency</div>
          <div className="text-xl font-bold text-swarp-cyan">{metrics.latency}ms</div>
        </div>
        <div className="p-3 rounded-lg bg-black/40">
          <div className="text-[10px] text-gray-500 mb-1">Error Rate</div>
          <div className="text-xl font-bold text-red-400">{metrics.errors}%</div>
        </div>
        <div className="p-3 rounded-lg bg-black/40">
          <div className="text-[10px] text-gray-500 mb-1">Virtual Users</div>
          <div className="text-xl font-bold text-emerald-400">{metrics.users.toLocaleString()}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-24 flex items-end gap-0.5">
        {chartData.map((value, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-swarp-blue/50 to-swarp-cyan/50 rounded-t"
            animate={{ height: `${value}%` }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
      <div className="text-center text-[9px] text-gray-500 mt-2">
        Response Time Distribution (ms)
      </div>
    </div>
  );
}

// SRE Dashboard
function SREDashboard() {
  const [slos] = useState([
    { name: "Availability", target: 99.9, current: 99.95, status: "healthy" },
    { name: "Latency (p95)", target: 200, current: 145, status: "healthy" },
    { name: "Error Rate", target: 0.1, current: 0.05, status: "healthy" },
  ]);

  const errorBudget = 0.04; // 4% remaining

  return (
    <div className="bg-swarp-dark/80 rounded-xl border border-swarp-blue/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-swarp-blue" />
          <h4 className="text-sm font-bold text-white">SRE / Reliability</h4>
        </div>
      </div>

      {/* Error Budget */}
      <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-swarp-blue/10 to-swarp-cyan/10 border border-swarp-blue/20">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-300">Error Budget Remaining</span>
          <span className="text-lg font-bold text-swarp-blue">{errorBudget}%</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-swarp-blue to-swarp-cyan rounded-full"
            style={{ width: `${(errorBudget / 0.1) * 100}%` }}
          />
        </div>
        <div className="text-[9px] text-gray-500 mt-1">
          28 days until reset
        </div>
      </div>

      {/* SLOs */}
      <div className="space-y-2">
        {slos.map((slo) => (
          <div key={slo.name} className="flex items-center justify-between p-2 rounded-lg bg-black/40">
            <div>
              <div className="text-xs text-gray-300">{slo.name}</div>
              <div className="text-[9px] text-gray-500">Target: {slo.target}{slo.name.includes("Latency") ? "ms" : "%"}</div>
            </div>
            <div className="text-right">
              <div className={cn(
                "text-sm font-bold",
                slo.status === "healthy" ? "text-emerald-400" : "text-amber-400"
              )}>
                {slo.current}{slo.name.includes("Latency") ? "ms" : "%"}
              </div>
              <CheckCircle2 className="w-3 h-3 text-emerald-400 inline ml-1" />
            </div>
          </div>
        ))}
      </div>

      {/* Alerts */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="text-[10px] text-gray-500 mb-2">Recent Alerts</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[10px] p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <AlertTriangle className="w-3 h-3" />
            <span>latency spike detected (p95: 320ms)</span>
            <span className="ml-auto text-gray-500">5m ago</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" />
            <span>error rate back to normal</span>
            <span className="ml-auto text-gray-500">12m ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component
export function QATestingContent() {
  const t = useTranslations("servicesContent.qaTesting");
  const [activeTab, setActiveTab] = useState<"tests" | "bugs" | "load">("tests");

  const tools = [
    { icon: FileCode, name: "Jest/Cypress", category: "Testing" },
    { icon: Activity, name: "k6/Artillery", category: "Load" },
    { icon: Bug, name: "Sentry/Bugsnag", category: "Monitoring" },
    { icon: Shield, name: "PagerDuty", category: "SRE" },
  ];

  return (
    <ServiceContentLayout accentColor="cyan">
      <div className="h-full flex flex-col">
        {/* Header */}
        <ServiceHeader
          icon={<Bug className="w-5 h-5" />}
          title={t("badge")}
          subtitle={t("title")}
          accentColor="cyan"
        >
          {/* Tabs */}
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
            <ServiceTab
              isActive={activeTab === "tests"}
              onClick={() => setActiveTab("tests")}
              accentColor="cyan"
            >
              <FileCode className="w-3.5 h-3.5" />
              {t("testDemo.title")}
            </ServiceTab>
            <ServiceTab
              isActive={activeTab === "bugs"}
              onClick={() => setActiveTab("bugs")}
              accentColor="cyan"
            >
              <Bug className="w-3.5 h-3.5" />
              {t("testDemo.failed")}
            </ServiceTab>
            <ServiceTab
              isActive={activeTab === "load"}
              onClick={() => setActiveTab("load")}
              accentColor="cyan"
            >
              <Gauge className="w-3.5 h-3.5" />
              {t("testDemo.pending")}
            </ServiceTab>
          </div>
        </ServiceHeader>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Left Column */}
            <div className="h-full">
              {activeTab === "tests" && <TestRunner passedLabel={t("testDemo.passed")} coverageLabel={t("testDemo.coverage")} />}
              {activeTab === "bugs" && <BugTracker />}
              {activeTab === "load" && <LoadTesting />}
            </div>

            {/* Right Column */}
            <div className="space-y-4 flex flex-col h-full">
              {activeTab !== "load" && <LoadTesting />}
              {activeTab === "load" && <TestRunner passedLabel={t("testDemo.passed")} coverageLabel={t("testDemo.coverage")} />}
              <SREDashboard />

              {/* Tools Grid - Using ServiceCard */}
              <ServiceCard 
                title="Testing Stack" 
                accentColor="cyan"
                className="flex-1"
              >
                <div className="grid grid-cols-2 gap-2">
                  {tools.map((tool) => (
                    <motion.div
                      key={tool.name}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-swarp-blue/30 transition-colors cursor-pointer group"
                    >
                      <tool.icon className="w-5 h-5 text-swarp-blue mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xs font-medium text-white">{tool.name}</div>
                      <div className="text-[9px] text-gray-500">{tool.category}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: t("testDemo.coverage"), value: "87%", color: "emerald" },
                    { label: "Tests", value: "291", color: "swarp-blue" },
                    { label: "Uptime", value: "99.9%", color: "swarp-cyan" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-2 rounded-lg bg-black/40">
                      <div className={cn("text-sm font-bold", stat.color === "swarp-blue" ? "text-swarp-blue" : stat.color === "swarp-cyan" ? "text-swarp-cyan" : `text-${stat.color}-400`)}>
                        {stat.value}
                      </div>
                      <div className="text-[8px] text-gray-500 uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </ServiceCard>

              {/* CTA - Using ServiceCTA */}
              <ServiceCTA
                title={t("description")}
                description="Ship with confidence"
                accentColor="cyan"
              />
            </div>
          </div>
        </div>
      </div>
    </ServiceContentLayout>
  );
}

export default QATestingContent;
