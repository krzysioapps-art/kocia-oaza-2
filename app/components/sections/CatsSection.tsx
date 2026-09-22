"use client";

import { useRef, useState, useEffect } from "react";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import Slider from "@/app/components/ui/Slider";
import Card from "@/app/components/ui/Card";

import { createClient } from "@/lib/supabase/client";

import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Mars,
  Venus,
} from "lucide-react";

import { formatAge } from "@/lib/utils/formatAge";
import { getWaitingLabel } from "@/lib/utils/getWaitingLabel";

type CatStatus =
  | "available"
  | "reserved"
  | "adopted"
  | "deceased";

function getPrimaryImage(cat: any) {
  return (
    cat.media?.find(
      (media: any) => media.is_primary
    )?.url ||
    cat.media?.[0]?.url ||
    cat.image_url ||
    "/placeholder-cat.jpg"
  );
}

function getStatusLabel(
  status?: CatStatus | null
) {
  switch (status) {
    case "reserved":
      return "Zarezerwowany";

    case "adopted":
      return "Mam już dom";

    case "deceased":
      return "Odszedł / odeszła";

    case "available":
    default:
      return "Szukam domu";
  }
}

export default function CatsSection() {
  const [latest, setLatest] = useState<any[]>([]);
  const trackRef =
    useRef<HTMLDivElement>(null);

  const [canLeft, setCanLeft] =
    useState(false);

  const [canRight, setCanRight] =
    useState(false);

  useEffect(() => {
    async function load() {
      const supabase =
        createClient();

      const { data } =
        await supabase
          .from("cats")
          .select(`
            *,
            media:cat_media(*)
          `)
          .is(
            "deleted_at",
            null
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      const filtered =
        (data ?? [])
          .filter(
            (cat) =>
              (cat.media &&
                cat.media.length >
                  0) ||
              cat.image_url
          )
          .slice(0, 8);

      setLatest(filtered);
    }

    load();
  }, []);

  const scroll = (
    dir: number
  ) => {
    const el =
      trackRef.current;

    if (!el) return;

    const firstCard =
      el.children[0] as HTMLElement;

    if (!firstCard) return;

    const gap = 16;
    const cardWidth =
      firstCard.offsetWidth;

    el.scrollBy({
      left:
        dir *
        (cardWidth + gap),
      behavior: "smooth",
    });
  };

  const update = () => {
    const el =
      trackRef.current;

    if (!el) return;

    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = el;

    setCanLeft(
      scrollLeft > 0
    );

    setCanRight(
      scrollLeft +
        clientWidth <
        scrollWidth - 2
    );
  };

  useEffect(() => {
    const el =
      trackRef.current;

    if (!el) return;

    update();

    const observer =
      new ResizeObserver(
        update
      );

    observer.observe(el);

    el.addEventListener(
      "scroll",
      update
    );

    window.addEventListener(
      "resize",
      update
    );

    return () => {
      observer.disconnect();

      el.removeEventListener(
        "scroll",
        update
      );

      window.removeEventListener(
        "resize",
        update
      );
    };
  }, [latest]);

  return (
    <section className="section section--alt">
      <div className="cats-section">
        <Container>
          <div className="section__header">
            <Heading level="lg">
              Każdy kot ma swoją historię
            </Heading>

            <p className="text">
              Trafiają do nas koty chore,
              porzucone i zapomniane...
            </p>
          </div>
        </Container>

        <Slider ref={trackRef}>
          {latest.map((cat) => {
            const status =
              (cat.status ??
                "available") as CatStatus;

            const age =
              formatAge(
                cat.birth_date
              );

            const waitingLabel =
              getWaitingLabel(
                cat.arrival_date
              );

            const isDeceased =
              status ===
              "deceased";

            return (
              <Card
                key={cat.id}
                href={`/koty/${cat.slug}`}
                className={`card card-base cats-section__card ${
                  isDeceased
                    ? "cats-section__card--deceased"
                    : ""
                }`}
              >
                <div className="cats-section__image-wrap">
                  <img
                    className="cats-section__image"
                    src={getPrimaryImage(
                      cat
                    )}
                    alt={`Kot ${cat.name}`}
                  />

                  {isDeceased && (
                    <div
                      className="cats-section__rainbow"
                      aria-label="Za tęczowym mostem"
                      title="Za tęczowym mostem"
                    >
                      🌈
                    </div>
                  )}

                  <div
                    className={`cats-section__status cats-section__status--${status}`}
                  >
                    {isDeceased ? (
                      <>
                        <span>
                          {getStatusLabel(
                            status
                          )}
                        </span>

                        <small>
                          za tęczowy most
                        </small>
                      </>
                    ) : (
                      getStatusLabel(
                        status
                      )
                    )}
                  </div>
                </div>

                <div className="cats-section__body">
                  <div className="cats-section__heading">
                    <h3>
                      {cat.name}
                    </h3>

                    <span className="cats-section__arrow">
                      →
                    </span>
                  </div>

                  <div className="cats-section__meta">
                    {cat.gender ===
                      "female" && (
                      <span>
                        <Venus
                          size={15}
                        />
                        Kotka
                      </span>
                    )}

                    {cat.gender ===
                      "male" && (
                      <span>
                        <Mars
                          size={15}
                        />
                        Kocurek
                      </span>
                    )}

                    {age && (
                      <span>
                        {age}
                      </span>
                    )}
                  </div>

                  {status ===
                    "available" &&
                    waitingLabel && (
                      <div className="cats-section__waiting">
                        <Clock3
                          size={14}
                        />
                        {waitingLabel}
                      </div>
                    )}

                  {cat.tags &&
                    cat.tags.length >
                      0 && (
                      <div className="cats-section__tags">
                        {cat.tags
                          .slice(
                            0,
                            3
                          )
                          .map(
                            (
                              tag: string
                            ) => (
                              <span
                                key={
                                  tag
                                }
                              >
                                {
                                  tag
                                }
                              </span>
                            )
                          )}
                      </div>
                    )}

                  {cat.description && (
                    <p className="cats-section__description">
                      {
                        cat.description
                      }
                    </p>
                  )}

                  <span className="cats-section__link">
                    Zobacz profil
                    <span>
                      →
                    </span>
                  </span>
                </div>
              </Card>
            );
          })}
        </Slider>

        <Container>
          <div className="cats-section__footer">
            <button
              type="button"
              className="cats-section__nav"
              onClick={() =>
                scroll(-1)
              }
              disabled={
                !canLeft
              }
              aria-label="Poprzednie koty"
            >
              <ArrowLeft
                size={20}
              />
            </button>

            <Button
              variant="primary"
              href="/koty"
            >
              Zobacz wszystkie koty
            </Button>

            <button
              type="button"
              className="cats-section__nav"
              onClick={() =>
                scroll(1)
              }
              disabled={
                !canRight
              }
              aria-label="Następne koty"
            >
              <ArrowRight
                size={20}
              />
            </button>
          </div>
        </Container>
      </div>
    </section>
  );
}