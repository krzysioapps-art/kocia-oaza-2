// app/components/dashboard/bazarek/AuctionForm.tsx

"use client";

import { useState } from "react";

type Props = {
    auction?: any;
    latestAuction?: any;

};

export default function AuctionForm({
    auction,
    latestAuction,
}: Props) {
    const [title, setTitle] =
        useState(
            auction?.title || ""
        );

    const [slug, setSlug] =
        useState(
            auction?.slug || ""
        );

    const [
        description,
        setDescription,
    ] = useState(
        auction?.description || ""
    );

    const [images, setImages] =
        useState<any[]>(
            auction?.images || []
        );

    const [featured, setFeatured] =
        useState(
            auction?.featured || false
        );

    const [loading, setLoading] =
        useState(false);

    const [startPrice, setStartPrice] =
        useState(
            auction?.start_price || 0
        );

    const [shippingCost, setShippingCost] =
        useState(
            auction?.shipping_cost ??
            latestAuction?.shipping_cost ??
            0
        );

    const [shippingMethod, setShippingMethod] =
        useState(
            auction?.shipping_method ??
            latestAuction?.shipping_method ??
            ""
        );

    const [pickup, setPickup] =
        useState(
            auction?.pickup ??
            latestAuction?.pickup ??
            false
        );

    const [endsAt, setEndsAt] =
        useState(
            (
                auction?.ends_at ??
                latestAuction?.ends_at ??
                ""
            )
                ?.replace(" ", "T")
                ?.slice(0, 16)
        );

    const handleSubmit =
        async (
            e: React.FormEvent
        ) => {
            e.preventDefault();

            setLoading(true);

            const payload = {
                title,
                slug,
                description,

                images,

                featured,

                ends_at: endsAt,

                start_price: startPrice,

                shipping_cost: shippingCost,

                shipping_method:
                    shippingMethod,

                pickup,
            };

            const response =
                await fetch(
                    auction
                        ? `/api/bazarek/${auction.id}`
                        : "/api/bazarek",
                    {
                        method: auction
                            ? "PATCH"
                            : "POST",

                        headers: {
                            "Content-Type":
                                "application/json",
                        },

                        body: JSON.stringify(
                            payload
                        ),
                    }
                );

            setLoading(false);

            if (!response.ok) {
                alert("Błąd");

                return;
            }

            alert(
                auction
                    ? "Aukcja zaktualizowana ❤️"
                    : "Aukcja dodana ❤️"
            );
        };

    return (
        <form
            onSubmit={handleSubmit}
            className="card-base auction-form"
        >
            <div className="auction-form__group">
                <label>
                    Tytuł
                </label>

                <input
                    value={title}
                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }
                />
            </div>

            <div className="auction-form__group">
                <label>
                    Slug
                </label>

                <input
                    value={slug}
                    onChange={(e) =>
                        setSlug(
                            e.target.value
                        )
                    }
                />
            </div>

            <div className="auction-form__group">
                <label>
                    Opis
                </label>

                <textarea
                    rows={6}
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />
            </div>

            <div className="auction-form__group">
                <label>
                    Zdjęcia
                </label>

                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={async (e) => {
                        const files =
                            Array.from(
                                e.target.files || []
                            );

                        if (!files.length) {
                            return;
                        }

                        setLoading(true);

                        const uploaded: any[] = [];

                        for (const file of files) {
                            const formData =
                                new FormData();

                            formData.append(
                                "file",
                                file
                            );

                            const response =
                                await fetch(
                                    "/api/upload",
                                    {
                                        method: "POST",

                                        body:
                                            formData,
                                    }
                                );

                            const data =
                                await response.json();

                            if (data.url) {
                                uploaded.push({
                                    url: data.url,

                                    public_id:
                                        data.public_id,
                                });
                            }
                        }

                        setImages((prev) => [
                            ...prev,
                            ...uploaded,
                        ]);

                        setLoading(false);
                    }}
                />
            </div>

            {!!images.length && (
                <div className="auction-form__preview">
                    {images.map(
                        (image: any) => (
                            <div
                                key={
                                    image.public_id
                                }
                                style={{
                                    position:
                                        "relative",
                                }}
                            >
                                <img
                                    src={image.url}
                                    alt=""
                                />

                                <button
                                    type="button"
                                    onClick={async () => {
                                        await fetch(
                                            "/api/upload/delete",
                                            {
                                                method:
                                                    "POST",

                                                headers:
                                                {
                                                    "Content-Type":
                                                        "application/json",
                                                },

                                                body: JSON.stringify(
                                                    {
                                                        public_id:
                                                            image.public_id,
                                                    }
                                                ),
                                            }
                                        );

                                        setImages(
                                            images.filter(
                                                (
                                                    img
                                                ) =>
                                                    img.public_id !==
                                                    image.public_id
                                            )
                                        );
                                    }}
                                    style={{
                                        position:
                                            "absolute",

                                        top: 8,
                                        right: 8,

                                        width: 32,
                                        height: 32,

                                        borderRadius:
                                            "999px",

                                        border:
                                            "none",

                                        background:
                                            "rgba(0,0,0,0.75)",

                                        color:
                                            "white",

                                        cursor:
                                            "pointer",
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        )
                    )}
                </div>
            )}

            <div className="auction-form__group">
                <label>
                    Cena wywoławcza
                </label>

                <input
                    type="number"
                    value={startPrice}
                    onChange={(e) =>
                        setStartPrice(
                            Number(e.target.value)
                        )
                    }
                />
            </div>

            <div className="auction-form__group">
                <label>
                    Dostawa
                </label>

                <label className="auction-form__checkbox">
                    <input
                        type="checkbox"
                        checked={shippingMethod.includes(
                            "Dostawa na własny koszt"
                        )}
                        onChange={(e) => {
                            if (e.target.checked) {
                                setShippingMethod(
                                    `${shippingMethod} Dostawa na własny koszt na wskazany adres.`
                                );
                            } else {
                                setShippingMethod(
                                    shippingMethod.replace(
                                        "Dostawa na własny koszt na wskazany adres.",
                                        ""
                                    )
                                );
                            }
                        }}
                    />

                    Dostawa na własny koszt na wskazany adres
                </label>

                <label className="auction-form__checkbox">
                    <input
                        type="checkbox"
                        checked={pickup}
                        onChange={(e) =>
                            setPickup(
                                e.target.checked
                            )
                        }
                    />

                    Możliwy bezpłatny odbiór osobisty na Woli
                </label>
            </div>

            <div className="auction-form__group">
                <label>
                    Data zakończenia
                </label>

                <input
                    type="datetime-local"
                    value={endsAt}
                    onChange={(e) =>
                        setEndsAt(
                            e.target.value
                        )
                    }
                />
            </div>

            <label className="auction-form__checkbox">
                <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) =>
                        setFeatured(
                            e.target.checked
                        )
                    }
                />

                Wyróżniona aukcja
            </label>

            <div className="auction-form__actions">
                <button
                    className="button button--primary"
                    disabled={loading}
                >
                    {loading
                        ? "Zapisywanie..."
                        : auction
                            ? "Zapisz zmiany"
                            : "Dodaj aukcję"}
                </button>
            </div>
        </form>
    );
}