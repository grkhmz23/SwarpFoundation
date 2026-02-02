import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "destructive" | "gradient";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const variants = {
      primary: "bg-swarp-darker border-2 border-swarp-cyan text-white shadow-[0_0_20px_rgba(0,255,240,0.3)] hover:shadow-[0_0_30px_rgba(0,255,240,0.5)] hover:border-swarp-blue",
      outline: "bg-transparent border-2 border-swarp-cyan/50 text-swarp-cyan hover:bg-swarp-cyan/10 hover:border-swarp-cyan hover:shadow-[0_0_15px_rgba(0,255,240,0.3)]",
      ghost: "bg-transparent text-swarp-cyan hover:bg-swarp-cyan/10",
      destructive: "bg-swarp-darker border-2 border-red-500/50 text-white hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]",
      gradient: "bg-gradient-to-r from-swarp-cyan to-swarp-blue text-white border-0 shadow-[0_0_20px_rgba(0,255,240,0.3)] hover:shadow-[0_0_30px_rgba(0,255,240,0.5)] hover:opacity-90",
    };
    
    const sizes = {
      sm: "px-4 py-2 text-sm rounded-lg",
      md: "px-6 py-3 text-base rounded-lg",
      lg: "px-8 py-4 text-lg rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
