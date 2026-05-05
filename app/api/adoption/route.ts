import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const { cat_id, data, form_type } = body;

    const { error } = await supabase
      .from("adoption_forms")
      .insert([
        {
          cat_id,
          data,
          form_type,
          status: "new",
        },
      ]);

    if (error) throw error;

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Błąd zapisu" }, { status: 500 });
  }
}