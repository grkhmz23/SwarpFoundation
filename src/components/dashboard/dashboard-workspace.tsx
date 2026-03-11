"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { 
  BadgeCheck, Building2, FolderKanban, RefreshCcw, Send, Wallet, 
  Clock, FileText, MessageSquare, ArrowRight, CheckCircle2, 
  AlertCircle, Download, CreditCard, TrendingUp, Sparkles,
  ChevronRight, Plus, ExternalLink, Bell, Calendar, User
} from "lucide-react";
import { bankDetails } from "@/lib/bank-details";
import { motion, AnimatePresence } from "framer-motion";

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
  messages?: Array<{ id: string; content: string; from: "client" | "team"; createdAt: string }>;
};

type TabId = "overview" | "request" | "projects" | "bank" | "quotes" | "messages";

const PROJECT_STEPS = [
  { status: "funding_pending" as ProjectStatus, label: "Request Submitted", description: "Waiting for cost estimate" },
  { status: "funding_pending" as ProjectStatus, label: "Quote Received", description: "Review and approve costs" },
  { status: "funding_pending" as ProjectStatus, label: "Payment Pending", description: "Transfer funds to start" },
  { status: "funds_received" as ProjectStatus, label: "Funds Received", description: "Project kickoff soon" },
  { status: "in_progress" as ProjectStatus, label: "In Development", description: "Building your solution" },
  { status: "delivered" as ProjectStatus, label: "Delivered", description: "Project complete!" },
];

const TABS: Array<{ id: TabId; label: string; icon: ReactNode; badge?: string }> = [
  { id: "overview", label: "Dashboard", icon: <TrendingUp className="h-4 w-4" /> },
  { id: "projects", label: "My Projects", icon: <FolderKanban className="h-4 w-4" /> },
  { id: "quotes", label: "Quotes & Costs", icon: <FileText className="h-4 w-4" /> },
  { id: "request", label: "New Request", icon: <Plus className="h-4 w-4" /> },
  { id: "messages", label: "Messages", icon: <MessageSquare className="h-4 w-4" /> },
  { id: "bank", label: "Payments", icon: <CreditCard className="h-4 w-4" /> },
];

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



