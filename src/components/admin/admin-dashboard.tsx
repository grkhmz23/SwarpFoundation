"use client";

import { useEffect, useState } from "react";
import { RefreshCcw, Bot, FolderKanban, DollarSign, Send, FileText } from "lucide-react";
import { AIStatusPanel } from "./ai-status-panel";
import type { ProjectStatus, QuoteStatus } from "@prisma/client";

type ProjectRequest = {
  projectId: string;
  projectName: string;
  wishes: string;
  services: string[];
  budgetUsd: number | null;
  status: ProjectStatus;
  quotedAmount: number | null;
  quoteStatus: QuoteStatus;
  quoteNotes: string | null;
  quoteValidUntilISO: string | null;
  estimatedWeeks: number | null;
  userName: string;
  userEmail: string;
  createdAtISO: string;
  updatedAtISO: string;
};

type TabId = "projects" | "ai";

const STATUS_OPTIONS: ProjectStatus[] = [
  "funding_pending",
  "funds_received",
  "in_progress",
  "delivered",
];

function statusLabel(status: ProjectStatus): string {
  const labels: Record<ProjectStatus, string> = {
    funding_pending: "Funding Pending",
    funds_received: "Funds Received",
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

function quoteStatusLabel(status: QuoteStatus): string {
  const labels: Record<QuoteStatus, string> = {
    pending: "Pending Quote",
    sent: "Quote Sent",
    approved: "Approved",
    rejected: "Rejected",
  };
  return labels[status];
}

function quoteStatusBadgeClass(status: QuoteStatus): string {
  const classes: Record<QuoteStatus, string> = {
    pending: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    sent: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    approved: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    rejected: "bg-red-500/20 text-red-300 border-red-500/30",
  };
  return classes[status];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatCurrency(amount: number | null) {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabId>("projects");
  const [projects, setProjects] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  
  // Quote form state
  const [quoteAmount, setQuoteAmount] = useState("");
  const [quoteWeeks, setQuoteWeeks] = useState("");
  const [quoteNotes, setQuoteNotes] = useState("");
  const [sendingQuote, setSendingQuote] = useState(false);

  async function loadProjects() {
    setLoading(true);
    setNotice("");
    try {
      const response = await fetch("/admin/api/projects", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Failed to load projects.");
      }
      setProjects(Array.isArray(data?.projects) ? data.projects : []);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to load projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProjects();
  }, []);

  async function updateStatus(projectId: string, status: ProjectStatus) {
    setUpdatingId(projectId);
    setNotice("");

    try {
      const response = await fetch(`/admin/api/projects/${projectId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Failed to update status.");
      }

      const updated = data?.project as ProjectRequest;
      setProjects((prev) => prev.map((item) => (item.projectId === projectId ? updated : item)));
      setNotice(`Updated ${projectId} to ${statusLabel(status)}.`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  async function sendQuote(projectId: string) {
    const amount = quoteAmount.trim() ? Number(quoteAmount) : null;
    const weeks = quoteWeeks.trim() ? Number(quoteWeeks) : null;
    
    if (!amount || amount <= 0) {
      setNotice("Please enter a valid quote amount.");
      return;
    }

    setSendingQuote(true);
    setNotice("");

    try {
      const response = await fetch(`/admin/api/projects/${projectId}/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount,
          weeks,
          notes: quoteNotes.trim() || null,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(typeof data?.error === "string" ? data.error : "Failed to send quote.");
      }

      const updated = data?.project as ProjectRequest;
      setProjects((prev) => prev.map((item) => (item.projectId === projectId ? updated : item)));
      setNotice(`Quote sent for ${projectId}.`);
      
      // Reset form
      setQuoteAmount("");
      setQuoteWeeks("");
      setQuoteNotes("");
      setExpandedProject(null);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to send quote.");
    } finally {
      setSendingQuote(false);
    }
  }

  // Stats
  const stats = {
    total: projects.length,
    pendingQuote: projects.filter(p => p.quoteStatus === "pending").length,
    pendingPayment: projects.filter(p => p.quoteStatus === "sent").length,
    inProgress: projects.filter(p => p.status === "in_progress").length,
    delivered: projects.filter(p => p.status === "delivered").length,
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-white/10 bg-[#081326]/70 p-5 backdrop-blur-sm sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Admin Console</p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-slate-300">Manage projects, quotes, and AI configuration.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <StatCard label="Total Projects" value={stats.total} color="cyan" />
          <StatCard label="Pending Quote" value={stats.pendingQuote} color="amber" />
          <StatCard label="Pending Payment" value={stats.pendingPayment} color="blue" />
          <StatCard label="In Progress" value={stats.inProgress} color="indigo" />
          <StatCard label="Delivered" value={stats.delivered} color="emerald" />
        </div>

        {/* Tab Navigation */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab("projects")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === "projects"
                ? "border border-cyan-200/30 bg-cyan-300/20 text-cyan-100"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            <FolderKanban className="h-4 w-4" />
            Projects
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeTab === "ai"
                ? "border border-cyan-200/30 bg-cyan-300/20 text-cyan-100"
                : "border border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
            }`}
          >
            <Bot className="h-4 w-4" />
            AI Configuration
          </button>
        </div>
      </section>

      {notice ? (
        <div className="mt-4 rounded-lg border border-cyan-200/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-50">
          {notice}
        </div>
      ) : null}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <section className="mt-6 space-y-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Project Management</h2>
            <button
              type="button"
              onClick={() => void loadProjects()}
              className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
            >
              <RefreshCcw className="h-3.5 w-3.5" />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-slate-200">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-slate-200">No project requests found.</div>
          ) : (
            projects.map((project) => (
              <article key={project.projectId} className="rounded-xl border border-white/10 bg-[#081326]/70 p-4">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">{project.projectId}</p>
                      <span className={`rounded-full border px-2 py-0.5 text-xs ${statusBadgeClass(project.status)}`}>
                        {statusLabel(project.status)}
                      </span>
                      <span className={`rounded-full border px-2 py-0.5 text-xs ${quoteStatusBadgeClass(project.quoteStatus)}`}>
                        {quoteStatusLabel(project.quoteStatus)}
                      </span>
                    </div>
                    <h2 className="mt-1 text-lg font-semibold text-white">{project.projectName}</h2>
                    <p className="mt-1 text-sm text-slate-300">{project.userName} ({project.userEmail})</p>
                    <p className="mt-2 text-sm text-slate-300 line-clamp-2">{project.wishes}</p>
                    
                    {/* Quote Info */}
                    {project.quotedAmount && (
                      <div className="mt-3 flex flex-wrap gap-4 rounded-lg bg-white/5 p-3 text-sm">
                        <div>
                          <span className="text-slate-500">Quoted:</span>{" "}
                          <span className="font-semibold text-cyan-300">{formatCurrency(project.quotedAmount)}</span>
                        </div>
                        {project.estimatedWeeks && (
                          <div>
                            <span className="text-slate-500">Timeline:</span>{" "}
                            <span className="font-semibold text-white">{project.estimatedWeeks} weeks</span>
                          </div>
                        )}
                        {project.quoteValidUntilISO && (
                          <div>
                            <span className="text-slate-500">Valid until:</span>{" "}
                            <span className="text-white">{formatDate(project.quoteValidUntilISO)}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <p className="mt-2 text-xs text-slate-400">Created {formatDate(project.createdAtISO)} • Updated {formatDate(project.updatedAtISO)}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <span key={service} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-slate-200">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="min-w-[230px] space-y-3">
                    {/* Status Management */}
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Status</p>
                      <div className="mt-2 grid gap-2">
                        {STATUS_OPTIONS.map((status) => (
                          <button
                            key={status}
                            type="button"
                            disabled={updatingId === project.projectId || project.status === status}
                            onClick={() => void updateStatus(project.projectId, status)}
                            className={`rounded-lg border px-3 py-2 text-left text-xs font-semibold transition ${
                              project.status === status
                                ? "border-cyan-200/40 bg-cyan-300/20 text-cyan-100"
                                : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
                            } disabled:cursor-not-allowed disabled:opacity-70`}
                          >
                            {statusLabel(status)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quote Button */}
                    {project.quoteStatus === "pending" && (
                      <button
                        type="button"
                        onClick={() => setExpandedProject(expandedProject === project.projectId ? null : project.projectId)}
                        className="w-full rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20"
                      >
                        <DollarSign className="mb-0.5 inline h-3.5 w-3.5" />
                        {expandedProject === project.projectId ? "Cancel Quote" : "Send Quote"}
                      </button>
                    )}
                  </div>
                </div>

                {/* Quote Form */}
                {expandedProject === project.projectId && project.quoteStatus === "pending" && (
                  <div className="mt-4 border-t border-white/10 pt-4">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div>
                        <label className="mb-1 block text-xs text-slate-400">Quote Amount (USD)</label>
                        <input
                          type="number"
                          min={0}
                          step={100}
                          value={quoteAmount}
                          onChange={(e) => setQuoteAmount(e.target.value)}
                          placeholder="50000"
                          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-slate-400">Est. Timeline (weeks)</label>
                        <input
                          type="number"
                          min={1}
                          step={1}
                          value={quoteWeeks}
                          onChange={(e) => setQuoteWeeks(e.target.value)}
                          placeholder="8"
                          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs text-slate-400">Valid Until</label>
                        <input
                          type="text"
                          disabled
                          value={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-400"
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <label className="mb-1 block text-xs text-slate-400">Notes (optional)</label>
                      <textarea
                        value={quoteNotes}
                        onChange={(e) => setQuoteNotes(e.target.value)}
                        placeholder="Scope details, payment terms, deliverables..."
                        rows={2}
                        className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500/50"
                      />
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        disabled={sendingQuote}
                        onClick={() => sendQuote(project.projectId)}
                        className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                      >
                        <Send className="mb-0.5 inline h-3.5 w-3.5 mr-1" />
                        {sendingQuote ? "Sending..." : "Send Quote to Client"}
                      </button>
                    </div>
                  </div>
                )}
              </article>
            ))
          )}
        </section>
      )}

      {/* AI Configuration Tab */}
      {activeTab === "ai" && (
        <section className="mt-6">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-white">Swarp AI Configuration</h2>
            <p className="text-sm text-slate-400">Manage LLM provider and model settings.</p>
          </div>
          <AIStatusPanel />
        </section>
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  const colorClasses: Record<string, string> = {
    cyan: "from-cyan-500/20 to-blue-500/20 text-cyan-400",
    amber: "from-amber-500/20 to-orange-500/20 text-amber-400",
    blue: "from-blue-500/20 to-indigo-500/20 text-blue-400",
    indigo: "from-indigo-500/20 to-purple-500/20 text-indigo-400",
    emerald: "from-emerald-500/20 to-green-500/20 text-emerald-400",
  };

  return (
    <div className={`rounded-xl border border-white/10 bg-gradient-to-br ${colorClasses[color]} p-3`}>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-slate-300">{label}</p>
    </div>
  );
}
