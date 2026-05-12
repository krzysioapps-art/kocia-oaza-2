"use client";

import { useState } from "react";
import GalleryModal from "@/app/components/ui/GalleryModal";
import type { Media } from "@/types/media";

export default function CatMedia({ media }: { media: Media[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
console.log(media);
  return (
    <>
      {media.length > 0 ? (
        <div className="cat-media__grid">
          {media.map((m, i) => (
            <div
              key={m.url}
              className="cat-media__item"
              onClick={() => setActiveIndex(i)}
            >
              {m.media_type === "video" ? (
                <>
                  <video
                    src={m.url.replace("/image/upload/", "/video/upload/")}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    className="cat-video"
                  />

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
          media={media}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}
    </>
  );
}