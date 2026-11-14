"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useProjects } from "@/hooks/useProject";
import { useUser } from "../UserContext";
import ProjectsTable from "@/components/ProjectTable";

export default function ProjectsPage() {
  const user = useUser();
  const isAdmin = user?.role === "admin";

  const { data: projects = [], isLoading } = useProjects(!!user);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-brand-dark">Projects</h1>
          <span className="rounded-full bg-coral-soft px-3 py-1 text-xs font-semibold text-coral-dark">
            {projects.length} total
          </span>
        </div>

        {isAdmin && (
          <Link
            href="/dashboard/projects/new"
            className="inline-flex items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-coral/30 transition hover:bg-coral-dark"
          >
            <Plus size={16} />
            Create Project
          </Link>
        )}
      </div>

      <ProjectsTable projects={projects} loading={isLoading} showManager={isAdmin} />
    </div>
  );
}