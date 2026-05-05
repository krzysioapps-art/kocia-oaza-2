"use client";

import { useEffect, useState } from "react";
import PostItem from "./PostItem";
import Button from "@/app/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

export default function PostList({ catId }: { catId?: string }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [visible, setVisible] = useState(6);

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
        .order("created_time", { ascending: false });

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
        cats: p.post_cats?.map((c: any) => c.cats) ?? [],
      }));

      const filtered = catId
        ? mapped.filter((p: any) =>
          p.cats.some((c: any) => String(c.id) === String(catId))
        )
        : mapped;
      setPosts(filtered);
    }

    loadPosts();
  }, [catId]);

  const visiblePosts = posts.slice(0, visible);

  if (!posts.length) {
    return (
      <div className="news-feed__empty card-base">
        <p>Na razie nie ma jeszcze żadnych wpisów.</p>
      </div>
    );
  }

  return (
    <div className="news-feed">
      <div className="news-feed__list">
        {visiblePosts.map((post) => (
          <PostItem key={post.post_id} post={post} />
        ))}
      </div>

      {visible < posts.length && (
        <div className="news-feed__footer">
          <Button onClick={() => setVisible((v) => v + 6)}>
            Załaduj więcej
          </Button>
        </div>
      )}
    </div>
  );
}