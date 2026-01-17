"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypeWriterProps {
  texts: string[];
  className?: string;
}

export function TypeWriter({ texts, className }: TypeWriterProps) {
  const [displayText, setDisplayText] = useState(texts[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [texts.length]);

  useEffect(() => {
    setDisplayText(texts[index]);
  }, [index, texts]);

  return (
    <div className={cn("font-mono", className)}>
      <span className="text-swarp-cyan">{"{ "}</span>
      <span className="text-gradient">{displayText}</span>
      <span className="text-swarp-cyan">{" }"}</span>
    </div>
  );
}
