"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypeWriter } from "@/components/ui/type-writer";
import { StatusChip } from "@/components/ui/status-chip";
import { TerminalDashboard } from "@/components/ui/terminal-dashboard";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 foundation-grid opacity-20" />
      
      <div className="relative container mx-auto px-4 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex gap-3 mb-8">
              <StatusChip label="ONLINE" status="success" />
              <StatusChip label="SOLANA" status="online" pulse={false} />
            </div>

            <div className="min-h-[200px] mb-6">
              <TypeWriter
                texts={[
                  "Build & Ship on Solana",
                  "Build & Ship with AI",
                  "Build & Ship at Scale",
                ]}
                className="text-5xl sm:text-7xl font-bold"
              />
            </div>

            <p className="text-xl text-gray-400 mb-8">
              Production-grade blockchain infrastructure.
            </p>

            <Link href="#contact">
              <Button size="lg" variant="gradient">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div>
            <TerminalDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
