"use client";

import { useEffect, useState } from "react";

function getScrollOffset() {
    const styles = getComputedStyle(document.documentElement);

    const navbar = parseFloat(styles.getPropertyValue("--navbar-height")) || 0;
    const space = parseFloat(styles.getPropertyValue("--space-3")) || 0;

    // 🔥 tylko mobile bierze sticky
    const isMobile = window.innerWidth < 1024;

    let sticky = 0;

    if (isMobile) {
        const stickyEl = document.querySelector(".cat-header__sticky") as HTMLElement | null;
        sticky = stickyEl?.offsetHeight || 0;
    }

    return sticky + space;
}

export default function CatTabs() {
    const [active, setActive] = useState("info");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const tabs = [
        { id: "info", label: "Info" },
        { id: "health", label: "Zdrowie" },
        { id: "story", label: "Opis" },
        { id: "media", label: "Zdjęcia" },
        { id: "posts", label: "Aktualności" },
    ];

    useEffect(() => {
        if (isMobile === null) return; // 🔥 tu warunek, NIE wyżej

        const handleScroll = () => {
            const offset = getScrollOffset();

            let current = isMobile ? "info" : "story";

            tabs.forEach((tab) => {
                const el = document.getElementById(tab.id);
                if (!el) return;

                const top = el.getBoundingClientRect().top;

                if (top - offset <= 0) {
                    current = tab.id;
                }
            });

            if (!isMobile && window.scrollY < 200) {
                current = "info";
            }

            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 50
            ) {
                current = "posts";
            }

            setActive(current);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobile]);

    const scrollToSection = (id: string) => {
        if (id === "info") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const el = document.getElementById(id);
        if (!el) return;

        const offset = getScrollOffset();

        const y =
            el.getBoundingClientRect().top +
            window.scrollY -
            offset;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });
    };

    return (
        <div className="cat-tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={active === tab.id ? "active" : ""}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}