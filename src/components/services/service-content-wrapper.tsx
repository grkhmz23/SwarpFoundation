"use client";

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";

interface VisibilityContextType {
  isVisible: boolean;
}

const VisibilityContext = createContext<VisibilityContextType>({ isVisible: true });

export function useVisibility() {
  return useContext(VisibilityContext);
}

interface ServiceContentWrapperProps {
  children: React.ReactNode;
}

export function ServiceContentWrapper({ children }: ServiceContentWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <VisibilityContext.Provider value={{ isVisible }}>
      <div
        ref={containerRef}
        className="h-full"
        style={{
          // Pause CSS animations when off-screen
          animationPlayState: isVisible ? "running" : "paused",
        }}
      >
        {children}
      </div>
    </VisibilityContext.Provider>
  );
}

// Hook for components to use with setInterval - pauses when off-screen
export function useIntervalWhenVisible(callback: () => void, delay: number | null) {
  const { isVisible } = useVisibility();
  const savedCallback = useRef(callback);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    // Clear existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    // Only start interval if visible and delay is set
    if (isVisible && delay !== null) {
      intervalRef.current = setInterval(() => {
        savedCallback.current();
      }, delay);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isVisible, delay]);

  return isVisible;
}

// Hook for components to use with setTimeout - only runs when visible
export function useTimeoutWhenVisible(callback: () => void, delay: number) {
  const { isVisible } = useVisibility();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Only start timeout if visible
    if (isVisible) {
      timeoutRef.current = setTimeout(callback, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isVisible, delay, callback]);

  return isVisible;
}
