import { FormEvent } from "react";

export type MesonFormState = {
  name: string;
  phone: string;
  dailyWage: string;
};

type Props = {
  form: MesonFormState;
  loading: boolean;
  submitLabel: string;
  onChange: (key: keyof MesonFormState, value: string) => void;
  onSubmit: (e: FormEvent) => void;
};

const input =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-brand-dark outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/20";
const label = "block text-sm font-medium text-brand-dark";

export default function MesonForm({
  form,
  loading,
  submitLabel,
  onChange,
  onSubmit,
}: Props) {
  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      className="mt-6 space-y-4 rounded-3xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(38,42,66,0.05)]"
    >
      <label className={label}>
        Name
        <input
          name="meson-name"
          autoComplete="off"
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={input}
          required
        />
      </label>

      <label className={label}>
        Phone
        <input
          name="meson-phone"
          type="tel"
          autoComplete="off"
          value={form.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="017xxxxxxxx"
          className={input}
          required
        />
      </label>

      <label className={label}>
        Daily wage (৳)
        <input
          name="meson-daily-wage"
          type="number"
          min={1}
          autoComplete="off"
          value={form.dailyWage}
          onChange={(e) => onChange("dailyWage", e.target.value)}
          className={input}
          required
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-coral py-3.5 font-semibold text-white shadow-lg shadow-coral/30 transition hover:bg-coral-dark disabled:opacity-60"
      >
        {loading ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}