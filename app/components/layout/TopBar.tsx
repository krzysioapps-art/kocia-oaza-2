"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function TopBar() {
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        const dismissed = localStorage.getItem("topbar-dismissed");

        if (!dismissed) {
            setHidden(false);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem("topbar-dismissed", "true");
        setHidden(true);
    };

    if (hidden) return null;

    return (
        <div className="topbar">
            <div className="container topbar__inner">

                <Link
                    href="/dolacz-do-nas"
                    className="topbar__content"
                >
                    <span>🐾</span>

                    <p>
                        Szukamy wolontariuszy i domów tymczasowych w Warszawie
                    </p>

                    <span className="topbar__cta">
                        Dowiedz się →
                    </span>
                </Link>

                <button
                    className="topbar__close"
                    onClick={handleClose}
                    aria-label="Zamknij"
                >
                    <X size={16} />
                </button>

            </div>
        </div>
    );
}