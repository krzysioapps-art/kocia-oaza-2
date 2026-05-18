// lib/bazarek/getBids.ts

import { createClient } from "@/lib/supabase/server";

export async function getBids(
  auctionSlug: string
) {
  const supabase =
    await createClient();

  const { data, error } =
    await supabase
      .from("bids")
      .select("*")
      .eq(
        "auction_slug",
        auctionSlug
      )
      .order("amount", {
        ascending: false,
      });

  if (error) {
    console.error(error);
    return [];
  }

  return data;
}