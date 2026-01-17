import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "gradient";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-swarp-blue disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-swarp-blue text-white hover:bg-swarp-cyan hover:shadow-lg hover:shadow-swarp-blue/50":
              variant === "default",
            "border-2 border-swarp-blue/50 text-swarp-cyan hover:bg-swarp-blue/10 hover:border-swarp-blue":
              variant === "outline",
            "text-gray-300 hover:text-swarp-cyan hover:bg-swarp-blue/5":
              variant === "ghost",
            "bg-gradient-to-r from-swarp-blue to-swarp-purple text-white hover:shadow-lg hover:shadow-swarp-blue/50 glow-blue":
              variant === "gradient",
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-8 px-3 text-xs": size === "sm",
            "h-12 px-8 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
