"use client";

import { useState } from "react";
import GalleryModal from "@/app/components/ui/GalleryModal";
import type { Media } from "@/types/media";

export default function CatMedia({ media }: { media: Media[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const normalizedMedia = media.map((m: any) => ({
    url: m.url,
    type: m.media_type,
  }));

  return (
    <>
      {normalizedMedia.length > 0 ? (
        <div className="cat-media__grid">
          {normalizedMedia.map((m, i) => (
            <div
              key={m.url}
              className="cat-media__item"
              onClick={() => setActiveIndex(i)}
            >
              {m.type === "video" ? (
                <>
                  <video
                    src={m.url}
                    muted
                    playsInline
                    preload="metadata"
                  />

                  {/* ✅ overlay */}
                  <div className="video-overlay">
                    <span className="play-icon" />
                  </div>
                </>
              ) : (
                <img src={m.url} alt="" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="news-feed__empty card-base">
          <p>Brak zdjęć i filmów dla tego kota</p>
        </div>
      )}

      {activeIndex !== null && (
        <GalleryModal
          media={normalizedMedia}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}