import { createClient } from "@supabase/supabase-js";

function getSupabaseUrl() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://iapixognszebfmdrdkwc.supabase.co";
  return url.replace(/\/rest\/v1\/?$/, "");
}

export const supabase = createClient(
  getSupabaseUrl(),
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "sb_publishable_G624GBsboDI69Pn0m3z4Uw_nHYLVp7B"
);
