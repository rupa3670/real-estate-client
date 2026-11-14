"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import EngineerForm, { EngineerFormState } from "@/components/EngineerForm";
import { useCreateEngineer } from "@/hooks/useEngineer";

const empty: EngineerFormState = { name: "", phone: "", monthlySalary: "" };

export default function CreateEngineerPage() {
  const router = useRouter();
  const [form, setForm] = useState(empty);
  const create = useCreateEngineer();

  const handleChange = (key: keyof EngineerFormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    create.mutate(
      { ...form, monthlySalary: Number(form.monthlySalary) },
      {
        onSuccess: () => {
          toast.success("Engineer added");
          router.push("/dashboard/engineers");
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-md">
      <Link
        href="/dashboard/engineers"
        className="text-sm text-brand-muted hover:text-brand-dark"
      >
        &larr; Back to engineers
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-dark">Add Engineer</h1>
      <EngineerForm
        form={form}
        loading={create.isPending}
        submitLabel="Add Engineer"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}