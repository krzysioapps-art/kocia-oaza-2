"use client";

import { useRef, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Card from "@/app/components/ui/Card";

import "@/app/style/home/cats-section.css";

type Cat = {
  id: string;
  name: string;
  slug: string;
  image_url?: string | null;
};

export default function SimilarCatsSlider({ cats }: { cats: Cat[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;

    const firstCard = el.children[0] as HTMLElement;
    if (!firstCard) return;

    const gap = 16;
    const cardWidth = firstCard.offsetWidth;

    el.scrollBy({
      left: dir * (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanLeft(scrollLeft > 0);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 2);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    update();

    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="cat-similar">
      <h2>Podobne koty</h2>

      <div className="cat-slider">
        <div className="cat-slider__track" ref={trackRef}>
          {cats.map((c) => (
            <Card
              key={c.id}
              className="card card-base"
              href={`/koty/${c.slug}`}
            >
              <img
                className="card__media"
                src={c.image_url ?? "/avatar.jpg"}
                alt={c.name}
              />

              <div className="card__body">
                <strong>{c.name}</strong>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="cat-similar__footer">
        <button
          className="cats-section__nav"
          onClick={() => scroll(-1)}
          disabled={!canLeft}
        >
          <ArrowLeft size={18} />
        </button>

        <div className="cat-similar__spacer" />

        <button
          className="cats-section__nav"
          onClick={() => scroll(1)}
          disabled={!canRight}
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}