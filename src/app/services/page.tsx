"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { KeyboardLink } from "@/components/ui/keyboard-button";
import { AetherBackground } from "@/components/ui/aether-background";
import { ServiceContentWrapper } from "@/components/services/service-content-wrapper";
import { useServicesData, ServiceItem } from "@/lib/services-data";
import { useTranslations } from "next-intl";

const WebMobileContent = dynamic(() => import("@/components/services/content/web-mobile-content").then(m => ({ default: m.WebMobileContent })), { ssr: false });
const SoftwareToolsContent = dynamic(() => import("@/components/services/content/software-tools-content").then(m => ({ default: m.SoftwareToolsContent })), { ssr: false });
const AISystemsContent = dynamic(() => import("@/components/services/content/ai-systems-content").then(m => ({ default: m.AISystemsContent })), { ssr: false });
const BlockchainContent = dynamic(() => import("@/components/services/content/blockchain-content").then(m => ({ default: m.BlockchainContent })), { ssr: false });
const SecurityContent = dynamic(() => import("@/components/services/content/security-content").then(m => ({ default: m.SecurityContent })), { ssr: false });
const HardwareContent = dynamic(() => import("@/components/services/content/hardware-content").then(m => ({ default: m.HardwareContent })), { ssr: false });
const CloudDevOpsContent = dynamic(() => import("@/components/services/content/cloud-devops-content").then(m => ({ default: m.CloudDevOpsContent })), { ssr: false });
const EngineeringContent = dynamic(() => import("@/components/services/content/engineering-content").then(m => ({ default: m.EngineeringContent })), { ssr: false });
const IntegrationsContent = dynamic(() => import("@/components/services/content/integrations-content").then(m => ({ default: m.IntegrationsContent })), { ssr: false });
const DataAnalyticsContent = dynamic(() => import("@/components/services/content/data-analytics-content").then(m => ({ default: m.DataAnalyticsContent })), { ssr: false });
const QATestingContent = dynamic(() => import("@/components/services/content/qa-testing-content").then(m => ({ default: m.QATestingContent })), { ssr: false });
const UIUXDesignContent = dynamic(() => import("@/components/services/content/uiux-design-content").then(m => ({ default: m.UIUXDesignContent })), { ssr: false });

type Service = ServiceItem;

const colorMap: Record<string, { bg: string; border: string; glow: string; text: string; gradient: string }> = {
  cyan: {
    bg: "bg-swarp-blue/10",
    border: "border-swarp-blue/30",
    glow: "shadow-swarp-blue/20",
    text: "text-swarp-blue",
    gradient: "from-swarp-blue to-swarp-cyan"
  },
  purple: {
    bg: "bg-swarp-purple/10",
    border: "border-swarp-purple/30",
    glow: "shadow-swarp-purple/20",
    text: "text-swarp-purple",
    gradient: "from-swarp-purple to-swarp-blue"
  },
};

function ServiceCard({
  service,
  isSelected,
  onClick
}: {
  service: Service;
  isSelected: boolean;
  onClick: () => void;
}) {
  const colors = colorMap[service.color] || colorMap.cyan;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "group relative w-full p-4 rounded-xl transition-all duration-300",
        "backdrop-blur-md border text-left",
        isSelected
          ? cn(colors.bg, colors.border, "shadow-lg", colors.glow)
          : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
      )}
    >
      <div className={cn(
        "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
        "bg-gradient-to-r from-white/5 to-transparent",
        isSelected ? "opacity-100" : "group-hover:opacity-100"
      )} />

      <div className="relative flex items-start gap-3">
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-lg shrink-0",
          "backdrop-blur-sm border transition-all duration-300",
          isSelected
            ? cn(colors.bg, colors.border, colors.text)
            : "bg-white/5 border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/20"
        )}>
          <service.icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={cn(
              "font-semibold truncate transition-colors text-sm",
              isSelected ? "text-white" : "text-gray-200 group-hover:text-white"
            )}>
              {service.title}
            </span>
            {service.hasContent && (
              <Sparkles className={cn("w-3 h-3", colors.text)} />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{service.short}</p>
        </div>

        <ArrowRight className={cn(
          "w-4 h-4 shrink-0 transition-all duration-300",
          isSelected ? cn(colors.text, "translate-x-0 opacity-100") : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-50"
        )} />
      </div>
    </motion.button>
  );
}

