"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";

interface IMacFrameProps {
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
  className?: string;
}

export function IMacFrame({ children, title = "Swarp Services", onClose, className }: IMacFrameProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`relative w-full ${className}`}>
      {/* Outer glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-[40px] blur-2xl opacity-50" />

      {/* iMac Body */}
      <div className="relative">
        {/* Screen bezel */}
        <div 
          className="relative rounded-[24px] overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #2a2a2e 0%, #1a1a1c 100%)",
            padding: "12px 12px 0 12px",
            boxShadow: `
              0 50px 100px -20px rgba(0, 0, 0, 0.8),
              0 30px 60px -30px rgba(0, 0, 0, 0.6),
              inset 0 1px 0 rgba(255, 255, 255, 0.1),
              inset 0 -1px 0 rgba(0, 0, 0, 0.3)
            `,
          }}
        >
          {/* Top bezel with camera */}
          <div className="flex items-center justify-center py-2 relative">
            {/* Camera */}
            <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
            </div>
          </div>

          {/* Screen area */}
          <div 
            className="relative rounded-t-lg overflow-hidden bg-black"
            style={{
              boxShadow: "inset 0 0 30px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* macOS Window Controls */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-gray-900/95 to-gray-900/90 backdrop-blur-sm border-b border-gray-700/50">
              <div className="flex items-center justify-between px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 transition-colors group flex items-center justify-center"
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-[8px] text-black/60 font-bold">×</span>
                  </button>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs font-medium text-gray-400">{title}</span>
                <div className="w-16" /> {/* Spacer for balance */}
              </div>
            </div>

            {/* Scrollable content area */}
            <div 
              ref={scrollRef}
              className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-cyan-500/30 hover:scrollbar-thumb-cyan-500/50"
              style={{ 
                height: "calc(75vh - 120px)",
                minHeight: "500px",
                maxHeight: "700px",
              }}
            >
              <div className="pt-12">
                {children}
              </div>
            </div>

            {/* Screen reflection overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)",
              }}
            />
          </div>
        </div>

        {/* Chin / Bottom bezel */}
        <div 
          className="relative mx-auto rounded-b-[24px]"
          style={{
            background: "linear-gradient(180deg, #1a1a1c 0%, #0f0f10 100%)",
            height: "32px",
            boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Apple logo area */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2">
            <div className="w-6 h-6 rounded-full bg-gray-800/50 flex items-center justify-center">
              <span className="text-[10px] text-gray-600">⌘</span>
            </div>
          </div>
        </div>

        {/* Stand neck */}
        <div className="flex justify-center -mt-1">
          <div 
            className="relative"
            style={{
              width: "80px",
              height: "60px",
              background: "linear-gradient(180deg, #1a1a1c 0%, #2a2a2e 50%, #1a1a1c 100%)",
              clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
              boxShadow: "inset -5px 0 10px rgba(0,0,0,0.3), inset 5px 0 10px rgba(255,255,255,0.05)",
            }}
          />
        </div>

        {/* Stand base */}
        <div className="flex justify-center -mt-1">
          <div 
            className="relative"
            style={{
              width: "180px",
              height: "12px",
              background: "linear-gradient(180deg, #2a2a2e 0%, #1a1a1c 100%)",
              borderRadius: "0 0 50% 50% / 0 0 100% 100%",
              boxShadow: `
                0 4px 15px rgba(0, 0, 0, 0.5),
                inset 0 1px 0 rgba(255, 255, 255, 0.1)
              `,
            }}
          />
        </div>

        {/* Stand shadow */}
        <div className="flex justify-center mt-2">
          <div 
            className="w-48 h-4 rounded-full opacity-30"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.8) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default IMacFrame;