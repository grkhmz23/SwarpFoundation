"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Plus,
  MessageSquare,
  CreditCard,
  LogOut,
  User,
  Activity,
  Zap,
  Clock,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Wallet,
  Database,
  Cpu,
  Crosshair,
  Terminal,
  Shield,
  Globe,
  AlertCircle,
  Send,
  Download,
  RefreshCcw,
} from "lucide-react";
import { bankDetails } from "@/lib/bank-details";
import type { ProjectStatus, QuoteStatus } from "@prisma/client";

type ProjectRequest = {
  projectId: string;
  projectName: string;
  wishes: string;
  services: string[];
  budgetUsd: number | null;
  status: ProjectStatus;
  createdAtISO: string;
  updatedAtISO: string;
  quotedAmount: number | null;
  quoteStatus: QuoteStatus;
  quoteNotes: string | null;
  quoteValidUntilISO: string | null;
  estimatedWeeks: number | null;
  startDateISO: string | null;
  deliveryDateISO: string | null;
};

type TabId = "overview" | "request" | "projects" | "bank" | "quotes" | "messages";

const SERVICE_OPTIONS = [
  { name: "Web & Mobile Development", icon: "🌐", timeline: "8-12 weeks" },
  { name: "Software Tools", icon: "🛠️", timeline: "6-10 weeks" },
  { name: "AI Systems", icon: "🤖", timeline: "4-8 weeks" },
  { name: "Blockchain Development", icon: "⛓️", timeline: "10-14 weeks" },
  { name: "Security Audits", icon: "🔒", timeline: "2-4 weeks" },
  { name: "Hardware Prototyping", icon: "🔧", timeline: "12-24 weeks" },
  { name: "Cloud & DevOps", icon: "☁️", timeline: "4-8 weeks" },
  { name: "Engineering Retainer", icon: "👥", timeline: "Monthly" },
  { name: "Integrations", icon: "🔌", timeline: "3-6 weeks" },
  { name: "Data Analytics", icon: "📊", timeline: "6-10 weeks" },
  { name: "QA & Testing", icon: "🧪", timeline: "3-5 weeks" },
  { name: "UI/UX Design", icon: "🎨", timeline: "4-8 weeks" },
];

const PROJECT_STEPS = [
  { status: "funding_pending" as ProjectStatus, label: "Request Submitted", step: 1 },
  { status: "funding_pending" as ProjectStatus, label: "Quote Received", step: 2 },
  { status: "funding_pending" as ProjectStatus, label: "Payment Pending", step: 3 },
  { status: "funds_received" as ProjectStatus, label: "Funds Received", step: 4 },
  { status: "in_progress" as ProjectStatus, label: "In Development", step: 5 },
  { status: "delivered" as ProjectStatus, label: "Delivered", step: 6 },
];

