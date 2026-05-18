// lib/bazarek/getAuctions.ts

import { createClient } from "@/lib/supabase/server";

export async function getAuctions() {
    const supabase =
        await createClient();

    const { data, error } =
        await supabase
            .from("auctions")
            .select("*")
            .order("created_at", {
                ascending: false,
            });

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}