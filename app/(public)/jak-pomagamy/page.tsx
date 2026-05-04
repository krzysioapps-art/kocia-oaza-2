import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import {
    Heart,
    Activity,
    Scissors,
    Home,
    PawPrint,
    Stethoscope,
    Sparkles,
    ArrowRight,
} from "lucide-react";

import "@/app/style/how-we-help.css";

export default function HowWeHelpPage() {
    return (
        <main>

            {/* HERO */}

            <section className="page-header">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">Co robimy każdego dnia</Heading>

                        <p className="text">
                            Ratujemy, leczymy i pomagamy kotom wrócić do normalnego życia.
                        </p>

                        <p className="text">
                            Trafiają do nas koty chore, porzucone, często w bardzo złym stanie.{" "}
                            <span className="text-highlight">
                                Każdy przypadek to czas, koszty i zaangażowanie
                            </span>{" "}
                            — ale też szansa na nowe życie.
                        </p>
                    </div>
                </Container>

                {/* 🔥 MEDIA — poza containerem */}
                <div className="how-hero__media-wrap">
                    <div className="how-hero__media">
                        <img src="/jak-pomagamy1.jpg" alt="" />
                        <img src="/jak-pomagamy2.jpg" alt="" />
                        <img src="/jak-pomagamy3.jpg" alt="" />
                    </div>
                </div>

            </section>

            {/* JAK POMAGAMY */}
            <section className="section section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Jak pomagamy</Heading>
                        <p className="text">
                            Od momentu przyjęcia kota aż do znalezienia domu — każdy etap ma znaczenie.
                        </p>
                    </div>

                    <div className="process section__content">

                        <div className="card-base">
                            <PawPrint />
                            <h3>1. Trafia do nas</h3>
                            <p>
                                Przyjmujemy koty chore, po wypadkach i porzucone.
                                Często wymagają natychmiastowej pomocy.
                            </p>
                        </div>

                        <div className="card-base">
                            <Stethoscope />
                            <h3>2. Leczenie</h3>
                            <p>
                                Diagnostyka, wizyty u weterynarza i pełna opieka.
                                Każdy kot dostaje tyle czasu, ile potrzebuje.
                            </p>
                        </div>

                        <div className="card-base">
                            <Sparkles />
                            <h3>3. Regeneracja</h3>
                            <p>
                                Kot dochodzi do siebie fizycznie i psychicznie.
                                Uczy się zaufania i stabilności.
                            </p>
                        </div>

                        <div className="card-base">
                            <Home />
                            <h3>4. Nowy dom</h3>
                            <p>
                                Szukamy odpowiedniego opiekuna.
                                Proces adopcji nie jest przypadkowy.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* STATYSTYKI */}
            <section className="section section--alt">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Efekty naszej pracy</Heading>
                    </div>

                    <div className="grid-3--responsive stats section__content">

                        <div className="card-base">
                            <Heart />
                            <strong>120+</strong>
                            <p>uratowanych kotów</p>
                        </div>

                        <div className="card-base">
                            <Scissors />
                            <strong>300+</strong>
                            <p>kastracji</p>
                        </div>

                        <div className="card-base">
                            <Home />
                            <strong>40+</strong>
                            <p>adopcji</p>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="section section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">To nie zawsze jest łatwe</Heading>

                        <p className="text">
                            Leczenie bywa długie, a nie każdy kot od razu ufa człowiekowi.
                            Niektóre historie są trudne — ale każdy kot zasługuje na szansę.
                        </p>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="section section--alt">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Jak możesz pomóc Ty</Heading>
                    </div>

                    <div className="grid-3 stats section__content">

                        <div className="card-base">
                            <Home />
                            <h3>Adoptuj</h3>
                            <p>Daj kotu dom na stałe</p>
                            <Button href="/koty" mode="outline">
                                Zobacz koty <ArrowRight size={16} />
                            </Button>
                        </div>

                        <div className="card-base">
                            <PawPrint />
                            <h3>Dom tymczasowy</h3>
                            <p>Pomóż kotu dojść do siebie</p>
                            <Button href="/kontakt" mode="outline">
                                Dowiedz się więcej <ArrowRight size={16} />
                            </Button>
                        </div>

                        <div className="card-base">
                            <Heart />
                            <h3>Wesprzyj</h3>
                            <p>Pomóż finansować leczenie</p>
                            <a
                                href="https://www.ratujemyzwierzaki.pl/en/kociaoaza"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button mode="outline">
                                    Wesprzyj nas <ArrowRight size={16} />
                                </Button>
                            </a>
                        </div>

                    </div>
                </Container>
            </section>

            {/* FINAL CTA */}
            <section className="section section--final">
                <Container>
                    <div className="section__header">
                        <Heading level="lg">Każdy kot zasługuje na szansę</Heading>
                        <p className="text">
                            Dzięki ludziom takim jak Ty możemy pomagać dalej.
                        </p>
                    </div>

                    <div className="section__footer">
                        <Button href="/koty">Poznaj koty</Button>
                        <a
                                href="https://www.ratujemyzwierzaki.pl/en/kociaoaza"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button mode="outline">
                                    Wesprzyj nas <ArrowRight size={16} />
                                </Button>
                            </a>
                    </div>
                </Container>
            </section>

        </main>
    );
}