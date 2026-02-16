"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function SwarpPresale() {
  return (
    <section className="py-16 md:py-24 relative backdrop-blur-sm">
      <div className="max-w-[720px] mx-auto px-4">
        <motion.a
          href="https://swarppay.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="block relative group cursor-pointer"
          whileHover={{ scale: 1.02 }}
        >
          {/* SVG Schematic */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 80 1080 920"
            role="img"
            aria-label="SWARP Luxury Utility Schematic"
            className="w-full h-auto max-h-[600px] md:max-h-[700px] object-contain"
          >
            <defs>
              <radialGradient id="auroraTopLeft" cx="0" cy="0" r="1">
                <stop offset="0%" stopColor="#9D4EDD" stopOpacity="0.12"/>
                <stop offset="100%" stopColor="#050714" stopOpacity="0"/>
              </radialGradient>
              <radialGradient id="auroraBottomRight" cx="1" cy="1" r="1">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.12"/>
                <stop offset="100%" stopColor="#050714" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="glassBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.6"/>
                <stop offset="20%" stopColor="#00D4FF" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#9D4EDD" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#00FFF0" stopOpacity="0.4"/>
              </linearGradient>
              <linearGradient id="glassSurface" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0A0E27" stopOpacity="0.85"/>
                <stop offset="100%" stopColor="#050714" stopOpacity="0.95"/>
              </linearGradient>
              <linearGradient id="dataFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00D4FF" stopOpacity="0"/>
                <stop offset="50%" stopColor="#9D4EDD"/>
                <stop offset="100%" stopColor="#00FFF0"/>
              </linearGradient>
              <linearGradient id="presaleHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FFF0" stopOpacity="0.1"/>
                <stop offset="100%" stopColor="#00FFF0" stopOpacity="0"/>
              </linearGradient>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="10" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
              </filter>
              <filter id="coreGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="noiseFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
                <feColorMatrix type="saturate" values="0"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.08"/>
                </feComponentTransfer>
                <feComposite operator="in" in2="SourceGraphic" result="grain"/>
                <feComposite operator="over" in="SourceGraphic" in2="grain"/>
              </filter>
              <pattern id="dotGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#FFFFFF" fillOpacity="0.03"/>
              </pattern>
              <filter id="logoGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="logoGlowHover" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="15" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <style>
                {`.sans-bold { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 800; letter-spacing: -0.02em; }
                .sans-med { font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-weight: 500; letter-spacing: 0.02em; }
                .mono { font-family: 'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace; font-weight: 400; letter-spacing: 0.05em; }
                @keyframes pulse { 0% { opacity: 0.6; } 50% { opacity: 1; } 100% { opacity: 0.6; } }
                .pulsing { animation: pulse 3s infinite ease-in-out; }`}
              </style>
            </defs>
            <rect width="1080" height="1080" fill="#050714" fillOpacity="0.15"/>
            <circle cx="0" cy="0" r="800" fill="url(#auroraTopLeft)" opacity="0.3"/>
            <circle cx="1080" cy="1080" r="800" fill="url(#auroraBottomRight)" opacity="0.3"/>
            <rect width="1080" height="1080" fill="url(#dotGrid)"/>
            <g fill="none" strokeLinecap="round">
              <path d="M 255 520 C 350 520, 380 540, 540 540" stroke="url(#dataFlow)" strokeWidth="2" opacity="0.4"/>
              <path d="M 255 520 C 350 520, 380 540, 540 540" stroke="#00D4FF" strokeWidth="6" opacity="0.1"/>
              <path d="M 825 520 C 730 520, 700 540, 540 540" stroke="url(#dataFlow)" strokeWidth="2" opacity="0.4" transform="scale(-1, 1) translate(-1080, 0)"/>
              <path d="M 540 820 C 540 700, 540 680, 540 640" stroke="url(#dataFlow)" strokeWidth="2" opacity="0.5"/>
            </g>
            <g filter="url(#noiseFilter)">
              <g transform="translate(540, 540)">
                <circle r="180" fill="none" stroke="#2a2e45" strokeWidth="1" strokeDasharray="4 6" opacity="0.5"/>
                <circle r="140" fill="none" stroke="url(#glassBorder)" strokeWidth="1.5" opacity="0.3"/>
                <g opacity="0.6">
                  <path d="M 0 -160 L 0 -170" stroke="#00FFF0" strokeWidth="2"/>
                  <path d="M 0 160 L 0 170" stroke="#00FFF0" strokeWidth="2"/>
                  <path d="M -160 0 L -170 0" stroke="#9D4EDD" strokeWidth="2"/>
                  <path d="M 160 0 L 170 0" stroke="#9D4EDD" strokeWidth="2"/>
                </g>
                <g filter="url(#softGlow)">
                  <rect x="-110" y="-110" width="220" height="220" rx="40" fill="url(#glassSurface)" stroke="url(#glassBorder)" strokeWidth="2"/>
                  <rect x="-106" y="-106" width="212" height="212" rx="38" fill="none" stroke="#000000" strokeWidth="2" opacity="0.5"/>
                </g>
                <circle r="60" fill="none" filter="url(#coreGlow)"/>
                <rect x="-60" y="35" width="120" height="20" rx="4" fill="#00FFF0" fillOpacity="0.1"/>
                <text className="mono pulsing" x="0" y="49" textAnchor="middle" fill="#00FFF0" fontSize="11" fontWeight="700">PRESALE SOON</text>
                <path d="M -40 -60 L -50 -60 L -50 -50" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.5"/>
                <path d="M 40 -60 L 50 -60 L 50 -50" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.5"/>
                <path d="M -40 85 L -50 85 L -50 75" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.5"/>
                <path d="M 40 85 L 50 85 L 50 75" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.5"/>
              </g>
              <g transform="translate(90, 410)">
                <defs>
                  <filter id="dropShadow1" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="15" stdDeviation="20" floodColor="#000000" floodOpacity="0.6"/>
                  </filter>
                </defs>
                <rect width="330" height="220" rx="24" fill="url(#glassSurface)" filter="url(#dropShadow1)"/>
                <rect width="330" height="220" rx="24" fill="none" stroke="url(#glassBorder)" strokeWidth="1.5"/>
                <rect x="24" y="24" width="40" height="40" rx="12" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.3)"/>
                <path d="M 44 36 L 52 52 H 36 L 44 36 Z" fill="#00D4FF" filter="url(#coreGlow)"/>
                <text className="mono" x="80" y="42" fill="#00D4FF" fontSize="11" opacity="0.8">01 /// DISTRIBUTE</text>
                <text className="sans-bold" x="80" y="62" fill="white" fontSize="20">Airdrops</text>
                <line x1="24" y1="85" x2="306" y2="85" stroke="white" strokeOpacity="0.1"/>
                <g transform="translate(24, 120)">
                  <circle cx="4" cy="-4" r="2" fill="#00D4FF"/>
                  <text className="sans-med" x="16" y="0" fill="white" fontSize="16" opacity="0.9">Ecosystem Rewards</text>
                  <circle cx="4" cy="26" r="2" fill="#00D4FF"/>
                  <text className="sans-med" x="16" y="30" fill="white" fontSize="16" opacity="0.9">Campaign Access</text>
                  <circle cx="4" cy="56" r="2" fill="#00D4FF"/>
                  <text className="sans-med" x="16" y="60" fill="white" fontSize="16" opacity="0.9">Active Bonuses</text>
                </g>
              </g>
              <g transform="translate(660, 410)">
                <rect width="330" height="220" rx="24" fill="url(#glassSurface)" filter="url(#dropShadow1)"/>
                <rect width="330" height="220" rx="24" fill="none" stroke="url(#glassBorder)" strokeWidth="1.5"/>
                <rect x="24" y="24" width="40" height="40" rx="12" fill="rgba(157,78,221,0.1)" stroke="rgba(157,78,221,0.3)"/>
                <path d="M 44 34 A 8 8 0 1 1 36 44" fill="none" stroke="#9D4EDD" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M 44 30 L 44 38" stroke="#9D4EDD" strokeWidth="2.5" strokeLinecap="round"/>
                <text className="mono" x="80" y="42" fill="#9D4EDD" fontSize="11" opacity="0.8">02 /// RETURN</text>
                <text className="sans-bold" x="80" y="62" fill="white" fontSize="20">Cashback</text>
                <line x1="24" y1="85" x2="306" y2="85" stroke="white" strokeOpacity="0.1"/>
                <g transform="translate(24, 120)">
                  <circle cx="4" cy="-4" r="2" fill="#9D4EDD"/>
                  <text className="sans-med" x="16" y="0" fill="white" fontSize="16" opacity="0.9">Activity Rebates</text>
                  <circle cx="4" cy="26" r="2" fill="#9D4EDD"/>
                  <text className="sans-med" x="16" y="30" fill="white" fontSize="16" opacity="0.9">Loyalty Multipliers</text>
                  <circle cx="4" cy="56" r="2" fill="#9D4EDD"/>
                  <text className="sans-med" x="16" y="60" fill="white" fontSize="16" opacity="0.9">Instant Settlement</text>
                </g>
              </g>
              <g transform="translate(365, 820)">
                <rect width="350" height="100" rx="24" fill="url(#glassSurface)" filter="url(#dropShadow1)"/>
                <rect width="350" height="100" rx="24" fill="none" stroke="url(#glassBorder)" strokeWidth="1.5"/>
                <rect x="24" y="30" width="40" height="40" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)"/>
                <rect x="34" y="40" width="9" height="9" fill="#FFFFFF"/>
                <rect x="45" y="40" width="9" height="9" fill="#FFFFFF" opacity="0.5"/>
                <rect x="34" y="51" width="9" height="9" fill="#FFFFFF" opacity="0.5"/>
                <rect x="45" y="51" width="9" height="9" fill="#FFFFFF" opacity="0.2"/>
                <text className="mono" x="80" y="48" fill="#FFFFFF" fontSize="11" opacity="0.6">03 /// EXPAND</text>
                <text className="sans-bold" x="80" y="70" fill="white" fontSize="20">Ecosystem Bonuses</text>
                <rect x="260" y="40" width="60" height="20" rx="10" fill="rgba(0,255,240,0.1)"/>
                <text className="mono" x="290" y="54" textAnchor="middle" fill="#00FFF0" fontSize="10">ACTIVE</text>
              </g>
              <g transform="translate(200, 100)">
                <path d="M 0 0 L 20 0 L 25 5 L 20 10 L 0 10 Z" fill="#00D4FF"/>
                <text className="sans-bold" x="35" y="10" fill="white" fontSize="24" letterSpacing="0.1em">SWARP</text>
                <text className="mono" x="135" y="10" fill="#00FFF0" fontSize="14" opacity="0.9" fontWeight="700">{`/// PRESALE_INIT_SOON`}</text>
              </g>
              <g transform="translate(580, 80)">
                <path d="M 260 0 L 260 80 L 20 80 L 0 60 L 0 0 Z" fill="url(#glassSurface)" stroke="url(#glassBorder)" strokeWidth="1"/>
                <path d="M 0 60 L 20 80" stroke="#00FFF0" strokeWidth="2" opacity="0.5"/>
                <rect x="0" y="0" width="260" height="2" fill="#00FFF0"/>
                <g transform="translate(20, 30)">
                  <text className="mono" x="0" y="0" fill="#00FFF0" fontSize="10" letterSpacing="0.1em">TOKEN PRICE</text>
                  <text className="sans-bold" x="0" y="20" fill="white" fontSize="18">$0.03 <tspan fill="#555" fontSize="14" fontWeight="400">/ SWARP</tspan></text>
                  <line x1="110" y1="-5" x2="110" y2="25" stroke="white" strokeOpacity="0.1"/>
                  <text className="mono" x="130" y="0" fill="#9D4EDD" fontSize="10" letterSpacing="0.1em">ALLOCATION</text>
                  <text className="sans-bold" x="130" y="20" fill="white" fontSize="18">50,000,000</text>
                </g>
              </g>
              <g transform="translate(200, 1000)">
                <text className="mono" x="0" y="0" fill="#555" fontSize="12">SCHEMATIC RENDER [1080x1080] • NO FINANCIAL ADVICE</text>
                <text className="mono" x="680" y="0" textAnchor="end" fill="#555" fontSize="12">DESIGNED BY SWARP</text>
              </g>
            </g>
            <radialGradient id="vignetteOverlay" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="#000" stopOpacity="0"/>
              <stop offset="100%" stopColor="#050714" stopOpacity="0.6"/>
            </radialGradient>
            <rect width="1080" height="1080" fill="url(#vignetteOverlay)"/>
          </svg>

          {/* Overlaid Logo - Positioned higher in reactor area */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+35px)] w-[100px] h-[100px] md:w-[140px] md:h-[140px]">
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glow effect container - transparent background */}
              <div className="absolute inset-0 rounded-full bg-transparent transition-all duration-300 group-hover:shadow-[0_0_50px_rgba(0,212,255,0.8)] shadow-[0_0_30px_rgba(0,212,255,0.6)] pointer-events-none" />
              <Image
                src="/logo_transparent.png"
                alt="SWARP Logo"
                width={140}
                height={140}
                className="object-contain drop-shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all duration-300 group-hover:drop-shadow-[0_0_35px_rgba(0,212,255,0.9)]"
                priority
              />
            </motion.div>
          </div>
        </motion.a>

        {/* Tap to learn more text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-6 font-mono text-xs md:text-sm text-[#00FFF0]/60"
        >
          Tap to learn more about SWARP Token
        </motion.p>
      </div>
    </section>
  );
}
