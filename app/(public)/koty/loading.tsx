import "./cats-page.css";

export default function Loading() {
  return (
    <main className="cats-page">
      <section className="cats-page__hero">
        <div className="container">
          <div className="cats-page__hero-inner">
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                className="skeleton skeleton-title"
                style={{
                  width: 280,
                  height: 42,
                }}
              />

              <div
                className="skeleton skeleton-text"
                style={{
                  width: 460,
                  height: 20,
                  marginTop: 12,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="cats-page__content">
        <div className="container">
          <div
            className="skeleton"
            style={{
              width: "100%",
              height: 48,
              borderRadius: 14,
              marginBottom: 24,
            }}
          />

          <div className="public-cats__grid">
            {Array.from({
              length: 6,
            }).map((_, index) => (
              <div
                key={index}
                className="public-cat-card"
                style={{
                  overflow: "hidden",
                }}
              >
                <div
                  className="skeleton"
                  style={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                  }}
                />

                <div
                  className="public-cat-card__body"
                  style={{
                    padding: 18,
                  }}
                >
                  <div
                    className="skeleton"
                    style={{
                      width: "60%",
                      height: 24,
                      marginBottom: 10,
                    }}
                  />

                  <div
                    className="skeleton"
                    style={{
                      width: "40%",
                      height: 16,
                      marginBottom: 16,
                    }}
                  />

                  <div
                    className="skeleton"
                    style={{
                      width: "100%",
                      height: 14,
                      marginBottom: 8,
                    }}
                  />

                  <div
                    className="skeleton"
                    style={{
                      width: "75%",
                      height: 14,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}