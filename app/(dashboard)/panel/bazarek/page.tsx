import Link from "next/link";

import { getAuctions } from "@/lib/bazarek/getAuctions";

export default async function BazarekAdminPage() {
    const auctions =
        await getAuctions();

    return (
        <main className="container section">
            <div className="dashboard-page">
                <div className="dashboard-page__header">
                    <div>
                        <h1>
                            Aukcje bazarku
                        </h1>

                        <p>
                            Zarządzaj aukcjami ❤️
                        </p>
                    </div>

                    <Link
                        href="/panel/bazarek/nowa"
                        className="button button--primary"
                    >
                        + Dodaj aukcję
                    </Link>
                </div>

                <div className="dashboard-grid">
                    {auctions.map(
                        (auction: any) => (
                            <div
                                key={auction.id}
                                className="card-base"
                            >
                                <div
                                    style={{
                                        display:
                                            "flex",

                                        flexDirection:
                                            "column",

                                        gap: 16,
                                    }}
                                >
                                    <img
                                        src={
                                            auction
                                                .images?.[0]?.url
                                        }
                                        alt={
                                            auction.title
                                        }
                                        style={{
                                            width:
                                                "100%",

                                            aspectRatio:
                                                "1 / 1",

                                            objectFit:
                                                "cover",

                                            borderRadius:
                                                "16px",
                                        }}
                                    />

                                    <div>
                                        <h3>
                                            {
                                                auction.title
                                            }
                                        </h3>

                                        <p>
                                            {
                                                auction.slug
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        {auction.featured
                                            ? "❤️ Wyróżniona"
                                            : "—"}
                                    </div>

                                    <Link
                                        href={`/panel/bazarek/${auction.id}`}
                                        className="button button--secondary"
                                    >
                                        Edytuj
                                    </Link>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </main>
    );
}