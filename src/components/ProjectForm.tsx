import { FormEvent } from "react";

export type ProjectFormState = {
  name: string;
  location: string;
  description: string;
  estimatedBudget: string;
  manager: string;
  startDate: string;
  endDate: string;
};

type Props = {
  form: ProjectFormState;
  managers: { _id: string; name: string }[];
  loading: boolean;
  onChange: (key: keyof ProjectFormState, value: string) => void;
  onSubmit: (e: FormEvent) => void;
};

const input =
  "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-brand-dark outline-none transition focus:border-coral focus:ring-4 focus:ring-coral/20";
const label = "block text-sm font-medium text-brand-dark";

export default function ProjectForm({ form, managers, loading, onChange, onSubmit }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="mt-6 space-y-4 rounded-3xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(38,42,66,0.05)]"
    >
      <label className={label}>
        Project name
        <input
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          className={input}
          required
        />
      </label>

      <label className={label}>
        Location
        <input
          value={form.location}
          onChange={(e) => onChange("location", e.target.value)}
          className={input}
          required
        />
      </label>

      <label className={label}>
        Description
        <textarea
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          rows={3}
          className={input}
        />
      </label>

      <label className={label}>
        Estimated budget (৳)
        <input
          type="number"
          min={1}
          value={form.estimatedBudget}
          onChange={(e) => onChange("estimatedBudget", e.target.value)}
          className={input}
          required
        />
      </label>

      <label className={label}>
        Manager
        <select
          value={form.manager}
          onChange={(e) => onChange("manager", e.target.value)}
          className={input}
          required
        >
          <option value="">Select a manager</option>
          {managers.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className={label}>
          Start date
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => onChange("startDate", e.target.value)}
            className={input}
          />
        </label>
        <label className={label}>
          End date
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => onChange("endDate", e.target.value)}
            className={input}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-coral py-3.5 font-semibold text-white shadow-lg shadow-coral/30 transition hover:bg-coral-dark disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create Project"}
      </button>
    </form>
  );
}