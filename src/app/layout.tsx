import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swarp Foundation | Build & Ship on Solana + AI",
  description: "Enterprise-grade blockchain infrastructure, AI solutions, and software development. Build, deploy, and scale with Swarp Foundation.",
  keywords: ["Solana", "AI", "Blockchain", "Web3", "DeFi", "Infrastructure", "SwarpPay"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
