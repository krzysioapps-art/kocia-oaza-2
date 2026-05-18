// app/(bazarek)/bazarek/page.tsx

import Section from "@/app/components/ui/Section";

import AuctionGrid from "@/app/components/bazarek/AuctionGrid";

import { getAuctions } from "@/lib/bazarek/getAuctions";
import { getBids } from "@/lib/bazarek/getBids";

export default async function BazarekPage() {
    const auctions =
        await getAuctions();

    const auctionsWithBids =
        await Promise.all(
            auctions.map(async (auction) => {
                const bids =
                    await getBids(
                        auction.slug
                    );

                const currentBid =
                    bids.length > 0
                        ? Math.max(
                            ...bids.map(
                                (bid) =>
                                    bid.amount
                            )
                        )
                        : auction.start_price || 0;

                const bidsCount =
                    bids.length;

                return {
                    ...auction,

                    endsAt:
                        auction.ends_at,

                    currentBid,
                    bidsCount,

                    bids,
                };
            })
        );

    return (
        <>
            <section className="page-header-neutral">
                <div className="container">
                    <div className="page-header__inner">
                        <h1 className="heading heading--lg">
                            Bazarek Kociej Oazy ❤️
                        </h1>

                        <p className="text-lg">
                            Każda licytacja pomaga
                            ratować naszych
                            podopiecznych.
                        </p>
                    </div>
                </div>
            </section>

            <Section>
                <Section.Content>
                    <AuctionGrid
                        auctions={
                            auctionsWithBids
                        }
                    />
                </Section.Content>
            </Section>
        </>
    );
}