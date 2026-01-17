"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataPanelProps {
  label: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  animated?: boolean;
  className?: string;
}

export function DataPanel({ label, value, unit, trend = "neutral", animated = true, className }: DataPanelProps) {
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value);

  useEffect(() => {
    if (!animated || typeof value !== "number") {
      setDisplayValue(value);
      return;
    }

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, animated]);

  return (
    <div className={cn("glass p-4 rounded-lg hud-corner", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono text-gray-500 uppercase">{label}</span>
        {trend !== "neutral" && (
          <div className={cn(
            "flex items-center text-xs",
            trend === "up" ? "text-green-400" : "text-red-400"
          )}>
            {trend === "up" ? (
              <TrendingUp className="w-3 h-3 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 mr-1" />
            )}
          </div>
        )}
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-gradient font-mono">
          {displayValue}
        </span>
        {unit && (
          <span className="text-sm text-gray-400 ml-1">{unit}</span>
        )}
      </div>
    </div>
  );
}
