"use client";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import {
    Home,
    PawPrint,
    Heart,
    ShieldCheck,
    MessageCircle,
    ArrowRight,
} from "lucide-react";

export default function TemporaryHomePage() {
    return (
        <main>

            {/* HERO */}
            <section className="page-header-neutral">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">Zostań domem tymczasowym</Heading>

                        <p className="text">
                            Pomóż kotu dojść do siebie i przygotować się do adopcji.
                        </p>

                        <p className="text">
                            <strong>
                                Nie musisz mieć doświadczenia — najważniejsze jest zaangażowanie i odpowiedzialność.
                            </strong>
                        </p>
                    </div>
                </Container>
            </section>

            {/* NA CZYM POLEGA */}
            <section className="section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Jak to działa?</Heading>
                    </div>

                    <div className="section__content text">
                        <p>
                            Kot trafia do domu tymczasowego po leczeniu, kastracji/sterylizacji
                            i wstępnej obserwacji. Wiemy już wtedy, jaki ma charakter i czego potrzebuje.
                        </p>

                        <p>
                            W domu tymczasowym kot uczy się życia w warunkach domowych,
                            odpoczywa i przygotowuje do adopcji.
                        </p>

                        <p>
                            Niektóre koty, ze względu na zdrowie lub zachowanie, zostają pod naszą stałą opieką —
                            wtedy możliwa jest adopcja wirtualna.
                        </p>
                    </div>
                </Container>
            </section>

            {/* PROCES */}
            <section className="section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Jak wygląda proces?</Heading>
                    </div>

                    <div className="process section__content">

                        <div className="card-base">
                            <div className="mission-icon"><MessageCircle /></div>
                            <p>Zgłaszasz się do nas</p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><ShieldCheck /></div>
                            <p>Sprawdzamy warunki i rozmawiamy</p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><PawPrint /></div>
                            <p>Dobieramy odpowiedniego kota</p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><Home /></div>
                            <p>Kot trafia do Twojego domu</p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* CO ZAPEWNIAMY */}
            <section className="section section--alt">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Nie jesteś z tym sam</Heading>
                    </div>

                    <div className="grid-3 section__content">

                        <div className="card-base">
                            <div className="mission-icon"><Heart /></div>
                            <p><strong>Pokrywamy koszty leczenia i weterynarza</strong></p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><PawPrint /></div>
                            <p>Zapewniamy karmę i wsparcie</p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><MessageCircle /></div>
                            <p>Jesteśmy w stałym kontakcie</p>
                        </div>

                    </div>

                    <div className="section__footer">
                        <p className="text">
                            Jeśli chcesz dodatkowo wspierać kota finansowo — możesz to robić,
                            ale nie jest to wymagane.
                        </p>
                    </div>
                </Container>
            </section>

            {/* TWOJA ROLA */}
            <section className="section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Twoja rola</Heading>
                    </div>

                    <div className="grid-3 section__content">

                        <div className="card-base">
                            <div className="mission-icon"><Home /></div>
                            <p>Bezpieczne i spokojne miejsce</p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><PawPrint /></div>
                            <p>Codzienna opieka i obserwacja</p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><Heart /></div>
                            <p>Cierpliwość i zaangażowanie</p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* WYMAGANIA */}
            <section className="section section--alt">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Wymagania</Heading>
                    </div>

                    <div className="grid-2 section__content">

                        <div className="card-base">
                            <div className="mission-icon"><Home /></div>
                            <p><strong>Mieszkanie niewychodzące</strong></p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><ShieldCheck /></div>
                            <p><strong>Zabezpieczone okna i balkon</strong></p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><PawPrint /></div>
                            <p>Okna uchylne muszą mieć zabezpieczenia</p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><Heart /></div>
                            <p>Inne zwierzęta — możliwe, zależnie od kota</p>
                        </div>

                    </div>

                    <div className="section__footer">
                        <p className="text">
                            <strong>Bezpieczeństwo kota jest dla nas absolutnym priorytetem.</strong>
                        </p>
                    </div>
                </Container>
            </section>

            {/* ZASADY */}
            <section className="section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Ważne zasady</Heading>
                    </div>

                    <div className="grid-2 section__content">

                        <div className="card-base">
                            <div className="mission-icon"><ShieldCheck /></div>
                            <p>Kot pozostaje pod naszą opieką formalną</p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><PawPrint /></div>
                            <p>Nie można przekazać kota innej osobie</p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><Home /></div>
                            <p>Adopcje prowadzimy wyłącznie przez nas</p>
                        </div>

                        <div className="card-base">
                            <div className="mission-icon"><Heart /></div>
                            <p>Możesz polecić dom — ale kontakt przez nas</p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* REAL TALK */}
            <section className="section section--alt">
                <Container>
                    <div className="section__header">
                        <Heading level="md">To nie zawsze jest łatwe</Heading>
                    </div>

                    <div className="grid-2 section__content">

                        <div className="card-base">
                            <p>
                                Koty mają różne charaktery — niektóre są nieśmiałe,
                                inne wymagające i potrzebują więcej czasu.
                            </p>
                        </div>

                        <div className="card-base">
                            <p>
                                Czasem potrzeba cierpliwości, spokoju i zrozumienia,
                                zanim kot poczuje się bezpiecznie.
                            </p>
                        </div>

                    </div>

                    <div className="section__footer">
                        <p className="text">
                            <strong>
                                Dom tymczasowy to odpowiedzialność — ale też ogromna satysfakcja.
                            </strong>
                        </p>
                    </div>
                </Container>
            </section>

            {/* DLACZEGO WARTO */}
            <section className="section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Dlaczego to ma znaczenie?</Heading>
                    </div>

                    <div className="grid-3 section__content">

                        <div className="card-base variant--primary">
                            <p>Każdy dom tymczasowy to szansa na uratowanie kolejnego kota.</p>
                        </div>

                        <div className="card-base variant--secondary">
                            <p>Bez domów tymczasowych nie jesteśmy w stanie pomagać na taką skalę.</p>
                        </div>

                        <div className="card-base variant--tertiary">
                            <p><strong>To dzięki Tobie koty dostają drugą szansę.</strong></p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="section section--final">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Chcesz pomóc?</Heading>
                        <p className="text">
                            Odezwij się do nas — wspólnie znajdziemy rozwiązanie.
                        </p>
                    </div>

                    <div className="section__footer">
                        <Button href="/kontakt">
                            Zgłoś się jako dom tymczasowy <ArrowRight size={16} />
                        </Button>
                    </div>
                </Container>
            </section>

        </main>
    );
}