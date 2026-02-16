"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedTabs } from "@/components/ui/animated-tabs";
import { SwarpBentoGrid } from "@/components/ui/swarp-bento-grid";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function AboutPage() {
  const t = useTranslations("about");

  const aboutTabs = [
    {
      id: "mission",
      label: t("tabs.mission.label"),
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">{t("tabs.mission.title")}</h3>
          <p className="text-gray-400 leading-relaxed">{t("tabs.mission.p1")}</p>
          <p className="text-gray-400 leading-relaxed">{t("tabs.mission.p2")}</p>
        </div>
      ),
    },
    {
      id: "approach",
      label: t("tabs.approach.label"),
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">{t("tabs.approach.title")}</h3>
          <p className="text-gray-400 leading-relaxed">{t("tabs.approach.p1")}</p>
          <p className="text-gray-400 leading-relaxed">{t("tabs.approach.p2")}</p>
        </div>
      ),
    },
    {
      id: "why",
      label: t("tabs.why.label"),
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">{t("tabs.why.title")}</h3>
          <p className="text-gray-400 leading-relaxed">{t("tabs.why.p1")}</p>
          <p className="text-gray-400 leading-relaxed">{t("tabs.why.p2")}</p>
        </div>
      ),
    },
  ];

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
            {t("hero.eyebrow")}
          </motion.p>
          <motion.h1
            custom={1}
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {t("hero.title")}<br />
            <span className="text-gradient">{t("hero.titleAccent")}</span>
          </motion.h1>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            {t("hero.description")}
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
            {t("products.eyebrow")}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("products.title")}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mb-10 leading-relaxed">
            {t("products.description")}
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
              {t("company.eyebrow")}
            </p>
            <h2 className="text-2xl font-bold text-white mb-6">
              SWARP FOUNDATION S.R.L.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 block mb-1">{t("company.legalForm")}</span>
                  <span className="text-gray-300">Societ\u00e0 a Responsabilit\u00e0 Limitata</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">{t("company.registeredAddress")}</span>
                  <span className="text-gray-300">Viale Tunisia 22, 20124, Milano (MI), Italy</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">{t("company.email")}</span>
                  <a href="mailto:info@swarppay.com" className="text-[#00FFF0] hover:underline">
                    info@swarppay.com
                  </a>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-500 block mb-1">{t("company.companyRegistration")}</span>
                  <span className="text-gray-300 font-mono text-xs">14284090967</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">{t("company.reaNumber")}</span>
                  <span className="text-gray-300 font-mono text-xs">MI-2771688</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">{t("company.vat")}</span>
                  <span className="text-gray-300 font-mono text-xs">14284090967</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-1">{t("company.pec")}</span>
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
            {t("cta.title")}
          </h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">
            {t("cta.description")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#00D4FF]/10 border border-[#00D4FF]/20 text-[#00D4FF] font-medium hover:bg-[#00D4FF]/20 transition-all"
          >
            {t("cta.button")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
