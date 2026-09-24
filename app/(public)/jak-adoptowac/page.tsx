import type { Metadata } from "next";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import "./jak-adoptowac.css";

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

export const metadata: Metadata = {
    title: "Jak adoptować kota? | Kocia Oaza",
    description:
        "Dowiedz się jak wygląda proces adopcji kota w Kociej Oazie. Poznaj warunki adopcji, wymagania i kolejne etapy poznania kota.",
    alternates: {
        canonical: "https://kocia-oaza.pl/jak-adoptowac",
    },
    openGraph: {
        title: "Jak adoptować kota? | Kocia Oaza",
        description:
            "Sprawdź jak przebiega adopcja kota — od zgłoszenia po przygotowanie domu i podpisanie umowy.",
        url: "https://kocia-oaza.pl/jak-adoptowac",
        siteName: "Kocia Oaza",
        locale: "pl_PL",
        type: "article",
    },
};

export default function AdoptionPage() {
    return (
        <main className="adoption-page">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <section className="page-header-neutral">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">
                            Jak wygląda adopcja?
                        </Heading>

                        <p className="text">
                            Prosty proces, który zakończy się nową
                            przyjaźnią
                        </p>
                    </div>
                </Container>
            </section>

            {/* =====================================================
                PROCESS
            ===================================================== */}

            <section className="section adoption-process">
                <Container>
                    <div className="section__header">
                        <Heading level="md">
                            Krok po kroku
                        </Heading>

                        <p className="text">
                            Od pierwszego kontaktu do bezpiecznego domu.
                        </p>
                    </div>

                    <div className="adoption-steps section__content">

                        <div className="adoption-step">
                            <div className="step-icon">
                                <Phone size={26} />
                            </div>

                            <span className="adoption-step__number">
                                01
                            </span>

                            <h3>Zgłoszenie</h3>

                            <p>
                                Wyślij formularz klikając „Adoptuj”
                                przy wybranym kocie lub zadzwoń.
                            </p>
                        </div>

                        <div className="adoption-step">
                            <div className="step-icon">
                                <User size={26} />
                            </div>

                            <span className="adoption-step__number">
                                02
                            </span>

                            <h3>Poznanie kota</h3>

                            <p>
                                Spotykasz kota w kociarni lub domu
                                tymczasowym.
                            </p>
                        </div>

                        <div className="adoption-step">
                            <div className="step-icon">
                                <FileText size={26} />
                            </div>

                            <span className="adoption-step__number">
                                03
                            </span>

                            <h3>Decyzja i umowa</h3>

                            <p>
                                Podpisujemy umowę i przygotowujemy Cię
                                na przyjęcie kota.
                            </p>
                        </div>

                        <div className="adoption-step">
                            <div className="step-icon">
                                <Home size={26} />
                            </div>

                            <span className="adoption-step__number">
                                04
                            </span>

                            <h3>Po adopcji</h3>

                            <p>
                                Rejestracja chipa i spokojna adaptacja
                                kota.
                            </p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* =====================================================
                REQUIREMENTS
            ===================================================== */}

            <section className="section section--alt adoption-requirements">
                <Container>
                    <div className="section__header">
                        <Heading level="md">
                            Warunki adopcji
                        </Heading>

                        <p className="text">
                            Chcemy, aby każdy kot trafił do bezpiecznego
                            domu.
                        </p>
                    </div>

                    <div className="adoption-req section__content">

                        <div className="adoption-req__item">
                            <div className="adoption-req__icon adoption-req__icon--primary">
                                <Home size={25} />
                            </div>

                            <p>Dom niewychodzący</p>
                        </div>

                        <div className="adoption-req__item">
                            <div className="adoption-req__icon adoption-req__icon--secondary">
                                <ShieldCheck size={25} />
                            </div>

                            <p>Zabezpieczone okna</p>
                        </div>

                        <div className="adoption-req__item">
                            <div className="adoption-req__icon adoption-req__icon--tertiary">
                                <LayoutGrid size={25} />
                            </div>

                            <p>Osiatkowany balkon</p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* =====================================================
                FAQ
            ===================================================== */}

            <section className="section adoption-faq">
                <Container>
                    <div className="section__header">
                        <Heading level="md">
                            Często zadawane pytania
                        </Heading>
                    </div>

                    <div className="faq section__content">

                        <div className="faq__item">
                            <h3>
                                Ile kosztuje adopcja?
                            </h3>

                            <p>
                                Adopcja jest bezpłatna. Kot jest zdrowy,
                                wykastrowany/wysterylizowany, odrobaczony
                                i zaszczepiony.
                            </p>
                        </div>

                        <div className="faq__item">
                            <h3>
                                Czy mogę adoptować kota jeśli mam
                                małe dziecko?
                            </h3>

                            <p>
                                Tak! Mamy koty przyjazne dzieciom —
                                są oznaczone jako „Idealne dla rodzin”.
                            </p>
                        </div>

                        <div className="faq__item">
                            <h3>
                                Czy mogę mieć więcej niż jednego kota?
                            </h3>

                            <p>
                                Oczywiście! Wiele kotów dobrze czuje
                                się w towarzystwie innych kotów.
                            </p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* =====================================================
                CTA
            ===================================================== */}

            <section className="section section--green adoption-cta">
                <Container>
                    <div className="adoption-cta__inner">

                        <Heading level="md">
                            Gotowy na adopcję?
                        </Heading>

                        <p className="text">
                            Poznaj koty, które czekają na swój dom.
                        </p>

                        <Button href="/koty">
                            Zobacz koty
                            <ArrowRight size={16} />
                        </Button>

                    </div>
                </Container>
            </section>

        </main>
    );
}