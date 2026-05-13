// app/(dashboard)/panel/page.tsx

import Link from "next/link";

export default function DashboardHomePage() {
    return (
        <main className="container section">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 32,
                }}
            >
                <div>
                    <h1 className="heading heading--lg">
                        Panel administracyjny
                    </h1>

                    <p
                        style={{
                            marginTop: 8,
                            opacity: 0.7,
                        }}
                    >
                        Zarządzaj zgłoszeniami i zbiórkami.
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: 24,
                    }}
                >
                    <Link
                        href="/panel/zgloszenia"
                        style={{
                            padding: 32,

                            borderRadius: 24,

                            background: "var(--color-accent-1)",

                            display: "flex",
                            flexDirection: "column",
                            gap: 12,

                            minHeight: 180,

                            justifyContent: "space-between",

                            transition: "transform 0.2s ease",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 42,
                            }}
                        >
                            🐾
                        </div>

                        <div>
                            <h2
                                style={{
                                    fontSize: 28,
                                    lineHeight: 1.1,
                                }}
                            >
                                Zgłoszenia
                            </h2>

                            <p
                                style={{
                                    marginTop: 8,
                                    opacity: 0.7,
                                }}
                            >
                                Formularze adopcyjne i domów tymczasowych.
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/panel/zbiorki"
                        style={{
                            padding: 32,

                            borderRadius: 24,

                            background: "var(--color-accent-2)",

                            display: "flex",
                            flexDirection: "column",
                            gap: 12,

                            minHeight: 180,

                            justifyContent: "space-between",

                            transition: "transform 0.2s ease",
                        }}
                    >
                        <div
                            style={{
                                fontSize: 42,
                            }}
                        >
                            💛
                        </div>

                        <div>
                            <h2
                                style={{
                                    fontSize: 28,
                                    lineHeight: 1.1,
                                }}
                            >
                                Zbiórki
                            </h2>

                            <p
                                style={{
                                    marginTop: 8,
                                    opacity: 0.7,
                                }}
                            >
                                Dodawaj i zarządzaj aktywnymi zbiórkami.
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}