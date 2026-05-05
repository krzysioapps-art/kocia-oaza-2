import "@/app/style/how-we-help.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="how-we-help-page">
      {children}
    </main>
  );
}