function formatCurrency(amount: number | null) {
  if (amount == null) return "Not specified";
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

function statusBadgeClass(status: ProjectStatus): string {
  const classes: Record<ProjectStatus, string> = {
    funding_pending: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    funds_received: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    in_progress: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    delivered: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  };
  return classes[status];
}

function statusIcon(status: ProjectStatus) {
  const icons: Record<ProjectStatus, ReactNode> = {
    funding_pending: <Clock className="h-4 w-4" />,
    funds_received: <CheckCircle2 className="h-4 w-4" />,
    in_progress: <TrendingUp className="h-4 w-4" />,
    delivered: <Sparkles className="h-4 w-4" />,
  };
  return icons[status];
}

export function DashboardWorkspace({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [notice, setNotice] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectRequest | null>(null);

  const [projectName, setProjectName] = useState("");
  const [wishes, setWishes] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [priority, setPriority] = useState<"normal" | "urgent">("normal");

  async function loadProjects() {
    setIsLoading(true);
    try {
      const response = await fetch("/dashboard/api/projects", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Failed loading projects.");
      }
      setRequests(Array.isArray(data?.projects) ? data.projects : []);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to load projects.");
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

    if (parsedBudget !== null && (!Number.isFinite(parsedBudget) || parsedBudget < 0)) {
      setNotice("Budget must be a valid positive number.");
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
      if (!response.ok) {
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Unable to submit request right now. Please try again."
        );
      }

      if (data?.project) {
        setRequests((prev) => [data.project as ProjectRequest, ...prev]);
      } else {
        await loadProjects();
      }

      setProjectName("");
      setWishes("");
      setBudget("");
      setSelectedServices([]);
      setPriority("normal");
      setActiveTab("projects");

      const generatedId = data?.project?.projectId;
      setNotice(
        generatedId
          ? `🎉 Request submitted! Your Project ID is ${generatedId}. We'll send you a cost estimate within 24-48 hours.`
          : "Request submitted successfully."
      );
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unexpected error. Please try again.");
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

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a1628] via-[#081326] to-[#050714] p-6 sm:p-8"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
        <div className="relative">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                <p className="text-sm font-medium text-cyan-400">Client Workspace</p>
              </div>
              <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Welcome back, {userName.split(' ')[0]}</h1>
              <p className="mt-2 max-w-xl text-slate-400">
                Manage your projects, track progress, and collaborate with our team all in one place.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("request")}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-500/40"
              >
                <Plus className="h-4 w-4" />
                New Project
              </button>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickStat 
              label="Active Projects" 
              value={requests.length} 
              icon={<FolderKanban className="h-5 w-5" />}
              color="cyan"
            />
            <QuickStat 
              label="Awaiting Quote" 
              value={stats.pendingQuote} 
              icon={<Clock className="h-5 w-5" />}
              color="amber"
            />
            <QuickStat 
              label="In Progress" 
              value={stats.inProgress} 
              icon={<TrendingUp className="h-5 w-5" />}
              color="blue"
            />
            <QuickStat 
              label="Total Budget" 
              value={formatCurrency(stats.totalBudget)} 
              icon={<Wallet className="h-5 w-5" />}
              color="emerald"
            />
          </div>
        </div>
      </motion.section>

      {/* Main Content Grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar Navigation */}
        <nav className="space-y-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-100 border border-cyan-500/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className={activeTab === tab.id ? "text-cyan-400" : ""}>{tab.icon}</span>
              {tab.label}
              {tab.badge && (
                <span className="ml-auto rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs text-cyan-300">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}

          {/* Help Card */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <h4 className="text-sm font-semibold text-white">Need help?</h4>
            <p className="mt-1 text-xs text-slate-400">Our team is here to assist you.</p>
            <a 
              href="mailto:info@swarppay.com" 
              className="mt-3 inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
            >
              Contact Support <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="min-h-[600px]">
          <AnimatePresence mode="wait">
            {notice && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-100"
              >
                {notice}
              </motion.div>
            )}
          </AnimatePresence>

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Next Steps / Getting Started */}
              {requests.length === 0 ? (
                <GettingStartedCard onStart={() => setActiveTab("request")} />
              ) : (
                <>
                  {/* Latest Project Progress */}
                  {latestProject && (
                    <ProjectProgressCard 
                      project={latestProject} 
                      onViewDetails={() => {
                        setSelectedProject(latestProject);
                        setActiveTab("projects");
                      }}
                    />
                  )}

                  {/* Recent Activity */}
                  <div className="rounded-2xl border border-white/10 bg-[#081326]/70 p-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Recent Projects</h3>
                      <button 
                        onClick={() => setActiveTab("projects")}
                        className="text-sm text-cyan-400 hover:text-cyan-300"
                      >
                        View all →
                      </button>
                    </div>
                    <div className="mt-4 space-y-3">
                      {requests.slice(0, 3).map((request) => (
                        <ProjectListItem 
                          key={request.projectId} 
                          project={request}
                          onClick={() => {
                            setSelectedProject(request);
                            setActiveTab("projects");
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">My Projects</h2>
                <button
                  onClick={() => setActiveTab("request")}
                  className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-sm text-cyan-300 hover:bg-cyan-500/20"
                >
                  <Plus className="h-4 w-4" /> New Project
                </button>
              </div>

              {isLoading ? (
                <LoadingState />
              ) : requests.length === 0 ? (
                <EmptyState
                  title="No projects yet"
                  description="Start by creating your first project request. We'll review it and send you a cost estimate within 24-48 hours."
                  action={{ label: "Create Project", onClick: () => setActiveTab("request") }}
                />
              ) : (
                <div className="grid gap-4">
                  {requests.map((request) => (
                    <ProjectDetailCard 
                      key={request.projectId} 
                      project={request}
                      isSelected={selectedProject?.projectId === request.projectId}
                      onSelect={() => setSelectedProject(request)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* QUOTES TAB */}
          {activeTab === "quotes" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Quotes & Cost Estimates</h2>
              
              {requests.filter(r => r.quoteStatus !== "pending").length === 0 ? (
                <EmptyState
                  title="No quotes yet"
                  description="Once we review your project requests, you'll receive detailed cost estimates here. This usually takes 24-48 hours."
                />
              ) : (
                <div className="space-y-4">
                  {requests.filter(r => r.quoteStatus !== "pending").map((request) => (
                    <QuoteCard key={request.projectId} project={request} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* REQUEST TAB */}
          {activeTab === "request" && (
            <div className="rounded-2xl border border-white/10 bg-[#081326]/70 p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-white">Start New Project</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Tell us about your project and we&apos;ll send you a detailed cost estimate within 24-48 hours.
                </p>
              </div>

              <form onSubmit={handleSubmitRequest} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">Project Name *</label>
                  <input
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., E-commerce Mobile App"
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-500/50 focus:bg-white/[0.07]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">Services Needed *</label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {SERVICE_OPTIONS.map((service) => {
                      const selected = selectedServices.includes(service.name);
                      return (
                        <button
                          key={service.name}
                          type="button"
                          onClick={() => toggleService(service.name)}
                          className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                            selected
                              ? "border-cyan-500/50 bg-cyan-500/20 text-cyan-100"
                              : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/[0.07]"
                          }`}
                        >
                          <span className="text-xl">{service.icon}</span>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{service.name}</div>
                            <div className="text-xs text-slate-500">{service.timeline}</div>
                          </div>
                          {selected && <CheckCircle2 className="h-4 w-4 text-cyan-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-200">Project Description *</label>
                  <textarea
                    value={wishes}
                    onChange={(e) => setWishes(e.target.value)}
                    placeholder="Describe your project goals, key features, target users, timeline, and any specific requirements..."
                    rows={5}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-500/50 focus:bg-white/[0.07]"
                  />
                  <p className="mt-1 text-xs text-slate-500">Min 20 characters</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">Estimated Budget (USD)</label>
                    <input
                      type="number"
                      min={0}
                      step={1000}
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="50000"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-500/50 focus:bg-white/[0.07]"
                    />
                    <p className="mt-1 text-xs text-slate-500">Optional - helps us scope appropriately</p>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-200">Priority</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPriority("normal")}
                        className={`flex-1 rounded-xl border px-4 py-3 text-sm transition ${
                          priority === "normal"
                            ? "border-cyan-500/50 bg-cyan-500/20 text-cyan-100"
                            : "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        Normal
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriority("urgent")}
                        className={`flex-1 rounded-xl border px-4 py-3 text-sm transition ${
                          priority === "urgent"
                            ? "border-amber-500/50 bg-amber-500/20 text-amber-100"
                            : "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        Urgent
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-500/40 disabled:opacity-60"
                >
                  {isSubmitting ? "Submitting..." : "Submit Request & Get Project ID"}
                </button>
              </form>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === "messages" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white">Messages</h2>
              <EmptyState
                title="No messages yet"
                description="Communications with our team will appear here. You can also reach us directly at info@swarppay.com"
              />
            </div>
          )}

          {/* BANK TAB */}
          {activeTab === "bank" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white">Payments</h2>
              
              {/* Payment Process Steps */}
              <div className="rounded-2xl border border-white/10 bg-[#081326]/70 p-6">
                <h3 className="text-lg font-semibold text-white">How Payments Work</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-4">
                  {[
                    { step: 1, title: "Get Quote", desc: "We send cost estimate" },
                    { step: 2, title: "Approve", desc: "You approve the quote" },
                    { step: 3, title: "Transfer", desc: "Bank transfer with Project ID" },
                    { step: 4, title: "Start", desc: "We begin development" },
                  ].map((item) => (
                    <div key={item.step} className="relative flex items-start gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-sm font-bold text-cyan-400">
                        {item.step}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{item.title}</div>
                        <div className="text-xs text-slate-400">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank Details */}
              <div className="rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-white">
                  <Building2 className="h-5 w-5 text-cyan-400" />
                  Bank Transfer Details
                </h3>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Beneficiary</span>
                    <span className="font-medium text-white">{bankDetails.beneficiary}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Bank</span>
                    <span className="font-medium text-white">{bankDetails.bankName}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">IBAN</span>
                    <span className="font-mono font-medium text-white">{bankDetails.iban}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">SWIFT/BIC</span>
                    <span className="font-mono font-medium text-white">{bankDetails.swift}</span>
                  </div>
                </div>
                <div className="mt-4 rounded-xl bg-amber-500/10 p-3 text-sm text-amber-300">
                  <AlertCircle className="mb-1 inline h-4 w-4" />
                  <strong>Important:</strong> Use your Project ID as the transfer reference (e.g., {bankDetails.referencePrefix}-XXXXXXX)
                </div>
              </div>

              {/* Pending Payments */}
              {requests.filter(r => r.quoteStatus === "sent" && r.status === "funding_pending").length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-[#081326]/70 p-6">
                  <h3 className="text-lg font-semibold text-white">Pending Payments</h3>
                  <div className="mt-4 space-y-3">
                    {requests.filter(r => r.quoteStatus === "sent" && r.status === "funding_pending").map((request) => (
                      <div key={request.projectId} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                        <div>
                          <p className="font-medium text-white">{request.projectName}</p>
                          <p className="text-sm text-slate-400">{request.projectId}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-cyan-400">{formatCurrency(request.quotedAmount)}</p>
                          <p className="text-xs text-slate-500">Quoted amount</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Sub-components

function QuickStat({ label, value, icon, color }: { label: string; value: string | number; icon: ReactNode; color: string }) {
  const colorClasses: Record<string, string> = {
    cyan: "from-cyan-500/20 to-blue-500/20 text-cyan-400",
    amber: "from-amber-500/20 to-orange-500/20 text-amber-400",
    blue: "from-blue-500/20 to-indigo-500/20 text-blue-400",
    emerald: "from-emerald-500/20 to-green-500/20 text-emerald-400",
  };

  return (
    <div className={`rounded-xl border border-white/10 bg-gradient-to-br ${colorClasses[color]} p-4`}>
      <div className="mb-2 opacity-80">{icon}</div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-300">{label}</p>
    </div>
  );
}

function GettingStartedCard({ onStart }: { onStart: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-cyan-500/30 bg-cyan-500/5 p-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20">
        <Sparkles className="h-8 w-8 text-cyan-400" />
      </div>
      <h3 className="text-xl font-bold text-white">Welcome to Your Dashboard</h3>
      <p className="mx-auto mt-2 max-w-md text-slate-400">
        Get started by creating your first project request. Our team will review it and send you a detailed cost estimate.
      </p>
      <button
        onClick={onStart}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition hover:shadow-cyan-500/40"
      >
        <Plus className="h-4 w-4" /> Create Your First Project
      </button>
    </div>
  );
}

function ProjectProgressCard({ project, onViewDetails }: { project: ProjectRequest; onViewDetails: () => void }) {
  const stepIndex = PROJECT_STEPS.findIndex(s => s.status === project.status);
  const progress = ((stepIndex + 1) / PROJECT_STEPS.length) * 100;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#081326]/70 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">Latest Project</p>
          <h3 className="mt-1 text-xl font-bold text-white">{project.projectName}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs ${statusBadgeClass(project.status)}`}>
              {statusIcon(project.status)}
              {statusLabel(project.status)}
            </span>
            <span className="text-xs text-slate-500">{formatRelativeTime(project.createdAtISO)}</span>
          </div>
        </div>
        <button
          onClick={onViewDetails}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-300 hover:bg-white/10"
        >
          View Details
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs text-slate-400">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/10">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex justify-between text-xs">
          {PROJECT_STEPS.slice(0, 4).map((step, i) => (
            <span 
              key={step.label} 
              className={i <= stepIndex ? "text-cyan-400" : "text-slate-600"}
            >
              {step.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectListItem({ project, onClick }: { project: ProjectRequest; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div>
        <p className="font-medium text-white">{project.projectName}</p>
        <p className="text-xs text-slate-400">{project.projectId} • {formatRelativeTime(project.createdAtISO)}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`rounded-full border px-2 py-1 text-xs ${statusBadgeClass(project.status)}`}>
          {statusLabel(project.status)}
        </span>
        <ChevronRight className="h-4 w-4 text-slate-600" />
      </div>
    </button>
  );
}

function ProjectDetailCard({ project, isSelected, onSelect }: { project: ProjectRequest; isSelected: boolean; onSelect: () => void }) {
  return (
    <div 
      onClick={onSelect}
      className={`cursor-pointer rounded-2xl border p-5 transition ${
        isSelected 
          ? "border-cyan-500/50 bg-cyan-500/10" 
          : "border-white/10 bg-[#081326]/70 hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-cyan-400">{project.projectId}</p>
            <span className={`rounded-full border px-2 py-0.5 text-xs ${statusBadgeClass(project.status)}`}>
              {statusLabel(project.status)}
            </span>
          </div>
          <h3 className="mt-1 text-lg font-semibold text-white">{project.projectName}</h3>
        </div>
        <p className="text-sm text-slate-400">{formatDate(project.createdAtISO)}</p>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-slate-300">{project.wishes}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.services.slice(0, 4).map((service) => (
          <span key={service} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300">
            {service}
          </span>
        ))}
        {project.services.length > 4 && (
          <span className="text-xs text-slate-500">+{project.services.length - 4} more</span>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex gap-6 text-sm">
          <div>
            <span className="text-slate-500">Budget: </span>
            <span className="text-white">{formatCurrency(project.budgetUsd)}</span>
          </div>
          {project.quotedAmount && (
            <div>
              <span className="text-slate-500">Quoted: </span>
              <span className="text-cyan-400">{formatCurrency(project.quotedAmount)}</span>
            </div>
          )}
        </div>
        {project.status === "funding_pending" && project.quotedAmount && (
          <button className="rounded-lg bg-cyan-500/20 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/30">
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
}

function QuoteCard({ project }: { project: ProjectRequest }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#081326]/70 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">Project Quote</p>
          <h3 className="text-lg font-semibold text-white">{project.projectName}</h3>
          <p className="text-xs text-slate-500">{project.projectId}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-cyan-400">{formatCurrency(project.quotedAmount)}</p>
          <p className="text-xs text-slate-500">Total project cost</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 border-t border-white/10 pt-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs text-slate-500">Timeline</p>
          <p className="text-sm font-medium text-white">8-12 weeks</p>
        </div>
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs text-slate-500">Payment Terms</p>
          <p className="text-sm font-medium text-white">50% upfront</p>
        </div>
        <div className="rounded-lg bg-white/5 p-3">
          <p className="text-xs text-slate-500">Valid Until</p>
          <p className="text-sm font-medium text-white">{formatDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString())}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white">
          Accept & Pay
        </button>
        <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10">
          Download PDF
        </button>
        <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10">
          Request Changes
        </button>
      </div>
    </div>
  );
}

function EmptyState({ title, description, action }: { title: string; description: string; action?: { label: string; onClick: () => void } }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
        <FolderKanban className="h-6 w-6 text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-cyan-500/20 px-4 py-2 text-sm text-cyan-300 hover:bg-cyan-500/30"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-500 border-t-transparent" />
    </div>
  );
}
