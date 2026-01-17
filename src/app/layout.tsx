import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BeamsBackground } from "@/components/ui/beams-background";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swarp Foundation | Build & Ship on Solana + AI",
  description: "Enterprise-grade blockchain infrastructure.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <BeamsBackground intensity="medium">
          <Header />
          {children}
          <Footer />
        </BeamsBackground>
      </body>
    </html>
  );
}
