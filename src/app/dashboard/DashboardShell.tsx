"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import DashboardNavbar from "@/components/DashboardNavbar";
import DashboardSidebar from "@/components/DashboardSidebar";
import { sidebarGroups, type Role } from "@/config/sidebar.config";
import { useCurrentUser, useLogout } from "@/hooks/useAuth";
import { UserContext } from "./UserContext";

const allItems = sidebarGroups.flatMap((group) => group.items);

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { data: user, isError } = useCurrentUser();
  const logout = useLogout();

  useEffect(() => {
    if (isError) router.replace("/login");
  }, [isError, router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory text-sm text-brand-muted">
        Loading...
      </div>
    );
  }

  const title =
    allItems
      .filter((item) =>
        item.href === "/dashboard"
          ? pathname === "/dashboard"
          : pathname.startsWith(item.href)
      )
      .sort((a, b) => b.href.length - a.href.length)[0]?.label ?? "Dashboard";

  return (
    <UserContext.Provider value={user}>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex h-screen flex-col bg-ivory">
        <DashboardNavbar
          title={title}
          name={user.name}
          role={user.role}
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={() => logout.mutate()}
        />

        <div className="flex min-h-0 flex-1">
          <DashboardSidebar
            role={user.role as Role}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="min-w-0 flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
            {children}
          </main>
        </div>
      </div>
    </UserContext.Provider>
  );
}