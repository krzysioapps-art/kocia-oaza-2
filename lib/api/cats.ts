import { supabase } from "../supabase";

export async function getCats() {
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