import "@/app/style/ui/post.css";
import { Heart, MessageCircle } from "lucide-react";
import Link from "next/link"

type Post = {
    post_id: string;
    author: {
        name: string;
        profile_picture: string;
    };
    message: string;
    created_time: string;
    media?: { url: string }[];
    reactions: { total_count: number };
    comments: { total_count: number };
};

export default function PostCard({ post }: { post: Post }) {
    return (
       <Link
  href={`/aktualnosci?post=${post.post_id}`}
  scroll={false}
  className="card card-base post"
>

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
            <p className="text-md post__content line-clamp-3">
                {post.message}
            </p>

            {/* MEDIA */}
            {post.media?.[0] && (
                <img
                    src={post.media[0].url}
                    alt={post.message}
                    className="post__image"
                />
            )}

            {/* FOOTER */}
            <div className="post__stats text-sm">
                <span className="post__stat">
                    <Heart size={16} />
                    {post.reactions.total_count}
                </span>

                <span className="post__stat">
                    <MessageCircle size={16} />
                    {post.comments.total_count}
                </span>
            </div>

        </Link>
    );
}