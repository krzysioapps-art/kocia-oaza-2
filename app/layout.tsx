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

import { Quicksand, Caveat } from "next/font/google";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://kocia-oaza.pl"),

  title: {
    default: "Kocia Oaza",
    template: "%s | Kocia Oaza",
  },

  description:
    "Kocia Oaza pomaga kotom znaleźć bezpieczne domy. Poznaj koty do adopcji, wesprzyj działania i dowiedz się, jak możesz pomóc.",

  keywords: [
    "adopcja kotów",
    "koty do adopcji",
    "fundacja kotów",
    "dom tymczasowy dla kota",
    "pomoc kotom",
    "Warszawa",
    "Kocia Oaza",
  ],

  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: "https://kocia-oaza.pl",
    siteName: "Kocia Oaza",
    title: "Kocia Oaza",
    description:
      "Pomagamy kotom znaleźć bezpieczne i kochające domy.",
    images: [
      {
        url: "/hero-bg12.webp",
        width: 1200,
        height: 630,
        alt: "Kocia Oaza",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Kocia Oaza",
    description:
      "Pomagamy kotom znaleźć bezpieczne i kochające domy.",
    images: ["/hero-bg12.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={`${quicksand.variable} ${caveat.variable}`}>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AnimalShelter",
              name: "Kocia Oaza",
              url: "https://kocia-oaza.pl",
              logo: "https://kocia-oaza.pl/kocia_oaza_sygnet.svg",
              email: "kocia.oaza@gmail.com",
              areaServed: "Warszawa",
              sameAs: [
                "https://www.facebook.com/Kociooaza",
                "https://www.instagram.com/kociaoaza/",
                "https://www.tiktok.com/@kocia.oaza",
              ],
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}