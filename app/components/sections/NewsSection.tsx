"use client";

import { useRef, useState, useEffect } from "react";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import Slider from "@/app/components/ui/Slider";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { posts } from "@/app/data/posts"; // 🔥 TO JEST KLUCZ
import PostCard from "@/app/components/ui/PostCard";

export default function NewsSection() {
    const latest = posts.slice(0, 12);
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
        <section className="section section--alt">
            <div className="cats-section">

                <Container>
                    <div className="section__header">
                        <Heading level="lg">Aktualności</Heading>
                        <p className="text">
                            Co nowego u naszych kotów i w fundacji
                        </p>
                    </div>
                </Container>

                <Slider ref={trackRef}>
                    {latest.map((post) => (
                        <PostCard key={post.post_id} post={post} />
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

                        <Button href="/aktualnosci" mode="outline">
                            Zobacz wszystkie aktualności
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