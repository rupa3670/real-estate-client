"use client";

import Link from "next/link";
import { useUser } from "../UserContext";

export default function ProfilePage() {
  const user = useUser();

  const rows = [
    { label: "Name", value: user?.name },
    { label: "Email", value: user?.email },
    { label: "Phone", value: user?.phone },
    { label: "Role", value: user?.role },
  ];

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-2xl font-bold text-brand-dark">My Profile</h1>

      <div className="mt-6 rounded-3xl bg-white p-6 shadow-xl shadow-slate-400/20">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-accent text-2xl font-bold text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-semibold text-brand-dark">{user?.name}</p>
            <p className="text-sm capitalize text-brand-muted">{user?.role}</p>
          </div>
        </div>

        <dl className="mt-6 divide-y divide-gray-100">
          {rows.map((r) => (
            <div key={r.label} className="flex justify-between py-3 text-sm">
              <dt className="text-brand-muted">{r.label}</dt>
              <dd className="font-medium capitalize-none text-brand-text">
                {r.value || "-"}
              </dd>
            </div>
          ))}
        </dl>

        <Link
          href="/dashboard/change-password"
          className="mt-6 inline-block rounded-full bg-brand-dark px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
        >
          Change Password
        </Link>
      </div>
    </div>
  );
}