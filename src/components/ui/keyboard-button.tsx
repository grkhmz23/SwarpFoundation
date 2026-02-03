"use client";

import { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ============================================================================
// KEYBOARD BUTTON - 3D Press Effect
// ============================================================================

interface KeyboardButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "purple";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const KeyboardButton = forwardRef<HTMLButtonElement, KeyboardButtonProps>(
  ({ 
    variant = "primary", 
    size = "md", 
    children, 
    className, 
    icon,
    iconPosition = "right",
    fullWidth = false,
    disabled,
    ...props 
  }, ref) => {
    const [isPressed, setIsPressed] = useState(false);

    const sizeClasses = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-sm gap-2",
      xl: "h-14 px-8 text-base gap-3",
    };

    const variantStyles = {
      primary: {
        shadow: "bg-cyan-700",
        surface: {
          default: "border-cyan-400/50 bg-gradient-to-b from-cyan-400 to-cyan-500 text-black",
          pressed: "border-cyan-500/50 bg-gradient-to-b from-cyan-500 to-cyan-600 text-black/80",
        },
        shine: "via-white/30",
      },
      secondary: {
        shadow: "bg-gray-700",
        surface: {
          default: "border-gray-600 bg-gradient-to-b from-gray-800 to-gray-900 text-white",
          pressed: "border-gray-700 bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300",
        },
        shine: "via-white/10",
      },
      ghost: {
        shadow: "bg-cyan-900/50",
        surface: {
          default: "border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 text-cyan-400",
          pressed: "border-cyan-500/50 bg-gradient-to-b from-cyan-500/20 to-cyan-500/10 text-cyan-300",
        },
        shine: "via-cyan-400/20",
      },
      danger: {
        shadow: "bg-red-800",
        surface: {
          default: "border-red-400/50 bg-gradient-to-b from-red-500 to-red-600 text-white",
          pressed: "border-red-500/50 bg-gradient-to-b from-red-600 to-red-700 text-white/80",
        },
        shine: "via-white/20",
      },
      purple: {
        shadow: "bg-purple-800",
        surface: {
          default: "border-purple-400/50 bg-gradient-to-b from-purple-500 to-purple-600 text-white",
          pressed: "border-purple-500/50 bg-gradient-to-b from-purple-600 to-purple-700 text-white/80",
        },
        shine: "via-white/20",
      },
    };

    const styles = variantStyles[variant];

    return (
      <button
        ref={ref}
        disabled={disabled}
        onMouseDown={() => !disabled && setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        onTouchStart={() => !disabled && setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        className={cn(
          "group relative select-none rounded-lg transition-all duration-75 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
          sizeClasses[size],
          fullWidth && "w-full",
          isPressed ? "translate-y-0.5" : "translate-y-0",
          disabled && "opacity-50 cursor-not-allowed",
          className,
        )}
        {...props}
      >
        {/* Invisible spacer for height */}
        <span className="invisible flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider">
          {icon && iconPosition === "left" && <span>{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </span>

        {/* Shadow/depth layer */}
        <span
          className={cn(
            "absolute inset-0 rounded-lg transition-all duration-75",
            styles.shadow,
            isPressed ? "translate-y-0" : "translate-y-1",
          )}
        />

        {/* Main button surface */}
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-lg border transition-all duration-75",
            sizeClasses[size],
            isPressed ? styles.surface.pressed : styles.surface.default,
          )}
        >
          {/* Shine effect */}
          <span
            className={cn(
              "absolute inset-x-2 top-1 h-px rounded-full bg-gradient-to-r from-transparent to-transparent transition-opacity duration-75",
              styles.shine,
              isPressed ? "opacity-0" : "opacity-100",
            )}
          />

          {/* Content */}
          <span className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-wider">
            {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
            {children}
            {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
          </span>
        </span>
      </button>
    );
  }
);

KeyboardButton.displayName = "KeyboardButton";

// ============================================================================
// KEYBOARD LINK BUTTON - For Next.js Links
// ============================================================================

interface KeyboardLinkProps {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "purple";
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  external?: boolean;
}

export function KeyboardLink({ 
  href, 
  variant = "primary", 
  size = "md", 
  children, 
  className, 
  icon,
  iconPosition = "right",
  fullWidth = false,
  external = false,
}: KeyboardLinkProps) {
  const [isPressed, setIsPressed] = useState(false);

  const sizeClasses = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-6 text-sm gap-2",
    xl: "h-14 px-8 text-base gap-3",
  };

  const variantStyles = {
    primary: {
      shadow: "bg-cyan-700",
      surface: {
        default: "border-cyan-400/50 bg-gradient-to-b from-cyan-400 to-cyan-500 text-black",
        pressed: "border-cyan-500/50 bg-gradient-to-b from-cyan-500 to-cyan-600 text-black/80",
      },
      shine: "via-white/30",
    },
    secondary: {
      shadow: "bg-gray-700",
      surface: {
        default: "border-gray-600 bg-gradient-to-b from-gray-800 to-gray-900 text-white",
        pressed: "border-gray-700 bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300",
      },
      shine: "via-white/10",
    },
    ghost: {
      shadow: "bg-cyan-900/50",
      surface: {
        default: "border-cyan-500/30 bg-gradient-to-b from-cyan-500/10 to-cyan-500/5 text-cyan-400",
        pressed: "border-cyan-500/50 bg-gradient-to-b from-cyan-500/20 to-cyan-500/10 text-cyan-300",
      },
      shine: "via-cyan-400/20",
    },
    danger: {
      shadow: "bg-red-800",
      surface: {
        default: "border-red-400/50 bg-gradient-to-b from-red-500 to-red-600 text-white",
        pressed: "border-red-500/50 bg-gradient-to-b from-red-600 to-red-700 text-white/80",
      },
      shine: "via-white/20",
    },
    purple: {
      shadow: "bg-purple-800",
      surface: {
        default: "border-purple-400/50 bg-gradient-to-b from-purple-500 to-purple-600 text-white",
        pressed: "border-purple-500/50 bg-gradient-to-b from-purple-600 to-purple-700 text-white/80",
      },
      shine: "via-white/20",
    },
  };

  const styles = variantStyles[variant];

  const linkProps = external 
    ? { target: "_blank", rel: "noopener noreferrer" } 
    : {};

  return (
    <Link
      href={href}
      {...linkProps}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      className={cn(
        "group relative inline-flex items-center justify-center select-none rounded-lg transition-all duration-75 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black",
        sizeClasses[size],
        fullWidth && "w-full",
        isPressed ? "translate-y-0.5" : "translate-y-0",
        className,
      )}
    >
      {/* Invisible spacer for height */}
        <span className="invisible flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider">
          {icon && iconPosition === "left" && <span>{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span>{icon}</span>}
        </span>

        {/* Shadow/depth layer */}
      <span
        className={cn(
          "absolute inset-0 rounded-lg transition-all duration-75",
          styles.shadow,
          isPressed ? "translate-y-0" : "translate-y-1",
        )}
      />

      {/* Main button surface */}
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-lg border transition-all duration-75",
          sizeClasses[size],
          isPressed ? styles.surface.pressed : styles.surface.default,
        )}
      >
        {/* Shine effect */}
        <span
          className={cn(
            "absolute inset-x-2 top-1 h-px rounded-full bg-gradient-to-r from-transparent to-transparent transition-opacity duration-75",
            styles.shine,
            isPressed ? "opacity-0" : "opacity-100",
          )}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-wider">
          {icon && iconPosition === "left" && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === "right" && <span className="flex-shrink-0">{icon}</span>}
        </span>
      </span>
    </Link>
  );
}

// ============================================================================
// KEYBOARD KEY - Single Key (for keyboard shortcuts display)
// ============================================================================

interface KeyProps {
  label: string;
  sublabel?: string;
  width?: string;
  keyCode?: string;
}

export function Key({ label, sublabel, width = "w-10", keyCode }: KeyProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <span
      className={cn(
        width,
        "group relative inline-flex h-8 select-none rounded-md transition-all duration-75 ease-out",
        isPressed ? "translate-y-0.5" : "translate-y-0",
      )}
    >
      {/* Shadow */}
      <span
        className={cn(
          "absolute inset-0 rounded-md bg-gray-700 transition-all duration-75",
          isPressed ? "translate-y-0" : "translate-y-0.5",
        )}
      />

      {/* Surface */}
      <span
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center rounded-md border transition-all duration-75",
          isPressed
            ? "border-gray-600 bg-gradient-to-b from-gray-800 to-gray-900"
            : "border-gray-600 bg-gradient-to-b from-gray-700 to-gray-800",
        )}
      >
        <span
          className={cn(
            "absolute inset-x-1 top-0.5 h-px rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-opacity duration-75",
            isPressed ? "opacity-0" : "opacity-100",
          )}
        />

        <span className="relative z-10 flex flex-col items-center justify-center">
          {sublabel && (
            <span className="text-[8px] font-medium text-gray-500">{sublabel}</span>
          )}
          <span
            className={cn(
              "text-[10px] font-bold tracking-wide transition-colors duration-75",
              isPressed ? "text-gray-400" : "text-gray-300",
            )}
          >
            {label}
          </span>
        </span>
      </span>
    </span>
  );
}

// ============================================================================
// KEYBOARD SHORTCUT - Display keyboard shortcuts
// ============================================================================

interface KeyboardShortcutProps {
  keys: string[];
  label?: string;
  className?: string;
}

export function KeyboardShortcut({ keys, label, className }: KeyboardShortcutProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      {label && (
        <span className="text-xs text-gray-500">{label}</span>
      )}
      <div className="flex items-center gap-0.5">
        {keys.map((key, i) => (
          <Key key={i} label={key} width="w-auto min-w-[24px] px-1.5" />
        ))}
      </div>
    </div>
  );
}

export default KeyboardButton;