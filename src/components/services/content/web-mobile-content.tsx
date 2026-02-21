"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  LayoutTemplate,
  Smartphone,
  Server,
  Zap,
  BarChart3,
  Lock,
  MessageCircle,
  CreditCard,
  Music,
  Headphones,
  Phone,
  Image as ImageIcon,
  Ghost,
  Mail,
  Tv,
  Twitter,
  Globe,
} from "lucide-react";
import { ScrollMorphHero } from "@/components/ui/scroll-morph-hero";
import {
  ServiceContentLayout,
  ServiceHeader,
  ServiceCard,
  ServiceCTA,
} from "../service-content-layout";
import { cn } from "@/lib/utils";

// --- Phone Notification Center ---
function PhonePreview({
  notificationTitle = "SwarpPay",
  notificationDescription = "You received $99.00 USD",
  notificationTime = "2m ago",
}: {
  notificationTitle?: string;
  notificationDescription?: string;
  notificationTime?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl border border-white/10 bg-swarp-darker p-2 cursor-pointer overflow-visible"
    >
      <motion.div
        animate={{ y: isHovered ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative mx-auto h-[200px] w-[100px] rounded-[20px] bg-swarp-dark p-0.5 overflow-hidden"
      >
        <div className="relative h-full overflow-hidden rounded-[18px] bg-black">
          <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-3 pt-1">
            <span className="text-[6px] text-gray-600">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
            </span>
            <motion.div
              animate={{ backgroundColor: isHovered ? "#00D4FF" : "#262626" }}
              className="h-3 w-3 rounded-full flex items-center justify-center"
            >
              <Lock className="h-1.5 w-1.5 text-black" />
            </motion.div>
          </div>

          <motion.div
            animate={{
              y: isHovered ? 20 : -60,
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute left-1.5 right-1.5 top-4 z-20 rounded-lg bg-swarp-dark/95 border border-white/10 p-1.5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-md bg-swarp-blue/20 flex items-center justify-center flex-shrink-0">
                <Zap className="h-3 w-3 text-swarp-blue" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-medium text-white truncate">{notificationTitle}</span>
                  <span className="text-[6px] text-gray-500">{notificationTime}</span>
                </div>
                <p className="text-[6px] text-gray-400 truncate">{notificationDescription}</p>
              </div>
            </div>
          </motion.div>

          <div className="absolute top-10 left-1.5 right-1.5 grid grid-cols-4 gap-1">
            {[Phone, ImageIcon, Music, Mail, Tv, Twitter, Ghost, Headphones].map((Icon, i) => (
              <div
                key={i}
                className="h-5 w-5 rounded-md bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center"
              >
                <Icon className="h-2.5 w-2.5 text-gray-600" />
              </div>
            ))}
          </div>

          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full bg-gray-800" />
        </div>
      </motion.div>

      <div className="mt-2 text-center">
        <p className="text-[9px] font-medium text-swarp-blue">Mobile App</p>
        <p className="text-[7px] text-gray-600">Hover to interact</p>
      </div>
    </div>
  );
}

// --- Switch Component ---
function Switch({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
        checked ? "bg-swarp-blue" : "bg-gray-700"
      )}
    >
      <span
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transition-transform",
          checked ? "translate-x-4" : "translate-x-0"
        )}
      />
    </button>
  );
}

// --- Main Content ---
export function WebMobileContent() {
  const t = useTranslations("servicesContent.webMobile");
  const [features, setFeatures] = useState({
    auth: true,
    payments: true,
    admin: false,
    analytics: false,
    chat: false,
  });

  const getNotificationProps = () => {
    if (features.chat) return { title: "New Message", desc: "Sarah: Hey, launching today?", time: "Now" };
    if (features.payments) return { title: "SwarpPay", desc: "You received $99.00 USD", time: "2m" };
    if (features.analytics) return { title: "Weekly Report", desc: "Traffic up 24% this week", time: "1h" };
    if (features.auth) return { title: "Security Alert", desc: "New login from SF", time: "5m" };
    return { title: "System Update", desc: "Maintenance tonight", time: "1d" };
  };

  const notif = getNotificationProps();

  return (
    <ServiceContentLayout accentColor="cyan">
      <div className="px-6 py-8">
        {/* Header */}
        <ServiceHeader
          icon={<Globe className="w-5 h-5" />}
          title={t("badge")}
          subtitle={t("description")}
          accentColor="cyan"
        />

        <div className="text-center mb-8 mt-6">
          <h1 className="text-2xl font-bold text-white mb-2">{t("title")}</h1>
          <p className="text-xs text-gray-400">{t("interactiveDemo")}</p>
        </div>

        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="relative w-[280px] overflow-hidden rounded-xl border border-white/10 bg-swarp-dark shadow-xl">
            <div className="flex h-7 items-center gap-2 border-b border-white/10 bg-black px-2">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                <div className="h-2 w-2 rounded-full bg-amber-500/50" />
                <div className="h-2 w-2 rounded-full bg-emerald-500/50" />
              </div>
              <div className="flex-1 bg-white/5 rounded px-2 py-0.5 text-[8px] text-gray-500 font-mono border border-white/5">
                https://app.swarpfoundation.com
              </div>
            </div>
            <div className="relative h-[220px] bg-black overflow-hidden">
              <ScrollMorphHero />
            </div>
          </div>

          <PhonePreview
            notificationTitle={notif.title}
            notificationDescription={notif.desc}
            notificationTime={notif.time}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4 text-center">What We Deliver</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: LayoutTemplate, text: t("features.responsive") },
              { icon: Smartphone, text: t("features.performance") },
              { icon: Server, text: t("features.pwa") },
              { icon: Zap, text: t("features.offline") },
            ].map((item, i) => (
              <ServiceCard key={i} accentColor="cyan" className="flex items-center gap-2 !p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
                  <item.icon className="h-4 w-4 text-swarp-blue" />
                </div>
                <span className="text-xs text-gray-300">{item.text}</span>
              </ServiceCard>
            ))}
          </div>
        </div>

        <ServiceCard title="Configure Features" icon={<Zap className="h-4 w-4" />} accentColor="cyan" className="mb-8">
          <div className="grid gap-2">
            {[
              { id: "auth", icon: Lock, label: "Auth" },
              { id: "payments", icon: CreditCard, label: "Payments" },
              { id: "admin", icon: LayoutTemplate, label: "Admin" },
              { id: "analytics", icon: BarChart3, label: "Analytics" },
              { id: "chat", icon: MessageCircle, label: "Live Chat" },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-swarp-blue/20 text-swarp-blue">
                    <item.icon className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-medium text-gray-300">{item.label}</span>
                </div>
                <Switch
                  checked={features[item.id as keyof typeof features]}
                  onCheckedChange={(v) => setFeatures({ ...features, [item.id]: v })}
                />
              </div>
            ))}
          </div>
        </ServiceCard>

        <ServiceCard className="mb-8" accentColor="cyan">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {["React", "Next.js", "React Native", "Node.js", "PostgreSQL", "TypeScript"].map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-gray-300">
                {tech}
              </span>
            ))}
          </div>
        </ServiceCard>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-swarp-blue hover:bg-swarp-cyan text-black font-bold text-sm rounded-lg transition-all"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </ServiceContentLayout>
  );
}

export default WebMobileContent;
