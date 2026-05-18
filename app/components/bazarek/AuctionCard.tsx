// app/components/bazarek/AuctionCard.tsx

import Link from "next/link";
import Image from "next/image";

import "@/app/style/bazarek/auction-card.css";

import Card from "@/app/components/ui/Card";

import { Auction } from "@/types/auction";

type Props = {
    auction: Auction;
};

export default function AuctionCard({ auction }: Props) {
    console.log(auction.images);
    return (

        <Link
            href={`/bazarek/${auction.slug}`}
            className="auction-card-link"
        >
            <Card
                className={`
          auction-card
          ${auction.featured ? "auction-card--featured" : ""}
        `}
            >
                <div className="auction-card__image-wrapper">
                    <Image
                        src={
                            typeof auction.images?.[0] ===
                                "string"
                                ? auction.images?.[0]
                                : auction.images?.[0]
                                    ?.url ||
                                "/placeholder.jpg"
                        }
                        alt={auction.title}
                        width={600}
                        height={600}
                        className="auction-card__image"
                    />

                    <div className="auction-card__badge">
                        {auction.featured ? "❤️ Wyróżnione" : "🎁 Aukcja"}
                    </div>
                </div>

                <div className="auction-card__body">
                    <div className="auction-card__top">
                        <h3 className="auction-card__title line-clamp-2">
                            {auction.title}
                        </h3>

                        <p className="auction-card__description line-clamp-3">
                            {auction.description}
                        </p>
                    </div>

                    <div className="auction-card__meta">
                        <div className="auction-card__price">
                            <span className="auction-card__label">
                                Aktualna oferta
                            </span>

                            <strong>{auction.currentBid} zł</strong>
                        </div>

                        <div className="auction-card__bids">
                            🐾 {auction.bidsCount} ofert
                        </div>
                    </div>

                    <div className="auction-card__footer">
                        <div className="auction-card__timer">
                            ⏳ Kończy się:
                            <br />
                            {auction.endsAt
    ? `${auction.endsAt.slice(8,10)}.${auction.endsAt.slice(5,7)}.${auction.endsAt.slice(0,4)} ${auction.endsAt.slice(11,16)}`
    : "Brak daty"}
                        </div>

                        <div className="button button--primary">
                            Licytuj
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
}