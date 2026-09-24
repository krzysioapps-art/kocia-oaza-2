import type { Metadata } from "next";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import "./porady.css";

import {
    Clock,
    Home,
    Hand,
    Eye,
    Repeat,
    X,
    Star,
    ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Jak zdobyć zaufanie kota? | Kocia Oaza",
    description:
        "Sprawdź jak budować relację z kotem po adopcji. Poznaj sposoby na zdobycie zaufania kota i najczęstsze błędy opiekunów.",
    alternates: {
        canonical: "https://kocia-oaza.pl/porady",
    },
    openGraph: {
        title: "Jak zdobyć zaufanie kota? | Kocia Oaza",
        description:
            "Dowiedz się jak oswoić kota, budować zaufanie i uniknąć najczęstszych błędów po adopcji.",
        url: "https://kocia-oaza.pl/porady",
        siteName: "Kocia Oaza",
        locale: "pl_PL",
        type: "article",
    },
};

const adviceItems = [
    {
        icon: Clock,
        title: "Zaufanie ≠ natychmiastowa miłość",
        text: "Dla kota jesteś obcą osobą. Zaufanie buduje się dniami, a czasem tygodniami.",
    },
    {
        icon: Home,
        title: "Daj kotu przestrzeń",
        text: "Nie wyciągaj go z kryjówki. Pozwól mu obserwować i samemu zdecydować, kiedy jesteś bezpieczny.",
    },
    {
        icon: Hand,
        title: "Pozwól kotu zrobić pierwszy krok",
        text: "Usiądź spokojnie, nie patrz intensywnie i daj mu czas. Inicjatywa powinna należeć do kota.",
    },
    {
        icon: Eye,
        title: "Mów „kocim językiem”",
        text: "Powolne mruganie to znak zaufania. To lepsze niż próba głaskania na siłę.",
    },
    {
        icon: Repeat,
        title: "Rutyna daje bezpieczeństwo",
        text: "Stałe pory karmienia i spokojne rytuały pomagają kotu poczuć kontrolę nad otoczeniem.",
    },
];

const thingsToAvoid = [
    "Branie na ręce bez zgody",
    "Gonienie kota",
    "Hałas i chaos",
    "„Bo musi się przyzwyczaić”",
];

const successSignals = [
    "Podejście bliżej",
    "Spanie obok",
    "Mruczenie",
];

export default function AdvicePage() {
    return (
        <main className="advice-page">

            {/* HEADER */}
            <section className="page-header-neutral">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">
                            Jak zdobyć zaufanie kota
                        </Heading>

                        <p className="text">
                            Lista rzeczy, o których warto pamiętać
                        </p>
                    </div>
                </Container>
            </section>

            {/* INTRO */}
            <section className="section advice-intro">
                <Container>
                    <div className="advice-intro__inner">
                        <span className="advice-intro__eyebrow">
                            Pierwsze dni
                        </span>

                        <Heading level="md">
                            Daj mu czas. Zaufanie przychodzi małymi krokami.
                        </Heading>

                        <p className="text">
                            Nowy dom to dla kota duża zmiana. Najważniejsze jest
                            spokojne tempo i pozwolenie mu na samodzielne
                            poznawanie nowego otoczenia.
                        </p>
                    </div>
                </Container>
            </section>

            {/* ADVICE */}
            <section className="section section--alt advice-main">
                <Container>
                    <div className="advice-main__header">
                        <span className="advice-section__eyebrow">
                            01 — Budowanie relacji
                        </span>

                        <Heading level="md">
                            Co pomaga zdobyć zaufanie?
                        </Heading>
                    </div>

                    <div className="advice-items">
                        {adviceItems.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <article
                                    className="advice-item"
                                    key={item.title}
                                >
                                    <div className="advice-item__number">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <div className="advice-item__icon">
                                        <Icon size={21} strokeWidth={1.8} />
                                    </div>

                                    <div className="advice-item__content">
                                        <h3>{item.title}</h3>
                                        <p>{item.text}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* DON'T */}
            <section className="section advice-negative">
                <Container>
                    <div className="advice-split">
                        <div className="advice-split__intro">
                            <span className="advice-section__eyebrow">
                                02 — Czego unikać
                            </span>

                            <Heading level="md">
                                Nie przyspieszaj na siłę.
                            </Heading>

                            <p className="text">
                                Niektóre zachowania mogą sprawić, że kot
                                zacznie wycofywać się zamiast budować relację.
                            </p>
                        </div>

                        <div className="advice-points advice-points--negative">
                            {thingsToAvoid.map((item) => (
                                <div
                                    className="advice-point"
                                    key={item}
                                >
                                    <span className="advice-point__icon">
                                        <X size={17} />
                                    </span>

                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* SUCCESS */}
            <section className="section section--alt advice-success">
                <Container>
                    <div className="advice-split advice-split--success">
                        <div className="advice-split__intro">
                            <span className="advice-section__eyebrow">
                                03 — Małe sygnały
                            </span>

                            <Heading level="md">
                                Małe sygnały = wielki sukces
                            </Heading>

                            <p className="text">
                                Zaufanie nie zawsze wygląda spektakularnie.
                                Czasem wystarczy drobna zmiana zachowania.
                            </p>
                        </div>

                        <div className="advice-points advice-points--success">
                            {successSignals.map((item) => (
                                <div
                                    className="advice-point"
                                    key={item}
                                >
                                    <span className="advice-point__icon">
                                        <Star size={17} />
                                    </span>

                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="advice-quote">
                        Nie rób wszystkiego „więcej” — rób to{" "}
                        <strong>mądrzej</strong>.
                    </p>
                </Container>
            </section>

            {/* CTA */}
            <section className="section section--green advice-cta">
                <Container>
                    <div className="advice-cta__inner">
                        <span className="advice-section__eyebrow">
                            04 — Następny krok
                        </span>

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