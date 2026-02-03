"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Works", href: "/works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function NavPill3D({
  children,
  isActive,
  href,
  onClick,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const content = (
    <span
      className="relative flex items-center justify-center select-none"
      style={{
        transform: isPressed ? "translateY(2px)" : "translateY(0)",
        transition: "transform 75ms ease-out",
      }}
    >
      <span
        className="absolute inset-0 rounded-xl"
        style={{
          background: isActive
            ? "linear-gradient(180deg, rgba(6,182,212,0.3) 0%, rgba(6,182,212,0.15) 100%)"
            : "linear-gradient(180deg, rgba(30,41,59,0.85) 0%, rgba(15,23,42,0.85) 100%)",
          boxShadow: isPressed
            ? "none"
            : isActive
              ? "0 4px 0 0 rgba(6,182,212,0.4), inset 0 1px 0 0 rgba(255,255,255,0.1)"
              : "0 4px 0 0 rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.05)",
          transform: isPressed ? "translateY(2px)" : "translateY(0)",
          transition: "all 75ms ease-out",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      />
      <span
        className="absolute inset-x-1 top-0.5 h-px rounded-full"
        style={{
          background: isActive
            ? "linear-gradient(90deg, transparent, rgba(6,182,212,0.5), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
          opacity: isPressed ? 0 : 1,
          transition: "opacity 75ms ease-out",
        }}
      />
      <span
        className="relative z-10 px-4 py-2 text-sm font-semibold tracking-wide"
        style={{
          color: isActive ? "rgb(34,211,238)" : isHovered ? "rgb(226,232,240)" : "rgb(148,163,184)",
          textShadow: isActive ? "0 0 20px rgba(6,182,212,0.5)" : "none",
          transition: "color 150ms ease",
        }}
      >
        {children}
      </span>
    </span>
  );

  const handlers = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => {
      setIsHovered(false);
      setIsPressed(false);
    },
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
  };

  if (href) {
    return (
      <Link href={href} className="relative block" {...handlers}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className="relative block" {...handlers}>
      {content}
    </button>
  );
}

function MobileMenu({
  isOpen,
  onClose,
  pathname,
}: {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-50 rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl p-4 shadow-2xl"
          >
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                    pathname === item.href
                      ? "bg-cyan-500/20 text-cyan-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function Header3D() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
        style={{
          transition: "all 300ms ease",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <div
            className="relative flex items-center justify-between rounded-2xl px-4 py-2"
            style={{
              background: isScrolled
                ? "rgba(15,23,42,0.85)"
                : "rgba(15,23,42,0.6)",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: isScrolled
                ? "rgba(6,182,212,0.2)"
                : "rgba(255,255,255,0.08)",
              boxShadow: isScrolled
                ? "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(6,182,212,0.1), inset 0 1px 0 0 rgba(255,255,255,0.05)"
                : "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 0 rgba(255,255,255,0.05)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              transition: "all 300ms ease",
            }}
          >
            <span
              className="absolute inset-x-4 top-0 h-px"
              style={{
                background: isScrolled
                  ? "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)"
                  : "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                transition: "background 300ms ease",
              }}
            />

            <Link href="/" className="relative flex items-center gap-2 group">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, rgba(6,182,212,0.2) 0%, rgba(6,182,212,0.05) 100%)",
                  border: "1px solid rgba(6,182,212,0.3)",
                  boxShadow: "0 0 20px rgba(6,182,212,0.15), inset 0 1px 0 0 rgba(255,255,255,0.1)",
                }}
              >
                <Zap className="h-5 w-5 text-cyan-400" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Swarp<span className="text-cyan-400">.</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavPill3D
                  key={item.href}
                  href={item.href}
                  isActive={pathname === item.href}
                >
                  {item.label}
                </NavPill3D>
              ))}
            </nav>

            <button
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}

export default Header3D;
