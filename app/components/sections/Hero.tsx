// app/components/sections/Hero.tsx

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import "@/app/style/home/hero.css";
import "@/app/style/home/stats.css";

export default function Hero() {
    return (
        <section className="section hero hero--bg hero--overlay hero--with-stats">
            <Container>
                <div className="hero__inner">
                    <Heading level="xl">
                        Ratujemy koty.
                    </Heading>

                    <Heading level="xl">
                        Pomóż im znaleźć dom.
                    </Heading>

                    <p className="text">
                        Każdy z nich ma swoją historię. Teraz szuka bezpiecznego domu.
                    </p>

                    <div className="hero__actions">
                        <Button variant="primary" href="/koty">Zobacz koty do adopcji</Button>
                        <Button variant="primary" mode="outline" href="/jak-pomagamy">
                            Jak pomagamy
                        </Button>
                    </div>
                </div>

                <div className="hero__stats">
                    <div className="grid-3--responsive stats--light">

                        <div className="stats__item stats__item--primary">
                            <div className="stats__value">120+</div>
                            <p className="text">uratowanych kotów</p>
                        </div>

                        <div className="stats__item stats__item--secondary">
                            <div className="stats__value">300+</div>
                            <p className="text">kastracji</p>
                        </div>

                        <div className="stats__item stats__item--tertiary">
                            <div className="stats__value">40+</div>
                            <p className="text">adopcji w ostatnim czasie</p>
                        </div>

                    </div>
                </div>
            </Container>
        </section>
    );
}