import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import "@/app/style/jak-adoptowac.css";

import {
    Phone,
    CheckCircle,
    Home,
    ShieldCheck,
    LayoutGrid,
    ArrowRight,
    User,
    FileText,
} from "lucide-react";

export default function AdoptionPage() {
    return (
        <main>

            {/* HEADER */}
            <section className="page-header-neutral">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">Jak wygląda adopcja?</Heading>
                        <p className="text">
                            Prosty proces, który zakończy się nową przyjaźnią
                        </p>
                    </div>
                </Container>
            </section>

            {/* STEPS */}
            <section className="section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Krok po kroku</Heading>
                    </div>

                    <div className="adoption-steps section__content">

                        <div className="card-base adoption-step">
                            <div className="step-icon">
                                <Phone size={28} />
                            </div>
                            <h3>1. Zgłoszenie</h3>
                            <p>
                                Wyślij formularz klikając „Adoptuj” przy wybranym kocie
                                lub zadzwoń.
                            </p>
                        </div>

                        <div className="card-base adoption-step">
                            <div className="step-icon">
                                <User size={28} />
                            </div>
                            <h3>2. Poznanie kota</h3>
                            <p>
                                Spotykasz kota w kociarni lub domu tymczasowym.
                            </p>
                        </div>

                        <div className="card-base adoption-step">
                            <div className="step-icon">
                                <FileText size={28} />
                            </div>
                            <h3>3. Decyzja i umowa</h3>
                            <p>
                                Podpisujemy umowę i przygotowujemy Cię na przyjęcie kota.
                            </p>
                        </div>

                        <div className="card-base adoption-step">
                            <div className="step-icon">
                                <Home size={28} />
                            </div>
                            <h3>4. Po adopcji</h3>
                            <p>
                                Rejestracja chipa i spokojna adaptacja kota.
                            </p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* REQUIREMENTS */}
            <section className="section section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Warunki adopcji</Heading>
                    </div>

                    <div className="adoption-req section__content">

                        <div className="card-base variant--primary">
                            <Home />
                            <p>Dom niewychodzący</p>
                        </div>

                        <div className="card-base variant--secondary">
                            <ShieldCheck />
                            <p>Zabezpieczone okna</p>
                        </div>

                        <div className="card-base variant--tertiary">
                            <LayoutGrid />
                            <p>Osiatkowany balkon</p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* FAQ */}
            <section className="section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Często zadawane pytania</Heading>
                    </div>

                    <div className="faq section__content">

                        <div className="card-base">
                            <h3>Ile kosztuje adopcja?</h3>
                            <p>
                                Adopcja jest bezpłatna. Kot jest zdrowy,
                                wykastrowany/wysterylizowany, odrobaczony i zaszczepiony.
                            </p>
                        </div>

                        <div className="card-base">
                            <h3>Czy mogę adoptować kota jeśli mam małe dziecko?</h3>
                            <p>
                                Tak! Mamy koty przyjazne dzieciom — są oznaczone jako
                                „Idealne dla rodzin”.
                            </p>
                        </div>

                        <div className="card-base">
                            <h3>Czy mogę mieć więcej niż jednego kota?</h3>
                            <p>
                                Oczywiście! Wiele kotów dobrze czuje się w towarzystwie
                                innych kotów.
                            </p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="section section--alt">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Gotowy na adopcję?</Heading>
                    </div>

                    <div className="section__footer">
                        <Button href="/koty">
                            Zobacz koty <ArrowRight size={16} />
                        </Button>
                    </div>
                </Container>
            </section>

        </main>
    );
}