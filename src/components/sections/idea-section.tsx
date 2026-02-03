"use client";

import { useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { BellNotify } from "@/components/ui/bell-notify";
import { KeyboardLink } from "@/components/ui/keyboard-button";
import { ArrowRight } from "lucide-react";

export function IdeaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isTargetVisible = useInView(sectionRef, { amount: 0.6, once: false });

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full overflow-hidden min-h-[800px] flex items-center justify-center"
    >
      {/* 1. The Room Glow (Ambient) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ease-out pointer-events-none ${
          isTargetVisible ? "opacity-30" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle at 50% 40%, #22d3ee 0%, transparent 60%)`,
        }}
      />

      <div className="relative flex flex-col items-center justify-center z-10 w-full">
        {/* 2. The Lamp / Bell */}
        <div className="relative mb-24">
          {isTargetVisible && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full"
            />
          )}
          <BellNotify 
            size={400}
            isOn={isTargetVisible}
            showButton={false}
            rotationAmplitude={isTargetVisible ? 0.6 : 0}
            disableToggle={true}
          />
        </div>

        {/* 3. The Staggered Text Reveal */}
        <div className="text-center px-4 h-[200px] mt-24">
          <AnimatePresence>
            {isTargetVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  Got an <span className="text-cyan-400">Idea</span>?
                </h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-8"
                >
                  Check our services hub to make your idea a reality.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <KeyboardLink
                    href="/services"
                    variant="primary"
                    size="lg"
                    icon={<ArrowRight className="w-5 h-5" />}
                  >
                    Explore Services
                  </KeyboardLink>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default IdeaSection;