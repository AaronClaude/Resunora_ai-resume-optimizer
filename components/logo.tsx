import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-violet-500/25 transition group-hover:shadow-violet-500/40">
        R
      </span>
      <span className="text-lg font-semibold tracking-tight text-zinc-100">
        Resume<span className="text-violet-400">AI</span>
      </span>
    </Link>
  );
}
