import PostList from "@/app/components/news/PostList";
import PostModal from "@/app/components/news/PostModal";
import { posts } from "@/app/data/posts";
import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";

export default function NewsPage({
  searchParams,
}: {
  searchParams: { post?: string };
}) {
  const postId = searchParams.post;

  return (
    <main>
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

      <section className="section section--alt">
        <Container>
          <PostList posts={posts} />
        </Container>
      </section>

      {postId && <PostModal postId={postId} />}
    </main>
  );
}