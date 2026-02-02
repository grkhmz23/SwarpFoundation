"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";

interface FlipCardProps {
  src: string;
  index: number;
  target: { x: number; y: number; rotation: number; scale: number; opacity: number };
}

const IMG_WIDTH = 40;
const IMG_HEIGHT = 55;

function FlipCard({ src, index, target }: FlipCardProps) {
  return (
    <motion.div
      animate={{ x: target.x, y: target.y, rotate: target.rotation, scale: target.scale, opacity: target.opacity }}
      transition={{ type: "spring", stiffness: 40, damping: 15 }}
      style={{ position: "absolute", width: IMG_WIDTH, height: IMG_HEIGHT, transformStyle: "preserve-3d" }}
      className="cursor-pointer group"
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ rotateY: 180 }}
      >
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg shadow-lg bg-neutral-800" style={{ backfaceVisibility: "hidden" }}>
          <img src={src} alt={`card-${index}`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
        </div>
        <div className="absolute inset-0 h-full w-full overflow-hidden rounded-lg shadow-lg bg-neutral-900 flex items-center justify-center border border-cyan-500/30" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <p className="text-[6px] font-bold text-cyan-400">VIEW</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const TOTAL_IMAGES = 16;
const MAX_SCROLL = 2000;

const IMAGES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&q=80",
  "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=200&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=200&q=80",
  "https://images.unsplash.com/photo-1506765515384-028b60a970df?w=200&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&q=80",
  "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=200&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&q=80",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=200&q=80",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=200&q=80",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=200&q=80",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=200&q=80",
  "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=200&q=80",
];

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

export function ScrollMorphHero() {
  const [phase, setPhase] = useState<"scatter" | "line" | "circle">("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({ width: entry.contentRect.width, height: entry.contentRect.height });
      }
    });
    observer.observe(containerRef.current);
    setContainerSize({ width: containerRef.current.offsetWidth, height: containerRef.current.offsetHeight });
    return () => observer.disconnect();
  }, []);

  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [virtualScroll]);

  const morphProgress = useTransform(virtualScroll, [0, 500], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });
  const scrollRotate = useTransform(virtualScroll, [500, 2000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);

  useEffect(() => {
    const unsub1 = smoothMorph.on("change", setMorphValue);
    const unsub2 = smoothScrollRotate.on("change", setRotateValue);
    return () => { unsub1(); unsub2(); };
  }, [smoothMorph, smoothScrollRotate]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("line"), 300);
    const t2 = setTimeout(() => setPhase("circle"), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const scatterPositions = useMemo(() => {
    return IMAGES.map(() => ({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 300,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.5,
      opacity: 0,
    }));
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full bg-neutral-950 overflow-hidden">
      <div className="flex h-full w-full items-center justify-center">
        {/* Intro Text */}
        <div className="absolute z-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <motion.p
            initial={{ opacity: 0 }}
            animate={phase === "circle" && morphValue < 0.5 ? { opacity: 0.6 - morphValue } : { opacity: 0 }}
            className="text-[8px] font-bold tracking-widest text-neutral-500 uppercase"
          >
            Scroll inside
          </motion.p>
        </div>

        {/* Cards */}
        <div className="relative flex items-center justify-center w-full h-full">
          {IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (phase === "scatter") {
              target = scatterPositions[i];
            } else if (phase === "line") {
              const spacing = 45;
              const totalWidth = TOTAL_IMAGES * spacing;
              target = { x: i * spacing - totalWidth / 2, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const radius = Math.min(containerSize.width, containerSize.height) * 0.35;
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = { x: Math.cos(circleRad) * radius, y: Math.sin(circleRad) * radius, rotation: circleAngle + 90 };

              const arcRadius = containerSize.width * 0.8;
              const arcCenterY = containerSize.height * 0.3 + arcRadius;
              const spreadAngle = 100;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);
              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const boundedRotation = -scrollProgress * spreadAngle * 0.8;
              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;
              const arcPos = { x: Math.cos(arcRad) * arcRadius, y: Math.sin(arcRad) * arcRadius + arcCenterY, rotation: currentArcAngle + 90, scale: 1.5 };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return <FlipCard key={i} src={src} index={i} target={target} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default ScrollMorphHero;
