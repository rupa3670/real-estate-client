"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import MesonForm, { MesonFormState } from "@/components/MesonForm";
import { useCreateMeson } from "@/hooks/useMason";

const empty: MesonFormState = { name: "", phone: "", dailyWage: "" };

export default function CreateMesonPage() {
  const router = useRouter();
  const [form, setForm] = useState(empty);
  const create = useCreateMeson();

  const handleChange = (key: keyof MesonFormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    create.mutate(
      { ...form, dailyWage: Number(form.dailyWage) },
      {
        onSuccess: () => {
          toast.success("Meson added");
          setForm(empty);
          router.push("/dashboard/masons");
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-md">
      <Link
        href="/dashboard/masons"
        className="text-sm text-brand-muted hover:text-brand-dark"
      >
        &larr; Back to masons
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-dark">Add Meson</h1>
      <MesonForm
        form={form}
        loading={create.isPending}
        submitLabel="Add Meson"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}