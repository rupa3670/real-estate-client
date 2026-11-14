"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import UserForm from "@/components/userForm";
import { useUser } from "../../UserContext";
import { useCreateUser } from "@/hooks/useUser";

const empty = { name: "", email: "", phone: "", password: "", role: "manager" };

export default function CreateUserPage() {
  const router = useRouter();
  const user = useUser();
  const [form, setForm] = useState(empty);
  const createUser = useCreateUser();

  useEffect(() => {
    if (user && user.role !== "admin") router.replace("/dashboard");
  }, [user, router]);

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    createUser.mutate(form, {
      onSuccess: () => {
        toast.success("User created");
        router.push("/dashboard/users");
      },
    });
  };

  return (
    <div className="mx-auto max-w-md">
      <Link
        href="/dashboard/users"
        className="text-sm text-brand-muted hover:text-brand-dark"
      >
        &larr; Back to users
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-brand-dark">Create User</h1>
      <UserForm
        form={form}
        message=""
        error=""
        loading={createUser.isPending}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}