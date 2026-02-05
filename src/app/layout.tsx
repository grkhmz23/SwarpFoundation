import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Header3D } from "@/components/ui/header-3d";
import { Footer } from "@/components/ui/footer";

const AetherBackground = dynamic(
  () => import("@/components/ui/aether-background"),
  { ssr: false }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swarp Foundation",
  description: "Full-stack software development from concept to production.",
  icons: {
    icon: "/logo_transparent.png",
    apple: "/logo_transparent.png",
  },
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
