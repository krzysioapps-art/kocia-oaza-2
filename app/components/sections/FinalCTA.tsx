// app/components/sections/FinalCTA.tsx

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import { PawPrint, HeartHandshake } from "lucide-react";

import "@/app/style/home/final-cta.css";

export default function FinalCTA() {
  return (
    <section className="section section--green">
      <Container>
        <div className="section__header">
          <Heading level="lg">Każdy kot zasługuje na dom</Heading>

          <p className="text">
            Możesz pomóc — na swój sposób.
          </p>
        </div>

        <div className="section__footer">
          <Button variant="tertiary" href="/koty">
            <PawPrint size={16} />
            Poznaj koty
          </Button>

          <Button variant="tertiary" mode="outline" href="/jak-pomagamy">
            <HeartHandshake size={16} />
            Zobacz jak pomagamy
          </Button>
        </div>
      </Container>
    </section>
  );
}