function ComingSoonPreview({ service }: { service: Service }) {
  const t = useTranslations("servicesPage.preview");
  const colors = colorMap[service.color] || colorMap.cyan;

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={cn(
          "w-24 h-24 rounded-2xl flex items-center justify-center mb-6",
          "border-2 border-dashed",
          colors.bg, colors.border
        )}
      >
        <Clock className={cn("w-10 h-10", colors.text)} />
      </motion.div>

      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold text-white mb-3"
      >
        {service.title}
      </motion.h3>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-400 max-w-md mb-8"
      >
        {service.desc}
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full border",
          colors.bg, colors.border
        )}
      >
        <span className={cn("w-2 h-2 rounded-full animate-pulse", colors.text.replace('text-', 'bg-'))} />
        <span className={cn("text-sm font-medium", colors.text)}>{t("comingSoon")}</span>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-wrap justify-center gap-3"
      >
        {service.proof.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <CheckCircle2 className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs text-gray-400">{item}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-xs text-gray-600"
      >
        {t("expectedTimeline")} <span className="text-gray-400">{service.timeline}</span>
      </motion.div>
    </div>
  );
}

function ServicePreview({ service, servicesCount }: { service: Service | null; servicesCount: number }) {
  const t = useTranslations("servicesPage.preview");

  if (!service) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 rounded-3xl bg-gradient-to-br from-swarp-blue/20 to-swarp-purple/20 border border-white/10 flex items-center justify-center mb-6"
        >
          <Sparkles className="w-12 h-12 text-swarp-blue" />
        </motion.div>

        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-white mb-2"
        >
          {t("emptyTitle")}
        </motion.h3>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-sm"
        >
          {t("emptyDescription")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex items-center gap-2 text-sm text-gray-500"
        >
          <span className="w-2 h-2 rounded-full bg-swarp-blue animate-pulse" />
          <span>{t("availableCount", { count: servicesCount })}</span>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={service.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="h-full overflow-auto"
      >
        {service.hasContent ? (
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{service.title}</h2>
                <p className="text-gray-400">{service.desc}</p>
              </div>
              <div className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border",
                colorMap[service.color].bg,
                colorMap[service.color].border,
                colorMap[service.color].text
              )}>
                {service.timeline}
              </div>
            </div>

            <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
              <ServiceContentWrapper>
                {service.id === "web-mobile" && <WebMobileContent />}
                {service.id === "software-tools" && <SoftwareToolsContent />}
                {service.id === "ai-systems" && <AISystemsContent />}
                {service.id === "blockchain" && <BlockchainContent />}
                {service.id === "security" && <SecurityContent />}
                {service.id === "hardware" && <HardwareContent />}
                {service.id === "cloud" && <CloudDevOpsContent />}
                {service.id === "retainer" && <EngineeringContent />}
                {service.id === "integrations" && <IntegrationsContent />}
                {service.id === "data" && <DataAnalyticsContent />}
                {service.id === "qa" && <QATestingContent />}
                {service.id === "design" && <UIUXDesignContent />}
              </ServiceContentWrapper>
            </div>
          </div>
        ) : (
          <ComingSoonPreview service={service} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export default function ServicesPage() {
  const t = useTranslations("servicesPage");
  const services = useServicesData();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <AetherBackground className="min-h-screen">
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
                {t("hero.titleMain")}
              </span>
              <span className="bg-gradient-to-r from-swarp-blue to-swarp-purple bg-clip-text text-transparent">
                {" "}{t("hero.titleAccent")}
              </span>
            </h1>

            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              {t("hero.description")}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 content-start"
            >
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <ServiceCard
                    service={service}
                    isSelected={selectedService?.id === service.id}
                    onClick={() => setSelectedService(service)}
                  />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={cn(
                "relative min-h-[600px] rounded-3xl overflow-hidden",
                "backdrop-blur-xl border border-white/10",
                "bg-gradient-to-b from-white/[0.08] to-white/[0.02]",
                "shadow-[0_0_60px_-20px_rgba(0,212,255,0.15),inset_0_1px_0_rgba(255,255,255,0.1)]"
              )}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-swarp-blue/50 to-transparent" />

              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg" />

              <div className="relative h-full">
                <ServicePreview service={selectedService} servicesCount={services.filter((s) => s.hasContent).length} />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400 mb-4">{t("cta.title")}</p>
            <KeyboardLink
              href="/contact"
              variant="primary"
              size="lg"
              icon={<Calendar className="w-4 h-4" />}
            >
              {t("cta.button")}
            </KeyboardLink>
          </motion.div>
        </div>
      </div>
    </AetherBackground>
  );
}
