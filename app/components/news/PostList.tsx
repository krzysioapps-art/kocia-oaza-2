"use client";

import { useState } from "react";

import PostItem from "./PostItem";
import Button from "@/app/components/ui/Button";

import "@/app/style/news/news-feed.css";

export default function PostList({ posts = [] }: { posts?: any[] }) {
  const [visible, setVisible] = useState(6);

  const visiblePosts = posts?.slice(0, visible) ?? [];

  if (!posts || posts.length === 0) {
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

      {visible < (posts?.length ?? 0) && (
        <div className="news-feed__footer">
          <Button onClick={() => setVisible((v) => v + 6)}>
            Załaduj więcej
          </Button>
        </div>
      )}
    </div>
  );
}