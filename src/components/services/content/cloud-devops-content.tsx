"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cloud, Server, Container, Database, Globe, Cpu, Activity, Layers,
  GitBranch, GitCommit, Play, Pause, RefreshCw, CheckCircle2, XCircle,
  ChevronRight, Terminal, Shield, Zap, BarChart3, Settings, Box,
  Network, HardDrive, MemoryStick, ArrowRightCircle, Clock, AlertCircle,
  Download, Upload, Trash2, Plus, Minus, Maximize2, Code2, FileCode,
  Workflow, Radio, Wifi, WifiOff
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface Node {
  id: string;
  name: string;
  type: "master" | "worker" | "db" | "lb";
  status: "healthy" | "warning" | "critical";
  cpu: number;
  memory: number;
  region: string;
}

interface PipelineStage {
  id: string;
  name: string;
  status: "pending" | "running" | "success" | "failed";
  duration: number;
  logs: string[];
}

// Kubernetes Cluster Visualizer
function K8sCluster() {
  const [nodes, setNodes] = useState<Node[]>([
    { id: "master-1", name: "control-plane-1", type: "master", status: "healthy", cpu: 45, memory: 62, region: "us-east-1" },
    { id: "worker-1", name: "worker-node-1", type: "worker", status: "healthy", cpu: 32, memory: 48, region: "us-east-1" },
    { id: "worker-2", name: "worker-node-2", type: "worker", status: "warning", cpu: 78, memory: 85, region: "eu-west-1" },
    { id: "db-1", name: "postgres-primary", type: "db", status: "healthy", cpu: 25, memory: 40, region: "us-east-1" },
    { id: "lb-1", name: "nginx-ingress", type: "lb", status: "healthy", cpu: 15, memory: 22, region: "global" },
  ]);

  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => ({
        ...node,
        cpu: Math.max(10, Math.min(95, node.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(20, Math.min(95, node.memory + (Math.random() - 0.5) * 8)),
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch(status) {
      case "healthy": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "warning": return "text-amber-400 bg-amber-500/10 border-amber-500/30";
      case "critical": return "text-red-400 bg-red-500/10 border-red-500/30";
      default: return "text-gray-400";
    }
  };

  const handleScale = (delta: number) => {
    setIsDeploying(true);
    setTimeout(() => {
      setNodes(prev => {
        if (delta > 0) {
          const newId = `worker-${prev.length}`;
          return [...prev, {
            id: newId,
            name: `worker-node-${prev.length}`,
            type: "worker",
            status: "healthy",
            cpu: 10,
            memory: 15,
            region: "us-west-2"
          }];
        } else {
          return prev.filter(n => n.type !== "worker" || n.id === "worker-1").slice(0, -1);
        }
      });
      setIsDeploying(false);
    }, 1500);
  };

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-blue-500/20 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-400" />
          <h4 className="text-sm font-bold text-white">Kubernetes Cluster</h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleScale(-1)}
            disabled={nodes.filter(n => n.type === "worker").length <= 1 || isDeploying}
            className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 disabled:opacity-50"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-xs text-gray-400 min-w-[60px] text-center">
            {nodes.filter(n => n.type === "worker").length} Workers
          </span>
          <button
            onClick={() => handleScale(1)}
            disabled={isDeploying}
            className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Cluster Topology */}
      <div className="flex-1 relative bg-black/40 rounded-lg border border-white/5 p-4 overflow-hidden">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
          {nodes.map((node, i) => (
            <motion.line
              key={`line-${i}`}
              x1="50%"
              y1="20%"
              x2={`${20 + (i * 15)}%`}
              y2="60%"
              stroke="#3b82f6"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: i * 0.2 }}
            />
          ))}
        </svg>

        {/* Master Node */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          <motion.div
            className="w-16 h-16 rounded-xl bg-blue-500/20 border-2 border-blue-500/50 flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            whileHover={{ boxShadow: "0 0 20px rgba(59,130,246,0.5)" }}
          >
            <Cloud className="w-6 h-6 text-blue-400" />
            <span className="text-[8px] text-blue-300 mt-1">Master</span>
          </motion.div>
        </div>

        {/* Worker Nodes */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 flex-wrap px-4">
          {nodes.filter(n => n.type !== "master").map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setSelectedNode(node)}
              className={cn(
                "w-14 h-14 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-all",
                node.type === "db" ? "bg-purple-500/10 border-purple-500/30" :
                node.type === "lb" ? "bg-cyan-500/10 border-cyan-500/30" :
                getStatusColor(node.status)
              )}
            >
              {node.type === "db" ? <Database className="w-4 h-4 text-purple-400" /> :
               node.type === "lb" ? <Globe className="w-4 h-4 text-cyan-400" /> :
               <Server className="w-4 h-4 text-emerald-400" />}
              <span className="text-[7px] text-gray-400 mt-1 truncate max-w-[50px]">{node.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Deploy Animation */}
        <AnimatePresence>
          {isDeploying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center z-20"
            >
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                <span className="text-xs text-blue-400">Scaling...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Node Details */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-lg bg-black/40 border border-white/10"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">{selectedNode.name}</span>
            <button onClick={() => setSelectedNode(null)} className="text-gray-500 hover:text-white">
              <XCircle className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <span className="text-gray-500">CPU:</span>
              <div className="h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                <div 
                  className={cn("h-full rounded-full", selectedNode.cpu > 80 ? "bg-red-500" : "bg-emerald-500")}
                  style={{ width: `${selectedNode.cpu}%` }}
                />
              </div>
              <span className={cn(selectedNode.cpu > 80 ? "text-red-400" : "text-emerald-400")}>
                {Math.round(selectedNode.cpu)}%
              </span>
            </div>
            <div>
              <span className="text-gray-500">Memory:</span>
              <div className="h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                <div 
                  className={cn("h-full rounded-full", selectedNode.memory > 80 ? "bg-amber-500" : "bg-blue-500")}
                  style={{ width: `${selectedNode.memory}%` }}
                />
              </div>
              <span className={cn(selectedNode.memory > 80 ? "text-amber-400" : "text-blue-400")}>
                {Math.round(selectedNode.memory)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// CI/CD Pipeline
function CICDPipeline() {
  const [stages, setStages] = useState<PipelineStage[]>([
    { id: "1", name: "Build", status: "success", duration: 124, logs: ["npm install", "npm run build", "✓ Build successful"] },
    { id: "2", name: "Test", status: "success", duration: 89, logs: ["Running unit tests...", "247 passed", "Coverage: 87%"] },
    { id: "3", name: "Security Scan", status: "running", duration: 45, logs: ["Scanning dependencies...", "No vulnerabilities found"] },
    { id: "4", name: "Deploy", status: "pending", duration: 0, logs: [] },
  ]);
  const [isRunning, setIsRunning] = useState(true);
  const [selectedStage, setSelectedStage] = useState<PipelineStage | null>(null);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setStages(prev => prev.map((stage, idx) => {
        if (stage.status === "running") {
          if (Math.random() > 0.7) {
            return { ...stage, status: "success" };
          }
        }
        if (idx > 0 && prev[idx-1].status === "success" && stage.status === "pending") {
          return { ...stage, status: "running" };
        }
        return stage;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const restartPipeline = () => {
    setStages(prev => prev.map(s => ({ ...s, status: s.id === "1" ? "running" : "pending" })));
    setIsRunning(true);
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "success": return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case "failed": return <XCircle className="w-5 h-5 text-red-400" />;
      case "running": return <RefreshCw className="w-5 h-5 text-blue-400 animate-spin" />;
      default: return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-emerald-500/20 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold text-white">CI/CD Pipeline</h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={restartPipeline}
            className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Pipeline Visual */}
      <div className="flex items-center justify-between mb-4 px-2">
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.id}>
            <motion.div
              onClick={() => setSelectedStage(stage)}
              className={cn(
                "flex flex-col items-center gap-2 cursor-pointer group",
                selectedStage?.id === stage.id && "scale-110"
              )}
              whileHover={{ scale: 1.05 }}
            >
              <div className={cn(
                "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors",
                stage.status === "success" ? "bg-emerald-500/10 border-emerald-500" :
                stage.status === "failed" ? "bg-red-500/10 border-red-500" :
                stage.status === "running" ? "bg-blue-500/10 border-blue-500 animate-pulse" :
                "bg-gray-800 border-gray-700"
              )}>
                {getStatusIcon(stage.status)}
              </div>
              <span className={cn(
                "text-[10px] font-medium",
                stage.status === "success" ? "text-emerald-400" :
                stage.status === "running" ? "text-blue-400" :
                "text-gray-500"
              )}>
                {stage.name}
              </span>
            </motion.div>
            {idx < stages.length - 1 && (
              <div className="flex-1 h-0.5 bg-gray-800 mx-2 relative">
                <motion.div
                  className={cn(
                    "absolute left-0 top-0 h-full",
                    stages[idx].status === "success" ? "bg-emerald-500" : "bg-gray-800"
                  )}
                  initial={{ width: 0 }}
                  animate={{ width: stages[idx].status === "success" ? "100%" : "0%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Stage Details / Logs */}
      <div className="flex-1 bg-black/40 rounded-lg border border-white/5 p-3 overflow-hidden">
        {selectedStage ? (
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-white">{selectedStage.name} Logs</span>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-gray-500" />
                <span className="text-[10px] text-gray-400">{selectedStage.duration}s</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto font-mono text-[10px] space-y-1 custom-scrollbar">
              {selectedStage.logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={cn(
                    "text-gray-300",
                    log.startsWith("✓") && "text-emerald-400",
                    log.includes("passed") && "text-emerald-400",
                    log.includes("Scanning") && "text-blue-400"
                  )}
                >
                  <span className="text-gray-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  {log}
                </motion.div>
              ))}
              {selectedStage.status === "running" && (
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-blue-400"
                >
                  <span className="text-gray-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                  _
                </motion.div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 text-xs">
            <div className="text-center">
              <GitBranch className="w-8 h-8 mx-auto mb-2 opacity-50" />
              Select a stage to view logs
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Infrastructure Metrics
function InfraMetrics() {
  const [metrics, setMetrics] = useState({
    cpu: 42,
    memory: 58,
    disk: 34,
    network: 67,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 30) + 30,
        memory: Math.floor(Math.random() * 20) + 50,
        disk: Math.floor(Math.random() * 10) + 30,
        network: Math.floor(Math.random() * 40) + 40,
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const MetricCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-black/40 rounded-lg p-3 border border-white/5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] text-gray-400 uppercase">{label}</span>
        <Icon className={`w-4 h-4 text-${color}-400`} />
      </div>
      <div className="flex items-end gap-2">
        <span className={`text-xl font-bold text-${color}-400`}>{value}%</span>
        <div className="flex-1 h-8 flex items-end gap-0.5">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className={`flex-1 bg-${color}-500/40 rounded-t`}
              animate={{ height: [`${20 + Math.random() * 60}%`] }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-cyan-500/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-bold text-white">Infrastructure Metrics</h4>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <MetricCard label="CPU Usage" value={metrics.cpu} icon={Cpu} color="emerald" />
        <MetricCard label="Memory" value={metrics.memory} icon={MemoryStick} color="blue" />
        <MetricCard label="Disk I/O" value={metrics.disk} icon={HardDrive} color="purple" />
        <MetricCard label="Network" value={metrics.network} icon={Network} color="cyan" />
      </div>

      {/* Cost Estimate */}
      <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-gray-300">Monthly Cost</span>
          </div>
          <span className="text-lg font-bold text-white">$2,847<span className="text-sm text-gray-500">.50</span></span>
        </div>
        <div className="mt-2 text-[10px] text-gray-500">
          Optimized: <span className="text-emerald-400">-$432</span> vs last month
        </div>
      </div>
    </div>
  );
}

// Terraform/Code Visualizer
function InfraCode() {
  const [activeTab, setActiveTab] = useState<"terraform" | "docker" | "k8s">("terraform");

  const code = {
    terraform: `resource "aws_eks_cluster" "main" {
  name     = "swarp-production"
  role_arn = aws_iam_role.cluster.arn
  version  = "1.28"

  vpc_config {
    subnet_ids = var.subnet_ids
  }

  depends_on = [
    aws_iam_role_policy_attachment.cluster
  ]
}`,
    docker: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
USER node
CMD ["node", "server.js"]`,
    k8s: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: swarp-api
spec:
  replicas: 3
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
        image: swarp/api:latest`,
  };

  return (
    <div className="bg-[#09090b] rounded-xl border border-white/10 p-4 font-mono text-xs h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-purple-400" />
          <span className="text-gray-300">Infrastructure as Code</span>
        </div>
        <div className="flex gap-1">
          {(["terraform", "docker", "k8s"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-2 py-1 rounded text-[10px] uppercase transition-colors",
                activeTab === tab ? "bg-purple-500/20 text-purple-400" : "text-gray-600 hover:text-gray-400"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar text-[11px] leading-relaxed">
        <pre className="text-gray-300">
          <code>{code[activeTab]}</code>
        </pre>
      </div>
      <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-500">
        <span>Syntax: OK</span>
        <span>Plan: 3 changes</span>
      </div>
    </div>
  );
}

// Main Component
export function CloudDevOpsContent() {
  const [activeView, setActiveView] = useState<"cluster" | "pipeline" | "metrics">("cluster");

  const services = [
    { icon: Cloud, title: "AWS/GCP/Azure", desc: "Multi-cloud architecture" },
    { icon: Container, title: "Kubernetes", desc: "Container orchestration" },
    { icon: GitBranch, title: "CI/CD", desc: "GitHub Actions, GitLab CI" },
    { icon: Shield, title: "IaC Security", desc: "Terraform & Pulumi" },
  ];

  return (
    <div className="h-full bg-[#0a0f1a] text-gray-200 overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Cloud className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Cloud & DevOps</h3>
              <p className="text-[10px] text-blue-400">Infrastructure as Code</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
            {[
              { id: "cluster", label: "Cluster", icon: Layers },
              { id: "pipeline", label: "Pipeline", icon: Workflow },
              { id: "metrics", label: "Metrics", icon: Activity },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all",
                  activeView === tab.id
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "text-gray-500 hover:text-white"
                )}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Left Column */}
            <div className="h-full">
              {activeView === "cluster" && <K8sCluster />}
              {activeView === "pipeline" && <CICDPipeline />}
              {activeView === "metrics" && <InfraMetrics />}
            </div>

            {/* Right Column */}
            <div className="space-y-4 flex flex-col h-full">
              <InfraCode />

              {/* Services Grid */}
              <div className="bg-[#0c0e12] rounded-xl border border-white/10 p-4 flex-1">
                <h4 className="text-sm font-bold text-white mb-3">Our Services</h4>
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service, i) => (
                    <motion.div
                      key={service.title}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-blue-500/30 transition-colors cursor-pointer group"
                    >
                      <service.icon className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xs font-medium text-white">{service.title}</div>
                      <div className="text-[9px] text-gray-500">{service.desc}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "Uptime", value: "99.99%", color: "emerald" },
                    { label: "Deploys", value: "1.2k", color: "blue" },
                    { label: "Nodes", value: "48", color: "cyan" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-2 rounded-lg bg-black/40">
                      <div className={cn("text-sm font-bold", `text-${stat.color}-400`)}>{stat.value}</div>
                      <div className="text-[8px] text-gray-500 uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl border border-blue-500/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">Scale Your Infrastructure</h4>
                    <p className="text-[10px] text-gray-400">Zero-downtime deployments guaranteed</p>
                  </div>
                  <button className="p-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CloudDevOpsContent;