import type { Metadata } from "next";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import "./how-we-help.css";

import {
    Heart,
    Scissors,
    Home,
    PawPrint,
    Stethoscope,
    Sparkles,
    ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Jak pomagamy kotom | Kocia Oaza",
    description:
        "Zobacz jak pomagamy bezdomnym kotom. Leczenie, kastracje, adopcje i opieka nad kotami wolno żyjącymi w Warszawie.",
    alternates: {
        canonical: "https://kocia-oaza.pl/jak-pomagamy",
    },
    openGraph: {
        title: "Jak pomagamy kotom | Kocia Oaza",
        description:
            "Poznaj działania Kociej Oazy — ratowanie kotów, leczenie, adopcje i pomoc kotom wolno żyjącym.",
        url: "https://kocia-oaza.pl/jak-pomagamy",
        siteName: "Kocia Oaza",
        locale: "pl_PL",
        type: "website",
    },
};

export default function HowWeHelpPage() {
    return (
        <main className="how-help-page">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <section className="page-header-neutral">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">
                            Co robimy każdego dnia
                        </Heading>

                        <p className="text">
                            Ratujemy, leczymy i pomagamy kotom wrócić
                            do normalnego życia.
                        </p>

                        <p className="text">
                            Trafiają do nas koty chore, porzucone,
                            często w bardzo złym stanie.{" "}
                            <span className="text-highlight">
                                Każdy przypadek to czas, koszty i ogromne
                                zaangażowanie
                            </span>{" "}
                            — ale przede wszystkim szansa na nowe życie.
                        </p>
                    </div>
                </Container>
            </section>

            {/* =====================================================
                PROCESS
            ===================================================== */}

            <section className="section how-process">
                <Container>
                    <div className="section__header">
                        <Heading level="md">
                            Jak pomagamy kotom pod naszą opieką
                        </Heading>

                        <p className="text">
                            Od momentu przyjęcia kota aż do znalezienia
                            domu — <strong>każdy etap ma znaczenie.</strong>
                        </p>
                    </div>

                    <div className="how-process__steps section__content">

                        <div className="how-process__step">
                            <div className="how-process__icon how-process__icon--primary">
                                <PawPrint />
                            </div>

                            <span className="how-process__number">
                                01
                            </span>

                            <h3>
                                Trafia do nas
                            </h3>

                            <p>
                                Przyjmujemy koty{" "}
                                <strong>
                                    chore, po wypadkach i porzucone
                                </strong>{" "}
                                lub zabezpieczone z interwencji.
                                Często wymagają natychmiastowej pomocy.
                            </p>
                        </div>

                        <div className="how-process__step">
                            <div className="how-process__icon how-process__icon--secondary">
                                <Stethoscope />
                            </div>

                            <span className="how-process__number">
                                02
                            </span>

                            <h3>
                                Leczenie
                            </h3>

                            <p>
                                Diagnostyka, wizyty u weterynarza
                                i pełna opieka. Każdy kot dostaje
                                tyle czasu, ile potrzebuje.
                            </p>
                        </div>

                        <div className="how-process__step">
                            <div className="how-process__icon how-process__icon--tertiary">
                                <Sparkles />
                            </div>

                            <span className="how-process__number">
                                03
                            </span>

                            <h3>
                                Regeneracja
                            </h3>

                            <p>
                                Kot dochodzi do siebie fizycznie
                                i psychicznie. Uczy się zaufania
                                i poczucia bezpieczeństwa.
                            </p>
                        </div>

                        <div className="how-process__step">
                            <div className="how-process__icon how-process__icon--primary">
                                <Home />
                            </div>

                            <span className="how-process__number">
                                04
                            </span>

                            <h3>
                                Nowy dom
                            </h3>

                            <p>
                                Szukamy odpowiedniego opiekuna.
                                Proces adopcji nie jest przypadkowy.
                            </p>
                        </div>

                    </div>

                    <div className="how-process__media">
                        <img
                            src="/proces1.jpg"
                            alt="Leczenie kota u weterynarza"
                        />

                        <img
                            src="/proces2.jpg"
                            alt="Opieka nad kotem"
                        />

                        <img
                            src="/proces3.jpg"
                            alt="Kot w trakcie regeneracji"
                        />
                    </div>
                </Container>
            </section>

            {/* =====================================================
                KOTY WOLNO ŻYJĄCE
            ===================================================== */}

            <section className="section section--alt how-free-cats">
                <Container>
                    <div className="section__header">
                        <Heading level="md">
                            Opieka nad kotami wolno żyjącymi
                        </Heading>

                        <p className="text">
                            Opiekujemy się także stadami kotów wolno
                            żyjących. To ważne:{" "}
                            <span className="text-highlight">
                                tych kotów nie zabieramy i nie szukamy
                                im domów
                            </span>
                            . Ich miejscem jest środowisko, w którym żyją
                            — <strong>to tam czują się bezpiecznie</strong>.
                        </p>
                    </div>

                    <div className="how-free-cats__items section__content">

                        <div className="how-free-cats__item">
                            <div className="how-free-cats__icon how-free-cats__icon--primary">
                                <PawPrint />
                            </div>

                            <h3>
                                Codzienna opieka
                            </h3>

                            <p>
                                Zapewniamy karmę i świeżą wodę
                                każdego dnia.
                            </p>
                        </div>

                        <div className="how-free-cats__item">
                            <div className="how-free-cats__icon how-free-cats__icon--secondary">
                                <Home />
                            </div>

                            <h3>
                                Schronienie
                            </h3>

                            <p>
                                Budujemy ocieplane domki i regularnie
                                wymieniamy w nich słomę.
                            </p>
                        </div>

                        <div className="how-free-cats__item">
                            <div className="how-free-cats__icon how-free-cats__icon--tertiary">
                                <Scissors />
                            </div>

                            <h3>
                                Kontrola populacji
                            </h3>

                            <p>
                                Prowadzimy kastracje, aby zapobiegać
                                bezdomności.
                            </p>
                        </div>

                    </div>

                    <div className="how-free-cats__media">
                        <img
                            src="/jak-pomagamy1.jpg"
                            alt="Kot wolno żyjący"
                        />

                        <img
                            src="/jak-pomagamy2.jpg"
                            alt="Koty wolno żyjące zimą"
                        />

                        <img
                            src="/jak-pomagamy3.jpg"
                            alt="Dokarmianie kotów"
                        />
                    </div>

                    <div className="how-free-cats__note">
                        <p className="text">
                            Jeśli któryś z tych kotów zachoruje, ulegnie
                            wypadkowi lub wymaga pomocy — wtedy trafia
                            pod naszą opiekę i przechodzi leczenie.
                        </p>
                    </div>
                </Container>
            </section>

            {/* =====================================================
                EFEKTY
            ===================================================== */}

            <section className="section how-results">
                <Container>
                    <div className="section__header">
                        <Heading level="md">
                            Efekty naszej pracy
                        </Heading>
                    </div>

                    <div className="how-results__grid section__content">

                        <div className="how-result how-result--primary">
                            <Heart />

                            <strong>
                                120+
                            </strong>

                            <p>
                                uratowanych kotów
                            </p>
                        </div>

                        <div className="how-result how-result--secondary">
                            <Scissors />

                            <strong>
                                300+
                            </strong>

                            <p>
                                kastracji
                            </p>
                        </div>

                        <div className="how-result how-result--tertiary">
                            <Home />

                            <strong>
                                40+
                            </strong>

                            <p>
                                adopcji
                            </p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* =====================================================
                TRUDNA STRONA POMOCY
            ===================================================== */}

            <section className="section section--alt how-difficult">
                <Container>
                    <div className="how-difficult__inner">
                        <Heading level="md">
                            To nie zawsze jest łatwe
                        </Heading>

                        <p className="text">
                            Leczenie bywa długie, a nie każdy kot od razu
                            ufa człowiekowi. Niektóre historie są trudne —
                            <strong>
                                {" "}ale każdy kot zasługuje na szansę.
                            </strong>
                        </p>
                    </div>
                </Container>
            </section>

            {/* =====================================================
                JAK MOŻESZ POMÓC
            ===================================================== */}

            <section className="section how-you-can-help">
                <Container>
                    <div className="section__header">
                        <Heading level="md">
                            Jak możesz pomóc Ty
                        </Heading>
                    </div>

                    <div className="how-help-options section__content">

                        <div className="how-help-option">
                            <div className="how-help-option__icon how-help-option__icon--primary">
                                <Home />
                            </div>

                            <h3>
                                Adoptuj
                            </h3>

                            <p>
                                <strong>
                                    Daj kotu bezpieczny, stały dom.
                                </strong>
                            </p>

                            <Button
                                href="/koty"
                                mode="outline"
                            >
                                Zobacz koty
                            </Button>
                        </div>

                        <div className="how-help-option">
                            <div className="how-help-option__icon how-help-option__icon--secondary">
                                <PawPrint />
                            </div>

                            <h3>
                                Dom tymczasowy
                            </h3>

                            <p>
                                <strong>
                                    Pomóż kotu dojść do siebie.
                                </strong>
                            </p>

                            <Button
                                href="/dom-tymczasowy"
                                mode="outline"
                            >
                                Dowiedz się więcej
                            </Button>
                        </div>

                        <div className="how-help-option">
                            <div className="how-help-option__icon how-help-option__icon--tertiary">
                                <Heart />
                            </div>

                            <h3>
                                Wesprzyj
                            </h3>

                            <p>
                                <strong>
                                    Pomóż finansować leczenie.
                                </strong>
                            </p>

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

            {/* =====================================================
                FINAL CTA
            ===================================================== */}

            <section className="section section--green how-final">
                <Container>
                    <div className="how-final__inner">

                        <Heading level="lg">
                            Każdy kot zasługuje na szansę
                        </Heading>

                        <p className="text">
                            Dzięki ludziom takim jak Ty możemy pomagać
                            dalej.
                        </p>

                        <div className="how-final__actions">
                            <Button href="/koty">
                                Poznaj koty
                            </Button>

                            <a
                                href="https://www.ratujemyzwierzaki.pl/en/kociaoaza"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button mode="outline">
                                    Wesprzyj nas
                                    <ArrowRight size={16} />
                                </Button>
                            </a>
                        </div>

                    </div>
                </Container>
            </section>

        </main>
    );
}