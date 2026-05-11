// app/api/fundraisers/toggle/route.ts

import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");

  const supabase = await createClient();

  const { data } = await supabase
    .from("fundraisers")
    .select("is_active")
    .eq("id", id)
    .single();

  await supabase
    .from("fundraisers")
    .update({
      is_active: !data?.is_active,
    })
    .eq("id", id);

  return NextResponse.redirect(
    new URL("/panel/zbiorki", req.url)
  );
}