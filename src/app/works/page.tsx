"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { AnimatedFolder, Project } from "@/components/ui/portfolio-folder";
import { AetherBackground } from "@/components/ui/aether-background";
import { KeyboardLink } from "@/components/ui/keyboard-button";

// Swarp Foundation Portfolio Data
const portfolioData: Array<{
  title: string;
  gradient: string;
  projects: Project[];
}> = [
  {
    title: "Web Applications",
    gradient: "linear-gradient(135deg, #00d4aa, #00b894)",
    projects: [
      { 
        id: "web1", 
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        title: "SwarpPay Dashboard",
        description: "Full-featured trading platform with real-time charts, order management, and portfolio analytics.",
        link: "#"
      },
      { 
        id: "web2", 
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        title: "Analytics Platform",
        description: "Enterprise analytics dashboard with customizable widgets and data visualization.",
        link: "#"
      },
      { 
        id: "web3", 
        image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800",
        title: "Admin Console",
        description: "Multi-tenant admin system with role-based access control and audit logging.",
        link: "#"
      },
      { 
        id: "web4", 
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800",
        title: "Client Portal",
        description: "Self-service portal for customers with document management and support tickets.",
        link: "#"
      },
      { 
        id: "web5", 
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        title: "Developer Hub",
        description: "API documentation site with interactive playground and SDK downloads.",
        link: "#"
      },
    ]
  },
  {
    title: "Blockchain & DeFi",
    gradient: "linear-gradient(135deg, #9d4edd, #7b2cbf)",
    projects: [
      { 
        id: "bc1", 
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
        title: "pSOL Protocol",
        description: "Privacy-focused Solana protocol using zero-knowledge proofs for shielded transactions.",
        link: "#"
      },
      { 
        id: "bc2", 
        image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?auto=format&fit=crop&q=80&w=800",
        title: "DEX Aggregator",
        description: "Multi-chain DEX aggregator with optimal routing and MEV protection.",
        link: "#"
      },
      { 
        id: "bc3", 
        image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?auto=format&fit=crop&q=80&w=800",
        title: "NFT Marketplace",
        description: "Gasless NFT marketplace with lazy minting and royalty enforcement.",
        link: "#"
      },
      { 
        id: "bc4", 
        image: "https://images.unsplash.com/photo-1642388738814-3c8d6c2f1e7a?auto=format&fit=crop&q=80&w=800",
        title: "Staking Platform",
        description: "Liquid staking solution with auto-compounding rewards and governance.",
        link: "#"
      },
      { 
        id: "bc5", 
        image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=800",
        title: "BSC Nexus",
        description: "Cross-chain bridge infrastructure for BNB Smart Chain ecosystem.",
        link: "#"
      },
    ]
  },
  {
    title: "AI & Machine Learning",
    gradient: "linear-gradient(135deg, #00b4d8, #0077b6)",
    projects: [
      { 
        id: "ai1", 
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        title: "RAG Chatbot",
        description: "Enterprise chatbot with document retrieval and contextual understanding.",
        link: "#"
      },
      { 
        id: "ai2", 
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&q=80&w=800",
        title: "Sentiment Analyzer",
        description: "Real-time social media sentiment analysis for trading signals.",
        link: "#"
      },
      { 
        id: "ai3", 
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
        title: "Fraud Detection",
        description: "ML-powered fraud detection system with 99.7% accuracy.",
        link: "#"
      },
      { 
        id: "ai4", 
        image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800",
        title: "Voice Assistant",
        description: "Custom voice AI for customer support automation.",
        link: "#"
      },
    ]
  },
  {
    title: "Mobile Apps",
    gradient: "linear-gradient(135deg, #f72585, #b5179e)",
    projects: [
      { 
        id: "mob1", 
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
        title: "Crypto Wallet",
        description: "Multi-chain mobile wallet with biometric security and DApp browser.",
        link: "#"
      },
      { 
        id: "mob2", 
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800",
        title: "Trading App",
        description: "iOS & Android trading app with real-time notifications and charts.",
        link: "#"
      },
      { 
        id: "mob3", 
        image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=800",
        title: "Fitness Tracker",
        description: "Health monitoring app with wearable integration.",
        link: "#"
      },
    ]
  },
  {
    title: "Hardware & IoT",
    gradient: "linear-gradient(135deg, #ff6b35, #f7931e)",
    projects: [
      { 
        id: "hw1", 
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        title: "Edge Node",
        description: "Custom ARM-based edge computing node for industrial IoT.",
        link: "#"
      },
      { 
        id: "hw2", 
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
        title: "Sensor Gateway",
        description: "Multi-protocol sensor gateway with LoRaWAN and NB-IoT.",
        link: "#"
      },
      { 
        id: "hw3", 
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
        title: "Mining Rig",
        description: "Optimized ASIC controller for cryptocurrency mining operations.",
        link: "#"
      },
    ]
  },
  {
    title: "UI/UX Design",
    gradient: "linear-gradient(135deg, #4cc9f0, #4361ee)",
    projects: [
      { 
        id: "ui1", 
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
        title: "Design System",
        description: "Comprehensive component library with Figma and code sync.",
        link: "#"
      },
      { 
        id: "ui2", 
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800",
        title: "Dashboard Kit",
        description: "Premium dashboard UI kit with 200+ components.",
        link: "#"
      },
      { 
        id: "ui3", 
        image: "https://images.unsplash.com/photo-1541462608141-ad4d4f942177?auto=format&fit=crop&q=80&w=800",
        title: "Mobile UI Kit",
        description: "iOS and Android UI kit for fintech applications.",
        link: "#"
      },
      { 
        id: "ui4", 
        image: "https://images.unsplash.com/photo-1522542550221-31fd19fe4af0?auto=format&fit=crop&q=80&w=800",
        title: "Icon Set",
        description: "1000+ custom icons optimized for web and mobile.",
        link: "#"
      },
    ]
  },
];

export default function WorksPage() {
  return (
    <AetherBackground className="min-h-screen">
      {/* Hero */}
      <div className="relative z-10 max-w-7xl mx-auto pt-32 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
          Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 italic">Portfolio</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore our completed projects across web development, blockchain, AI, and hardware. 
          Hover over folders to preview work samples.
        </p>
      </div>

      {/* Portfolio Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {portfolioData.map((folder, index) => (
            <div 
              key={folder.title} 
              className="w-full"
              style={{ 
                animation: `fadeInUp 0.7s ease-out ${200 + index * 100}ms both`,
              }}
            >
              <AnimatedFolder 
                title={folder.title} 
                projects={folder.projects} 
                gradient={folder.gradient}
                className="w-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Have a Project in Mind?</h2>
          <p className="text-gray-400 mb-8">
            Let&apos;s discuss how we can bring your vision to life with cutting-edge technology.
          </p>
          <KeyboardLink
            href="/contact"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Start a Project
          </KeyboardLink>
        </div>
      </section>

      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </AetherBackground>
  );
}