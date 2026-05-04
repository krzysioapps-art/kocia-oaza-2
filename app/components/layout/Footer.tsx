// app/components/layout/Footer.tsx

import Container from "@/app/components/ui/Container";
import "@/app/style/layout/footer.css";

import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="footer">
            <Container>
                <div className="footer__grid">
                    {/* INFO */}
                    <div className="footer__col">
                        <h3 className="footer__logo">
                            Stowarzyszenie Kocia Oaza Koci Raj
                        </h3>

                        <p className="footer__text">
                            Pomagamy kotom znaleźć kochające domy. Każdy kotek zasługuje na
                            bezpieczne i szczęśliwe miejsce.
                        </p>
                    </div>

                    {/* LINKS */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Linki</h4>

                        <div className="footer__links">
                            <a href="/">Witaj</a>
                            <a href="/o-nas">O nas</a>
                            <a href="/jak-pomagamy">Jak pomagamy</a>
                            <a href="/aktualnosci">Aktualności</a>
                            <a href="/koty">Koty</a>
                            <a href="/jak-adoptowac">Jak adoptować</a>
                            <a href="/porady">Porady</a>
                            <a href="/polityka-prywatnosci">Polityka prywatności</a>
                        </div>
                    </div>

                    {/* CONTACT */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Kontakt</h4>

                        <div className="footer__contact">
                            <a href="mailto:kocia.oaza@gmail.com">
                                kocia.oaza@gmail.com
                            </a>
                            <a href="tel:+48515621000">515 621 000</a>
                            <span>Warszawa</span>
                        </div>

                        {/* SOCIAL */}
                        <div className="footer__social">
                            <a href="#"><FaFacebookF size={16} /></a>
                            <a href="#"><FaInstagram size={16} /></a>
                            <a href="#"><FaTiktok size={16} /></a>
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="footer__bottom">
                    © 2026 Stowarzyszenie Kocia Oaza Koci Raj. Każdy kotek zasługuje na miłość.
                </div>
            </Container>
        </footer>
    );
}