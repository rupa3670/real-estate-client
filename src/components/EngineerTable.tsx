import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import type { ListEngineer } from "@/hooks/useEngineer";

type Props = {
  engineers: ListEngineer[];
  loading: boolean;
  busyId: string | null;
  isAdmin: boolean;
  onDelete: (engineer: ListEngineer) => void;
};

const th =
  "px-5 pb-1 text-left text-[11px] font-semibold uppercase tracking-wider text-brand-muted/70";
const cell =
  "bg-white px-5 py-4 text-sm shadow-[0_6px_20px_-10px_rgba(38,42,66,0.15)] transition group-hover:shadow-[0_14px_30px_-12px_rgba(63,74,143,0.28)]";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function EngineersTable({
  engineers,
  loading,
  busyId,
  isAdmin,
  onDelete,
}: Props) {
  const emptyText = loading
    ? "Loading..."
    : engineers.length === 0
      ? "No engineers found"
      : "";
  const cols = isAdmin ? 5 : 4;

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[720px] border-separate border-spacing-y-3 text-left">
        <thead>
          <tr>
            <th className={th}>Engineer</th>
            <th className={th}>Phone</th>
            <th className={th}>Monthly salary</th>
            <th className={th}>Joined</th>
            {isAdmin && <th className={`${th} text-right`}>Action</th>}
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

          {engineers.map((e) => (
            <tr key={e._id} className="group transition hover:-translate-y-0.5">
              <td className={`${cell} rounded-l-2xl`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral-soft text-sm font-bold text-coral-dark ring-2 ring-white">
                    {initials(e.name)}
                  </span>
                  <p className="font-semibold text-brand-dark">{e.name}</p>
                </div>
              </td>

              <td className={`${cell} font-medium text-brand-dark`}>{e.phone}</td>

              <td className={`${cell} font-semibold text-brand-dark`}>
                ৳ {e.monthlySalary.toLocaleString()}
              </td>

              <td
                className={`${cell} text-xs text-brand-muted ${isAdmin ? "" : "rounded-r-2xl"}`}
              >
                {new Date(e.createdAt).toLocaleDateString()}
              </td>

              {isAdmin && (
                <td className={`${cell} rounded-r-2xl text-right`}>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/dashboard/engineers/${e._id}/edit`}
                      aria-label="Edit"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-soft text-coral-dark transition hover:bg-coral hover:text-white"
                    >
                      <Pencil size={15} />
                    </Link>
                    <button
                      onClick={() => onDelete(e)}
                      disabled={busyId === e._id}
                      aria-label="Delete"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 transition hover:bg-red-500 hover:text-white disabled:opacity-60"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}