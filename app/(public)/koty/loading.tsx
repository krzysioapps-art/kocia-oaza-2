// app/koty/loading.tsx

export default function Loading() {
  return (
    <main>
      <section className="page-header">
        <div className="container">
          <div className="page-header__inner">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-text" />
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <div className="cats-grid cats-grid--loading">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="card card-base skeleton-card"
              >
                <div className="skeleton skeleton-image" />

                <div className="card__body">
                  <div className="skeleton skeleton-badge" />
                  <div className="skeleton skeleton-line" />
                  <div className="skeleton skeleton-line short" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}