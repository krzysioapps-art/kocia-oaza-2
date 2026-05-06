"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import { NAV_ITEMS } from "@/app/data/navigation";

import { ChevronDown } from "lucide-react";

const HELP_ITEMS = [
    {
        label: "Wesprzyj nas",
        href: "https://www.ratujemyzwierzaki.pl/en/kociaoaza",
        external: true,
    },
    {
        label: "Dom tymczasowy",
        href: "/dom-tymczasowy",
    },
    {
        label: "Wolontariat",
        href: "/dolacz-do-nas",
    },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);

    const [helpOpen, setHelpOpen] = useState(false);

    const helpRef = useRef<HTMLDivElement>(null);

    const pathname = usePathname();

    const wrapperRef = useRef<HTMLElement>(null);

    /* =========================
       SCROLL
    ========================= */

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /* =========================
       BODY LOCK
    ========================= */

    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    /* =========================
       ESC
    ========================= */

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleToggle();
                setHelpOpen(false);
            }
        };

        window.addEventListener("keydown", handleKey);

        return () => window.removeEventListener("keydown", handleKey);
    }, [open]);

    /* =========================
       OUTSIDE CLICK
    ========================= */

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                helpRef.current &&
                !helpRef.current.contains(e.target as Node)
            ) {
                setHelpOpen(false);
            }
        };

        window.addEventListener("mousedown", handleClickOutside);

        return () =>
            window.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {

        const updateHeaderHeight = () => {

            if (!wrapperRef.current) return;

            const height =
                wrapperRef.current.offsetHeight;

            document.documentElement.style.setProperty(
                "--header-height",
                `${height}px`
            );
        };

        updateHeaderHeight();

        window.addEventListener("resize", updateHeaderHeight);

        return () => {
            window.removeEventListener(
                "resize",
                updateHeaderHeight
            );
        };

    }, []);

    /* =========================
       MOBILE MENU
    ========================= */

    const handleToggle = () => {
        if (open) {
            setOpen(false);

            setTimeout(() => {
                setVisible(false);
            }, 250);
        } else {
            setVisible(true);

            setTimeout(() => {
                setOpen(true);
            }, 10);
        }
    };

    return (
        <header
            ref={wrapperRef}
            className="navbar-wrapper"
        >
            {/* TOPBAR */}
            <div className="topbar">
                <Container>

                    <div className="topbar__inner">

                        <Link
                            href="/dolacz-do-nas"
                            className="topbar__content"
                        >
                            <span>🐾</span>

                            <p>
                                Szukamy wolontariuszy i domów tymczasowych
                            </p>

                            <span className="topbar__cta">
                                Dowiedz się →
                            </span>
                        </Link>

                    </div>

                </Container>
            </div>

            <header
                className={`navbar ${scrolled || open ? "navbar--scrolled" : ""
                    }`}
            >
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
                                <span className="navbar__logo-main">
                                    Kocia Oaza Koci Raj
                                </span>

                                <span className="navbar__logo-sub">
                                    Stowarzyszenie
                                </span>
                            </div>
                        </Link>

                        {/* DESKTOP NAV */}
                        <nav className="navbar__nav">

                            {/* STANDARD LINKS */}
                            {NAV_ITEMS.map((item) => {
                                const isActive =
                                    item.href === "/"
                                        ? pathname === "/"
                                        : pathname.startsWith(item.href);

                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`navbar__link ${isActive
                                            ? "navbar__link--active"
                                            : ""
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}

                            {/* HELP DROPDOWN */}
                            <div
                                className="navbar__dropdown"
                                ref={helpRef}
                            >
                                <button
                                    type="button"
                                    className={`navbar__dropdown-trigger ${helpOpen
                                        ? "navbar__dropdown-trigger--active"
                                        : ""
                                        }`}
                                    onClick={() =>
                                        setHelpOpen((prev) => !prev)
                                    }
                                >
                                    Pomagaj

                                    <ChevronDown
                                        size={16}
                                        className={`navbar__dropdown-icon ${helpOpen
                                            ? "navbar__dropdown-icon--open"
                                            : ""
                                            }`}
                                    />
                                </button>

                                <div
                                    className={`navbar__dropdown-menu ${helpOpen
                                        ? "navbar__dropdown-menu--open"
                                        : ""
                                        }`}
                                >
                                    {HELP_ITEMS.map((item) => {

                                        if (item.external) {
                                            return (
                                                <a
                                                    key={item.label}
                                                    href={item.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="navbar__dropdown-link"
                                                >
                                                    {item.label}
                                                </a>
                                            );
                                        }

                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="navbar__dropdown-link"
                                                onClick={() =>
                                                    setHelpOpen(false)
                                                }
                                            >
                                                {item.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                        </nav>

                        {/* HAMBURGER */}
                        <button
                            type="button"
                            aria-label="Menu"
                            className={`navbar__toggle ${open ? "is-open" : ""
                                }`}
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
                            className={`navbar__mobile ${open
                                ? "is-open"
                                : "is-closing"
                                }`}
                        >

                            {/* STANDARD LINKS */}
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
                                        className={`navbar__link ${isActive
                                            ? "navbar__link--active"
                                            : ""
                                            }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}

                            {/* MOBILE HELP */}
                            <div className="navbar__mobile-group">

                                <span className="navbar__mobile-label">
                                    Pomagaj
                                </span>

                                {HELP_ITEMS.map((item) => {

                                    if (item.external) {
                                        return (
                                            <a
                                                key={item.label}
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="navbar__mobile-sublink"
                                            >
                                                {item.label}
                                            </a>
                                        );
                                    }

                                    return (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={handleToggle}
                                            className="navbar__mobile-sublink"
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>

                        </div>
                    )}
                </Container>
            </header>
        </header>
    );
}