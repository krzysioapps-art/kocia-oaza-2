import type { Metadata } from "next";

import Hero from "@/app/components/sections/Hero";
import HowWeHelp from "@/app/components/sections/HowWeHelp";
import CatsSection from "../components/sections/CatsSection";
import HelpSection from "../components/sections/HelpSection";
import TipsSection from "@/app/components/sections/TipsSection";
import AdoptionFlow from "@/app/components/sections/AdoptionFlow";
import FinalCTA from "@/app/components/sections/FinalCTA";
import NewsSection from "../components/sections/NewsSection";

import "@/app/style/home/hero.css";
import "@/app/style/home/adoption-flow.css";
import "@/app/style/home/cats-section.css";
import "@/app/style/home/help-section.css";
import "@/app/style/home/how-we-help.css";
import "@/app/style/home/stats.css";
import "@/app/style/home/tips-preview.css";

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
      <Hero />
      <HowWeHelp />
      <NewsSection />

      <HelpSection />
      <CatsSection />

      <AdoptionFlow />
      <TipsSection />

      <FinalCTA />
    </main>
  );
}