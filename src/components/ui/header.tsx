"use client";
import Link from "next/link";
import Image from "next/image";
import swarpLogo from "@/assets/swarplogo.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Works", href: "/works" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3">
            <Image 
              src={swarpLogo} 
              alt="Swarp Foundation" 
              width={40} 
              height={40} 
              className="object-contain mix-blend-lighten" 
            />
            <span className="text-xl font-bold text-swarp-cyan">Swarp Foundation</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-300 hover:text-swarp-cyan transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}