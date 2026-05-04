"use client";

import { useRef, useState, useEffect } from "react";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import Slider from "@/app/components/ui/Slider";
import Card from "@/app/components/ui/Card";

import { createClient } from "@/lib/supabase/client";

import "@/app/style/home/cats-section.css";

import { ArrowLeft, ArrowRight } from "lucide-react";

function getPrimaryImage(cat: any) {
  return (
    cat.media?.find((m: any) => m.is_primary)?.url ||
    cat.media?.[0]?.url ||
    cat.image_url ||
    "/placeholder-cat.jpg"
  );
}

export default function CatsSection() {
  const [latest, setLatest] = useState<any[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();

      const { data } = await supabase
        .from("cats")
        .select(`
          *,
          media:cat_media(*)
        `)
        .is("deleted_at", null)
        .order("created_at", { ascending: false })
        .limit(8);

      setLatest(data ?? []);
    }

    load();
  }, []);

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

    const observer = new ResizeObserver(update);
    observer.observe(el);

    el.addEventListener("scroll", update);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="section section--alt">
      <div className="cats-section">

        <Container>
          <div className="section__header">
            <Heading level="lg">Każdy kot ma swoją historię</Heading>
            <p className="text">
              Trafiają do nas koty chore, porzucone i zapomniane...
            </p>
          </div>
        </Container>

        <Slider ref={trackRef}>
          {latest.map((cat) => (
            <Card
              key={cat.id}
              href={`/koty/${cat.slug}`}
              className="card card-base"
            >
              <img
                className="card__media"
                src={getPrimaryImage(cat)}
                alt={cat.name}
              />

              <div className="card__body">
                <h3 className="text-md">{cat.name}</h3>
                <p className="text-sm line-clamp-2">
                  {cat.description ?? "Brak opisu"}
                </p>
              </div>
            </Card>
          ))}
        </Slider>

        <Container>
          <div className="cats-section__footer">
            <button
              className="cats-section__nav"
              onClick={() => scroll(-1)}
              disabled={!canLeft}
            >
              <ArrowLeft size={20} />
            </button>

            <Button variant="primary" href="/koty">
              Zobacz wszystkie koty
            </Button>

            <button
              className="cats-section__nav"
              onClick={() => scroll(1)}
              disabled={!canRight}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </Container>

      </div>
    </section>
  );
}