import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const response = NextResponse.redirect(
        new URL("/panel-login", req.url)
    );

    response.cookies.set(
        "kocia-admin",
        "",
        {
            expires: new Date(0),
            path: "/",
        }
    );

    return response;
}