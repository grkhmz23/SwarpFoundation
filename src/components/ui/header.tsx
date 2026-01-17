"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "Products",
    href: "#products",
    subItems: [
      { name: "SwarpPay", href: "#swarppay" },
      { name: "Developer Tools", href: "#tools" },
    ],
  },
  {
    name: "Services",
    href: "#services",
    subItems: [
      { name: "AI Development", href: "#ai" },
      { name: "Web Applications", href: "#web" },
      { name: "Infrastructure", href: "#infra" },
      { name: "Solana & Blockchain", href: "#blockchain" },
    ],
  },
  {
    name: "Developers",
    href: "#developers",
    subItems: [
      { name: "Documentation", href: "#docs" },
      { name: "SDKs", href: "#sdks" },
      { name: "APIs", href: "#apis" },
      { name: "Status", href: "#status" },
    ],
  },
  {
    name: "Company",
    href: "#company",
    subItems: [
      { name: "About", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    name: "Resources",
    href: "#resources",
    subItems: [
      { name: "Blog", href: "#blog" },
      { name: "Press Kit", href: "#press" },
      { name: "Security", href: "#security" },
    ],
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-swarp-darker/80 backdrop-blur-xl border-b border-swarp-blue/20"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-swarp-blue/20 blur-xl group-hover:bg-swarp-cyan/30 transition-all duration-300" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-swarp-blue to-swarp-purple rounded-lg flex items-center justify-center glow-blue">
                <span className="text-white font-bold text-xl">S</span>
              </div>
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">
              Swarp Foundation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-swarp-cyan transition-colors relative"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-swarp-blue to-swarp-cyan group-hover:w-full transition-all duration-300" />
                </Link>
                
                {/* Dropdown */}
                {item.subItems && (
                  <div
                    className={cn(
                      "absolute top-full left-0 mt-2 w-48 bg-swarp-dark/95 backdrop-blur-xl border border-swarp-blue/20 rounded-lg overflow-hidden shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200",
                      activeDropdown === item.name ? "translate-y-0" : "-translate-y-2"
                    )}
                  >
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-3 text-sm text-gray-300 hover:text-swarp-cyan hover:bg-swarp-blue/10 transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="#contact"
              className="px-6 py-2.5 text-sm font-medium text-gray-300 hover:text-white transition-colors"
            >
              Talk to Us
            </Link>
            <Link
              href="#swarppay"
              className="px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-swarp-blue to-swarp-purple rounded-lg hover:shadow-lg hover:shadow-swarp-blue/50 transition-all duration-300 glow-blue"
            >
              Explore SwarpPay
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-swarp-cyan transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-swarp-blue/20">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-sm font-medium text-gray-300 hover:text-swarp-cyan transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <div className="pl-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-400 hover:text-swarp-cyan transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  href="#contact"
                  className="block px-4 py-2 text-sm font-medium text-center text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Talk to Us
                </Link>
                <Link
                  href="#swarppay"
                  className="block px-4 py-2 text-sm font-medium text-center bg-gradient-to-r from-swarp-blue to-swarp-purple rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Explore SwarpPay
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
