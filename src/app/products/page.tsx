"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Zap, Lock } from "lucide-react";

const products = [
  {
    id: "swarp-id",
    name: "SWARP ID",
    description: "Smart identity verification with real-time security signals",
    icon: Shield,
    href: "/products/swarp-id",
    color: "from-swarp-cyan to-swarp-blue",
    status: "Live"
  },
  {
    id: "swarp-pay",
    name: "SWARP Pay",
    description: "Decentralized payment infrastructure on Solana",
    icon: Zap,
    href: "/products/swarp-pay",
    color: "from-swarp-purple to-swarp-accent",
    status: "Coming Soon"
  },
  {
    id: "psol",
    name: "pSOL Protocol",
    description: "Privacy-preserving liquid staking with zero-knowledge proofs",
    icon: Lock,
    href: "/products/psol",
    color: "from-swarp-neon-green to-swarp-cyan",
    status: "In Development"
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-swarp-darker pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient mb-4">
            Our Products
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Building the future of decentralized infrastructure, one product at a time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={product.href}>
                  <div className="group relative h-full rounded-3xl border border-swarp-blue/30 bg-gradient-to-b from-swarp-dark/80 to-swarp-darker/90 p-6 hover:border-swarp-cyan/50 transition-all hover:scale-[1.02]">
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 transition`} />
                    
                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="rounded-2xl border border-swarp-blue/30 bg-swarp-darker/80 p-3 glow-blue">
                          <Icon className="h-6 w-6 text-swarp-cyan" />
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          product.status === "Live" 
                            ? "bg-swarp-neon-green/20 text-swarp-neon-green" 
                            : "bg-swarp-blue/20 text-swarp-cyan"
                        }`}>
                          {product.status}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-swarp-cyan mb-2">
                        {product.name}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {product.description}
                      </p>

                      <div className="mt-6 flex items-center text-swarp-cyan text-sm group-hover:translate-x-2 transition">
                        Learn more →
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
