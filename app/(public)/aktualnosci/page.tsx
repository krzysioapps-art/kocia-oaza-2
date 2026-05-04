"use client";

import { useSearchParams } from "next/navigation";
import PostList from "@/app/components/news/PostList";
import PostModal from "@/app/components/news/PostModal";
import { posts } from "@/app/data/posts";
import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";

export default function NewsPage() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("post");

  return (
    <main>

      {/* 🔥 PAGE HEADER */}
      <section className="page-header">
        <Container>
          <div className="page-header__inner">
            <Heading level="lg">Aktualności</Heading>
            <p className="text">
              Co nowego u naszych kotów i w fundacji
            </p>
          </div>
        </Container>
      </section>

      {/* 🔥 CONTENT */}
      <section className="section section--alt">
        <Container>
          <PostList posts={posts} />
        </Container>
      </section>

      {/* 🔥 MODAL */}
      {postId && <PostModal postId={postId} />}

    </main>
  );
}