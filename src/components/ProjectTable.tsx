import type { ListProject, ProjectStatus } from "@/hooks/useProject";

const th =
  "px-5 pb-1 text-left text-[11px] font-semibold uppercase tracking-wider text-brand-muted/70";
const cell =
  "bg-white px-5 py-4 text-sm shadow-[0_6px_20px_-10px_rgba(38,42,66,0.15)] transition group-hover:shadow-[0_14px_30px_-12px_rgba(63,74,143,0.28)]";

const statusStyle: Record<ProjectStatus, { label: string; pill: string; dot: string }> = {
  planned: { label: "Planned", pill: "bg-slate-100 text-slate-600", dot: "bg-slate-400" },
  running: { label: "Running", pill: "bg-coral-soft text-coral-dark", dot: "bg-coral" },
  on_hold: { label: "On hold", pill: "bg-amber-50 text-amber-700", dot: "bg-amber-500" },
  completed: { label: "Completed", pill: "bg-green-50 text-green-700", dot: "bg-green-500" },
};

const fmtDate = (d?: string) => (d ? new Date(d).toLocaleDateString() : "—");

export default function ProjectsTable({
  projects,
  loading,
  showManager,
}: {
  projects: ListProject[];
  loading: boolean;
  showManager: boolean;
}) {
  const emptyText = loading
    ? "Loading..."
    : projects.length === 0
      ? "No projects found"
      : "";
  const cols = showManager ? 6 : 5;

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[820px] border-separate border-spacing-y-3 text-left">
        <thead>
          <tr>
            <th className={th}>Project</th>
            {showManager && <th className={th}>Manager</th>}
            <th className={th}>Budget</th>
            <th className={th}>Status</th>
            <th className={th}>Start</th>
            <th className={th}>End</th>
          </tr>
        </thead>

        <tbody>
          {emptyText && (
            <tr>
              <td
                colSpan={cols}
                className="rounded-2xl bg-white py-10 text-center text-sm text-brand-muted shadow-[0_6px_20px_-10px_rgba(38,42,66,0.15)]"
              >
                {emptyText}
              </td>
            </tr>
          )}

          {projects.map((p) => {
            const s = statusStyle[p.status] ?? statusStyle.planned;
            return (
              <tr key={p._id} className="group transition hover:-translate-y-0.5">
                <td className={`${cell} rounded-l-2xl`}>
                  <p className="font-semibold text-brand-dark">{p.name}</p>
                  <p className="text-xs text-brand-muted">{p.location}</p>
                </td>

                {showManager && (
                  <td className={cell}>
                    <p className="font-medium text-brand-dark">{p.manager?.name ?? "—"}</p>
                    <p className="text-xs text-brand-muted">{p.manager?.email}</p>
                  </td>
                )}

                <td className={`${cell} font-semibold text-brand-dark`}>
                  ৳ {p.estimatedBudget.toLocaleString()}
                </td>

                <td className={cell}>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${s.pill}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                  </span>
                </td>

                <td className={`${cell} text-xs text-brand-muted`}>{fmtDate(p.startDate)}</td>
                <td className={`${cell} rounded-r-2xl text-xs text-brand-muted`}>
                  {fmtDate(p.endDate)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}