// app/components/sections/TipsPreview.tsx

import Container from "@/app/components/ui/Container";
import Heading from "@/app/components/ui/Heading";
import Button from "@/app/components/ui/Button";

import { ArrowRight } from "lucide-react";

import "@/app/style/home/tips-preview.css";

export default function TipsPreview() {
    return (
        <section className="section">
            <Container>

                {/* 🔥 CONTENT (to było brakujące) */}
                <div className="section__content">
                    <div className="tips-banner">
                        <picture>
                            <source media="(max-width: 768px)" srcSet="/tips-banner-yell-mobile.webp" />
                            <img
                                src="/tips-banner-yell.webp"
                                alt="Niepewny kot"
                                className="tips-banner__image"
                            />
                        </picture>



                        <div className="tips-banner__content">
                            <Heading level="lg">Jak zdobyć zaufanie kota?</Heading>

                            <p>
                                Daj mu przestrzeń, nie przyspieszaj. Pozwól obserwować
                                i samemu zdecydować, kiedy podejść.
                            </p>

                            <Button variant="primary" href="/porady">
                                Zobacz wszystkie porady
                                <ArrowRight size={16} />
                            </Button>
                        </div>
                    </div>
                </div>

            </Container>
        </section>
    );
}