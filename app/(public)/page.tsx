import type { Metadata } from "next";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";

import { getFundraisers } from "@/lib/supabase/fundraisers";

import HomeClient from "./HomeClient";

import "./page.css";


export const metadata: Metadata = {
  title: "Kocia Oaza | Adopcja kotów i pomoc bezdomnym kotom",
  description:
    "Poznaj koty do adopcji, wspieraj działania Kociej Oazy i pomóż bezdomnym kotom znaleźć bezpieczny dom.",
  alternates: {
    canonical: "https://kocia-oaza.pl",
  },
  openGraph: {
    title: "Kocia Oaza | Adopcja kotów i pomoc bezdomnym kotom",
    description:
      "Poznaj koty do adopcji, wspieraj działania Kociej Oazy i pomóż bezdomnym kotom znaleźć bezpieczny dom.",
    url: "https://kocia-oaza.pl",
    siteName: "Kocia Oaza",
    locale: "pl_PL",
    type: "website",
  },
};

type Fundraiser = {
  id: number;
  title: string;
  slug: string;
  is_active: boolean;
  created_at: string;
};

async function FundraisersSection() {
  const fundraisers: Fundraiser[] = await getFundraisers();

  return (
    <section className="section section--alt">
      <Container>
        <div className="section__header">
          <Heading level="lg">
            Pomóż nam ratować kolejne koty
          </Heading>

          <p className="text">
            Każda wpłata pomaga opłacić leczenie, karmę i bezpieczne schronienie.
          </p>
        </div>

        <div className="section__content">
          <div className="fundraisers">
            {fundraisers.map((item) => (
              <div
                className="fundraisers__card"
                key={item.id}
              >
                <a
                  href={`https://www.ratujemyzwierzaki.pl/en/${item.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.title}
                >
                  <iframe
                    frameBorder="0"
                    scrolling="no"
                    src={`https://www.ratujemyzwierzaki.pl/en/${item.slug}/banner`}
                    width="300"
                    height="450"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default async function HomePage() {
  return (
    <main>
      <HomeClient>
        <FundraisersSection />
      </HomeClient>
    </main>
  );
}