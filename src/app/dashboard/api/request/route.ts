import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireSignedInUser } from "@/lib/dashboard-auth";
import { bankDetails } from "@/lib/bank-details";
import { generateProjectId, toDTO } from "@/lib/project-request";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type RequestBody = {
  projectName?: unknown;
  wishes?: unknown;
  services?: unknown;
  budgetUsd?: unknown;
};

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

const REQUEST_INBOX = "info@swarppay.com";

export async function POST(request: Request) {
  let user;
  try {
    user = await requireSignedInUser();
  } catch {
    return jsonError("Unauthorized", 401);
  }

  try {
    const body = (await request.json()) as RequestBody;

    const projectName = typeof body.projectName === "string" ? body.projectName.trim() : "";
    const wishes = typeof body.wishes === "string" ? body.wishes.trim() : "";

    const services = Array.isArray(body.services)
      ? body.services
          .filter((item): item is string => typeof item === "string")
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

    const budgetUsd =
      typeof body.budgetUsd === "number" && Number.isFinite(body.budgetUsd) && body.budgetUsd >= 0
        ? Math.round(body.budgetUsd)
        : null;

    if (projectName.length < 3 || projectName.length > 120) {
      return jsonError("Project name must be between 3 and 120 characters.", 400);
    }

    if (wishes.length < 20 || wishes.length > 6000) {
      return jsonError("Wishes must be between 20 and 6000 characters.", 400);
    }

    if (services.length === 0 || services.length > 20) {
      return jsonError("Select at least one service.", 400);
    }

    const userName = user.name?.trim() || "Client";
    const userEmail = user.email?.trim();

    if (!userEmail) {
      return jsonError("Missing authenticated user email.", 400);
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    if (!smtpHost || !smtpUser || !smtpPass) {
      return jsonError("Mail service is not configured. Please try again later.", 503);
    }

    const projectId = generateProjectId();

    const created = await db.projectRequest.create({
      data: {
        projectId,
        projectName,
        wishes,
        services: services.join(", "),
        budgetUsd,
        userName,
        userEmail,
      },
    });

    const transport = nodemailer.createTransport({
      host: smtpHost,
      port: Number.isNaN(smtpPort) ? 587 : smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const submittedAt = created.createdAt.toISOString();

    await Promise.all([
      transport.sendMail({
        from: `"Swarp Dashboard" <${smtpUser}>`,
        replyTo: userEmail,
        to: REQUEST_INBOX,
        subject: `[Swarp Dashboard] New Project Request ${projectId}`,
        text: [
          `Project ID: ${projectId}`,
          `Submitted At: ${submittedAt}`,
          `User: ${userName}`,
          `User Email: ${userEmail}`,
          `Project Name: ${projectName}`,
          `Services: ${services.join(", ")}`,
          `Budget (USD): ${budgetUsd === null ? "Not specified" : budgetUsd}`,
          "",
          "Wishes:",
          wishes,
        ].join("\n"),
      }),
      transport.sendMail({
        from: `"Swarp Foundation" <${smtpUser}>`,
        to: userEmail,
        subject: `Swarp Project Request Received: ${projectId}`,
        text: [
          `Hi ${userName},`,
          "",
          "Your project request has been received successfully.",
          `Project ID: ${projectId}`,
          `Project Name: ${projectName}`,
          "Status: funding_pending",
          "",
          "Bank transfer instructions:",
          `Beneficiary: ${bankDetails.beneficiary}`,
          `Bank Name: ${bankDetails.bankName}`,
          `IBAN: ${bankDetails.iban}`,
          `SWIFT/BIC: ${bankDetails.swift}`,
          `Transfer Reference: ${bankDetails.referencePrefix}-${projectId}`,
          "",
          "Important: include the exact reference above so we can match funds to your project.",
          "",
          "If you have already transferred, reply to this email with the payment proof.",
          "",
          "Swarp Foundation",
        ].join("\n"),
      }),
    ]);

    return NextResponse.json({ ok: true, project: toDTO(created) });
  } catch (error) {
    console.error("Dashboard request send failure:", error);
    return jsonError("Unable to submit request right now. Please try again later.", 502);
  }
}
