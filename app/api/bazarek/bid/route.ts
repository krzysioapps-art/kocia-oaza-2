// app/api/bazarek/bid/route.ts

import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

import { createClient } from "@/lib/supabase/server";

export async function POST(
    request: Request
) {
    try {
        const body =
            await request.json();

        const {
            auctionSlug,
            auctionTitle,

            nick,
            email,

            amount,
        } = body;

        // =========================
        // VALIDATION
        // =========================

        if (
            !auctionSlug ||
            !auctionTitle ||
            !nick ||
            !email ||
            !amount
        ) {
            return NextResponse.json(
                {
                    error:
                        "Brak wymaganych danych",
                },
                {
                    status: 400,
                }
            );
        }

        // =========================
        // SUPABASE
        // =========================

        const supabase =
            await createClient();

        // pobierz najwyższą ofertę

        const {
            data: highestBid,
        } = await supabase
            .from("bids")
            .select("amount")
            .eq(
                "auction_slug",
                auctionSlug
            )
            .order("amount", {
                ascending: false,
            })
            .limit(1)
            .maybeSingle();

        const minimumBid =
            (highestBid?.amount ?? 0) + 1;

        if (amount < minimumBid) {
            return NextResponse.json(
                {
                    error: `Minimalna oferta to ${minimumBid} zł`,
                },
                {
                    status: 400,
                }
            );
        }

        // INSERT

        const { error } =
            await supabase
                .from("bids")
                .insert({
                    auction_slug:
                        auctionSlug,

                    nick,
                    email,

                    amount,
                });

        if (error) {
            console.error(error);

            return NextResponse.json(
                {
                    error:
                        "Nie udało się zapisać oferty",
                },
                {
                    status: 500,
                }
            );
        }

        // =========================
        // EMAIL
        // =========================

        const transporter =
            nodemailer.createTransport({
                service: "gmail",

                auth: {
                    user:
                        process.env.EMAIL_USER,

                    pass:
                        process.env.EMAIL_PASS,
                },
            });

        // =========================
        // MAIL ADMIN
        // =========================

        await transporter.sendMail({
            from: `"Kocia Oaza" <${process.env.EMAIL_USER}>`,

            to: "kocia.oaza.system@gmail.com",

            subject:
                "🐾 Nowa oferta w bazarku",

            html: `
        <h2>Nowa oferta ❤️</h2>

        <p><strong>Aukcja:</strong> ${auctionTitle}</p>

        <p><strong>Nick:</strong> ${nick}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Kwota:</strong> ${amount} zł</p>

        <hr />

        <p>
          https://kocia-oaza.pl/bazarek/${auctionSlug}
        </p>
      `,
        });

        // =========================
        // MAIL USER
        // =========================

        await transporter.sendMail({
            from: `"Kocia Oaza" <${process.env.EMAIL_USER}>`,

            to: email,

            subject:
                "❤️ Twoja oferta została złożona",

            html: `
<div
  style="
    background:#f5f5f5;
    padding:40px 20px;
    font-family:Arial,sans-serif;
  "
>
  <div
    style="
      max-width:600px;
      margin:0 auto;
      background:white;
      border-radius:24px;
      overflow:hidden;
      box-shadow:0 10px 30px rgba(0,0,0,0.06);
    "
  >
    <div
      style="
        background:#dff3f1;
        padding:32px;
        text-align:center;
      "
    >
      <img
        src="https://kocia-oaza.pl/kocia_oaza_sygnet.svg"
        alt="Kocia Oaza"
        width="120"
        style="margin-bottom:20px;"
      />

      <h1
        style="
          margin:0;
          font-size:32px;
          color:#111;
        "
      >
        Dziękujemy ❤️
      </h1>

      <p
        style="
          margin-top:12px;
          color:#444;
          font-size:16px;
        "
      >
        Twoja oferta została poprawnie złożona.
      </p>
    </div>

    <div style="padding:32px;">
      <div
        style="
          background:#f7f7f7;
          border-radius:18px;
          padding:24px;
          margin-bottom:24px;
        "
      >
        <p style="margin:0 0 12px;">
          <strong>Aukcja:</strong>
          ${auctionTitle}
        </p>

        <p style="margin:0;">
          <strong>Kwota:</strong>
          ${amount} zł
        </p>
      </div>

      <a
        href="https://kocia-oaza.pl/bazarek/${auctionSlug}"
        style="
          display:inline-block;
          padding:14px 24px;
          border-radius:999px;
          background:#3db7ad;
          color:white;
          text-decoration:none;
          font-weight:bold;
        "
      >
        Zobacz aukcję ❤️
      </a>

      <p
        style="
          margin-top:32px;
          font-size:14px;
          color:#777;
          line-height:1.6;
        "
      >
        Każda oferta pomaga ratować koty
        pod opieką Kociej Oazy 🐾
      </p>
    </div>
  </div>
</div>
`,
        });

        return NextResponse.json({
            success: true,
        });
    } catch (error: any) {
        console.error(
            "MAIL ERROR:",
            error
        );

        return NextResponse.json(
            {
                error:
                    error?.message ||
                    "Wystąpił błąd serwera",
            },
            {
                status: 500,
            }
        );
    }
}