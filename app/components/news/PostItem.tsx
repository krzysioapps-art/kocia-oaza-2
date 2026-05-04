"use client";

import { useEffect, useState } from "react";
import "@/app/style/news/post.css";
import Link from "next/link";
import { Post } from "@/app/data/posts";
import GalleryModal from "@/app/components/ui/GalleryModal";
import { createClient } from "@/lib/supabase/client";

type Cat = {
  id: string;
  name: string;
  slug: string;
};

export default function PostItem({ post }: { post: Post }) {
  const [expanded, setExpanded] = useState(false);
  const [relatedCats, setRelatedCats] = useState<Cat[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setExpanded(false);
  }, [post.post_id]);

  useEffect(() => {
    async function loadCats() {
      if (!post.cats || post.cats.length === 0) return;

      const supabase = createClient();

      const { data } = await supabase
        .from("cats")
        .select("id, name, slug")
        .in("id", post.cats);

      setRelatedCats(data ?? []);
    }

    loadCats();
  }, [post.cats]);

  const hasLongText = post.message.length > 180;

  return (
    <article className="post">

      {/* HEADER */}
      <div className="post__header">
        <img
          src={post.author.profile_picture}
          alt={post.author.name}
          className="post__avatar"
        />

        <div>
          <p className="text-md">{post.author.name}</p>
          <p className="text-sm post__date">
            {new Date(post.created_time).toLocaleDateString("pl-PL", {
              day: "numeric",
              month: "long",
            })}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="post__content-wrapper">
        <p
          className={`post__content text-md ${
            expanded ? "post__content--expanded" : "line-clamp-3"
          }`}
        >
          {post.message}
        </p>

        {hasLongText && (
          <button
            className="post__more"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Pokaż mniej" : "Pokaż więcej"}
          </button>
        )}
      </div>

      {/* 🐱 POWIĄZANE KOTY */}
      {relatedCats.map((cat) => (
        <Link key={cat.id} href={`/koty/${cat.slug}`}>
          🐱 {cat.name}
        </Link>
      ))}

      {/* MEDIA */}
      {post.media && post.media.length > 0 && (
        <div className="post__gallery">
          {post.media.slice(0, 6).map((media, i) => (
            <div
              key={i}
              className="post__thumb"
              onClick={() => setActiveIndex(i)}
            >
              {media.type === "video" ? (
                <>
                  <video src={media.url} muted playsInline />
                  <div className="post__video-badge">▶</div>
                </>
              ) : (
                <img src={media.url} alt="" />
              )}
            </div>
          ))}
        </div>
      )}

      {activeIndex !== null && (
        <GalleryModal
          media={post.media ?? []}
          startIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
        />
      )}

      {/* FOOTER */}
      <div className="post__footer text-sm">
        <span>❤️ {post.reactions.total_count}</span>
        <span>💬 {post.comments.total_count}</span>
      </div>

    </article>
  );
}