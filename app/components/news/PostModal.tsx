"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Post = {
  id: string;
  message: string;
  created_time: string;

  author: {
    name: string;
    profile_picture: string;
  };

  media: {
    url: string;
    type?: "image" | "video";
  }[];

  cats: {
    id: string;
    name: string;
    slug: string;
  }[];
};

export default function PostModal({ postId }: { postId: string }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function loadPost() {
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
        .eq("id", postId)
        .single();

      if (!data) return;

      const mapped: Post = {
        id: data.id,
        message: data.message ?? "",
        created_time: data.created_time,

        author: {
          name: data.author_name,
          profile_picture: data.author_avatar,
        },

        media: data.post_media ?? [],

        cats:
          data.post_cats?.map((c: any) => c.cats).filter(Boolean) ?? [],
      };

      setPost(mapped);
    }

    loadPost();
  }, [postId]);

  const close = () => {
    router.push("/aktualnosci", { scroll: false });
  };

  if (!mounted || !post) return null;

  return createPortal(
    <div className="modal-backdrop" onClick={close}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={close}>✕</button>

        {/* HEADER */}
        <div className="post__header">
          <img
            src={post.author.profile_picture}
            alt={post.author.name}
            className="post__avatar"
          />
          <div>
            <p className="text-md">{post.author.name}</p>
            <p className="text-sm">
              {new Date(post.created_time).toLocaleDateString("pl-PL", {
                day: "numeric",
                month: "long",
              })}
            </p>
          </div>
        </div>

        {/* CONTENT */}
        <p className="text-md">{post.message}</p>

        {/* 🐱 KOTY */}
        {post.cats.length > 0 && (
          <div style={{ marginTop: 12 }}>
            {post.cats.map((cat) => (
              <a key={cat.id} href={`/koty/${cat.slug}`}>
                🐱 {cat.name}
              </a>
            ))}
          </div>
        )}

        {/* MEDIA */}
        {post.media.length > 0 && (
          <div className="post__gallery" style={{ marginTop: 16 }}>
            {post.media.map((m, i) => (
              <div key={i}>
                {m.type === "video" ? (
                  <video src={m.url} controls />
                ) : (
                  <img src={m.url} alt="" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}