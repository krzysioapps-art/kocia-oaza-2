import Link from "next/link";

import CatCreateForm from "@/app/components/cats-admin/CatCreateForm";

import "@/app/(dashboard)/cats.css";

export default function NewCatPage() {
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
              Dodaj kota
            </h1>

            <p>
              Utwórz nowy rekord w bazie.
            </p>
          </div>
        </div>

        <CatCreateForm />
      </div>
    </main>
  );
}