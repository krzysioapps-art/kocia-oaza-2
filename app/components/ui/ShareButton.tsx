"use client";

import { useState, useEffect } from "react";
import { FaShareAlt, FaFacebookF, FaEnvelope, FaLink } from "react-icons/fa";

type Props = {
  title?: string;
  url?: string;
};

export default function ShareButton({ title, url }: Props) {
  const [open, setOpen] = useState(false);

  const finalUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "");
  const getUrl = () => {
    if (url) return url;
    if (typeof window !== "undefined") return window.location.href;
    return "";
  };

  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    const text = finalUrl;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";

      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const shareToFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(finalUrl)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
    setOpen(false);
  };

  const shareToEmail = () => {
    const mail = `mailto:?subject=${encodeURIComponent(title || "")}&body=${encodeURIComponent(finalUrl)}`;
    window.location.href = mail;
    setOpen(false);
  };

  // zamykanie klik poza
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".share-root")) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);

  return (
    <div className="share-root">
      <button
        type="button"
        className="share-btn"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <FaShareAlt size={18} />
      </button>

      {open && (
        <div
          className="share-dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={copyLink}>
            <FaLink />
            {copied ? "Skopiowano" : "Kopiuj link"}
          </button>

          <button onClick={shareToFacebook}>
            <FaFacebookF /> Facebook
          </button>

          <button onClick={shareToEmail}>
            <FaEnvelope /> Email
          </button>
        </div>
      )}
    </div>
  );
}