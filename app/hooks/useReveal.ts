"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useReveal() {
    const pathname = usePathname();

    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const items = document.querySelectorAll(".reveal-parent > *");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target as HTMLElement;

                    if (entry.isIntersecting) {
                        el.classList.add("is-visible");
                        observer.unobserve(el);
                    }
                });
            },
            {
                threshold: 0.2,
                rootMargin: "0px 0px -50px 0px",
            }
        );

        // 🔥 sekcje
        sections.forEach((el) => {
            const rect = el.getBoundingClientRect();

            if (rect.top < window.innerHeight * 0.9) {
                el.classList.add("is-visible"); // 🔥 pokaż od razu
            } else {
                el.classList.remove("is-visible");
                observer.observe(el);
            }
        });

        // 🔥 karty (KLUCZ)
        items.forEach((el, i) => {
            const element = el as HTMLElement;

            element.classList.add("reveal-item");

            const rect = element.getBoundingClientRect();

            if (rect.top < window.innerHeight * 0.9) {
                element.classList.add("is-visible"); // 🔥 od razu widoczne
            } else {
                element.classList.remove("is-visible");

                element.style.transitionDelay = `${Math.min(i * 0.05, 0.3)}s`;

                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [pathname]);
}