"use client";

import { motion } from "framer-motion";
import { 
  Wallet, Rocket, Shield, ArrowRight, 
  CreditCard, BarChart3, Users, Lock, Zap, Globe,
  FileCheck, Fingerprint, UserCheck, Building2,
  TrendingUp, ShieldCheck, Coins, Target
} from "lucide-react";
import { cn } from "@/lib/utils";
import { KeyboardLink } from "@/components/ui/keyboard-button";
import { AetherBackground } from "@/components/ui/aether-background";
import SecurityCard from "@/components/products/security-card";

// Product data based on business plan
const PRODUCTS = [
  {
    id: "swarppay",
    name: "SwarpPay",
    tagline: "All-in-One Custodial Trading",
    description: "A Solana-first custodial trading app where retail users can buy and sell supported crypto assets with fiat, trade curated Solana tokens, and access safer launch participation—all in a single interface.",
    longDescription: "SwarpPay addresses the fragmented Solana ecosystem where users currently jump between wallets, DEX tools, charts, token scanners, and social channels to complete one decision. This increases mistakes and scam exposure. SwarpPay provides an exchange-style UX with custody-grade operational controls including 2FA, step-up authentication, device binding, withdrawal risk rules, anomaly detection, and incident response processes.",
    icon: Wallet,
    color: "cyan",
    gradient: "from-cyan-500 to-blue-500",
    features: [
      { icon: CreditCard, title: "Fiat On/Off-Ramp", desc: "Buy and sell crypto with fiat via embedded third-party on/off-ramp providers" },
      { icon: Lock, title: "Custodial UX", desc: "Users do not export private keys; Swarp provides custody-grade operational controls" },
      { icon: FileCheck, title: "Curated Listings", desc: "Tokens listed only after risk screening, disclosures, and minimum liquidity thresholds" },
      { icon: BarChart3, title: "Clear Fee Disclosure", desc: "Platform fee shown separately from Solana network fees and underlying pool fees" },
      { icon: ShieldCheck, title: "Security Controls", desc: "2FA, step-up auth, device binding, withdrawal risk rules, and anomaly detection" },
      { icon: Target, title: "Risk Controls", desc: "Manual review triggers and incident response aligned with partner requirements" },
    ],
    stats: [
      { label: "Platform Fee", value: "0.50%", desc: "per swap (buy/sell)" },
      { label: "Security", value: "2FA", desc: "+ device binding" },
      { label: "Controls", value: "Custody", desc: "grade operations" },
    ],
    cta: { label: "Try Demo", href: "https://dash.swarppay.com" },
  },
  {
    id: "swarplaunch",
    name: "SwarpLaunch",
    tagline: "Curated Token Launchpad",
    description: "A request-only curated launchpad with standardized launch mechanics and per-user caps to reduce Sybil capture. Fair participation enforced through SwarpID verification.",
    longDescription: "Most token launches are unvetted and unsafe, with common hidden mechanics and liquidity traps. SwarpLaunch addresses this through a curated, request-only model where projects submit launch requests and Swarp evaluates legitimacy, token design, wallet disclosures, and readiness. Acceptance is not pay-to-launch. The bonding phase uses standardized mechanics with per-person caps and non-transferability until graduation.",
    icon: Rocket,
    color: "purple",
    gradient: "from-purple-500 to-pink-500",
    features: [
      { icon: FileCheck, title: "Request & Review", desc: "Projects submit launch requests; Swarp evaluates legitimacy and readiness. Not pay-to-launch" },
      { icon: Users, title: "Per-Person Fairness", desc: "Bonding restricted to SwarpID verified users, capped at 1% of total supply per user" },
      { icon: Lock, title: "Non-Transferability", desc: "Tokens non-transferable during bonding to reduce OTC bypass. Restrictions lift at graduation" },
      { icon: Zap, title: "Graduation to Meteora", desc: "Liquidity migrates to Meteora via defined, published process. Trading becomes permissionless" },
      { icon: Coins, title: "Creator Allocation", desc: "Standard 2% allocation at acceptance, disclosed and wallet-labeled, locked during bonding" },
      { icon: TrendingUp, title: "Transparent Dashboards", desc: "Fixed supply, no post-mint expansion, published launch parameters" },
    ],
    stats: [
      { label: "Bonding Fee", value: "2.00%", desc: "per buy and sell" },
      { label: "Swarp Share", value: "1.50%", desc: "platform fee" },
      { label: "Creator Share", value: "0.50%", desc: "of trades" },
    ],
    cta: { label: "Apply to Launch", href: "/contact" },
  },
  {
    id: "swarpid",
    name: "SwarpID",
    tagline: "Verification & Anti-Duplicate Layer",
    description: "Enforce one active verified human credential per person for gated actions like launch participation and higher-risk operations. Enables stronger compliance and risk controls for fiat features.",
    longDescription: "Fairness in the Solana ecosystem is currently per-wallet, not per-person. Bots and Sybil attacks dominate early markets through per-wallet systems that allow one human to control many wallets, defeating fairness and distorting price discovery. SwarpID enforces one active verified human credential per person with optional binding to a primary wallet, enabling true per-person fairness.",
    icon: Shield,
    color: "green",
    gradient: "from-emerald-500 to-cyan-500",
    features: [
      { icon: Fingerprint, title: "Identity Verification", desc: "Third-party KYC plus Swarp anti-duplicate checks (name/address normalization, device signals)" },
      { icon: UserCheck, title: "One Person, One Credential", desc: "Enforces unique human verification with optional primary wallet binding" },
      { icon: Shield, title: "Risk-Based Controls", desc: "Device and risk signals with manual review for identity risk scoring" },
      { icon: Building2, title: "B2B API", desc: "Packaged service for partners requiring per-person uniqueness for wallets and gated actions" },
      { icon: Globe, title: "Proof-of-Personhood (v2)", desc: "Future: uniqueness upgrades and portable reputation signals" },
      { icon: Lock, title: "Privacy Constraints", desc: "Subject to regulatory requirements and user privacy controls" },
    ],
    stats: [
    ],
    cta: { label: "Learn More", href: "/contact" },
    hasDemo: true,
  },
];

