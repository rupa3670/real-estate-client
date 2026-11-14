"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) router.replace("/dashboard");
            })
            .catch(() => {});
    }, [router]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !phone || !password) {
            setError("Email, phone and password are required");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ email, phone, password }),
                }
            );
            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Login failed");
                return;
            }

            router.replace("/dashboard");
        } catch {
            setError("Cannot connect to server. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    // Premium input styling with glassmorphism & subtle focus glow
    const inputStyle =
        "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 ease-in-out focus:border-brand-accent focus:bg-white focus:ring-4 focus:ring-brand-accent/10";

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Notification Alert */}
            {error && (
                <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-sm font-medium text-rose-600 backdrop-blur-sm animate-fadeIn">
                    <svg className="h-5 w-5 shrink-0 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Email Address
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputStyle}
                />
            </div>

            {/* Phone Field */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Phone Number
                </label>
                <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="017xxxxxxxx"
                    className={inputStyle}
                />
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                    Password
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className={`${inputStyle} pr-16`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute inset-y-0 right-0 my-auto h-fit px-4 py-1 text-xs font-bold tracking-wide uppercase text-slate-400 transition hover:text-slate-700 focus:outline-none"
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-brand-accent py-4 text-sm font-bold text-white shadow-xl shadow-brand-accent/25 transition-all duration-300 hover:bg-brand-accent-hover hover:shadow-brand-accent/40 active:scale-[0.98] disabled:opacity-70"
            >
                <div className="absolute inset-0 bg-white/25 opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative flex items-center justify-center gap-2">
                    {loading ? (
                        <>
                            <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
                            <span>Signing in...</span>
                        </>
                    ) : (
                        "Sign In to Dashboard"
                    )}
                </span>
            </button>
        </form>
    );
}