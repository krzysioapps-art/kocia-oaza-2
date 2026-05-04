"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import { NAV_ITEMS } from "@/app/data/navigation";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    const pathname = usePathname();

    // scroll state
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // body scroll lock
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    // escape key
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleToggle();
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open]);

    // toggle menu (animacja)
    const handleToggle = () => {
        if (open) {
            setOpen(false);
            setTimeout(() => setVisible(false), 250);
        } else {
            setVisible(true);
            setTimeout(() => setOpen(true), 10);
        }
    };

    return (
        <header className={`navbar ${(scrolled || open) ? "navbar--scrolled" : ""}`}>
            <Container>
                <div className="navbar__inner">
                    {/* LOGO */}
                    <Link href="/" className="navbar__logo">
                        <img
                            src="/kocia_oaza_sygnet.svg"
                            alt="Kocia Oaza logo"
                            className="navbar__logo-icon"
                        />

                        <div className="navbar__logo-text">
                            <span className="navbar__logo-main">Kocia Oaza Koci Raj</span>
                            <span className="navbar__logo-sub">Stowarzyszenie</span>
                        </div>
                    </Link>

                    {/* NAV DESKTOP */}
                    <nav className="navbar__nav">
                        {NAV_ITEMS.map((item) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`navbar__link ${isActive ? "navbar__link--active" : ""
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* ACTION */}
                    <div className="navbar__action">
                        <a
                            href="https://www.ratujemyzwierzaki.pl/en/kociaoaza"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button mode="outline">
                                Wesprzyj nas
                            </Button>
                        </a>
                    </div>

                    {/* HAMBURGER */}
                    <button
                        type="button"
                        aria-label="Menu"
                        className={`navbar__toggle ${open ? "is-open" : ""}`}
                        onClick={handleToggle}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

                {/* MOBILE MENU */}
                {visible && (
                    <div
                        className={`navbar__mobile ${open ? "is-open" : "is-closing"
                            }`}
                    >
                        {NAV_ITEMS.map((item) => {
                            const isActive =
                                item.href === "/"
                                    ? pathname === "/"
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={handleToggle}
                                    className={`navbar__link ${isActive ? "navbar__link--active" : ""
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </Container>
        </header>
    );
}