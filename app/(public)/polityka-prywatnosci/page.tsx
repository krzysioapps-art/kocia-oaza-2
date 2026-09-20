import type { Metadata } from "next";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";

import "@/app/style/privacy-policy.css";

import {
    Info,
    ShieldCheck,
    Database,
    Target,
    Gavel,
    Clock3,
    Users,
    UserCheck,
    Cookie,
    Lock,
    RefreshCw,
    Mail,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Polityka prywatności | Kocia Oaza",
    description:
        "Informacje dotyczące przetwarzania danych osobowych, formularzy adopcyjnych oraz polityki prywatności serwisu Kocia Oaza.",
    alternates: {
        canonical: "https://kocia-oaza.pl/polityka-prywatnosci",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function PrivacyPolicyPage() {
    return (
        <main className="privacy-page">

            {/* 🔥 HEADER */}
            <section className="page-header-neutral">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">Polityka prywatności</Heading>
                        <p className="text">
                            Ochrona Twoich danych osobowych
                        </p>
                    </div>
                </Container>
            </section>

            {/* 📄 CONTENT */}
            <section className="section">
                <Container>

                    <div className="privacy-layout">

                        {/* 1 */}
                        <div className="card-base privacy-card">
                            <div className="privacy-card__header">
                                <div className="privacy-icon"><Info /></div>
                                <h2>1. Informacje ogólne</h2>
                            </div>

                            <p>
                                Strona „Kocia Oaza” służy prezentacji kotów do adopcji
                                oraz umożliwia kontakt i przesyłanie zgłoszeń adopcyjnych.
                            </p>
                        </div>

                        {/* 2 */}
                        <div className="card-base privacy-card">
                            <div className="privacy-card__header">
                                <div className="privacy-icon"><ShieldCheck /></div>
                                <h2>2. Administrator danych</h2>
                            </div>

                            <p>
                                Administratorem danych osobowych jest:
                            </p>

                            <div className="privacy-highlight">
                                <strong>Malwina Gryczan</strong>
                                <span>
                                    (inicjatywa „Stowarzyszenie Kocia Oaza Koci Raj”)
                                </span>

                                <a href="mailto:kocia.oaza@gmail.com">
                                    kocia.oaza@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* 3 */}
                        <div className="card-base privacy-card">
                            <div className="privacy-card__header">
                                <div className="privacy-icon"><Database /></div>
                                <h2>3. Zakres zbieranych danych</h2>
                            </div>

                            <p>
                                W ramach formularza adopcyjnego mogą być zbierane:
                            </p>

                            <ul>
                                <li>imię i nazwisko</li>
                                <li>adres e-mail</li>
                                <li>numer telefonu</li>
                                <li>informacje o warunkach mieszkaniowych</li>
                                <li>informacje dotyczące doświadczenia z kotami</li>
                            </ul>

                            <p>
                                Podanie danych jest dobrowolne, ale niezbędne
                                do przeprowadzenia procesu adopcji.
                            </p>
                        </div>

                        {/* 4 */}
                        <div className="card-base privacy-card">
                            <div className="privacy-card__header">
                                <div className="privacy-icon"><Target /></div>
                                <h2>4. Cel przetwarzania danych</h2>
                            </div>

                            <ul>
                                <li>przeprowadzenie procesu adopcji kota</li>
                                <li>kontakt z osobą zainteresowaną adopcją</li>
                            </ul>
                        </div>

                        {/* 5 */}
                        <div className="card-base privacy-card">
                            <div className="privacy-card__header">
                                <div className="privacy-icon"><Gavel /></div>
                                <h2>5. Podstawa przetwarzania danych</h2>
                            </div>

                            <p>
                                Dane osobowe są przetwarzane zgodnie z art. 6 ust. 1 RODO,
                                w zakresie niezbędnym do obsługi zgłoszenia adopcyjnego,
                                kontaktu z osobą zainteresowaną oraz przeprowadzenia procesu adopcji.
                            </p>
                        </div>

                        {/* 6 */}
                        <div className="card-base privacy-card">
                            <div className="privacy-card__header">
                                <div className="privacy-icon"><Clock3 /></div>
                                <h2>6. Okres przechowywania danych</h2>
                            </div>

                            <p>
                                Dane są przechowywane przez czas niezbędny do
                                przeprowadzenia procesu adopcji, nie dłużej niż
                                12 miesięcy od momentu ich przekazania.
                            </p>
                        </div>

                        {/* 7 */}
                        <div className="card-base privacy-card">
                            <div className="privacy-card__header">
                                <div className="privacy-icon"><Users /></div>
                                <h2>7. Odbiorcy danych</h2>
                            </div>

                            <p>
                                Dane mogą być udostępniane osobom zaangażowanym
                                w proces adopcji.
                            </p>

                            <p>
                                Dane są również przechowywane w systemie informatycznym
                                wykorzystywanym do obsługi formularza i funkcjonowania strony.
                            </p>
                        </div>

                        {/* 8 */}
                        <div className="card-base privacy-card">
                            <div className="privacy-card__header">
                                <div className="privacy-icon"><UserCheck /></div>
                                <h2>8. Prawa użytkownika</h2>
                            </div>

                            <p>Użytkownik ma prawo do:</p>

                            <ul>
                                <li>dostępu do swoich danych</li>
                                <li>ich poprawienia</li>
                                <li>usunięcia</li>
                                <li>ograniczenia przetwarzania</li>
                                <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych</li>
                            </ul>

                            <p>
                                Jeżeli przetwarzanie danych odbywa się na podstawie zgody,
                                użytkownik może wycofać ją w dowolnym momencie. Wycofanie zgody
                                nie wpływa na zgodność z prawem przetwarzania dokonanego przed
                                jej wycofaniem.
                            </p>

                            <p>
                                W zakresie cookies analitycznych użytkownik może w dowolnym momencie
                                zmienić lub wycofać zgodę poprzez „Ustawienia cookies” dostępne
                                w stopce serwisu.
                            </p>
                        </div>

                        {/* 9 */}
                        <div className="card-base privacy-card">
                            <div className="privacy-card__header">
                                <div className="privacy-icon">
                                    <Cookie />
                                </div>

                                <h2>9. Pliki cookies i narzędzia analityczne</h2>
                            </div>

                            <p>
                                Serwis wykorzystuje pliki cookies oraz inne mechanizmy
                                przechowywania informacji w przeglądarce w zakresie niezbędnym
                                do prawidłowego działania strony oraz zapamiętania wyboru
                                użytkownika dotyczącego ustawień cookies.
                            </p>

                            <p>
                                Za odrębną zgodą użytkownika serwis korzysta z Google Analytics 4
                                w celu tworzenia statystyk dotyczących korzystania z serwisu
                                i jego ulepszania. Google Analytics nie jest uruchamiane przed
                                wyrażeniem zgody na cookies analityczne.
                            </p>

                            <p>
                                Google Analytics może wykorzystywać własne pliki cookies,
                                w szczególności <code>_ga</code> oraz <code>_ga_*</code>,
                                służące między innymi do rozróżniania użytkowników i utrzymywania
                                informacji o sesji. Google wskazuje, że w ramach standardowej
                                implementacji Analytics może zbierać między innymi statystyki
                                sesji, przybliżoną lokalizację oraz informacje o przeglądarce
                                i urządzeniu.
                            </p>

                            <p>
                                Udzielenie zgody na cookies analityczne jest dobrowolne.
                                Brak zgody nie uniemożliwia korzystania z serwisu.
                            </p>

                            <p>
                                Użytkownik może w dowolnym momencie zmienić lub wycofać zgodę
                                na cookies analityczne za pomocą przycisku
                                <strong> „Ustawienia cookies”</strong> dostępnego w stopce serwisu.
                                Po wycofaniu zgody serwis przestaje wykorzystywać Google Analytics
                                do dalszego pomiaru, a dostępne po stronie serwisu cookies
                                analityczne są usuwane.
                            </p>

                            <p>
                                Szczegółowe informacje dotyczące sposobu działania Google Analytics
                                oraz wykorzystywanych przez tę usługę plików cookies są dostępne
                                w dokumentacji Google.
                            </p>
                        </div>

                        {/* 10 */}
                        <div className="card-base privacy-card">
                            <div className="privacy-card__header">
                                <div className="privacy-icon"><Lock /></div>
                                <h2>10. Zabezpieczenie danych</h2>
                            </div>

                            <p>
                                Administrator dokłada starań, aby zapewnić odpowiednie
                                środki ochrony danych osobowych.
                            </p>
                        </div>

                        {/* 11 */}
                        <div className="card-base privacy-card">
                            <div className="privacy-card__header">
                                <div className="privacy-icon"><RefreshCw /></div>
                                <h2>11. Zmiany polityki</h2>
                            </div>

                            <p>
                                Polityka prywatności może być aktualizowana
                                w przypadku zmian na stronie lub w sposobie
                                przetwarzania danych.
                            </p>
                        </div>

                    </div>

                </Container>
            </section>

            {/* 📩 CONTACT */}
            <section className="section section--sm">
                <Container>

                    <div className="card-base privacy-contact">

                        <div className="privacy-contact__icon">
                            <Mail />
                        </div>

                        <div>
                            <Heading level="md">
                                Masz pytania?
                            </Heading>

                            <p className="text">
                                W razie pytań dotyczących polityki prywatności
                                skontaktuj się z nami:
                            </p>

                            <a href="mailto:kocia.oaza@gmail.com">
                                kocia.oaza@gmail.com
                            </a>
                        </div>

                    </div>

                </Container>
            </section>

        </main>
    );
}