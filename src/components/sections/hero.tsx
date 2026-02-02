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
  "  quality: ['QA Testing', 'Reliability Engineering'],",
  "  design: ['UI/UX', 'Product Design', 'Prototyping']",
  "};",
  "",
  "// Building enterprise solutions...",
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-swarp-darker via-swarp-dark to-swarp-darker" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-swarp-cyan rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-swarp-blue/10 border border-swarp-blue/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-swarp-cyan opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-swarp-cyan"></span>
              </span>
              <span className="text-sm text-swarp-cyan font-medium">Enterprise Software Solutions</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-white">Swarp</span>
              <br />
              <span className="text-gradient">Foundation</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-xl">
              Full-stack software development company. From web platforms to AI solutions, blockchain infrastructure to security audits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
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

          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-swarp-cyan via-swarp-blue to-swarp-purple rounded-3xl blur-xl opacity-30 animate-pulse"></div>

            <div className="relative rounded-2xl border-4 border-swarp-cyan/50 bg-swarp-darker/90 backdrop-blur-sm shadow-2xl shadow-swarp-cyan/20 overflow-hidden">
              <div className="bg-gradient-to-r from-swarp-dark to-swarp-darker border-b border-swarp-cyan/30 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-gray-500 font-mono">swarp-foundation.ts</div>
                <div className="text-xs text-swarp-cyan">●</div>
              </div>

              <div className="p-6 h-80 overflow-hidden font-mono text-sm relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-swarp-cyan/5 to-transparent animate-scan"></div>

                <div className="space-y-2 relative z-10">
                  {displayedLines.map((line, i) => (
                    <div key={i} className="flex items-start space-x-3 animate-in fade-in slide-in-from-left-2">
                      <span className="text-gray-600 select-none">{(i + 1).toString().padStart(2, '0')}</span>
                      <code className={line.startsWith('//') ? 'text-gray-500' : line.includes('const') ? 'text-swarp-purple' : 'text-swarp-cyan'}>
                        {line}
                      </code>
                    </div>
                  ))}
                  {currentText && (
                    <div className="flex items-start space-x-3">
                      <span className="text-gray-600 select-none">{(displayedLines.length + 1).toString().padStart(2, '0')}</span>
                      <code className={currentText.startsWith('//') ? 'text-gray-500' : currentText.includes('const') ? 'text-swarp-purple' : 'text-swarp-cyan'}>
                        {currentText}
                        <span className="inline-block w-2 h-4 bg-swarp-cyan ml-1 animate-pulse"></span>
                      </code>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-swarp-dark/80 border-t border-swarp-cyan/20 px-4 py-2 flex items-center justify-between text-xs">
                <span className="text-gray-500">Web • Mobile • AI • Blockchain • Security</span>
                <span className="text-swarp-cyan">100% Uptime</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-swarp-purple/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-500">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-swarp-cyan/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-swarp-cyan rounded-full"></div>
        </div>
      </div>
    </section>
  );
}