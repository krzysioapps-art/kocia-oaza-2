// app/components/sections/AdoptionFlow.tsx

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import { FileText, Handshake, CheckCircle, ArrowRight } from "lucide-react";

import "@/app/style/home/adoption-flow.css";

export default function AdoptionFlow() {
  return (
    <section className="section section--yell">
      <Container>
        <div className="section__header">
          <Heading level="lg">Jak wygląda adopcja?</Heading>
        </div>

        <div className="section__content">
          <div className="flow">
            <div className="flow__step flow__step--tertiary">
              
              <span>1</span>
              <FileText size={24} />
              <h3>Formularz</h3>
              <p>Wypełniasz zgłoszenie</p>
               <small className="flow__hint">~3 minuty</small>
            </div>

            <div className="flow__step flow__step--secondary">
              
              <span>2</span>
              <Handshake size={24} />
              <h3>Poznanie</h3>
              <p>Spotykasz kota</p>
              <small className="flow__hint">spokojne spotkanie</small>
            </div>

            <div className="flow__step flow__step--primary">
              <span>3</span>
              <CheckCircle size={24} />
              <h3>Adopcja</h3>
              <p>Podpisujemy umowę</p>
              <small className="flow__hint">odbiór kota</small>
            </div>
          </div>

          <div className="section__footer">
            <Button variant="primary" mode="outline" href="/jak-adoptowac">
              Zobacz szczegóły <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}