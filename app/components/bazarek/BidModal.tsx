// app/components/bazarek/BidModal.tsx

"use client";

import { useEffect, useState } from "react";

import Button from "@/app/components/ui/Button";

import "@/app/style/bazarek/bid-modal.css";

type Props = {
    currentBid: number;
    auctionSlug: string;
};

export default function BidModal({
    currentBid,
    auctionSlug,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    const [nick, setNick] = useState("");
    const [email, setEmail] = useState("");

    const [amount, setAmount] = useState(
        currentBid + 5
    );

    const minimumBid = currentBid + 1;

    useEffect(() => {
        const savedNick =
            localStorage.getItem(
                "bazarek_nick"
            );

        const savedEmail =
            localStorage.getItem(
                "bazarek_email"
            );

        if (savedNick) {
            setNick(savedNick);
        }

        if (savedEmail) {
            setEmail(savedEmail);
        }
    }, []);

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        setMessage(null);

        if (amount < minimumBid) {
            setMessage({
                type: "error",
                text: `Minimalna oferta to ${minimumBid} zł`,
            });

            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "/api/bazarek/bid",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        auctionSlug,

                        auctionTitle:
                            document.title,

                        nick,
                        email,

                        amount,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.error ||
                    "Błąd wysyłania"
                );
            }

            localStorage.setItem(
                "bazarek_nick",
                nick
            );

            localStorage.setItem(
                "bazarek_email",
                email
            );

            setMessage({
                type: "success",
                text: "Oferta została złożona ❤️",
            });

            setTimeout(() => {
                setIsOpen(false);
                window.location.reload();
            }, 1500);

        } catch (error) {
            console.error(error);

            setMessage({
                type: "error",
                text: "Nie udało się złożyć oferty.",
            });

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button onClick={() => setIsOpen(true)}>
                Licytuj ❤️
            </Button>

            {isOpen && (
                <div className="bid-modal">
                    <div
                        className="bid-modal__overlay"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="bid-modal__content">
                        <div className="bid-modal__header">
                            <h3>Złóż ofertę ❤️</h3>

                            <button
                                className="bid-modal__close"
                                onClick={() =>
                                    setIsOpen(false)
                                }
                            >
                                ✕
                            </button>
                        </div>

                        <form
                            className="bid-modal__form"
                            onSubmit={handleSubmit}
                        >
                            <div className="bid-modal__field">
                                <label>Nick</label>

                                <input
                                    type="text"
                                    value={nick}
                                    onChange={(e) =>
                                        setNick(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="bid-modal__field">
                                <label>Email</label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="bid-modal__field">
                                <label>
                                    Kwota (min. {minimumBid} zł)
                                </label>

                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) =>
                                        setAmount(
                                            Number(e.target.value)
                                        )
                                    }
                                    min={minimumBid}
                                    required
                                />
                            </div>

                            {message && (
                                <div
                                    className={`bid-modal__message ${message.type}`}
                                >
                                    {message.text}
                                </div>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="bid-modal__loader">
                                        <span className="spinner" />
                                        Wysyłanie...
                                    </span>
                                ) : (
                                    "Licytuj ❤️"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}