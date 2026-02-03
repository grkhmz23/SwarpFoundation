"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import swarpLogo from "@/assets/swarplogo.png";
import { SocialCard } from "./social-card";

// DotCard Component
function DotCard({ target = 100, duration = 2000, label = "Stats", suffix = "" }: { 
  target?: number; 
  duration?: number; 
  label?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const range = end - start;
    if (range <= 0) return;

    const increment = Math.ceil(end / (duration / 50));
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(start);
    }, 50);

    return () => clearInterval(timer);
  }, [target, duration]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${Math.floor(num / 1000)}k`;
    return num.toString();
  };

  return (
    <div className="dot-card-outer group">
      <div className="dot-card-dot" />
      <div className="dot-card">
        <div className="dot-card-ray" />
        <div className="dot-card-text">{formatNumber(count)}{suffix}</div>
        <div className="dot-card-label">{label}</div>
        <div className="dot-card-line topl" />
        <div className="dot-card-line leftl" />
        <div className="dot-card-line bottoml" />
        <div className="dot-card-line rightl" />
      </div>
    </div>
  );
}

const footerSections = [
  {
    title: "Products",
    links: [
      { name: "SwarpPay", href: "/products#swarppay" },
      { name: "Developer Tools", href: "/products#tools" },
      { name: "Infrastructure", href: "/products#infra" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "AI Development", href: "/services#ai" },
      { name: "Web Applications", href: "/services#web" },
      { name: "Blockchain Solutions", href: "/services#blockchain" },
      { name: "Smart Contracts", href: "/services#contracts" },
    ],
  },
  {
    title: "Developers",
    links: [
      { name: "Documentation", href: "#docs" },
      { name: "API Reference", href: "#apis" },
      { name: "SDKs", href: "#sdks" },
      { name: "System Status", href: "#status" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "#careers" },
      { name: "Blog", href: "#blog" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

const stats = [
  { target: 50, label: "Projects", duration: 1500, suffix: "+" },
  { target: 99, label: "Uptime", duration: 2000, suffix: "%" },
  { target: 25, label: "Countries", duration: 1800, suffix: "" },
  { target: 10, label: "Products", duration: 1200, suffix: "+" },
];

export function Footer() {
  return (
    <footer className="relative bg-swarp-darker border-t border-swarp-cyan/20 mt-16 w-full overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-swarp-cyan/10 blur-3xl"></div>
        <div className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full bg-swarp-purple/10 blur-3xl"></div>
      </div>

      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">

        {/* Stats Row with DotCards */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-16 pb-12 border-b border-swarp-cyan/10">
          {stats.map((stat, i) => (
            <DotCard 
              key={i} 
              target={stat.target} 
              label={stat.label} 
              duration={stat.duration}
              suffix={stat.suffix}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image 
                src={swarpLogo} 
                alt="Swarp Foundation" 
                width={40} 
                height={40} 
                className="object-contain mix-blend-lighten" 
              />
              <span className="text-xl font-bold text-swarp-cyan">Swarp Foundation</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Building the future of blockchain infrastructure and AI-powered solutions. Enterprise-grade software for the decentralized web.
            </p>

            {/* Social Card */}
            <SocialCard 
              title="Follow Us"
              instagramUrl="https://instagram.com/swarpfoundation"
              twitterUrl="https://x.com/swarpfoundation"
              discordUrl="https://discord.gg/swarp"
              telegramUrl="https://t.me/swarpfoundation"
              githubUrl="https://github.com/swarp-foundation"
            />
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-4">
            {footerSections.map((section) => (
              <div key={section.title} className="text-center sm:text-left">
                <h3 className="text-xs font-semibold tracking-widest text-swarp-cyan uppercase mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-sm text-gray-400 hover:text-swarp-cyan transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-swarp-cyan/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Swarp Foundation. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link href="#privacy" className="text-sm text-gray-400 hover:text-swarp-cyan transition-colors">
                Privacy Policy
              </Link>
              <Link href="#terms" className="text-sm text-gray-400 hover:text-swarp-cyan transition-colors">
                Terms of Service
              </Link>
              <Link href="#security" className="text-sm text-gray-400 hover:text-swarp-cyan transition-colors">
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* DotCard Styles */}
      <style jsx global>{`
        .dot-card-outer {
          position: relative;
          width: 140px;
          height: 100px;
        }

        .dot-card-dot {
          position: absolute;
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 16px;
          background: #00fff0;
          border-radius: 50%;
          box-shadow: 
            0 0 20px #00fff0,
            0 0 40px #00fff0,
            0 0 60px #00fff088;
          z-index: 10;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { 
            box-shadow: 
              0 0 20px #00fff0,
              0 0 40px #00fff0,
              0 0 60px #00fff088;
          }
          50% { 
            box-shadow: 
              0 0 30px #00fff0,
              0 0 60px #00fff0,
              0 0 90px #00fff0aa;
          }
        }

        .dot-card {
          position: relative;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(0,255,240,0.08) 0%, rgba(0,0,0,0.4) 100%);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid rgba(0,255,240,0.15);
        }

        .group:hover .dot-card {
          background: linear-gradient(180deg, rgba(0,255,240,0.12) 0%, rgba(0,0,0,0.5) 100%);
          border-color: rgba(0,255,240,0.3);
        }

        .dot-card-ray {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 50px;
          background: linear-gradient(180deg, rgba(0,255,240,0.3) 0%, transparent 100%);
          clip-path: polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%);
          opacity: 0.6;
        }

        .dot-card-text {
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          text-shadow: 0 0 20px rgba(0,255,240,0.5);
          z-index: 2;
        }

        .dot-card-label {
          font-size: 11px;
          font-weight: 500;
          color: #00fff0;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 4px;
          z-index: 2;
        }

        .dot-card-line {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(0,255,240,0.5), transparent);
          opacity: 0.4;
        }

        .dot-card-line.topl {
          top: 0;
          left: 10%;
          right: 10%;
          height: 1px;
        }

        .dot-card-line.bottoml {
          bottom: 0;
          left: 10%;
          right: 10%;
          height: 1px;
        }

        .dot-card-line.leftl {
          left: 0;
          top: 10%;
          bottom: 10%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(0,255,240,0.5), transparent);
        }

        .dot-card-line.rightl {
          right: 0;
          top: 10%;
          bottom: 10%;
          width: 1px;
          background: linear-gradient(180deg, transparent, rgba(0,255,240,0.5), transparent);
        }
      `}</style>
    </footer>
  );
}