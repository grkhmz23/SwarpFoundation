"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const footerSections = [
  {
    title: "Products",
    links: [
      { name: "SwarpPay", href: "#swarppay" },
      { name: "Developer Tools", href: "#tools" },
      { name: "Infrastructure", href: "#infra" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "AI Development", href: "#ai" },
      { name: "Web Applications", href: "#web" },
      { name: "Blockchain Solutions", href: "#blockchain" },
      { name: "Smart Contracts", href: "#contracts" },
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
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Blog", href: "#blog" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Press Kit", href: "#press" },
      { name: "Security", href: "#security" },
      { name: "Privacy Policy", href: "#privacy" },
      { name: "Terms of Service", href: "#terms" },
    ],
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/swarp-foundation", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/swarpfoundation", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/swarp-foundation", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@swarp.foundation", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative bg-swarp-darker border-t border-swarp-blue/20">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-swarp-blue/20 blur-xl group-hover:bg-swarp-cyan/30 transition-all duration-300" />
                <div className="relative w-10 h-10 bg-gradient-to-br from-swarp-blue to-swarp-purple rounded-lg flex items-center justify-center glow-blue">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
              </div>
              <span className="text-lg font-bold text-gradient">Swarp</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Building the future of blockchain infrastructure and AI-powered solutions.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-swarp-cyan hover:bg-swarp-blue/10 rounded-lg transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-swarp-cyan transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-swarp-blue/20">
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
