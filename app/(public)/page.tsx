import Hero from "@/app/components/sections/Hero";
import HowWeHelp from "@/app/components/sections/HowWeHelp";
import CatsSection from "../components/sections/CatsSection";
import HelpSection from "../components/sections/HelpSection";
import TipsSection from "@/app/components/sections/TipsSection";
import AdoptionFlow from "@/app/components/sections/AdoptionFlow";
import FinalCTA from "@/app/components/sections/FinalCTA";
import NewsSection from "../components/sections/NewsSection";

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