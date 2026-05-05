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

export default function HowWeHelpPage() {
    return (
        <main>

            {/* HERO */}

            <section className="page-header-neutral">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">Co robimy każdego dnia</Heading>

                        <p className="text">
                            Ratujemy, leczymy i pomagamy kotom wrócić do normalnego życia.
                        </p>

                        <p className="text">
                            Trafiają do nas koty chore, porzucone, często w bardzo złym stanie.{" "}
                            <span className="text-highlight">
                                Każdy przypadek to czas, koszty i ogromne zaangażowanie
                            </span>
                            — ale przede wszystkim szansa na nowe życie.
                        </p>
                    </div>
                </Container>
            </section>

            {/* JAK POMAGAMY */}
            <section className="section section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Jak pomagamy kotom pod naszą opieką</Heading>

                        <p className="text">
                            Od momentu przyjęcia kota aż do znalezienia domu — <strong>każdy etap ma znaczenie.</strong>
                        </p>
                    </div>

                    <div className="process section__content">

                        <div className="card-base">
                            <div className="mission-icon"><PawPrint /></div>
                            <h3>1. Trafia do nas</h3>
                            <p>
                                Przyjmujemy koty <strong>chore, po wypadkach i porzucone</strong> lub zabezpieczone z interwencji.
                                Często wymagają natychmiastowej pomocy.
                            </p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><Stethoscope /></div>
                            <h3>2. Leczenie</h3>
                            <p>
                                Diagnostyka, wizyty u weterynarza i pełna opieka.
                                Każdy kot dostaje tyle czasu, ile potrzebuje.
                            </p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><Sparkles /></div>
                            <h3>3. Regeneracja</h3>
                            <p>
                                Kot dochodzi do siebie fizycznie i psychicznie.
                                Uczy się zaufania i poczucia bezpieczeństwa.
                            </p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><Home /></div>
                            <h3>4. Nowy dom</h3>
                            <p>
                                Szukamy odpowiedniego opiekuna.
                                Proces adopcji nie jest przypadkowy.
                            </p>
                        </div>


                    </div>
                    <div className="how-hero__media-wrap">
                        <div className="how-hero__media">
                            <img src="/proces1.jpg" alt="leczenie kota u weterynarza" />
                            <img src="/proces2.jpg" alt="opieka nad kotem" />
                            <img src="/proces3.jpg" alt="kot w trakcie regeneracji" />
                        </div>
                    </div>
                </Container>
            </section>

            {/* KOTY WOLNO ŻYJĄCE */}
            <section className="section section--alt">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Opieka nad kotami wolno żyjącymi</Heading>

                        <p className="text">
                            Opiekujemy się także stadami kotów wolno żyjących.
                            To ważne: <span className="text-highlight">tych kotów nie zabieramy i nie szukamy im domów</span>.
                            Ich miejscem jest środowisko, w którym żyją — <strong>to tam czują się bezpiecznie</strong>.
                        </p>
                    </div>

                    <div className="grid-3 section__content">

                        <div className="card-base">
                            <div className="mission-icon"><PawPrint /></div>
                            <h3>Codzienna opieka</h3>
                            <p>
                                Zapewniamy karmę i świeżą wodę każdego dnia.
                            </p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><Home /></div>
                            <h3>Schronienie</h3>
                            <p>
                                Budujemy ocieplane domki i regularnie wymieniamy w nich słomę.
                            </p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><Scissors /></div>
                            <h3>Kontrola populacji</h3>
                            <p>
                                Prowadzimy kastracje, aby zapobiegać bezdomności.
                            </p>
                        </div>

                    </div>

                    <div className="how-hero__media-wrap">
                        <div className="how-hero__media">
                            <img src="/jak-pomagamy1.jpg" alt="kot wolno żyjący" />
                            <img src="/jak-pomagamy2.jpg" alt="koty wolno żyjące zimą" />
                            <img src="/jak-pomagamy3.jpg" alt="dokarmianie kotów" />
                        </div>
                    </div>

                    <div className="section__footer">
                        <p className="text">
                            Jeśli któryś z tych kotów zachoruje, ulegnie wypadkowi lub wymaga pomocy —
                            wtedy trafia pod naszą opiekę i przechodzi leczenie.
                        </p>
                    </div>
                </Container>
            </section>

            {/* STATYSTYKI */}
            <section className="section section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Efekty naszej pracy</Heading>
                    </div>

                    <div className="grid-3 stats section__content">

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

            <section className="section section--alt">
                <Container>
                    <div className="section__header">
                        <Heading level="md">To nie zawsze jest łatwe</Heading>

                        <p className="text">
                            Leczenie bywa długie, a nie każdy kot od razu ufa człowiekowi.
                            Niektóre historie są trudne — <strong>ale każdy kot zasługuje na szansę</strong>.
                        </p>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="section section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Jak możesz pomóc Ty</Heading>
                    </div>

                    <div className="grid-3 stats section__content">

                        <div className="card-base">
                            <div className="mission-icon"><Home /></div>
                            <h3>Adoptuj</h3>
                            <p><strong>Daj kotu bezpieczny, stały dom</strong></p>
                            <Button href="/koty" mode="outline">
                                Zobacz koty
                            </Button>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><PawPrint /></div>
                            <h3>Dom tymczasowy</h3>
                            <p><strong>Pomóż kotu dojść do siebie</strong></p>
                            <Button href="/dom-tymczasowy" mode="outline">
                                Dowiedz się więcej
                            </Button>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><Heart /></div>
                            <h3>Wesprzyj</h3>
                            <p><strong>Pomóż finansować leczenie</strong></p>
                            <a
                                href="https://www.ratujemyzwierzaki.pl/en/kociaoaza"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button mode="outline">
                                    Wesprzyj nas
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