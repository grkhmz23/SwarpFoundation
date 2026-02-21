"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette, Type, Layout, Smartphone, Monitor, Tablet,
  Component, Copy, Check, Zap,
  ChevronRight, Grid3X3,
  Accessibility, Contrast, CheckCircle2, AlertCircle,
  Figma, PenTool, Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ServiceContentLayout,
  ServiceHeader,
  ServiceCard,
  ServiceTab,
  ServiceCTA,
} from "@/components/services/service-content-layout";

// Types
interface ColorToken {
  name: string;
  hex: string;
  usage: string;
}

interface ComponentItem {
  name: string;
  variants: string[];
  states: string[];
}

// Design System Viewer
function DesignSystem({ title }: { title: string }) {
  const [selectedComponent, setSelectedComponent] = useState("button");
  const [copied, setCopied] = useState(false);

  const components = {
    button: {
      name: "Button",
      variants: ["primary", "secondary", "ghost", "destructive"],
      sizes: ["sm", "md", "lg"],
      states: ["default", "hover", "active", "disabled", "loading"]
    },
    input: {
      name: "Input",
      variants: ["outline", "filled", "flushed"],
      sizes: ["sm", "md", "lg"],
      states: ["default", "focus", "error", "disabled"]
    },
    card: {
      name: "Card",
      variants: ["default", "outlined", "elevated"],
      sizes: ["sm", "md", "lg"],
      states: ["default", "hover", "selected"]
    }
  };

  const copyCode = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = components[selectedComponent as keyof typeof components];

  return (
    <div className="bg-swarp-dark/80 rounded-xl border border-swarp-purple/20 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Component className="w-5 h-5 text-swarp-purple" />
          <h4 className="text-sm font-bold text-white">{title}</h4>
        </div>
        <div className="flex gap-1">
          {Object.keys(components).map((key) => (
            <button
              key={key}
              onClick={() => setSelectedComponent(key)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all",
                selectedComponent === key
                  ? "bg-swarp-purple/20 text-swarp-purple border border-swarp-purple/30"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              )}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Component Preview */}
      <div className="flex-1 bg-black/40 rounded-lg border border-white/5 p-6 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(157,78,221,0.1),transparent_50%)]" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full gap-4">
          {selectedComponent === "button" && (
            <div className="flex flex-wrap gap-3 justify-center">
              <button className="px-4 py-2 rounded-lg bg-swarp-purple text-white text-sm font-medium hover:bg-swarp-purple/80 transition-colors">
                Primary
              </button>
              <button className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors">
                Secondary
              </button>
              <button className="px-4 py-2 rounded-lg text-white/70 text-sm font-medium hover:bg-white/5 transition-colors">
                Ghost
              </button>
              <button className="px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm font-medium">
                Destructive
              </button>
            </div>
          )}

          {selectedComponent === "input" && (
            <div className="w-full max-w-xs space-y-3">
              <input 
                type="text" 
                placeholder="Default input..."
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-swarp-purple/50"
              />
              <input 
                type="text" 
                placeholder="Error state..."
                className="w-full px-3 py-2 rounded-lg bg-red-500/5 border border-red-500/30 text-white text-sm focus:outline-none"
              />
              <input 
                type="text" 
                placeholder="Disabled..."
                disabled
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-500 text-sm cursor-not-allowed"
              />
            </div>
          )}

          {selectedComponent === "card" && (
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 w-48">
                <div className="h-2 w-12 bg-swarp-purple/50 rounded mb-2" />
                <div className="h-2 w-full bg-white/10 rounded mb-1" />
                <div className="h-2 w-2/3 bg-white/10 rounded" />
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-swarp-purple/30 shadow-lg shadow-swarp-purple/10 w-48">
                <div className="h-2 w-12 bg-swarp-purple rounded mb-2" />
                <div className="h-2 w-full bg-white/10 rounded mb-1" />
                <div className="h-2 w-2/3 bg-white/10 rounded" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Variants & States */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">Variants</div>
          <div className="flex flex-wrap gap-1.5">
            {current.variants.map((v) => (
              <span key={v} className="text-[9px] px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                {v}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">States</div>
          <div className="flex flex-wrap gap-1.5">
            {current.states.map((s) => (
              <span key={s} className="text-[9px] px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Code Snippet */}
      <div className="mt-3 p-2 rounded-lg bg-[#09090b] border border-white/10 font-mono text-[10px] text-gray-400 flex items-center justify-between">
        <code>&lt;{current.name} variant=&quot;primary&quot; /&gt;</code>
        <button onClick={copyCode} className="p-1 hover:bg-white/5 rounded transition-colors">
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
        </button>
      </div>
    </div>
  );
}

// Color Token System
function ColorSystem() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [copiedHex, setCopiedHex] = useState(false);

  const colors = {
    brand: [
      { name: "swarp-purple", hex: "#9D4EDD", usage: "Primary buttons, links" },
      { name: "swarp-purple-light", hex: "#B15DFF", usage: "Hover states" },
      { name: "swarp-purple-dark", hex: "#7B2CBF", usage: "Active states" },
    ],
    semantic: [
      { name: "emerald-500", hex: "#10b981", usage: "Success, confirmation" },
      { name: "amber-500", hex: "#f59e0b", usage: "Warning, caution" },
      { name: "red-500", hex: "#ef4444", usage: "Error, destructive" },
      { name: "blue-500", hex: "#3b82f6", usage: "Info, links" },
    ],
    neutral: [
      { name: "white", hex: "#ffffff", usage: "Text primary" },
      { name: "gray-300", hex: "#d1d5db", usage: "Text secondary" },
      { name: "gray-600", hex: "#4b5563", usage: "Text muted" },
      { name: "gray-900", hex: "#111827", usage: "Backgrounds" },
    ]
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(true);
    setTimeout(() => setCopiedHex(false), 2000);
  };

  return (
    <div className="bg-swarp-dark/80 rounded-xl border border-swarp-purple/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-swarp-purple" />
          <h4 className="text-sm font-bold text-white">Color Tokens</h4>
        </div>
        <div className="text-[10px] text-gray-500">Token-based</div>
      </div>

      {Object.entries(colors).map(([category, colorList]) => (
        <div key={category} className="mb-4 last:mb-0">
          <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">{category}</div>
          <div className="grid grid-cols-4 gap-2">
            {colorList.map((color) => (
              <motion.div
                key={color.name}
                onClick={() => {
                  setSelectedColor(color.hex);
                  copyHex(color.hex);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer group"
              >
                <div 
                  className="w-full aspect-square rounded-lg border-2 border-transparent group-hover:border-white/20 transition-all relative overflow-hidden"
                  style={{ backgroundColor: color.hex }}
                >
                  {selectedColor === color.hex && copiedHex && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/50"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>
                <div className="mt-1 text-[9px] text-gray-400 truncate">{color.name}</div>
                <div className="text-[8px] text-gray-600 font-mono">{color.hex}</div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Usage */}
      {selectedColor && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3 rounded-lg bg-white/5 border border-white/10"
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-8 h-8 rounded border border-white/20"
              style={{ backgroundColor: selectedColor }}
            />
            <div>
              <div className="text-xs font-medium text-white">{selectedColor}</div>
              <div className="text-[10px] text-gray-500">
                {Object.values(colors).flat().find(c => c.hex === selectedColor)?.usage}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Typography Scale
function TypographyScale() {
  const scales = [
    { name: "H1", size: "48px", weight: "700", lineHeight: "1.1", sample: "The quick brown" },
    { name: "H2", size: "36px", weight: "700", lineHeight: "1.2", sample: "The quick brown" },
    { name: "H3", size: "24px", weight: "600", lineHeight: "1.3", sample: "The quick brown" },
    { name: "Body", size: "16px", weight: "400", lineHeight: "1.5", sample: "The quick brown fox jumps over the lazy dog" },
    { name: "Small", size: "14px", weight: "400", lineHeight: "1.5", sample: "The quick brown fox" },
    { name: "Caption", size: "12px", weight: "400", lineHeight: "1.4", sample: "The quick brown" },
  ];

  return (
    <div className="bg-swarp-dark/80 rounded-xl border border-swarp-purple/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Type className="w-5 h-5 text-swarp-purple" />
          <h4 className="text-sm font-bold text-white">Typography</h4>
        </div>
        <div className="text-[10px] text-gray-500">Inter / System</div>
      </div>

      <div className="space-y-4">
        {scales.map((scale) => (
          <div key={scale.name} className="group">
            <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
              <span className="font-mono">{scale.name}</span>
              <span className="font-mono">{scale.size} / {scale.weight}</span>
            </div>
            <div 
              className="text-white group-hover:text-swarp-purple transition-colors"
              style={{ 
                fontSize: scale.size, 
                fontWeight: scale.weight, 
                lineHeight: scale.lineHeight 
              }}
            >
              {scale.sample}
            </div>
          </div>
        ))}
      </div>

      {/* Font Weights */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="text-[10px] text-gray-500 mb-2 uppercase tracking-wider">Font Weights</div>
        <div className="flex gap-4">
          {[400, 500, 600, 700].map((weight) => (
            <div key={weight} className="text-center">
              <div className="text-lg text-white mb-1" style={{ fontWeight: weight }}>Aa</div>
              <div className="text-[9px] text-gray-500">{weight}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Responsive Breakpoints
function ResponsiveTester() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("desktop");

  const breakpoints = [
    { name: "Mobile", width: 375, icon: Smartphone, key: "mobile" },
    { name: "Tablet", width: 768, icon: Tablet, key: "tablet" },
    { name: "Desktop", width: 1440, icon: Monitor, key: "desktop" },
  ];

  return (
    <div className="bg-swarp-dark/80 rounded-xl border border-swarp-purple/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Layout className="w-5 h-5 text-swarp-purple" />
          <h4 className="text-sm font-bold text-white">Responsive</h4>
        </div>
        <div className="flex gap-1">
          {breakpoints.map((bp) => (
            <button
              key={bp.key}
              onClick={() => setCurrentBreakpoint(bp.key)}
              className={cn(
                "p-1.5 rounded-lg transition-colors",
                currentBreakpoint === bp.key
                  ? "bg-swarp-purple/20 text-swarp-purple"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              )}
            >
              <bp.icon className="w-4 h-4" />
            </button>
          ))}
        </div>
      </div>

      {/* Preview Canvas */}
      <div className="bg-black/40 rounded-lg border border-white/5 p-4 flex justify-center">
        <motion.div
          animate={{ 
            width: breakpoints.find(b => b.key === currentBreakpoint)?.width === 375 ? "30%" : 
                   breakpoints.find(b => b.key === currentBreakpoint)?.width === 768 ? "60%" : "100%"
          }}
          transition={{ duration: 0.3 }}
          className="bg-white/5 border border-white/10 rounded-lg overflow-hidden"
        >
          {/* Mock Layout */}
          <div className="p-3">
            <div className="h-2 w-1/3 bg-swarp-purple/50 rounded mb-3" />
            <div className={cn(
              "grid gap-2",
              currentBreakpoint === "mobile" ? "grid-cols-1" : 
              currentBreakpoint === "tablet" ? "grid-cols-2" : "grid-cols-3"
            )}>
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video bg-white/5 rounded border border-white/5" />
              ))}
            </div>
            <div className="mt-3 h-2 w-full bg-white/10 rounded" />
            <div className="mt-1 h-2 w-2/3 bg-white/10 rounded" />
          </div>
        </motion.div>
      </div>

      {/* Breakpoint Info */}
      <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400">
        <span>Breakpoint: <span className="text-swarp-purple">{currentBreakpoint}</span></span>
        <span>width: {breakpoints.find(b => b.key === currentBreakpoint)?.width}px</span>
      </div>

      {/* Grid System */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="text-[10px] text-gray-500 mb-2">12-Column Grid</div>
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-8 bg-swarp-purple/10 rounded border border-swarp-purple/20" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Accessibility Check
function AccessibilityCheck() {
  const checks = [
    { name: "Color Contrast", status: "pass", score: "4.5:1" },
    { name: "Focus Indicators", status: "pass", score: "Visible" },
    { name: "ARIA Labels", status: "pass", score: "98%" },
    { name: "Keyboard Nav", status: "warning", score: "85%" },
    { name: "Screen Reader", status: "pass", score: "Supported" },
    { name: "Motion Reduced", status: "pass", score: "Respects" },
  ];

  return (
    <div className="bg-swarp-dark/80 rounded-xl border border-swarp-purple/20 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Accessibility className="w-5 h-5 text-swarp-purple" />
          <h4 className="text-sm font-bold text-white">Accessibility</h4>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-400">
          <CheckCircle2 className="w-3 h-3" />
          WCAG 2.1 AA
        </div>
      </div>

      <div className="space-y-2">
        {checks.map((check) => (
          <div key={check.name} className="flex items-center justify-between p-2 rounded-lg bg-black/40">
            <div className="flex items-center gap-2">
              {check.status === "pass" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-400" />
              )}
              <span className="text-xs text-gray-300">{check.name}</span>
            </div>
            <span className={cn(
              "text-[10px] font-medium",
              check.status === "pass" ? "text-emerald-400" : "text-amber-400"
            )}>
              {check.score}
            </span>
          </div>
        ))}
      </div>

      {/* Contrast Preview */}
      <div className="mt-4 p-3 rounded-lg bg-gradient-to-br from-gray-900 to-black border border-white/10">
        <div className="text-[10px] text-gray-500 mb-2">Contrast Example</div>
        <div className="space-y-2">
          <div className="p-2 rounded bg-white text-black text-xs font-medium">
            White on Black (21:1)
          </div>
          <div className="p-2 rounded bg-gray-600 text-white text-xs font-medium">
            Gray on White (4.5:1)
          </div>
        </div>
      </div>
    </div>
  );
}

// Main Component
export function UIUXDesignContent() {
  const t = useTranslations("servicesContent.uiuxDesign");
  const [activeTab, setActiveTab] = useState<"components" | "tokens" | "responsive">("components");

  const tools = [
    { icon: Figma, name: "Figma", category: "Design" },
    { icon: PenTool, name: "Framer", category: "Prototype" },
    { icon: Layers, name: "Storybook", category: "Docs" },
    { icon: Accessibility, name: "Stark", category: "A11y" },
  ];

  return (
    <ServiceContentLayout accentColor="purple">
      <div className="h-full flex flex-col">
        {/* Header */}
        <ServiceHeader
          icon={<Palette className="w-5 h-5" />}
          title={t("badge")}
          subtitle={t("title")}
          accentColor="purple"
        >
          {/* Tabs */}
          <div className="flex bg-black/40 p-1 rounded-lg border border-white/10">
            {[
              { id: "components", label: t("designDemo.components"), icon: Component },
              { id: "tokens", label: t("designDemo.tokens"), icon: Grid3X3 },
              { id: "responsive", label: t("designDemo.guidelines"), icon: Layout },
            ].map((tab) => (
              <ServiceTab
                key={tab.id}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                accentColor="purple"
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </ServiceTab>
            ))}
          </div>
        </ServiceHeader>

        {/* Content */}
        <div className="flex-1 overflow-hidden p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
            {/* Left Column */}
            <div className="h-full overflow-y-auto custom-scrollbar space-y-4">
              {activeTab === "components" && <DesignSystem title={t("designDemo.title")} />}
              {activeTab === "tokens" && (
                <>
                  <ColorSystem />
                  <TypographyScale />
                </>
              )}
              {activeTab === "responsive" && (
                <>
                  <ResponsiveTester />
                  <AccessibilityCheck />
                </>
              )}
            </div>

            {/* Right Column */}
            <div className="space-y-4 flex flex-col h-full">
              {activeTab !== "components" && <DesignSystem title={t("designDemo.title")} />}
              {activeTab === "components" && (
                <>
                  <ColorSystem />
                  <TypographyScale />
                </>
              )}

              {/* Tools Grid - Using ServiceCard */}
              <ServiceCard title="Design Stack" accentColor="purple">
                <div className="grid grid-cols-2 gap-2">
                  {tools.map((tool) => (
                    <motion.div
                      key={tool.name}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-lg bg-black/40 border border-white/5 hover:border-swarp-purple/30 transition-colors cursor-pointer group"
                    >
                      <tool.icon className="w-5 h-5 text-swarp-purple mb-2 group-hover:scale-110 transition-transform" />
                      <div className="text-xs font-medium text-white">{tool.name}</div>
                      <div className="text-[9px] text-gray-500">{tool.category}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[
                    { label: "Components", value: "120+" },
                    { label: "Tokens", value: "340" },
                    { label: "WCAG", value: "AA" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center p-2 rounded-lg bg-black/40">
                      <div className="text-sm font-bold text-swarp-purple">{stat.value}</div>
                      <div className="text-[8px] text-gray-500 uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </ServiceCard>

              {/* CTA */}
              <ServiceCTA
                title={t("cta.title")}
                description={t("cta.description")}
                accentColor="purple"
              />
            </div>
          </div>
        </div>
      </div>
    </ServiceContentLayout>
  );
}

export default UIUXDesignContent;
