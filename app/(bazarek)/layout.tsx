// app/(bazarek)/layout.tsx

import "@/app/style/bazarek/auction-card.css";
import "@/app/style/bazarek/auction-gallery.css";
import "@/app/style/bazarek/auction-grid.css";
import "@/app/style/bazarek/auction.css";
import "@/app/style/bazarek/bid-modal.css";
import "@/app/style/bazarek/countdown.css";

import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

type Props = {
  children: React.ReactNode;
};

export default function BazarekLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="bazarek-layout">
        {children}
      </main>
      <Footer />
    </>
  );
}