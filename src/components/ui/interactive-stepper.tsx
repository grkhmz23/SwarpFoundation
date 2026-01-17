"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  title: string;
  description: string;
}

interface InteractiveStepperProps {
  steps: Step[];
  className?: string;
}

export function InteractiveStepper({ steps, className }: InteractiveStepperProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={cn("w-full", className)}>
      {/* Steps Container */}
      <div className="relative">
        {/* Circuit Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-swarp-cyan via-swarp-blue to-swarp-purple opacity-30" />
        
        {/* Animated Circuit Flow */}
        <div 
          className="absolute left-6 w-0.5 bg-gradient-to-b from-transparent via-swarp-cyan to-transparent transition-all duration-500 circuit-line"
          style={{
            top: `${(activeStep / (steps.length - 1)) * 100}%`,
            height: "20%",
          }}
        />

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <div
                key={index}
                className="relative flex items-start cursor-pointer group"
                onClick={() => setActiveStep(index)}
              >
                {/* Step Circle */}
                <div className={cn(
                  "relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                  isCompleted && "bg-swarp-cyan border-swarp-cyan",
                  isActive && "bg-swarp-blue/20 border-swarp-blue scale-110 glow-blue",
                  !isCompleted && !isActive && "bg-swarp-darker border-gray-700 group-hover:border-swarp-blue"
                )}>
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <span className={cn(
                      "text-lg font-bold",
                      isActive ? "text-swarp-cyan" : "text-gray-500"
                    )}>
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Step Content */}
                <div className="ml-6 flex-1 glass p-4 rounded-lg group-hover:glass-strong transition-all">
                  <h3 className={cn(
                    "text-lg font-semibold mb-1",
                    isActive ? "text-gradient" : "text-white"
                  )}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                </div>

                {/* Corner Bracket Indicator for Active Step */}
                {isActive && (
                  <>
                    <div className="absolute left-10 top-0 w-3 h-3 border-t-2 border-l-2 border-swarp-cyan" />
                    <div className="absolute left-10 bottom-0 w-3 h-3 border-b-2 border-l-2 border-swarp-cyan" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