// --- UTILITY FUNCTIONS ---
function formatCurrency(amount: number | null) {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatRelativeTime(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return formatDate(iso);
}

function statusLabel(status: ProjectStatus): string {
  const labels: Record<ProjectStatus, string> = {
    funding_pending: "Pending Quote",
    funds_received: "Ready to Start",
    in_progress: "In Progress",
    delivered: "Delivered",
  };
  return labels[status];
}

function statusColor(status: ProjectStatus): string {
  const colors: Record<ProjectStatus, string> = {
    funding_pending: "#F59E0B",
    funds_received: "#06B6D4",
    in_progress: "#3B82F6",
    delivered: "#10B981",
  };
  return colors[status];
}

function quoteStatusLabel(status: QuoteStatus): string {
  const labels: Record<QuoteStatus, string> = {
    pending: "PENDING",
    sent: "SENT",
    approved: "APPROVED",
    rejected: "REJECTED",
  };
  return labels[status];
}

// --- COMPONENTS ---

const HUDCorner = ({ className }: { className: string }) => (
  <div className={`pointer-events-none absolute z-20 h-6 w-6 border-[#00D4FF] opacity-60 ${className}`} />
);

const TerminalCard = ({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) => (
  <div
    className={`relative overflow-hidden border border-white/10 bg-[#0a0d1c]/95 backdrop-blur-xl ${className}`}
    style={{
      clipPath: "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)",
      boxShadow: glow ? "inset 0 0 30px rgba(0,212,255,0.1), 0 0 40px rgba(0,212,255,0.1)" : undefined,
    }}
  >
    {children}
  </div>
);

const StatusBadge = ({ status }: { status: ProjectStatus }) => (
  <span
    className="inline-flex items-center gap-1.5 rounded px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider"
    style={{
      backgroundColor: `${statusColor(status)}20`,
      color: statusColor(status),
      border: `1px solid ${statusColor(status)}40`,
    }}
  >
    <span
      className="h-1.5 w-1.5 animate-pulse rounded-full"
      style={{ backgroundColor: statusColor(status), boxShadow: `0 0 6px ${statusColor(status)}` }}
    />
    {statusLabel(status)}
  </span>
);

const ProgressBar = ({ value, color = "#00D4FF" }: { value: number; color?: string }) => (
  <div className="h-2 w-full overflow-hidden bg-white/5">
    <motion.div
      className="h-full"
      style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  </div>
);

// --- MAIN COMPONENT ---

export function DashboardWorkspace({ userName, userEmail }: { userName: string; userEmail: string }) {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [notice, setNotice] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectRequest | null>(null);

  // Form states
  const [projectName, setProjectName] = useState("");
  const [wishes, setWishes] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [priority, setPriority] = useState<"normal" | "urgent">("normal");

  async function loadProjects() {
    setIsLoading(true);
    setNotice("");
    try {
      const response = await fetch("/dashboard/api/projects", { cache: "no-store" });
      
      // Check if response is valid before parsing
      if (!response.ok) {
        const text = await response.text().catch(() => "Unknown error");
        let errorMessage = "Failed loading projects.";
        try {
          const data = JSON.parse(text);
          if (data?.error) errorMessage = data.error;
        } catch {
          // If parsing fails, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }
      
      const data = await response.json().catch(() => ({ projects: [] }));
      setRequests(Array.isArray(data?.projects) ? data.projects : []);
    } catch (error) {
      console.error("Failed to load projects:", error);
      setNotice(error instanceof Error ? error.message : "Unable to load projects.");
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  function toggleService(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((item) => item !== service) : [...prev, service]
    );
  }

  async function handleSubmitRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice("");
    const cleanName = projectName.trim();
    const cleanWishes = wishes.trim();
    const parsedBudget = budget.trim().length === 0 ? null : Number(budget);

    if (cleanName.length < 3) {
      setNotice("Project name must be at least 3 characters.");
      return;
    }
    if (cleanWishes.length < 20) {
      setNotice("Please describe your wishes with at least 20 characters.");
      return;
    }
    if (selectedServices.length === 0) {
      setNotice("Select at least one service.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/dashboard/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: cleanName,
          wishes: cleanWishes,
          services: selectedServices,
          budgetUsd: parsedBudget,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(typeof data?.error === "string" ? data.error : "Unable to submit.");

      if (data?.project) setRequests((prev) => [data.project as ProjectRequest, ...prev]);
      else await loadProjects();

      setProjectName("");
      setWishes("");
      setBudget("");
      setSelectedServices([]);
      setPriority("normal");
      setActiveTab("projects");
      setNotice(`🎉 Request submitted! Project ID: ${data?.project?.projectId || "Generated"}`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unexpected error.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Stats
  const stats = useMemo(() => {
    const pendingQuote = requests.filter((r) => r.status === "funding_pending" && r.quoteStatus === "pending").length;
    const pendingPayment = requests.filter((r) => r.status === "funding_pending" && r.quoteStatus === "sent").length;
    const inProgress = requests.filter((r) => r.status === "in_progress").length;
    const delivered = requests.filter((r) => r.status === "delivered").length;
    const totalBudget = requests.reduce((sum, r) => sum + (r.budgetUsd || 0), 0);
    return { pendingQuote, pendingPayment, inProgress, delivered, totalBudget };
  }, [requests]);

  const latestProject = requests[0];

  const navItems: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: "projects", label: "Projects", icon: <FolderKanban className="h-4 w-4" /> },
    { id: "quotes", label: "Quotes", icon: <FileText className="h-4 w-4" /> },
    { id: "request", label: "New Request", icon: <Plus className="h-4 w-4" /> },
    { id: "messages", label: "Messages", icon: <MessageSquare className="h-4 w-4" /> },
    { id: "bank", label: "Payments", icon: <CreditCard className="h-4 w-4" /> },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050714] text-white">
      {/* CRT Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(255,255,255,0.015)_50%,transparent_50%)] bg-[length:100%_4px] mix-blend-overlay" />

      {/* Background Effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-[-10%] top-[-10%] h-[50%] w-[50%] animate-pulse rounded-full bg-[#00D4FF]/10 blur-[150px] duration-[8000ms]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full bg-[#0066FF]/10 blur-[150px]" />
        <div className="absolute right-[20%] top-[20%] h-[30%] w-[30%] rounded-full bg-[#9D4EDD]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30" />
      </div>

      {/* Header - v2 */}
      <header className="relative z-10 border-b border-white/10 bg-[#0a0d1c]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="relative flex h-10 w-10 items-center justify-center border border-[#00D4FF]/40 bg-[#050714]">
              <Image
                src="/logo_transparent_original.png"
                alt="SWARP"
                width={24}
                height={24}
                className="object-contain drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]"
              />
              <div className="absolute inset-[-1px] animate-[spin_4s_linear_infinite] border border-t-[#00D4FF] border-r-transparent border-b-transparent border-l-transparent" />
            </div>
            <div>
              <h1 className="flex items-center gap-2 font-mono text-sm font-bold tracking-widest text-[#00D4FF]">
                <Terminal className="h-4 w-4" /> CLIENT_PORTAL
              </h1>
              <p className="font-mono text-[10px] text-slate-500">SECURE_CONNECTION_ESTABLISHED</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-3 border border-white/10 bg-white/5 px-4 py-2 sm:flex">
              <User className="h-4 w-4 text-[#00D4FF]" />
              <div className="text-right">
                <p className="text-xs font-semibold text-white">{userName}</p>
                <p className="font-mono text-[10px] text-slate-400">{userEmail}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-3 py-2 font-mono text-xs text-red-400 transition-colors hover:bg-red-500/20"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">DISCONNECT</span>
            </button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8">
        {/* Sidebar Navigation */}
        <nav className="lg:w-64 lg:shrink-0">
          <TerminalCard className="sticky top-24 p-4">
            <HUDCorner className="left-0 top-0 border-l border-t" />
            <HUDCorner className="right-0 top-0 border-r border-t" />
            <HUDCorner className="bottom-0 left-0 border-b border-l" />
            <HUDCorner className="bottom-0 right-0 border-b border-r" />

            <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
              <Activity className="h-4 w-4 text-[#00D4FF]" />
              <span className="font-mono text-xs font-bold tracking-widest text-[#00D4FF]">NAV_SYSTEM</span>
            </div>

            <div className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex w-full items-center gap-3 border px-3 py-3 font-mono text-xs transition-all ${
                    activeTab === item.id
                      ? "border-[#00D4FF]/50 bg-[#00D4FF]/10 text-[#00D4FF]"
                      : "border-transparent text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="uppercase tracking-wider">{item.label}</span>
                  {activeTab === item.id && (
                    <ChevronRight className="ml-auto h-3 w-3 animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* System Stats */}
            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500">
                <Cpu className="h-3 w-3" /> System Status
              </div>
              <div className="space-y-2 font-mono text-[10px]">
                <div className="flex justify-between text-slate-400">
                  <span>API_LATENCY</span>
                  <span className="text-emerald-400">12ms</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>NODE_STATUS</span>
                  <span className="text-[#00D4FF]">ONLINE</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>ENCRYPTION</span>
                  <span className="text-purple-400">AES-256</span>
                </div>
              </div>
            </div>
          </TerminalCard>
        </nav>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {notice && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mb-6 flex items-center justify-between border p-4 font-mono text-sm ${
                  notice.includes("Failed") || notice.includes("error") || notice.includes("Unable")
                    ? "border-red-500/30 bg-red-500/10 text-red-400"
                    : "border-[#00D4FF]/30 bg-[#00D4FF]/10 text-[#00D4FF]"
                }`}
              >
                <span><span className="mr-2">⚡</span> {notice}</span>
                <button 
                  onClick={() => setNotice("")}
                  className="ml-4 text-xs opacity-70 hover:opacity-100"
                >
                  ✕ DISMISS
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Welcome Card */}
              <TerminalCard glow className="p-6">
                <HUDCorner className="left-0 top-0 border-l-2 border-t-2" />
                <HUDCorner className="right-0 top-0 border-r-2 border-t-2" />

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-[#00D4FF]" />
                      <span className="font-mono text-xs font-bold tracking-widest text-[#00D4FF]">
                        WELCOME_BACK
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold">
                      <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                        {userName.split(" ")[0]}
                      </span>
                    </h2>
                    <p className="mt-2 max-w-xl text-slate-400">
                      Access your project control center. Monitor progress, review quotes, and manage your development pipeline.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab("request")}
                    className="group flex items-center gap-2 border border-[#00D4FF] bg-[#00D4FF]/10 px-6 py-3 font-mono text-sm font-bold tracking-wider text-[#00D4FF] transition-all hover:bg-[#00D4FF]/20"
                  >
                    <Plus className="h-4 w-4" />
                    NEW_PROJECT
                  </button>
                </div>

                {/* Quick Stats Grid */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { label: "Total Projects", value: requests.length, color: "#00D4FF", icon: FolderKanban },
                    { label: "Pending Quote", value: stats.pendingQuote, color: "#F59E0B", icon: Clock },
                    { label: "In Progress", value: stats.inProgress, color: "#3B82F6", icon: TrendingUp },
                    { label: "Total Budget", value: formatCurrency(stats.totalBudget), color: "#10B981", icon: Wallet, isText: true },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      className="relative border border-white/10 bg-white/5 p-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      style={{ borderLeft: `3px solid ${stat.color}` }}
                    >
                      <div className="mb-2 flex items-center gap-2 text-slate-400">
                        <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                        <span className="text-[10px] uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <p className="font-mono text-2xl font-bold" style={{ color: stat.color }}>
                        {stat.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </TerminalCard>

              {/* Latest Project Status */}
              {latestProject && (
                <TerminalCard className="p-6">
                  <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-[#00D4FF]" />
                      <span className="font-mono text-xs font-bold tracking-widest text-[#00D4FF]">
                        LATEST_PROJECT_STATUS
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className="font-mono text-xs text-slate-400 hover:text-[#00D4FF]"
                    >
                      VIEW_ALL →
                    </button>
                  </div>

                  <div className="flex flex-col gap-6 lg:flex-row">
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-mono text-xs text-slate-500">{latestProject.projectId}</p>
                          <h3 className="mt-1 text-xl font-bold text-white">{latestProject.projectName}</h3>
                        </div>
                        <StatusBadge status={latestProject.status} />
                      </div>

                      <div className="mt-4">
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="text-slate-400">Progress</span>
                          <span className="font-mono text-[#00D4FF]">
                            {latestProject.status === "delivered" ? "100%" : 
                             latestProject.status === "in_progress" ? "66%" :
                             latestProject.status === "funds_received" ? "50%" : "33%"}
                          </span>
                        </div>
                        <ProgressBar
                          value={
                            latestProject.status === "delivered" ? 100 : 
                            latestProject.status === "in_progress" ? 66 :
                            latestProject.status === "funds_received" ? 50 : 33
                          }
                        />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {latestProject.services.slice(0, 3).map((service) => (
                          <span
                            key={service}
                            className="border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-slate-300"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="lg:w-64 lg:border-l lg:border-white/10 lg:pl-6">
                      <div className="space-y-3 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">CREATED</span>
                          <span className="text-slate-300">{formatRelativeTime(latestProject.createdAtISO)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">BUDGET</span>
                          <span className="text-[#00D4FF]">{formatCurrency(latestProject.budgetUsd)}</span>
                        </div>
                        {latestProject.quotedAmount && (
                          <div className="flex justify-between">
                            <span className="text-slate-500">QUOTED</span>
                            <span className="text-emerald-400">{formatCurrency(latestProject.quotedAmount)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TerminalCard>
              )}

              {/* Recent Projects List */}
              <TerminalCard className="p-6">
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-[#00D4FF]" />
                    <span className="font-mono text-xs font-bold tracking-widest text-[#00D4FF]">
                      RECENT_PROJECTS
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {requests.slice(0, 5).map((request, i) => (
                    <motion.button
                      key={request.projectId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => {
                        setSelectedProject(request);
                        setActiveTab("projects");
                      }}
                      className="flex w-full items-center justify-between border border-white/5 bg-white/[0.02] p-3 transition-all hover:border-[#00D4FF]/30 hover:bg-white/5"
                    >
                      <div className="text-left">
                        <p className="font-mono text-xs text-slate-500">{request.projectId}</p>
                        <p className="font-medium text-white">{request.projectName}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <StatusBadge status={request.status} />
                        <ChevronRight className="h-4 w-4 text-slate-600" />
                      </div>
                    </motion.button>
                  ))}
                  {requests.length === 0 && (
                    <div className="py-8 text-center text-slate-500">
                      <p>No projects found. Create your first project to get started.</p>
                    </div>
                  )}
                </div>
              </TerminalCard>
            </motion.div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-5 w-5 text-[#00D4FF]" />
                  <h2 className="font-mono text-lg font-bold tracking-wider">PROJECT_DATABASE</h2>
                </div>
                <button
                  onClick={() => setActiveTab("request")}
                  className="flex items-center gap-2 border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-4 py-2 font-mono text-xs font-bold text-[#00D4FF] transition-colors hover:bg-[#00D4FF]/20"
                >
                  <Plus className="h-3.5 w-3.5" /> NEW
                </button>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="h-8 w-8 animate-spin border-2 border-[#00D4FF] border-t-transparent" />
                </div>
              ) : (
                <div className="grid gap-4">
                  {requests.map((request, i) => (
                    <TerminalCard
                      key={request.projectId}
                      className={`p-5 transition-all ${
                        selectedProject?.projectId === request.projectId
                          ? "border-[#00D4FF]/50 shadow-[0_0_30px_rgba(0,212,255,0.15)]"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <span className="font-mono text-xs text-[#00D4FF]">{request.projectId}</span>
                            <StatusBadge status={request.status} />
                            {request.quoteStatus !== "pending" && (
                              <span
                                className="rounded px-2 py-0.5 font-mono text-[10px] uppercase"
                                style={{
                                  backgroundColor: `${request.quoteStatus === "sent" ? "#3B82F6" : request.quoteStatus === "approved" ? "#10B981" : "#EF4444"}20`,
                                  color: request.quoteStatus === "sent" ? "#3B82F6" : request.quoteStatus === "approved" ? "#10B981" : "#EF4444",
                                  border: `1px solid ${request.quoteStatus === "sent" ? "#3B82F6" : request.quoteStatus === "approved" ? "#10B981" : "#EF4444"}40`,
                                }}
                              >
                                {quoteStatusLabel(request.quoteStatus)}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-white">{request.projectName}</h3>
                          <p className="mt-2 line-clamp-2 text-sm text-slate-400">{request.wishes}</p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {request.services.slice(0, 4).map((service) => (
                              <span
                                key={service}
                                className="border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] text-slate-300"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="lg:w-64 lg:border-l lg:border-white/10 lg:pl-4">
                          <div className="space-y-2 font-mono text-xs">
                            <div className="flex justify-between">
                              <span className="text-slate-500">BUDGET</span>
                              <span className="text-slate-300">{formatCurrency(request.budgetUsd)}</span>
                            </div>
                            {request.quotedAmount && (
                              <div className="flex justify-between">
                                <span className="text-slate-500">QUOTED</span>
                                <span className="text-emerald-400">{formatCurrency(request.quotedAmount)}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-slate-500">CREATED</span>
                              <span className="text-slate-300">{formatDate(request.createdAtISO)}</span>
                            </div>
                          </div>

                          {request.status === "funding_pending" && request.quoteStatus === "sent" && (
                            <button className="mt-4 w-full border border-emerald-500/50 bg-emerald-500/10 py-2 font-mono text-xs font-bold text-emerald-400 transition-colors hover:bg-emerald-500/20">
                              ACCEPT & PAY
                            </button>
                          )}
                        </div>
                      </div>
                    </TerminalCard>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* QUOTES TAB */}
          {activeTab === "quotes" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#00D4FF]" />
                <h2 className="font-mono text-lg font-bold tracking-wider">QUOTE_MATRIX</h2>
              </div>

              {requests.filter((r) => r.quoteStatus !== "pending").length === 0 ? (
                <TerminalCard className="p-12 text-center">
                  <Database className="mx-auto mb-4 h-12 w-12 text-slate-600" />
                  <h3 className="text-lg font-semibold text-white">No Quotes Available</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Submit a project request to receive a detailed cost estimate within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setActiveTab("request")}
                    className="mt-6 border border-[#00D4FF]/50 bg-[#00D4FF]/10 px-6 py-3 font-mono text-xs font-bold text-[#00D4FF] transition-colors hover:bg-[#00D4FF]/20"
                  >
                    CREATE_REQUEST
                  </button>
                </TerminalCard>
              ) : (
                <div className="grid gap-4">
                  {requests
                    .filter((r) => r.quoteStatus !== "pending")
                    .map((request, i) => (
                      <TerminalCard key={request.projectId} className="p-6" glow={request.quoteStatus === "sent"}>
                        <div className="flex flex-col gap-6 lg:flex-row">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-2">
                              <span className="font-mono text-xs text-[#00D4FF]">{request.projectId}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white">{request.projectName}</h3>

                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                              <div className="border border-white/10 bg-white/5 p-3">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500">Amount</p>
                                <p className="font-mono text-xl font-bold text-[#00D4FF]">
                                  {formatCurrency(request.quotedAmount)}
                                </p>
                              </div>
                              <div className="border border-white/10 bg-white/5 p-3">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500">Timeline</p>
                                <p className="font-mono text-xl font-bold text-white">
                                  {request.estimatedWeeks || "8-12"} weeks
                                </p>
                              </div>
                              <div className="border border-white/10 bg-white/5 p-3">
                                <p className="text-[10px] uppercase tracking-widest text-slate-500">Valid Until</p>
                                <p className="font-mono text-lg font-bold text-slate-300">
                                  {request.quoteValidUntilISO
                                    ? formatDate(request.quoteValidUntilISO)
                                    : "30 days"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col gap-3 lg:w-48">
                            {request.quoteStatus === "sent" && (
                              <button className="border border-emerald-500/50 bg-emerald-500/10 py-3 font-mono text-xs font-bold text-emerald-400 transition-colors hover:bg-emerald-500/20">
                                <CheckCircle2 className="mb-0.5 mr-1 inline h-3.5 w-3.5" />
                                ACCEPT
                              </button>
                            )}
                            <button className="border border-white/20 bg-white/5 py-3 font-mono text-xs text-slate-300 transition-colors hover:bg-white/10">
                              <Download className="mb-0.5 mr-1 inline h-3.5 w-3.5" />
                              DOWNLOAD PDF
                            </button>
                            <button className="border border-white/20 bg-white/5 py-3 font-mono text-xs text-slate-300 transition-colors hover:bg-white/10">
                              <Send className="mb-0.5 mr-1 inline h-3.5 w-3.5" />
                              REQUEST CHANGES
                            </button>
                          </div>
                        </div>
                      </TerminalCard>
                    ))}
                </div>
              )}
            </motion.div>
          )}

          {/* NEW REQUEST TAB */}
          {activeTab === "request" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <TerminalCard className="p-6 lg:p-8" glow>
                <HUDCorner className="left-0 top-0 border-l-2 border-t-2" />
                <HUDCorner className="right-0 top-0 border-r-2 border-t-2" />

                <div className="mb-8 flex items-center gap-2">
                  <Crosshair className="h-5 w-5 text-[#00D4FF]" />
                  <h2 className="font-mono text-lg font-bold tracking-wider text-white">NEW_PROJECT_REQUEST</h2>
                </div>

                <form onSubmit={handleSubmitRequest} className="space-y-6">
                  <div>
                    <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#00D4FF]">
                      Project Name *
                    </label>
                    <input
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="e.g., Enterprise Web Application"
                      className="w-full border border-white/15 bg-white/5 px-4 py-3 font-mono text-white outline-none transition-all focus:border-[#00D4FF]/50 focus:bg-white/[0.07] focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#00D4FF]">
                      Services Required *
                    </label>
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {SERVICE_OPTIONS.map((service) => {
                        const selected = selectedServices.includes(service.name);
                        return (
                          <button
                            key={service.name}
                            type="button"
                            onClick={() => toggleService(service.name)}
                            className={`flex items-center gap-3 border px-4 py-3 text-left transition-all ${
                              selected
                                ? "border-[#00D4FF]/50 bg-[#00D4FF]/10 text-[#00D4FF]"
                                : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/[0.07]"
                            }`}
                          >
                            <span className="text-xl">{service.icon}</span>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{service.name}</div>
                              <div className="font-mono text-[10px] text-slate-500">{service.timeline}</div>
                            </div>
                            {selected && <CheckCircle2 className="h-4 w-4" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#00D4FF]">
                      Project Description *
                    </label>
                    <textarea
                      value={wishes}
                      onChange={(e) => setWishes(e.target.value)}
                      placeholder="Describe your project requirements, goals, timeline, and any specific features needed..."
                      rows={5}
                      className="w-full border border-white/15 bg-white/5 px-4 py-3 font-mono text-white outline-none transition-all focus:border-[#00D4FF]/50 focus:bg-white/[0.07] focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
                    />
                    <p className="mt-1 font-mono text-[10px] text-slate-500">Minimum 20 characters</p>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#00D4FF]">
                        Estimated Budget (USD)
                      </label>
                      <input
                        type="number"
                        min={0}
                        step={1000}
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="50000"
                        className="w-full border border-white/15 bg-white/5 px-4 py-3 font-mono text-white outline-none transition-all focus:border-[#00D4FF]/50 focus:bg-white/[0.07]"
                      />
                      <p className="mt-1 font-mono text-[10px] text-slate-500">Optional - helps us scope appropriately</p>
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-xs font-bold uppercase tracking-widest text-[#00D4FF]">
                        Priority Level
                      </label>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setPriority("normal")}
                          className={`flex-1 border px-4 py-3 font-mono text-sm transition-all ${
                            priority === "normal"
                              ? "border-[#00D4FF]/50 bg-[#00D4FF]/10 text-[#00D4FF]"
                              : "border-white/10 bg-white/5 text-slate-300"
                          }`}
                        >
                          NORMAL
                        </button>
                        <button
                          type="button"
                          onClick={() => setPriority("urgent")}
                          className={`flex-1 border px-4 py-3 font-mono text-sm transition-all ${
                            priority === "urgent"
                              ? "border-amber-500/50 bg-amber-500/10 text-amber-400"
                              : "border-white/10 bg-white/5 text-slate-300"
                          }`}
                        >
                          URGENT
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden border border-[#00D4FF] bg-[#00D4FF]/10 px-8 py-4 font-mono font-bold uppercase tracking-widest text-[#00D4FF] transition-all hover:bg-[#00D4FF]/20 disabled:opacity-50"
                  >
                    <div className="absolute inset-0 translate-x-[-150%] bg-[linear-gradient(45deg,transparent_25%,rgba(0,212,255,0.2)_50%,transparent_75%)] transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]" />
                    <span className="relative flex items-center justify-center gap-2">
                      <Send className="h-4 w-4" />
                      {isSubmitting ? "PROCESSING..." : "SUBMIT_REQUEST"}
                    </span>
                  </button>
                </form>
              </TerminalCard>
            </motion.div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === "messages" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <TerminalCard className="p-12 text-center">
                <MessageSquare className="mx-auto mb-4 h-12 w-12 text-slate-600" />
                <h3 className="text-lg font-semibold text-white">COMMS_CHANNEL_OFFLINE</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Direct messaging system coming soon. Contact us at{" "}
                  <a href="mailto:info@swarppay.com" className="text-[#00D4FF] hover:underline">
                    info@swarppay.com
                  </a>
                </p>
              </TerminalCard>
            </motion.div>
          )}

          {/* PAYMENTS TAB */}
          {activeTab === "bank" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#00D4FF]" />
                <h2 className="font-mono text-lg font-bold tracking-wider">PAYMENT_GATEWAY</h2>
              </div>

              {/* Payment Process */}
              <TerminalCard className="p-6">
                <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
                  <Activity className="h-4 w-4 text-[#00D4FF]" />
                  <span className="font-mono text-xs font-bold tracking-widest text-[#00D4FF]">TRANSACTION_FLOW</span>
                </div>
                <div className="grid gap-4 sm:grid-cols-4">
                  {[
                    { step: "01", title: "Get Quote", desc: "Review cost estimate" },
                    { step: "02", title: "Approve", desc: "Accept the quote" },
                    { step: "03", title: "Transfer", desc: "Bank with Project ID" },
                    { step: "04", title: "Start", desc: "Development begins" },
                  ].map((item) => (
                    <div key={item.step} className="relative flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#00D4FF]/50 bg-[#00D4FF]/10 font-mono text-sm font-bold text-[#00D4FF]">
                        {item.step}
                      </div>
                      <div>
                        <div className="font-mono text-sm font-medium text-white">{item.title}</div>
                        <div className="font-mono text-[10px] text-slate-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TerminalCard>

              {/* Bank Details */}
              <TerminalCard className="p-6" glow>
                <div className="mb-4 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#00D4FF]" />
                  <h3 className="font-mono text-sm font-bold tracking-widest text-white">BANK_TRANSFER_DETAILS</h3>
                </div>
                <div className="space-y-3 font-mono text-sm">
                  {[
                    { label: "BENEFICIARY", value: bankDetails.beneficiary },
                    { label: "BANK", value: bankDetails.bankName },
                    { label: "IBAN", value: bankDetails.iban },
                    { label: "SWIFT/BIC", value: bankDetails.swift },
                    { label: "REFERENCE", value: `${bankDetails.referencePrefix}-<PROJECT_ID>` },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="font-medium text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border border-amber-500/30 bg-amber-500/10 p-3 font-mono text-xs text-amber-300">
                  <AlertCircle className="mb-1 inline h-4 w-4" />
                  <strong>IMPORTANT:</strong> Use your Project ID as the transfer reference
                </div>
              </TerminalCard>

              {/* Pending Payments */}
              {requests.filter((r) => r.quoteStatus === "sent" && r.status === "funding_pending").length > 0 && (
                <TerminalCard className="p-6">
                  <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-4">
                    <Wallet className="h-4 w-4 text-emerald-400" />
                    <span className="font-mono text-xs font-bold tracking-widest text-emerald-400">PENDING_PAYMENTS</span>
                  </div>
                  <div className="space-y-3">
                    {requests
                      .filter((r) => r.quoteStatus === "sent" && r.status === "funding_pending")
                      .map((request) => (
                        <div
                          key={request.projectId}
                          className="flex items-center justify-between border border-white/10 bg-white/5 p-4"
                        >
                          <div>
                            <p className="font-medium text-white">{request.projectName}</p>
                            <p className="font-mono text-xs text-slate-400">{request.projectId}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono text-lg font-bold text-[#00D4FF]">
                              {formatCurrency(request.quotedAmount)}
                            </p>
                            <p className="font-mono text-[10px] text-slate-500">QUOTED AMOUNT</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </TerminalCard>
              )}
            </motion.div>
          )}
        </main>
      </div>

      {/* Footer Ticker */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#0a0d1c]/90 px-4 py-2 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 font-mono text-[10px] text-slate-400">
          <span className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> API: NOMINAL
          </span>
          <span className="text-white/20">|</span>
          <span>LATENCY: 12ms</span>
          <span className="text-white/20">|</span>
          <span>SESSION: ACTIVE</span>
          <span className="text-white/20">|</span>
          <span>ENCRYPTION: AES-256-GCM</span>
        </div>
      </div>
    </div>
  );
}
