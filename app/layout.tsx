import "@/app/style/root.css";

/* layout */
import "@/app/style/layout/navbar.css";
import "@/app/style/layout/topbar.css";
import "@/app/style/layout/footer.css";

/* UI (globalne komponenty) */
import "@/app/style/ui/card.css";
import "@/app/style/ui/modal.css";
import "@/app/style/ui/post.css";
import "@/app/style/ui/button-share.css";
import "@/app/style/ui/slider.css";

//import { DM_Sans, Quicksand } from "next/font/google";
import { Quicksand, Caveat } from "next/font/google";

const quicksand = Quicksand({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: '--font-quicksand',
  display: 'swap',
});

const caveat = Caveat({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata = {
  title: "Kocia Oaza",
  description: "Kocia Oaza - strona główna",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${quicksand.variable} ${caveat.variable}`}>
          {children}
      </body>
    </html>
  );
}