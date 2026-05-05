"use client";

import { useState, useEffect } from "react";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import { ArrowLeft, ArrowRight, Heart, Home, CheckCircle } from "lucide-react";

/* =========================
   🧠 TYPES
========================= */

type Cat = {
    id?: string;
    name?: string;
    slug?: string;
    image_url?: string | null;
    media?: {
        url: string;
        is_primary?: boolean | null;
    }[] | null;
};

type Props = {
    cat: Cat;
};

/* =========================
   🖼 HELPERS
========================= */

const getPrimaryImage = (cat: Cat) => {
    return (
        cat.media?.find((m) => m.is_primary)?.url ||
        cat.media?.[0]?.url ||
        cat.image_url ||
        "/avatar.jpg"
    );
};

export default function FormClient({ cat }: Props) {
    const [step, setStep] = useState(0);

    // 🔥 tylko to zmienione — inicjalizacja żeby nie było undefined
    const [form, setForm] = useState<any>({
        name: "",
        email: "",
        phone: "",
        homeType: "",
        balcony: "",
        secured: "",
        people: "",
        children: "",
        childrenAge: "",
        agreement: "",
        aloneTime: "",
        experience: "",
        experienceDesc: "",
        reason: "",
        type: "",
    });

    const catName = cat?.name || "kota 🐾";

    const update = (field: string, value: any) => {
        setForm((prev: any) => ({ ...prev, [field]: value }));
    };

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    useEffect(() => {
        if (!isMobile) {
            const input = document.querySelector("input, textarea");
            if (input) (input as HTMLElement).focus();
        }
    }, [step]);

    /* =========================
       🔐 WALIDACJE
    ========================= */

    const isStep1Valid = form.name && form.email && form.phone;

    const isStep2Valid =
        form.homeType &&
        form.balcony &&
        (form.balcony === "no" || form.secured);

    const isStep3Valid = form.agreement === "yes";

    const isStep4Valid = form.aloneTime;

    const isStep5Valid = form.reason?.length >= 20;

    const canNext =
        (step === 1 && isStep1Valid) ||
        (step === 2 && isStep2Valid) ||
        (step === 3 && isStep3Valid) ||
        (step === 4 && isStep4Valid) ||
        (step === 5 && isStep5Valid);

    const [success, setSuccess] = useState(false);

    const handleSubmit = async () => {
        try {
            const res = await fetch("/api/adoption", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cat_id: cat?.id ?? null,
                    form_type: form.type,
                    data: form,
                }),
            });

            if (!res.ok) throw new Error();

            setSuccess(true);

            // reset form
            setForm({
                name: "",
                email: "",
                phone: "",
                homeType: "",
                balcony: "",
                secured: "",
                people: "",
                children: "",
                childrenAge: "",
                agreement: "",
                aloneTime: "",
                experience: "",
                experienceDesc: "",
                reason: "",
                type: "",
            });

            setStep(0);

        } catch (err) {
            console.error(err);
            alert("Błąd wysyłki 😿"); // to możesz później też podmienić
        }
    };

    if (success) {
        return (
            <main className="form-page">
                <Container>
                    <div className="form-container form-success">

                        <div className="form-success__icon">
                            <CheckCircle size={48} />
                        </div>

                        <h2 className="form-success__title">
                            Zgłoszenie wysłane!
                        </h2>

                        <p className="form-success__text">
                            Dziękujemy!
                        </p>

                        <p className="text-sm">
                            Skontaktujemy się z Tobą wkrótce.
                        </p>

                        <Button href={cat?.slug ? `/koty/${cat.slug}` : "/koty"}>
                            {cat?.slug ? "Wróć do profilu kota" : "Zobacz wszystkie koty"}
                        </Button>

                    </div>
                </Container>
            </main>
        );
    }

    return (
        <main className="form-page">
            <Container>
                <div className="form-container">

                    <Button
                        href={cat?.slug ? `/koty/${cat.slug}` : "/koty"}
                        mode="outline"
                        className="button--icon"
                    >
                        <ArrowLeft size={18} />
                    </Button>

                    {step > 0 && (
                        <>
                            <div className="progress">
                                <div
                                    className="progress__bar"
                                    style={{ width: `${(step / 5) * 100}%` }}
                                />
                            </div>
                            <p className="text-sm text-center">
                                Krok {step} z 5
                            </p>
                        </>
                    )}

                    <Heading level="md">
                        {step === 0
                            ? "Formularz zgłoszeniowy"
                            : form.type === "temporary"
                                ? `Daj dom tymczasowy dla ${catName}`
                                : `Adoptuj ${catName}`}
                    </Heading>

                    {cat?.id ? (
                        <div className="form-cat">
                            <img
                                src={getPrimaryImage(cat)}
                                alt={cat.name}
                                className="form-cat__image"
                            />
                            <p className="form-cat__name">{cat.name}</p>
                        </div>
                    ) : (
                        <p className="text text-center">
                            Wypełnij formularz — pomożemy dobrać idealnego kota 🐾
                        </p>
                    )}

                    {/* STEP 0 */}
                    {step === 0 && (
                        <>
                            <p className="text text-center">
                                Jak chcesz pomóc {catName}? ❤️
                            </p>

                            <div className="grid-2">
                                <div
                                    className={`card-base card-base--center ${form.type === "adoption" ? "active" : ""}`}
                                    onClick={() => {
                                        update("type", "adoption");
                                        setStep(1);
                                    }}
                                >
                                    <Home />
                                    <h3>Dom stały</h3>
                                    <p>Chcę adoptować kota</p>
                                </div>

                                <div
                                    className={`card-base card-base--center ${form.type === "temporary" ? "active" : ""}`}
                                    onClick={() => {
                                        update("type", "temporary");
                                        setStep(1);
                                    }}
                                >
                                    <Heart />
                                    <h3>Dom tymczasowy</h3>
                                    <p>Chcę pomóc tymczasowo</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* STEP 1 */}
                    {step === 1 && (
                        <>
                            <h3>Dane kontaktowe</h3>

                            <label>Imię i nazwisko</label>
                            <input
                                value={form.name}
                                className={!form.name ? "input-error" : ""}
                                onChange={(e) => update("name", e.target.value)}
                            />

                            <label>Email</label>
                            <input
                                value={form.email}
                                className={!form.email ? "input-error" : ""}
                                onChange={(e) => update("email", e.target.value)}
                            />

                            <label>Telefon</label>
                            <input
                                value={form.phone}
                                className={!form.phone ? "input-error" : ""}
                                onChange={(e) => update("phone", e.target.value)}
                            />
                        </>
                    )}

                    {/* STEP 2 */}
                    {step === 2 && (
                        <>
                            <h3>Twoje mieszkanie</h3>

                            <div className="form-section">
                                <p>Typ mieszkania</p>
                                <div className="button-group">
                                    {["flat", "house"].map((type) => (
                                        <button
                                            key={type}
                                            className={form.homeType === type ? "active" : ""}
                                            onClick={() => update("homeType", type)}
                                        >
                                            {type === "flat" ? "Mieszkanie" : "Dom"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-section">
                                <p>Balkon</p>
                                <div className="button-group">
                                    <button className={form.balcony === "yes" ? "active" : ""} onClick={() => update("balcony", "yes")}>Tak</button>
                                    <button className={form.balcony === "no" ? "active" : ""} onClick={() => update("balcony", "no")}>Nie</button>
                                </div>
                            </div>

                            {form.balcony === "yes" && (
                                <div className="form-section">
                                    <p>Zabezpieczenie</p>
                                    <div className="button-group">
                                        <button className={form.secured === "yes" ? "active" : ""} onClick={() => update("secured", "yes")}>Tak</button>
                                        <button className={form.secured === "no" ? "active" : ""} onClick={() => update("secured", "no")}>Zabezpieczę</button>
                                    </div>
                                    {form.secured === "no" && (
                                        <p className="info">
                                            Zabezpieczenie balkonu jest wymagane przed adopcją, ale możesz je zrobić później 🙂
                                        </p>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {/* STEP 3 */}
                    {step === 3 && (
                        <>
                            <h3>Domownicy</h3>

                            <div className="form-section">
                                <label>Ile osób mieszka w domu?</label>
                                <input value={form.people} onChange={(e) => update("people", e.target.value)} />
                            </div>

                            <div className="form-section">
                                <p>Czy są dzieci?</p>
                                <div className="button-group">
                                    <button className={form.children === "yes" ? "active" : ""} onClick={() => update("children", "yes")}>Tak</button>
                                    <button className={form.children === "no" ? "active" : ""} onClick={() => update("children", "no")}>Nie</button>
                                </div>
                            </div>

                            {form.children === "yes" && (
                                <div className="form-section">
                                    <label>Wiek dzieci</label>
                                    <input value={form.childrenAge} onChange={(e) => update("childrenAge", e.target.value)} />
                                </div>
                            )}

                            <div className="form-section">
                                <p>Czy wszyscy się zgadzają?</p>
                                <div className="button-group">
                                    <button className={form.agreement === "yes" ? "active" : ""} onClick={() => update("agreement", "yes")}>Tak</button>
                                    <button className={form.agreement === "no" ? "active" : ""} onClick={() => update("agreement", "no")}>Nie</button>
                                </div>
                                {form.agreement === "no" && (
                                    <p className="warning">
                                        Zgoda wszystkich domowników jest konieczna
                                    </p>
                                )}
                            </div>


                        </>
                    )}

                    {/* STEP 4 */}
                    {step === 4 && (
                        <>
                            <h3>Opieka</h3>

                            <div className="button-group">
                                {["0-2", "2-4", "4-6", "6-8", "8+"].map((t) => (
                                    <button key={t} className={form.aloneTime === t ? "active" : ""} onClick={() => update("aloneTime", t)}>
                                        {t} h
                                    </button>
                                ))}
                            </div>

                            <p>Czy miałeś kiedyś kota?</p>

                            <div className="button-group">
                                <button
                                    className={form.experience === "yes" ? "active" : ""}
                                    onClick={() => update("experience", "yes")}
                                >
                                    Tak, mam doświadczenie
                                </button>

                                <button
                                    className={form.experience === "no" ? "active" : ""}
                                    onClick={() => update("experience", "no")}
                                >
                                    Nie, to mój pierwszy kot
                                </button>
                            </div>

                            {form.experience === "yes" && (
                                <>
                                    <label>Opisz swoje doświadczenie</label>
                                    <textarea
                                        value={form.experienceDesc}
                                        onChange={(e) => update("experienceDesc", e.target.value)}
                                    />
                                </>
                            )}

                            {form.experience === "no" && (
                                <p className="info">
                                    Brak doświadczenia to nie problem! Pomożemy Ci 🐾
                                </p>
                            )}
                        </>
                    )}

                    {/* STEP 5 */}
                    {step === 5 && (
                        <>
                            <h3>Dlaczego chcesz adoptować?</h3>

                            <textarea value={form.reason} onChange={(e) => update("reason", e.target.value)} />

                            <p className="text-sm">
                                {form.reason.length}/20
                            </p>

                            {form.reason.length < 20 && (
                                <p className="warning">
                                    Minimum 20 znaków
                                </p>
                            )}
                        </>
                    )}

                    {/* NAV */}
                    {step > 0 && (
                        <div className="form-nav">
                            <Button mode="outline" onClick={() => setStep(step - 1)}>
                                Wstecz
                            </Button>

                            {step < 5 ? (
                                <Button onClick={() => setStep(step + 1)} disabled={!canNext}>
                                    Dalej <ArrowRight size={16} />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!isStep5Valid}
                                >
                                    Wyślij zgłoszenie 🐾
                                </Button>
                            )}
                        </div>
                    )}

                    {step > 0 && !canNext && (
                        <p className="warning text-center">
                            Uzupełnij wymagane pola, aby przejść dalej
                        </p>
                    )}

                </div>
            </Container>
        </main>
    );
}