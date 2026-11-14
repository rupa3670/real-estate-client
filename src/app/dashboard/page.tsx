"use client";

import Link from "next/link";
import {
  FolderKanban,
  Users,
  AlertTriangle,
  Clock,
  HardHat,
  UserPlus,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { useUser } from "./UserContext";
import { ExpenseChart, ProjectStatusChart } from "@/components/DashboardCharts";
import {
  useDashboardStats,
  type DashboardStats,
} from "@/hooks/useDashboardState";

type Card = {
  label: string;
  note: string;
  statKey?: keyof DashboardStats;
};

const icons: Record<string, LucideIcon> = {
  "Total Projects": FolderKanban,
  Users: Users,
  "Over Budget": AlertTriangle,
  "Pending Requests": Clock,
  Masons: HardHat,
};

const cards: Record<string, Card[]> = {
  admin: [
    { label: "Total Projects", note: "All projects", statKey: "projects" },
    { label: "Users", note: "Managers and accountants", statKey: "users" },
    { label: "Over Budget", note: "Needs your review", statKey: "overBudget" },
    {
      label: "Pending Requests",
      note: "Waiting for approval",
      statKey: "pendingRequests",
    },
    { label: "Masons", note: "Active mesons", statKey: "mesons" },
  ],
  manager: [
    { label: "My Projects", note: "Assigned to you" },
    { label: "My Requests", note: "Fund requests sent" },
    { label: "Low Stock", note: "Materials below minimum" },
  ],
  accountant: [
    { label: "Pending Requests", note: "Waiting for your review" },
    { label: "Ready to Pay", note: "Approved requests" },
    { label: "Paid This Month", note: "Total payments" },
  ],
};

export default function DashboardPage() {
  const user = useUser();
  const name = user?.name ?? "";
  const role = user?.role ?? "";

  const { data, isLoading } = useDashboardStats(role === "admin");

  const list = cards[role] ?? [];

  const getValue = (c: Card) => {
    if (!c.statKey) return "0";
    if (isLoading) return "–";
    const value = data?.stats[c.statKey];
    return typeof value === "number" ? String(value) : "0";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium capitalize text-coral-dark">
            {role}
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-brand-dark">
            Welcome back, {name}
          </h1>
          <p className="mt-1 text-sm text-brand-muted">
            Here is what is happening across your projects today.
          </p>
        </div>

        {role === "admin" && (
          <Link
            href="/dashboard/users/new"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition hover:bg-coral-dark"
          >
            <UserPlus size={18} />
            Create User
            <ArrowUpRight size={16} />
          </Link>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((c) => {
          const Icon = icons[c.label] ?? FolderKanban;
          return (
            <div
              key={c.label}
              className="group rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(43,38,35,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(63,74,143,0.28)]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-brand-muted">
                  {c.label}
                </p>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral-soft text-coral-dark">
                  <Icon size={20} />
                </span>
              </div>
              <p className="mt-4 text-4xl font-bold tracking-tight text-brand-dark">
                {getValue(c)}
              </p>
              <p className="mt-1 text-sm text-brand-muted">{c.note}</p>
            </div>
          );
        })}
      </div>

      {role === "admin" && (
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ExpenseChart
              data={data?.stats.expenseByProject}
              loading={isLoading}
            />
          </div>
          <ProjectStatusChart
            data={data?.stats.projectStatus}
            loading={isLoading}
          />
        </div>
      )}
    </div>
  );
}