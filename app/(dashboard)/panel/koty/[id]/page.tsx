import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import CatEditForm from "@/app/components/cats-admin/CatEditForm";

import "@/app/style/dashboard/cats.css";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCatPage({
  params,
}: Props) {
  const { id } =
    await params;

  const supabase =
    await createClient();

  const {
    data: cat,
    error,
  } = await supabase
    .from("cats")
    .select(`
      *,
      media:cat_media(*)
    `)
    .eq("id", id)
    .single();

  if (
    error ||
    !cat
  ) {
    notFound();
  }

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
              Edytuj:{" "}
              {cat.name ??
                "Kot"}
            </h1>

            <p>
              Pełny widok danych
              kota.
            </p>
          </div>

          <Link
            href={`/panel/koty/${cat.id}/zdjecia`}
            className="button button--primary"
          >
            Zarządzaj zdjęciami
          </Link>
        </div>

        <CatEditForm
          cat={cat}
        />
      </div>
    </main>
  );
}