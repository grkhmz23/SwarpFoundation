import { Hero } from "@/components/hero";
import { IdeaSection } from "@/components/idea-section";
import { SwarpPresale } from "@/components/swarp-presale";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SwarpPresale />
      <IdeaSection />
    </main>
  );
}
