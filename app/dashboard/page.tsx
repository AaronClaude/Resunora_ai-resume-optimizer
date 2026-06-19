"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard-header";
import { ResumeUpload } from "@/components/resume-upload";

export default function DashboardPage() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [hasOptimized, setHasOptimized] = useState(false);

  const canOptimize = resumeFile && jobDescription.trim().length > 0;

  function handleOptimize() {
    if (!canOptimize) return;
    setIsOptimizing(true);
    setHasOptimized(false);
    setTimeout(() => {
      setIsOptimizing(false);
      setHasOptimized(true);
    }, 1500);
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/3 h-[400px] w-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-32 h-[350px] w-[350px] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <DashboardHeader />

      <main className="relative mx-auto max-w-5xl px-6 py-10 md:py-14">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Optimize your resume
          </h1>
          <p className="mt-2 text-zinc-400">
            Upload your resume and paste a job description to get tailored suggestions.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Input panel */}
          <div className="space-y-6 lg:col-span-3">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur">
              <ResumeUpload file={resumeFile} onFileChange={setResumeFile} />
            </div>

            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur">
              <label htmlFor="job-description" className="mb-3 block text-sm font-medium text-zinc-300">
                Job description
              </label>
              <textarea
                id="job-description"
                rows={8}
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  setHasOptimized(false);
                }}
                placeholder="Paste the full job posting here — include requirements, responsibilities, and preferred skills…"
                className="w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none transition focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20"
              />
            </div>

            <button
              type="button"
              onClick={handleOptimize}
              disabled={!canOptimize || isOptimizing}
              className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isOptimizing ? "Analyzing…" : "Optimize resume"}
            </button>
          </div>

          {/* Results panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur">
              <h2 className="text-sm font-medium text-zinc-300">Match results</h2>

              {!hasOptimized ? (
                <div className="mt-8 flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800/80 text-zinc-500">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>
                  <p className="text-sm text-zinc-500">
                    Upload a resume and job description, then run optimization to see your match score.
                  </p>
                </div>
              ) : (
                <div className="mt-6 space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                        Match score
                      </span>
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
                        82%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                      <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
                      <p className="text-xs text-zinc-500">Top missing keyword</p>
                      <p className="mt-1">
                        <span className="rounded bg-violet-500/20 px-2 py-0.5 text-sm text-violet-300">
                          cross-functional collaboration
                        </span>
                      </p>
                    </div>
                    <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
                      <p className="text-xs text-zinc-500">ATS status</p>
                      <p className="mt-1 flex items-center gap-2 text-sm text-emerald-400">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Format compatible
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-500">
                    Full optimization with AI suggestions coming soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
