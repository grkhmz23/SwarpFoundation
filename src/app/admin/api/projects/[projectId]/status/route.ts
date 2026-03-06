import { ProjectStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { requireAdminUser } from "@/lib/dashboard-auth";
import { toDTO } from "@/lib/project-request";
import { bankDetails } from "@/lib/bank-details";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RequestBody = {
  status?: unknown;
};

const ALLOWED_STATUS: ProjectStatus[] = [
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

export async function PATCH(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    await requireAdminUser();
  } catch (error) {
    const message = error instanceof Error ? error.message : "FORBIDDEN";
    const status = message === "UNAUTHORIZED" ? 401 : 403;
    return NextResponse.json({ error: message === "UNAUTHORIZED" ? "Unauthorized" : "Forbidden" }, { status });
  }

  const body = (await request.json()) as RequestBody;
  const nextStatus = typeof body.status === "string" ? body.status : "";

  if (!ALLOWED_STATUS.includes(nextStatus as ProjectStatus)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const existing = await db.projectRequest.findUnique({
    where: { projectId: params.projectId },
  });

  if (!existing) {
    return NextResponse.json({ error: "Project not found." }, { status: 404 });
  }

  const updated = await db.projectRequest.update({
    where: { projectId: params.projectId },
    data: { status: nextStatus as ProjectStatus },
  });

  if (existing.status !== updated.status) {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transport = nodemailer.createTransport({
          host: smtpHost,
          port: Number.isNaN(smtpPort) ? 587 : smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        await transport.sendMail({
          from: `"Swarp Foundation" <${smtpUser}>`,
          to: updated.userEmail,
          subject: `Project ${updated.projectId} Status Updated: ${statusLabel(updated.status)}`,
          text: [
            `Hi ${updated.userName},`,
            "",
            `Your project status has been updated.`,
            `Project ID: ${updated.projectId}`,
            `Project Name: ${updated.projectName}`,
            `Previous Status: ${statusLabel(existing.status)}`,
            `Current Status: ${statusLabel(updated.status)}`,
            "",
            "If you have payment-related questions, use this transfer reference:",
            `${bankDetails.referencePrefix}-${updated.projectId}`,
            "",
            "For support, reply to this email or contact info@swarppay.com.",
            "",
            "Swarp Foundation",
          ].join("\n"),
        });
      } catch (error) {
        console.error("Failed to send project status notification email:", error);
      }
    }
  }

  return NextResponse.json({ ok: true, project: toDTO(updated) });
}
