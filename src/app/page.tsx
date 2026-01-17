import dynamic from 'next/dynamic';
import { Hero } from "@/components/sections/hero";

const Projects = dynamic(() => import('@/components/sections/projects'), {
  loading: () => <div className="h-screen" />
});
const WhatWeBuild = dynamic(() => import('@/components/sections/what-we-build'));

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <WhatWeBuild />
    </>
  );
}
