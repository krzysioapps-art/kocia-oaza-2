import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

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

import "@/app/style/porady.css";

export default function AdvicePage() {
    return (
        <main>

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

            {/* CONTENT */}
            <section className="section">
                <Container>

                    <div className="advice">

                        <div className="advice-block">
                            <div className="advice-icon">
                                <Clock />
                            </div>
                            <div>
                                <h3>Zaufanie ≠ natychmiastowa miłość</h3>
                                <p>
                                    Dla kota jesteś obcą osobą. Zaufanie buduje się dniami,
                                    a czasem tygodniami.
                                </p>
                            </div>
                        </div>

                        <div className="advice-block">
                            <div className="advice-icon">
                                <Home />
                            </div>
                            <div>
                                <h3>Daj kotu przestrzeń</h3>
                                <p>
                                    Nie wyciągaj go z kryjówki. Pozwól mu obserwować i samemu
                                    zdecydować, kiedy jesteś bezpieczny.
                                </p>
                            </div>
                        </div>

                        <div className="advice-block">
                            <div className="advice-icon">
                                <Hand />
                            </div>
                            <div>
                                <h3>Pozwól kotu zrobić pierwszy krok</h3>
                                <p>
                                    Usiądź spokojnie, nie patrz intensywnie i daj mu czas.
                                    Inicjatywa powinna należeć do kota.
                                </p>
                            </div>
                        </div>

                        <div className="advice-block">
                            <div className="advice-icon">
                                <Eye />
                            </div>
                            <div>
                                <h3>Mów „kocim językiem”</h3>
                                <p>
                                    Powolne mruganie to znak zaufania. To lepsze niż próba
                                    głaskania na siłę.
                                </p>
                            </div>
                        </div>

                        <div className="advice-block">
                            <div className="advice-icon">
                                <Repeat />
                            </div>
                            <div>
                                <h3>Rutyna daje bezpieczeństwo</h3>
                                <p>
                                    Stałe pory karmienia i spokojne rytuały pomagają kotu
                                    poczuć kontrolę nad otoczeniem.
                                </p>
                            </div>
                        </div>

                    </div>

                </Container>
            </section>

            {/* NEGATIVE */}
            <section className="section section">
                <Container>

                    <div className="section__header">
                        <Heading level="md">Czego nie robić?</Heading>
                    </div>

                    <div className="advice-list advice-list--danger">

                        <div>Branie na ręce bez zgody</div>
                        <div>Gonienie kota</div>
                        <div>Hałas i chaos</div>
                        <div>„Bo musi się przyzwyczaić”</div>

                    </div>

                </Container>
            </section>

            {/* SUCCESS */}
            <section className="section">
                <Container>

                    <div className="section__header">
                        <Heading level="md">Małe sygnały = wielki sukces</Heading>
                    </div>

                    <div className="advice-list advice-list--success">

                        <div>Podejście bliżej</div>
                        <div>Spanie obok</div>
                        <div>Mruczenie</div>

                    </div>

                    <p className="advice-cta text">
                        Nie rób wszystkiego „więcej” — rób to <strong>mądrzej</strong>.
                    </p>

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