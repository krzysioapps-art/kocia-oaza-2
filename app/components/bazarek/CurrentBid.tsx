import { Bid } from "@/types/auction";

type Props = {
  bids: Bid[];
};

export default function CurrentBid({
  bids,
}: Props) {
  return (
    <div className="auction-bids">
      <h3 className="auction-bids__title">
        Historia ofert
      </h3>

      <div className="auction-bids__list">
        {bids.map((bid) => (
          <div
            key={bid.id}
            className="auction-bids__item"
          >
            <div className="auction-bids__left">
              <strong>
                {bid.nick}
              </strong>

              <span className="auction-bids__date">
                {new Date(
                  bid.created_at
                ).toLocaleString(
                  "pl-PL"
                )}
              </span>
            </div>

            <strong className="auction-bids__amount">
              {bid.amount} zł
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}