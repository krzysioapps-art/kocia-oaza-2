// app/koty/[slug]/loading.tsx

export default function Loading() {
  return (
    <main className="cat-page">

      {/* HERO */}
      <div className="cat-header">
        <div className="cat-header__top">
          <div className="container cat-header__center">

            <div className="skeleton skeleton-avatar" />

            <div className="skeleton skeleton-cat-name" />

            <div className="skeleton skeleton-age" />

          </div>
        </div>
      </div>

      {/* STICKY BAR */}
      <div className="cat-header__sticky">
        <div className="container cat-header__row">

          <div className="skeleton skeleton-tabs" />

          <div className="skeleton-actions">
            <div className="skeleton skeleton-button" />
            <div className="skeleton skeleton-button outline" />
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <section className="section section--alt cat-section">
        <div className="container">

          <div className="cat-layout">

            {/* SIDEBAR */}
            <aside className="cat-sidebar">

              <div className="card-base variant--primary">
                <div className="skeleton skeleton-sidebar-title" />

                <div className="skeleton skeleton-row" />
                <div className="skeleton skeleton-row" />
                <div className="skeleton skeleton-row" />
                <div className="skeleton skeleton-row short" />
              </div>

              <div className="card-base variant--tertiary">
                <div className="skeleton skeleton-sidebar-title" />

                <div className="skeleton skeleton-row" />
                <div className="skeleton skeleton-row" />
                <div className="skeleton skeleton-row" />
                <div className="skeleton skeleton-row short" />
              </div>

            </aside>

            {/* MAIN */}
            <section className="cat-main">

              <div className="card-base">
                <div className="skeleton skeleton-section-title" />

                <div className="skeleton skeleton-paragraph" />
                <div className="skeleton skeleton-paragraph" />
                <div className="skeleton skeleton-paragraph short" />
              </div>

              <div className="card-base">
                <div className="skeleton skeleton-section-title" />

                <div className="skeleton-media-grid">
                  <div className="skeleton skeleton-media" />
                  <div className="skeleton skeleton-media" />
                  <div className="skeleton skeleton-media" />
                </div>
              </div>

            </section>

          </div>
        </div>
      </section>
    </main>
  );
}