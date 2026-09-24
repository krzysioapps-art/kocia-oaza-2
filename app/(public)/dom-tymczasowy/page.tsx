import type { Metadata } from "next";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import "./dom-tymczasowy.css";

import {
    Home,
    PawPrint,
    Heart,
    ShieldCheck,
    MessageCircle,
    ArrowRight,
    Check,
    AlertCircle,
    Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Dom tymczasowy dla kota | Kocia Oaza",
    description:
        "Dowiedz się jak zostać domem tymczasowym dla kota. Pomóż kotom dojść do siebie i przygotować się do adopcji.",
    alternates: {
        canonical: "https://kocia-oaza.pl/dom-tymczasowy",
    },
    openGraph: {
        title: "Dom tymczasowy dla kota | Kocia Oaza",
        description:
            "Zostań domem tymczasowym i pomóż kotom w drodze do nowego domu.",
        url: "https://kocia-oaza.pl/dom-tymczasowy",
        siteName: "Kocia Oaza",
        locale: "pl_PL",
        type: "article",
    },
};

const processSteps = [
    {
        icon: MessageCircle,
        title: "Zgłaszasz się do nas",
        text: "Opowiadasz nam o sobie i swoich warunkach.",
    },
    {
        icon: ShieldCheck,
        title: "Rozmawiamy",
        text: "Sprawdzamy warunki i wspólnie omawiamy potrzeby kota.",
    },
    {
        icon: PawPrint,
        title: "Dobieramy kota",
        text: "Szukamy kota, dla którego Twój dom będzie odpowiednim miejscem.",
    },
    {
        icon: Home,
        title: "Kot trafia do domu",
        text: "Zapewniasz mu spokojną przestrzeń i codzienną opiekę.",
    },
];

const supportItems = [
    {
        icon: Heart,
        title: "Koszty leczenia",
        text: "Pokrywamy koszty leczenia i weterynarza.",
    },
    {
        icon: PawPrint,
        title: "Karma i wsparcie",
        text: "Zapewniamy karmę oraz potrzebne wsparcie.",
    },
    {
        icon: MessageCircle,
        title: "Stały kontakt",
        text: "Jesteśmy z Tobą w kontakcie i pomagamy w razie potrzeby.",
    },
];

const roleItems = [
    {
        icon: Home,
        title: "Bezpieczne miejsce",
        text: "Zapewniasz kotu spokojną i bezpieczną przestrzeń.",
    },
    {
        icon: PawPrint,
        title: "Codzienna opieka",
        text: "Obserwujesz kota i dbasz o jego codzienne potrzeby.",
    },
    {
        icon: Heart,
        title: "Cierpliwość",
        text: "Dajesz mu czas, spokój i zaangażowanie.",
    },
];

const requirements = [
    {
        icon: Home,
        text: "Mieszkanie niewychodzące",
    },
    {
        icon: ShieldCheck,
        text: "Zabezpieczone okna i balkon",
    },
    {
        icon: PawPrint,
        text: "Zabezpieczenia okien uchylnych",
    },
    {
        icon: Heart,
        text: "Inne zwierzęta — możliwe, zależnie od kota",
    },
];

const rules = [
    "Kot pozostaje pod naszą opieką formalną",
    "Nie można przekazać kota innej osobie",
    "Adopcje prowadzimy wyłącznie przez nas",
    "Możesz polecić dom — ale kontakt przez nas",
];

