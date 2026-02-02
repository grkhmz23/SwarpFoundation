"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";

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
        active ? activeClass[color] : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
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
      active ? "bg-emerald-500/10 text-emerald-400" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
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
  const fullText = [
    "> swarp init --template=saas-starter",
    "✔ Validating configuration...",
    "✔ Downloading boilerplate...",
    "✔ Installing dependencies (modules: rbac, sso)...",
    "> swarp ship",
    "Building production bundle...",
    "Done in 2.4s. App is live at https://app.swarp.dev",
  ];

  useEffect(() => {
    setLines([]);
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine >= fullText.length) {
        clearInterval(interval);
        return;
      }
      setLines((prev) => [...prev, fullText[currentLine]]);
      currentLine++;
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full font-mono text-xs overflow-y-auto">
      {lines.map((line, i) => (
        <div key={i} className="mb-1">
          {line.startsWith(">") ? <span className="text-slate-400 mr-2">$</span> : null}
          {line.startsWith(">") ? (
            <span className="text-slate-200">{line.substring(2)}</span>
          ) : line.startsWith("✔") ? (
            <span className="text-emerald-400">{line}</span>
          ) : (
            <span className="text-slate-500">{line}</span>
          )}
        </div>
      ))}
      <div className="flex items-center gap-1 mt-1">
        <span className="text-emerald-500">➜</span>
        <span className="text-cyan-500">~</span>
        <div className="w-2 h-4 bg-slate-500 animate-pulse" />
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
          <div className="relative rounded-2xl bg-slate-800 overflow-hidden border border-slate-700/50 group">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-2xl font-bold text-white shadow-xl">
                JD
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-medium border border-white/10">
                John Doe
              </span>
              <div className="p-1.5 rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/50">
                <Mic size={14} />
              </div>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="text-white drop-shadow-md" size={20} />
            </div>
          </div>

          <div className="relative rounded-2xl bg-slate-800 overflow-hidden border-2 border-cyan-500/50 shadow-[0_0_30px_-10px_rgba(6,182,212,0.3)]">
            <div className="absolute inset-0 bg-gradient-to-bl from-slate-800 to-black" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-1 h-12">
                {[40, 70, 45, 90, 60, 50, 80].map((h, i) => (
                  <div
                    key={i}
                    className="w-2 bg-cyan-400 rounded-full animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <span className="bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-medium border border-white/10">
                Sarah Smith (Speaking)
              </span>
              <div className="p-1.5 rounded-full bg-slate-700/50 text-white border border-white/10">
                <Mic size={14} />
              </div>
            </div>
          </div>
        </div>

        <div className="h-16 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/5 flex items-center justify-center gap-6 px-8 shadow-2xl">
          <button className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-slate-700">
            <Mic size={20} />
          </button>
          <button className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-slate-700">
            <Video size={20} />
          </button>
          <button className="p-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition-all hover:scale-105">
            <PhoneOff size={24} />
          </button>
          <button className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-slate-700">
            <MonitorUp size={20} />
          </button>
          <button className="p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors border border-slate-700">
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
            <p className="text-slate-500 text-xs">Manage access and permissions across the organization.</p>
          </div>
          <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-xs font-medium shadow-lg shadow-violet-900/20 transition-all">
            <Plus size={14} /> Add User
          </button>
        </div>

        <div className="w-full bg-slate-900/50 rounded-xl border border-slate-800 flex-1 overflow-hidden shadow-sm flex flex-col">
          <div className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800 bg-slate-900/80 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
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
                className="grid grid-cols-12 gap-4 p-4 border-b border-slate-800/50 items-center hover:bg-white/[0.02] transition-colors group cursor-pointer"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-xs font-medium text-white">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                </div>
                <div className="col-span-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    <Shield size={10} className="text-violet-400" /> {user.role}
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
                <div className="col-span-2 text-right text-xs text-slate-500 font-mono">{user.time}</div>
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
            <div className="h-6 w-px bg-slate-800" />
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#0c0e12] bg-slate-800 flex items-center justify-center text-xs text-slate-400 hover:z-10 transition-all hover:scale-110 cursor-pointer"
                >
                  {i}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-[#0c0e12] bg-slate-800 flex items-center justify-center text-xs text-slate-400">
                +4
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700">
              <Filter size={16} />
            </button>
            <button className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-3 py-2 rounded-lg text-xs font-medium shadow-lg shadow-pink-900/20">
              <Plus size={14} /> New Task
            </button>
          </div>
        </div>

        <div className="flex gap-4 h-full overflow-hidden">
          {[
            { title: "To Do", count: 4, color: "border-slate-600" },
            { title: "In Progress", count: 2, color: "border-blue-500" },
            { title: "Done", count: 8, color: "border-green-500" },
          ].map((col, i) => (
            <div key={i} className="flex-1 flex flex-col gap-3 min-w-[200px]">
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full border-2 ${col.color} bg-transparent`} />
                  {col.title}
                </div>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">{col.count}</span>
              </div>

              <div className="bg-[#14161b] p-4 rounded-xl border border-slate-800 hover:border-slate-600 transition-all hover:shadow-xl group cursor-grab active:cursor-grabbing relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-slate-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex gap-2 mb-3">
                  <span className="px-2 py-0.5 rounded bg-pink-500/10 text-pink-400 text-[10px] font-medium border border-pink-500/20">
                    Frontend
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-500 text-[10px] border border-slate-700">
                    High
                  </span>
                </div>
                <h4 className="text-sm font-medium text-slate-200 mb-2 leading-snug">
                  Implement new authentication flow
                </h4>
                <div className="w-full h-1 bg-slate-800 rounded-full mb-4 overflow-hidden">
                  <div className="h-full bg-pink-500 w-2/3" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    <div className="w-5 h-5 rounded-full bg-slate-700 border border-[#14161b]" />
                    <div className="w-5 h-5 rounded-full bg-slate-600 border border-[#14161b]" />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Clock size={10} /> 2d
                  </div>
                </div>
              </div>

              {i === 1 && (
                <div className="bg-[#14161b] p-4 rounded-xl border border-blue-500/30 shadow-[0_0_15px_-5px_rgba(59,130,246,0.2)] cursor-grab">
                  <div className="flex gap-2 mb-3">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-medium border border-blue-500/20">
                      Backend
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-slate-200 mb-2 leading-snug">API Rate limiting middleware</h4>
                  <div className="flex items-center justify-between mt-4">
                    <div className="w-5 h-5 rounded-full bg-indigo-500 border border-[#14161b] flex items-center justify-center text-[8px] text-white">
                      JD
                    </div>
                    <div className="text-[10px] text-blue-400 font-mono">#432</div>
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
        <div className="w-48 border-r border-slate-800 bg-[#09090b] flex flex-col">
          <div className="p-3 text-slate-500 font-bold text-[10px] tracking-wider uppercase">Explorer</div>
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
          <div className="flex border-b border-slate-800 bg-[#09090b]">
            <div className="px-4 py-2 bg-[#0c0e12] border-r border-slate-800 border-t-2 border-t-emerald-500 text-slate-200 flex items-center gap-2">
              <span className="text-emerald-500">TSX</span> App.tsx
              <X size={12} className="ml-2 text-slate-500 hover:text-white cursor-pointer" />
            </div>
            <div className="px-4 py-2 text-slate-500 flex items-center gap-2 hover:bg-[#15171b] cursor-pointer">
              package.json
            </div>
          </div>
          <div className="flex-1 p-4 text-slate-400 leading-relaxed overflow-hidden relative">
            <div className="absolute left-4 top-4 bottom-4 w-px bg-slate-800" />
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

          <div className="h-32 border-t border-slate-800 bg-[#09090b]">
            <div className="flex items-center justify-between px-4 py-1 border-b border-slate-800 text-[10px] uppercase text-slate-500 font-bold">
              <div className="flex gap-4">
                <span className="text-white border-b border-white pb-1">Terminal</span>
                <span>Output</span>
                <span>Problems</span>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-700 hover:bg-slate-500 cursor-pointer" />
                <div className="w-2 h-2 rounded-full bg-slate-700 hover:bg-slate-500 cursor-pointer" />
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
      <div className="w-20 h-20 bg-gradient-to-br from-cyan-600 to-violet-600 rounded-3xl mb-8 shadow-2xl shadow-cyan-500/20 flex items-center justify-center ring-1 ring-white/10 relative z-10">
        <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm" />
        <Cpu className="text-white w-10 h-10 relative z-10" />
      </div>

      <h3 className="text-white text-xl font-bold mb-2 tracking-tight">Swarp Client Setup</h3>
      <p className="text-slate-400 text-sm mb-10 font-medium">
        {progress < 100 ? steps[step] : "Installation Complete"}
      </p>

      <div className="w-full max-w-xs bg-slate-800/50 border border-slate-700 h-3 rounded-full overflow-hidden mb-3 relative">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-75 ease-linear relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </div>
      </div>
      <div className="flex justify-between w-full max-w-xs text-[10px] text-slate-500 font-mono mb-12 uppercase tracking-widest">
        <span>Init</span>
        <span>{progress}%</span>
      </div>

      <button
        onClick={() => setProgress(0)}
        className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-all border border-slate-700 hover:border-slate-500 hover:bg-slate-800 px-5 py-2.5 rounded-lg font-medium"
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
      <div className="bg-[#09090b] border-b border-slate-800 p-3 flex gap-6 text-slate-500 font-medium">
        <span className="text-slate-200 border-b-2 border-cyan-500 pb-3 -mb-3.5 z-10">Console</span>
        <span className="hover:text-slate-300 cursor-pointer">Network</span>
        <span className="hover:text-slate-300 cursor-pointer">Application</span>
        <span className="hover:text-slate-300 cursor-pointer">Performance</span>
      </div>
      <div className="p-4 space-y-1">
        {logs.map((log, i) => (
          <div
            key={i}
            className="flex gap-4 border-b border-slate-800/30 pb-2 hover:bg-white/5 p-1 rounded transition-colors cursor-pointer group"
          >
            <span className="text-slate-600 w-16 group-hover:text-slate-500">{log.time}</span>
            <span
              className={`w-10 font-bold ${
                log.type === "INFO" ? "text-cyan-400" : log.type === "NET" ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {log.type}
            </span>
            <span className="text-slate-400 group-hover:text-slate-200">{log.msg}</span>
          </div>
        ))}
        <div className="flex gap-2 items-center text-slate-500 pt-2 pl-1">
          <ChevronRight size={14} />
          <span className="animate-pulse w-2 h-4 bg-slate-600 block" />
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
                    : "border-slate-800 text-slate-500 group-hover:border-slate-600 group-hover:text-slate-300"
                }`}
              >
                {i === 0 && <Code2 size={20} />}
                {i === 1 && <Shield size={20} />}
                {i === 2 && <Lock size={20} />}
                {i === 3 && <Download size={20} />}
              </div>
              <span
                className={`text-[10px] font-mono uppercase tracking-widest font-bold transition-colors ${
                  i === 3 ? "text-emerald-500" : "text-slate-600"
                }`}
              >
                {step}
              </span>
            </div>
            {i < 3 && <div className="w-16 h-0.5 bg-slate-800 relative mx-4 rounded-full overflow-hidden" />}
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
    <div className="min-h-full bg-slate-950 text-slate-200 overflow-x-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, rgba(56, 189, 248, 0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-800/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-xs font-medium text-cyan-400 tracking-wide uppercase">Engineering Services</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          Software <span className="text-slate-500">&</span> Tools
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Internal business tools, desktop apps, private meeting rooms, and developer tooling.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { label: "Desktop + Web", icon: Laptop },
            { label: "Secure by design", icon: Shield },
            { label: "Shipped + maintained", icon: Check },
          ].map((chip, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900/50 border border-slate-800 text-xs text-slate-300"
            >
              <chip.icon className="w-4 h-4 text-cyan-500" />
              {chip.label}
            </div>
          ))}
        </div>

        {/* Desktop Preview */}
        <div className="relative rounded-xl bg-[#09090b] border border-slate-800 shadow-2xl overflow-hidden ring-1 ring-white/10 mb-8">
          <div className="h-10 bg-[#09090b] border-b border-slate-800/80 flex items-center px-4 justify-between select-none">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="text-xs text-slate-500 font-mono flex items-center gap-2">
              <Lock size={10} className="text-slate-600" />
              Swarp Studio — {config.type === "dev" ? "Terminal" : "v2.4.0"}
            </div>
            <div className="w-14" />
          </div>

          <div className="flex h-[320px] bg-[#0c0e12] relative overflow-hidden">
            {/* Sidebar */}
            <div className="w-[72px] border-r border-slate-800/40 flex flex-col items-center py-6 gap-4 bg-[#09090b]">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg text-white font-bold text-lg">
                S
              </div>
              <div className="w-full h-px bg-slate-800/50 my-2" />

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
                <Settings className="w-5 h-5 text-slate-600 hover:text-slate-400 cursor-pointer" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 relative flex flex-col">
              <div className="h-12 border-b border-slate-800/40 bg-[#09090b]/50 flex items-center justify-between px-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-sm font-medium text-white">
                    {config.type === "meeting" && "Standup / Engineering Team"}
                    {config.type === "admin" && "Users / Management"}
                    {config.type === "planner" && "Product / Roadmap Q3"}
                    {config.type === "dev" && "Terminal / Localhost:3000"}
                  </h2>
                  {config.modules.audit && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
                      Audit Log Active
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <Search className="w-4 h-4 text-slate-500" />
                  <Bell className="w-4 h-4 text-slate-500" />
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
          <div className="space-y-4 bg-slate-900/40 border border-slate-800 p-5 rounded-xl">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">Configurator</h2>
              <p className="text-slate-400 text-xs">Define your requirements. We build to spec.</p>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Product Type</label>
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
                        ? "bg-cyan-950/40 border-cyan-700/50 text-cyan-100"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Platform</label>
              <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, platform: "desktop" }))}
                  className={`flex-1 py-1.5 text-xs rounded-md transition-all ${
                    config.platform === "desktop" ? "bg-slate-800 text-white" : "text-slate-500"
                  }`}
                >
                  Desktop
                </button>
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, platform: "web" }))}
                  className={`flex-1 py-1.5 text-xs rounded-md transition-all ${
                    config.platform === "web" ? "bg-slate-800 text-white" : "text-slate-500"
                  }`}
                >
                  Web
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Modules</label>
              <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                {Object.entries(config.modules).map(([key, isActive]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-xs text-slate-300 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <button
                      onClick={() => toggleModule(key as keyof typeof config.modules)}
                      className={`w-8 h-4 rounded-full relative transition-colors ${
                        isActive ? "bg-cyan-600" : "bg-slate-700"
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

          {/* Release Pipeline */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Release Pipeline</h2>
              <div className="flex gap-1">
                {(["installer", "devtools", "release"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                      activeTab === tab
                        ? "bg-slate-800 border-slate-600 text-white"
                        : "border-transparent text-slate-500 hover:text-slate-300"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden h-[280px]">
              {activeTab === "installer" && <InstallerTab />}
              {activeTab === "devtools" && <DevToolsTab />}
              {activeTab === "release" && <ReleasePipelineTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SoftwareToolsContent;
