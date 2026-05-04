import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(`
    <html>
      <head>
        <meta property="og:title" content="Kocia Oaza" />
        <meta property="og:description" content="Adoptuj kota" />
        <meta property="og:image" content="https://res.cloudinary.com/..." />
      </head>
    </html>
  `, {
    headers: { "content-type": "text/html" },
  });
}