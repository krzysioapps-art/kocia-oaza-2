import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import CatsDataGrid from "@/app/components/cats-admin/CatsDataGrid";

import "@/app/style/dashboard/cats.css";

export default async function CatsAdminPage() {
  const supabase =
    await createClient();

  const {
    data: cats,
    error,
  } = await supabase
    .from("cats")
    .select(`
      *,
      media:cat_media(*)
    `)
    .is("deleted_at", null)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    return (
      <main className="cats-admin-page">
        <div className="cats-admin-shell">
          <div className="cats-admin-error">
            <h1>
              Nie udało się załadować kotów
            </h1>

            <p>
              {error.message}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cats-admin-page">
      <div className="cats-admin-shell">
        <div className="cats-admin-header">
          <div>
            <div className="cats-admin-eyebrow">
              CMS / Baza kotów
            </div>

            <h1>Koty</h1>

            <p>
              Edytuj dane bezpośrednio
              w tabeli.
            </p>
          </div>

          <div className="cats-admin-header__actions">
            <Link
              href="/panel"
              className="button button--outline-primary"
            >
              Panel
            </Link>

            <Link
              href="/panel/koty/nowy"
              className="button button--primary"
            >
              + Dodaj kota
            </Link>
          </div>
        </div>

        <CatsDataGrid
          initialCats={
            cats ?? []
          }
        />
      </div>
    </main>
  );
}