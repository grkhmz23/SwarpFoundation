"use client";

import { motion } from "framer-motion";
import SecurityCard from "@/components/ui/security-card";

export default function SwarpIDPage() {
  return (
    <div className="min-h-screen bg-swarp-darker pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-swarp-blue/30 bg-swarp-dark/50 px-4 py-2 mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-swarp-neon-green animate-pulse" />
            <span className="text-sm text-gray-400">Live Product</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-gradient mb-4"
          >
            SWARP ID
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            Smart identity verification with real-time security signals.
            Evaluate each login based on IP, device history, and context.
          </motion.p>
        </div>

        {/* Demo Card */}
        <div className="flex justify-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <SecurityCard 
              delay={5000}
              name="Verified User"
              email="user@swarp.foundation"
            />
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="rounded-2xl border border-swarp-blue/30 bg-swarp-dark/50 p-6"
            >
              <div className="text-swarp-cyan text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-swarp-cyan mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: "🔍",
    title: "Real-time Analysis",
    description: "Evaluate IP address, device fingerprint, and behavioral patterns instantly"
  },
  {
    icon: "🛡️",
    title: "Adaptive Security",
    description: "Dynamic risk scoring adjusts access controls based on context"
  },
  {
    icon: "⚡",
    title: "Zero Friction",
    description: "Seamless authentication for legitimate users, barriers for threats"
  }
];
