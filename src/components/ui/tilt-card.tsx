"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: "blue" | "purple" | "cyan" | "green";
}

export function TiltCard({ children, glowColor = "blue", className, ...props }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovering(false);
  };

  const glowClasses = {
    blue: "glow-blue",
    purple: "glow-purple",
    cyan: "glow-cyan",
    green: "glow-green",
  };

  return (
    <div className="perspective-1000">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "relative preserve-3d transition-all duration-300 ease-out",
          isHovering && glowClasses[glowColor],
          className
        )}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        }}
        {...props}
      >
        {children}
        
        {/* Glow overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none",
            isHovering && "opacity-100",
            glowColor === "blue" && "bg-gradient-to-br from-swarp-blue/10 to-transparent",
            glowColor === "purple" && "bg-gradient-to-br from-swarp-purple/10 to-transparent",
            glowColor === "cyan" && "bg-gradient-to-br from-swarp-cyan/10 to-transparent",
            glowColor === "green" && "bg-gradient-to-br from-swarp-neon-green/10 to-transparent"
          )}
        />
      </div>
    </div>
  );
}
