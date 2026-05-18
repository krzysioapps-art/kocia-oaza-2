// app/components/bazarek/AuctionGrid.tsx

import AuctionCard from "./AuctionCard";

import { Auction } from "@/types/auction";

import "@/app/style/bazarek/auction-grid.css";

type Props = {
  auctions: Auction[];
};

export default function AuctionGrid({ auctions }: Props) {
  return (
    <div className="auction-grid">
      {auctions.map((auction) => (
        <AuctionCard
          key={auction.id}
          auction={auction}
        />
      ))}
    </div>
  );
}