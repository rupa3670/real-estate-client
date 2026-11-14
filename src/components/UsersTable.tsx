export type ListUser = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

type Props = {
  users: ListUser[];
  loading: boolean;
  busyId: string | null;
  onToggle: (user: ListUser) => void;
};

const th =
  "px-5 pb-1 text-left text-[11px] font-semibold uppercase tracking-wider text-brand-muted/70";
const td = "px-5 py-4 text-sm";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function UsersTable({ users, loading, busyId, onToggle }: Props) {
  const emptyText = loading
    ? "Loading..."
    : users.length === 0
      ? "No users found"
      : "";

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[820px] border-separate border-spacing-y-3 text-left">
        <thead>
          <tr>
            <th className={th}>User</th>
            <th className={th}>Phone</th>
            <th className={th}>Joined</th>
            <th className={th}>Role</th>
            <th className={th}>Status</th>
            <th className={`${th} text-right`}>Action</th>
          </tr>
        </thead>

        <tbody>
          {emptyText && (
            <tr>
              <td
                colSpan={6}
                className="rounded-2xl bg-white py-10 text-center text-sm text-brand-muted shadow-[0_6px_20px_-10px_rgba(38,42,66,0.15)]"
              >
                {emptyText}
              </td>
            </tr>
          )}

          {users.map((u) => (
            <tr
              key={u._id}
              className="group transition hover:-translate-y-0.5"
            >
              {/* User: avatar + name + email */}
              <td className={`${td} rounded-l-2xl bg-white shadow-[0_6px_20px_-10px_rgba(38,42,66,0.15)] transition group-hover:shadow-[0_14px_30px_-12px_rgba(63,74,143,0.28)]`}>
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-coral-soft text-sm font-bold text-coral-dark ring-2 ring-white">
                    {initials(u.name)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-brand-dark">
                      {u.name}
                    </p>
                    <p className="truncate text-xs text-brand-muted">
                      {u.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className={`${td} bg-white font-medium text-brand-dark shadow-[0_6px_20px_-10px_rgba(38,42,66,0.15)] transition group-hover:shadow-[0_14px_30px_-12px_rgba(63,74,143,0.28)]`}>
                {u.phone}
              </td>

              <td className={`${td} bg-white text-xs text-brand-muted shadow-[0_6px_20px_-10px_rgba(38,42,66,0.15)] transition group-hover:shadow-[0_14px_30px_-12px_rgba(63,74,143,0.28)]`}>
                {new Date(u.createdAt).toLocaleDateString()}
              </td>

              <td className={`${td} bg-white shadow-[0_6px_20px_-10px_rgba(38,42,66,0.15)] transition group-hover:shadow-[0_14px_30px_-12px_rgba(63,74,143,0.28)]`}>
                <span className="rounded-full bg-ivory px-3 py-1 text-xs font-semibold capitalize text-brand-dark">
                  {u.role}
                </span>
              </td>

              <td className={`${td} bg-white shadow-[0_6px_20px_-10px_rgba(38,42,66,0.15)] transition group-hover:shadow-[0_14px_30px_-12px_rgba(63,74,143,0.28)]`}>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    u.isActive
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      u.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  {u.isActive ? "Active" : "Blocked"}
                </span>
              </td>

              <td className={`${td} rounded-r-2xl bg-white text-right shadow-[0_6px_20px_-10px_rgba(38,42,66,0.15)] transition group-hover:shadow-[0_14px_30px_-12px_rgba(63,74,143,0.28)]`}>
                <button
                  onClick={() => onToggle(u)}
                  disabled={busyId === u._id}
                  className={`min-w-[84px] rounded-full px-5 py-2 text-xs font-semibold text-white shadow-md transition disabled:opacity-60 ${
                    u.isActive
                      ? "bg-red-500 shadow-red-500/25 hover:bg-red-600"
                      : "bg-coral shadow-coral/30 hover:bg-coral-dark"
                  }`}
                >
                  {busyId === u._id ? "..." : u.isActive ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}