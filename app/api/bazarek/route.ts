import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function POST(
    request: Request
) {
    try {
        const body =
            await request.json();

        const supabase =
            await createClient();

        const { error } =
            await supabase
                .from("auctions")
                .insert({
                    title:
                        body.title,

                    slug:
                        body.slug,

                    description:
                        body.description,

                    images:
                        body.images,

                    featured:
                        body.featured,

                    ends_at:
                        body.ends_at,

                    start_price:
                        body.start_price,

                    shipping_cost:
                        body.shipping_cost,

                    shipping_method:
                        body.shipping_method,

                    pickup:
                        body.pickup,
                });

        if (error) {
            console.error(error);

            return NextResponse.json(
                {
                    error:
                        "Błąd tworzenia",
                },
                {
                    status: 500,
                }
            );
        }

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error:
                    "Server error",
            },
            {
                status: 500,
            }
        );
    }
}