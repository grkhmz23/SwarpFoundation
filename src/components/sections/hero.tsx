"use client";

import { useEffect, useState } from "react";
import { KeyboardLink } from "@/components/ui/keyboard-button";
import { ArrowRight, MessageCircle } from "lucide-react";

const codeLines = [
  "// Initializing Swarp Foundation...",
  "import { Web, Mobile, AI, Blockchain, Security } from '@swarp/stack';",
  "",
  "const services = {",
  "  platforms: ['Web Apps', 'Mobile Apps', 'APIs'],",
  "  intelligence: ['AI Chat', 'ML Models', 'Automation'],",
  "  web3: ['DeFi', 'Smart Contracts', 'Wallets'],",
  "  security: ['Audits', 'Penetration Testing', 'Monitoring'],",
  "  devops: ['Cloud Infrastructure', 'CI/CD', 'Kubernetes'],",
  "};",
  "",
  "const deploy = await Swarp.build(services);",
  "console.log('✨ Innovation deployed successfully');",
];

export function Hero() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) return;

    const currentLine = codeLines[currentLineIndex];

    if (charIndex < currentLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentLine.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setDisplayedLines([...displayedLines, currentLine]);
        setCurrentLineIndex(currentLineIndex + 1);
        setCurrentText("");
        setCharIndex(0);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentLineIndex, displayedLines]);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 px-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-cyan-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-sm text-cyan-400 font-medium">Enterprise Software Solutions</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white">Swarp</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">Foundation</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300/90 max-w-xl">
              Full-stack software development company. From web platforms to AI solutions, blockchain infrastructure to security audits.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pb-2">
              <KeyboardLink 
                href="/works"
                variant="primary" 
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Projects
              </KeyboardLink>
              <KeyboardLink 
                href="/contact"
                variant="ghost" 
                size="lg"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                Get in Touch
              </KeyboardLink>
            </div>
          </div>

          {/* Right - Code Panel */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>

            {/* Glass panel */}
            <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden">
              {/* Window bar */}
              <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-xs text-gray-400 font-mono">swarp-foundation.ts</div>
                <div className="text-xs text-cyan-400">●</div>
              </div>

              {/* Code area */}
              <div className="p-6 h-80 overflow-hidden font-mono text-sm">
                <div className="space-y-2">
                  {displayedLines.map((line, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <span className="text-gray-600 select-none w-6 text-right">{(i + 1).toString().padStart(2, '0')}</span>
                      <code className={
                        line.startsWith('//') ? 'text-gray-500' : 
                        line.includes('const') || line.includes('import') ? 'text-purple-400' : 
                        line.includes(':') ? 'text-cyan-400' : 'text-gray-300'
                      }>
                        {line}
                      </code>
                    </div>
                  ))}
                  {currentText && (
                    <div className="flex items-start space-x-3">
                      <span className="text-gray-600 select-none w-6 text-right">{(displayedLines.length + 1).toString().padStart(2, '0')}</span>
                      <code className={
                        currentText.startsWith('//') ? 'text-gray-500' : 
                        currentText.includes('const') || currentText.includes('import') ? 'text-purple-400' : 
                        'text-cyan-400'
                      }>
                        {currentText}
                        <span className="inline-block w-2 h-4 bg-cyan-400 ml-1 animate-pulse"></span>
                      </code>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer bar */}
              <div className="bg-white/5 border-t border-white/10 px-4 py-2 flex items-center justify-between text-xs">
                <span className="text-gray-500">Web • Mobile • AI • Blockchain • Security</span>
                <span className="text-cyan-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                  100% Uptime
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-500">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-cyan-500/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-cyan-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
