"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { ScrollMorphHero } from "@/components/ui/scroll-morph-hero";

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
      className="relative rounded-2xl border border-neutral-800 bg-neutral-900 p-2 cursor-pointer overflow-visible"
    >
      <motion.div
        animate={{ y: isHovered ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative mx-auto h-[200px] w-[100px] rounded-[20px] bg-neutral-800 p-0.5 overflow-hidden"
      >
        <div className="relative h-full overflow-hidden rounded-[18px] bg-neutral-950">
          <div className="absolute left-0 right-0 top-0 flex items-center justify-between px-3 pt-1">
            <span className="text-[6px] text-neutral-500">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
            </span>
            <motion.div
              animate={{ backgroundColor: isHovered ? "#00fff0" : "#262626" }}
              className="h-3 w-3 rounded-full flex items-center justify-center"
            >
              <Lock className="h-1.5 w-1.5 text-neutral-900" />
            </motion.div>
          </div>

          <motion.div
            animate={{
              y: isHovered ? 20 : -60,
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute left-1.5 right-1.5 top-4 z-20 rounded-lg bg-neutral-800/95 border border-neutral-700 p-1.5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-md bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                <Zap className="h-3 w-3 text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[7px] font-medium text-white truncate">{notificationTitle}</span>
                  <span className="text-[6px] text-neutral-500">{notificationTime}</span>
                </div>
                <p className="text-[6px] text-neutral-400 truncate">{notificationDescription}</p>
              </div>
            </div>
          </motion.div>

          <div className="absolute top-10 left-1.5 right-1.5 grid grid-cols-4 gap-1">
            {[Phone, ImageIcon, Music, Mail, Tv, Twitter, Ghost, Headphones].map((Icon, i) => (
              <div
                key={i}
                className="h-5 w-5 rounded-md bg-gradient-to-br from-neutral-700 to-neutral-800 flex items-center justify-center"
              >
                <Icon className="h-2.5 w-2.5 text-neutral-500" />
              </div>
            ))}
          </div>

          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full bg-neutral-700" />
        </div>
      </motion.div>

      <div className="mt-2 text-center">
        <p className="text-[9px] font-medium text-cyan-400">Mobile App</p>
        <p className="text-[7px] text-neutral-500">Hover to interact</p>
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
      className={`inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors ${
        checked ? "bg-cyan-500" : "bg-neutral-700"
      }`}
    >
      <span
        className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transition-transform ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// --- Main Content ---
export function WebMobileContent() {
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
    <div className="min-h-full bg-neutral-950 text-neutral-100 overflow-x-hidden">
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Interactive Previews</h1>
          <p className="text-xs text-neutral-400">Scroll inside browser or hover on phone</p>
        </div>

        <div className="flex items-center justify-center gap-6 mb-10">
          <div className="relative w-[280px] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-xl">
            <div className="flex h-7 items-center gap-2 border-b border-neutral-800 bg-neutral-950 px-2">
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-red-500/50" />
                <div className="h-2 w-2 rounded-full bg-amber-500/50" />
                <div className="h-2 w-2 rounded-full bg-emerald-500/50" />
              </div>
              <div className="flex-1 bg-neutral-900/50 rounded px-2 py-0.5 text-[8px] text-neutral-400 font-mono border border-neutral-800/50">
                https://app.swarpfoundation.com
              </div>
            </div>
            <div className="relative h-[220px] bg-neutral-950 overflow-hidden">
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
              { icon: LayoutTemplate, text: "UI/UX Design System", color: "cyan" },
              { icon: Smartphone, text: "iOS & Android Apps", color: "purple" },
              { icon: Server, text: "Scalable Backend", color: "emerald" },
              { icon: Zap, text: "Deploy & Monitor", color: "orange" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 p-3 rounded-lg border border-neutral-800 bg-neutral-900/50">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-800">
                  <item.icon className="h-4 w-4 text-cyan-400" />
                </div>
                <span className="text-xs text-neutral-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-neutral-800 bg-neutral-900/50 rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-white">Configure Features</h3>
            <Zap className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="grid gap-2">
            {[
              { id: "auth", icon: Lock, label: "Auth", color: "bg-violet-500/20 text-violet-400" },
              { id: "payments", icon: CreditCard, label: "Payments", color: "bg-emerald-500/20 text-emerald-400" },
              { id: "admin", icon: LayoutTemplate, label: "Admin", color: "bg-orange-500/20 text-orange-400" },
              { id: "analytics", icon: BarChart3, label: "Analytics", color: "bg-blue-500/20 text-blue-400" },
              { id: "chat", icon: MessageCircle, label: "Live Chat", color: "bg-pink-500/20 text-pink-400" },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950 p-2">
                <div className="flex items-center gap-2">
                  <div className={`flex h-6 w-6 items-center justify-center rounded-full ${item.color}`}>
                    <item.icon className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
                <Switch
                  checked={features[item.id as keyof typeof features]}
                  onCheckedChange={(v) => setFeatures({ ...features, [item.id]: v })}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg bg-neutral-900/50 p-4 border border-neutral-800 mb-8">
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold mb-2">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {["React", "Next.js", "React Native", "Node.js", "PostgreSQL", "TypeScript"].map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-[10px] text-neutral-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm rounded-lg transition-all"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WebMobileContent;
