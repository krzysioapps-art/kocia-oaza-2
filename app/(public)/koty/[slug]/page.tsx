export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const runtime = "nodejs";

import PostList from "@/app/components/news/PostList";
import "@/app/style/koty/cat-page.css";
import CatTabs from "@/app/components/ui/CatTabs";
import { Clock, CheckCircle } from "lucide-react";
import SimilarCatsSlider from "@/app/components/koty/SimilarCatsSlider";
import { createClient } from "@/lib/supabase/server";
import CatMedia from "@/app/components/koty/CatMedia";
import type { Media } from "@/types/media";
import ShareBar from "@/app/components/ui/ShareBar";

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

/* =========================
   🧠 HELPERS
   ========================= */

function monthsSince(date?: string | null) {
    if (!date) return null;

    const created = new Date(date);
    if (isNaN(created.getTime())) return null;

    const now = new Date();

    return (
        (now.getFullYear() - created.getFullYear()) * 12 +
        (now.getMonth() - created.getMonth())
    );
}

function ageFromBirth(date?: string | null) {
    if (!date) return null;

    const birth = new Date(date);
    if (isNaN(birth.getTime())) return null;

    const now = new Date();

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    if (years <= 0) return `${months} mies.`;
    return `${years} ${years === 1 ? "rok" : "lata"}`;
}

function getStatusLabel(status?: string) {
    if (status === "adopted") return "Adoptowany";
    if (status === "available") return "Szuka domu";
    return "Brak danych";
}

function getPrimaryImage(cat: any) {
    return (
        cat.media?.find((m: any) => m.is_primary)?.url ||
        cat.media?.[0]?.url ||
        cat.image_url ||
        "/avatar.jpg"
    );
}
export const metadata = {
  title: "TEST",
  description: "TEST",
  openGraph: {
    title: "TEST",
    description: "TEST",
    url: "https://new.kocia-oaza.pl",
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
      },
    ],
  },
};

/* =========================
   🐱 PAGE
   ========================= */

export default async function CatPage({ params }: PageProps) {
    const { slug } = await params;

    const supabase = await createClient();

    // 🐱 CAT + MEDIA
    const { data: cat, error } = await supabase
        .from("cats")
        .select(`
      *,
      media:cat_media(*)
    `)
        .eq("slug", slug)
        .single();

    if (!cat || error) {
        return <div>Nie znaleziono kota</div>;
    }

    // 📝 POSTS
    const { data: catPosts } = await supabase
        .from("posts")
        .select("*")
        .contains("cats", [cat.id]);

    // 🖼️ MEDIA
    const allMedia: Media[] = cat.media ?? [];

    const imageMedia = allMedia.filter(
        (m: any) => !m.media_type || m.media_type === "image"
    );

    const videoMedia = allMedia.filter(
        (m: any) => m.media_type === "video"
    );

    // 🐱 SIMILAR
    const { data: similarCatsRaw } = await supabase
        .from("cats")
        .select(`
      *,
      media:cat_media(*)
    `)
        .neq("id", cat.id)
        .eq("status", "available")
        .limit(3);

    const similarCats = similarCatsRaw ?? [];

    const waitMonths = monthsSince(cat.created_at);

    const isAdopted = cat.status === "adopted";
    console.log(allMedia);
    console.log(videoMedia);
    return (
        <main className={`cat-page ${cat.gender === "female" ? "cat--female" : "cat--male"}`}>

            <div className="cat-header">
                <div className="cat-header__top">
                    <div className="container cat-header__center">

                        <div className="cat-avatar-wrap">
                            <img
                                src={getPrimaryImage(cat)}
                                alt={cat.name}
                                className="cat-avatar"
                            />
                        </div>

                        <h1 className="cat-name">{cat.name}</h1>

                        <div className="cat-age">
                            <span className="cat-age__label">Wiek:</span>
                            <span className="cat-age__value">
                                {ageFromBirth(cat.birth_date) ?? "Brak danych"}
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="cat-header__sticky">
                <div className="container cat-header__row">

                    <CatTabs />

                    {!isAdopted && (
                        <div className="cat-actions">
                            <button className="button button--primary">
                                Adoptuj: {cat.name}
                            </button>
                            <button className="button button--outline-primary">
                                Wesprzyj
                            </button>
                        </div>
                    )}

                </div>
            </div>

            <section className="section section--alt cat-section">

                <div className="container">
                    {!isAdopted && waitMonths !== null && waitMonths >= 1 && (
                        <div className="cat-urgency card-base">
                            <Clock size={16} />
                            <span>
                                Ten kot czeka na dom już{" "}
                                <strong>{waitMonths} mies.</strong>
                            </span>
                        </div>
                    )}

                    <div className={`cat-layout ${isAdopted ? "cat-layout--single" : ""}`}>
                        {!isAdopted && (
                            <aside className="cat-sidebar" id="info">

                                <div className="card-base variant--primary">
                                    <h3>Podstawowe informacje</h3>

                                    <div>Status: {getStatusLabel(cat.status)}</div>
                                    <div>Lokalizacja: {cat.location ?? "Brak danych"}</div>
                                    <div>
                                        Rok urodzenia:{" "}
                                        {cat.birth_date?.slice(0, 4) ?? "Brak danych"}
                                    </div>
                                    <div>Waga: {cat.weight ?? "Brak danych"}</div>
                                </div>

                                <div className="card-base variant--tertiary" id="health">
                                    <h3>Stan zdrowia</h3>

                                    <div>
                                        <CheckCircle size={16} /> Sterylizacja: {cat.sterilized ? "Tak" : "Nie"}
                                    </div>

                                    <div>
                                        <CheckCircle size={16} /> Szczepienia: {cat.vaccinated ? "Tak" : "Nie"}
                                    </div>

                                    <div>
                                        <CheckCircle size={16} /> Odrobaczenie: {cat.dewormed ? "Tak" : "Nie"}
                                    </div>

                                    <div>FIV: {cat.fiv_status ?? "Brak danych"}</div>
                                    <div>FeLV: {cat.felv_status ?? "Brak danych"}</div>
                                </div>

                            </aside>
                        )}

                        <section className="cat-main">

                            <div className="cat-story card-base" id="story">
                                <h2>Historia {cat.name}</h2>

                                {cat.description ? (
                                    <p>{cat.description}</p>
                                ) : (
                                    <div className="news-feed__empty">
                                        <p>Brak opisu dla tego kota</p>
                                    </div>
                                )}
                            </div>

                            <ShareBar
                                title={`Poznaj ${cat.name}`}
                                url={`https://new.kocia-oaza.pl/koty/${slug}`}
                            />

                            <div className="cat-media card-base" id="media">
                                <h2>Zdjęcia i filmy</h2>
                                <CatMedia media={allMedia} />
                            </div>

                            <div className="cat-posts" id="posts">
                                <h2>Aktualności o {cat.name}</h2>
                                <PostList posts={catPosts ?? []} />
                            </div>

                            {similarCats.length > 0 && (
                                <div className="cat-similar-wrap">
                                    <SimilarCatsSlider cats={similarCats} />
                                </div>
                            )}

                        </section>

                    </div>
                </div>
            </section>
        </main>
    );
}