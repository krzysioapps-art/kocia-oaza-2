"use client";

import { useState } from "react";

type ShareBarProps = {
    title?: string;
    url?: string;
};

export default function ShareBar({ title, url }: ShareBarProps) {
    const [copied, setCopied] = useState(false);

    const finalUrl =
        url ??
        (typeof window !== "undefined" ? window.location.href : "");

    const shareToFacebook = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            finalUrl
        )}`;

        window.open(shareUrl, "_blank", "width=600,height=400");
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(finalUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.error("Copy failed", e);
        }
    };

    return (
        <div className="share-bar">
            <span className="share-bar__label">Udostępnij:</span>

            <button
                onClick={shareToFacebook}
                className="share-btn share-btn--fb"
            >
                Facebook
            </button>

            <button
                onClick={copyLink}
                className="share-btn"
            >
                {copied ? "Skopiowano!" : "Kopiuj link"}
            </button>
        </div>
    );
}