"use client";

import { cn } from "@/lib/utils";

interface StatusChipProps {
  label: string;
  status?: "online" | "offline" | "warning" | "success";
  pulse?: boolean;
  className?: string;
}

export function StatusChip({ label, status = "online", pulse = true, className }: StatusChipProps) {
  const statusColors = {
    online: {
      bg: "bg-green-500/20",
      border: "border-green-500/50",
      text: "text-green-400",
      dot: "bg-green-500",
    },
    offline: {
      bg: "bg-gray-500/20",
      border: "border-gray-500/50",
      text: "text-gray-400",
      dot: "bg-gray-500",
    },
    warning: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/50",
      text: "text-yellow-400",
      dot: "bg-yellow-500",
    },
    success: {
      bg: "bg-swarp-cyan/20",
      border: "border-swarp-cyan/50",
      text: "text-swarp-cyan",
      dot: "bg-swarp-cyan",
    },
  };

  const colors = statusColors[status];

  return (
    <div
      className={cn(
        "inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border font-mono text-xs",
        colors.bg,
        colors.border,
        colors.text,
        className
      )}
    >
      <div className={cn(
        "w-2 h-2 rounded-full",
        colors.dot,
        pulse && "status-pulse"
      )} />
      <span>{label}</span>
    </div>
  );
}
