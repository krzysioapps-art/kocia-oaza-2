// app/components/bazarek/AuctionGallery.tsx

"use client";

import { useState } from "react";
import Image from "next/image";

import GalleryModal from "@/app/components/ui/GalleryModal";

import type { Media } from "@/types/media";

import "@/app/style/bazarek/auction-gallery.css";

type Props = {
    images: {
        url: string;
        public_id: string;
    }[];

    title: string;
};

export default function AuctionGallery({
    images,
    title,
}: Props) {
    const [activeImage, setActiveImage] =
        useState(
            images[0] || {
                url: "/placeholder.jpg",

                public_id:
                    "placeholder",
            }
        );

    const [isOpen, setIsOpen] =
        useState(false);

    const [activeIndex, setActiveIndex] =
        useState(0);

    const media: Media[] = images.map(
        (image) => ({
            url:
                typeof image ===
                    "string"
                    ? image
                    : image.url,

            media_type: "image",
        })
    );

    const openGallery = (
        index: number
    ) => {
        setActiveIndex(index);
        setIsOpen(true);
    };

    return (
        <>
            <div className="auction-gallery">
                {/* MAIN */}

                <button
                    className="auction-gallery__main"
                    onClick={() =>
                        openGallery(
                            images.findIndex(
                                (img) =>
                                    img.public_id ===
                                    activeImage.public_id
                            )
                        )
                    }
                >
                    <Image
                        src={
                            typeof activeImage ===
                                "string"
                                ? activeImage ||
                                "/placeholder.jpg"
                                : activeImage.url ||
                                "/placeholder.jpg"
                        }
                        alt={title}
                        width={1200}
                        height={1200}
                        className="auction-gallery__image"
                    />
                </button>

                {/* THUMBS */}

                {images.length > 1 && (
                    <div className="auction-gallery__thumbs">
                        {images.map(
                            (
                                image,
                                index
                            ) => (
                                <button
                                    key={
                                        image.public_id ||
                                        image.url ||
                                        index
                                    }
                                    className={`
                    auction-gallery__thumb
                    ${activeImage.public_id ===
                                            image.public_id
                                            ? "is-active"
                                            : ""
                                        }
                  `}
                                    onClick={() => {
                                        setActiveImage(
                                            image
                                        );
                                    }}
                                >
                                    <Image
                                        src={
                                            image.url ||
                                            "/placeholder.jpg"
                                        }
                                        alt={
                                            title
                                        }
                                        width={160}
                                        height={160}
                                        className="auction-gallery__thumb-image"
                                    />
                                </button>
                            )
                        )}
                    </div>
                )}
            </div>

            {isOpen && (
                <GalleryModal
                    media={media}
                    startIndex={
                        activeIndex
                    }
                    onClose={() =>
                        setIsOpen(false)
                    }
                />
            )}
        </>
    );
}