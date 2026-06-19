"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";
import { supabase } from "@/lib/supabase";

export function DashboardHeader() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Logo />
        <button
          type="button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-400 transition hover:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSigningOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </header>
  );
}
