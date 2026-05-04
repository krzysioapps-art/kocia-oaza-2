"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Mail, Link } from "lucide-react";
import { FaFacebookF } from "react-icons/fa";

type ShareBarProps = {
    title?: string;
    url?: string;
};

export default function ShareBar({ title, url }: ShareBarProps) {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const finalUrl =
        url ?? (typeof window !== "undefined" ? window.location.href : "");

    const copyLink = async () => {
        await navigator.clipboard.writeText(finalUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setOpen(false);
    };

    const shareToFacebook = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            finalUrl
        )}`;
        window.open(shareUrl, "_blank", "width=600,height=400");
        setOpen(false);
    };

    const shareToEmail = () => {
        const mail = `mailto:?subject=${encodeURIComponent(
            title || ""
        )}&body=${encodeURIComponent(finalUrl)}`;
        window.location.href = mail;
        setOpen(false);
    };

    // zamykanie po kliknięciu poza
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="share" ref={ref}>
            <button
                className="share__trigger"
                onClick={() => setOpen(!open)}
            >
                <Share2 size={18} />
            </button>

            <div className="share__tooltip">Udostępnij</div>

            {open && (
                <div className="share__menu">
                    <button onClick={copyLink}>
                        <Link size={16} />
                        {copied ? "Skopiowano!" : "Kopiuj link"}
                    </button>
                    <button onClick={shareToFacebook}>
                        <FaFacebookF size={16} />
                        Facebook
                    </button>

                    <button onClick={shareToEmail}>
                        <Mail size={16} />
                        Email
                    </button>
                </div>
            )}
        </div>
    );
}