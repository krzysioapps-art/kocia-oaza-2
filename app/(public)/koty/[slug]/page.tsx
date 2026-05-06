import PostList from "@/app/components/news/PostList";
import CatTabs from "@/app/components/ui/CatTabs";
import { Clock, CheckCircle, ArrowRight } from "lucide-react";
import SimilarCatsSlider from "@/app/components/koty/SimilarCatsSlider";
import { createClient } from "@/lib/supabase/server";
import CatMedia from "@/app/components/koty/CatMedia";
import type { Media } from "@/types/media";
import ShareBar from "@/app/components/ui/ShareButton";
import { formatAge } from "@/lib/utils/formatAge";

type PageProps = {
    params: { slug: string };
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

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;

    const supabase = await createClient();

    const { data: cat } = await supabase
        .from("cats")
        .select(`
            name,
            description,
            slug,
            image_url,
            media:cat_media(url, is_primary)
        `)
        .eq("slug", slug)
        .maybeSingle();

    if (!cat) {
        return {
            title: "Kocia Oaza",
        };
    }


    const image =
        cat.media?.find((m: any) => m.is_primary)?.url ||
        cat.media?.[0]?.url ||
        cat.image_url ||
        "https://new.kocia-oaza.pl/og-default.jpg";

    return {
        title: `${cat.name} szuka domu | Kocia Oaza`,
        description:
            cat.description?.slice(0, 160) ||
            `Poznaj ${cat.name} i daj mu dom ❤️`,

        alternates: {
            canonical: `https://new.kocia-oaza.pl/koty/${cat.slug}`,
        },

        robots: {
            index: true,
            follow: true,
        },

        openGraph: {
            title: `${cat.name} szuka domu`,
            description:
                cat.description?.slice(0, 160) ||
                `Poznaj ${cat.name} i daj mu dom ❤️`,
            url: `https://new.kocia-oaza.pl/koty/${cat.slug}`,
            siteName: "Kocia Oaza",
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                },
            ],
            type: "article",
        },
    };
}

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
        .maybeSingle();

    if (!cat || error) {
        return <div>Nie znaleziono kota</div>;
    }

    // 📝 POSTS


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

    const hasVirtual = !!cat.virtual_adoption_url;

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
                                {formatAge(cat.birth_date) || "Brak danych"}
                            </span>
                        </div>

                    </div>
                </div>
            </div>

            <div className="cat-header__sticky">
                <div className="container cat-header__row">

                    <CatTabs />

                    {!isAdopted && (
                        <div className={`cat-actions ${hasVirtual ? "cat-actions--3" : "cat-actions--2"}`}>

                            <a
                                href={`/zgloszenie/${cat.slug}`}
                                className="cat-cta cat-cta--primary"
                            >
                                Adoptuj
                            </a>

                            {hasVirtual && (
                                <a
                                    href={cat.virtual_adoption_url}
                                    className="cat-cta cat-cta--outline"
                                    target="_blank"
                                >
                                    Adoptuj wirtualnie
                                </a>
                            )}

                            <div className="cat-share">
                                <ShareBar title="Sprawdź tego kota!" />
                            </div>

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

                            <div className="cat-media card-base" id="media">
                                <h2>Zdjęcia i filmy</h2>
                                <CatMedia media={allMedia} />
                            </div>

                            <div className="cat-posts" id="posts">
                                <h2>Aktualności o {cat.name}</h2>
                                <PostList catId={cat.id} />
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