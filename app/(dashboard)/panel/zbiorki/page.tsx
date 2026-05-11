// app/panel/zbiorki/page.tsx

import { getFundraisers } from "@/lib/supabase/fundraisers";

export default async function FundraisersAdminPage() {
  const fundraisers = await getFundraisers();

  return (
    <main className="container section">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
        }}
      >
        <div>
          <h1 className="heading heading--lg">
            Zarządzanie zbiórkami
          </h1>

          <p
            className="text"
            style={{
              marginTop: 8,
            }}
          >
            Dodawaj i ukrywaj aktywne zbiórki.
          </p>
        </div>

        <form
          action="/api/fundraisers/create"
          method="POST"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            maxWidth: 500,
            padding: 24,
            border: "1px solid #e5e5e5",
            borderRadius: 16,
          }}
        >
          <input
            name="title"
            placeholder="Tytuł zbiórki"
            required
            style={{
              height: 44,
              padding: "0 16px",
              borderRadius: 9999,
              border: "1px solid #e5e5e5",
            }}
          />

          <input
            name="slug"
            placeholder="slug-zbiorki"
            required
            style={{
              height: 44,
              padding: "0 16px",
              borderRadius: 9999,
              border: "1px solid #e5e5e5",
            }}
          />

          <button className="button button--primary">
            Dodaj zbiórkę
          </button>
        </form>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {fundraisers.map((item) => (
            <div
              key={item.id}
              style={{
                padding: 20,
                border: "1px solid #e5e5e5",
                borderRadius: 16,

                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <strong>{item.title}</strong>

                <span
                  style={{
                    opacity: 0.6,
                    fontSize: 14,
                  }}
                >
                  {item.slug}
                </span>

                <span
                  style={{
                    fontSize: 14,
                    color: item.is_active
                      ? "green"
                      : "#999",
                  }}
                >
                  {item.is_active
                    ? "Aktywna"
                    : "Ukryta"}
                </span>
              </div>

              <form
                action={`/api/fundraisers/toggle?id=${item.id}`}
                method="POST"
              >
                <button
                  className={`button ${
                    item.is_active
                      ? "button--secondary"
                      : "button--outline-secondary"
                  }`}
                >
                  {item.is_active
                    ? "Ukryj"
                    : "Aktywuj"}
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}