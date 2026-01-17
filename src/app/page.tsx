import { Hero } from "@/components/sections/hero";
import { WhatWeBuild } from "@/components/sections/what-we-build";
import { SwarpPaySpotlight } from "@/components/sections/swarppay-spotlight";
import { CapabilitiesTimeline } from "@/components/sections/capabilities-timeline";
import { Metrics } from "@/components/sections/metrics";
import { CaseStudies } from "@/components/sections/case-studies";
import { EcosystemPartners } from "@/components/sections/ecosystem-partners";
import { Security } from "@/components/sections/security";
import { Careers } from "@/components/sections/careers";
import { FinalCTA } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhatWeBuild />
      <SwarpPaySpotlight />
      <CapabilitiesTimeline />
      <Metrics />
      <CaseStudies />
      <EcosystemPartners />
      <Security />
      <Careers />
      <FinalCTA />
    </main>
  );
}
