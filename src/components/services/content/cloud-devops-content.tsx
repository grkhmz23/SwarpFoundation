"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud, Server, Container, Database, Globe, Cpu, Activity, Layers,
  GitBranch, GitCommit, Play, Pause, RefreshCw, CheckCircle2, XCircle,
  ChevronRight, Terminal, Shield, Zap, BarChart3, Settings, Box,
  Network, HardDrive, MemoryStick, ArrowRightCircle, Clock, AlertCircle,
  Download, Upload, Trash2, Plus, Minus, Maximize2, Code2, FileCode,
  Workflow, Radio, Wifi, WifiOff, TrendingUp, TrendingDown, Info,
  Copy, Check, ExternalLink, Rocket, Lock, Eye, EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";

// ==================== TYPES ====================
interface Node {
  id: string;
  name: string;
  type: "master" | "worker" | "db" | "lb";
  status: "healthy" | "warning" | "critical";
  cpu: number;
  memory: number;
  region: string;
  pods: number;
}

interface PipelineStage {
  id: string;
  name: string;
  status: "pending" | "running" | "success" | "failed";
  duration: number;
  logs: string[];
}

interface MetricData {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

// ==================== UTILITY COMPONENTS ====================

const StatusBadge = ({ status, text, pulse = false }: { status: "healthy" | "warning" | "critical" | "neutral"; text: string; pulse?: boolean }) => {
  const colors = {
    healthy: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    critical: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    neutral: "bg-gray-500/15 text-gray-400 border-gray-500/30",
  };

  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-medium border flex items-center gap-1.5", colors[status])}>
      <span className={cn("w-1.5 h-1.5 rounded-full", pulse && "animate-pulse", status === "healthy" && "bg-emerald-400", status === "warning" && "bg-amber-400", status === "critical" && "bg-rose-400", status === "neutral" && "bg-gray-400")} />
      {text}
    </span>
  );
};

const ProgressBar = ({ value, max = 100, color = "blue", size = "sm" }: { value: number; max?: number; color?: "blue" | "emerald" | "amber" | "rose" | "purple" | "cyan"; size?: "sm" | "md" }) => {
  const colors = {
    blue: "bg-blue-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    purple: "bg-purple-500",
    cyan: "bg-cyan-500",
  };

  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className={cn("bg-gray-800 rounded-full overflow-hidden", size === "sm" ? "h-1.5" : "h-2")}>
      <motion.div
        className={cn("h-full rounded-full", colors[color])}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
};

// ==================== KUBERNETES CLUSTER ====================

