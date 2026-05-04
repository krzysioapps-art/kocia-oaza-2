import { createClient } from "@/lib/supabase/server";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Card from "@/app/components/ui/Card";

import "@/app/style/koty/cat-page.css";

type Cat = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  slug: string;

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
  };
}

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

  const cats = ((data ?? []) as Cat[]).map(mapCat);

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

            {cats.map((cat) => (
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
                  <h3 className="text-md">{cat.name}</h3>

                  <p className="text-sm line-clamp-2">
                    {cat.description ?? "Brak opisu"}
                  </p>
                </div>
              </Card>
            ))}

          </div>
        </Container>
      </section>

    </main>
  );
}