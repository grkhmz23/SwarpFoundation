"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useIntervalWhenVisible } from "@/components/services/service-content-wrapper";
import {
  Terminal,
  Settings,
  Shield,
  Users,
  Code2,
  Laptop,
  Check,
  Download,
  Cpu,
  Lock,
  FileJson,
  LayoutTemplate,
  ChevronRight,
  RefreshCw,
  Calendar,
  Mic,
  Video,
  MonitorUp,
  PhoneOff,
  Search,
  Bell,
  MoreVertical,
  Plus,
  Filter,
  Clock,
  X,
  Wrench,
} from "lucide-react";
import {
  ServiceContentLayout,
  ServiceHeader,
  ServiceCard,
  ServiceTab,
  ServiceCTA,
} from "../service-content-layout";

type ProductType = "meeting" | "admin" | "dev" | "planner";
type PlatformType = "desktop" | "web";

interface ConfigState {
  type: ProductType;
  platform: PlatformType;
  scale: string;
  modules: {
    sso: boolean;
    rbac: boolean;
    offline: boolean;
    audit: boolean;
    autoUpdate: boolean;
    integrations: boolean;
  };
}

// Sidebar Icon
const SidebarIcon = ({
  icon: Icon,
  active,
  color,
  onClick,
}: {
  icon: React.ElementType;
  active: boolean;
  color: string;
  onClick: () => void;
}) => {
  const activeClass: Record<string, string> = {
    cyan: "bg-cyan-500 text-white shadow-[0_0_15px_-3px_rgba(6,182,212,0.6)]",
    violet: "bg-violet-600 text-white shadow-[0_0_15px_-3px_rgba(139,92,246,0.6)]",
    pink: "bg-pink-500 text-white shadow-[0_0_15px_-3px_rgba(236,72,153,0.6)]",
    emerald: "bg-emerald-500 text-white shadow-[0_0_15px_-3px_rgba(16,185,129,0.6)]",
  };

  return (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-xl transition-all duration-300 cursor-pointer hover:scale-105 relative ${
        active ? activeClass[color] : "text-gray-500 hover:bg-white/10 hover:text-gray-300"
      }`}
    >
      <Icon className="w-5 h-5" />
      {active && <div className="absolute inset-0 rounded-xl bg-white/20 animate-pulse pointer-events-none" />}
    </button>
  );
};

// File Tree Item
const FileTreeItem = ({
  name,
  type,
  isOpen,
  active,
}: {
  name: string;
  type: "folder" | "file";
  isOpen?: boolean;
  active?: boolean;
}) => (
  <div
    className={`flex items-center gap-1.5 py-1 px-2 rounded cursor-pointer ${
      active ? "bg-emerald-500/10 text-emerald-400" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
    }`}
  >
    {type === "folder" && (
      <ChevronRight size={12} className={`transition-transform ${isOpen ? "rotate-90" : ""}`} />
    )}
    {type === "folder" ? (
      <LayoutTemplate size={12} className="text-blue-400" />
    ) : (
      <FileJson size={12} className="text-yellow-400" />
    )}
    <span>{name}</span>
  </div>
);

// Terminal Simulation
const TerminalSimulation = () => {
  const [lines, setLines] = useState<string[]>([]);
  const currentLineRef = useRef(0);
  const fullText = [
    "> swarp init --template=saas-starter",
    "✔ Validating configuration...",
    "✔ Downloading boilerplate...",
    "✔ Installing dependencies (modules: rbac, sso)...",
    "> swarp ship",
    "Building production bundle...",
    "Done in 2.4s. App is live at https://app.swarp.dev",
  ];

  const addLine = useCallback(() => {
    if (currentLineRef.current >= fullText.length) {
      return;
    }
    setLines((prev) => [...prev, fullText[currentLineRef.current]]);
    currentLineRef.current++;
  }, []);

  useEffect(() => {
    setLines([]);
    currentLineRef.current = 0;
  }, []);

  useIntervalWhenVisible(addLine, 800);

  return (
    <div className="h-full font-mono text-xs overflow-y-auto">
      {lines.map((line, i) => (
        <div key={i} className="mb-1">
          {line.startsWith(">") ? <span className="text-gray-400 mr-2">$</span> : null}
          {line.startsWith(">") ? (
            <span className="text-gray-200">{line.substring(2)}</span>
          ) : line.startsWith("✔") ? (
            <span className="text-emerald-400">{line}</span>
          ) : (
            <span className="text-gray-500">{line}</span>
          )}
        </div>
      ))}
      <div className="flex items-center gap-1 mt-1">
        <span className="text-emerald-500">➜</span>
        <span className="text-swarp-purple">~</span>
        <div className="w-2 h-4 bg-gray-500 animate-pulse" />
      </div>
    </div>
  );
};

// App Content Renderer
const AppContent = ({ config }: { config: ConfigState }) => {
  // MEETING APP
  if (config.type === "meeting") {
    return (
      <div className="flex flex-col h-full bg-[#0c0e12] p-4 gap-4">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="relative rounded-2xl bg-gray-800 overflow-hidden border border-gray-700/50 group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-swarp-purple to-swarp-blue flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                JD
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-medium border border-white/10">
                John Doe
              </span>
              <div className="p-1.5 rounded-full bg-swarp-purple text-white shadow-lg shadow-swarp-purple/50">
                <Mic size={14} />
              </div>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="text-white drop-shadow-md" size={20} />
            </div>
          </div>

          <div className="relative rounded-2xl bg-gray-800 overflow-hidden border-2 border-swarp-purple/50 shadow-[0_0_30px_-10px_rgba(157,78,221,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-bl from-gray-800 to-black" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-1 h-12">
                {[40, 70, 45, 90, 60, 50, 80].map((h, i) => (
                  <div
                    key={i}
                    className="w-2 bg-swarp-purple rounded-full animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-medium border border-white/10">
                Sarah Smith (Speaking)
              </span>
              <div className="p-1.5 rounded-full bg-gray-700/50 text-white border border-white/10">
                <Mic size={14} />
              </div>
            </div>
          </div>
        </div>

        <div className="h-16 rounded-2xl bg-[#09090b]/80 backdrop-blur-xl border border-white/5 flex items-center justify-center gap-6 px-8 shadow-2xl">
          <button className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors border border-gray-700">
            <Mic size={20} />
          </button>
          <button className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors border border-gray-700">
            <Video size={20} />
          </button>
          <button className="p-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105">
            <PhoneOff size={24} />
          </button>
          <button className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors border border-gray-700">
            <MonitorUp size={20} />
          </button>
          <button className="p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors border border-gray-700">
            <Users size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ADMIN APP
  if (config.type === "admin") {
    return (
      <div className="flex flex-col h-full bg-[#0c0e12] p-6">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Users</h3>
            <p className="text-gray-500 text-xs">Manage access and permissions across the organization.</p>
          </div>
          <button className="flex items-center gap-2 bg-swarp-purple hover:bg-swarp-purple/80 text-white px-4 py-2 rounded-lg text-xs font-medium shadow-lg shadow-swarp-purple/20 transition-all">
            <Plus size={14} /> Add User
          </button>
        </div>

        <div className="w-full bg-[#09090b]/50 rounded-xl border border-gray-800 flex-1 overflow-hidden shadow-sm flex flex-col">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 bg-[#09090b]/80 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <div className="col-span-4">User</div>
            <div className="col-span-3">Role</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-2 text-right">Last Active</div>
          </div>
          <div className="flex-1 overflow-auto">
            {[
              { name: "Alex Morgan", email: "alex@swarp.com", role: "Admin", status: "active", time: "2m ago" },
              { name: "Sarah Connor", email: "sarah@swarp.com", role: "Developer", status: "active", time: "1h ago" },
              { name: "James Bond", email: "007@mi6.gov", role: "Viewer", status: "pending", time: "1d ago" },
              { name: "Ellen Ripley", email: "ellen@weyland.co", role: "Manager", status: "active", time: "4h ago" },
            ].map((user, i) => (
              <div
                key={i}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800/50 items-center hover:bg-white/[0.02] transition-colors group cursor-pointer"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-gray-600 flex items-center justify-center text-xs font-medium text-white">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-200">{user.name}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                </div>
                <div className="col-span-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-800 text-gray-300 border border-gray-700">
                    <Shield size={10} className="text-swarp-purple" /> {user.role}
                  </span>
                </div>
                <div className="col-span-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                      user.status === "active"
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}
                  >
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        user.status === "active" ? "bg-emerald-400" : "bg-amber-400"
                      } animate-pulse`}
                    />
                    {user.status}
                  </span>
                </div>
                <div className="col-span-2 text-right text-xs text-gray-500 font-mono">{user.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // PLANNER APP
  if (config.type === "planner") {
    return (
      <div className="flex flex-col h-full bg-[#0c0e12] p-6 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-white">Sprint 24</h3>
            <div className="h-6 w-px bg-gray-800" />
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#0c0e12] bg-gray-800 flex items-center justify-center text-xs text-gray-400 hover:z-10 transition-all hover:scale-110 cursor-pointer"
                >
                  {i}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-[#0c0e12] bg-gray-800 flex items-center justify-center text-xs text-gray-400">
                +4
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white border border-gray-700">
              <Filter size={16} />
            </button>
            <button className="flex items-center gap-2 bg-swarp-purple hover:bg-swarp-purple/80 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg shadow-swarp-purple/20">
              <Plus size={14} /> New Task
            </button>
          </div>
        </div>

        <div className="flex gap-4 h-full overflow-hidden">
          {[
            { title: "To Do", count: 4, color: "border-gray-600" },
            { title: "In Progress", count: 2, color: "border-swarp-blue" },
            { title: "Done", count: 8, color: "border-green-500" },
          ].map((col, i) => (
            <div key={i} className="flex-1 flex flex-col gap-3 min-w-[200px]">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full border-2 ${col.color} bg-transparent`} />
                  {col.title}
                </div>
                <span className="text-[10px] bg-gray-800 px-1.5 py-0.5 rounded text-gray-500">{col.count}</span>
              </div>

              <div className="bg-[#14161b] p-4 rounded-xl border border-gray-800 hover:border-gray-600 transition-all hover:shadow-xl group cursor-grab active:cursor-grabbing relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-gray-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded bg-swarp-purple/10 text-swarp-purple text-[10px] font-medium border border-swarp-purple/20">
                    Frontend
                  </span>
                  <span className="px-2 py-0.5 rounded bg-gray-800 text-gray-500 text-[10px] border border-gray-700">
                    High
                  </span>
                </div>
                <h4 className="text-sm font-medium text-gray-200 mb-2 leading-snug">
                  Implement new authentication flow
                </h4>
                <div className="w-full h-1 bg-gray-800 rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-swarp-purple w-2/3" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    <div className="w-5 h-5 rounded-full bg-gray-700 border border-[#14161b]" />
                    <div className="w-5 h-5 rounded-full bg-gray-600 border border-[#14161b]" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-gray-500">
                    <Clock size={10} /> 2d
                  </div>
                </div>
              </div>

              {i === 1 && (
                <div className="bg-[#14161b] p-4 rounded-xl border border-swarp-blue/30 shadow-[0_0_15px_-5px_rgba(0,212,255,0.2)] cursor-grab">
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded bg-swarp-blue/10 text-swarp-blue text-[10px] font-medium border border-swarp-blue/20">
                      Backend
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-gray-200 mb-2 leading-snug">API Rate limiting middleware</h4>
                  <div className="flex items-center justify-between mt-4">
                    <div className="w-5 h-5 rounded-full bg-indigo-500 border border-[#14161b] flex items-center justify-center text-[8px] text-white">
                      JD
                    </div>
                    <div className="text-[10px] text-swarp-blue font-mono">#432</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // DEV TOOL
  if (config.type === "dev") {
    return (
      <div className="flex h-full bg-[#0c0e12] font-mono text-xs">
        <div className="w-48 border-r border-gray-800 bg-[#09090b] flex flex-col">
          <div className="p-3 text-gray-500 font-bold text-[10px] tracking-wider uppercase">Explorer</div>
          <div className="flex flex-col gap-1 px-2">
            <FileTreeItem name="src" type="folder" isOpen />
            <div className="pl-4 flex flex-col gap-1">
              <FileTreeItem name="components" type="folder" />
              <FileTreeItem name="lib" type="folder" />
              <FileTreeItem name="App.tsx" type="file" active />
              <FileTreeItem name="main.tsx" type="file" />
            </div>
            <FileTreeItem name="package.json" type="file" />
            <FileTreeItem name="tsconfig.json" type="file" />
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="flex border-b border-gray-800 bg-[#09090b]">
            <div className="px-4 py-2 bg-[#0c0e12] border-r border-gray-800 border-t-2 border-t-emerald-500 text-gray-200 flex items-center gap-2">
              <span className="text-emerald-500">TSX</span> App.tsx
              <X size={12} className="ml-2 text-gray-500 hover:text-white cursor-pointer" />
            </div>
            <div className="px-4 py-2 text-gray-500 flex items-center gap-2 hover:bg-[#15171b] cursor-pointer">
              package.json
            </div>
          </div>
          <div className="flex-1 p-4 text-gray-400 leading-relaxed overflow-hidden relative">
            <div className="absolute left-4 top-4 bottom-4 w-px bg-gray-800" />
            <div className="pl-6 font-mono text-sm">
              <span className="text-violet-400">import</span> <span className="text-blue-400">{`{ useState }`}</span>{" "}
              <span className="text-violet-400">from</span> <span className="text-emerald-300">&apos;react&apos;</span>;
              <br />
              <br />
              <span className="text-violet-400">export default function</span>{" "}
              <span className="text-yellow-300">App</span>() {"{"}
              <br />
              &nbsp;&nbsp;<span className="text-violet-400">const</span> [count, setCount] ={" "}
              <span className="text-blue-400">useState</span>(<span className="text-orange-400">0</span>);
              <br />
              <br />
              &nbsp;&nbsp;<span className="text-violet-400">return</span> (
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-pink-400">div</span>{" "}
              <span className="text-blue-300">className</span>=<span className="text-emerald-300">&quot;app-container&quot;</span>
              &gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-pink-400">h1</span>&gt;Hello Swarp&lt;/
              <span className="text-pink-400">h1</span>&gt;
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-pink-400">div</span>&gt;
              <br />
              &nbsp;&nbsp;);
              <br />
              {"}"}
            </div>
          </div>

          <div className="h-32 border-t border-gray-800 bg-[#09090b]">
            <div className="flex items-center justify-between px-4 py-1 border-b border-gray-800 text-[10px] uppercase text-gray-500 font-bold">
              <div className="flex gap-4">
                <span className="text-white border-b border-white pb-1">Terminal</span>
                <span>Output</span>
                <span>Problems</span>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-700 hover:bg-gray-500 cursor-pointer" />
                <div className="w-2 h-2 rounded-full bg-gray-700 hover:bg-gray-500 cursor-pointer" />
              </div>
            </div>
            <div className="p-2 h-full overflow-hidden">
              <TerminalSimulation />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Installer Tab
const InstallerTab = () => {
  const [progress, setProgress] = useState(0);
  const steps = ["Downloading Package...", "Verifying Signature...", "Extracting Files...", "Launching App..."];
  const step = progress < 25 ? 0 : progress < 50 ? 1 : progress < 90 ? 2 : 3;

  useEffect(() => {
    if (progress < 100) {
      const timer = setTimeout(() => setProgress((p) => p + 1), 50);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <div className="p-8 flex flex-col items-center justify-center h-full relative">
      <div className="w-20 h-20 bg-gradient-to-br from-swarp-purple to-swarp-blue rounded-3xl mb-8 shadow-2xl shadow-swarp-purple/20 flex items-center justify-center ring-1 ring-white/10 relative z-10">
        <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm" />
        <Cpu className="text-white w-10 h-10 relative z-10" />
      </div>

      <h3 className="text-white text-xl font-bold mb-2 tracking-tight">Swarp Client Setup</h3>
      <p className="text-gray-400 text-sm mb-10 font-medium">
        {progress < 100 ? steps[step] : "Installation Complete"}
      </p>

      <div className="w-full max-w-xs bg-gray-800/50 border border-gray-700 h-3 rounded-full overflow-hidden mb-3 relative">
        <div
          className="h-full bg-gradient-to-r from-swarp-purple to-swarp-blue transition-all duration-75 ease-linear relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
      <div className="flex justify-between w-full max-w-xs text-[10px] text-gray-500 font-mono mb-12 uppercase tracking-widest">
        <span>Init</span>
        <span>{progress}%</span>
      </div>

      <button
        onClick={() => setProgress(0)}
        className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-all border border-gray-700 hover:border-gray-500 hover:bg-gray-800 px-5 py-2.5 rounded-lg font-medium"
      >
        <RefreshCw size={14} className={progress < 100 ? "animate-spin" : ""} />{" "}
        {progress < 100 ? "Installing..." : "Replay Demo"}
      </button>
    </div>
  );
};

// DevTools Tab
const DevToolsTab = () => {
  const logs = [
    { type: "INFO", msg: "AuthService initialized", time: "10:00:01" },
    { type: "NET", msg: "POST /api/v1/sync 200 OK", time: "10:00:02" },
    { type: "WARN", msg: "Cache miss for key: user_settings", time: "10:00:03" },
    { type: "INFO", msg: "WebSocket connection established", time: "10:00:04" },
    { type: "NET", msg: "GET /api/v1/notifications 200 OK", time: "10:00:05" },
  ];

  return (
    <div className="flex flex-col h-full font-mono text-xs bg-[#0c0e12]">
      <div className="bg-[#09090b] border-b border-gray-800 p-3 flex gap-6 text-gray-500 font-medium">
        <span className="text-gray-200 border-b-2 border-swarp-purple pb-3 -mb-3.5 z-10">Console</span>
        <span className="hover:text-gray-300 cursor-pointer">Network</span>
        <span className="hover:text-gray-300 cursor-pointer">Application</span>
        <span className="hover:text-gray-300 cursor-pointer">Performance</span>
      </div>
      <div className="p-4 space-y-1">
        {logs.map((log, i) => (
          <div
            key={i}
            className="flex gap-4 border-b border-gray-800/30 pb-2 hover:bg-white/5 p-1 rounded transition-colors cursor-pointer group"
          >
            <span className="text-gray-600 w-16 group-hover:text-gray-500">{log.time}</span>
            <span
              className={`w-10 font-bold ${
                log.type === "INFO" ? "text-swarp-purple" : log.type === "NET" ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {log.type}
            </span>
            <span className="text-gray-400 group-hover:text-gray-200">{log.msg}</span>
          </div>
        ))}
        <div className="flex gap-2 items-center text-gray-500 pt-2 pl-1">
          <ChevronRight size={14} />
          <span className="animate-pulse w-2 h-4 bg-gray-600 block" />
        </div>
      </div>
    </div>
  );
};

// Release Pipeline Tab
const ReleasePipelineTab = () => {
  return (
    <div className="h-full flex items-center justify-center p-8 relative overflow-hidden bg-[#0c0e12]">
      <div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
      />

      <div className="flex items-center gap-4 relative z-10">
        {["Build", "Test", "Sign", "Deploy"].map((step, i) => (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center gap-3 group">
              <div
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center bg-[#09090b] z-10 shadow-xl transition-all duration-500 ${
                  i === 3
                    ? "border-emerald-500 text-emerald-400 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] scale-110"
                    : "border-gray-800 text-gray-500 group-hover:border-gray-600 group-hover:text-gray-300"
                }`}
              >
                {i === 0 && <Code2 size={20} />}
                {i === 1 && <Shield size={20} />}
                {i === 2 && <Lock size={20} />}
                {i === 3 && <Download size={20} />}
              </div>
              <span
                className={`text-[10px] font-mono uppercase tracking-widest font-bold transition-colors ${
                  i === 3 ? "text-emerald-500" : "text-gray-600"
                }`}
              >
                {step}
              </span>
            </div>
            {i < 3 && <div className="w-16 h-0.5 bg-gray-800 relative mx-4 rounded-full overflow-hidden" />}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
export function SoftwareToolsContent() {
  const [config, setConfig] = useState<ConfigState>({
    type: "meeting",
    platform: "desktop",
    scale: "company",
    modules: {
      sso: true,
      rbac: true,
      offline: false,
      audit: true,
      autoUpdate: true,
      integrations: false,
    },
  });

  const [activeTab, setActiveTab] = useState<"installer" | "devtools" | "release">("installer");

  const toggleModule = (key: keyof typeof config.modules) => {
    setConfig((prev) => ({
      ...prev,
      modules: { ...prev.modules, [key]: !prev.modules[key] },
    }));
  };

  return (
    <ServiceContentLayout accentColor="purple">
      <div className="px-4 py-6">
        {/* Header */}
        <ServiceHeader
          icon={<Wrench className="w-5 h-5" />}
          title="Software Tools"
          subtitle="CLI & Desktop Apps"
          accentColor="purple"
        />

        {/* Content */}
        <div className="mt-6 space-y-6">
          {/* Description */}
          <p className="text-sm text-gray-400">
            Internal business tools, desktop apps, private meeting rooms, and developer tooling.
          </p>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Desktop + Web", icon: Laptop },
              { label: "Secure by design", icon: Shield },
              { label: "Shipped + maintained", icon: Check },
            ].map((chip, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300"
              >
                <chip.icon className="w-4 h-4 text-swarp-purple" />
                {chip.label}
              </div>
            ))}
          </div>

          {/* Desktop Preview */}
          <div className="relative rounded-xl bg-[#09090b] border border-gray-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
            <div className="h-10 bg-[#09090b] border-b border-gray-800/80 flex items-center px-4 justify-between select-none">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
                <Lock size={10} className="text-gray-600" />
                Swarp Studio — {config.type === "dev" ? "Terminal" : "v2.4.0"}
              </div>
              <div className="w-14" />
            </div>

            <div className="flex h-[320px] bg-[#0c0e12] relative overflow-hidden">
              {/* Sidebar */}
              <div className="w-[72px] border-r border-gray-800/40 flex flex-col items-center py-6 gap-4 bg-[#09090b]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-swarp-purple to-swarp-blue flex items-center justify-center shadow-lg text-white font-bold text-lg">
                  S
                </div>
                <div className="w-full h-px bg-gray-800/50 my-2" />

                <SidebarIcon
                  icon={Users}
                  active={config.type === "meeting"}
                  color="cyan"
                  onClick={() => setConfig((p) => ({ ...p, type: "meeting" }))}
                />
                <SidebarIcon
                  icon={LayoutTemplate}
                  active={config.type === "admin"}
                  color="violet"
                  onClick={() => setConfig((p) => ({ ...p, type: "admin" }))}
                />
                <SidebarIcon
                  icon={Calendar}
                  active={config.type === "planner"}
                  color="pink"
                  onClick={() => setConfig((p) => ({ ...p, type: "planner" }))}
                />
                <SidebarIcon
                  icon={Terminal}
                  active={config.type === "dev"}
                  color="emerald"
                  onClick={() => setConfig((p) => ({ ...p, type: "dev" }))}
                />

                <div className="mt-auto">
                  <Settings className="w-5 h-5 text-gray-600 hover:text-gray-400 cursor-pointer" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 relative flex flex-col">
                <div className="h-12 border-b border-gray-800/40 bg-[#09090b]/50 flex items-center justify-between px-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-sm font-medium text-white">
                      {config.type === "meeting" && "Standup / Engineering Team"}
                      {config.type === "admin" && "Users / Management"}
                      {config.type === "planner" && "Product / Roadmap Q3"}
                      {config.type === "dev" && "Terminal / Localhost:3000"}
                    </h2>
                    {config.modules.audit && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-gray-800 text-gray-400 border border-gray-700">
                        Audit Log Active
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <Search className="w-4 h-4 text-gray-500" />
                    <Bell className="w-4 h-4 text-gray-500" />
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
                  <AppContent config={config} />
                </div>
              </div>
            </div>
          </div>

          {/* Configurator + Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Configurator */}
            <ServiceCard accentColor="purple" title="Configurator" icon={<Settings className="w-4 h-4" />}>
              <p className="text-gray-400 text-xs mb-4">Define your requirements. We build to spec.</p>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Product Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "meeting", label: "Private Meeting App" },
                      { id: "admin", label: "Internal Admin Tool" },
                      { id: "planner", label: "Task Planner" },
                      { id: "dev", label: "Developer Tooling" },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setConfig((prev) => ({ ...prev, type: option.id as ProductType }))}
                        className={`px-3 py-2 text-xs text-left rounded-md border transition-all ${
                          config.type === option.id
                            ? "bg-swarp-purple/20 border-swarp-purple/50 text-swarp-purple"
                            : "bg-swarp-dark border-gray-800 text-gray-400 hover:border-gray-700"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Platform</label>
                  <div className="flex bg-swarp-dark p-1 rounded-lg border border-gray-800">
                    <button
                      onClick={() => setConfig((prev) => ({ ...prev, platform: "desktop" }))}
                      className={`flex-1 py-1.5 text-xs rounded-md transition-all ${
                        config.platform === "desktop" ? "bg-gray-800 text-white" : "text-gray-500"
                      }`}
                    >
                      Desktop
                    </button>
                    <button
                      onClick={() => setConfig((prev) => ({ ...prev, platform: "web" }))}
                      className={`flex-1 py-1.5 text-xs rounded-md transition-all ${
                        config.platform === "web" ? "bg-gray-800 text-white" : "text-gray-500"
                      }`}
                    >
                      Web
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Modules</label>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    {Object.entries(config.modules).map(([key, isActive]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-xs text-gray-300 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                        <button
                          onClick={() => toggleModule(key as keyof typeof config.modules)}
                          className={`w-8 h-4 rounded-full relative transition-colors ${
                            isActive ? "bg-swarp-purple" : "bg-gray-700"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
                              isActive ? "left-4.5" : "left-0.5"
                            }`}
                            style={{ left: isActive ? "calc(100% - 14px)" : "2px" }}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ServiceCard>

            {/* Release Pipeline */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">Release Pipeline</h2>
                <div className="flex gap-1">
                  {(["installer", "devtools", "release"] as const).map((tab) => (
                    <ServiceTab
                      key={tab}
                      isActive={activeTab === tab}
                      onClick={() => setActiveTab(tab)}
                      accentColor="purple"
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </ServiceTab>
                  ))}
                </div>
              </div>

              <div className="bg-[#09090b] border border-gray-800 rounded-xl overflow-hidden h-[280px]">
                {activeTab === "installer" && <InstallerTab />}
                {activeTab === "devtools" && <DevToolsTab />}
                {activeTab === "release" && <ReleasePipelineTab />}
              </div>
            </div>
          </div>

          {/* CTA */}
          <ServiceCTA
            title="Ready to build your tool?"
            description="Get a custom software solution tailored to your workflow."
            accentColor="purple"
          />
        </div>
      </div>
    </ServiceContentLayout>
  );
}

export default SoftwareToolsContent;
