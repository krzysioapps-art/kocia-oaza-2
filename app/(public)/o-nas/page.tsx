import type { Metadata } from "next";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import "./o-nas.css";

import {
    Heart,
    TrendingUp,
    ShieldCheck,
    Target,
    Stethoscope,
    AlertTriangle,
    Leaf,
    Users,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
    title: "O nas | Kocia Oaza",
    description:
        "Poznaj misję Kociej Oazy. Pomagamy bezdomnym kotom, organizujemy adopcje i wspieramy odpowiedzialną opiekę nad zwierzętami w Warszawie.",
    alternates: {
        canonical: "https://kocia-oaza.pl/o-nas",
    },
    openGraph: {
        title: "O nas | Kocia Oaza",
        description:
            "Dowiedz się kim jesteśmy, jak pomagamy kotom i jakie wartości stoją za Kocią Oazą.",
        url: "https://kocia-oaza.pl/o-nas",
        siteName: "Kocia Oaza",
        locale: "pl_PL",
        type: "website",
    },
};

export default function AboutPage() {
    return (
        <main className="about-page">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <section className="page-header-neutral">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">
                            O nas
                        </Heading>

                        <p className="text">
                            Poznaj naszą misję i wartości
                        </p>
                    </div>
                </Container>
            </section>

            {/* =====================================================
                KIM JESTEŚMY
            ===================================================== */}

            <section className="section about-intro-section">
                <Container>
                    <div className="about-intro">
                        <div className="section__header">
                            <Heading level="md">
                                Kim jesteśmy?
                            </Heading>
                        </div>

                        <div className="about-intro__content text">
                            <p>
                                Kocia Oaza to inicjatywa tworzona z miłości
                                do zwierząt. Ratujemy koty przed bezdomnością
                                i pomagamy im znaleźć
                                <strong> bezpieczne, kochające domy</strong>.
                            </p>

                            <p>
                                Łączymy koty potrzebujące pomocy z ludźmi,
                                którzy są gotowi dać im opiekę i stabilność.
                                Każde zwierzę zasługuje na szansę na spokojne
                                życie.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* =====================================================
    MISJA
===================================================== */}

<section className="section section--alt about-mission-section">
    <Container>
        <div className="about-mission">

            <div className="about-mission__intro">
                <Heading level="md">
                    Nasza misja
                </Heading>

                <p className="text">
                    Działamy tam, gdzie koty najbardziej
                    potrzebują pomocy.
                </p>
            </div>

            <div className="about-mission__list">

                <div className="mission-item">
                    <div className="mission-icon mission-icon--primary">
                        <Target />
                    </div>

                    <div className="mission-item__content">
                        <span>01</span>
                        <p>
                            Ograniczanie bezdomności kotów
                            i poprawa ich dobrobytu
                        </p>
                    </div>
                </div>

                <div className="mission-item">
                    <div className="mission-icon mission-icon--secondary">
                        <Stethoscope />
                    </div>

                    <div className="mission-item__content">
                        <span>02</span>
                        <p>
                            Kastracja jako najskuteczniejsza
                            forma pomocy
                        </p>
                    </div>
                </div>

                <div className="mission-item">
                    <div className="mission-icon mission-icon--tertiary">
                        <AlertTriangle />
                    </div>

                    <div className="mission-item__content">
                        <span>03</span>
                        <p>
                            Ratowanie kotów chorych
                            i porzuconych
                        </p>
                    </div>
                </div>

                <div className="mission-item">
                    <div className="mission-icon mission-icon--primary">
                        <Leaf />
                    </div>

                    <div className="mission-item__content">
                        <span>04</span>
                        <p>
                            Opieka nad kotami
                            wolno żyjącymi
                        </p>
                    </div>
                </div>

                <div className="mission-item">
                    <div className="mission-icon mission-icon--secondary">
                        <Users />
                    </div>

                    <div className="mission-item__content">
                        <span>05</span>
                        <p>
                            Niewielkie stowarzyszenie
                            z rosnącym zasięgiem
                        </p>
                    </div>
                </div>

                <div className="mission-item">
                    <div className="mission-icon mission-icon--tertiary">
                        <Heart />
                    </div>

                    <div className="mission-item__content">
                        <span>06</span>
                        <p>
                            Budowanie relacji między ludźmi
                            a zwierzętami
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </Container>
</section>

            {/* =====================================================
                WARTOŚCI
            ===================================================== */}

            <section className="section about-values-section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">
                            Co jest dla nas najważniejsze
                        </Heading>

                        <p className="text">
                            Pomagamy odpowiedzialnie, z myślą o długofalowym
                            dobrostanie każdego kota.
                        </p>
                    </div>

                    <div className="about-values section__content">

                        <div className="value-item value-item--primary">
                            <div className="value-item__icon">
                                <Heart />
                            </div>

                            <div>
                                <h3>
                                    Odpowiedzialna pomoc
                                </h3>

                                <p>
                                    Każdemu kotu poświęcamy tyle czasu,
                                    ile potrzebuje.
                                </p>
                            </div>
                        </div>

                        <div className="value-item value-item--secondary">
                            <div className="value-item__icon">
                                <TrendingUp />
                            </div>

                            <div>
                                <h3>
                                    Realna zmiana
                                </h3>

                                <p>
                                    Skupiamy się na działaniach,
                                    które naprawdę działają.
                                </p>
                            </div>
                        </div>

                        <div className="value-item value-item--tertiary">
                            <div className="value-item__icon">
                                <ShieldCheck />
                            </div>

                            <div>
                                <h3>
                                    Dopasowane adopcje
                                </h3>

                                <p>
                                    Każdy kot trafia do odpowiedniego domu.
                                </p>
                            </div>
                        </div>

                    </div>
                </Container>
            </section>

            {/* =====================================================
                LINK DO JAK POMAGAMY
            ===================================================== */}

            <section className="section section--green about-help-link">
                <Container>
                    <div className="about-help-link__inner">

                        <div>
                            <Heading level="md">
                                Zobacz, jak pomagamy w praktyce
                            </Heading>

                            <p className="text">
                                Poznaj dokładnie, jak wygląda nasza
                                codzienna pomoc kotom.
                            </p>
                        </div>

                        <Button href="/jak-pomagamy">
                            Jak pomagamy
                            <ArrowRight size={16} />
                        </Button>

                    </div>
                </Container>
            </section>

            {/* =====================================================
                KONTAKT
            ===================================================== */}

            <section className="section about-contact-section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">
                            Skontaktuj się z nami
                        </Heading>
                    </div>

                    <div className="about-contact section__content">

                        <a
                            href="mailto:kocia.oaza@gmail.com"
                            className="contact-item"
                        >
                            <div className="contact-icon">
                                <Mail />
                            </div>

                            <span>
                                kocia.oaza@gmail.com
                            </span>
                        </a>

                        <a
                            href="tel:+48515621000"
                            className="contact-item"
                        >
                            <div className="contact-icon">
                                <Phone />
                            </div>

                            <span>
                                515 621 000
                            </span>
                        </a>

                        <div className="contact-item">
                            <div className="contact-icon">
                                <MapPin />
                            </div>

                            <span>
                                Warszawa
                            </span>
                        </div>

                    </div>
                </Container>
            </section>

            {/* =====================================================
                DISCLAIMER
            ===================================================== */}

            <section className="section section--sm about-disclaimer">
                <Container>
                    <p className="text text-sm">
                        Strona ma charakter informacyjny i wspiera działania
                        na rzecz zwierząt.
                    </p>
                </Container>
            </section>

        </main>
    );
}