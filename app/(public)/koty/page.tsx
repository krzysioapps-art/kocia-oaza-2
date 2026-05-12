import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Card from "@/app/components/ui/Card";

import { formatAge } from "@/lib/utils/formatAge";
import { getStatusMeta } from "@/lib/utils/formatStatus";
import { Mars, Venus } from "lucide-react";

import { getWaitingLabel } from "@/lib/utils/getWaitingLabel";

import { Clock3 } from "lucide-react";

import "@/app/style/koty/cat-page.css";

type Cat = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  slug: string;

  status?: "available" | "reserved" | "adopted";
  gender?: "male" | "female";
  birth_date?: string | null;

  tags?: string[];

  arrival_date?: string | null;

  media?: {
    url: string;
    type?: string | null;
    is_primary?: boolean | null;
  }[];
};

function mapCat(cat: Cat) {
  const primary =
    cat.media?.find((m) => m.is_primary)?.url ||
    cat.media?.[0]?.url;

  return {
    ...cat,
    image: primary ?? cat.image_url ?? "/placeholder-cat.jpg",
    tags: cat.tags ?? [],
  };
}

export const metadata: Metadata = {
  title: "Koty do adopcji | Kocia Oaza",
  description:
    "Poznaj koty szukające domu w Kociej Oazie. Sprawdź profile kotów do adopcji, ich charakter, wiek i potrzeby.",
  alternates: {
    canonical: "https://kocia-oaza.pl/koty",
  },
  openGraph: {
    title: "Koty do adopcji | Kocia Oaza",
    description:
      "Zobacz koty dostępne do adopcji i znajdź swojego przyszłego przyjaciela.",
    url: "https://kocia-oaza.pl/koty",
    siteName: "Kocia Oaza",
    locale: "pl_PL",
    type: "website",
  },
};

export default async function CatsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cats")
    .select(`
      *,
      media:cat_media(*)
    `)
    .is("deleted_at", null)
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Błąd ładowania kotów</div>;
  }

  const cats = ((data ?? []) as Cat[])
  .filter((cat) => cat.media && cat.media.length > 0)
  .map(mapCat);

  return (
    <main>

      {/* HEADER */}
      <section className="page-header">
        <Container>
          <div className="page-header__inner">
            <Heading level="lg">Nasze koty</Heading>
            <p className="text">
              Poznaj wszystkie koty, które szukają domu
            </p>
          </div>
        </Container>
      </section>

      {/* LISTA */}
      <section className="section section--alt">
        <Container>
          <div className="cats-grid">

            {cats.map((cat) => {
              const status = getStatusMeta(cat.status);
              const age = formatAge(cat.birth_date);
              const waitingLabel = getWaitingLabel(cat.arrival_date);

              return (
                <Card
                  key={cat.id}
                  href={`/koty/${cat.slug}`}
                  className="card card-base"
                >
                  <img
                    className="card__media"
                    src={cat.image}
                    alt={cat.name}
                  />

                  <div className="card__body">

                    {/* 🔥 STATUS */}
                    {status?.label && (
                      <span className={status.className}>
                        {status.label}
                      </span>
                    )}

                    {cat.status === "available" && waitingLabel && (
                      <div className="cat-waiting-badge">
                        <Clock3 size={14} />
                        {waitingLabel}
                      </div>
                    )}

                    {/* 🐱 NAZWA */}
                    <h3 className="text-md">{cat.name}</h3>

                    {/* ⚧️ PŁEĆ + WIEK */}
                    <div className="cat-meta">

                      {cat.gender === "male" && (
                        <span className="cat-meta__item">
                          <Mars size={14} /> kocurek
                        </span>
                      )}

                      {cat.gender === "female" && (
                        <span className="cat-meta__item">
                          <Venus size={14} /> kotka
                        </span>
                      )}

                      {age && (
                        <span className="cat-meta__item">
                          {age}
                        </span>
                      )}

                    </div>

                    {/* 🏷 TAGI */}
                    {cat.tags?.length > 0 && (
                      <div className="cat-tags">
                        {cat.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* 📝 OPIS */}
                    <p className="text-sm line-clamp-2">
                      {cat.description ?? "Brak opisu"}
                    </p>

                    {/* 👉 CTA */}
                    <span className="card-link">
                      Zobacz profil →
                    </span>

                  </div>
                </Card>
              );
            })}

          </div>
        </Container>
      </section>

    </main>
  );
}