import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { isAdminEmail } from "@/lib/dashboard-auth";
import { SignOutButton } from "@/components/dashboard/sign-out-button";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    redirect("/auth/signin?callbackUrl=/dashboard");
  }

  const isAdmin = isAdminEmail(session.user.email);

  return (
    <main className="min-h-screen pt-28 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#081326]/70 p-3">
          <div className="flex items-center gap-3 text-sm text-slate-200">
            <Link href="/" className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10">
              Back to Site
            </Link>
            <span className="text-white/40">/</span>
            <span className="font-semibold text-cyan-100">Dashboard</span>
            {isAdmin ? (
              <Link href="/admin" className="rounded-lg border border-cyan-200/30 bg-cyan-300/15 px-3 py-1.5 text-cyan-100 hover:bg-cyan-300/25">
                Admin Panel
              </Link>
            ) : null}
          </div>
          <SignOutButton />
        </div>
      </div>
      {children}
    </main>
  );
}
