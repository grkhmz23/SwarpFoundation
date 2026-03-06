import { ProjectRequest, ProjectStatus } from "@prisma/client";

export type ProjectRequestDTO = {
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
    userName: project.userName,
    userEmail: project.userEmail,
    createdAtISO: project.createdAt.toISOString(),
    updatedAtISO: project.updatedAt.toISOString(),
  };
}
