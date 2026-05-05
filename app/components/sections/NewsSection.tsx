"use client";

import { useRef, useState, useEffect } from "react";

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";
import Slider from "@/app/components/ui/Slider";
import PostCard from "@/app/components/ui/PostCard";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function NewsSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);

  // 🔥 FETCH POSTS
  useEffect(() => {
    async function loadPosts() {
      const supabase = createClient();

      const { data } = await supabase
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
        .eq("is_published", true)
        .order("created_time", { ascending: false })
        .limit(12);

      const mapped = (data ?? []).map((p: any) => ({
        post_id: p.id,
        message: p.message ?? "",
        created_time: p.created_time,

        author: {
          name: p.author_name,
          profile_picture: p.author_avatar,
        },

        reactions: { total_count: 0 },
        comments: { total_count: 0 },

        media: p.post_media ?? [],
        cats: p.post_cats?.map((c: any) => c.cats).filter(Boolean) ?? [],
      }));

      setPosts(mapped);
    }

    loadPosts();
  }, []);

  // 🔥 SLIDER LOGIC
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
          {posts.map((post) => (
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