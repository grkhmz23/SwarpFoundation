import { redirect } from "next/navigation";
import { DashboardWorkspace } from "@/components/dashboard/dashboard-workspace";
import { getAuthSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    redirect("/auth/signin?callbackUrl=/dashboard");
  }

  return (
    <DashboardWorkspace
      userName={session.user.name ?? "Builder"}
      userEmail={session.user.email}
    />
  );
}
