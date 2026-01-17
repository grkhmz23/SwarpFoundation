"use client";

import { Blocks, Wallet, BarChart3, Lock } from "lucide-react";

const ecosystemCategories = [
  {
    icon: Blocks,
    title: "Blockchain Networks",
    partners: [
      "Solana",
      "Ethereum",
      "Polygon",
      "BSC",
    ],
  },
  {
    icon: Wallet,
    title: "Wallets & Custody",
    partners: [
      "Phantom",
      "MetaMask",
      "Ledger",
      "Fireblocks",
    ],
  },
  {
    icon: BarChart3,
    title: "Analytics & Data",
    partners: [
      "The Graph",
      "Dune Analytics",
      "Messari",
      "Nansen",
    ],
  },
  {
    icon: Lock,
    title: "Security & Compliance",
    partners: [
      "CertiK",
      "Quantstamp",
      "Chainalysis",
      "Elliptic",
    ],
  },
];

export function EcosystemPartners() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-swarp-darker" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-swarp-cyan/10 border border-swarp-cyan/20 mb-6">
            <span className="text-sm text-swarp-cyan font-medium">Integrations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Ecosystem</span>{" "}
            <span className="text-white">& Partners</span>
          </h2>
          <p className="text-lg text-gray-400">
            Integrated with industry-leading platforms and protocols to deliver best-in-class solutions.
          </p>
        </div>

        {/* Ecosystem Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ecosystemCategories.map((category) => (
            <div
              key={category.title}
              className="p-6 rounded-xl bg-swarp-dark/50 backdrop-blur-sm border border-swarp-blue/20 hover:border-swarp-cyan/50 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="mb-4 p-3 w-fit rounded-lg bg-gradient-to-br from-swarp-blue/20 to-swarp-purple/20 border border-swarp-blue/30 group-hover:scale-110 transition-transform">
                <category.icon className="w-6 h-6 text-swarp-cyan" />
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-gradient transition-colors">
                {category.title}
              </h3>
              
              {/* Partners */}
              <ul className="space-y-2">
                {category.partners.map((partner) => (
                  <li
                    key={partner}
                    className="flex items-center text-sm text-gray-400 group-hover:text-gray-300 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-swarp-cyan mr-2" />
                    {partner}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-swarp-blue/10 to-swarp-purple/10 border border-swarp-blue/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">50+</div>
              <div className="text-sm text-gray-400">Integrations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">10+</div>
              <div className="text-sm text-gray-400">Blockchains</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">100%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
