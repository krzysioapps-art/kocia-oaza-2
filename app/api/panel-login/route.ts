import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const pathname = req.nextUrl.pathname;

    const isDashboard =
        pathname.startsWith("/panel");

    const isLoginPage =
        pathname.startsWith("/panel-login");

    if (!isDashboard || isLoginPage) {
        return NextResponse.next();
    }

    const authCookie =
        req.cookies.get("kocia-admin");

    if (authCookie?.value === "authorized") {
        return NextResponse.next();
    }

    return NextResponse.redirect(
        new URL("/panel-login", req.url)
    );
}

export const config = {
    matcher: [
        "/panel/:path*",
        "/panel-login",
    ],
};