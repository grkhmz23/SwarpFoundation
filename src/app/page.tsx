// src/app/page.tsx
import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/hero";
import { ServicesSlideshow } from "@/components/sections/services-slideshow";

const Projects = dynamic(() => 
  import('@/components/sections/projects').then(mod => ({ default: mod.Projects })), 
  { loading: () => <div className="h-screen" /> }
);
const WhatWeBuild = dynamic(() => 
  import('@/components/sections/what-we-build').then(mod => ({ default: mod.WhatWeBuild }))
);

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSlideshow />
      <Projects />
      <WhatWeBuild />
    </>
  );
}