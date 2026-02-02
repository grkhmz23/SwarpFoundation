"use client";

import Link from "next/link";
import Image from "next/image";
import swarpLogo from "@/assets/swarplogo.png";
import { SocialCard } from "./social-card";

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

export function Footer() {
  return (
    <footer className="relative bg-swarp-darker border-t border-swarp-cyan/20 mt-16 w-full overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-swarp-cyan/10 blur-3xl"></div>
        <div className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full bg-swarp-purple/10 blur-3xl"></div>
      </div>

      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">
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
    </footer>
  );
}