"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Container from "@/app/components/ui/Container";
import Button from "@/app/components/ui/Button";
import Slider from "@/app/components/ui/Slider";

type Fundraiser = {
  slug: string;
  title: string;
  imageUrl: string | null;
  daysLeft: number | null;
  stats: {
    paymentsCount: number;
    amount: number;
    percentage: number;
    amountLeft: number;
    target: number;
  } | null;
};

export default function FundraisersSlider({
  fundraisers,
}: {
  fundraisers: Fundraiser[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

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

    const {
      scrollLeft,
      scrollWidth,
      clientWidth,
    } = el;

    setCanLeft(scrollLeft > 0);

    setCanRight(
      scrollLeft + clientWidth <
        scrollWidth - 2
    );
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
  }, [fundraisers]);

  return (
    <div className="fundraisers-section">
      <Slider ref={trackRef}>
        {fundraisers.map((item) => {
          const stats = item.stats;

          return (
            <article
              className="fundraisers-section__card"
              key={item.slug}
            >
              <a
                href={`https://www.ratujemyzwierzaki.pl/en/${item.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fundraisers-section__link"
              >
                {item.imageUrl && (
                  <img
                    className="fundraisers-section__image"
                    src={item.imageUrl}
                    alt=""
                  />
                )}

               <div className="fundraisers-section__body">
  <h3>
    {item.title}
  </h3>

  {item.daysLeft !== null && (
    <div className="fundraisers-section__days">
      {item.daysLeft === 1
        ? "Został 1 dzień"
        : `Zostało ${item.daysLeft} dni`}
    </div>
  )}

  {stats ? (
                    <>
                      <div className="fundraisers-section__progress">
                        <div
                          className="fundraisers-section__progress-bar"
                          style={{
                            width: `${Math.min(
                              stats.percentage,
                              100
                            )}%`,
                          }}
                        />
                      </div>

                      <div className="fundraisers-section__percentage">
                        {stats.percentage.toLocaleString(
                          "pl-PL",
                          {
                            maximumFractionDigits: 2,
                          }
                        )}
                        %
                      </div>

                      <div className="fundraisers-section__amounts">
                        <div>
                          <strong>
                            {stats.amount.toLocaleString(
                              "pl-PL",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}{" "}
                            zł
                          </strong>

                          <span>
                            z{" "}
                            {stats.target.toLocaleString(
                              "pl-PL",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}{" "}
                            zł
                          </span>
                        </div>

                        <div>
                          <strong>
                            {stats.paymentsCount}
                          </strong>

                          <span>
                            wpłat
                          </span>
                        </div>
                      </div>

                      <div className="fundraisers-section__remaining">
                        Pozostało{" "}
                        <strong>
                          {stats.amountLeft.toLocaleString(
                            "pl-PL",
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          )}{" "}
                          zł
                        </strong>
                      </div>
                    </>
                  ) : (
                    <p>
                      Nie udało się pobrać aktualnych danych
                      zbiórki.
                    </p>
                  )}

                  <span className="fundraisers-section__cta">
                    Wesprzyj zbiórkę →
                  </span>
                </div>
              </a>
            </article>
          );
        })}
      </Slider>

      <Container>
        <div className="cats-section__footer">
          <button
            type="button"
            className="cats-section__nav"
            onClick={() => scroll(-1)}
            disabled={!canLeft}
            aria-label="Poprzednie zbiórki"
          >
            <ArrowLeft size={20} />
          </button>

          <Button
            variant="primary"
            href="https://www.ratujemyzwierzaki.pl/en/kociaoaza"
          >
            Zobacz wszystkie zbiórki
          </Button>

          <button
            type="button"
            className="cats-section__nav"
            onClick={() => scroll(1)}
            disabled={!canRight}
            aria-label="Następne zbiórki"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </Container>
    </div>
  );
}