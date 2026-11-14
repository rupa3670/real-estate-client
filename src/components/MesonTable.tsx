import type { ListMeson } from "@/hooks/useMason";

type Props = {
  data: ListMeson[];
  deletingId?: string | null;
  onDelete: (id: string) => void;
};

export default function MesonTable({ data, deletingId, onDelete }: Props) {
  return (
    <div className="mt-6 overflow-x-auto rounded-3xl border border-line bg-white shadow-[0_1px_2px_rgba(38,42,66,0.05)]">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wider text-brand-muted">
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Phone</th>
            <th className="px-6 py-4 font-medium">Daily wage</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 text-right font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m._id} className="border-b border-line last:border-0">
              <td className="px-6 py-4 font-medium text-brand-dark">{m.name}</td>
              <td className="px-6 py-4 text-brand-muted">{m.phone}</td>
              <td className="px-6 py-4 text-brand-dark">
                ৳ {m.dailyWage.toLocaleString()}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                    m.isActive
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {m.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  type="button"
                  onClick={() => onDelete(m._id)}
                  disabled={deletingId === m._id}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  {deletingId === m._id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}