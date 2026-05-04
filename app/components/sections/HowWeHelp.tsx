import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import { PawPrint, Pill, Home } from "lucide-react";

import "@/app/style/home/how-we-help.css";

import Section from "@/app/components/ui/Section";

export default function HowWeHelp() {
    return (
        <Section>
            <Section.Header>
                <Heading level="lg">Co robimy każdego dnia</Heading>

                <p className="text">
                    Ratujemy, leczymy i pomagamy kotom wrócić do normalnego życia.
                </p>
            </Section.Header>

            <Section.Content>
                <div className="grid-3 reveal-parent">
                    <div className="card-base variant--primary">
                        <div className="how__icon variant__icon">
                            <PawPrint size={24} />
                        </div>
                        <h3 className="heading heading--md">Ratowanie</h3>
                        <p className="text">
                            Przyjmujemy koty chore, porzucone i wymagające pilnej pomocy.
                        </p>
                    </div>

                    <div className="card-base variant--secondary">
                        <div className="how__icon variant__icon">
                            <Pill size={24} />
                        </div>
                        <h3 className="heading heading--md">Leczenie</h3>
                        <p className="text">
                            Diagnostyka, leczenie i pełna opieka weterynaryjna.
                        </p>
                    </div>

                    <div className="card-base variant--tertiary">
                        <div className="how__icon variant__icon">
                            <Home size={24} />
                        </div>
                        <h3 className="heading heading--md">Adopcje</h3>
                        <p className="text">
                            Szukamy odpowiednich domów dopasowanych do potrzeb kota.
                        </p>
                    </div>
                </div>

                <div className="how__cta">
                    <Button variant="primary" href="/jak-pomagamy">Jak pomagamy</Button>

                    <Button variant="primary" mode="outline" href="/o-nas">
                        O nas
                    </Button>
                </div>
            </Section.Content>
        </Section>
    );
}