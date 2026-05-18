import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export async function PATCH(
    request: Request,
    { params }: Props
) {
    try {
        const { id } =
            await params;

        const body =
            await request.json();

        const supabase =
            await createClient();

        const { error } =
            await supabase
                .from("auctions")
                .update({
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
                })
                .eq("id", id);

        if (error) {
            console.error(
                "SUPABASE CREATE ERROR:",
                error
            );

            return NextResponse.json(
                {
                    error:
                        error.message,
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