"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypeWriterProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenTexts?: number;
  showCursor?: boolean;
}

export function TypeWriter({
  texts,
  className,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenTexts = 2000,
  showCursor = true,
}: TypeWriterProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showBraces, setShowBraces] = useState(false);

  useEffect(() => {
    const fullText = texts[currentTextIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (currentText.length === 0) {
            setShowBraces(true);
          }

          if (currentText.length < fullText.length) {
            setCurrentText(fullText.slice(0, currentText.length + 1));
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => setIsDeleting(true), delayBetweenTexts);
          }
        } else {
          // Deleting
          if (currentText.length > 0) {
            setCurrentText(fullText.slice(0, currentText.length - 1));
          } else {
            // Finished deleting
            setShowBraces(false);
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, typingSpeed, deletingSpeed, delayBetweenTexts]);

  return (
    <div className={cn("font-mono", className)}>
      <span className="text-swarp-cyan">{showBraces ? "{ " : ""}</span>
      <span className="text-gradient">
        {currentText}
      </span>
      {showCursor && (
        <span className="animate-pulse text-swarp-blue">|</span>
      )}
      <span className="text-swarp-cyan">{showBraces ? " }" : ""}</span>
    </div>
  );
}