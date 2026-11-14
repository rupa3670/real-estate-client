import { FormEvent } from "react";

type Props = {
  form: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  };
  message: string;
  error: string;
  loading: boolean;
  onChange: (key: string, value: string) => void;
  onSubmit: (e: FormEvent) => void;
};

const input =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-brand-dark outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/20";

const label = "block text-sm font-medium text-brand-dark";

export default function UserForm({
  form,
  message,
  error,
  loading,
  onChange,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 space-y-4 rounded-3xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(38,42,66,0.05)]"
    >
      {message && (
        <p className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
          {message}
        </p>
      )}
      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <label className={label}>
        Name
        <input
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={input}
        />
      </label>

      <label className={label}>
        Email
        <input
          type="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
          className={input}
        />
      </label>

      <label className={label}>
        Phone
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="017xxxxxxxx"
          className={input}
        />
      </label>

      <label className={label}>
        Password
        <input
          type="password"
          value={form.password}
          onChange={(e) => onChange("password", e.target.value)}
          className={input}
        />
      </label>

      <label className={label}>
        Role
        <select
          value={form.role}
          onChange={(e) => onChange("role", e.target.value)}
          className={input}
        >
          <option value="manager">Manager</option>
          <option value="accountant">Accountant</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-coral py-3.5 font-semibold text-white shadow-lg shadow-coral/30 transition hover:bg-coral-dark disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}