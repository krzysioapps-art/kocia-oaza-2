import type { Metadata } from "next";

import { createClient } from "@/lib/supabase/server";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";

import PublicCatsGrid from "@/app/components/koty/PublicCatsGrid";

import "@/app/style/koty/cat-page.css";

type Cat = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  slug: string;

  status?:
    | "available"
    | "reserved"
    | "adopted"
    | "deceased"
    | null;

  gender?:
    | "male"
    | "female"
    | null;

  birth_date?: string | null;

  tags?: string[] | null;

  arrival_date?: string | null;

  media?: {
    url: string;
    type?: string | null;
    media_type?: string | null;
    is_primary?: boolean | null;
  }[];
};

function mapCat(cat: Cat) {
  const primary =
    cat.media?.find(
      (media) =>
        media.is_primary
    )?.url ||
    cat.media?.[0]?.url;

  return {
    id: cat.id,
    name: cat.name,
    description:
      cat.description,
    slug: cat.slug,
    status:
      cat.status,
    gender:
      cat.gender,
    birth_date:
      cat.birth_date,
    tags:
      cat.tags ?? [],
    arrival_date:
      cat.arrival_date,
    image:
      primary ??
      cat.image_url ??
      "/placeholder-cat.jpg",
  };
}

export const metadata: Metadata = {
  title:
    "Koty do adopcji | Kocia Oaza",

  description:
    "Poznaj koty szukające domu w Kociej Oazie. Sprawdź profile kotów do adopcji, ich charakter, wiek i potrzeby.",

  alternates: {
    canonical:
      "https://kocia-oaza.pl/koty",
  },

  openGraph: {
    title:
      "Koty do adopcji | Kocia Oaza",

    description:
      "Zobacz koty dostępne do adopcji i znajdź swojego przyszłego przyjaciela.",

    url:
      "https://kocia-oaza.pl/koty",

    siteName:
      "Kocia Oaza",

    locale:
      "pl_PL",

    type:
      "website",
  },
};

export default async function CatsPage() {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } =
    await supabase
      .from("cats")
      .select(`
        *,
        media:cat_media(*)
      `)
      .is(
        "deleted_at",
        null
      )
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  if (error) {
    return (
      <main>
        <section className="page-header">
          <Container>
            <div className="page-header__inner">
              <Heading level="lg">
                Nasze koty
              </Heading>

              <p className="text">
                Nie udało się załadować
                listy kotów.
              </p>
            </div>
          </Container>
        </section>
      </main>
    );
  }

  const cats =
    ((data ?? []) as Cat[])
      .filter(
        (cat) =>
          cat.media &&
          cat.media.length > 0
      )
      .map(mapCat);

  return (
    <main className="cats-page">
      <section className="cats-page__hero">
        <Container>
          <div className="cats-page__hero-inner">
            <div>

              <Heading level="lg">
                Poznaj nasze koty
              </Heading>

              <p className="cats-page__intro">
                Każdy z nich ma swoją
                historię. Być może właśnie
                tutaj czeka Twój przyszły
                przyjaciel.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="cats-page__content">
        <Container>
          <PublicCatsGrid
            cats={cats}
          />
        </Container>
      </section>
    </main>
  );
}