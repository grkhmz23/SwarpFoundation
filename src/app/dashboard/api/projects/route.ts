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

  try {
    const projects = await db.projectRequest.findMany({
      where: { userEmail: user.email || "" },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ projects: projects.map(toDTO) });
  } catch (error) {
    console.error("Failed to load projects:", error);
    return NextResponse.json(
      { error: "Failed to load projects. Please try again." },
      { status: 500 }
    );
  }
}
