import { Hero } from "@/components/sections/hero";
import { IdeaSection } from "@/components/sections/idea-section";
import { AetherBackground } from "@/components/ui/aether-hero";

export default function Home() {
  return (
    <AetherBackground>
      <Hero />
      <IdeaSection />
    </AetherBackground>
  );
}
