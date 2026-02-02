"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface VectorPadProps {
  className?: string;
  onUpdate?: (coords: { x: number; y: number }) => void;
  onLockStatus?: (locked: boolean) => void;
}

export default function VectorPad({ className, onUpdate, onLockStatus }: VectorPadProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const padRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(
    (clientX: number, clientY: number) => {
      if (!padRef.current || isLocked) return;

      const rect = padRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));

      setPosition({ x, y });
      onUpdate?.({ x, y });
    },
    [isLocked, onUpdate]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX, e.clientY);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        updatePosition(e.clientX, e.clientY);
      }
    },
    [isDragging, updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    updatePosition(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      const touch = e.touches[0];
      updatePosition(touch.clientX, touch.clientY);
    }
  };

  const toggleLock = () => {
    const newLocked = !isLocked;
    setIsLocked(newLocked);
    onLockStatus?.(newLocked);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      {/* Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial glow following position */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full transition-all duration-150 pointer-events-none"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)`,
        }}
      />

      {/* Interactive Pad Area */}
      <div
        ref={padRef}
        className="absolute inset-[15%] cursor-crosshair"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        {/* Pad Border */}
        <div className="absolute inset-0 border border-cyan-500/20 rounded-lg">
          {/* Corner markers */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/40" />

          {/* Crosshair lines */}
          <div
            className="absolute h-full w-px bg-cyan-500/10 transition-all duration-150"
            style={{ left: `${position.x}%` }}
          />
          <div
            className="absolute w-full h-px bg-cyan-500/10 transition-all duration-150"
            style={{ top: `${position.y}%` }}
          />

          {/* Joystick cursor */}
          <div
            className={cn(
              "absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 transition-all duration-75",
              isDragging && "scale-125"
            )}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
          >
            <div
              className={cn(
                "w-full h-full rounded-full border-2 transition-colors",
                isLocked
                  ? "border-red-500 bg-red-500/20"
                  : "border-cyan-400 bg-cyan-400/20"
              )}
            />
            <div
              className={cn(
                "absolute inset-[30%] rounded-full transition-colors",
                isLocked ? "bg-red-500" : "bg-cyan-400"
              )}
            />
          </div>
        </div>

        {/* Lock button */}
        <button
          onClick={toggleLock}
          className={cn(
            "absolute -bottom-8 left-1/2 -translate-x-1/2 px-3 py-1 text-[9px] font-mono uppercase tracking-widest rounded border transition-colors",
            isLocked
              ? "border-red-500/50 text-red-400 bg-red-500/10"
              : "border-cyan-500/30 text-cyan-500/50 hover:text-cyan-400 hover:border-cyan-500/50"
          )}
        >
          {isLocked ? "Locked" : "Lock"}
        </button>
      </div>

      {/* Coordinates display */}
      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-cyan-500/40 space-y-1">
        <div>X: {position.x.toFixed(1)}%</div>
        <div>Y: {position.y.toFixed(1)}%</div>
      </div>
    </div>
  );
}