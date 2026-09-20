"use client";

import { useEffect, useState } from "react";

import "@/app/style/ui/cookie-consent.css";

const GA_ID = "G-CE0WXQ1L85";
const CONSENT_COOKIE = "kocia-oaza-cookie-consent";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180; // 180 dni

type Consent = "granted" | "denied";

declare global {
    interface Window {
        dataLayer?: unknown[];
        gtag?: (...args: unknown[]) => void;
        [key: `ga-disable-${string}`]: boolean | undefined;
    }
}

function getConsent(): Consent | null {
    const match = document.cookie
        .split("; ")
        .find((cookie) =>
            cookie.startsWith(`${CONSENT_COOKIE}=`)
        );

    if (!match) return null;

    const value = match.split("=")[1];

    if (value === "granted" || value === "denied") {
        return value;
    }

    return null;
}

function saveConsent(consent: Consent) {
    document.cookie = [
        `${CONSENT_COOKIE}=${consent}`,
        `Max-Age=${CONSENT_MAX_AGE}`,
        "Path=/",
        "SameSite=Lax",
    ].join("; ");
}

function deleteGoogleAnalyticsCookies() {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
        const name = cookie.split("=")[0].trim();

        if (
            name === "_ga" ||
            name.startsWith("_ga_") ||
            name === "_gid" ||
            name.startsWith("_gat_")
        ) {
            document.cookie = [
                `${name}=`,
                "Max-Age=0",
                "Path=/",
                "SameSite=Lax",
            ].join("; ");

            document.cookie = [
                `${name}=`,
                "Max-Age=0",
                "Path=/",
                "Domain=" + window.location.hostname,
                "SameSite=Lax",
            ].join("; ");
        }
    }
}

function loadGoogleAnalytics() {
    if (document.getElementById("google-analytics-script")) {
        return;
    }

    window.dataLayer = window.dataLayer || [];

    window.gtag = function (...args: unknown[]) {
        window.dataLayer?.push(args);
    };

    window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
    });

    window.gtag("js", new Date());

    window.gtag("consent", "update", {
        analytics_storage: "granted",
    });

    window.gtag("config", GA_ID);

    const script = document.createElement("script");

    script.id = "google-analytics-script";
    script.async = true;
    script.src =
        `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

    document.head.appendChild(script);
}

function disableGoogleAnalytics() {
    window[`ga-disable-${GA_ID}`] = true;

    if (typeof window.gtag === "function") {
        window.gtag("consent", "update", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
        });
    }

    deleteGoogleAnalyticsCookies();
}

export default function CookieConsent() {
    const [consent, setConsent] =
        useState<Consent | null>(null);

    const [ready, setReady] = useState(false);

    const [settingsOpen, setSettingsOpen] =
        useState(false);

    const [analyticsEnabled, setAnalyticsEnabled] =
        useState(false);

    useEffect(() => {
        const savedConsent = getConsent();

        if (savedConsent) {
            setConsent(savedConsent);

            if (savedConsent === "granted") {
                window[`ga-disable-${GA_ID}`] = false;
                loadGoogleAnalytics();
                setAnalyticsEnabled(true);
            } else {
                disableGoogleAnalytics();
            }
        }

        setReady(true);
    }, []);

    useEffect(() => {
        const openSettings = () => {
            const currentConsent = getConsent();

            setAnalyticsEnabled(
                currentConsent === "granted"
            );

            setSettingsOpen(true);
        };

        window.addEventListener(
            "kocia-oaza-open-cookie-settings",
            openSettings
        );

        return () => {
            window.removeEventListener(
                "kocia-oaza-open-cookie-settings",
                openSettings
            );
        };
    }, []);

    const acceptAll = () => {
        saveConsent("granted");

        window[`ga-disable-${GA_ID}`] = false;

        loadGoogleAnalytics();

        setAnalyticsEnabled(true);
        setConsent("granted");
        setSettingsOpen(false);
    };

    const rejectAll = () => {
        saveConsent("denied");

        disableGoogleAnalytics();

        setAnalyticsEnabled(false);
        setConsent("denied");
        setSettingsOpen(false);
    };

    const saveSettings = () => {
        if (analyticsEnabled) {
            acceptAll();
        } else {
            rejectAll();
        }
    };

    if (!ready) {
        return null;
    }

    if (consent && !settingsOpen) {
        return null;
    }

    return (
        <>
            {!consent && !settingsOpen && (
                <div
                    className="cookie-consent"
                    role="dialog"
                    aria-modal="false"
                    aria-labelledby="cookie-consent-title"
                >
                    <div className="cookie-consent__content">
                        <div>
                            <h2 id="cookie-consent-title">
                                Pliki cookies
                            </h2>

                            <p>
                                Używamy niezbędnych mechanizmów
                                technicznych oraz — za Twoją zgodą —
                                Google Analytics do statystycznej analizy
                                korzystania z serwisu.
                            </p>

                            <p>
                                Możesz zaakceptować analitykę, odrzucić ją
                                albo wybrać ustawienia.
                            </p>
                        </div>

                        <div className="cookie-consent__actions">
                            <button
                                type="button"
                                className="cookie-consent__button cookie-consent__button--secondary"
                                onClick={() => setSettingsOpen(true)}
                            >
                                Ustawienia
                            </button>

                            <button
                                type="button"
                                className="cookie-consent__button cookie-consent__button--secondary"
                                onClick={rejectAll}
                            >
                                Odrzucam
                            </button>

                            <button
                                type="button"
                                className="cookie-consent__button cookie-consent__button--primary"
                                onClick={acceptAll}
                            >
                                Akceptuję
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {settingsOpen && (
                <div
                    className="cookie-settings"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="cookie-settings-title"
                >
                    <div className="cookie-settings__backdrop" />

                    <div className="cookie-settings__panel">
                        <div className="cookie-settings__header">
                            <div>
                                <h2 id="cookie-settings-title">
                                    Ustawienia cookies
                                </h2>

                                <p>
                                    Wybierz, na jakie dodatkowe
                                    mechanizmy wyrażasz zgodę.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="cookie-settings__close"
                                onClick={() =>
                                    setSettingsOpen(false)
                                }
                                aria-label="Zamknij ustawienia cookies"
                            >
                                ×
                            </button>
                        </div>

                        <div className="cookie-settings__option">
                            <div>
                                <strong>
                                    Niezbędne
                                </strong>

                                <p>
                                    Mechanizmy potrzebne do działania
                                    strony i zapamiętania Twojego wyboru
                                    dotyczącego cookies. Są zawsze aktywne.
                                </p>
                            </div>

                            <span className="cookie-settings__status">
                                Zawsze aktywne
                            </span>
                        </div>

                        <div className="cookie-settings__option">
                            <div>
                                <strong>
                                    Analityczne
                                </strong>

                                <p>
                                    Google Analytics pomaga nam
                                    analizować korzystanie z serwisu
                                    i poprawiać jego działanie.
                                </p>
                            </div>

                            <label className="cookie-settings__switch">
                                <input
                                    type="checkbox"
                                    checked={analyticsEnabled}
                                    onChange={(event) =>
                                        setAnalyticsEnabled(
                                            event.target.checked
                                        )
                                    }
                                />

                                <span />
                            </label>
                        </div>

                        <div className="cookie-settings__actions">
                            <button
                                type="button"
                                className="cookie-consent__button cookie-consent__button--secondary"
                                onClick={rejectAll}
                            >
                                Odrzuć analityczne
                            </button>

                            <button
                                type="button"
                                className="cookie-consent__button cookie-consent__button--primary"
                                onClick={saveSettings}
                            >
                                Zapisz wybór
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}