import "@/app/style/dom-tymczasowy.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="temporary-home-page">
      {children}
    </main>
  );
}