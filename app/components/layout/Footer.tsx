// app/components/layout/Footer.tsx

"use client";

import { useState } from "react";

import Container from "@/app/components/ui/Container";

import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function Footer() {
    const [copied, setCopied] = useState(false);

    const accountNumber = "66 2530 0008 2090 1073 2242 0001";

    const handleCopy = async () => {
        await navigator.clipboard.writeText(accountNumber);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

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
                            Pomagamy kotom znaleźć kochające domy. Każdy kotek
                            zasługuje na bezpieczne i szczęśliwe miejsce.
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
                            <a href="/polityka-prywatnosci">
                                Polityka prywatności
                            </a>
                        </div>
                    </div>

                    {/* CONTACT */}
                    <div className="footer__col">
                        <h4 className="footer__heading">Kontakt</h4>

                        <div className="footer__contact">
                            <a href="mailto:kocia.oaza@gmail.com">
                                kocia.oaza@gmail.com
                            </a>

                            <a href="tel:+48515621000">
                                515 621 000
                            </a>

                            <span>Warszawa</span>
                        </div>

                        {/* DONATIONS */}
                        <div className="footer__donations">
                            <h4 className="footer__heading">
                                Wesprzyj nas
                            </h4>

                            <div className="footer__donationBox">
                                <span className="footer__donationLabel">
                                    Nr konta:
                                </span>

                                <div className="footer__accountRow">
                                    <span className="footer__accountNumber">
                                        {accountNumber}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={handleCopy}
                                        className="footer__copyBtn"
                                        aria-label="Kopiuj numer konta"
                                    >
                                        {copied ? (
                                            <FiCheck size={16} />
                                        ) : (
                                            <FiCopy size={16} />
                                        )}
                                    </button>
                                </div>

                                <div className="footer__paypal">
                                    <span className="footer__donationLabel">
                                        PayPal:
                                    </span>

                                    <a href="mailto:kocia.oaza@gmail.com">
                                        kocia.oaza@gmail.com
                                    </a>
                                </div>

                                <a
                                    href="https://www.ratujemyzwierzaki.pl/kociaoaza"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="footer__donationLink"
                                >
                                    Wesprzyj na RatujemyZwierzaki →
                                </a>

                                <div className="footer__krs">
                                    <span className="footer__donationLabel">
                                        Podaruj nam 1,5%
                                    </span>

                                    <p>
                                        KRS 0000270261
                                    </p>

                                    <p>
                                        Cel szczegółowy:
                                        <br />
                                        Kocia Oaza Koci Raj 13231
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* SOCIAL */}
                        <div className="footer__social">
                            <a
                                href="https://www.facebook.com/Kociooaza"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <FaFacebookF size={16} />
                            </a>

                            <a
                                href="https://www.instagram.com/kociaoaza/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                            >
                                <FaInstagram size={16} />
                            </a>

                            <a
                                href="https://www.tiktok.com/@kocia.oaza"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                            >
                                <FaTiktok size={16} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* BOTTOM */}
                <div className="footer__bottom">
                    © 2026 Stowarzyszenie Kocia Oaza Koci Raj. Każdy kotek
                    zasługuje na miłość.
                </div>
            </Container>
        </footer>
    );
}