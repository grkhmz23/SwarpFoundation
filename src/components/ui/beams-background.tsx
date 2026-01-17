"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BeamsBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const SWARP_COLORS = [
  { h: 189, s: 100, l: 50 }, // cyan #00D4FF
  { h: 275, s: 63, l: 58 },  // purple #9D4EDD
  { h: 180, s: 100, l: 50 }, // cyan #00FFF0
  { h: 97, s: 100, l: 56 },  // green #39FF14
];

export function BeamsBackground({ className, children, intensity = "medium" }: BeamsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);

  const opacityMap = { subtle: 0.5, medium: 0.7, strong: 1 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      beamsRef.current = Array.from({ length: 15 }, (_, i) => {
        const colorIndex = i % SWARP_COLORS.length;
        const color = SWARP_COLORS[colorIndex];
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          width: 60 + Math.random() * 80,
          length: window.innerHeight * 2,
          angle: -35 + Math.random() * 10,
          speed: 0.4 + Math.random() * 0.6,
          opacity: 0.15 + Math.random() * 0.1,
          color: `${color.h}, ${color.s}%, ${color.l}%`,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.02,
        };
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    function animate() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.filter = "blur(25px)";

      beamsRef.current.forEach((beam, i) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        if (beam.y + beam.length < -100) {
          beam.y = window.innerHeight + 100;
          beam.x = Math.random() * window.innerWidth;
        }

        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate((beam.angle * Math.PI) / 180);

        const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity];
        const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
        
        gradient.addColorStop(0, `hsla(${beam.color}, 0)`);
        gradient.addColorStop(0.1, `hsla(${beam.color}, ${pulsingOpacity * 0.5})`);
        gradient.addColorStop(0.5, `hsla(${beam.color}, ${pulsingOpacity})`);
        gradient.addColorStop(0.9, `hsla(${beam.color}, ${pulsingOpacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${beam.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [intensity]);

  return (
    <div className={cn("relative min-h-screen w-full overflow-hidden bg-swarp-darker", className)}>
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
