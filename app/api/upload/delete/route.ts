import { NextResponse } from "next/server";

import { v2 as cloudinary }
    from "cloudinary";

cloudinary.config({
    cloud_name:
        process.env
            .NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,

    api_key:
        process.env
            .CLOUDINARY_API_KEY,

    api_secret:
        process.env
            .CLOUDINARY_API_SECRET,
});

export async function POST(
    request: Request
) {
    try {
        const body =
            await request.json();

        const {
            public_id,
        } = body;

        if (!public_id) {
            return NextResponse.json(
                {
                    error:
                        "Brak public_id",
                },
                {
                    status: 400,
                }
            );
        }

        await cloudinary.uploader.destroy(
            public_id
        );

        return NextResponse.json({
            success: true,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error:
                    "Delete error",
            },
            {
                status: 500,
            }
        );
    }
}