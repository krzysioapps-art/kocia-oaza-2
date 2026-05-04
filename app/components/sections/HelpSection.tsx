// app/components/sections/HelpSection.tsx

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import { Home, Clock, HeartHandshake, ArrowRight } from "lucide-react";

import Section from "@/app/components/ui/Section";

export default function HelpSection() {
  return (
    <Section>
      <Section.Header>
        <Heading level="lg">Możesz pomóc na kilka sposobów</Heading>
        <p className="text">
          Każdy gest ma znaczenie – wybierz sposób, który najlepiej do Ciebie pasuje.
        </p>
      </Section.Header>



      {/* CONTENT */}
      <Section.Content>
        <div className="section__content">
          <div className="grid-3 reveal-parent">
            {/* CARD 1 */}
            <a href="/koty" className="card card-base variant--primary">
              <div className="help__icon">
                <Home size={24} />
              </div>

              <h3 className="heading heading--md">Adoptuj</h3>

              <p className="text">
                Daj kotu dom na stałe
              </p>

              <span className="help__link">
                Zobacz koty <ArrowRight size={16} />
              </span>
            </a>

            {/* CARD 2 */}
            <a href="/dom-tymczasowy" className="card card-base variant--secondary">
              <div className="help__icon">
                <Clock size={24} />
              </div>

              <h3 className="heading heading--md">Dom tymczasowy</h3>

              <p className="text">
                Pomóż kotu dojść do siebie zanim znajdzie dom
              </p>

              <span className="help__link">
                Dowiedz się więcej <ArrowRight size={16} />
              </span>
            </a>

            {/* CARD 3 */}
            <a
              href="https://www.ratujemyzwierzaki.pl/en/kociaoaza"
              target="_blank"
              rel="noopener noreferrer"
              className="card card-base variant--tertiary"
            >
              <div className="help__icon">
                <HeartHandshake size={24} />
              </div>

              <h3 className="heading heading--md">Wesprzyj</h3>

              <p className="text">
                Pomóż nam ratować kolejne koty
              </p>

              <span className="help__link">
                Wesprzyj nas <ArrowRight size={16} />
              </span>
            </a>
          </div>
        </div>
      </Section.Content>
    </Section>
  );
}