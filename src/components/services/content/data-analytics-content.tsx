"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database, BarChart3, PieChart, Activity, TrendingUp, Table2, 
  Share2, Filter, Download, Clock, CheckCircle2, AlertCircle,
  ChevronRight, Plus, Minus, RefreshCw, Search, FileJson, 
  Code2, Terminal, Settings, Eye, EyeOff, Zap, Layers,
  ArrowRight, ArrowDown, MoreHorizontal, Copy, Check,
  DatabaseBackup, LineChart, AreaChart, Play
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
interface PipelineStage {
  id: string;
  name: string;
  status: "running" | "completed" | "failed" | "pending";
  records: number;
  throughput: number;
}

interface DataSource {
  id: string;
  name: string;
  type: "database" | "api" | "file" | "stream";
  status: "connected" | "disconnected";
  records: number;
}

// ETL Pipeline Visualizer
function ETLPipeline() {
  const [stages, setStages] = useState<PipelineStage[]>([
    { id: "1", name: "Extract", status: "completed", records: 45000, throughput: 2500 },
    { id: "2", name: "Transform", status: "running", records: 42000, throughput: 1800 },
    { id: "3", name: "Load", status: "pending", records: 0, throughput: 0 },
  ]);

  const [sources] = useState<DataSource[]>([
    { id: "1", name: "Production DB", type: "database", status: "connected", records: 45000 },
    { id: "2", name: "Analytics API", type: "api", status: "connected", records: 12000 },
    { id: "3", name: "Event Stream", type: "stream", status: "connected", records: 89000 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStages(prev => prev.map(stage => {
        if (stage.status === "running") {
          return {
            ...stage,
            records: stage.records + Math.floor(Math.random() * 100),
            throughput: Math.floor(Math.random() * 500) + 1500,
          };
        }
        return stage;
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const runPipeline = () => {
    setStages(prev => prev.map((s, i) => ({ 
      ...s, 
      status: i === 0 ? "running" : "pending",
      records: i === 0 ? 0 : s.records 
    })));

    // Simulate pipeline progression
    setTimeout(() => setStages(prev => prev.map((s, i) => i === 0 ? { ...s, status: "completed", records: 45000 } : i === 1 ? { ...s, status: "running" } : s)), 2000);
    setTimeout(() => setStages(prev => prev.map((s, i) => i === 1 ? { ...s, status: "completed", records: 42000 } : i === 2 ? { ...s, status: "running" } : s)), 5000);
    setTimeout(() => setStages(prev => prev.map((s, i) => i === 2 ? { ...s, status: "completed", records: 42000 } : s)), 8000);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "completed": return "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";
      case "running": return "text-blue-400 bg-blue-500/10 border-blue-500/30 animate-pulse";
      case "failed": return "text-red-400 bg-red-500/10 border-red-500/30";
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/30";
    }
  };

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-violet-500/20 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-violet-400" />
          <h4 className="text-sm font-bold text-white">ETL Pipeline</h4>
        </div>
        <button
          onClick={runPipeline}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-medium hover:bg-violet-500/20 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Run Pipeline
        </button>
      </div>

      {/* Sources */}
      <div className="mb-4">
        <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">Data Sources</div>
        <div className="grid grid-cols-3 gap-2">
          {sources.map((source) => (
            <div key={source.id} className="p-2 rounded-lg bg-black/40 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                {source.type === "database" ? <Database className="w-3.5 h-3.5 text-blue-400" /> :
                 source.type === "api" ? <Code2 className="w-3.5 h-3.5 text-amber-400" /> :
                 <Activity className="w-3.5 h-3.5 text-red-400" />}
                <span className="text-[10px] text-gray-300">{source.name}</span>
              </div>
              <div className="text-xs font-bold text-white">{source.records.toLocaleString()}</div>
              <div className="text-[8px] text-gray-500">records</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline Flow */}
      <div className="flex-1 flex items-center justify-between px-2">
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.id}>
            <motion.div
              className={cn(
                "flex-1 p-3 rounded-lg border flex flex-col items-center text-center",
                getStatusColor(stage.status)
              )}
              animate={stage.status === "running" ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="text-xs font-bold mb-1">{stage.name}</div>
              <div className="text-lg font-bold">{stage.records.toLocaleString()}</div>
              <div className="text-[9px] opacity-70">
                {stage.status === "running" ? `${stage.throughput} rec/s` : stage.status}
              </div>
            </motion.div>
            {idx < stages.length - 1 && (
              <div className="w-8 flex items-center justify-center">
                <ArrowRight className={cn(
                  "w-5 h-5",
                  stage.status === "completed" ? "text-emerald-400" : "text-gray-700"
                )} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Destination */}
      <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DatabaseBackup className="w-5 h-5 text-violet-400" />
            <div>
              <div className="text-xs font-bold text-white">Data Warehouse</div>
              <div className="text-[9px] text-violet-400">Snowflake • 42K records loaded</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400">Last sync</div>
            <div className="text-[10px] text-emerald-400">2 mins ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Live Dashboard
function LiveDashboard() {
  const [metrics, setMetrics] = useState({
    revenue: 124500,
    users: 8942,
    conversion: 3.24,
    activeNow: 342,
  });

  const [chartData, setChartData] = useState([30, 45, 35, 55, 48, 62, 58, 75, 68, 82, 78, 90]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 1000) - 200,
        users: prev.users + Math.floor(Math.random() * 10),
        conversion: Math.max(0, prev.conversion + (Math.random() - 0.5) * 0.1),
        activeNow: Math.floor(Math.random() * 100) + 300,
      }));

      setChartData(prev => [...prev.slice(1), Math.floor(Math.random() * 40) + 50]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-pink-500/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-pink-400" />
          <h4 className="text-sm font-bold text-white">Live Dashboard</h4>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-black/40 border border-white/5">
          <div className="text-[10px] text-gray-500 mb-1">Revenue</div>
          <div className="text-xl font-bold text-white">${(metrics.revenue / 1000).toFixed(1)}k</div>
          <div className="text-[9px] text-emerald-400">+12.5%</div>
        </div>
        <div className="p-3 rounded-lg bg-black/40 border border-white/5">
          <div className="text-[10px] text-gray-500 mb-1">Active Users</div>
          <div className="text-xl font-bold text-pink-400">{metrics.users.toLocaleString()}</div>
          <div className="text-[9px] text-emerald-400">+5.2%</div>
        </div>
        <div className="p-3 rounded-lg bg-black/40 border border-white/5">
          <div className="text-[10px] text-gray-500 mb-1">Conversion</div>
          <div className="text-xl font-bold text-violet-400">{metrics.conversion.toFixed(2)}%</div>
          <div className="text-[9px] text-red-400">-0.3%</div>
        </div>
        <div className="p-3 rounded-lg bg-black/40 border border-white/5">
          <div className="text-[10px] text-gray-500 mb-1">Active Now</div>
          <div className="text-xl font-bold text-amber-400">{metrics.activeNow}</div>
          <div className="text-[9px] text-gray-500">current</div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-32 flex items-end gap-1">
        {chartData.map((value, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-violet-500/50 to-pink-500/50 rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${value}%` }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[9px] text-gray-500 mt-2">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>Now</span>
      </div>
    </div>
  );
}

// SQL Query Builder
function SQLQueryBuilder() {
  const [query, setQuery] = useState(`SELECT 
  user_id, 
  SUM(amount) as total_spent,
  COUNT(*) as transactions
FROM payments 
WHERE created_at >= '2024-01-01'
GROUP BY user_id
ORDER BY total_spent DESC
LIMIT 100;`);

  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any>(null);

  const runQuery = () => {
    setIsRunning(true);
    setTimeout(() => {
      setResults({
        rows: [
          { user_id: "user_001", total_spent: 12500, transactions: 45 },
          { user_id: "user_042", total_spent: 9800, transactions: 32 },
          { user_id: "user_128", total_spent: 8750, transactions: 28 },
          { user_id: "user_089", total_spent: 7200, transactions: 56 },
        ],
        executionTime: 0.45,
        rowCount: 100,
      });
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="bg-[#09090b] rounded-xl border border-white/10 p-4 font-mono text-xs h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-violet-400" />
          <span className="text-gray-300">Query Editor</span>
        </div>
        <button
          onClick={runQuery}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-400 text-[10px] hover:bg-violet-500/30 disabled:opacity-50 transition-colors"
        >
          {isRunning ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
          Run Query
        </button>
      </div>

      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full h-32 bg-black/40 border border-white/10 rounded-lg p-3 text-gray-300 resize-none focus:outline-none focus:border-violet-500/50 text-[11px] leading-relaxed"
        spellCheck={false}
      />

      {/* Results */}
      {results && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex-1 overflow-hidden"
        >
          <div className="flex items-center justify-between text-[10px] text-gray-500 mb-2">
            <span>Results ({results.rowCount} rows)</span>
            <span className="text-emerald-400">{results.executionTime}s</span>
          </div>
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full text-[10px]">
              <thead className="bg-white/5 text-gray-400">
                <tr>
                  {Object.keys(results.rows[0]).map((key) => (
                    <th key={key} className="text-left p-2 font-medium">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {results.rows.map((row: any, i: number) => (
                  <tr key={i} className="border-t border-white/5">
                    {Object.values(row).map((val: any, j) => (
                      <td key={j} className="p-2">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Data Warehouse Schema
function WarehouseSchema() {
  const [selectedTable, setSelectedTable] = useState<string | null>("users");

  const tables = [
    { name: "users", columns: ["id", "email", "created_at", "last_login"], type: "dimension" },
    { name: "payments", columns: ["id", "user_id", "amount", "status", "created_at"], type: "fact" },
    { name: "events", columns: ["id", "user_id", "event_type", "properties", "timestamp"], type: "fact" },
    { name: "products", columns: ["id", "name", "price", "category"], type: "dimension" },
  ];

  return (
    <div className="bg-[#0c0e12] rounded-xl border border-indigo-500/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-400" />
          <h4 className="text-sm font-bold text-white">Data Warehouse</h4>
        </div>
        <div className="text-[10px] text-gray-500">Snowflake Schema</div>
      </div>

      {/* Tables */}
      <div className="space-y-2">
        {tables.map((table) => (
          <motion.div
            key={table.name}
            onClick={() => setSelectedTable(table.name)}
            className={cn(
              "p-3 rounded-lg border cursor-pointer transition-all",
              selectedTable === table.name 
                ? "bg-indigo-500/10 border-indigo-500/30" 
                : "bg-black/40 border-white/5 hover:border-white/20"
            )}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Table2 className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-medium text-white">{table.name}</span>
              </div>
              <span className={cn(
                "text-[9px] px-2 py-0.5 rounded border",
                table.type === "fact" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" : "bg-blue-500/10 text-blue-400 border-blue-500/30"
              )}>
                {table.type}
              </span>
            </div>

            {selectedTable === table.name && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="pt-2 border-t border-white/10"
              >
                <div className="flex flex-wrap gap-1">
                  {table.columns.map((col) => (
                    <span key={col} className="text-[9px] px-2 py-0.5 rounded bg-white/5 text-gray-400">
                      {col}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Storage Stats */}
      <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
        <div className="text-center p-2 rounded-lg bg-black/40">
          <div className="text-lg font-bold text-white">2.4TB</div>
          <div className="text-[9px] text-gray-500">Total Storage</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-black/40">
          <div className="text-lg font-bold text-indigo-400">42ms</div>
          <div className="text-[9px] text-gray-500">Avg Query Time</div>
        </div>
      </div>
    </div>
  );
}

// Main Component
export function DataAnalyticsContent() {
  const [activeTab, setActiveTab] = useState<"pipeline" | "warehouse" | "queries">("pipeline");

  const tools = [
    { icon: Database, name: "Snowflake", category: "Warehouse" },
    { icon: Activity, name: "Apache Kafka", category: "Streaming" },
    { icon: BarChart3, name: "Looker", category: "BI" },
    { icon: LineChart, name: "dbt", category: "Transform" },
  ];

  return (
    <div className="h-full bg-[#0a0f1a] text-gray-200 overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Data & Analytics</h3>
              <p className="text-[10px] text-violet-400">Pipelines & BI</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
            {[
              { id: "pipeline", label: "Pipeline", icon: Layers },
              { id: "warehouse", label: "Warehouse", icon: Database },
              { id: "queries", label: "SQL", icon: Terminal },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-violet-500/20 text-violet-400 border border-violet-500/30"
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
              {activeTab === "pipeline" && <ETLPipeline />}
              {activeTab === "warehouse" && <WarehouseSchema />}
              {activeTab === "queries" && <SQLQueryBuilder />}
            </div>

            {/* Right Column */}
            <div className="space-y-4 flex flex-col h-full">
              {activeTab !== "pipeline" && <ETLPipeline />}
              {activeTab === "pipeline" && (
                <>
                  <LiveDashboard />
                  <WarehouseSchema />
                </>
              )}

              {/* Tools Grid */}
              <div className="bg-[#0c0e12] rounded-xl border border-white/10 p-4 flex-1">
                <h4 className="text-sm font-bold text-white mb-3">Data Stack</h4>
                <div className="grid grid-cols-2 gap-2">
                  {tools.map((tool) => (
                    <motion.div
                      key={tool.name}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-violet-500/30 transition-colors cursor-pointer group"
                    >
                      <tool.icon className="w-5 h-5 text-violet-400 mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xs font-medium text-white">{tool.name}</div>
                      <div className="text-[9px] text-gray-500">{tool.category}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "Uptime", value: "99.9%", color: "emerald" },
                    { label: "Pipelines", value: "24", color: "violet" },
                    { label: "Latency", value: "42ms", color: "pink" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-2 rounded-lg bg-black/40">
                      <div className={cn("text-sm font-bold", `text-${stat.color}-400`)}>{stat.value}</div>
                      <div className="text-[8px] text-gray-500 uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-violet-500/20 to-pink-500/20 rounded-xl border border-violet-500/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-white">Unlock Your Data</h4>
                    <p className="text-[10px] text-gray-400">Modern data stack in 2 weeks</p>
                  </div>
                  <button className="p-2 rounded-lg bg-violet-500 hover:bg-violet-400 text-white transition-colors">
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

export default DataAnalyticsContent;