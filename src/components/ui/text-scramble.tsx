'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
};

const defaultChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = defaultChars,
  className,
  as: Component = 'p',
  trigger = true,
}: TextScrambleProps) {
  const MotionComponent = motion.create(Component as any);
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!trigger || isAnimating) return;
    setIsAnimating(true);
    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let scrambled = '';
      const progress = step / steps;

      for (let i = 0; i < children.length; i++) {
        if (children[i] === ' ') {
          scrambled += ' ';
          continue;
        }
        scrambled += progress * children.length > i 
          ? children[i] 
          : characterSet[Math.floor(Math.random() * characterSet.length)];
      }

      setDisplayText(scrambled);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(children);
        setIsAnimating(false);
      }
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [trigger, children, duration, speed, characterSet, isAnimating]);

  return <MotionComponent className={className}>{displayText}</MotionComponent>;
}
