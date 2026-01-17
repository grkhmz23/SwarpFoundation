'use client'
import { TextScramble } from '@/components/ui/text-scramble'
import { cn } from '@/lib/utils'

type Props = {
  value: string;
  className?: string;
  as?: React.ElementType;
}

export default function CornerFrameScrambleText({ value, className, as }: Props) {
  return (
    <div className={cn(
      'relative inline-block px-6 py-3',
      'bg-[linear-gradient(to_right,var(--foreground)_1.5px,transparent_1.5px),linear-gradient(to_right,var(--foreground)_1.5px,transparent_1.5px),linear-gradient(to_left,var(--foreground)_1.5px,transparent_1.5px),linear-gradient(to_left,var(--foreground)_1.5px,transparent_1.5px),linear-gradient(to_bottom,var(--foreground)_1.5px,transparent_1.5px),linear-gradient(to_bottom,var(--foreground)_1.5px,transparent_1.5px),linear-gradient(to_top,var(--foreground)_1.5px,transparent_1.5px),linear-gradient(to_top,var(--foreground)_1.5px,transparent_1.5px)]',
      'bg-[length:15px_15px] bg-no-repeat',
      'bg-[position:0_0,0_100%,100%_0,100%_100%,0_0,100%_0,0_100%,100%_100%]',
      className
    )}>
      <TextScramble as={as} className="relative z-10">{value}</TextScramble>
    </div>
  )
}
