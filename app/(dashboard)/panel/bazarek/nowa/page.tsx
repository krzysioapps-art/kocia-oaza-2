import AuctionForm from "@/app/components/bazarek/AuctionForm";

import { createClient } from "@/lib/supabase/server";

export default async function NewAuctionPage() {
    const supabase =
        await createClient();

    const {
        data: latestAuction,
    } = await supabase
        .from("auctions")
        .select("*")
        .order("created_at", {
            ascending: false,
        })
        .limit(1)
        .single();

    return (
        <main className="container section">
            <div className="dashboard-page">
                <div className="dashboard-page__header">
                    <div>
                        <h1>
                            Nowa aukcja
                        </h1>

                        <p>
                            Dodaj nową aukcję ❤️
                        </p>
                    </div>
                </div>

                <AuctionForm
                    latestAuction={
                        latestAuction
                    }
                />
            </div>
        </main>
    );
}