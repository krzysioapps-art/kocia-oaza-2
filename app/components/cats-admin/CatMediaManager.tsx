
"use client";

import { useState } from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import type { CatMedia } from "@/types/cat";

type Props = {
    catId: string;
    initialMedia: CatMedia[];
};

export default function CatMediaManager({
    catId,
    initialMedia,
}: Props) {
    const [media, setMedia] = useState<CatMedia[]>(
        [...initialMedia].sort(
            (a, b) =>
                (a.display_order ?? 0) -
                (b.display_order ?? 0)
        )
    );

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    async function uploadFiles(files: FileList | null) {
        if (!files?.length) {
            return;
        }

        setUploading(true);
        setError("");

        const filesArray = Array.from(files);

        try {
            for (let index = 0; index < filesArray.length; index++) {
                const file = filesArray[index];

                try {
                    // Upload do Cloudinary przez istniejący,
                    // działający mechanizm z lib/cloudinary.ts
                    const uploadResult = await uploadToCloudinary(
                        file,
                        catId
                    );

                    const mediaType = file.type.startsWith("video/")
                        ? "video"
                        : "image";

                    // Pierwszy plik jest głównym tylko wtedy,
                    // gdy kot nie ma jeszcze żadnego medium.
                    const shouldBePrimary =
                        media.length === 0 && index === 0;

                    const response = await fetch("/api/cat-media", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            cat_id: catId,
                            media_type: mediaType,
                            url: uploadResult.secure_url,
                            cloudinary_public_id:
                                uploadResult.public_id,
                            is_primary: shouldBePrimary,
                            display_order:
                                media.length + index,
                        }),
                    });

                    const result = await response.json();

                    if (!response.ok) {
                        throw new Error(
                            result.error ??
                                "Nie udało się zapisać medium"
                        );
                    }

                    setMedia((current) => [
                        ...current,
                        result.media,
                    ]);
                } catch (fileError) {
                    console.error(
                        `Błąd uploadu pliku ${file.name}:`,
                        fileError
                    );

                    throw fileError;
                }
            }
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Błąd uploadu"
            );
        } finally {
            setUploading(false);
        }
    }

    async function updateMedia(
        id: string,
        payload: Partial<CatMedia>
    ) {
        try {
            const response = await fetch(
                `/api/cat-media/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.error ?? "Błąd zapisu"
                );
            }

            if (payload.is_primary) {
                setMedia((current) =>
                    current.map((item) => ({
                        ...item,
                        is_primary: item.id === id,
                    }))
                );
            } else {
                setMedia((current) =>
                    current.map((item) =>
                        item.id === id
                            ? {
                                  ...item,
                                  ...result.media,
                              }
                            : item
                    )
                );
            }
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nie udało się zapisać zmian."
            );
        }
    }

    async function removeMedia(item: CatMedia) {
        const confirmed = window.confirm(
            "Usunąć to zdjęcie?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `/api/cat-media/${item.id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                const result = await response.json();

                throw new Error(
                    result.error ?? "Błąd usuwania"
                );
            }

            setMedia((current) =>
                current.filter(
                    (mediaItem) =>
                        mediaItem.id !== item.id
                )
            );
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Nie udało się usunąć zdjęcia."
            );
        }
    }

    async function move(
        index: number,
        direction: -1 | 1
    ) {
        const target = index + direction;

        if (
            target < 0 ||
            target >= media.length
        ) {
            return;
        }

        const next = [...media];

        [next[index], next[target]] = [
            next[target],
            next[index],
        ];

        const normalized = next.map(
            (item, itemIndex) => ({
                ...item,
                display_order: itemIndex,
            })
        );

        setMedia(normalized);

        try {
            await Promise.all(
                normalized.map((item) =>
                    fetch(
                        `/api/cat-media/${item.id}`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type":
                                    "application/json",
                            },
                            body: JSON.stringify({
                                display_order:
                                    item.display_order,
                            }),
                        }
                    )
                )
            );
        } catch (error) {
            console.error(error);

            setError(
                "Nie udało się zapisać kolejności."
            );
        }
    }

    return (
        <div className="media-manager">
            <div className="media-manager__upload">
                <label className="media-upload-button">
                    {uploading
                        ? "Przesyłanie..."
                        : "+ Dodaj zdjęcia / wideo"}

                    <input
                        type="file"
                        accept="image/*,video/*"
                        multiple
                        disabled={uploading}
                        onChange={(event) =>
                            uploadFiles(
                                event.target.files
                            )
                        }
                    />
                </label>

                <span>
                    Możesz wybrać kilka plików
                    jednocześnie.
                </span>
            </div>

            {error && (
                <div className="cats-admin-error">
                    {error}
                </div>
            )}

            <div className="media-manager__grid">
                {media.map((item, index) => (
                    <article
                        key={item.id}
                        className="media-card"
                    >
                        <div className="media-card__preview">
                            {item.media_type === "video" ? (
                                <video
                                    src={item.url}
                                    controls
                                />
                            ) : (
                                <img
                                    src={item.url}
                                    alt={
                                        item.alt_text ?? ""
                                    }
                                />
                            )}

                            {item.is_primary && (
                                <span className="media-card__primary">
                                    Główne
                                </span>
                            )}
                        </div>

                        <div className="media-card__body">
                            <label>
                                <span>
                                    Alt text
                                </span>

                                <input
                                    value={
                                        item.alt_text ?? ""
                                    }
                                    onChange={(event) => {
                                        setMedia(
                                            (current) =>
                                                current.map(
                                                    (
                                                        mediaItem
                                                    ) =>
                                                        mediaItem.id ===
                                                        item.id
                                                            ? {
                                                                  ...mediaItem,
                                                                  alt_text:
                                                                      event
                                                                          .target
                                                                          .value,
                                                              }
                                                            : mediaItem
                                                )
                                        );
                                    }}
                                    onBlur={() =>
                                        updateMedia(
                                            item.id,
                                            {
                                                alt_text:
                                                    item.alt_text,
                                            }
                                        )
                                    }
                                />
                            </label>

                            <div className="media-card__actions">
                                {!item.is_primary && (
                                    <button
                                        type="button"
                                        className="button button--outline-primary"
                                        onClick={() =>
                                            updateMedia(
                                                item.id,
                                                {
                                                    is_primary:
                                                        true,
                                                }
                                            )
                                        }
                                    >
                                        Ustaw główne
                                    </button>
                                )}

                                <div className="media-order">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            move(
                                                index,
                                                -1
                                            )
                                        }
                                        disabled={
                                            index === 0
                                        }
                                    >
                                        ←
                                    </button>

                                    <span>
                                        {index + 1}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            move(
                                                index,
                                                1
                                            )
                                        }
                                        disabled={
                                            index ===
                                            media.length - 1
                                        }
                                    >
                                        →
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    className="media-delete"
                                    onClick={() =>
                                        removeMedia(
                                            item
                                        )
                                    }
                                >
                                    Usuń
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {media.length === 0 && (
                <div className="media-manager__empty">
                    Ten kot nie ma jeszcze żadnych
                    zdjęć.
                </div>
            )}
        </div>
    );
}