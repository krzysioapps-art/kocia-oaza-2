import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") || "";

  if (
    ua.includes("facebookexternalhit") ||
    ua.includes("Facebot")
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}