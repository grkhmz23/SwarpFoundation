import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminUser } from "@/lib/dashboard-auth";
import { toDTO } from "@/lib/project-request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    await requireAdminUser();
  } catch (error) {
    const message = error instanceof Error ? error.message : "FORBIDDEN";
    const status = message === "UNAUTHORIZED" ? 401 : 403;
    return NextResponse.json({ error: message === "UNAUTHORIZED" ? "Unauthorized" : "Forbidden" }, { status });
  }

  const projects = await db.projectRequest.findMany({ orderBy: { createdAt: "desc" } });

  return NextResponse.json({ projects: projects.map(toDTO) });
}
