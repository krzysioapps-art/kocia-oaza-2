// types/auction.ts

export type Auction = {
    id: string;

    slug: string;

    title: string;
    description: string;

    images: {
        url: string;
        public_id: string;
    }[];

    currentBid: number;
    bidsCount: number;

    endsAt: string;

    featured?: boolean;

    bids: Bid[];
};

export type Bid = {
    id: string;

    nick: string;
    email: string;

    amount: number;

    created_at: string;
};