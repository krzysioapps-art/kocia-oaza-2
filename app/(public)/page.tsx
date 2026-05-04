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