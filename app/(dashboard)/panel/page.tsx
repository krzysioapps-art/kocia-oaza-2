// app/(dashboard)/panel/page.tsx

import Link from "next/link";
import {
    Cat,
    ClipboardList,
    HeartHandshake,
    ShoppingBag,
} from "lucide-react";

const dashboardCards = [
    {
        href: "/panel/koty",
        title: "Koty",
        description:
            "Dodawaj, edytuj i zarządzaj kotami przeznaczonymi do adopcji.",
        icon: Cat,
        className: "dashboard-home-card--cats",
    },
    {
        href: "/panel/zgloszenia",
        title: "Zgłoszenia",
        description:
            "Formularze adopcyjne i domów tymczasowych.",
        icon: ClipboardList,
        className: "dashboard-home-card--applications",
    },
    {
        href: "/panel/zbiorki",
        title: "Zbiórki",
        description:
            "Dodawaj i zarządzaj aktywnymi zbiórkami.",
        icon: HeartHandshake,
        className: "dashboard-home-card--fundraisers",
    },
    {
        href: "/panel/bazarek",
        title: "Bazarek",
        description:
            "Zarządzaj produktami i ofertami bazarku.",
        icon: ShoppingBag,
        className: "dashboard-home-card--bazarek",
    },
];

export default function DashboardHomePage() {
    return (
        <main className="container section">
            <div className="dashboard-home">
                <div className="dashboard-home__header">
                    <h1 className="heading heading--lg">
                        Panel administracyjny
                    </h1>

                    <p>
                        Zarządzaj kotami, zgłoszeniami,
                        zbiórkami i bazarkiem.
                    </p>
                </div>

                <div className="dashboard-home__grid">
                    {dashboardCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <Link
                                key={card.href}
                                href={card.href}
                                className={`dashboard-home-card ${card.className}`}
                            >
                                <div className="dashboard-home-card__icon">
                                    <Icon
                                        size={30}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                <div className="dashboard-home-card__content">
                                    <h2>
                                        {card.title}
                                    </h2>

                                    <p>
                                        {card.description}
                                    </p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}