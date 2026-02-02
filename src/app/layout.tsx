import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header3D } from "@/components/ui/header-3d";
import { Footer } from "@/components/ui/footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Swarp Foundation - Build Systems That Ship",
  description: "Building the future of decentralized infrastructure",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header3D />
        {children}
        <Footer />
      </body>
    </html>
  );
}