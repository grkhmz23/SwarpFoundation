"use client";

import { BellNotify } from "@/components/ui/bell-notify";

export function IdeaSection() {
  return (
    <section className="relative w-full bg-black overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-swarp-darker via-black to-swarp-darker" />

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,255,240,0.15) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Bell container */}
      <div className="relative h-[700px] md:h-[800px] flex items-center justify-center">
        <BellNotify 
          size={400}
          buttonLabel="Got an idea? Check our services"
          buttonHref="/services"
          rotationAmplitude={0.6}
        />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-swarp-darker to-transparent" />
    </section>
  );
}

export default IdeaSection;