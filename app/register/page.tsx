"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Logo } from "@/components/logo";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setSuccess("Account created. Check your email to confirm your account, then sign in.");
    setIsLoading(false);
  }

  return (
    <div className="flex min-h-screen overflow-hidden bg-zinc-950">
      {/* Left panel */}
      <div className="animate-slide-in-left relative hidden w-1/2 flex-col justify-between overflow-hidden p-6 lg:p-12 lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-zinc-950 to-indigo-600/20" />
        <div className="absolute -top-32 -left-32 h-80 w-80 lg:h-96 lg:w-96 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="absolute -bottom-32 -right-32 h-80 w-80 lg:h-96 lg:w-96 rounded-full bg-indigo-600/20 blur-[100px]" />

        <div className="relative">
          <Logo />
        </div>

        <div className="relative">
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            Your next role starts with the right resume.
          </h1>
          <p className="mt-3 lg:mt-4 max-w-md text-base lg:text-lg leading-relaxed text-zinc-400">
            Create an account to optimize your resume for any job posting and track your
            application match scores.
          </p>
          <ul className="mt-6 lg:mt-8 space-y-3 lg:space-y-4">
            {[
              "Tailor resumes to specific job descriptions",
              "Get instant ATS compatibility checks",
              "Export polished, recruiter-ready PDFs",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2 lg:gap-3 text-xs lg:text-sm text-zinc-300">
                <span className="flex h-4 lg:h-5 w-4 lg:w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/20 text-violet-400">
                  <svg className="h-2.5 lg:h-3 w-2.5 lg:w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-xs lg:text-sm text-zinc-500">
          © {new Date().getFullYear()} Resunora
        </p>
      </div>

      {/* Right panel — form */}
      <div className="animate-slide-in-right flex w-full flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 lg:w-1/2">
        <div className="mb-6 sm:mb-8 lg:hidden">
          <Logo />
        </div>

        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Create your account</h2>
            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-zinc-400">
              Sign up to start optimizing your resume
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-red-400">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-emerald-400">
                {success}
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs sm:text-sm font-medium text-zinc-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 sm:px-4 py-2 sm:py-3 text-sm text-zinc-100 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs sm:text-sm font-medium text-zinc-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 sm:px-4 py-2 sm:py-3 text-sm text-zinc-100 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="mb-1.5 block text-xs sm:text-sm font-medium text-zinc-300">
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 sm:px-4 py-2 sm:py-3 pr-10 text-sm text-zinc-100 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-zinc-300"
                >
                  {showConfirmPassword ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m7.538-1.897a3.375 3.375 0 001-4.753m6.614 12.88a21.923 21.923 0 001.357-4.464" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-zinc-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-violet-400 transition hover:text-violet-300">
              Sign in
            </Link>
          </p>

          <div className="mt-6 sm:mt-8 text-center">
            <Link
              href="/"
              className="text-xs sm:text-sm text-zinc-500 transition hover:text-zinc-300"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
