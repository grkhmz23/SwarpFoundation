"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export function SwarpPresale() {
  const t = useTranslations("presale");

  return (
    <section className="relative isolate py-12 md:py-20">
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#050714] shadow-[0_18px_60px_rgba(2,8,22,0.6)]"
        >
          <Image
            src="/swarp-presale-schematic.svg"
            alt={t("alt")}
            width={1080}
            height={1080}
            className="block h-auto w-full"
          />
        </motion.figure>
      </div>
    </section>
  );
}
