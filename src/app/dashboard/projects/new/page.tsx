"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ProjectForm, { ProjectFormState } from "@/components/ProjectForm";
import { useCreateProject } from "@/hooks/useProject";
import { useUsers } from "@/hooks/useUser";
import { useUser } from "../../UserContext";

const empty: ProjectFormState = {
  name: "",
  location: "",
  description: "",
  estimatedBudget: "",
  manager: "",
  startDate: "",
  endDate: "",
};

export default function CreateProjectPage() {
  const router = useRouter();
  const user = useUser();
  const [form, setForm] = useState(empty);
  const createProject = useCreateProject();

  const { data: users = [] } = useUsers(user?.role === "admin");
  const managers = users.filter((u) => u.role === "manager" && u.isActive);

  const handleChange = (key: keyof ProjectFormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    createProject.mutate(
      { ...form, estimatedBudget: Number(form.estimatedBudget) },
      {
        onSuccess: () => {
          toast.success("Project created");
          router.push("/dashboard/projects");
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-lg">
      <Link
        href="/dashboard/projects"
        className="text-sm text-brand-muted hover:text-brand-dark"
      >
        &larr; Back to projects
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-dark">Create Project</h1>
      <ProjectForm
        form={form}
        managers={managers}
        loading={createProject.isPending}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}