// app/(dashboard)/panel/layout.tsx

import Link from "next/link";

type NavItem = {
    href: string;
    label: string;
};

const navItems: NavItem[] = [
    {
        href: "/panel/zgloszenia",
        label: "Zgłoszenia",
    },
    {
        href: "/panel/zbiorki",
        label: "Zbiórki",
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "var(--color-bg-alt)",
            }}
        >
            <div
                style={{
                    position: "sticky",
                    top: 0,
                    zIndex: 50,

                    background: "rgba(255,255,255,0.9)",
                    backdropFilter: "blur(12px)",

                    borderBottom: "1px solid var(--color-border)",
                }}
            >
                <div
                    className="container"
                    style={{
                        height: 72,

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 24,
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            fontWeight: 700,
                            fontSize: 18,
                        }}
                    >
                        Kocia Oaza
                    </Link>

                    <nav
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            flexWrap: "wrap",
                        }}
                    >
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
            </div>

            {children}
        </div>
    );
}