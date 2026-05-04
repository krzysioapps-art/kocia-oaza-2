import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse("<html><head><title>OK</title></head><body>OK</body></html>", {
    headers: {
      "content-type": "text/html",
    },
  });
}