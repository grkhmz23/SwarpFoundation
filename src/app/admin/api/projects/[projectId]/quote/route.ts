import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdminUser } from "@/lib/dashboard-auth";
import { toDTO } from "@/lib/project-request";
import nodemailer from "nodemailer";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RequestBody = {
  amount?: unknown;
  weeks?: unknown;
  notes?: unknown;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    await requireAdminUser();
  } catch {
    return jsonError("Unauthorized", 401);
  }

  const { projectId } = params;

  try {
    const body = (await request.json()) as RequestBody;

    const amount =
      typeof body.amount === "number" && Number.isFinite(body.amount) && body.amount >= 0
        ? Math.round(body.amount)
        : null;

    const weeks =
      typeof body.weeks === "number" && Number.isFinite(body.weeks) && body.weeks >= 1
        ? Math.round(body.weeks)
        : null;

    const notes = typeof body.notes === "string" ? body.notes.trim() : null;

    if (amount === null) {
      return jsonError("Valid quote amount is required.", 400);
    }

    const existing = await db.projectRequest.findUnique({
      where: { projectId },
    });

    if (!existing) {
      return jsonError("Project not found.", 404);
    }

    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + 30);

    const updated = await db.projectRequest.update({
      where: { projectId },
      data: {
        quotedAmount: amount,
        quoteStatus: "sent",
        quoteNotes: notes,
        quoteValidUntil: validUntil,
        estimatedWeeks: weeks,
      },
    });

    // Send email notification to client
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpHost && smtpUser && smtpPass) {
      const transport = nodemailer.createTransport({
        host: smtpHost,
        port: Number.isNaN(smtpPort) ? 587 : smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const formattedAmount = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(amount);

      const emailBody = [
        `Hi ${existing.userName},`,
        "",
        `We're pleased to provide you with a cost estimate for your project: ${existing.projectName}`,
        "",
        `Project ID: ${projectId}`,
        `Quoted Amount: ${formattedAmount}`,
        weeks ? `Estimated Timeline: ${weeks} weeks` : "",
        `Quote Valid Until: ${validUntil.toLocaleDateString()}`,
        "",
        notes ? `Notes: ${notes}` : "",
        "",
        "Next Steps:",
        "1. Review the quote in your dashboard",
        "2. Accept the quote to proceed",
        "3. Transfer funds using your Project ID as reference",
        "",
        "If you have any questions, please reply to this email.",
        "",
        "Best regards,",
        "Swarp Foundation Team",
      ]
        .filter(Boolean)
        .join("\n");

      await transport.sendMail({
        from: `"Swarp Foundation" <${smtpUser}>`,
        to: existing.userEmail,
        subject: `Cost Estimate for ${existing.projectName} - ${projectId}`,
        text: emailBody,
      });
    }

    return NextResponse.json({ ok: true, project: toDTO(updated) });
  } catch (error) {
    console.error("Quote send error:", error);
    return jsonError("Failed to send quote.", 500);
  }
}
