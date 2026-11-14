"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import MesonTable from "@/components/MesonTable";
import { useDeleteMeson, useMesons } from "@/hooks/useMason";

export default function MasonsPage() {
  const { data, isLoading, isError } = useMesons();
  const remove = useDeleteMeson();

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this mistry?")) return;

    remove.mutate(id, {
      onSuccess: () => toast.success("Mistry deleted"),
    });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight text-brand-dark">
            Masons
          </h1>
          {data && (
            <span className="rounded-full bg-coral-soft px-3 py-1 text-xs font-medium text-coral-dark">
              {data.length} total
            </span>
          )}
        </div>

        <Link
          href="/dashboard/masons/new"
          className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition hover:bg-coral-dark"
        >
          <Plus size={18} />
          Add Meson
        </Link>
      </div>

      {isLoading ? (
        <p className="mt-10 text-center text-sm text-brand-muted">Loading...</p>
      ) : isError ? (
        <p className="mt-10 text-center text-sm text-red-600">
          Could not load masons.
        </p>
      ) : !data || data.length === 0 ? (
        <p className="mt-10 text-center text-sm text-brand-muted">
          No mesons yet. Click Add Meson to create one.
        </p>
      ) : (
        <MesonTable
          data={data}
          deletingId={remove.isPending ? remove.variables : null}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}