"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";
import Slider from "@/app/components/ui/Slider";
import Card from "@/app/components/ui/Card";
import PostCard from "@/app/components/ui/PostCard";
import Section from "@/app/components/ui/Section";
import Reveal from "@/app/components/ui/Reveal";

import { createClient } from "@/lib/supabase/client";

import { formatAge } from "@/lib/utils/formatAge";
import { getWaitingLabel } from "@/lib/utils/getWaitingLabel";

import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Mars,
  Venus,
  FileText,
  Handshake,
  CheckCircle,
  PawPrint,
  HeartHandshake,
  Pill,
  Home,
} from "lucide-react";

type CatStatus =
  | "available"
  | "reserved"
  | "adopted"
  | "deceased";

type HomeClientProps = {
  children?: ReactNode;
};

function useCountUp(
  target: number,
  duration = 1400,
  start = false,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let animationFrame: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1,
      );

      const easedProgress =
        1 - Math.pow(1 - progress, 3);

      setValue(
        Math.round(target * easedProgress)
      );

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [target, duration, start]);

  return value;
}

/* =========================================================
   HERO
========================================================= */

function Hero() {

  const statsRef = useRef<HTMLDivElement>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const element = statsRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const catsCount = useCountUp(
    120,
    1400,
    statsVisible
  );

  const sterilizationsCount = useCountUp(
    300,
    1400,
    statsVisible
  );

  const adoptionsCount = useCountUp(
    40,
    1400,
    statsVisible
  );

  return (
    <section className="section hero hero--bg hero--overlay hero--with-stats">
      <Container>
        <div className="hero__inner">
          <Reveal>
            <Heading level="xl">
              Ratujemy koty.
            </Heading>
          </Reveal>

          <Reveal delay={60}>
            <Heading level="xl">
              Pomóż im znaleźć dom.
            </Heading>
          </Reveal>

          <Reveal delay={120}>
            <p className="text">
              Każdy z nich ma swoją historię. Teraz szuka bezpiecznego domu.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="hero__actions">
              <Button
                variant="primary"
                href="/koty"
              >
                Zobacz koty do adopcji
              </Button>

              <Button
                variant="primary"
                mode="outline"
                href="/jak-pomagamy"
              >
                Jak pomagamy
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal
          className="hero__stats"
          delay={240}
        >
          <div
            ref={statsRef}
            className="grid-3--responsive stats--light"
          >
            <div className="stats__item stats__item--primary">
              <div className="stats__value">
                {catsCount}+
              </div>

              <p className="text">
                uratowanych kotów
              </p>
            </div>

            <div className="stats__item stats__item--secondary">
              <div className="stats__value">
                {sterilizationsCount}+
              </div>

              <p className="text">
                kastracji
              </p>
            </div>

            <div className="stats__item stats__item--tertiary">
              <div className="stats__value">
                {adoptionsCount}+
              </div>

              <p className="text">
                adopcji w ostatnim czasie
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* =========================================================
   HOW WE HELP
========================================================= */

function HowWeHelp() {
  return (
    <Section>
      <Section.Header>
        <Reveal>
          <Heading level="lg">
            Co robimy każdego dnia
          </Heading>
        </Reveal>

        <Reveal delay={80}>
          <p className="text">
            Ratujemy, leczymy i pomagamy kotom wrócić do normalnego życia.
          </p>
        </Reveal>
      </Section.Header>

      <Section.Content>
        <div className="grid-3 reveal-parent">
          <Reveal>
            <div className="card-base variant--primary">
              <div className="how__icon variant__icon">
                <PawPrint size={24} />
              </div>

              <h3 className="heading heading--md">
                Ratowanie
              </h3>

              <p className="text">
                Przyjmujemy koty chore, porzucone i wymagające pilnej pomocy.
              </p>
            </div>
          </Reveal>

          <Reveal delay={70}>
            <div className="card-base variant--secondary">
              <div className="how__icon variant__icon">
                <Pill size={24} />
              </div>

              <h3 className="heading heading--md">
                Leczenie
              </h3>

              <p className="text">
                Diagnostyka, leczenie i pełna opieka weterynaryjna.
              </p>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="card-base variant--tertiary">
              <div className="how__icon variant__icon">
                <Home size={24} />
              </div>

              <h3 className="heading heading--md">
                Adopcje
              </h3>

              <p className="text">
                Szukamy odpowiednich domów dopasowanych do potrzeb kota.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={210}>
          <div className="how__cta">
            <Button
              variant="primary"
              href="/jak-pomagamy"
            >
              Jak pomagamy
            </Button>

            <Button
              variant="primary"
              mode="outline"
              href="/o-nas"
            >
              O nas
            </Button>
          </div>
        </Reveal>
      </Section.Content>
    </Section>
  );
}

/* =========================================================
   HELP SECTION
========================================================= */

function HelpSection() {
  return (
    <Section>
      <Section.Header>
        <Reveal>
          <Heading level="lg">
            Możesz pomóc na kilka sposobów
          </Heading>
        </Reveal>

        <Reveal delay={80}>
          <p className="text">
            Każdy gest ma znaczenie – wybierz sposób, który najlepiej do Ciebie pasuje.
          </p>
        </Reveal>
      </Section.Header>

      <Section.Content>
        <div className="section__content">
          <div className="grid-3 help-section__grid">
            <Reveal>
              <a
                href="/koty"
                className="card card-base variant--primary"
              >
                <div className="help__icon">
                  <Home size={24} />
                </div>

                <h3 className="heading heading--md">
                  Adoptuj
                </h3>

                <p className="text">
                  Daj kotu dom na stałe
                </p>

                <span className="help__link">
                  Zobacz koty <ArrowRight size={16} />
                </span>
              </a>
            </Reveal>

            <Reveal delay={70}>
              <a
                href="/dom-tymczasowy"
                className="card card-base variant--secondary"
              >
                <div className="help__icon">
                  <Clock3 size={24} />
                </div>

                <h3 className="heading heading--md">
                  Dom tymczasowy
                </h3>

                <p className="text">
                  Pomóż kotu dojść do siebie zanim znajdzie dom
                </p>

                <span className="help__link">
                  Dowiedz się więcej <ArrowRight size={16} />
                </span>
              </a>
            </Reveal>

            <Reveal delay={140}>
              <a
                href="https://www.ratujemyzwierzaki.pl/en/kociaoaza"
                target="_blank"
                rel="noopener noreferrer"
                className="card card-base variant--tertiary"
              >
                <div className="help__icon">
                  <HeartHandshake size={24} />
                </div>

                <h3 className="heading heading--md">
                  Wesprzyj
                </h3>

                <p className="text">
                  Pomóż nam ratować kolejne koty
                </p>

                <span className="help__link">
                  Wesprzyj nas <ArrowRight size={16} />
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </Section.Content>
    </Section>
  );
}

/* =========================================================
   CATS SECTION
========================================================= */

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
  status?: CatStatus | null,
  gender?: "male" | "female" | null
) {
  switch (status) {
    case "reserved":
      return "Zarezerwowany";

    case "adopted":
      return "Mam już dom";

    case "deceased":
      if (gender === "female") {
        return "Odeszła";
      }

      if (gender === "male") {
        return "Odszedł";
      }

      return "Odszedł / odeszła";

    case "available":
    default:
      return "Szukam domu";
  }
}

function CatsSection() {
  const [latest, setLatest] =
    useState<any[]>([]);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const [canLeft, setCanLeft] =
    useState(false);

  const [canRight, setCanRight] =
    useState(false);

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
        .order("created_at", {
          ascending: false,
        });

      const filtered =
        (data ?? [])
          .filter(
            (cat) =>
              (cat.media &&
                cat.media.length > 0) ||
              cat.image_url
          )
          .slice(0, 8);

      setLatest(filtered);
    }

    load();
  }, []);

  const scroll = (dir: number) => {
    const el = trackRef.current;

    if (!el) return;

    const firstCard =
      el.children[0] as HTMLElement;

    if (!firstCard) return;

    const gap = 16;
    const cardWidth =
      firstCard.offsetWidth;

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

    setCanLeft(
      scrollLeft > 0
    );

    setCanRight(
      scrollLeft + clientWidth <
      scrollWidth - 2
    );
  };

  useEffect(() => {
    const el = trackRef.current;

    if (!el) return;

    update();

    const observer =
      new ResizeObserver(update);

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
            <Reveal>
              <Heading level="lg">
                Każdy kot ma swoją historię
              </Heading>
            </Reveal>

            <Reveal delay={80}>
              <p className="text">
                Trafiają do nas koty chore,
                porzucone i zapomniane...
              </p>
            </Reveal>
          </div>
        </Container>

        <Reveal delay={120}>
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
                status === "deceased";

              return (
                <Card
                  key={cat.id}
                  href={`/koty/${cat.slug}`}
                  className={`card card-base cats-section__card ${isDeceased
                    ? "cats-section__card--deceased"
                    : ""
                    }`}
                >
                  <div className="cats-section__image-wrap">
                    <img
                      className="cats-section__image"
                      src={getPrimaryImage(cat)}
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
                              status,
                              cat.gender
                            )}
                          </span>

                          <small>
                            za tęczowy most
                          </small>
                        </>
                      ) : (
                        getStatusLabel(
                          status,
                          cat.gender
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
                            <Venus size={15} />
                            Kotka
                          </span>
                        )}

                      {cat.gender ===
                        "male" && (
                          <span>
                            <Mars size={15} />
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
                          <Clock3 size={14} />
                          {waitingLabel}
                        </div>
                      )}

                    {cat.tags &&
                      cat.tags.length >
                      0 && (
                        <div className="cats-section__tags">
                          {cat.tags
                            .slice(0, 3)
                            .map(
                              (
                                tag: string
                              ) => (
                                <span
                                  key={tag}
                                >
                                  {tag}
                                </span>
                              )
                            )}
                        </div>
                      )}

                    {cat.description && (
                      <p className="cats-section__description">
                        {cat.description}
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
        </Reveal>

        <Container>
          <Reveal
            className="cats-section__footer"
            delay={180}
          >
            <button
              type="button"
              className="cats-section__nav"
              onClick={() =>
                scroll(-1)
              }
              disabled={!canLeft}
              aria-label="Poprzednie koty"
            >
              <ArrowLeft size={20} />
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
              disabled={!canRight}
              aria-label="Następne koty"
            >
              <ArrowRight size={20} />
            </button>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}

/* =========================================================
   ADOPTION FLOW
========================================================= */

function AdoptionFlow() {
  return (
    <section className="section section--yell">
      <Container>
        <div className="section__header">
          <Reveal>
            <Heading level="lg">
              Jak wygląda adopcja?
            </Heading>
          </Reveal>
        </div>

        <div className="section__content">
          <div className="flow">
            <Reveal>
              <div className="flow__step flow__step--tertiary">
                <span>1</span>
                <FileText size={24} />

                <h3>
                  Formularz
                </h3>

                <p>
                  Wypełniasz zgłoszenie
                </p>

                <small className="flow__hint">
                  ~3 minuty
                </small>
              </div>
            </Reveal>

            <Reveal delay={70}>
              <div className="flow__step flow__step--secondary">
                <span>2</span>
                <Handshake size={24} />

                <h3>
                  Poznanie
                </h3>

                <p>
                  Spotykasz kota
                </p>

                <small className="flow__hint">
                  spokojne spotkanie
                </small>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="flow__step flow__step--primary">
                <span>3</span>
                <CheckCircle size={24} />

                <h3>
                  Adopcja
                </h3>

                <p>
                  Podpisujemy umowę
                </p>

                <small className="flow__hint">
                  odbiór kota
                </small>
              </div>
            </Reveal>
          </div>

          <Reveal
            className="section__footer"
            delay={210}
          >
            <Button
              variant="primary"
              mode="outline"
              href="/jak-adoptowac"
            >
              Zobacz szczegóły{" "}
              <ArrowRight size={16} />
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   TIPS
========================================================= */

function TipsSection() {
  return (
    <section className="section">
      <Container>
        <div className="section__content">
          <Reveal>
            <div className="tips-banner">
              <picture>
                <source
                  media="(max-width: 768px)"
                  srcSet="/tips-banner-yell-mobile.webp"
                />

                <img
                  src="/tips-banner-yell.webp"
                  alt="Niepewny kot"
                  className="tips-banner__image"
                />
              </picture>

              <div className="tips-banner__content">
                <Heading level="lg">
                  Jak zdobyć zaufanie kota?
                </Heading>

                <p>
                  Daj mu przestrzeń, nie przyspieszaj.
                  Pozwól obserwować i samemu zdecydować,
                  kiedy podejść.
                </p>

                <Button
                  variant="primary"
                  href="/porady"
                >
                  Zobacz wszystkie porady
                  <ArrowRight size={16} />
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function FinalCTA() {
  return (
    <section className="section section--green">
      <Container>
        <Reveal>
          <div className="section__header">
            <Heading level="lg">
              Każdy kot zasługuje na dom
            </Heading>

            <p className="text">
              Możesz pomóc — na swój sposób.
            </p>
          </div>
        </Reveal>

        <Reveal
          className="section__footer"
          delay={100}
        >
          <Button
            variant="tertiary"
            href="/koty"
          >
            <PawPrint size={16} />
            Poznaj koty
          </Button>

          <Button
            variant="tertiary"
            mode="outline"
            href="/jak-pomagamy"
          >
            <HeartHandshake size={16} />
            Zobacz jak pomagamy
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

/* =========================================================
   NEWS SECTION
========================================================= */

function NewsSection() {
  const [posts, setPosts] =
    useState<any[]>([]);

  const trackRef =
    useRef<HTMLDivElement>(null);

  const [canLeft, setCanLeft] =
    useState(false);

  const [canRight, setCanRight] =
    useState(false);

  useEffect(() => {
    async function loadPosts() {
      const supabase =
        createClient();

      const { data } =
        await supabase
          .from("posts")
          .select(`
            id,
            message,
            created_time,
            author_name,
            author_avatar,

            post_media (
              url,
              type
            ),

            post_cats (
              cats (
                id,
                name,
                slug
              )
            )
          `)
          .eq(
            "is_published",
            true
          )
          .order(
            "created_time",
            {
              ascending: false,
            }
          )
          .limit(12);

      const mapped =
        (data ?? []).map(
          (p: any) => ({
            post_id: p.id,
            message:
              p.message ?? "",
            created_time:
              p.created_time,

            author: {
              name:
                p.author_name,
              profile_picture:
                p.author_avatar,
            },

            reactions: {
              total_count: 0,
            },

            comments: {
              total_count: 0,
            },

            media:
              p.post_media ?? [],

            cats:
              p.post_cats
                ?.map(
                  (c: any) =>
                    c.cats
                )
                .filter(Boolean) ??
              [],
          })
        );

      setPosts(mapped);
    }

    loadPosts();
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

    el.addEventListener(
      "scroll",
      update
    );

    window.addEventListener(
      "resize",
      update
    );

    return () => {
      el.removeEventListener(
        "scroll",
        update
      );

      window.removeEventListener(
        "resize",
        update
      );
    };
  }, []);

  return (
    <section className="section section--alt">
      <div className="cats-section">
        <Container>
          <div className="section__header">
            <Reveal>
              <Heading level="lg">
                Aktualności
              </Heading>
            </Reveal>

            <Reveal delay={80}>
              <p className="text">
                Co nowego u naszych kotów i w fundacji
              </p>
            </Reveal>
          </div>
        </Container>

        <Reveal delay={120}>
          <Slider ref={trackRef}>
            {posts.map(
              (post) => (
                <PostCard
                  key={
                    post.post_id
                  }
                  post={post}
                />
              )
            )}
          </Slider>
        </Reveal>

        <Container>
          <Reveal
            className="cats-section__footer"
            delay={180}
          >
            <button
              type="button"
              className="cats-section__nav"
              onClick={() =>
                scroll(-1)
              }
              disabled={
                !canLeft
              }
              aria-label="Poprzednie aktualności"
            >
              <ArrowLeft
                size={20}
              />
            </button>

            <Button
              href="/aktualnosci"
              mode="outline"
            >
              Zobacz wszystkie aktualności
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
              aria-label="Następne aktualności"
            >
              <ArrowRight
                size={20}
              />
            </button>
          </Reveal>
        </Container>
      </div>
    </section>
  );
}

/* =========================================================
   HOME CLIENT
========================================================= */

export default function HomeClient({
  children,
}: HomeClientProps) {
  return (
    <>
      <Hero />

      <HowWeHelp />

      {children}

      <HelpSection />

      <CatsSection />

      <AdoptionFlow />

      <TipsSection />

      <FinalCTA />

      {/*
        Aktualności pozostają wyłączone,
        tak jak w poprzednim page.tsx.
      */}

      {/*
        <NewsSection />
      */}
    </>
  );
}