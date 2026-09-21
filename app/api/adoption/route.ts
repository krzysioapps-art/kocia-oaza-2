import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email";

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const body = await req.json();

    const {
      cat_id,
      data,
      form_type,
    } = body;

    if (!data) {
      return Response.json(
        { error: "Brak danych formularza" },
        { status: 400 }
      );
    }

    // =========================
    // 1. ZAPIS ZGŁOSZENIA
    // =========================

    const {
      data: savedForm,
      error,
    } = await supabase
      .from("adoption_forms")
      .insert([
        {
          cat_id,
          data,
          form_type,
          status: "new",
        },
      ])
      .select("id")
      .single();

    if (error) {
      throw error;
    }

    // =========================
    // 2. POBIERZ NAZWĘ KOTA
    // =========================

    let catName = "Nie wskazano";

    if (cat_id) {
      const { data: cat } = await supabase
        .from("cats")
        .select("name")
        .eq("id", cat_id)
        .maybeSingle();

      if (cat?.name) {
        catName = cat.name;
      }
    }

    // =========================
    // 3. TYP ZGŁOSZENIA
    // =========================

    const formTypeLabel =
      form_type === "temporary"
        ? "Dom tymczasowy"
        : form_type === "adoption"
          ? "Adopcja"
          : form_type || "Nie określono";

    // =========================
    // 4. NAZWY PÓL
    // =========================

    const labels: Record<string, string> = {
      name: "Imię i nazwisko",
      email: "Email",
      phone: "Telefon",
      homeType: "Typ mieszkania",
      balcony: "Balkon",
      secured: "Zabezpieczenie balkonu",
      people: "Liczba osób",
      children: "Dzieci",
      childrenAge: "Wiek dzieci",
      agreement: "Zgoda domowników",
      aloneTime: "Czas samotności kota",
      experience: "Doświadczenie z kotami",
      experienceDesc: "Opis doświadczenia",
      reason: "Powód adopcji",
    };

    const rows = Object.entries(data)
      .map(([key, value]) => {
        let displayValue = value;

        // Czytelniejsze wartości w mailu
        if (key === "homeType") {
          displayValue =
            value === "flat"
              ? "Mieszkanie"
              : value === "house"
                ? "Dom"
                : value;
        }

        if (key === "balcony") {
          displayValue =
            value === "yes"
              ? "Tak"
              : value === "no"
                ? "Nie"
                : value;
        }

        if (key === "secured") {
          displayValue =
            value === "yes"
              ? "Tak"
              : value === "no"
                ? "Zabezpieczę"
                : value;
        }

        if (key === "children") {
          displayValue =
            value === "yes"
              ? "Tak"
              : value === "no"
                ? "Nie"
                : value;
        }

        if (key === "agreement") {
          displayValue =
            value === "yes"
              ? "Tak"
              : value === "no"
                ? "Nie"
                : value;
        }

        if (key === "experience") {
          displayValue =
            value === "yes"
              ? "Tak, ma doświadczenie"
              : value === "no"
                ? "Nie, pierwszy kot"
                : value;
        }

        if (key === "aloneTime" && value) {
          displayValue = `${value} h`;
        }

        return `
          <tr>
            <td style="
              padding:10px;
              border-bottom:1px solid #eee;
              font-weight:600;
              vertical-align:top;
              width:35%;
            ">
              ${escapeHtml(labels[key] ?? key)}
            </td>

            <td style="
              padding:10px;
              border-bottom:1px solid #eee;
              white-space:pre-wrap;
            ">
              ${escapeHtml(displayValue)}
            </td>
          </tr>
        `;
      })
      .join("");

    // =========================
    // 5. LINK DO PANELU
    // =========================

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const panelUrl =
      `${siteUrl}/panel/zgloszenia`;

    // =========================
    // 6. WYŚLIJ MAIL
    // =========================

    try {
      await sendEmail({
        to:
          process.env.ADMIN_EMAIL ||
          process.env.GMAIL_USER!,

        subject:
          `🐱 Nowe zgłoszenie — ${catName}`,

        html: `
          <div style="
            font-family:Arial,sans-serif;
            max-width:700px;
            margin:0 auto;
            color:#333;
          ">

            <div style="
              background:#3db7ad;
              padding:24px;
              border-radius:12px 12px 0 0;
              color:white;
            ">
              <h1 style="
                margin:0;
                font-size:24px;
              ">
                🐱 Nowe zgłoszenie
              </h1>

              <p style="
                margin:8px 0 0;
              ">
                Kocia Oaza
              </p>
            </div>

            <div style="
              padding:24px;
              border:1px solid #eee;
              border-top:0;
              border-radius:0 0 12px 12px;
            ">

              <div style="
                background:#f7f7f7;
                padding:16px;
                border-radius:10px;
                margin-bottom:24px;
              ">

                <p style="margin:4px 0;">
                  <strong>Kot:</strong>
                  ${escapeHtml(catName)}
                </p>

                <p style="margin:4px 0;">
                  <strong>Typ zgłoszenia:</strong>
                  ${escapeHtml(formTypeLabel)}
                </p>

                <p style="margin:4px 0;">
                  <strong>ID zgłoszenia:</strong>
                  ${escapeHtml(savedForm?.id)}
                </p>

              </div>

              <h2>
                Dane zgłoszenia
              </h2>

              <table style="
                width:100%;
                border-collapse:collapse;
                font-size:14px;
              ">
                ${rows}
              </table>

              <div style="
                margin-top:28px;
              ">
                <a
                  href="${escapeHtml(panelUrl)}"
                  style="
                    display:inline-block;
                    background:#3db7ad;
                    color:white;
                    text-decoration:none;
                    padding:12px 20px;
                    border-radius:8px;
                    font-weight:600;
                  "
                >
                  Otwórz panel zgłoszeń
                </a>
              </div>

            </div>
          </div>
        `,
      });
    } catch (emailError) {
      // Zgłoszenie jest już zapisane w Supabase.
      // Błąd maila nie może spowodować
      // ponownego wysłania formularza.
      console.error(
        "EMAIL SEND ERROR:",
        emailError
      );
    }

    // =========================
    // 7. SUKCES
    // =========================

    return Response.json({
      success: true,
      id: savedForm?.id,
    });

  } catch (error) {
    console.error(
      "ADOPTION API ERROR:",
      error
    );

    return Response.json(
      {
        error: "Błąd zapisu",
      },
      {
        status: 500,
      }
    );
  }
}