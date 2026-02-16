import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (message.length < 2 || message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be between 2 and 5000 characters." },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number.parseInt(process.env.SMTP_PORT ?? "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactToEmail = process.env.CONTACT_TO_EMAIL ?? "info@swarppay.com";

    if (!smtpHost || !smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: "Mail service is not configured. Please try again later." },
        { status: 503 }
      );
    }

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
      from: `"Swarp Contact Form" <${smtpUser}>`,
      replyTo: email,
      to: contactToEmail,
      subject: `[Swarp Contact] Message from ${email}`,
      text: `Email: ${email}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form SMTP send failure:", error);
    return NextResponse.json(
      { error: "Unable to send message right now. Please try again later." },
      { status: 502 }
    );
  }
}
