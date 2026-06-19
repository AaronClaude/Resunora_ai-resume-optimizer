import { createClient } from "@supabase/supabase-js";

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  return url.replace(/\/rest\/v1\/?$/, "");
}

export const supabase = createClient(
  getSupabaseUrl(),
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);
