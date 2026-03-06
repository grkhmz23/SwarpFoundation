"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BadgeCheck, Building2, FolderKanban, RefreshCcw, Send, Wallet } from "lucide-react";
import { bankDetails } from "@/lib/bank-details";

type ProjectStatus = "funding_pending" | "funds_received" | "in_progress" | "delivered";

type ProjectRequest = {
  projectId: string;
  projectName: string;
  wishes: string;
  services: string[];
  budgetUsd: number | null;
  status: ProjectStatus;
  createdAtISO: string;
  updatedAtISO: string;
};

type TabId = "overview" | "request" | "projects" | "bank";

const TABS: Array<{ id: TabId; label: string }> = [
  { id: "overview", label: "Overview" },
  { id: "request", label: "New Request" },
  { id: "projects", label: "My Project IDs" },
  { id: "bank", label: "Bank Transfer" },
];

const SERVICE_OPTIONS = [
  "Web & Mobile Development",
  "Software Tools",
  "AI Systems",
  "Blockchain Development",
  "Security Audits",
  "Hardware Prototyping",
  "Cloud & DevOps",
  "Engineering Retainer",
  "Integrations",
  "Data Analytics",
  "QA Testing",
  "UI/UX Design",
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

function statusLabel(status: ProjectStatus): string {
  if (status === "funding_pending") return "Funding Pending";
  if (status === "funds_received") return "Funds Received";
  if (status === "in_progress") return "In Progress";
  return "Delivered";
}

function statusBadgeClass(status: ProjectStatus): string {
  if (status === "funding_pending") return "bg-amber-400/20 text-amber-200";
  if (status === "funds_received") return "bg-cyan-300/20 text-cyan-100";
  if (status === "in_progress") return "bg-blue-300/20 text-blue-100";
  return "bg-emerald-400/20 text-emerald-200";
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

  const [projectName, setProjectName] = useState("");
  const [wishes, setWishes] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const pendingFunding = useMemo(
    () => requests.filter((item) => item.status === "funding_pending").length,
    [requests]
  );
  const latestProjectId = requests[0]?.projectId ?? "-";

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
      setActiveTab("projects");

      const generatedId = data?.project?.projectId;
      setNotice(
        generatedId
          ? `Request submitted. Your Project ID is ${generatedId}. Use this as your bank transfer reference.`
          : "Request submitted successfully."
      );
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unexpected error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-white/10 bg-[#081326]/70 p-5 backdrop-blur-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Client Console</p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Welcome, {userName}</h1>
            <p className="mt-2 text-sm text-slate-300">
              Submit project wishes, receive your Project ID, and fund your project via bank transfer with that ID as reference.
            </p>
          </div>
          <div className="rounded-xl border border-cyan-200/20 bg-cyan-300/10 px-4 py-3 text-xs text-cyan-50">
            Signed in as <span className="font-semibold">{userEmail}</span>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Project Requests" value={String(requests.length)} icon={<FolderKanban className="h-4 w-4" />} />
        <MetricCard label="Pending Funding" value={String(pendingFunding)} icon={<Wallet className="h-4 w-4" />} />
        <MetricCard label="Latest Project ID" value={latestProjectId} icon={<BadgeCheck className="h-4 w-4" />} />
        <MetricCard label="Payment Method" value="Bank Transfer" icon={<Building2 className="h-4 w-4" />} />
      </section>

      <section className="mt-6 rounded-2xl border border-white/10 bg-[#081326]/70 p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-cyan-300/20 text-cyan-100 border border-cyan-200/30"
                  : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => void loadProjects()}
            className="ml-auto inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </div>

        {notice ? (
          <div className="mt-3 rounded-lg border border-cyan-200/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-50">
            {notice}
          </div>
        ) : null}

        <div className="mt-5">
          {activeTab === "overview" && (
            <div className="space-y-3">
              {isLoading ? (
                <EmptyState title="Loading projects" description="Please wait while we fetch your requests." />
              ) : requests.length === 0 ? (
                <EmptyState
                  title="No project requests yet"
                  description="Create your first request to generate a Project ID and notify the admin by email."
                />
              ) : (
                requests.slice(0, 5).map((request) => (
                  <article key={request.projectId} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">{request.projectId}</p>
                        <h3 className="mt-1 text-lg font-semibold text-white">{request.projectName}</h3>
                        <p className="mt-1 text-sm text-slate-300 line-clamp-2">{request.wishes}</p>
                      </div>
                      <div className="text-sm text-slate-300">
                        <div>Budget: <span className="font-semibold text-white">{formatCurrency(request.budgetUsd)}</span></div>
                        <div>Created: <span className="font-semibold text-white">{formatDate(request.createdAtISO)}</span></div>
                        <div className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${statusBadgeClass(request.status)}`}>
                          {statusLabel(request.status)}
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          )}

          {activeTab === "request" && (
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-200">Project Name</label>
                <input
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  placeholder="Swarp Mobile Wallet 2.0"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white outline-none focus:border-cyan-300/50"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Select Services</label>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {SERVICE_OPTIONS.map((service) => {
                    const selected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`rounded-lg border px-3 py-2 text-left text-sm transition ${
                          selected
                            ? "border-cyan-200/40 bg-cyan-300/20 text-cyan-50"
                            : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-200">Wishes / Scope</label>
                <textarea
                  value={wishes}
                  onChange={(event) => setWishes(event.target.value)}
                  placeholder="Explain goals, features, integrations, timelines, and constraints..."
                  rows={6}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white outline-none focus:border-cyan-300/50"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-200">Estimated Budget (USD, optional)</label>
                <input
                  type="number"
                  min={0}
                  step={500}
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white outline-none focus:border-cyan-300/50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/40 bg-cyan-300/20 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-300/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {isSubmitting ? "Submitting..." : "Submit Request & Generate Project ID"}
              </button>
            </form>
          )}

          {activeTab === "projects" && (
            <div>
              {isLoading ? (
                <EmptyState title="Loading project IDs" description="Please wait while we fetch your requests." />
              ) : requests.length === 0 ? (
                <EmptyState
                  title="No Project IDs yet"
                  description="After submitting a request, your Project ID will appear here."
                />
              ) : (
                <div className="space-y-3">
                  {requests.map((request) => (
                    <article key={request.projectId} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.18em] text-cyan-200/80">Project ID</p>
                          <p className="text-xl font-bold text-cyan-100">{request.projectId}</p>
                          <p className="mt-1 text-sm text-slate-300">{request.projectName}</p>
                          <p className="mt-1 text-xs text-slate-400">Created {formatDate(request.createdAtISO)}</p>
                        </div>
                        <div className={`rounded-lg border px-3 py-2 text-xs ${statusBadgeClass(request.status)} border-current/30`}>
                          Status: <span className="font-semibold">{statusLabel(request.status)}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {request.services.map((service) => (
                          <span key={service} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-slate-200">
                            {service}
                          </span>
                        ))}
                      </div>
                      <p className="mt-3 text-xs text-slate-300">
                        Transfer reference: <span className="font-semibold text-cyan-100">{bankDetails.referencePrefix}-{request.projectId}</span>
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "bank" && (
            <div className="space-y-4">
              <article className="rounded-xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Transfer Instructions</h3>
                <ol className="mt-3 space-y-2 text-sm text-slate-200">
                  <li>1. Submit your project request from the New Request tab.</li>
                  <li>2. Use your generated Project ID as the bank transfer reference.</li>
                  <li>3. Transfer funds to the company bank account below.</li>
                  <li>4. Email transfer proof and Project ID to info@swarppay.com.</li>
                </ol>
              </article>

              <article className="rounded-xl border border-cyan-200/20 bg-cyan-300/10 p-4">
                <h4 className="text-sm uppercase tracking-[0.18em] text-cyan-100/90">Company Bank Account</h4>
                <div className="mt-3 grid gap-2 text-sm text-cyan-50">
                  <p>Beneficiary: <span className="font-semibold">{bankDetails.beneficiary}</span></p>
                  <p>Bank Name: <span className="font-semibold">{bankDetails.bankName}</span></p>
                  <p>IBAN: <span className="font-semibold">{bankDetails.iban}</span></p>
                  <p>SWIFT/BIC: <span className="font-semibold">{bankDetails.swift}</span></p>
                  <p>Reference format: <span className="font-semibold">{bankDetails.referencePrefix}-&lt;YOUR_PROJECT_ID&gt;</span></p>
                </div>
              </article>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-[#081326]/70 p-4">
      <div className="mb-2 inline-flex rounded-lg border border-white/15 bg-white/5 p-2 text-cyan-200">{icon}</div>
      <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white break-all">{value}</p>
    </article>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center">
      <p className="text-lg font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-slate-300">{description}</p>
    </div>
  );
}
