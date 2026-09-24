import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import CatMediaManager from "@/app/components/cats-admin/CatMediaManager";

import "../../../cats.css";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CatMediaPage({
  params,
}: Props) {
  const { id } =
    await params;

  const supabase =
    await createClient();

  const {
    data: cat,
  } = await supabase
    .from("cats")
    .select(
      "id, name, slug"
    )
    .eq("id", id)
    .single();

  if (!cat) {
    notFound();
  }

  const {
    data: media,
  } = await supabase
    .from("cat_media")
    .select("*")
    .eq("cat_id", id)
    .order("display_order", {
      ascending: true,
    });

  return (
    <main className="cats-edit-page">
      <div className="container">
        <div className="cats-edit-header">
          <div>
            <Link
              href="/panel/koty"
              className="cats-back-link"
            >
              ← Wróć do tabeli
            </Link>

            <h1>
              Zdjęcia:{" "}
              {cat.name}
            </h1>

            <p>
              Zarządzaj zdjęciami
              i materiałami kota.
            </p>
          </div>

          <Link
            href={`/panel/koty/${cat.id}`}
            className="button button--outline-primary"
          >
            Edytuj kota
          </Link>
        </div>

        <CatMediaManager
          catId={cat.id}
          initialMedia={
            media ?? []
          }
        />
      </div>
    </main>
  );
}