function K8sCluster() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "master-1", name: "control-plane-1", type: "master", status: "healthy", cpu: 42, memory: 58, region: "us-east-1", pods: 12 },
    { id: "worker-1", name: "worker-node-1", type: "worker", status: "healthy", cpu: 35, memory: 48, region: "us-east-1", pods: 18 },
    { id: "worker-2", name: "worker-node-2", type: "worker", status: "warning", cpu: 78, memory: 85, region: "eu-west-1", pods: 24 },
    { id: "worker-3", name: "worker-node-3", type: "worker", status: "healthy", cpu: 28, memory: 42, region: "us-west-2", pods: 15 },
    { id: "db-1", name: "postgres-primary", type: "db", status: "healthy", cpu: 25, memory: 40, region: "us-east-1", pods: 3 },
    { id: "lb-1", name: "nginx-ingress", type: "lb", status: "healthy", cpu: 15, memory: 22, region: "global", pods: 2 },
  ]);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        cpu: Math.max(10, Math.min(95, node.cpu + (Math.random() - 0.5) * 8)),
        memory: Math.max(20, Math.min(95, node.memory + (Math.random() - 0.5) * 6)),
      })));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleScale = useCallback((delta: number) => {
    setIsDeploying(true);
    setTimeout(() => {
      setNodes(prev => {
        if (delta > 0) {
          const newId = `worker-${prev.filter(n => n.type === "worker").length + 1}`;
          return [...prev, {
            id: newId,
            name: `worker-node-${prev.filter(n => n.type === "worker").length + 1}`,
            type: "worker",
            status: "healthy",
            cpu: 12,
            memory: 18,
            region: "us-west-2",
            pods: 0
          }];
        } else {
          const workers = prev.filter(n => n.type === "worker");
          if (workers.length <= 1) return prev;
          const lastWorker = workers[workers.length - 1];
          return prev.filter(n => n.id !== lastWorker.id);
        }
      });
      setIsDeploying(false);
    }, 1200);
  }, []);

  const getNodeIcon = (type: string) => {
    switch(type) {
      case "master": return Cloud;
      case "db": return Database;
      case "lb": return Globe;
      default: return Server;
    }
  };

  const getNodeColor = (node: Node) => {
    if (node.type === "master") return { bg: "bg-blue-500/20", border: "border-blue-500/50", icon: "text-blue-400", text: "text-blue-300" };
    if (node.type === "db") return { bg: "bg-purple-500/15", border: "border-purple-500/40", icon: "text-purple-400", text: "text-purple-300" };
    if (node.type === "lb") return { bg: "bg-cyan-500/15", border: "border-cyan-500/40", icon: "text-cyan-400", text: "text-cyan-300" };
    if (node.status === "warning") return { bg: "bg-amber-500/15", border: "border-amber-500/40", icon: "text-amber-400", text: "text-amber-300" };
    return { bg: "bg-emerald-500/15", border: "border-emerald-500/40", icon: "text-emerald-400", text: "text-emerald-300" };
  };

  const workers = nodes.filter(n => n.type === "worker");

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-blue-500/20 p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Kubernetes Cluster</h4>
            <p className="text-[10px] text-gray-500">Live cluster visualization</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <StatusBadge status="healthy" text="Operational" pulse />
          <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => handleScale(-1)}
              disabled={workers.length <= 1 || isDeploying}
              className="p-1.5 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              title="Remove worker node"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] text-gray-400 min-w-[50px] text-center font-medium">
              {workers.length} Nodes
            </span>
            <button
              onClick={() => handleScale(1)}
              disabled={isDeploying}
              className="p-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-40 transition-all"
              title="Add worker node"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Cluster Topology */}
      <div className="flex-1 relative bg-black/50 rounded-xl border border-white/5 overflow-hidden">
        {/* Connection Lines SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {nodes.filter(n => n.type !== "master").map((node, i) => (
            <motion.line
              key={`line-${node.id}`}
              x1="50%"
              y1="18%"
              x2={`${15 + (i * 70 / Math.max(1, nodes.filter(n => n.type !== "master").length - 1))}%`}
              y2="65%"
              stroke="url(#lineGradient)"
              strokeWidth="1.5"
              strokeDasharray="5 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, delay: i * 0.15 }}
            />
          ))}
        </svg>

        {/* Master Node */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onMouseEnter={() => setShowTooltip("master")}
            onMouseLeave={() => setShowTooltip(null)}
          >
            <div className="w-16 h-16 rounded-xl bg-blue-500/20 border-2 border-blue-500/50 flex flex-col items-center justify-center shadow-lg shadow-blue-500/10">
              <Cloud className="w-6 h-6 text-blue-400" />
              <span className="text-[9px] text-blue-300 mt-1 font-medium">Master</span>
            </div>
            <AnimatePresence>
              {showTooltip === "master" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute -bottom-16 left-1/2 -translate-x-1/2 bg-gray-900 border border-white/10 rounded-lg p-2 whitespace-nowrap z-20"
                >
                  <p className="text-[10px] text-gray-300">Control Plane</p>
                  <p className="text-[9px] text-gray-500">us-east-1</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Worker Nodes */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 flex-wrap px-4">
          <AnimatePresence mode="popLayout">
            {nodes.filter(n => n.type !== "master").map((node, i) => {
              const colors = getNodeColor(node);
              const Icon = getNodeIcon(node.type);
              return (
                <motion.div
                  key={node.id}
                  layout
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  onClick={() => setSelectedNode(selectedNode?.id === node.id ? null : node)}
                  className={cn(
                    "w-14 h-16 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all",
                    colors.bg, colors.border,
                    selectedNode?.id === node.id && "ring-2 ring-blue-500/50 scale-110"
                  )}
                >
                  <Icon className={cn("w-4 h-4", colors.icon)} />
                  <span className="text-[8px] text-gray-400 mt-1 truncate max-w-[50px] text-center">{node.name}</span>
                  {node.status === "warning" && (
                    <AlertCircle className="w-3 h-3 text-amber-400 absolute -top-1 -right-1" />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Deploy Animation Overlay */}
        <AnimatePresence>
          {isDeploying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <RefreshCw className="w-10 h-10 text-blue-400 animate-spin" />
                  <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full" />
                </div>
                <span className="text-xs text-blue-400 font-medium">Scaling Cluster...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Node Details Panel */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden"
          >
            <div className="p-3 rounded-xl bg-black/50 border border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {React.createElement(getNodeIcon(selectedNode.type), { className: "w-4 h-4 text-blue-400" })}
                  <span className="text-xs font-bold text-white">{selectedNode.name}</span>
                  <StatusBadge 
                    status={selectedNode.status} 
                    text={selectedNode.status === "healthy" ? "Healthy" : selectedNode.status === "warning" ? "Warning" : "Critical"} 
                  />
                </div>
                <button 
                  onClick={() => setSelectedNode(null)} 
                  className="p-1 rounded-md hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-gray-500">CPU Usage</span>
                    <span className={cn(selectedNode.cpu > 80 ? "text-amber-400" : "text-emerald-400", "font-medium")}>
                      {Math.round(selectedNode.cpu)}%
                    </span>
                  </div>
                  <ProgressBar value={selectedNode.cpu} color={selectedNode.cpu > 80 ? "amber" : "emerald"} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-gray-500">Memory</span>
                    <span className={cn(selectedNode.memory > 80 ? "text-amber-400" : "text-blue-400", "font-medium")}>
                      {Math.round(selectedNode.memory)}%
                    </span>
                  </div>
                  <ProgressBar value={selectedNode.memory} color={selectedNode.memory > 80 ? "amber" : "blue"} />
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-gray-500">Region</p>
                  <p className="text-[11px] text-gray-300 font-medium">{selectedNode.region}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Pods</p>
                  <p className="text-[11px] text-gray-300 font-medium">{selectedNode.pods}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500">Type</p>
                  <p className="text-[11px] text-gray-300 font-medium capitalize">{selectedNode.type}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Helper Text */}
      {!selectedNode && (
        <p className="mt-3 text-[10px] text-gray-600 text-center">
          Click on any node to view detailed metrics
        </p>
      )}
    </div>
  );
}

// ==================== CI/CD PIPELINE ====================

function CICDPipeline() {
  const [stages, setStages] = useState<PipelineStage[]>([
    { id: "1", name: "Build", status: "success", duration: 124, logs: [
      "→ Installing dependencies...",
      "✓ 847 packages installed (12.4s)",
      "→ Building application...",
      "✓ Build successful (45.2s)",
      "→ Creating Docker image...",
      "✓ Image pushed: swarp/app:v2.4.1"
    ]},
    { id: "2", name: "Test", status: "success", duration: 89, logs: [
      "→ Running unit tests...",
      "✓ 247 tests passed",
      "→ Code coverage analysis...",
      "✓ Coverage: 87.3%",
      "→ Integration tests...",
      "✓ All integration tests passed"
    ]},
    { id: "3", name: "Security", status: "running", duration: 45, logs: [
      "→ Scanning dependencies...",
      "✓ No vulnerabilities found",
      "→ SAST analysis...",
      "→ Checking for secrets..."
    ]},
    { id: "4", name: "Deploy", status: "pending", duration: 0, logs: [] },
  ]);

  const [isRunning, setIsRunning] = useState(true);
  const [selectedStage, setSelectedStage] = useState<PipelineStage | null>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-advance pipeline
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setStages(prev => {
        const newStages = [...prev];
        for (let i = 0; i < newStages.length; i++) {
          if (newStages[i].status === "running") {
            if (Math.random() > 0.75) {
              newStages[i].status = "success";
              newStages[i].logs.push("✓ Stage completed successfully");
            }
          }
          if (i > 0 && newStages[i-1].status === "success" && newStages[i].status === "pending") {
            newStages[i].status = "running";
            newStages[i].logs.push("→ Starting stage...");
          }
        }
        return newStages;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isRunning]);

  const restartPipeline = () => {
    setStages(prev => prev.map(s => ({ 
      ...s, 
      status: s.id === "1" ? "running" : "pending",
      logs: s.id === "1" ? ["→ Starting pipeline..."] : []
    })));
    setIsRunning(true);
  };

  const getStageIcon = (status: string) => {
    switch(status) {
      case "success": return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case "failed": return <XCircle className="w-5 h-5 text-rose-400" />;
      case "running": return <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const completedStages = stages.filter(s => s.status === "success").length;
  const progress = (completedStages / stages.length) * 100;

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-emerald-500/20 p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <Workflow className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">CI/CD Pipeline</h4>
            <p className="text-[10px] text-gray-500">Automated deployment flow</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-all"
            title={isRunning ? "Pause pipeline" : "Resume pipeline"}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={restartPipeline}
            className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all"
            title="Restart pipeline"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[10px] mb-1">
          <span className="text-gray-500">Pipeline Progress</span>
          <span className="text-emerald-400 font-medium">{Math.round(progress)}%</span>
        </div>
        <ProgressBar value={progress} color="emerald" size="md" />
      </div>

      {/* Pipeline Stages */}
      <div className="flex items-center justify-between mb-4 px-2">
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.id}>
            <motion.div
              onClick={() => setSelectedStage(stage)}
              className={cn(
                "flex flex-col items-center gap-2 cursor-pointer group relative",
                selectedStage?.id === stage.id && "scale-105"
              )}
              whileHover={{ scale: 1.05 }}
            >
              <div className={cn(
                "w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all",
                stage.status === "success" ? "bg-emerald-500/15 border-emerald-500 shadow-lg shadow-emerald-500/20" :
                stage.status === "failed" ? "bg-rose-500/15 border-rose-500" :
                stage.status === "running" ? "bg-blue-500/15 border-blue-500 animate-pulse shadow-lg shadow-blue-500/20" :
                "bg-gray-800 border-gray-700"
              )}>
                {getStageIcon(stage.status)}
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                stage.status === "success" ? "text-emerald-400" :
                stage.status === "running" ? "text-blue-400" :
                "text-gray-500"
              )}>
                {stage.name}
              </span>
              {stage.duration > 0 && (
                <span className="text-[9px] text-gray-600">{stage.duration}s</span>
              )}
            </motion.div>
            {idx < stages.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-800 mx-2 relative overflow-hidden">
                <motion.div
                  className={cn(
                    "absolute left-0 top-0 h-full",
                    stages[idx].status === "success" ? "bg-emerald-500" : "bg-gray-800"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: stages[idx].status === "success" ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Logs Panel */}
      <div className="flex-1 bg-black/50 rounded-xl border border-white/5 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-white/[0.02]">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-[11px] font-medium text-gray-300">
              {selectedStage ? `${selectedStage.name} Logs` : "Pipeline Logs"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {selectedStage && (
              <button
                onClick={() => setSelectedStage(null)}
                className="text-[10px] text-gray-500 hover:text-gray-300 transition-colors"
              >
                View All
              </button>
            )}
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={cn(
                "text-[10px] px-2 py-0.5 rounded transition-colors",
                autoScroll ? "bg-blue-500/20 text-blue-400" : "text-gray-500 hover:text-gray-300"
              )}
            >
              Auto-scroll
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 font-mospace">
          {selectedStage ? (
            <div className="space-y-1">
              {selectedStage.logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "text-[11px] font-mono",
                    log.startsWith("✓") && "text-emerald-400",
                    log.startsWith("→") && "text-blue-400",
                    log.startsWith("!") && "text-amber-400",
                    !log.startsWith("✓") && !log.startsWith("→") && !log.startsWith("!") && "text-gray-400"
                  )}
                >
                  <span className="text-gray-600 mr-2">{new Date().toLocaleTimeString("en-US", { hour12: false })}</span>
                  {log}
                </motion.div>
              ))}
              {selectedStage.status === "running" && (
                <motion.div
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-blue-400 text-[11px] font-mono"
                >
                  <span className="text-gray-600 mr-2">{new Date().toLocaleTimeString("en-US", { hour12: false })}</span>
                  _
                </motion.div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              {stages.map(stage => (
                <div key={stage.id} className="flex items-start gap-2">
                  {getStageIcon(stage.status)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-medium text-gray-300">{stage.name}</span>
                      <span className="text-[9px] text-gray-500">{stage.duration > 0 && `${stage.duration}s`}</span>
                    </div>
                    {stage.logs.length > 0 && (
                      <p className="text-[10px] text-gray-500 truncate">{stage.logs[stage.logs.length - 1]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==================== INFRASTRUCTURE METRICS ====================

function InfraMetrics() {
  const [metrics, setMetrics] = useState<MetricData>({
    cpu: 42,
    memory: 58,
    disk: 34,
    network: 67,
  });

  const [history, setHistory] = useState<MetricData[]>([]);
  const [timeRange, setTimeRange] = useState<"1m" | "5m" | "1h">("1m");

  useEffect(() => {
    const interval = setInterval(() => {
      const newMetrics = {
        cpu: Math.floor(Math.random() * 25) + 35,
        memory: Math.floor(Math.random() * 15) + 50,
        disk: Math.floor(Math.random() * 8) + 30,
        network: Math.floor(Math.random() * 30) + 45,
      };
      setMetrics(newMetrics);
      setHistory(prev => [...prev.slice(-20), newMetrics]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ label, value, icon: Icon, color, trend }: { 
    label: string; 
    value: number; 
    icon: React.ElementType; 
    color: "emerald" | "blue" | "purple" | "cyan";
    trend: "up" | "down" | "stable";
  }) => {
    const colors = {
      emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", bar: "bg-emerald-500" },
      blue: { bg: "bg-blue-500/10", text: "text-blue-400", bar: "bg-blue-500" },
      purple: { bg: "bg-purple-500/10", text: "text-purple-400", bar: "bg-purple-500" },
      cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", bar: "bg-cyan-500" },
    };

    const c = colors[color];

    return (
      <div className="bg-black/40 rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</span>
          <div className={cn("p-1.5 rounded-lg", c.bg)}>
            <Icon className={cn("w-3.5 h-3.5", c.text)} />
          </div>
        </div>
        <div className="flex items-end gap-2 mb-2">
          <span className={cn("text-xl font-bold", c.text)}>{value}%</span>
          {trend === "up" && <TrendingUp className="w-3.5 h-3.5 text-amber-400" />}
          {trend === "down" && <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />}
        </div>
        <div className="h-6 flex items-end gap-0.5">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={cn("flex-1 rounded-t", c.bar, "opacity-60")}
              animate={{ height: [`${15 + Math.random() * 70}%`] }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-cyan-500/20 p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Live Metrics</h4>
            <p className="text-[10px] text-gray-500">Real-time infrastructure monitoring</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-black/40 rounded-lg p-1 border border-white/10">
          {(["1m", "5m", "1h"] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "px-2 py-1 rounded text-[10px] font-medium transition-all",
                timeRange === range ? "bg-cyan-500/20 text-cyan-400" : "text-gray-500 hover:text-gray-300"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <MetricCard label="CPU Usage" value={metrics.cpu} icon={Cpu} color="emerald" trend="stable" />
        <MetricCard label="Memory" value={metrics.memory} icon={MemoryStick} color="blue" trend="up" />
        <MetricCard label="Disk I/O" value={metrics.disk} icon={HardDrive} color="purple" trend="down" />
        <MetricCard label="Network" value={metrics.network} icon={Network} color="cyan" trend="up" />
      </div>

      {/* Cost Optimization Card */}
      <div className="mt-auto p-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs text-gray-300">Monthly Infrastructure Cost</p>
              <p className="text-[10px] text-gray-500">Auto-optimized resources</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-white">$2,847<span className="text-sm text-gray-500">.50</span></p>
            <p className="text-[10px] text-emerald-400 flex items-center gap-1 justify-end">
              <TrendingDown className="w-3 h-3" />
              -$432 vs last month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== INFRASTRUCTURE AS CODE ====================

function InfraCode() {
  const [activeTab, setActiveTab] = useState<"terraform" | "docker" | "k8s">("terraform");
  const [copied, setCopied] = useState(false);

  const code = {
    terraform: `# EKS Cluster Configuration
resource "aws_eks_cluster" "main" {
  name     = "swarp-production"
  role_arn = aws_iam_role.cluster.arn
  version  = "1.28"

  vpc_config {
    subnet_ids             = var.subnet_ids
    endpoint_public_access = true
    security_group_ids     = [aws_security_group.cluster.id]
  }

  enabled_cluster_log_types = ["api", "audit", "authenticator"]

  tags = {
    Environment = "production"
    ManagedBy   = "terraform"
  }
}`,
    docker: `# Multi-stage Docker build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
USER node
HEALTHCHECK --interval=30s --timeout=3s \\
  CMD curl -f http://localhost:3000/health || exit 1
CMD ["node", "server.js"]`,
    k8s: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: swarp-api
  namespace: production
  labels:
    app: api
    version: v2.4.1
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: swarp/api:v2.4.1
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "terraform" as const, label: "Terraform", icon: Box },
    { id: "docker" as const, label: "Docker", icon: Container },
    { id: "k8s" as const, label: "Kubernetes", icon: Layers },
  ];

  return (
    <div className="bg-[#09090b] rounded-xl border border-white/10 p-4 font-mono text-xs h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
            <FileCode className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <span className="text-xs font-medium text-gray-300">Infrastructure as Code</span>
            <p className="text-[9px] text-gray-500">Version-controlled infrastructure</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] text-gray-400 hover:text-white transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all",
              activeTab === tab.id 
                ? "bg-purple-500/15 text-purple-400 border border-purple-500/30" 
                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Code Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/30 rounded-lg p-3">
        <pre className="text-[11px] leading-relaxed">
          <code className="text-gray-300">
            {code[activeTab].split("\n").map((line, i) => (
              <div key={i} className="flex">
                <span className="text-gray-600 select-none w-6 text-right mr-3">{i + 1}</span>
                <span dangerouslySetInnerHTML={{ 
                  __html: line
                    .replace(/(#.*)/g, '<span class="text-gray-500">$1</span>')
                    .replace(/(".*?")/g, '<span class="text-emerald-400">$1</span>')
                    .replace(/\b(resource|from|RUN|COPY|EXPOSE|CMD|apiVersion|kind|metadata|spec|name|labels)\b/g, '<span class="text-purple-400">$1</span>')
                    .replace(/\b(true|false|null)\b/g, '<span class="text-amber-400">$1</span>')
                    .replace(/\b(\d+)\b/g, '<span class="text-cyan-400">$1</span>')
                }} />
              </div>
            ))}
          </code>
        </pre>
      </div>

      {/* Footer */}
      <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-500">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Syntax valid
          </span>
          <span className="flex items-center gap-1">
            <Rocket className="w-3 h-3 text-blue-400" />
            3 changes pending
          </span>
        </div>
        <span>Last updated: 2 min ago</span>
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

export function CloudDevOpsContent() {
  const [activeView, setActiveView] = useState<"cluster" | "pipeline" | "metrics">("cluster");

  const services = [
    { icon: Cloud, title: "Multi-Cloud", desc: "AWS, GCP, Azure" },
    { icon: Container, title: "Kubernetes", desc: "Container orchestration" },
    { icon: GitBranch, title: "CI/CD", desc: "GitHub, GitLab, Jenkins" },
    { icon: Shield, title: "IaC Security", desc: "Terraform, Pulumi" },
  ];

  const stats = [
    { label: "Uptime", value: "99.99%", color: "emerald" as const },
    { label: "Deploys", value: "1.2k/mo", color: "blue" as const },
    { label: "Nodes", value: "48", color: "cyan" as const },
  ];

  const views = [
    { id: "cluster" as const, label: "Cluster", icon: Layers, desc: "K8s visualization" },
    { id: "pipeline" as const, label: "Pipeline", icon: Workflow, desc: "CI/CD flow" },
    { id: "metrics" as const, label: "Metrics", icon: Activity, desc: "Monitoring" },
  ];

  return (
    <div className="h-full bg-[#0a0f1a] text-gray-200 overflow-hidden relative">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02] backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <Cloud className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Cloud & DevOps</h3>
              <p className="text-[11px] text-blue-400">Infrastructure automation & deployment</p>
            </div>
          </div>

          {/* View Tabs */}
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/10">
            {views.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-[11px] font-medium transition-all",
                  activeView === view.id
                    ? "bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                )}
              >
                <view.icon className="w-4 h-4" />
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-5">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 h-full">
            {/* Left Column - Main View */}
            <div className="lg:col-span-3 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {activeView === "cluster" && <K8sCluster />}
                  {activeView === "pipeline" && <CICDPipeline />}
                  {activeView === "metrics" && <InfraMetrics />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Column - Code & Services */}
            <div className="lg:col-span-2 space-y-4 flex flex-col h-full">
              <InfraCode />

              {/* Services Grid */}
              <div className="bg-[#0c0e12] rounded-xl border border-white/10 p-4 flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white">Our Expertise</h4>
                  <StatusBadge status="healthy" text="Available" />
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  {services.map((service) => (
                    <motion.div
                      key={service.title}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="p-3 rounded-xl bg-black/40 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group"
                    >
                      <service.icon className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xs font-medium text-white">{service.title}</div>
                      <div className="text-[9px] text-gray-500">{service.desc}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center p-3 rounded-xl bg-black/40 border border-white/5">
                      <div className={cn("text-sm font-bold", `text-${stat.color}-400`)}>{stat.value}</div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-gradient-to-r from-blue-500/15 via-cyan-500/15 to-blue-500/15 rounded-xl border border-blue-500/30 p-4 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Rocket className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">Ready to Scale?</h4>
                    <p className="text-[10px] text-gray-400">Zero-downtime deployments with auto-scaling</p>
                  </div>
                  <button className="p-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white transition-all shadow-lg shadow-blue-500/20">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CloudDevOpsContent;