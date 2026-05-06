import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import "@/app/style/dolacz-do-nas.css";

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
} from "lucide-react";

export default function JoinUsPage() {
    return (
        <main className="join-page">

            {/* 🔥 HEADER */}
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

            {/* ❤️ INTRO */}
            <section className="section">
                <Container>

                    <div className="join-intro card-base">

                        <Heading level="md">
                            Każda pomoc ma znaczenie
                        </Heading>

                        <div className="join-intro__content text">
                            <p>
                                Kocia Oaza działa dzięki ludziom, którzy poświęcają
                                swój czas, energię i serce, aby pomagać bezdomnym kotom.
                            </p>

                            <p>
                                Nie musisz mieć doświadczenia ani ogromnej ilości czasu.
                                Nawet niewielkie wsparcie może realnie pomóc zwierzętom.
                            </p>
                        </div>

                    </div>

                </Container>
            </section>

            {/* 🐾 HOW HELP */}
            <section className="section">
                <Container>

                    <div className="section__header">
                        <Heading level="md">
                            Jak możesz pomóc?
                        </Heading>
                    </div>

                    <div className="grid-3 section__content join-grid">

                        <div className="card-base join-card variant--primary">
                            <div className="join-card__icon">
                                <Home />
                            </div>

                            <h3>Dom tymczasowy</h3>

                            <p>
                                Zapewnij kotu bezpieczne miejsce do czasu adopcji.
                            </p>
                        </div>

                        <div className="card-base join-card variant--secondary">
                            <div className="join-card__icon">
                                <Car />
                            </div>

                            <h3>Transport</h3>

                            <p>
                                Pomóż w przewozie kotów do weterynarza lub domu.
                            </p>
                        </div>

                        <div className="card-base join-card variant--tertiary">
                            <div className="join-card__icon">
                                <Megaphone />
                            </div>

                            <h3>Social media</h3>

                            <p>
                                Pomagaj nam docierać do nowych domów i darczyńców.
                            </p>
                        </div>

                        <div className="card-base join-card variant--primary">
                            <div className="join-card__icon">
                                <Heart />
                            </div>

                            <h3>Pomoc przy adopcjach</h3>

                            <p>
                                Wspieraj kontakt z osobami zainteresowanymi adopcją.
                            </p>
                        </div>

                        <div className="card-base join-card variant--secondary">
                            <div className="join-card__icon">
                                <HandHeart />
                            </div>

                            <h3>Zbiórki i akcje</h3>

                            <p>
                                Pomóż organizować wydarzenia i zbiórki dla kotów.
                            </p>
                        </div>

                        <div className="card-base join-card variant--tertiary">
                            <div className="join-card__icon">
                                <Users />
                            </div>

                            <h3>Wsparcie organizacyjne</h3>

                            <p>
                                Pomagaj nam rozwijać działania Kociej Oazy.
                            </p>
                        </div>

                    </div>

                </Container>
            </section>

            {/* ✨ TEXT BLOCK */}
            <section className="section section--alt">
                <Container>

                    <div className="join-highlight card-base">

                        <Heading level="md">
                            Nie musisz robić wszystkiego
                        </Heading>

                        <p className="text">
                            Szukamy osób, które chcą pomagać na miarę swoich możliwości.
                            Jedni pomagają codziennie, inni raz na jakiś czas.
                            Każda forma wsparcia ma ogromne znaczenie.
                        </p>

                    </div>

                </Container>
            </section>

            {/* 📍 LOCATION */}
            <section className="section">
                <Container>

                    <div className="grid-2 join-location">

                        <div className="card-base variant--primary join-location__card">
                            <div className="join-location__icon">
                                <MapPin />
                            </div>

                            <div>
                                <h3>Działamy głównie w Warszawie</h3>

                                <p>
                                    Najwięcej działań prowadzimy na terenie Warszawy
                                    i okolic.
                                </p>
                            </div>
                        </div>

                        <div className="card-base variant--secondary join-location__card">
                            <div className="join-location__icon">
                                <Users />
                            </div>

                            <div>
                                <h3>Możliwa pomoc zdalna</h3>

                                <p>
                                    Część działań, np. social media lub promocja adopcji,
                                    może odbywać się zdalnie.
                                </p>
                            </div>
                        </div>

                    </div>

                </Container>
            </section>

            {/* 📩 CTA */}
            <section className="section section--sm">
                <Container>

                    <div className="join-cta card-base">

                        <Heading level="md">
                            Chcesz pomóc?
                        </Heading>

                        <p className="text">
                            Napisz do nas i opowiedz, w jaki sposób chciałbyś się zaangażować.
                        </p>

                        <div className="join-cta__actions">

                            <Button href="mailto:kocia.oaza@gmail.com">
                                <Mail size={16} />
                                Napisz maila
                            </Button>

                            <Button
                                href="https://www.instagram.com/kociaoaza/"
                                mode="outline"
                                target="_blank"
                            >
                                Instagram <ArrowRight size={16} />
                            </Button>

                        </div>

                    </div>

                </Container>
            </section>

        </main>
    );
}
