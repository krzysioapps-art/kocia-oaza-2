import type { Metadata } from "next";

import HomeClient from "./HomeClient";

import "./page.css";

export const metadata: Metadata = {
  title: "Kocia Oaza | Adopcja kotów i pomoc bezdomnym kotom",
  description:
    "Poznaj koty do adopcji, wspieraj działania Kociej Oazy i pomóż bezdomnym kotom znaleźć bezpieczny dom.",
  alternates: {
    canonical: "https://kocia-oaza.pl",
  },
  openGraph: {
    title: "Kocia Oaza | Adopcja kotów i pomoc bezdomnym kotom",
    description:
      "Poznaj koty do adopcji, wspieraj działania Kociej Oazy i pomóż bezdomnym kotom znaleźć bezpieczny dom.",
    url: "https://kocia-oaza.pl",
    siteName: "Kocia Oaza",
    locale: "pl_PL",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main>
      <HomeClient />
    </main>
  );
}