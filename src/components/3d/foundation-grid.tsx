"use client";

import { useEffect, useRef } from "react";

export function FoundationGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Grid settings
    const gridSize = 60;
    const perspective = 500;
    const vanishingY = canvas.height * 0.6;

    function drawIsometricGrid() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(0, 212, 255, 0.08)";
      ctx.lineWidth = 1;

      // Vertical lines with perspective
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        const offset = ((x - canvas.width / 2) / canvas.width) * perspective;
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x, vanishingY);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        const scale = 1 - (y / canvas.height) * 0.5;
        const width = canvas.width * scale;
        const xOffset = (canvas.width - width) / 2;
        ctx.moveTo(xOffset, y);
        ctx.lineTo(xOffset + width, y);
        ctx.stroke();
      }

      // Foundation "layers" - horizontal planes
      const layers = [0.3, 0.5, 0.7, 0.9];
      ctx.strokeStyle = "rgba(0, 255, 240, 0.15)";
      ctx.lineWidth = 2;

      layers.forEach((layer) => {
        const y = canvas.height * layer;
        const scale = 1 - (layer * 0.4);
        const width = canvas.width * scale;
        const xOffset = (canvas.width - width) / 2;
        
        ctx.beginPath();
        ctx.moveTo(xOffset, y);
        ctx.lineTo(xOffset + width, y);
        ctx.stroke();
        
        // Add corner markers
        ctx.fillStyle = "rgba(0, 255, 240, 0.5)";
        ctx.fillRect(xOffset - 3, y - 3, 6, 6);
        ctx.fillRect(xOffset + width - 3, y - 3, 6, 6);
      });
    }

    drawIsometricGrid();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawIsometricGrid();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-40"
      style={{ pointerEvents: "none" }}
    />
  );
}
