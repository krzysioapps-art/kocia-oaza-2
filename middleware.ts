import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const isDashboard =
        req.nextUrl.pathname.startsWith("/panel");

    if (!isDashboard) {
        return NextResponse.next();
    }

    const authCookie =
        req.cookies.get("kocia-admin");

    if (authCookie?.value === "authorized") {
        return NextResponse.next();
    }

    const url = new URL("/panel-login", req.url);

    return NextResponse.redirect(url);
}

export const config = {
    matcher: ["/panel/:path*"],
};