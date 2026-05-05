// app/zgloszenie/[slug]/page.tsx

import { createClient } from "@/lib/supabase/server";
import FormClient from "./FormClient";

type PageProps = {
  params: { slug: string };
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const supabase = await createClient();

  const { data: cat } = await supabase
    .from("cats")
    .select(`
  id,
  name,
  slug,
  image_url,
  media:cat_media(url, is_primary)
`)
    .eq("slug", slug)
    .maybeSingle();

  if (!cat) {
    return <div>Nie znaleziono kota</div>;
  }

  return <FormClient cat={cat} />;
}