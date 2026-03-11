import { ProjectRequest, ProjectStatus, QuoteStatus } from "@prisma/client";

export type ProjectRequestDTO = {
  projectId: string;
  projectName: string;
  wishes: string;
  services: string[];
  budgetUsd: number | null;
  status: ProjectStatus;
  // Quote fields
  quotedAmount: number | null;
  quoteStatus: QuoteStatus;
  quoteNotes: string | null;
  quoteValidUntilISO: string | null;
  // Timeline
  estimatedWeeks: number | null;
  startDateISO: string | null;
  deliveryDateISO: string | null;
  userName: string;
  userEmail: string;
  createdAtISO: string;
  updatedAtISO: string;
};

export function generateProjectId(): string {
  const now = new Date();
  const y = String(now.getUTCFullYear());
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const token = crypto.randomUUID().split("-")[0].slice(0, 6).toUpperCase();
  return `SWP-${y}${m}${d}-${token}`;
}

export function parseServices(raw: string): string[] {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function toDTO(project: ProjectRequest): ProjectRequestDTO {
  return {
    projectId: project.projectId,
    projectName: project.projectName,
    wishes: project.wishes,
    services: parseServices(project.services),
    budgetUsd: project.budgetUsd,
    status: project.status,
    // Quote fields
    quotedAmount: project.quotedAmount ?? null,
    quoteStatus: project.quoteStatus,
    quoteNotes: project.quoteNotes ?? null,
    quoteValidUntilISO: project.quoteValidUntil?.toISOString() ?? null,
    // Timeline
    estimatedWeeks: project.estimatedWeeks ?? null,
    startDateISO: project.startDate?.toISOString() ?? null,
    deliveryDateISO: project.deliveryDate?.toISOString() ?? null,
    userName: project.userName,
    userEmail: project.userEmail,
    createdAtISO: project.createdAt.toISOString(),
    updatedAtISO: project.updatedAt.toISOString(),
  };
}
