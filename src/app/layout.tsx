import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header3D } from "@/components/ui/header-3d";
import { Footer } from "@/components/ui/footer";
import { AetherBackground } from "@/components/ui/aether-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swarp Foundation",
  description: "Full-stack software development from concept to production.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AetherBackground>
          <Header3D />
          {children}
          <Footer />
        </AetherBackground>
      </body>
    </html>
  );
}
