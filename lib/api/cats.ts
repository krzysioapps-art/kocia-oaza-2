import { createClient } from "../supabase/server";

export async function getCats() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cats")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}