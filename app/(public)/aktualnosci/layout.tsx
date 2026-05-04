import "@/app/style/ui/modal.css";

import "@/app/style/news/post.css";
import "@/app/style/news/news-feed.css";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}