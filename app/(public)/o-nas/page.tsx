import type { Metadata } from "next";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import "@/app/style/o-nas.css";

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

            {/* 🔥 HEADER */}
            <section className="page-header-neutral">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">O nas</Heading>
                        <p className="text">
                            Poznaj naszą misję i wartości
                        </p>
                    </div>
                </Container>
            </section>

            {/* 👥 KIM JESTEŚMY */}
            <section className="section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Kim jesteśmy?</Heading>
                    </div>

                    <div className="section__content text about-intro">
                        <p>
                            Kocia Oaza to inicjatywa tworzona z miłości do zwierząt.
                            Ratujemy koty przed bezdomnością i pomagamy im znaleźć
                            <strong> bezpieczne, kochające domy</strong>.
                        </p>

                        <p>
                            Łączymy koty potrzebujące pomocy z ludźmi, którzy są gotowi dać im opiekę i stabilność.
                            Każde zwierzę zasługuje na szansę na spokojne życie.
                        </p>
                    </div>
                </Container>
            </section>

            {/* 🎯 MISJA */}
            <section className="section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Nasza misja</Heading>
                    </div>

                    <div className="grid-2 section__content about-mission">

                        <div className="card-base mission-card">
                            <div className="mission-icon"><Target /></div>
                            <p>Ograniczanie bezdomności kotów i poprawa ich dobrobytu</p>
                        </div>

                        <div className="card-base mission-card">
                            <div className="mission-icon"><Stethoscope /></div>
                            <p>Kastracja jako najskuteczniejsza forma pomocy</p>
                        </div>

                        <div className="card-base mission-card">
                            <div className="mission-icon"><AlertTriangle /></div>
                            <p>Ratowanie kotów chorych i porzuconych</p>
                        </div>

                        <div className="card-base mission-card">
                            <div className="mission-icon"><Leaf /></div>
                            <p>Opieka nad kotami wolno żyjącymi</p>
                        </div>

                        <div className="card-base mission-card">
                            <div className="mission-icon"><Users /></div>
                            <p>Niewielkie stowarzyszenie z rosnącym zasięgiem</p>
                        </div>

                        <div className="card-base mission-card">
                            <div className="mission-icon"><Heart /></div>
                            <p>Budowanie relacji między ludźmi a zwierzętami</p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* ❤️ WARTOŚCI */}
            <section className="section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Co jest dla nas najważniejsze</Heading>
                    </div>

                    <div className="grid-3 section__content">

                        <div className="card-base variant--primary">
                            <Heart />
                            <h3>Odpowiedzialna pomoc</h3>
                            <p>Każdemu kotu poświęcamy tyle czasu, ile potrzebuje.</p>
                        </div>

                        <div className="card-base variant--secondary">
                            <TrendingUp />
                            <h3>Realna zmiana</h3>
                            <p>Skupiamy się na działaniach, które naprawdę działają.</p>
                        </div>

                        <div className="card-base variant--tertiary">
                            <ShieldCheck />
                            <h3>Dopasowane adopcje</h3>
                            <p>Każdy kot trafia do odpowiedniego domu.</p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* 🔗 LINK DO JAK POMAGAMY */}
            <section className="section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Zobacz, jak pomagamy w praktyce</Heading>
                        <p className="text">
                            Poznaj dokładnie, jak wygląda nasza codzienna pomoc kotom
                        </p>
                    </div>

                    <div className="section__footer">
                        <Button href="/jak-pomagamy">
                            Jak pomagamy <ArrowRight size={16} />
                        </Button>
                    </div>
                </Container>
            </section>

            {/* 📞 KONTAKT */}
            <section className="section">
                <Container>
                    <div className="section__header">
                        <Heading level="md">Skontaktuj się z nami</Heading>
                    </div>

                    <div className="grid-3 section__content about-contact">

                        <div className="card-base contact-card">
                            <div className="contact-icon"><Mail /></div>
                            <p>kocia.oaza@gmail.com</p>
                        </div>

                        <div className="card-base contact-card">
                            <div className="contact-icon"><Phone /></div>
                            <p>515 621 000</p>
                        </div>

                        <div className="card-base contact-card">
                            <div className="contact-icon"><MapPin /></div>
                            <p>Warszawa</p>
                        </div>

                    </div>
                </Container>
            </section>

            {/* 📝 DISCLAIMER */}
            <section className="section section--sm">
                <Container>
                    <p className="text text-sm" style={{ textAlign: "center", opacity: 0.6 }}>
                        Strona ma charakter informacyjny i wspiera działania na rzecz zwierząt.
                    </p>
                </Container>
            </section>

        </main>
    );
}