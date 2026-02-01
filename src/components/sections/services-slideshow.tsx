"use client";

import { HoverSlider, HoverSliderImage, HoverSliderImageWrap, TextStaggerHover } from "@/components/ui/animated-slideshow";

const SLIDES = [
  { id: "slide-1", title: "Web Platforms", imageUrl: "https://images.unsplash.com/photo-1654618977232-a6c6dea9d1e8?q=80&w=2486&auto=format&fit=crop" },
  { id: "slide-2", title: "Blockchain", imageUrl: "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?q=80&w=2487&auto=format&fit=crop" },
  { id: "slide-3", title: "AI Systems", imageUrl: "https://images.unsplash.com/photo-1688733720228-4f7a18681c4f?q=80&w=2487&auto=format&fit=crop" },
  { id: "slide-4", title: "Cloud DevOps", imageUrl: "https://images.unsplash.com/photo-1574717025058-2f8737d2e2b7?q=80&w=2487&auto=format&fit=crop" },
  { id: "slide-5", title: "Security Audit", imageUrl: "https://images.unsplash.com/photo-1726066012698-bb7a3abce786?q=80&w=2487&auto=format&fit=crop" },
];

export function ServicesSlideshow() {
  return (
    <HoverSlider className="min-h-screen place-content-center p-6 md:px-12 bg-swarp-darker">
      <h3 className="mb-6 text-swarp-cyan text-xs font-medium uppercase tracking-wide">/ Our Services</h3>
      <div className="flex flex-wrap items-center justify-evenly gap-6 md:gap-12">
        <div className="flex flex-col space-y-2 md:space-y-4">
          {SLIDES.map((slide, index) => (
            <TextStaggerHover key={slide.title} index={index} className="cursor-pointer text-4xl font-bold uppercase tracking-tighter text-white" text={slide.title} />
          ))}
        </div>
        <HoverSliderImageWrap>
          {SLIDES.map((slide, index) => (
            <HoverSliderImage key={slide.id} index={index} imageUrl={slide.imageUrl} src={slide.imageUrl} alt={slide.title} className="size-full max-h-96 object-cover rounded-lg" />
          ))}
        </HoverSliderImageWrap>
      </div>
    </HoverSlider>
  );
}