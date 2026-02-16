"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BentoItemProps {
  className?: string;
  children: ReactNode;
}

const BentoItem = ({ className, children }: BentoItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty("--mouse-x", `${x}px`);
      item.style.setProperty("--mouse-y", `${y}px`);
    };
    item.addEventListener("mousemove", handleMouseMove);
    return () => item.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={itemRef}
      className={cn(
        "group relative rounded-xl border border-[#00D4FF]/10 bg-[#0A0E27]/40 backdrop-blur-sm p-6 transition-all duration-300",
        "hover:border-[#00D4FF]/30 hover:bg-[#0A0E27]/60",
        "before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300",
        "before:bg-[radial-gradient(400px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(0,212,255,0.06),transparent_60%)]",
        "hover:before:opacity-100",
        className
      )}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

interface SwarpBentoGridProps {
  className?: string;
}

const SwarpBentoGrid = ({ className }: SwarpBentoGridProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
        <BentoItem className="md:col-span-2 md:row-span-2">
          <div className="flex flex-col justify-between h-full min-h-[280px]">
            <div>
              <div className="inline-block px-2 py-1 rounded-md bg-[#00D4FF]/10 text-[#00D4FF] text-xs font-medium mb-3">
                Core Platform
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">SwarpPay</h3>
              <p className="text-gray-400 leading-relaxed">
                A custodial trading platform that makes buying and selling crypto as simple as
                using any banking app. Connect your bank account, purchase crypto with your
                local currency, and trade curated tokens on Solana. No private keys to manage,
                no complicated wallet setup. Just straightforward access to digital assets
                with the security you would expect from a financial institution.
              </p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-[#00D4FF]/5 border border-[#00D4FF]/10 p-3 text-center">
                <div className="text-[#00D4FF] text-lg font-bold">Fiat</div>
                <div className="text-gray-500 text-xs mt-1">On/Off Ramp</div>
              </div>
              <div className="rounded-lg bg-[#9D4EDD]/5 border border-[#9D4EDD]/10 p-3 text-center">
                <div className="text-[#9D4EDD] text-lg font-bold">2FA</div>
                <div className="text-gray-500 text-xs mt-1">Security</div>
              </div>
              <div className="rounded-lg bg-[#00FFF0]/5 border border-[#00FFF0]/10 p-3 text-center">
                <div className="text-[#00FFF0] text-lg font-bold">24/7</div>
                <div className="text-gray-500 text-xs mt-1">Trading</div>
              </div>
            </div>
          </div>
        </BentoItem>

        <BentoItem>
          <div className="inline-block px-2 py-1 rounded-md bg-[#9D4EDD]/10 text-[#9D4EDD] text-xs font-medium mb-3">
            Fair Launch
          </div>
          <h3 className="text-xl font-bold text-white mb-2">SwarpLaunch</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            A curated launchpad where every participant is a verified individual, not a bot.
            Each person can only buy their fair share, so new token launches are genuinely
            accessible to everyone.
          </p>
        </BentoItem>

        <BentoItem>
          <div className="inline-block px-2 py-1 rounded-md bg-[#00FFF0]/10 text-[#00FFF0] text-xs font-medium mb-3">
            Identity
          </div>
          <h3 className="text-xl font-bold text-white mb-2">SwarpID</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            One account per real person. SwarpID combines identity verification with
            anti-duplicate detection to keep the platform honest and the playing field level.
          </p>
        </BentoItem>

        <BentoItem className="md:row-span-2">
          <div className="inline-block px-2 py-1 rounded-md bg-[#00D4FF]/10 text-[#00D4FF] text-xs font-medium mb-3">
            Privacy
          </div>
          <h3 className="text-xl font-bold text-white mb-2">pSOL Protocol</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Financial privacy should not be a luxury. pSOL uses zero-knowledge cryptography
            to let you move assets on Solana without exposing your entire transaction history
            to the world. Your money, your business.
          </p>
          <div className="space-y-2 mt-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D4FF]" />
              <span>GROTH16 ZK PROOFS</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-[#9D4EDD]" />
              <span>MULTI-ASSET SHIELDED POOL</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00FFF0]" />
              <span>On-chain Verification</span>
            </div>
          </div>
        </BentoItem>

        <BentoItem className="md:col-span-2">
          <div className="inline-block px-2 py-1 rounded-md bg-[#9D4EDD]/10 text-[#9D4EDD] text-xs font-medium mb-3">
            Accountability
          </div>
          <h3 className="text-xl font-bold text-white mb-2">HumanRail</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            As AI agents become more capable, someone needs to make sure they are accountable.
            HumanRail is an identity and verification protocol that ties AI actions back to
            real, verified humans, creating a trust layer for the age of autonomous software.
          </p>
        </BentoItem>
      </div>
    </div>
  );
};

export { SwarpBentoGrid, BentoItem };
