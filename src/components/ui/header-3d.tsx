"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Works", href: "/works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Swarp AI", href: "/swarp-ai", badge: "Beta" },
];

function LogoMark({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image
        src="/logo_transparent.png"
        alt="Swarp"
        width={size}
        height={size}
        sizes={`${size}px`}
        className="h-full w-full object-contain"
      />
    </span>
  );
}

// Mobile Menu Component
function MobileMenu({ isOpen, onClose, activeLabel, setActiveLabel }: {
  isOpen: boolean;
  onClose: () => void;
  activeLabel: string;
  setActiveLabel: (label: string) => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-4 left-4 right-4 z-50 rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, 
                rgba(13, 21, 32, 0.95) 0%, 
                rgba(9, 16, 21, 0.95) 50%, 
                rgba(6, 10, 16, 0.95) 100%
              )`,
              backdropFilter: "blur(20px)",
              boxShadow: `
                0 4px 30px rgba(0, 0, 0, 0.5),
                0 0 40px rgba(0, 255, 240, 0.1),
                inset 0 1px 1px rgba(0, 255, 240, 0.1)
              `,
              border: "1px solid rgba(0, 255, 240, 0.15)",
            }}
          >
            {/* Top glow line */}
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(0, 255, 240, 0.5), transparent)",
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <LogoMark size={30} className="shrink-0 drop-shadow-[0_0_12px_rgba(0,255,240,0.28)]" />
                <span className="text-lg font-semibold leading-none text-cyan-400">Swarp</span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Nav Items */}
            <nav className="p-4 space-y-1">
              {navItems.map((item, index) => {
                const isActive = item.label === activeLabel;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => {
                        setActiveLabel(item.label);
                        onClose();
                      }}
                      className="flex items-center justify-between px-4 py-3 rounded-xl transition-all"
                      style={{
                        background: isActive ? "rgba(0, 255, 240, 0.1)" : "transparent",
                        border: isActive ? "1px solid rgba(0, 255, 240, 0.2)" : "1px solid transparent",
                      }}
                    >
                      <span
                        className="text-base font-medium"
                        style={{
                          color: isActive ? "#00fff0" : "#9ca3af",
                        }}
                      >
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                          style={{
                            background: "linear-gradient(135deg, rgba(0,212,255,0.25) 0%, rgba(157,78,221,0.25) 100%)",
                            border: "1px solid rgba(0,212,255,0.4)",
                            color: "#00fff0",
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Desktop Navigation Pill
function DesktopNavPill({ activeLabel, setActiveLabel }: {
  activeLabel: string;
  setActiveLabel: (label: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [hovering, setHovering] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pillWidth = useSpring(160, { stiffness: 220, damping: 25, mass: 1 });

  useEffect(() => {
    if (hovering) {
      setExpanded(true);
      pillWidth.set(720);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setExpanded(false);
        pillWidth.set(160);
      }, 400);
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [hovering, pillWidth]);

  const handleMouseEnter = () => setHovering(true);
  const handleMouseLeave = () => setHovering(false);

  const handleNavClick = (label: string) => {
    setActiveLabel(label);
    setHovering(false);
  };

  return (
    <motion.nav
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-full"
      style={{
        width: pillWidth,
        height: "56px",
        background: `
          linear-gradient(135deg, 
            rgba(13, 21, 32, 0.85) 0%, 
            rgba(11, 18, 24, 0.85) 15%, 
            rgba(9, 16, 21, 0.85) 30%, 
            rgba(7, 13, 18, 0.85) 45%, 
            rgba(6, 10, 15, 0.85) 60%, 
            rgba(5, 9, 16, 0.85) 75%, 
            rgba(4, 8, 12, 0.85) 90%, 
            rgba(6, 10, 16, 0.85) 100%
          )
        `,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: expanded
          ? `
            0 2px 4px rgba(0, 0, 0, 0.3),
            0 6px 12px rgba(0, 0, 0, 0.4),
            0 12px 24px rgba(0, 0, 0, 0.3),
            0 24px 48px rgba(0, 0, 0, 0.2),
            inset 0 1px 1px rgba(0, 255, 240, 0.15),
            inset 0 -3px 8px rgba(0, 0, 0, 0.4),
            inset 3px 3px 8px rgba(0, 0, 0, 0.3),
            inset -3px 3px 8px rgba(0, 0, 0, 0.25),
            0 0 40px rgba(0, 255, 240, 0.15)
          `
          : `
            0 3px 6px rgba(0, 0, 0, 0.4),
            0 8px 16px rgba(0, 0, 0, 0.3),
            0 16px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 1px rgba(0, 255, 240, 0.1),
            inset 0 -2px 6px rgba(0, 0, 0, 0.3),
            inset 2px 2px 8px rgba(0, 0, 0, 0.2),
            inset -2px 2px 8px rgba(0, 0, 0, 0.15),
            0 0 20px rgba(0, 255, 240, 0.08)
          `,
        overflow: "hidden",
        transition: "box-shadow 0.3s ease-out",
      }}
    >
      {/* Top edge glow */}
      <div
        className="absolute inset-x-0 top-0 rounded-t-full pointer-events-none"
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, rgba(0, 255, 240, 0) 0%, rgba(0, 255, 240, 0.4) 20%, rgba(0, 255, 240, 0.6) 50%, rgba(0, 255, 240, 0.4) 80%, rgba(0, 255, 240, 0) 100%)",
        }}
      />

      {/* Top hemisphere light catch */}
      <div
        className="absolute inset-x-0 top-0 rounded-full pointer-events-none"
        style={{
          height: "50%",
          background:
            "linear-gradient(180deg, rgba(0, 255, 240, 0.08) 0%, rgba(0, 255, 240, 0.03) 40%, rgba(0, 255, 240, 0) 100%)",
        }}
      />

      {/* Premium gloss reflection */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: expanded ? "18%" : "15%",
          top: "14%",
          width: expanded ? "120px" : "50px",
          height: "12px",
          background:
            "radial-gradient(ellipse at center, rgba(0, 255, 240, 0.25) 0%, rgba(0, 255, 240, 0.1) 50%, rgba(0, 255, 240, 0) 100%)",
          filter: "blur(4px)",
          transform: "rotate(-12deg)",
          transition: "all 0.3s ease",
        }}
      />

      {/* Left edge illumination - expanded only */}
      {expanded && (
        <div
          className="absolute inset-y-0 left-0 rounded-l-full pointer-events-none"
          style={{
            width: "30%",
            background:
              "linear-gradient(90deg, rgba(0, 255, 240, 0.06) 0%, rgba(0, 255, 240, 0.02) 50%, rgba(0, 255, 240, 0) 100%)",
          }}
        />
      )}

      {/* Bottom curvature shadow */}
      <div
        className="absolute inset-x-0 bottom-0 rounded-b-full pointer-events-none"
        style={{
          height: "50%",
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.15) 40%, rgba(0, 0, 0, 0) 100%)",
        }}
      />

      {/* Inner border glow */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: "inset 0 0 30px rgba(0, 255, 240, 0.05)",
        }}
      />

      {/* Outer border */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          boxShadow: "inset 0 0 0 1px rgba(0, 255, 240, 0.2)",
        }}
      />

      {/* Navigation items container */}
      <div className="relative z-10 h-full flex items-center justify-center px-5">
        {/* Collapsed state */}
        {!expanded && (
          <div className="flex items-center gap-2.5">
            <LogoMark size={26} className="shrink-0 drop-shadow-[0_0_12px_rgba(0,255,240,0.28)]" />
            <AnimatePresence mode="wait">
              <motion.span
                key={activeLabel}
                initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
                className="text-[15px] font-semibold leading-none text-cyan-400 whitespace-nowrap tracking-wide"
                style={{
                  textShadow: "0 0 20px rgba(0, 255, 240, 0.5)",
                }}
              >
                {activeLabel}
              </motion.span>
            </AnimatePresence>
          </div>
        )}

        {/* Expanded state */}
        {expanded && (
          <div className="flex items-center justify-evenly w-full">
            {navItems.map((item, index) => {
              const isActive = item.label === activeLabel;

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => handleNavClick(item.label)}
                    className="relative cursor-pointer transition-all duration-200 px-3 py-2 flex items-center gap-1.5"
                    style={{
                      fontSize: isActive ? "15px" : "14px",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "#00fff0" : "#8a9a9a",
                      textShadow: isActive
                        ? "0 0 20px rgba(0, 255, 240, 0.6), 0 0 40px rgba(0, 255, 240, 0.3)"
                        : "none",
                      transform: isActive ? "translateY(-1px)" : "translateY(0)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#00fff0";
                        e.currentTarget.style.textShadow =
                          "0 0 15px rgba(0, 255, 240, 0.4)";
                        e.currentTarget.style.transform = "translateY(-1px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#8a9a9a";
                        e.currentTarget.style.textShadow = "none";
                        e.currentTarget.style.transform = "translateY(0)";
                      }
                    }}
                  >
                    {item.label}
                    {item.badge && (
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider"
                        style={{
                          background: "linear-gradient(135deg, rgba(0,212,255,0.25) 0%, rgba(157,78,221,0.25) 100%)",
                          border: "1px solid rgba(0,212,255,0.4)",
                          color: "#00fff0",
                          textShadow: "0 0 10px rgba(0, 255, 240, 0.5)",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.nav>
  );
}

// Mobile Navigation Button
function MobileNavButton({ onClick, activeLabel }: { onClick: () => void; activeLabel: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-full"
      style={{
        background: `linear-gradient(135deg, 
          rgba(13, 21, 32, 0.9) 0%, 
          rgba(9, 16, 21, 0.9) 50%, 
          rgba(6, 10, 16, 0.9) 100%
        )`,
        backdropFilter: "blur(12px)",
        boxShadow: `
          0 4px 20px rgba(0, 0, 0, 0.4),
          inset 0 1px 1px rgba(0, 255, 240, 0.1),
          0 0 20px rgba(0, 255, 240, 0.08)
        `,
        border: "1px solid rgba(0, 255, 240, 0.2)",
      }}
    >
      <LogoMark size={24} className="shrink-0 drop-shadow-[0_0_10px_rgba(0,255,240,0.25)]" />
      <span
        className="text-sm font-semibold leading-none text-cyan-400"
        style={{ textShadow: "0 0 20px rgba(0, 255, 240, 0.5)" }}
      >
        {activeLabel}
      </span>
      <Menu className="w-5 h-5 text-gray-400" />
    </button>
  );
}

// Main NavPill3D Component - handles responsive switching
export function NavPill3D() {
  const [activeLabel, setActiveLabel] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {isMobile ? (
        <MobileNavButton 
          onClick={() => setMobileMenuOpen(true)} 
          activeLabel={activeLabel}
        />
      ) : (
        <DesktopNavPill 
          activeLabel={activeLabel} 
          setActiveLabel={setActiveLabel}
        />
      )}

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeLabel={activeLabel}
        setActiveLabel={setActiveLabel}
      />
    </>
  );
}

export function Header3D() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 md:top-8 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2 md:py-3" : "py-3 md:py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-center">
        <NavPill3D />
      </div>
    </header>
  );
}

export default Header3D;
