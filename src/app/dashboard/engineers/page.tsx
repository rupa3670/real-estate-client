"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import {
  useDeleteEngineer,
  useEngineers,
  type ListEngineer,
} from "@/hooks/useEngineer";
import { useUser } from "../UserContext";
import EngineersTable from "@/components/EngineerTable";

export default function EngineersPage() {
  const user = useUser();
  const isAdmin = user?.role === "admin";

  const { data: engineers = [], isLoading } = useEngineers(!!user);
  const remove = useDeleteEngineer();

  const doDelete = (target: ListEngineer) => {
    remove.mutate(target._id, {
      onSuccess: () => toast.success(`${target.name} deleted`),
    });
  };

  const handleDelete = (target: ListEngineer) => {
    toast.warn(
      ({ closeToast }) => (
        <div>
          <p className="text-sm font-medium">
            Are you sure you want to delete {target.name}?
          </p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                closeToast();
                doDelete(target);
              }}
              className="rounded-full bg-red-500 px-4 py-1.5 text-xs font-medium text-white hover:bg-red-600"
            >
              Yes, delete
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

  const busyId = remove.isPending ? (remove.variables ?? null) : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-brand-dark">
            Engineers
          </h1>
          <span className="rounded-full bg-coral-soft px-3 py-1 text-xs font-semibold text-coral-dark">
            {engineers.length} total
          </span>
        </div>

        {isAdmin && (
          <Link
            href="/dashboard/engineers/new"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition hover:bg-coral-dark"
          >
            <Plus size={16} />
            Add Engineer
          </Link>
        )}
      </div>

      <EngineersTable
        engineers={engineers}
        loading={isLoading}
        busyId={busyId}
        isAdmin={isAdmin}
        onDelete={handleDelete}
      />
    </div>
  );
}