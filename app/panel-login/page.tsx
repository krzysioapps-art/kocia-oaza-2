export default function PanelLoginPage() {
    return (
        <main className="form-layout">
            <form
                action="/api/panel-login"
                method="POST"
                className="form-container"
                style={{
                    maxWidth: 420,
                    background: "#fff",
                    borderRadius: 24,
                    border: "1px solid #e5e5e5",

                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                }}
            >
                <div>
                    <h1 className="heading heading--lg">
                        Panel
                    </h1>

                    <p
                        style={{
                            marginTop: 8,
                            opacity: 0.7,
                        }}
                    >
                        Wprowadź hasło administratora.
                    </p>
                </div>

                <input
                    type="password"
                    name="password"
                    placeholder="Hasło"
                    required
                    style={{
                        height: 48,
                        padding: "0 16px",

                        borderRadius: 9999,
                        border: "1px solid #e5e5e5",
                    }}
                />

                <button className="button button--primary">
                    Zaloguj
                </button>
            </form>
        </main>
    );
}