"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plug, Zap, Globe, Server, Database, Shield, Code2, Terminal,
  ChevronRight, Plus, Minus, RefreshCw, CheckCircle2, XCircle, AlertCircle,
  Clock, Activity, BarChart3, Send, Copy, Check, Play, Pause,
  Webhook, Layers, ArrowRight, ArrowLeft, Maximize2, Minimize2,
  FileJson, Settings, Wifi, WifiOff, Key, Lock, Unlock,
  MessageSquare, CreditCard, Cloud, Mail, Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface Integration {
  id: string;
  name: string;
  category: string;
  status: "connected" | "disconnected" | "error";
  requests: number;
  latency: number;
  icon: React.ElementType;
  color: string;
}

interface ApiRequest {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  endpoint: string;
  status: number;
  duration: number;
  timestamp: Date;
}

// Integration Mesh Visualizer
function IntegrationMesh() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { id: "1", name: "Stripe", category: "Payments", status: "connected", requests: 2847, latency: 245, icon: CreditCard, color: "purple" },
    { id: "2", name: "Twilio", category: "Comms", status: "connected", requests: 1523, latency: 189, icon: Phone, color: "blue" },
    { id: "3", name: "Salesforce", category: "CRM", status: "connected", requests: 892, latency: 412, icon: Cloud, color: "cyan" },
    { id: "4", name: "SendGrid", category: "Email", status: "error", requests: 0, latency: 0, icon: Mail, color: "emerald" },
    { id: "5", name: "Slack", category: "Chat", status: "connected", requests: 3421, latency: 156, icon: MessageSquare, color: "amber" },
  ]);

  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const toggleConnection = (id: string) => {
    setIsConnecting(true);
    setTimeout(() => {
      setIntegrations(prev => prev.map(int => 
        int.id === id 
          ? { ...int, status: int.status === "connected" ? "disconnected" : "connected" }
          : int
      ));
      setIsConnecting(false);
    }, 1000);
  };

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-teal-500/20 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-teal-400" />
          <h4 className="text-sm font-bold text-white">Integration Mesh</h4>
        </div>
        <div className="flex items-center gap-2 text-[10px]">
          <span className="flex items-center gap-1 text-emerald-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {integrations.filter(i => i.status === "connected").length} Active
          </span>
        </div>
      </div>

      {/* Mesh Visualization */}
      <div className="flex-1 relative bg-black/40 rounded-lg border border-white/5 p-4 overflow-hidden">
        {/* Central Hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <motion.div
            className="w-20 h-20 rounded-full bg-teal-500/20 border-2 border-teal-500/50 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="w-12 h-12 rounded-full bg-teal-500/30 flex items-center justify-center">
              <Server className="w-6 h-6 text-teal-400" />
            </div>
          </motion.div>
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-teal-400 font-medium whitespace-nowrap">
            Your API
          </div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {integrations.map((int, i) => {
            const angle = (i / integrations.length) * 2 * Math.PI - Math.PI / 2;
            const x = 50 + 35 * Math.cos(angle);
            const y = 50 + 35 * Math.sin(angle);
            return (
              <motion.line
                key={int.id}
                x1="50%"
                y1="50%"
                x2={`${x}%`}
                y2={`${y}%`}
                stroke={int.status === "connected" ? "#14b8a6" : int.status === "error" ? "#ef4444" : "#374151"}
                strokeWidth="2"
                strokeDasharray={int.status === "connected" ? "0" : "4 4"}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: int.status === "connected" ? 1 : 0.3 }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            );
          })}
        </svg>

        {/* Integration Nodes */}
        {integrations.map((int, i) => {
          const angle = (i / integrations.length) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + 35 * Math.cos(angle);
          const y = 50 + 35 * Math.sin(angle);

          return (
            <motion.div
              key={int.id}
              className="absolute w-14 h-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${x}%`, top: `${y}%` }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedIntegration(int)}
            >
              <div className={cn(
                "w-full h-full rounded-xl border flex flex-col items-center justify-center transition-all",
                int.status === "connected" ? `bg-${int.color}-500/10 border-${int.color}-500/50` :
                int.status === "error" ? "bg-red-500/10 border-red-500/50" :
                "bg-gray-800 border-gray-700"
              )}>
                <int.icon className={cn(
                  "w-5 h-5",
                  int.status === "connected" ? `text-${int.color}-400` :
                  int.status === "error" ? "text-red-400" : "text-gray-600"
                )} />
                <span className="text-[7px] text-gray-400 mt-0.5">{int.name}</span>
              </div>
              {int.status === "connected" && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-black" />
              )}
              {int.status === "error" && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-red-500 border-2 border-black flex items-center justify-center">
                  <AlertCircle className="w-2 h-2 text-white" />
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Connecting Animation */}
        <AnimatePresence>
          {isConnecting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center z-20"
            >
              <RefreshCw className="w-8 h-8 text-teal-400 animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Integration Details */}
      {selectedIntegration && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-lg bg-black/40 border border-white/10"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", `bg-${selectedIntegration.color}-500/10`)}>
                <selectedIntegration.icon className={cn("w-5 h-5", `text-${selectedIntegration.color}-400`)} />
              </div>
              <div>
                <div className="text-sm font-medium text-white">{selectedIntegration.name}</div>
                <div className="text-[10px] text-gray-500">{selectedIntegration.category}</div>
              </div>
            </div>
            <button
              onClick={() => toggleConnection(selectedIntegration.id)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                selectedIntegration.status === "connected"
                  ? "bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20"
                  : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
              )}
            >
              {selectedIntegration.status === "connected" ? "Disconnect" : "Connect"}
            </button>
          </div>
          {selectedIntegration.status === "connected" && (
            <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-2 rounded bg-white/5">
                <span className="text-gray-500">Requests (24h)</span>
                <div className="text-lg font-bold text-white">{selectedIntegration.requests.toLocaleString()}</div>
              </div>
              <div className="p-2 rounded bg-white/5">
                <span className="text-gray-500">Avg Latency</span>
                <div className="text-lg font-bold text-emerald-400">{selectedIntegration.latency}ms</div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// API Playground
function ApiPlayground() {
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE">("GET");
  const [endpoint, setEndpoint] = useState("/api/v1/users");
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ApiRequest[]>([]);

  const methods = ["GET", "POST", "PUT", "DELETE"] as const;

  const sendRequest = async () => {
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));

    const mockResponse = method === "GET" ? {
      status: 200,
      data: {
        users: [
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Smith", email: "jane@example.com" }
        ],
        meta: { total: 2, page: 1 }
      }
    } : method === "POST" ? {
      status: 201,
      data: { id: 3, name: "New User", created: true }
    } : {
      status: 200,
      data: { success: true }
    };

    const newRequest: ApiRequest = {
      id: Math.random().toString(),
      method,
      endpoint,
      status: mockResponse.status,
      duration: Math.floor(Math.random() * 200) + 50,
      timestamp: new Date(),
    };

    setResponse(mockResponse);
    setHistory(prev => [newRequest, ...prev].slice(0, 5));
    setIsLoading(false);
  };

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-amber-500/20 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-amber-400" />
          <h4 className="text-sm font-bold text-white">API Playground</h4>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-gray-500">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          API Status: Healthy
        </div>
      </div>

      {/* Request Builder */}
      <div className="flex gap-2 mb-4">
        <div className="flex bg-black/40 rounded-lg border border-white/10 overflow-hidden">
          {methods.map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={cn(
                "px-3 py-2 text-xs font-medium transition-colors",
                method === m
                  ? m === "GET" ? "bg-blue-500/20 text-blue-400" :
                    m === "POST" ? "bg-emerald-500/20 text-emerald-400" :
                    m === "PUT" ? "bg-amber-500/20 text-amber-400" :
                    "bg-red-500/20 text-red-400"
                  : "text-gray-500 hover:text-white"
              )}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <input
            type="text"
            value={endpoint}
            onChange={(e) => setEndpoint(e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-500/50"
            placeholder="/api/v1/..."
          />
        </div>
        <button
          onClick={sendRequest}
          disabled={isLoading}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition-colors disabled:opacity-50 flex items-center gap-1.5"
        >
          {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          Send
        </button>
      </div>

      {/* Response Area */}
      <div className="flex-1 bg-[#09090b] rounded-lg border border-white/10 p-3 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-2 text-[10px] text-gray-500 border-b border-white/10 pb-2">
          <span>Response</span>
          {response && (
            <span className={cn(
              response.status < 300 ? "text-emerald-400" : response.status < 400 ? "text-amber-400" : "text-red-400"
            )}>
              Status: {response.status} • {history[0]?.duration}ms
            </span>
          )}
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {response ? (
            <pre className="text-[11px] text-gray-300 font-mono">
              {JSON.stringify(response.data, null, 2)}
            </pre>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-600 text-xs">
              <div className="text-center">
                <ArrowRight className="w-8 h-8 mx-auto mb-2 opacity-50" />
                Send a request to see the response
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Request History */}
      {history.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="text-[10px] text-gray-500 mb-2">Recent Requests</div>
          <div className="space-y-1.5">
            {history.map((req, i) => (
              <div key={req.id} className="flex items-center justify-between p-2 rounded bg-black/40 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "px-1.5 py-0.5 rounded font-bold",
                    req.method === "GET" ? "bg-blue-500/20 text-blue-400" :
                    req.method === "POST" ? "bg-emerald-500/20 text-emerald-400" :
                    req.method === "PUT" ? "bg-amber-500/20 text-amber-400" :
                    "bg-red-500/20 text-red-400"
                  )}>
                    {req.method}
                  </span>
                  <span className="text-gray-400 truncate max-w-[120px]">{req.endpoint}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>{req.duration}ms</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Webhook Tester
function WebhookTester() {
  const [webhookUrl, setWebhookUrl] = useState("https://api.yourapp.com/webhooks/stripe");
  const [events, setEvents] = useState([
    { id: "1", event: "payment_intent.succeeded", payload: { id: "pi_123", amount: 5000 }, timestamp: "2s ago" },
    { id: "2", event: "customer.created", payload: { id: "cus_456", email: "user@example.com" }, timestamp: "15s ago" },
  ]);
  const [isListening, setIsListening] = useState(true);

  useEffect(() => {
    if (!isListening) return;

    const interval = setInterval(() => {
      const newEvent = {
        id: Math.random().toString(),
        event: ["invoice.paid", "subscription.created", "payment_failed"][Math.floor(Math.random() * 3)],
        payload: { timestamp: Date.now() },
        timestamp: "just now",
      };
      setEvents(prev => [newEvent, ...prev].slice(0, 5));
    }, 8000);

    return () => clearInterval(interval);
  }, [isListening]);

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-orange-500/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Webhook className="w-5 h-5 text-orange-400" />
          <h4 className="text-sm font-bold text-white">Webhook Tester</h4>
        </div>
        <button
          onClick={() => setIsListening(!isListening)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-colors",
            isListening
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              : "bg-gray-700 text-gray-400 border border-gray-600"
          )}
        >
          {isListening ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
          {isListening ? "Listening" : "Paused"}
        </button>
      </div>

      {/* Webhook URL */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-gray-400 font-mono flex items-center">
          {webhookUrl}
        </div>
        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 transition-colors">
          <Copy className="w-4 h-4" />
        </button>
      </div>

      {/* Events */}
      <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {events.map((evt) => (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-orange-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-orange-400">{evt.event}</span>
                <span className="text-[9px] text-gray-500">{evt.timestamp}</span>
              </div>
              <pre className="text-[9px] text-gray-500 font-mono overflow-hidden">
                {JSON.stringify(evt.payload, null, 2)}
              </pre>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// API Metrics
function ApiMetrics() {
  const [metrics, setMetrics] = useState({
    requests: 45231,
    success: 99.8,
    latency: 142,
    errors: 0.02,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        requests: prev.requests + Math.floor(Math.random() * 10),
        success: 99.5 + Math.random() * 0.5,
        latency: Math.floor(120 + Math.random() * 50),
        errors: Math.random() * 0.05,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-white/10 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-bold text-white">API Metrics</h4>
        </div>
        <div className="text-[10px] text-gray-500">Last 24h</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-black/40">
          <div className="text-[10px] text-gray-500 mb-1">Total Requests</div>
          <div className="text-xl font-bold text-white">{metrics.requests.toLocaleString()}</div>
          <div className="text-[9px] text-emerald-400 mt-1">+12.5%</div>
        </div>
        <div className="p-3 rounded-lg bg-black/40">
          <div className="text-[10px] text-gray-500 mb-1">Success Rate</div>
          <div className="text-xl font-bold text-emerald-400">{metrics.success.toFixed(1)}%</div>
          <div className="w-full h-1 bg-gray-800 rounded-full mt-1">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${metrics.success}%` }} />
          </div>
        </div>
        <div className="p-3 rounded-lg bg-black/40">
          <div className="text-[10px] text-gray-500 mb-1">Avg Latency</div>
          <div className="text-xl font-bold text-cyan-400">{metrics.latency}ms</div>
          <div className="text-[9px] text-gray-500 mt-1">P95: 245ms</div>
        </div>
        <div className="p-3 rounded-lg bg-black/40">
          <div className="text-[10px] text-gray-500 mb-1">Error Rate</div>
          <div className="text-xl font-bold text-red-400">{metrics.errors.toFixed(2)}%</div>
          <div className="text-[9px] text-emerald-400 mt-1">Healthy</div>
        </div>
      </div>
    </div>
  );
}

// Main Component
export function IntegrationsContent() {
  const [activeTab, setActiveTab] = useState<"mesh" | "playground" | "webhooks">("mesh");

  const supportedIntegrations = [
    { name: "Stripe", category: "Payments", color: "purple" },
    { name: "Twilio", category: "SMS/Voice", color: "blue" },
    { name: "SendGrid", category: "Email", color: "emerald" },
    { name: "Salesforce", category: "CRM", color: "cyan" },
    { name: "Slack", category: "Chat", color: "amber" },
    { name: "Zapier", category: "Automation", color: "orange" },
    { name: "HubSpot", category: "Marketing", color: "red" },
    { name: "Shopify", category: "E-commerce", color: "emerald" },
  ];

  return (
    <div className="h-full bg-[#0a0f1a] text-gray-200 overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(20,184,166,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center">
              <Plug className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Integrations</h3>
              <p className="text-[10px] text-teal-400">APIs & Middleware</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
            {[
              { id: "mesh", label: "Mesh", icon: Layers },
              { id: "playground", label: "Playground", icon: Code2 },
              { id: "webhooks", label: "Webhooks", icon: Webhook },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
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
              {activeTab === "mesh" && <IntegrationMesh />}
              {activeTab === "playground" && <ApiPlayground />}
              {activeTab === "webhooks" && (
                <div className="space-y-4 h-full overflow-y-auto custom-scrollbar">
                  <WebhookTester />
                  <ApiMetrics />
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4 flex flex-col h-full">
              {activeTab !== "webhooks" && <ApiMetrics />}
              {activeTab === "webhooks" && <IntegrationMesh />}

              {/* Supported Integrations */}
              <div className="bg-[#0c0e12] rounded-xl border border-white/10 p-4 flex-1">
                <h4 className="text-sm font-bold text-white mb-3">Supported Integrations</h4>
                <div className="grid grid-cols-2 gap-2">
                  {supportedIntegrations.map((int) => (
                    <motion.div
                      key={int.name}
                      whileHover={{ scale: 1.02 }}
                      className={cn(
                        "p-3 rounded-lg bg-black/40 border border-white/5 hover:border-teal-500/30 transition-all cursor-pointer group"
                      )}
                    >
                      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2", `bg-${int.color}-500/10`)}>
                        <Zap className={cn("w-4 h-4", `text-${int.color}-400`)} />
                      </div>
                      <div className="text-xs font-medium text-white">{int.name}</div>
                      <div className="text-[9px] text-gray-500">{int.category}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Features */}
                <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2">
                  {[
                    { label: "REST", value: "100+", color: "teal" },
                    { label: "GraphQL", value: "20+", color: "purple" },
                    { label: "SOAP", value: "50+", color: "blue" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-2 rounded-lg bg-black/40">
                      <div className={cn("text-sm font-bold", `text-${stat.color}-400`)}>{stat.value}</div>
                      <div className="text-[8px] text-gray-500 uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-xl border border-teal-500/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                    <Key className="w-5 h-5 text-teal-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">Request API Access</h4>
                    <p className="text-[10px] text-gray-400">Get API keys in minutes</p>
                  </div>
                  <button className="p-2 rounded-lg bg-teal-500 hover:bg-teal-400 text-white transition-colors">
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

export default IntegrationsContent;