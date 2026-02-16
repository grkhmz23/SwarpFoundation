import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Swarp Foundation",
  description: "Full-stack software development services from concept to production. Web & Mobile, AI Systems, Blockchain, Cloud & DevOps, and more.",
  openGraph: {
    title: "Services | Swarp Foundation",
    description: "Full-stack software development services from concept to production.",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
