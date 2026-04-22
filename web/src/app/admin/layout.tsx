import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { getSession } from "@/lib/auth";

export const metadata = { title: "Admin — MoreliDev" };

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  const isLogin = !session;

  if (isLogin) {
    return <div className="min-h-screen bg-[#0a0a0a]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex">
      <AdminSidebar email={session.email} />
      <main className="flex-1 ml-0 lg:ml-64 p-6 lg:p-10">{children}</main>
    </div>
  );
}
