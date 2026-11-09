import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#e9ebef] px-4">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-400/20 transition duration-300 hover:scale-105 hover:shadow-2xl sm:p-10">
        <h1 className="text-center text-2xl font-bold text-brand-dark">
          Construction<span className="text-brand-accent">PMS</span>
        </h1>
        <p className="mt-2 text-center text-sm text-brand-muted">
          Sign in to continue
        </p>

        <div className="mt-8">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}