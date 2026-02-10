"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { SwarpBentoGrid } from "@/components/ui/swarp-bento-grid";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const aboutTabs = [
  {
    id: "mission",
    label: "Our Mission",
    content: (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">
          Making blockchain work for real people
        </h3>
        <p className="text-gray-400 leading-relaxed">
          Crypto was supposed to give everyone equal access to financial tools. Instead,
          most platforms are built for people who already understand the technology, leaving
          everyone else behind. Swarp Foundation exists to close that gap.
        </p>
        <p className="text-gray-400 leading-relaxed">
          We build software that brings the real benefits of blockchain, like transparent
          markets, programmable money, and financial privacy, to people who should not need
          a computer science degree to use them. Everything we ship is designed for clarity
          and security first, complexity second.
        </p>
      </div>
    ),
  },
  {
    id: "approach",
    label: "Our Approach",
    content: (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">
          Regulation, security, fairness
        </h3>
        <p className="text-gray-400 leading-relaxed">
          We do not believe that decentralization means ignoring the rules. Swarp Foundation
          operates within clear regulatory frameworks, pursuing licensing in both the European
          Union and the UAE, because trust is built through accountability, not anonymity.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Every product we build goes through rigorous security audits before it reaches users.
          Our launchpad enforces per-person limits through identity verification, ensuring
          that bots and bad actors cannot dominate token launches. The goal is an ecosystem
          where the rules are fair and everyone plays by them.
        </p>
      </div>
    ),
  },
  {
    id: "why",
    label: "Why Solana",
    content: (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">
          Speed and cost that make sense for everyday use
        </h3>
        <p className="text-gray-400 leading-relaxed">
          We chose to build on Solana because it is fast, inexpensive, and designed for
          high-throughput applications. When someone buys a token or verifies their identity,
          it should happen in seconds and cost fractions of a cent, not minutes and dollars.
        </p>
        <p className="text-gray-400 leading-relaxed">
          Solana gives us the technical foundation to build products that feel as responsive
          as the apps people already use every day. That matters when the goal is mainstream
          adoption, not just serving the crypto-native crowd.
        </p>
      </div>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto max-w-6xl px-4 md:px-6 pt-32 pb-24">
        {/* Hero */}
        <motion.div
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="text-[#00D4FF] text-sm font-medium tracking-[0.2em] uppercase mb-4"
          >
            About Us
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Building the infrastructure<br />
            <span className="text-gradient">people actually need</span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Swarp Foundation is a software company based in Milan, Italy. We design and
            build tools that make blockchain technology accessible, secure, and fair for
            everyone, not just the technically inclined.
          </motion.p>
        </motion.div>

        {/* Tabs Section */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <AnimatedTabs tabs={aboutTabs} className="max-w-3xl" />
        </motion.div>

        {/* Products Section */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-[#00D4FF] text-sm font-medium tracking-[0.2em] uppercase mb-4">
            What We Build
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            An ecosystem of connected products
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mb-10 leading-relaxed">
            Each product solves a specific problem. Together, they form a complete platform
            where people can trade, launch, verify, and transact privately, all in one place.
          </p>
          <SwarpBentoGrid />
        </motion.div>

        {/* Company Info */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="rounded-xl border border-[#00D4FF]/10 bg-[#0A0E27]/40 backdrop-blur-sm p-8 md:p-10">
            <p className="text-[#00D4FF] text-sm font-medium tracking-[0.2em] uppercase mb-4">
              Legal Entity
            </p>
            <h2 className="text-2xl font-bold text-white mb-6">
              SWARP FOUNDATION S.R.L.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 block mb-1">Legal Form</span>
                  <span className="text-gray-300">Societ\u00e0 a Responsabilit\u00e0 Limitata</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Registered Address</span>
                  <span className="text-gray-300">Viale Tunisia 22, 20124, Milano (MI), Italy</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">Email</span>
                  <a href="mailto:info@swarppay.com" className="text-[#00FFF0] hover:underline">
                    info@swarppay.com
                  </a>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 block mb-1">Company Registration</span>
                  <span className="text-gray-300 font-mono text-xs">14284090967</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">REA Number</span>
                  <span className="text-gray-300 font-mono text-xs">MI-2771688</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">VAT / Partita IVA</span>
                  <span className="text-gray-300 font-mono text-xs">14284090967</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">PEC</span>
                  <span className="text-gray-300 font-mono text-xs">swarpfoundation@pec.it</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Want to learn more?
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            Whether you are a potential partner, investor, or just curious about
            what we are building, we would love to hear from you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] font-medium hover:bg-[#00D4FF]/20 transition-all"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
