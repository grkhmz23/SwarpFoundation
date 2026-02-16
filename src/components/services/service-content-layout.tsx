"use client";

import React from "react";
import { cn } from "@/lib/utils";

type AccentColor = "cyan" | "purple";

interface ServiceContentLayoutProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: AccentColor;
}

/**
 * Standardized layout wrapper for all service content components.
 * Ensures consistent background, spacing, and styling across all 12 services.
 * 
 * Brand Colors:
 * - Primary Blue: #00D4FF (swarp-blue)
 * - Purple: #9D4EDD (swarp-purple)  
 * - Cyan: #00FFF0 (swarp-cyan)
 * - Dark Background: #0A0E27 (swarp-dark)
 * - Darker Background: #050714 (swarp-darker)
 */
export function ServiceContentLayout({
  children,
  className,
  accentColor = "cyan",
}: ServiceContentLayoutProps) {
  return (
    <div
      className={cn(
        // Standardized background using brand color
        "min-h-full bg-swarp-dark",
        // Standardized text color
        "text-gray-200",
        // Prevent overflow issues
        "overflow-hidden",
        className
      )}
    >
      {/* Subtle grid pattern using brand colors */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      
      {/* Content wrapper */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

/**
 * Standardized header for service content components
 */
interface ServiceHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentColor?: AccentColor;
  children?: React.ReactNode;
}

export function ServiceHeader({
  icon,
  title,
  subtitle,
  accentColor = "cyan",
  children,
}: ServiceHeaderProps) {
  const accentClasses = {
    cyan: "bg-swarp-blue/20 border-swarp-blue/30 text-swarp-blue",
    purple: "bg-swarp-purple/20 border-swarp-purple/30 text-swarp-purple",
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center",
          accentClasses[accentColor]
        )}>
          {icon}
        </div>
        <div>
          <h3 className="text-base font-bold text-white">{title}</h3>
          <p className={cn("text-[10px]", accentColor === "cyan" ? "text-swarp-blue" : "text-swarp-purple")}>
            {subtitle}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}

/**
 * Standardized card component for service content
 */
interface ServiceCardProps {
  children: React.ReactNode;
  className?: string;
  accentColor?: AccentColor;
  title?: string;
  icon?: React.ReactNode;
}

export function ServiceCard({
  children,
  className,
  accentColor = "cyan",
  title,
  icon,
}: ServiceCardProps) {
  const borderClasses = {
    cyan: "border-swarp-blue/20 hover:border-swarp-blue/40",
    purple: "border-swarp-purple/20 hover:border-swarp-purple/40",
  };

  return (
    <div
      className={cn(
        "bg-swarp-dark/80 rounded-xl border p-4",
        "transition-colors duration-300",
        borderClasses[accentColor],
        className
      )}
    >
      {(title || icon) && (
        <div className="flex items-center gap-2 mb-4">
          {icon && <div className="text-swarp-blue">{icon}</div>}
          {title && <h4 className="text-sm font-bold text-white">{title}</h4>}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * Standardized tab button for service content
 */
interface ServiceTabProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  accentColor?: AccentColor;
}

export function ServiceTab({
  children,
  isActive,
  onClick,
  accentColor = "cyan",
}: ServiceTabProps) {
  const activeClasses = {
    cyan: "bg-swarp-blue/20 text-swarp-blue border-swarp-blue/30",
    purple: "bg-swarp-purple/20 text-swarp-purple border-swarp-purple/30",
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-medium transition-all",
        isActive
          ? cn("border", activeClasses[accentColor])
          : "text-gray-500 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

/**
 * Standardized CTA section for service content
 */
interface ServiceCTAProps {
  title: string;
  description: string;
  accentColor?: AccentColor;
  onClick?: () => void;
}

export function ServiceCTA({
  title,
  description,
  accentColor = "cyan",
  onClick,
}: ServiceCTAProps) {
  const gradientClasses = {
    cyan: "from-swarp-blue/20 to-swarp-cyan/20 border-swarp-blue/30",
    purple: "from-swarp-purple/20 to-swarp-blue/20 border-swarp-purple/30",
  };

  const buttonClasses = {
    cyan: "bg-swarp-blue hover:bg-swarp-cyan",
    purple: "bg-swarp-purple hover:bg-swarp-blue",
  };

  return (
    <div
      className={cn(
        "bg-gradient-to-r rounded-xl border p-4",
        gradientClasses[accentColor]
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white", buttonClasses[accentColor])}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-white">{title}</h4>
          <p className="text-[10px] text-gray-400">{description}</p>
        </div>
        <button 
          onClick={onClick}
          className={cn("p-2 rounded-lg text-white transition-colors", buttonClasses[accentColor])}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
