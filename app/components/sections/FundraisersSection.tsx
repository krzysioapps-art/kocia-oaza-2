// app/components/sections/FundraisersSection.tsx

import Section from "@/app/components/ui/Section";
import Heading from "@/app/components/ui/Heading";

import { getFundraisers } from "@/lib/supabase/fundraisers";

import "@/app/style/home/fundraisers.css";

type Fundraiser = {
  id: number;
  title: string;
  slug: string;
  is_active: boolean;
  created_at: string;
};

export default async function FundraisersSection() {
  const fundraisers: Fundraiser[] = await getFundraisers();

  return (
    <Section variant="alt">
      <Section.Header>
        <Heading level="lg">
          Pomóż nam ratować kolejne koty
        </Heading>

        <p className="text">
          Każda wpłata pomaga opłacić leczenie, karmę i bezpieczne schronienie.
        </p>
      </Section.Header>

      <Section.Content>
        <div className="fundraisers">
          {fundraisers.map((item) => (
            <div className="fundraisers__card" key={item.id}>
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
      </Section.Content>
    </Section>
  );
}