"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import type { Media } from "@/types/media";

export default function GalleryModal({
    media,
    startIndex,
    onClose,
}: {
    media: Media[];
    startIndex: number;
    onClose: () => void;
}) {
    const startX = useRef(0);
    const [index, setIndex] = useState(startIndex);
    const [mounted, setMounted] = useState(false);

    const next = () => setIndex((i) => (i + 1) % media.length);
    const prev = () =>
        setIndex((i) => (i - 1 + media.length) % media.length);

    const handleTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const endX = e.changedTouches[0].clientX;

        if (endX - startX.current > 50) prev();
        if (startX.current - endX > 50) next();
    };



    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };

        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose, next, prev]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    if (!mounted) return null;



    const current = media[index];

    return createPortal(
        <div className="gallery-backdrop" onClick={onClose}>
            <div
                className="gallery-modal"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={(e) => e.stopPropagation()}
            >
                <button className="gallery-close" onClick={onClose}>
                    ✕
                </button>

                <button className="gallery-prev" onClick={prev}>
                    ‹
                </button>

                <button className="gallery-next" onClick={next}>
                    ›
                </button>

                {/* MEDIA */}
                {current.media_type === "video" ? (
                    <video
                        src={current.url.replace("/image/upload/", "/video/upload/")}
                        controls
                        autoPlay
                        playsInline
                    />
                ) : (
                    <img src={current.url} alt="" />
                )}
                <div className="gallery-counter">
                    {index + 1} / {media.length}
                </div>
            </div>

        </div>,
        document.body
    );
}