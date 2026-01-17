// src/app/page.tsx
import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/hero";

const Projects = dynamic(() => 
  import('@/components/sections/projects').then(mod => mod.Projects || mod.default), 
  { loading: () => <div className="h-screen" /> }
);

const WhatWeBuild = dynamic(() => 
  import('@/components/sections/what-we-build').then(mod => mod.WhatWeBuild || mod.default)
);

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <WhatWeBuild />
    </>
  );
}