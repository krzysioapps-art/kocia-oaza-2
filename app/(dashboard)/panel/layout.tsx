// app/(dashboard)/panel/layout.tsx

import Link from "next/link";

import "@/app/style/bazarek/dashboard-bazarek.css";

type NavItem = {
    href: string;
    label: string;
};

const navItems: NavItem[] = [
    {
        href: "/panel/koty",
        label: "Koty",
    },
    {
        href: "/panel/zgloszenia",
        label: "Zgłoszenia",
    },
    {
        href: "/panel/zbiorki",
        label: "Zbiórki",
    },
    {
        href: "/panel/bazarek",
        label: "Bazarek",
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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

                    <nav className="dashboard-nav">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="button button--outline-primary"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </header>

            <div className="dashboard-content dashboard-content--panel">
    {children}
</div>
        </div>
    );
}