export default function TemporaryHomePage() {
    return (
        <main className="temporary-home-page">

            {/* HEADER */}
            <section className="page-header-neutral">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">
                            Zostań domem tymczasowym
                        </Heading>

                        <p className="text">
                            Pomóż kotu dojść do siebie i przygotować się
                            do adopcji.
                        </p>

                        <p className="text">
                            <strong>
                                Nie musisz mieć doświadczenia — najważniejsze
                                jest zaangażowanie i odpowiedzialność.
                            </strong>
                        </p>
                    </div>
                </Container>
            </section>

            {/* INTRO */}
            <section className="section temporary-intro">
                <Container>
                    <div className="temporary-intro__inner">
                        <span className="temporary-eyebrow">
                            Dom tymczasowy
                        </span>

                        <Heading level="md">
                            Czasem wystarczy bezpieczny dom, żeby wszystko
                            zaczęło się zmieniać.
                        </Heading>

                        <div className="temporary-intro__text">
                            <p className="text">
                                Kot trafia do domu tymczasowego po leczeniu,
                                kastracji/sterylizacji i wstępnej obserwacji.
                                Wiemy już wtedy, jaki ma charakter i czego
                                potrzebuje.
                            </p>

                            <p className="text">
                                W domu tymczasowym kot uczy się życia
                                w warunkach domowych, odpoczywa i przygotowuje
                                do adopcji.
                            </p>

                            <p className="text">
                                Niektóre koty, ze względu na zdrowie lub
                                zachowanie, zostają pod naszą stałą opieką —
                                wtedy możliwa jest adopcja wirtualna.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* PROCESS */}
            <section className="section section--alt temporary-process">
                <Container>
                    <div className="temporary-section-header">
                        <span className="temporary-eyebrow">
                            01 — Jak to wygląda?
                        </span>

                        <Heading level="md">
                            Prosty proces, wspólna decyzja
                        </Heading>
                    </div>

                    <div className="temporary-process__steps">
                        {processSteps.map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    className="temporary-process__step"
                                    key={step.title}
                                >
                                    <div className="temporary-process__number">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <div className="temporary-icon">
                                        <Icon size={22} strokeWidth={1.8} />
                                    </div>

                                    <h3>{step.title}</h3>

                                    <p>{step.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* SUPPORT */}
            <section className="section temporary-support">
                <Container>
                    <div className="temporary-section-header">
                        <span className="temporary-eyebrow">
                            02 — Nie jesteś z tym sam
                        </span>

                        <Heading level="md">
                            Zapewniamy Ci wsparcie
                        </Heading>
                    </div>

                    <div className="temporary-support__grid">
                        {supportItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    className="temporary-feature"
                                    key={item.title}
                                >
                                    <div className="temporary-feature__icon temporary-feature__icon--primary">
                                        <Icon size={21} strokeWidth={1.8} />
                                    </div>

                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            );
                        })}
                    </div>

                    <p className="temporary-note">
                        Jeśli chcesz dodatkowo wspierać kota finansowo —
                        możesz to robić, ale nie jest to wymagane.
                    </p>
                </Container>
            </section>

            {/* ROLE */}
            <section className="section section--alt temporary-role">
                <Container>
                    <div className="temporary-split">
                        <div className="temporary-split__intro">
                            <span className="temporary-eyebrow">
                                03 — Twoja rola
                            </span>

                            <Heading level="md">
                                Ty dajesz kotu dom. My pomagamy Ci go zapewnić.
                            </Heading>

                            <p className="text">
                                Najważniejsze jest stworzenie kotu spokojnego
                                miejsca, w którym będzie mógł bezpiecznie
                                dojść do siebie.
                            </p>
                        </div>

                        <div className="temporary-list">
                            {roleItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        className="temporary-list__item"
                                        key={item.title}
                                    >
                                        <div className="temporary-list__icon">
                                            <Icon size={19} strokeWidth={1.8} />
                                        </div>

                                        <div>
                                            <h3>{item.title}</h3>
                                            <p>{item.text}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Container>
            </section>

            {/* REQUIREMENTS */}
            <section className="section temporary-requirements">
                <Container>
                    <div className="temporary-split">
                        <div className="temporary-split__intro">
                            <span className="temporary-eyebrow">
                                04 — Wymagania
                            </span>

                            <Heading level="md">
                                Bezpieczeństwo kota jest najważniejsze.
                            </Heading>

                            <p className="text">
                                Zależy nam na warunkach, w których kot będzie
                                mógł spokojnie i bezpiecznie funkcjonować.
                            </p>
                        </div>

                        <div className="temporary-checklist">
                            {requirements.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        className="temporary-check"
                                        key={item.text}
                                    >
                                        <div className="temporary-check__icon">
                                            <Icon
                                                size={18}
                                                strokeWidth={1.8}
                                            />
                                        </div>

                                        <span>{item.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Container>
            </section>

            {/* RULES */}
            <section className="section section--alt temporary-rules">
                <Container>
                    <div className="temporary-split">
                        <div className="temporary-split__intro">
                            <span className="temporary-eyebrow">
                                05 — Ważne zasady
                            </span>

                            <Heading level="md">
                                Kilka rzeczy, które warto wiedzieć
                            </Heading>
                        </div>

                        <div className="temporary-checklist temporary-checklist--rules">
                            {rules.map((rule) => (
                                <div
                                    className="temporary-check"
                                    key={rule}
                                >
                                    <div className="temporary-check__icon">
                                        <Check
                                            size={18}
                                            strokeWidth={2}
                                        />
                                    </div>

                                    <span>{rule}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* REAL TALK */}
            <section className="section temporary-reality">
                <Container>
                    <div className="temporary-reality__inner">
                        <div className="temporary-reality__icon">
                            <AlertCircle size={24} strokeWidth={1.7} />
                        </div>

                        <span className="temporary-eyebrow">
                            06 — To nie zawsze jest łatwe
                        </span>

                        <Heading level="md">
                            Każdy kot potrzebuje czegoś innego.
                        </Heading>

                        <div className="temporary-reality__text">
                            <p className="text">
                                Koty mają różne charaktery — niektóre są
                                nieśmiałe, inne wymagające i potrzebują
                                więcej czasu.
                            </p>

                            <p className="text">
                                Czasem potrzeba cierpliwości, spokoju
                                i zrozumienia, zanim kot poczuje się
                                bezpiecznie.
                            </p>
                        </div>

                        <p className="temporary-reality__strong">
                            Dom tymczasowy to odpowiedzialność —
                            ale też ogromna satysfakcja.
                        </p>
                    </div>
                </Container>
            </section>

            {/* WHY */}
            <section className="section section--alt temporary-impact">
                <Container>
                    <div className="temporary-section-header">
                        <span className="temporary-eyebrow">
                            07 — Dlaczego to ma znaczenie?
                        </span>

                        <Heading level="md">
                            Twój dom może być czyimś początkiem.
                        </Heading>
                    </div>

                    <div className="temporary-impact__grid">
                        <div className="temporary-impact__item temporary-impact__item--primary">
                            <Sparkles size={22} />
                            <p>
                                Każdy dom tymczasowy to szansa na uratowanie
                                kolejnego kota.
                            </p>
                        </div>

                        <div className="temporary-impact__item temporary-impact__item--secondary">
                            <PawPrint size={22} />
                            <p>
                                Bez domów tymczasowych nie jesteśmy w stanie
                                pomagać na taką skalę.
                            </p>
                        </div>

                        <div className="temporary-impact__item temporary-impact__item--tertiary">
                            <Heart size={22} />
                            <p>
                                <strong>
                                    To dzięki Tobie koty dostają drugą szansę.
                                </strong>
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="section section--green temporary-final">
                <Container>
                    <div className="temporary-final__inner">
                        <span className="temporary-eyebrow">
                            08 — Zróbmy to razem
                        </span>

                        <Heading level="md">
                            Chcesz pomóc?
                        </Heading>

                        <p className="text">
                            Odezwij się do nas — wspólnie znajdziemy rozwiązanie.
                        </p>

                        <Button href="/zgloszenie?type=temporary">
                            Zgłoś się jako dom tymczasowy
                            <ArrowRight size={16} />
                        </Button>
                    </div>
                </Container>
            </section>

        </main>
    );
}