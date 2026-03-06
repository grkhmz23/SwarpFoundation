import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireSignedInUser } from "@/lib/dashboard-auth";
import { toDTO } from "@/lib/project-request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  let user;
  try {
    user = await requireSignedInUser();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await db.projectRequest.findMany({
    where: { userEmail: user.email || "" },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ projects: projects.map(toDTO) });
}
