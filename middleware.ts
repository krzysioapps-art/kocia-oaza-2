import { NextResponse } from "next/server";

export function middleware(req) {
  const ua = req.headers.get("user-agent") || "";

  if (
    ua.includes("facebookexternalhit") ||
    ua.includes("Facebot")
  ) {
    return NextResponse.next();
  }

  // 🔒 Twoja reszta logiki (auth itd.)
}