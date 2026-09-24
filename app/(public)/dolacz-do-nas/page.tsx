import type { Metadata } from "next";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import "./dolacz-do-nas.css";

import {
    Heart,
    Home,
    Car,
    Megaphone,
    HandHeart,
    Users,
    ArrowRight,
    Mail,
    MapPin,
    PawPrint,
    Eye,
    ShieldCheck,
    Soup,
    BrushCleaning,
    Check,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Dołącz do nas | Wolontariat w Kociej Oazie",
    description:
        "Pomóż bezdomnym kotom razem z Kocią Oazą. Wolontariat, dom tymczasowy, transport, social media i pomoc przy adopcjach.",
    alternates: {
        canonical: "https://kocia-oaza.pl/dolacz-do-nas",
    },
    openGraph: {
        title: "Dołącz do nas | Kocia Oaza",
        description:
            "Dołącz do wolontariuszy Kociej Oazy i pomagaj kotom znaleźć bezpieczne domy.",
        url: "https://kocia-oaza.pl/dolacz-do-nas",
        siteName: "Kocia Oaza",
        locale: "pl_PL",
        type: "website",
    },
};

const helpOptions = [
    {
        icon: Home,
        title: "Dom tymczasowy",
        text: "Zapewnij kotu bezpieczne miejsce do czasu adopcji.",
    },
    {
        icon: Car,
        title: "Transport",
        text: "Pomóż w przewozie kotów do weterynarza lub domu.",
    },
    {
        icon: Megaphone,
        title: "Social media",
        text: "Pomagaj nam docierać do nowych domów i darczyńców.",
    },
    {
        icon: Heart,
        title: "Pomoc przy adopcjach",
        text: "Wspieraj kontakt z osobami zainteresowanymi adopcją.",
    },
    {
        icon: HandHeart,
        title: "Zbiórki i akcje",
        text: "Pomóż organizować wydarzenia i zbiórki dla kotów.",
    },
    {
        icon: Users,
        title: "Wsparcie organizacyjne",
        text: "Pomagaj nam rozwijać działania Kociej Oazy.",
    },
];

const dutyItems = [
    {
        icon: Soup,
        text: "Dawanie jedzenia i świeżej wody",
    },
    {
        icon: BrushCleaning,
        text: "Sprzątanie kuwet i porządki",
    },
    {
        icon: PawPrint,
        text: "Zabawa i socjalizacja kotów",
    },
    {
        icon: Heart,
        text: "Mizianie i głaskanie",
    },
    {
        icon: Eye,
        text: "Obserwacja samopoczucia kotów",
    },
];

