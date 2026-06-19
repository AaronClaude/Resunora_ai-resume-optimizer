import Link from "next/link";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="transition hover:text-zinc-100">
            Features
          </a>
          <a href="#how-it-works" className="transition hover:text-zinc-100">
            How it works
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            Log in
          </Link>
          <Link
            href="/login"
            className="rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:from-violet-500 hover:to-indigo-500"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
