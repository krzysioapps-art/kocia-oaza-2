import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";

  if (
    ua.includes("facebookexternalhit") ||
    ua.includes("Facebot")
  ) {
    return NextResponse.next();
  }

  return NextResponse.next();
}