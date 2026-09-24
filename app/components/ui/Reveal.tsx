"use client";

import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";

type RevealProps = {
    children: ReactNode;
    className?: string;
    delay?: number;
};

export default function Reveal({
    children,
    className = "",
    delay = 0,
}: RevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const rect = element.getBoundingClientRect();

        // Jeśli element jest już nad viewportem,
        // pokazujemy go od razu.
        if (rect.bottom <= 0) {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.12,
            },
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal ${visible ? "is-visible" : ""} ${className}`}
            style={
                {
                    "--reveal-delay": `${delay}ms`,
                } as CSSProperties
            }
        >
            {children}
        </div>
    );
}