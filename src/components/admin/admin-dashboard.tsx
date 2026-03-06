"use client";

import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";

type ProjectStatus = "funding_pending" | "funds_received" | "in_progress" | "delivered";

type ProjectRequest = {
  projectId: string;
  projectName: string;
  wishes: string;
  services: string[];
  budgetUsd: number | null;
  status: ProjectStatus;
  userName: string;
  userEmail: string;
  createdAtISO: string;
  updatedAtISO: string;
};

const STATUS_OPTIONS: ProjectStatus[] = [
  "funding_pending",
  "funds_received",
  "in_progress",
  "delivered",
];

function statusLabel(status: ProjectStatus): string {
  if (status === "funding_pending") return "Funding Pending";
  if (status === "funds_received") return "Funds Received";
  if (status === "in_progress") return "In Progress";
  return "Delivered";
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function AdminDashboard() {
  const [projects, setProjects] = useState<ProjectRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-white/10 bg-[#081326]/70 p-5 backdrop-blur-sm sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/70">Admin Console</p>
            <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Project Status Management</h1>
            <p className="mt-2 text-sm text-slate-300">Review project requests and update lifecycle status.</p>
          </div>
          <button
            type="button"
            onClick={() => void loadProjects()}
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
          >
            <RefreshCcw className="h-3.5 w-3.5" />
            Refresh
          </button>
        </div>
      </section>

      {notice ? (
        <div className="mt-4 rounded-lg border border-cyan-200/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-50">
          {notice}
        </div>
      ) : null}

      <section className="mt-6 space-y-3">
        {loading ? (
          <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-slate-200">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/20 bg-white/5 p-6 text-center text-slate-200">No project requests found.</div>
        ) : (
          projects.map((project) => (
            <article key={project.projectId} className="rounded-xl border border-white/10 bg-[#081326]/70 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-cyan-200/80">{project.projectId}</p>
                  <h2 className="mt-1 text-lg font-semibold text-white">{project.projectName}</h2>
                  <p className="mt-1 text-sm text-slate-300">{project.userName} ({project.userEmail})</p>
                  <p className="mt-2 text-sm text-slate-300">{project.wishes}</p>
                  <p className="mt-2 text-xs text-slate-400">Created {formatDate(project.createdAtISO)} • Updated {formatDate(project.updatedAtISO)}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.services.map((service) => (
                      <span key={service} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-slate-200">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="min-w-[230px] rounded-lg border border-white/10 bg-white/5 p-3">
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
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
