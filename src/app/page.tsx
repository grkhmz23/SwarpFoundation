import { Hero } from "@/components/hero";
import { IdeaSection } from "@/components/idea-section";
import { SwarpPresale } from "@/components/swarp-presale";

export default function HomePage() {
  return (
    <main className="relative overflow-x-clip">
      <Hero />
      <div className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-cyan-400/8 to-transparent" />
        <SwarpPresale />
      </div>
      <div className="relative pt-2 md:pt-4">
        <IdeaSection />
      </div>
    </main>
  );
}
