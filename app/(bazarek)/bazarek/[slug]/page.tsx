// app/(bazarek)/bazarek/[slug]/page.tsx

import { notFound } from "next/navigation";

import Container from "@/app/components/ui/Container";
import Section from "@/app/components/ui/Section";
import Heading from "@/app/components/ui/Heading";

import Countdown from "@/app/components/bazarek/Countdown";
import BidModal from "@/app/components/bazarek/BidModal";
import CurrentBid from "@/app/components/bazarek/CurrentBid";
import AuctionGallery from "@/app/components/bazarek/AuctionGallery";

import { getAuctions } from "@/lib/bazarek/getAuctions";
import { getBids } from "@/lib/bazarek/getBids";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function AuctionPage({
    params,
}: Props) {
    const { slug } =
        await params;

    const auctions =
        await getAuctions();

    const auction =
        auctions.find(
            (item) =>
                item.slug === slug
        );

    if (!auction) {
        notFound();
    }

    const bids =
        await getBids(
            auction.slug
        );

    const currentBid =
        bids[0]?.amount ??
        auction.start_price ??
        0;

    const bidsCount =
        bids.length;

    return (
        <>
            <section className="page-header-neutral">
                <Container>
                    <div className="page-header__inner">
                        <Heading level="lg">
                            {auction.title}
                        </Heading>

                        <p className="text-lg">
                            Każda oferta pomaga
                            ratować koty ❤️
                        </p>
                    </div>
                </Container>
            </section>

            <Section>
                <div className="auction-page">
                    {/* GALLERY */}

                    <div className="auction-page__gallery">
                        <AuctionGallery
                            images={auction.images.map(
                                (image: any) =>
                                    image.url
                            )}
                            title={auction.title}
                        />
                    </div>

                    {/* SIDEBAR */}

                    <div className="auction-page__sidebar">
                        <div className="auction-page__content">

                            {/* PRICE */}

                            <div className="card-base variant--primary auction-page__card">
                                <div className="auction-page__price">
                                    <span>
                                        Aktualna
                                        oferta
                                    </span>

                                    <strong>
                                        {
                                            currentBid
                                        }{" "}
                                        zł
                                    </strong>
                                </div>

                                <div className="auction-page__meta">
                                    🐾{" "}
                                    {
                                        bidsCount
                                    }{" "}
                                    ofert
                                </div>

                                <Countdown
                                    endsAt={
                                        auction.ends_at
                                    }
                                />

                                <BidModal
                                    currentBid={
                                        currentBid
                                    }
                                    auctionSlug={
                                        auction.slug
                                    }
                                />
                            </div>

                            {/* DESCRIPTION */}

                            {!!auction.description && (
                                <div className="card-base variant--alt auction-page__description">
                                    <Heading level="md">
                                        Opis aukcji
                                    </Heading>

                                    <p>
                                        {auction.description}
                                    </p>
                                </div>
                            )}

                            {/* BIDS */}

                            <div className="card-base variant--alt auction-page__bids">
                                {bids.length > 0 ? (
                                    <CurrentBid
                                        bids={bids}
                                    />
                                ) : (
                                    <div className="auction-page__empty-bids">
                                        <h3>
                                            🐾 Brak ofert
                                        </h3>

                                        <p>
                                            Bądź pierwszą osobą,
                                            która wesprze koty ❤️
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* MOBILE BAR */}

            <div className="auction-mobile-bar">
                <div>
                    <span className="auction-mobile-bar__label">
                        Aktualna oferta
                    </span>

                    <strong>
                        {currentBid} zł
                    </strong>
                </div>

                <div className="auction-mobile-bar__countdown">
                    <Countdown
                        endsAt={
                            auction.ends_at
                        }
                        compact
                    />
                </div>

                <BidModal
                    currentBid={
                        currentBid
                    }
                    auctionSlug={
                        auction.slug
                    }
                />
            </div>
        </>
    );
}