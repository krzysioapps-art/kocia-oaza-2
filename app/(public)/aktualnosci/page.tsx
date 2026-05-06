import type { Metadata } from "next";

import PostList from "@/app/components/news/PostList";
import PostModal from "@/app/components/news/PostModal";
import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";

export const metadata: Metadata = {
  title: "Aktualności | Kocia Oaza",
  description:
    "Śledź aktualności Kociej Oazy — historie kotów, adopcje, leczenie i działania fundacji.",
  alternates: {
    canonical: "https://kocia-oaza.pl/aktualnosci",
  },
  openGraph: {
    title: "Aktualności | Kocia Oaza",
    description:
      "Zobacz najnowsze informacje o kotach, adopcjach i działaniach Kociej Oazy.",
    url: "https://kocia-oaza.pl/aktualnosci",
    siteName: "Kocia Oaza",
    locale: "pl_PL",
    type: "website",
  },
};

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ post?: string }>;
}) {
  const params = await searchParams;
  const postId = params.post;

  return (
    <main>
      <section className="page-header">
        <Container>
          <div className="page-header__inner">
            <Heading level="lg">Aktualności</Heading>
            <p className="text">
              Co nowego u naszych kotów i w fundacji
            </p>
          </div>
        </Container>
      </section>

      <section className="section section--alt">
        <Container>
          <PostList />
        </Container>
      </section>

      {postId && <PostModal postId={postId} />}
    </main>
  );
}