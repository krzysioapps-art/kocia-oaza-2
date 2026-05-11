// lib/fundraisers.ts

import { createClient } from "@/lib/supabase/server";

export async function getFundraisers() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("fundraisers")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}