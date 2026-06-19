import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

const features = [
  {
    title: "ATS Optimization",
    description:
      "Format and structure your resume to pass applicant tracking systems before a human ever sees it.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Keyword Matching",
    description:
      "Paste any job description and instantly see which skills and terms your resume is missing.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    title: "Instant Feedback",
    description:
      "Get a match score and actionable suggestions in seconds — no more guessing what recruiters want.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
];

const steps = [
  { step: "01", title: "Upload your resume", description: "Drop in your PDF or paste your current resume text." },
  { step: "02", title: "Add the job posting", description: "Paste the job description you are applying for." },
  { step: "03", title: "Get your optimized version", description: "Review AI suggestions and export a tailored resume." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-32 h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <SiteHeader />

      <main className="relative">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-32 md:pt-40">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm text-violet-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                AI-powered resume tailoring
              </div>
              <h1 className="animate-fade-up-delay-1 text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                Land more interviews with an{" "}
                <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                  AI-optimized
                </span>{" "}
                resume
              </h1>
              <p className="animate-fade-up-delay-2 mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
                Stop sending the same resume everywhere. Match every job description
                with tailored keywords, stronger bullet points, and ATS-friendly formatting.
              </p>
              <div className="animate-fade-up-delay-2 mt-10 flex flex-wrap gap-4">
                <Link
                  href="/login"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 transition hover:from-violet-500 hover:to-indigo-500"
                >
                  Optimize my resume
                </Link>
                <a
                  href="#how-it-works"
                  className="rounded-xl border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-sm font-semibold text-zinc-300 transition hover:border-zinc-600 hover:bg-zinc-800/50"
                >
                  See how it works
                </a>
              </div>
              <div className="mt-12 flex items-center gap-8 text-sm text-zinc-500">
                <div>
                  <p className="text-2xl font-bold text-zinc-200">3×</p>
                  <p>more callbacks</p>
                </div>
                <div className="h-8 w-px bg-zinc-800" />
                <div>
                  <p className="text-2xl font-bold text-zinc-200">&lt;30s</p>
                  <p>to analyze</p>
                </div>
                <div className="h-8 w-px bg-zinc-800" />
                <div>
                  <p className="text-2xl font-bold text-zinc-200">ATS</p>
                  <p>ready output</p>
                </div>
              </div>
            </div>

            {/* Resume preview card */}
            <div className="relative hidden lg:block">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                    Match score
                  </span>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
                    87%
                  </span>
                </div>
                <div className="mb-6 h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-violet-500 to-emerald-400" />
                </div>
                <div className="space-y-3">
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
                    <p className="text-xs text-zinc-500">Suggested addition</p>
                    <p className="mt-1 text-sm text-zinc-300">
                      + Led cross-functional team of 8 engineers to deliver product
                      features 40% faster using Agile methodologies
                    </p>
                  </div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
                    <p className="text-xs text-zinc-500">Missing keyword</p>
                    <p className="mt-1 text-sm">
                      <span className="rounded bg-violet-500/20 px-2 py-0.5 text-violet-300">
                        stakeholder management
                      </span>
                    </p>
                  </div>
                  <div className="rounded-lg border border-zinc-800 bg-zinc-950/50 p-4">
                    <p className="text-xs text-zinc-500">ATS check</p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-emerald-400">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Format compatible
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-zinc-800/60 bg-zinc-900/20 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Everything you need to stand out
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                Built for job seekers who want results — not another generic template.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 transition hover:border-violet-500/30 hover:bg-zinc-900/60"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400 transition group-hover:bg-violet-500/20">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Three steps to a better resume
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
                No complicated setup. Upload, paste, and optimize in under a minute.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((item) => (
                <div key={item.step} className="relative text-center md:text-left">
                  <span className="text-5xl font-bold text-zinc-800">{item.step}</span>
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-zinc-800/60 py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to get more interviews?
            </h2>
            <p className="mt-4 text-zinc-400">
              Join thousands of job seekers who tailor every application with ResumeAI.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-violet-500/25 transition hover:from-violet-500 hover:to-indigo-500"
            >
              Get started for free
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-500 md:flex-row">
          <p>© {new Date().getFullYear()} ResumeAI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#features" className="transition hover:text-zinc-300">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-zinc-300">
              How it works
            </a>
            <Link href="/login" className="transition hover:text-zinc-300">
              Log in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