export default function JoinUsPage() {
    return (
        <main className="join-page">

            {/* HEADER */}
            <section className="page-header-neutral">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">
                            Dołącz do nas
                        </Heading>

                        <p className="text">
                            Pomagaj razem z nami ratować koty i tworzyć dla nich
                            bezpieczne miejsce.
                        </p>
                    </div>
                </Container>
            </section>

            {/* INTRO */}
            <section className="section join-intro">
                <Container>
                    <div className="join-intro__inner">
                        <span className="join-eyebrow">
                            Wolontariat
                        </span>

                        <Heading level="md">
                            Każda pomoc ma znaczenie
                        </Heading>

                        <div className="join-intro__content">
                            <p className="text">
                                Kocia Oaza działa dzięki ludziom, którzy
                                poświęcają swój czas, energię i serce,
                                aby pomagać bezdomnym kotom.
                            </p>

                            <p className="text">
                                Nie musisz mieć doświadczenia ani ogromnej
                                ilości czasu. Nawet niewielkie wsparcie może
                                realnie pomóc zwierzętom.
                            </p>
                        </div>
                    </div>
                </Container>
            </section>

            {/* HOW TO HELP */}
            <section className="section section--alt join-help">
                <Container>
                    <div className="join-section-header">
                        <span className="join-eyebrow">
                            01 — Możliwości
                        </span>

                        <Heading level="md">
                            Jak możesz pomóc?
                        </Heading>
                    </div>

                    <div className="join-help__grid">
                        {helpOptions.map((option, index) => {
                            const Icon = option.icon;

                            return (
                                <article
                                    className="join-help__item"
                                    key={option.title}
                                >
                                    <div className="join-help__number">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <div className="join-help__icon">
                                        <Icon size={21} strokeWidth={1.8} />
                                    </div>

                                    <div>
                                        <h3>{option.title}</h3>
                                        <p>{option.text}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* DUTIES */}
            <section className="section join-duty">
                <Container>
                    <div className="join-section-header">
                        <span className="join-eyebrow">
                            02 — Codzienna pomoc
                        </span>

                        <Heading level="md">
                            Jak wyglądają dyżury?
                        </Heading>

                        <p className="text">
                            To codzienna opieka nad kotami i ogromna część
                            naszej pomocy.
                        </p>
                    </div>

                    <div className="join-duty__layout">

                        <div className="join-duty__tasks">
                            <div className="join-duty__heading">
                                <h3>Co robi się na dyżurze?</h3>
                            </div>

                            <div className="join-duty__list">
                                {dutyItems.map((item) => {
                                    const Icon = item.icon;

                                    return (
                                        <div
                                            className="join-duty__item"
                                            key={item.text}
                                        >
                                            <span className="join-duty__icon">
                                                <Icon
                                                    size={18}
                                                    strokeWidth={1.8}
                                                />
                                            </span>

                                            <span>{item.text}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="join-duty__info">
                            <span className="join-duty__eyebrow">
                                Czas
                            </span>

                            <div className="join-duty__time">
                                1,5–2 godziny
                            </div>

                            <p>
                                Nie musisz być codziennie — pomagamy
                                dopasować grafik do możliwości wolontariuszy.
                            </p>

                            <div className="join-duty__note">
                                <ShieldCheck size={18} />

                                <span>
                                    Nie musisz mieć doświadczenia medycznego —
                                    podawaniem leków zajmują się osoby, które
                                    mają odpowiednie doświadczenie i zalecenia.
                                </span>
                            </div>
                        </div>

                    </div>
                </Container>
            </section>

            {/* FLEXIBILITY */}
            <section className="section section--alt join-flexibility">
                <Container>
                    <div className="join-flexibility__inner">
                        <span className="join-eyebrow">
                            03 — Na miarę możliwości
                        </span>

                        <Heading level="md">
                            Nie musisz robić wszystkiego
                        </Heading>

                        <p className="text">
                            Szukamy osób, które chcą pomagać na miarę swoich
                            możliwości. Jedni pomagają codziennie, inni raz
                            na jakiś czas. Każda forma wsparcia ma ogromne
                            znaczenie.
                        </p>
                    </div>
                </Container>
            </section>

            {/* LOCATION */}
            <section className="section join-location">
                <Container>
                    <div className="join-section-header">
                        <span className="join-eyebrow">
                            04 — Gdzie działamy?
                        </span>

                        <Heading level="md">
                            Pomoc na miejscu i zdalnie
                        </Heading>
                    </div>

                    <div className="join-location__grid">

                        <div className="join-location__item">
                            <div className="join-location__icon">
                                <MapPin size={21} strokeWidth={1.8} />
                            </div>

                            <div>
                                <h3>Działamy głównie w Warszawie</h3>

                                <p>
                                    Najwięcej działań prowadzimy na terenie
                                    Warszawy i okolic.
                                </p>
                            </div>
                        </div>

                        <div className="join-location__item">
                            <div className="join-location__icon">
                                <Users size={21} strokeWidth={1.8} />
                            </div>

                            <div>
                                <h3>Możliwa pomoc zdalna</h3>

                                <p>
                                    Część działań, np. social media lub
                                    promocja adopcji, może odbywać się zdalnie.
                                </p>
                            </div>
                        </div>

                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="section section--green join-final">
                <Container>
                    <div className="join-final__inner">
                        <span className="join-eyebrow">
                            05 — Dołącz
                        </span>

                        <Heading level="md">
                            Chcesz pomóc?
                        </Heading>

                        <p className="text">
                            Napisz do nas i opowiedz, w jaki sposób chciałbyś
                            się zaangażować.
                        </p>

                        <div className="join-final__actions">
                            <Button href="mailto:kocia.oaza@gmail.com">
                                <Mail size={16} />
                                Napisz maila
                            </Button>

                            <Button
                                href="https://www.instagram.com/kociaoaza/"
                                mode="outline"
                                target="_blank"
                            >
                                Instagram
                                <ArrowRight size={16} />
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

        </main>
    );
}