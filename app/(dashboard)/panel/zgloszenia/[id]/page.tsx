import Link from "next/link";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/client";


import "@/app/style/zgloszenia.css";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

const labels: Record<string, string> = {
    type: "Typ zgłoszenia",
    people: "Domownicy",
    reason: "Dlaczego chce adoptować",
    balcony: "Czy jest balkon",
    secured: "Zabezpieczenie balkonu",
    children: "Czy są dzieci",
    homeType: "Typ mieszkania",
    agreement: "Zgoda wszystkich domowników",
    aloneTime: "Czas samotności kota",
    experience: "Doświadczenie z kotami",
    childrenAge: "Wiek dzieci",
    experienceDesc: "Opis doświadczenia",
};

const values: Record<string, Record<string, string>> = {
    type: {
        adoption: "Adopcja",
        temporary: "Dom tymczasowy",
    },

    homeType: {
        flat: "Mieszkanie",
        house: "Dom",
    },

    balcony: {
        yes: "Tak",
        no: "Nie",
    },

    secured: {
        yes: "Tak, zabezpieczony",
        no: "Nie, ale zabezpieczę",
    },

    children: {
        yes: "Tak",
        no: "Nie",
    },

    agreement: {
        yes: "Tak",
        no: "Nie",
    },

    experience: {
        yes: "Tak",
        no: "Nie",
    },
};

export default async function AdoptionFormDetailsPage({
    params,
}: Props) {
    const { id } = await params;

    const supabase = createClient();

    const { data: form } = await supabase
        .from("adoption_forms")
        .select(`
            *,
            cats (
                id,
                name,
                slug
            )
        `)
        .eq("id", id)
        .single();

    if (!form) {
        notFound();
    }

    const data = form.data || {};

    return (
        <main className="container section">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                    maxWidth: 1000,
                }}
            >
                <Link
                    href="/panel/zgloszenia"
                    style={{
                        fontSize: 14,
                        opacity: 0.7,
                    }}
                >
                    ← Wróć do zgłoszeń
                </Link>

                <div>
                    <h1 className="heading heading--lg">
                        {data.name || "Zgłoszenie"}
                    </h1>

                    <p
                        style={{
                            marginTop: 8,
                            opacity: 0.7,
                        }}
                    >
                        {form.form_type === "temporary"
                            ? "Dom tymczasowy"
                            : "Adopcja"}
                    </p>
                </div>

                <div
                    className="dashboard-top-grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                        gap: 16,
                    }}
                >
                    <div className="dashboard-section">
                        <h2>Dane kontaktowe</h2>

                        <p>
                            <strong>Imię:</strong> {data.name || "—"}
                        </p>

                        <p>
                            <strong>Email:</strong> {data.email || "—"}
                        </p>

                        <p>
                            <strong>Telefon:</strong> {data.phone || "—"}
                        </p>
                    </div>

                    <div className="dashboard-section">
                        <h2>Informacje systemowe</h2>

                        <p>
                            <strong>Status:</strong> {form.status}
                        </p>

                        <p>
                            <strong>Typ:</strong>{" "}
                            {form.form_type === "temporary"
                                ? "Dom tymczasowy"
                                : "Adopcja"}
                        </p>

                        <p>
                            <strong>Kot:</strong>{" "}
                            {form.cats?.name || "Ogólne zgłoszenie"}
                        </p>

                        <p>
                            <strong>Data:</strong>{" "}
                            {new Date(form.created_at).toLocaleString("pl-PL")}
                        </p>

                        <p>
                            <strong>ID:</strong> {form.id}
                        </p>
                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    {Object.entries(data)
                        .filter(
                            ([key]) =>
                                ![
                                    "name",
                                    "email",
                                    "phone",
                                ].includes(key)
                        )
                        .map(([key, value]) => {
                            const prettyValue =
                                values[key]?.[String(value)] ||
                                String(value || "—");

                            return (
                                <div
                                    key={key}
                                    className="dashboard-section"
                                >
                                    <p
                                        style={{
                                            fontSize: 13,
                                            opacity: 0.6,
                                            marginBottom: 8,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.04em",
                                        }}
                                    >
                                        {labels[key] || key}
                                    </p>

                                    <p
                                        style={{
                                            whiteSpace: "pre-wrap",
                                            lineHeight: 1.8,
                                        }}
                                    >
                                        {prettyValue}
                                    </p>
                                </div>
                            );
                        })}
                </div>
            </div>
        </main>
    );
}