"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setName(parsed.name);
      setRole(parsed.role);
    }
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-semibold text-brand-text">Dashboard</h1>
      <p className="mt-2 text-brand-muted">
        Logged in as {name} ({role})
      </p>
    </main>
  );
}