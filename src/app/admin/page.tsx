import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { isAdminEmail } from "@/lib/dashboard-auth";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export default async function AdminPage() {
  const session = await getAuthSession();

  if (!session?.user?.email) {
    redirect("/auth/signin?callbackUrl=/admin");
  }

  if (!isAdminEmail(session.user.email)) {
    redirect("/dashboard");
  }

  return <AdminDashboard />;
}
