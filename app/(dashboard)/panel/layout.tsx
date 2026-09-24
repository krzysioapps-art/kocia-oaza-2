"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Cat,
    ClipboardList,
    HeartHandshake,
    LayoutDashboard,
    LogOut,
    ShoppingBag,
} from "lucide-react";

import ".././dashboard.css";

type NavItem = {
    href: string;
    label: string;
    icon: typeof LayoutDashboard;
};

const navItems: NavItem[] = [
    {
        href: "/panel",
        label: "Panel",
        icon: LayoutDashboard,
    },
    {
        href: "/panel/koty",
        label: "Koty",
        icon: Cat,
    },
    {
        href: "/panel/zgloszenia",
        label: "Zgłoszenia",
        icon: ClipboardList,
    },
    {
        href: "/panel/zbiorki",
        label: "Zbiórki",
        icon: HeartHandshake,
    },
    {
        href: "/",
        label: "Zamknij panel",
        icon: LogOut,
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div className="dashboard-root">
            <header className="dashboard-topbar">
                <div className="dashboard-topbar__inner">
                    <Link
                        href="/"
                        className="dashboard-brand"
                    >
                        Kocia Oaza
                    </Link>

                    <nav
                        className="dashboard-nav"
                        aria-label="Nawigacja panelu administracyjnego"
                    >
                        {navItems.map((item) => {
                            const Icon = item.icon;

                            const isActive =
    item.href === "/panel"
        ? pathname === "/panel"
        : item.href === "/"
          ? false
          : pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`dashboard-nav__item${
                                        isActive
                                            ? " dashboard-nav__item--active"
                                            : ""
                                    }`}
                                    aria-current={
                                        isActive
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    <Icon
                                        size={17}
                                        strokeWidth={2}
                                    />

                                    <span>
                                        {item.label}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </header>

            <div className="dashboard-content dashboard-content--panel">
                {children}
            </div>
        </div>
    );
}