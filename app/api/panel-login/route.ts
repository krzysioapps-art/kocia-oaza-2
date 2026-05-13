import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const formData = await req.formData();

    const password =
        formData.get("password");

    if (
        password !== process.env.ADMIN_PASSWORD
    ) {
        return NextResponse.redirect(
            new URL("/panel-login", req.url),
            303
        );
    }

    const response = NextResponse.redirect(
        new URL("/panel", req.url),
        303
    );

    response.cookies.set(
        "kocia-admin",
        "authorized",
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        }
    );

    return response;
}