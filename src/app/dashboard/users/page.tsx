"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { UserPlus } from "lucide-react";
import UsersTable, { ListUser } from "@/components/UsersTable";
import { useUser } from "../UserContext";
import { useToggleUserStatus, useUsers } from "@/hooks/useUser";

export default function UsersPage() {
  const router = useRouter();
  const user = useUser();
  const isAdmin = user?.role === "admin";

  const { data: users = [], isLoading } = useUsers(isAdmin);
  const toggle = useToggleUserStatus();

  useEffect(() => {
    if (user && user.role !== "admin") router.replace("/dashboard");
  }, [user, router]);

  const updateStatus = (target: ListUser) => {
    toggle.mutate(target, {
      onSuccess: (updated) =>
        toast.success(
          `${target.name} ${updated.isActive ? "unblocked" : "blocked"}`
        ),
    });
  };

  const handleToggle = (target: ListUser) => {
    const action = target.isActive ? "block" : "unblock";

    toast.warn(
      ({ closeToast }) => (
        <div>
          <p className="text-sm font-medium">
            Are you sure you want to {action} {target.name}?
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                closeToast();
                updateStatus(target);
              }}
              className="rounded-full bg-red-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-red-600"
            >
              Yes, {action}
            </button>
            <button
              onClick={closeToast}
              className="rounded-full bg-ivory-deep px-4 py-1.5 text-xs font-medium text-brand-dark hover:bg-line"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        toastId: `confirm-${target._id}`,
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const busyId = toggle.isPending ? (toggle.variables?._id ?? null) : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-brand-dark">Users</h1>
          <span className="rounded-full bg-coral-soft px-3 py-1 text-xs font-semibold text-coral-dark">
            {users.length} total
          </span>
        </div>
        <Link
          href="/dashboard/users/new"
          className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition hover:bg-coral-dark"
        >
          <UserPlus size={16} />
          Create User
        </Link>
      </div>

      <UsersTable
        users={users}
        loading={isLoading}
        busyId={busyId}
        onToggle={handleToggle}
      />
    </div>
  );
}