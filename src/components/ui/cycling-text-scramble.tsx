'use client';
import { useEffect, useState } from 'react';
import { TextScramble } from '@/components/ui/text-scramble';

type Props = {
  values: string[];
  className?: string;
  interval?: number;
}

export function CyclingTextScramble({ values, className, interval = 3000 }: Props) {
  const [index, setIndex] = useState(0);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTrigger(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % values.length);
        setTrigger(true);
      }, 100);
    }, interval);
    return () => clearInterval(timer);
  }, [values, interval]);

  return <TextScramble trigger={trigger} className={className}>{values[index]}</TextScramble>;
}
