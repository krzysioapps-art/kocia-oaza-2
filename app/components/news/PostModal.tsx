"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { posts } from "@/app/data/posts";

export default function PostModal({ postId }: { postId: string }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const post = posts.find(p => p.post_id === postId);
  if (!post || !mounted) return null;

  const close = () => {
    router.push("/aktualnosci", { scroll: false });
  };

  return createPortal(
    <div className="modal-backdrop" onClick={close}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={close}>✕</button>

        <h2>{post.author.name}</h2>
        <p>{post.message}</p>
      </div>
    </div>,
    document.body
  );
}