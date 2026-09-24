export default function Loading() {
    return (
        <main className="cat-page">

            <header className="cat-profile-header">
                <div className="container">
                    <div className="cat-profile-header__inner">

                        <div className="skeleton skeleton-avatar" />

                        <div className="skeleton skeleton-cat-name" />

                        <div className="skeleton skeleton-age" />

                    </div>
                </div>
            </header>

            <div className="cat-header__sticky">
                <div className="container cat-header__row">

                    <div className="skeleton skeleton-tabs" />

                    <div className="skeleton-actions">
                        <div className="skeleton skeleton-button" />
                        <div className="skeleton skeleton-button outline" />
                    </div>

                </div>
            </div>

            <section className="section section--alt cat-section">
                <div className="container">

                    <div className="cat-layout">

                        <aside className="cat-sidebar">

                            <div className="cat-info-block">
                                <div className="skeleton skeleton-sidebar-title" />

                                <div className="skeleton skeleton-row" />
                                <div className="skeleton skeleton-row" />
                                <div className="skeleton skeleton-row" />
                                <div className="skeleton skeleton-row short" />
                            </div>

                            <div className="cat-info-block">
                                <div className="skeleton skeleton-sidebar-title" />

                                <div className="skeleton skeleton-row" />
                                <div className="skeleton skeleton-row" />
                                <div className="skeleton skeleton-row" />
                                <div className="skeleton skeleton-row short" />
                            </div>

                        </aside>

                        <section className="cat-main">

                            <div className="cat-story">
                                <div className="skeleton skeleton-section-title" />

                                <div className="skeleton skeleton-paragraph" />
                                <div className="skeleton skeleton-paragraph" />
                                <div className="skeleton skeleton-paragraph short" />
                            </div>

                            <div className="cat-media">
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