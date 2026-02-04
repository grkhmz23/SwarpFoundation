import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Swarp AI | Swarp Foundation",
  description: "Swarp AI chat assistant powered by Kimi AI - Beta",
  openGraph: {
    title: "Swarp AI | Swarp Foundation",
    description: "Swarp AI chat assistant powered by Kimi AI - Beta",
  },
};

export default function SwarpAiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}