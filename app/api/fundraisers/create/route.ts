// app/api/fundraisers/create/route.ts

import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const formData = await req.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");

  const supabase = await createClient();

  await supabase.from("fundraisers").insert({
    title,
    slug,
    is_active: true,
  });

  return NextResponse.redirect(
    new URL("/panel/zbiorki", req.url)
  );
}