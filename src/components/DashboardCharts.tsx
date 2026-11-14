"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ExpensePoint, StatusPoint } from "@/hooks/useDashboardState";

const INDIGO = "#5b66b0";
const INDIGO_LIGHT = "#9aa3d6";
const GRID = "#e3e6ee";
const MUTED = "#7b8095";

const STATUS_META: Record<string, { label: string; color: string }> = {
  running: { label: "Running", color: "#5b66b0" },
  planned: { label: "Planned", color: "#9aa3d6" },
  on_hold: { label: "On hold", color: "#e0b25c" },
  completed: { label: "Completed", color: "#5fae7e" },
};

const cardClass =
  "rounded-3xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(38,42,66,0.05)]";

function EmptyCard({
  title,
  subtitle,
  loading,
}: {
  title: string;
  subtitle: string;
  loading: boolean;
}) {
  return (
    <div className={cardClass}>
      <h3 className="text-base font-semibold text-brand-dark">{title}</h3>
      <p className="text-sm text-brand-muted">{subtitle}</p>
      <div className="flex h-56 items-center justify-center text-sm text-brand-muted">
        {loading ? "Loading..." : "No data yet"}
      </div>
    </div>
  );
}

export function ExpenseChart({
  data,
  loading = false,
}: {
  data?: ExpensePoint[];
  loading?: boolean;
}) {
  if (!data || data.length === 0) {
    return (
      <EmptyCard
        title="Expense Overview"
        subtitle="Expense vs budget, by project"
        loading={loading}
      />
    );
  }

  return (
    <div className={cardClass}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-brand-dark">
            Expense Overview
          </h3>
          <p className="text-sm text-brand-muted">
            Expense vs budget, by project
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs text-brand-muted">
          <span className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: INDIGO }}
            />
            Expense
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: INDIGO_LIGHT }}
            />
            Budget
          </span>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
            barGap={6}
          >
            <CartesianGrid stroke={GRID} strokeDasharray="4 4" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: MUTED, fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: MUTED, fontSize: 12 }}
              tickFormatter={(v: number) =>
                v >= 1_000_000
                  ? `${(v / 1_000_000).toFixed(1)}M`
                  : v >= 1000
                    ? `${Math.round(v / 1000)}k`
                    : String(v)
              }
            />
            <Tooltip
              cursor={{ fill: "rgba(154,163,214,0.12)" }}
              formatter={(v) => `৳ ${Number(v).toLocaleString()}`}
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #dcdfe6",
                boxShadow: "0 10px 30px -12px rgba(38,42,66,0.25)",
                fontSize: 13,
              }}
            />
            <Bar
              dataKey="budget"
              name="Budget"
              fill={INDIGO_LIGHT}
              radius={[8, 8, 0, 0]}
              maxBarSize={48}
            />
            <Bar
              dataKey="expense"
              name="Expense"
              fill={INDIGO}
              radius={[8, 8, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ProjectStatusChart({
  data,
  loading = false,
}: {
  data?: StatusPoint[];
  loading?: boolean;
}) {
  const chartData = (data ?? [])
    .filter((d) => d.value > 0)
    .map((d) => ({
      name: STATUS_META[d.status]?.label ?? d.status,
      value: d.value,
      color: STATUS_META[d.status]?.color ?? "#cfd3e3",
    }));

  if (chartData.length === 0) {
    return (
      <EmptyCard
        title="Project Status"
        subtitle="Breakdown of all projects"
        loading={loading}
      />
    );
  }

  const total = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className={cardClass}>
      <h3 className="text-base font-semibold text-brand-dark">Project Status</h3>
      <p className="text-sm text-brand-muted">Breakdown of all projects</p>

      <div className="relative mt-2 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={68}
              outerRadius={92}
              paddingAngle={3}
              cornerRadius={8}
              stroke="none"
            >
              {chartData.map((d) => (
                <Cell key={d.name} fill={d.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "1px solid #dcdfe6",
                fontSize: 13,
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-brand-dark">{total}</span>
          <span className="text-xs text-brand-muted">Projects</span>
        </div>
      </div>

      <ul className="mt-3 space-y-2">
        {chartData.map((d) => (
          <li key={d.name} className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-brand-muted">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: d.color }}
              />
              {d.name}
            </span>
            <span className="font-semibold text-brand-dark">{d.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}