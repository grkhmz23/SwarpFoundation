import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type SessionUser = {
  name?: string | null;
  email?: string | null;
};

function parseAdminEmails(raw: string | undefined): Set<string> {
  if (!raw) return new Set();
  return new Set(
    raw
      .split(",")
      .map((item) => item.trim().toLowerCase())
      .filter(Boolean)
  );
}

export async function requireSignedInUser(): Promise<SessionUser> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("UNAUTHORIZED");
  }
  return {
    name: session.user.name,
    email: session.user.email,
  };
}

export async function requireAdminUser(): Promise<SessionUser> {
  const user = await requireSignedInUser();
  const admins = parseAdminEmails(process.env.ADMIN_EMAILS);

  if (admins.size === 0 || !user.email || !admins.has(user.email.toLowerCase())) {
    throw new Error("FORBIDDEN");
  }

  return user;
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const admins = parseAdminEmails(process.env.ADMIN_EMAILS);
  return admins.has(email.toLowerCase());
}
