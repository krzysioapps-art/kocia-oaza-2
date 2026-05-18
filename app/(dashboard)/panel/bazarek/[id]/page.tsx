import { notFound } from "next/navigation";

import AuctionForm from "@/app/components/bazarek/AuctionForm";

import { createClient } from "@/lib/supabase/server";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditAuctionPage({
    params,
}: Props) {
    const { id } =
        await params;

    const supabase =
        await createClient();

    const {
        data: auction,
    } = await supabase
        .from("auctions")
        .select("*")
        .eq("id", id)
        .single();

    if (!auction) {
        notFound();
    }

    return (

        <main className="container section">
            <div className="dashboard-page">
                <div className="dashboard-page__header">
                    <div>
                        <h1>
                            Edytuj aukcję
                        </h1>

                        <p>
                            Zarządzaj aukcją ❤️
                        </p>
                    </div>
                </div>

                <AuctionForm
                    auction={auction}
                />
            </div>
        </main>
    );
}