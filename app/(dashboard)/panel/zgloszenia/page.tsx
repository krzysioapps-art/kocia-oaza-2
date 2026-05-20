export const dynamic = "force-dynamic";

import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

import "@/app/style/zgloszenia.css";

export default async function AdoptionFormsPage() {
    const supabase = await createClient();

    const { data: forms } = await supabase
        .from("adoption_forms")
        .select("*")
        .order("created_at", {
            ascending: false,
        });

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
                        Zgłoszenia adopcyjne
                    </h1>

                    <p
                        className="text"
                        style={{
                            marginTop: 8,
                        }}
                    >
                        Wszystkie formularze adopcyjne i domów tymczasowych.
                    </p>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    {forms?.map((form) => (
                        <Link
                            key={form.id}
                            href={`/panel/zgloszenia/${form.id}`}
                            style={{
                                padding: 20,
                                border: "1px solid #e5e5e5",
                                borderRadius: 16,

                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 16,
                                flexWrap: "wrap",

                                background: "#fff",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 4,
                                }}
                            >
                                <strong>
                                    {form.data?.name || "Brak imienia"}
                                </strong>

                                <span
                                    style={{
                                        opacity: 0.6,
                                        fontSize: 14,
                                    }}
                                >
                                    {form.data?.email}
                                </span>

                                <span
                                    style={{
                                        fontSize: 14,
                                    }}
                                >
                                    {form.form_type === "temporary"
                                        ? "Dom tymczasowy"
                                        : "Adopcja"}
                                </span>

                                <span
                                    style={{
                                        fontSize: 14,
                                        opacity: 0.7,
                                    }}
                                >
                                    Kot: {form.cats?.name || "Ogólne zgłoszenie"}
                                </span>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-end",
                                    gap: 8,
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: 14,
                                        opacity: 0.6,
                                    }}
                                >
                                    {new Date(form.created_at).toLocaleDateString("pl-PL")}
                                </span>

                                <span
                                    style={{
                                        padding: "4px 10px",
                                        borderRadius: 9999,

                                        fontSize: 13,
                                        fontWeight: 600,

                                        background:
                                            form.status === "approved"
                                                ? "#dff5e6"
                                                : form.status === "rejected"
                                                    ? "#fde7ea"
                                                    : form.status === "in_progress"
                                                        ? "#f8f3e3"
                                                        : "#d7efec",

                                        color:
                                            form.status === "approved"
                                                ? "#1f8a4c"
                                                : form.status === "rejected"
                                                    ? "#c74b5a"
                                                    : form.status === "in_progress"
                                                        ? "#8b6c00"
                                                        : "#3aa39a",
                                    }}
                                >
                                    {form.status}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}