// Glass card component
function GlassCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      "relative rounded-2xl overflow-hidden",
      "backdrop-blur-xl border border-white/10",
      "bg-gradient-to-b from-white/[0.08] to-white/[0.02]",
      "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_20px_40px_-20px_rgba(0,0,0,0.5)]",
      className
    )}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      {children}
    </div>
  );
}

// Product section component
function ProductSection({ product, index }: { product: typeof PRODUCTS[0]; index: number }) {
  const isReversed = index % 2 === 1;
  const Icon = product.icon;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      id={product.id}
      className="relative py-20"
    >
      {/* Background glow */}
      <div className={cn(
        "absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 pointer-events-none",
        isReversed ? "right-0" : "left-0",
        product.color === "cyan" && "bg-cyan-500",
        product.color === "purple" && "bg-purple-500",
        product.color === "green" && "bg-emerald-500"
      )} style={{ top: "50%", transform: "translateY(-50%)" }} />

      <div className={cn(
        "relative grid lg:grid-cols-2 gap-12 items-center",
        isReversed && "lg:grid-flow-dense"
      )}>
        {/* Content */}
        <div className={cn(isReversed && "lg:col-start-2")}>
          {/* Badge */}
          <div className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6",
            "border bg-gradient-to-r",
            product.color === "cyan" && "border-cyan-500/30 from-cyan-500/10 to-blue-500/10",
            product.color === "purple" && "border-purple-500/30 from-purple-500/10 to-pink-500/10",
            product.color === "green" && "border-emerald-500/30 from-emerald-500/10 to-cyan-500/10"
          )}>
            <Icon className={cn(
              "w-4 h-4",
              product.color === "cyan" && "text-cyan-400",
              product.color === "purple" && "text-purple-400",
              product.color === "green" && "text-emerald-400"
            )} />
            <span className={cn(
              "text-xs font-semibold uppercase tracking-wider",
              product.color === "cyan" && "text-cyan-400",
              product.color === "purple" && "text-purple-400",
              product.color === "green" && "text-emerald-400"
            )}>{product.tagline}</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className={cn(
              "bg-gradient-to-r bg-clip-text text-transparent",
              product.gradient
            )}>{product.name}</span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-400 mb-4 leading-relaxed">
            {product.description}
          </p>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            {product.longDescription}
          </p>

          {/* Features grid */}
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {product.features.map((feature, i) => {
              const FeatureIcon = feature.icon;
              return (
                <GlassCard key={i} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0",
                      product.color === "cyan" && "bg-cyan-500/20 text-cyan-400",
                      product.color === "purple" && "bg-purple-500/20 text-purple-400",
                      product.color === "green" && "bg-emerald-500/20 text-emerald-400"
                    )}>
                      <FeatureIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mb-8">
            {product.stats.map((stat, i) => (
              <div key={i}>
                <div className={cn(
                  "text-2xl font-bold",
                  product.color === "cyan" && "text-cyan-400",
                  product.color === "purple" && "text-purple-400",
                  product.color === "green" && "text-emerald-400"
                )}>{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
                <div className="text-[10px] text-gray-600">{stat.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <KeyboardLink
            href={product.cta.href}
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            {product.cta.label}
          </KeyboardLink>
        </div>

        {/* Visual */}
        <div className={cn(
          "flex items-center justify-center",
          isReversed && "lg:col-start-1"
        )}>
          {product.hasDemo ? (
            <SecurityCard name="Verified Human" email="user@swarpid.com" delay={6000} />
          ) : (
            <ProductVisual product={product} />
          )}
        </div>
      </div>
    </motion.section>
  );
}

// Product visual for SwarpPay and SwarpLaunch
function ProductVisual({ product }: { product: typeof PRODUCTS[0] }) {
  const Icon = product.icon;

  return (
    <GlassCard className="w-full max-w-[400px] aspect-square p-8">
      <div className="relative h-full flex flex-col items-center justify-center">
        {/* Animated rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className={cn(
                "absolute rounded-full border",
                product.color === "cyan" && "border-cyan-500/20",
                product.color === "purple" && "border-purple-500/20",
                product.color === "green" && "border-emerald-500/20"
              )}
              style={{
                width: `${60 + i * 25}%`,
                height: `${60 + i * 25}%`,
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                delay: i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Center icon */}
        <motion.div
          className={cn(
            "relative z-10 flex items-center justify-center w-24 h-24 rounded-2xl",
            "bg-gradient-to-br shadow-lg",
            product.gradient
          )}
          animate={{
            boxShadow: [
              `0 0 30px rgba(0,255,240,0.3)`,
              `0 0 60px rgba(0,255,240,0.5)`,
              `0 0 30px rgba(0,255,240,0.3)`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon className="w-12 h-12 text-white" />
        </motion.div>

        {/* Product name */}
        <h3 className="mt-8 text-xl font-bold text-white">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-2">{product.tagline}</p>

        {/* Feature chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {product.features.slice(0, 3).map((f, i) => (
            <span
              key={i}
              className={cn(
                "text-[10px] px-2 py-1 rounded-full border",
                product.color === "cyan" && "border-cyan-500/30 text-cyan-400 bg-cyan-500/10",
                product.color === "purple" && "border-purple-500/30 text-purple-400 bg-purple-500/10",
                product.color === "green" && "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
              )}
            >
              {f.title}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}

// Ecosystem overview component
function EcosystemOverview() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <GlassCard className="p-8 md:p-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Swarp <span className="text-gradient">Ecosystem</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Three integrated components working together to reduce fragmentation, increase transparency, and enforce fairness in the Solana ecosystem.
          </p>
        </div>

        {/* Flow diagram */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting lines (hidden on mobile) */}
          <div className="hidden md:block absolute top-1/2 left-[33%] w-[34%] h-px bg-gradient-to-r from-cyan-500/50 to-purple-500/50" />
          <div className="hidden md:block absolute top-1/2 right-[33%] w-[34%] h-px bg-gradient-to-r from-purple-500/50 to-emerald-500/50" />

          {PRODUCTS.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.a
                key={product.id}
                href={`#${product.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "group relative p-6 rounded-xl border transition-all duration-300",
                  "bg-white/[0.02] hover:bg-white/[0.05]",
                  product.color === "cyan" && "border-cyan-500/20 hover:border-cyan-500/40",
                  product.color === "purple" && "border-purple-500/20 hover:border-purple-500/40",
                  product.color === "green" && "border-emerald-500/20 hover:border-emerald-500/40"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-xl mb-4 transition-transform group-hover:scale-110",
                  "bg-gradient-to-br",
                  product.gradient
                )}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{product.tagline}</p>
                <div className="flex items-center gap-1 text-xs font-medium">
                  <span className={cn(
                    product.color === "cyan" && "text-cyan-400",
                    product.color === "purple" && "text-purple-400",
                    product.color === "green" && "text-emerald-400"
                  )}>Learn more</span>
                  <ArrowRight className={cn(
                    "w-3 h-3 transition-transform group-hover:translate-x-1",
                    product.color === "cyan" && "text-cyan-400",
                    product.color === "purple" && "text-purple-400",
                    product.color === "green" && "text-emerald-400"
                  )} />
                </div>
              </motion.a>
            );
          })}
        </div>
      </GlassCard>
    </motion.section>
  );
}

// Fee summary section
function FeeSummary() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <GlassCard className="p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
          Fee <span className="text-gradient">Summary</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* SwarpPay Fees */}
          <div className="p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">SwarpPay</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Listed token swaps</span>
                <span className="text-white font-semibold">0.50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Graduated tokens</span>
                <span className="text-white font-semibold">Pool fees only</span>
              </div>
            </div>
          </div>

          {/* SwarpLaunch Fees */}
          <div className="p-6 rounded-xl border border-purple-500/20 bg-purple-500/5">
            <h3 className="text-lg font-bold text-purple-400 mb-4">SwarpLaunch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Bonding phase</span>
                <span className="text-white font-semibold">2.00%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">↳ Swarp share</span>
                <span className="text-gray-300">1.50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">↳ Creator share</span>
                <span className="text-gray-300">0.50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Post-graduation pool</span>
                <span className="text-white font-semibold">~1.00%</span>
              </div>
            </div>
          </div>

          {/* SwarpID Fees */}
          <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <h3 className="text-lg font-bold text-emerald-400 mb-4">SwarpID B2B</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Unique issuance</span>
                <span className="text-white font-semibold">$3.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">API validation</span>
                <span className="text-white font-semibold">$0.02</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Platform minimum</span>
                <span className="text-white font-semibold">$2,500/mo</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.section>
  );
}

export default function ProductsPage() {
  return (
    <AetherBackground className="min-h-screen">
      {/* CSS for SecurityCard animations */}
      <style jsx global>{`
        @keyframes draw-outline {
          0% {
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
          }
          100% {
            stroke-dasharray: 300;
            stroke-dashoffset: 0;
          }
        }
        @keyframes draw {
          0% {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
          }
          100% {
            stroke-dasharray: 100;
            stroke-dashoffset: 0;
          }
        }
        .animate-draw-outline {
          animation: draw-outline 2s ease-out forwards;
        }
        .animate-draw {
          animation: draw 1s ease-out 1.5s forwards;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
        }
      `}</style>

      <div className="pt-24 pb-12">
        <div className="relative z-10 max-w-6xl mx-auto px-4 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Product Suite</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">Build on </span>
              <span className="text-gradient">Swarp</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              A safer, simpler way for mainstream users to access Solana. One custodial interface for fiat-to-crypto access, curated trading, and fair launch participation—designed with compliance readiness from day one.
            </motion.p>
          </div>

          {/* Ecosystem Overview */}
          <EcosystemOverview />

          {/* Product Sections */}
          {PRODUCTS.map((product, i) => (
            <ProductSection key={product.id} product={product} index={i} />
          ))}

          {/* Fee Summary */}
          <FeeSummary />

          {/* Bottom CTA */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-16"
          >
            <GlassCard className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-8">
                Join the waitlist for early access or reach out to discuss partnership opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <KeyboardLink href="https://dash.swarppay.com" variant="primary" size="lg">
                  Try SwarpPay Demo
                </KeyboardLink>
                <KeyboardLink href="/contact" variant="secondary" size="lg">
                  Contact Us
                </KeyboardLink>
              </div>
            </GlassCard>
          </motion.section>
        </div>
      </div>
    </AetherBackground>
  );
}