"use client";

import { useEffect, useRef } from "react";

export function BeamsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });

    if (canvasRef.current) observer.observe(canvasRef.current);

    function animate() {
      if (!isVisible) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      // ... rest of your animation code
    }

    animate();

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}