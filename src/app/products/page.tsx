"use client";

import { useMemo } from "react";
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
import { useTranslations } from "next-intl";

type ProductFeature = {
  icon: any;
  title: string;
  desc: string;
};

type ProductStat = {
  label: string;
  value: string;
  desc: string;
};

type Product = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  icon: any;
  color: "cyan" | "purple" | "green";
  gradient: string;
  features: ProductFeature[];
  stats: ProductStat[];
  cta: { label: string; href: string };
  hasDemo?: boolean;
};

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
function ProductSection({ product, index }: { product: Product; index: number }) {
  const t = useTranslations("products");
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
            <SecurityCard name={t("securityCard.name")} email="user@swarpid.com" delay={6000} />
          ) : (
            <ProductVisual product={product} />
          )}
        </div>
      </div>
    </motion.section>
  );
}

// Product visual for SwarpPay and SwarpLaunch
function ProductVisual({ product }: { product: Product }) {
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
function EcosystemOverview({ products }: { products: Product[] }) {
  const t = useTranslations("products.ecosystem");
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
            {t("titlePrefix")} <span className="text-gradient">{t("titleAccent")}</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Flow diagram */}
        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting lines (hidden on mobile) */}
          <div className="hidden md:block absolute top-1/2 left-[33%] w-[34%] h-px bg-gradient-to-r from-cyan-500/50 to-purple-500/50" />
          <div className="hidden md:block absolute top-1/2 right-[33%] w-[34%] h-px bg-gradient-to-r from-purple-500/50 to-emerald-500/50" />

          {products.map((product, i) => {
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
                  )}>{t("learnMore")}</span>
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
  const t = useTranslations("products.fees");
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16"
    >
      <GlassCard className="p-8 md:p-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
          {t("titlePrefix")} <span className="text-gradient">{t("titleAccent")}</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* SwarpPay Fees */}
          <div className="p-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">SwarpPay</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">{t("swarppay.listedTokenSwaps")}</span>
                <span className="text-white font-semibold">0.50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t("swarppay.graduatedTokens")}</span>
                <span className="text-white font-semibold">{t("swarppay.poolFeesOnly")}</span>
              </div>
            </div>
          </div>

          {/* SwarpLaunch Fees */}
          <div className="p-6 rounded-xl border border-purple-500/20 bg-purple-500/5">
            <h3 className="text-lg font-bold text-purple-400 mb-4">SwarpLaunch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">{t("swarplaunch.bondingPhase")}</span>
                <span className="text-white font-semibold">2.00%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t("swarplaunch.swarpShare")}</span>
                <span className="text-gray-300">1.50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t("swarplaunch.creatorShare")}</span>
                <span className="text-gray-300">0.50%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t("swarplaunch.postGraduationPool")}</span>
                <span className="text-white font-semibold">~1.00%</span>
              </div>
            </div>
          </div>

          {/* SwarpID Fees */}
          <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <h3 className="text-lg font-bold text-emerald-400 mb-4">SwarpID B2B</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">{t("swarpid.uniqueIssuance")}</span>
                <span className="text-white font-semibold">$3.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t("swarpid.apiValidation")}</span>
                <span className="text-white font-semibold">$0.02</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">{t("swarpid.platformMinimum")}</span>
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
  const t = useTranslations("products");
  const products = useMemo<Product[]>(
    () => [
      {
        id: "swarppay",
        name: "SwarpPay",
        tagline: t("items.swarppay.tagline"),
        description: t("items.swarppay.description"),
        longDescription: t("items.swarppay.longDescription"),
        icon: Wallet,
        color: "cyan",
        gradient: "from-cyan-500 to-blue-500",
        features: [
          { icon: CreditCard, title: t("items.swarppay.features.0.title"), desc: t("items.swarppay.features.0.desc") },
          { icon: Lock, title: t("items.swarppay.features.1.title"), desc: t("items.swarppay.features.1.desc") },
          { icon: FileCheck, title: t("items.swarppay.features.2.title"), desc: t("items.swarppay.features.2.desc") },
          { icon: BarChart3, title: t("items.swarppay.features.3.title"), desc: t("items.swarppay.features.3.desc") },
          { icon: ShieldCheck, title: t("items.swarppay.features.4.title"), desc: t("items.swarppay.features.4.desc") },
          { icon: Target, title: t("items.swarppay.features.5.title"), desc: t("items.swarppay.features.5.desc") },
        ],
        stats: [
          { label: t("items.swarppay.stats.0.label"), value: "0.50%", desc: t("items.swarppay.stats.0.desc") },
          { label: t("items.swarppay.stats.1.label"), value: "2FA", desc: t("items.swarppay.stats.1.desc") },
          { label: t("items.swarppay.stats.2.label"), value: "Custody", desc: t("items.swarppay.stats.2.desc") },
        ],
        cta: { label: t("items.swarppay.cta"), href: "https://dash.swarppay.com" },
      },
      {
        id: "swarplaunch",
        name: "SwarpLaunch",
        tagline: t("items.swarplaunch.tagline"),
        description: t("items.swarplaunch.description"),
        longDescription: t("items.swarplaunch.longDescription"),
        icon: Rocket,
        color: "purple",
        gradient: "from-purple-500 to-pink-500",
        features: [
          { icon: FileCheck, title: t("items.swarplaunch.features.0.title"), desc: t("items.swarplaunch.features.0.desc") },
          { icon: Users, title: t("items.swarplaunch.features.1.title"), desc: t("items.swarplaunch.features.1.desc") },
          { icon: Lock, title: t("items.swarplaunch.features.2.title"), desc: t("items.swarplaunch.features.2.desc") },
          { icon: Zap, title: t("items.swarplaunch.features.3.title"), desc: t("items.swarplaunch.features.3.desc") },
          { icon: Coins, title: t("items.swarplaunch.features.4.title"), desc: t("items.swarplaunch.features.4.desc") },
          { icon: TrendingUp, title: t("items.swarplaunch.features.5.title"), desc: t("items.swarplaunch.features.5.desc") },
        ],
        stats: [
          { label: t("items.swarplaunch.stats.0.label"), value: "2.00%", desc: t("items.swarplaunch.stats.0.desc") },
          { label: t("items.swarplaunch.stats.1.label"), value: "1.50%", desc: t("items.swarplaunch.stats.1.desc") },
          { label: t("items.swarplaunch.stats.2.label"), value: "0.50%", desc: t("items.swarplaunch.stats.2.desc") },
        ],
        cta: { label: t("items.swarplaunch.cta"), href: "/contact" },
      },
      {
        id: "swarpid",
        name: "SwarpID",
        tagline: t("items.swarpid.tagline"),
        description: t("items.swarpid.description"),
        longDescription: t("items.swarpid.longDescription"),
        icon: Shield,
        color: "green",
        gradient: "from-emerald-500 to-cyan-500",
        features: [
          { icon: Fingerprint, title: t("items.swarpid.features.0.title"), desc: t("items.swarpid.features.0.desc") },
          { icon: UserCheck, title: t("items.swarpid.features.1.title"), desc: t("items.swarpid.features.1.desc") },
          { icon: Shield, title: t("items.swarpid.features.2.title"), desc: t("items.swarpid.features.2.desc") },
          { icon: Building2, title: t("items.swarpid.features.3.title"), desc: t("items.swarpid.features.3.desc") },
          { icon: Globe, title: t("items.swarpid.features.4.title"), desc: t("items.swarpid.features.4.desc") },
          { icon: Lock, title: t("items.swarpid.features.5.title"), desc: t("items.swarpid.features.5.desc") },
        ],
        stats: [],
        cta: { label: t("items.swarpid.cta"), href: "/contact" },
        hasDemo: true,
      },
    ],
    [t]
  );

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

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">{t("hero.titlePrefix")} </span>
              <span className="text-gradient">Swarp</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>
          </div>

          {/* Ecosystem Overview */}
          <EcosystemOverview products={products} />

          {/* Product Sections */}
          {products.map((product, i) => (
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
                {t("bottomCta.title")}
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto mb-8">
                {t("bottomCta.description")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <KeyboardLink href="https://dash.swarppay.com" variant="primary" size="lg">
                  {t("bottomCta.demo")}
                </KeyboardLink>
                <KeyboardLink href="/contact" variant="secondary" size="lg">
                  {t("bottomCta.contact")}
                </KeyboardLink>
              </div>
            </GlassCard>
          </motion.section>
        </div>
      </div>
    </AetherBackground>
  );
}
