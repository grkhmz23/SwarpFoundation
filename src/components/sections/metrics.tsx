"use client";

import { TrendingUp, Users, Zap, Shield } from "lucide-react";

const metrics = [
  {
    icon: TrendingUp,
    value: "99.9%",
    label: "Uptime SLA",
    description: "Guaranteed reliability",
  },
  {
    icon: Zap,
    value: "10M+",
    label: "Transactions Processed",
    description: "Monthly volume",
  },
  {
    icon: Users,
    value: "500K+",
    label: "Active Users",
    description: "Across our platforms",
  },
  {
    icon: Shield,
    value: "100+",
    label: "Security Audits",
    description: "Zero critical issues",
  },
];

export function Metrics() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-swarp-blue/5 to-swarp-purple/5" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <div
                key={metric.label}
                className="relative group"
              >
                {/* Card */}
                <div className="p-6 rounded-xl bg-swarp-dark/50 backdrop-blur-sm border border-swarp-blue/20 hover:border-swarp-cyan/50 transition-all duration-300 hover:shadow-xl hover:shadow-swarp-blue/10">
                  {/* Icon */}
                  <div className="mb-4 p-3 w-fit rounded-lg bg-gradient-to-br from-swarp-blue/20 to-swarp-purple/20 border border-swarp-blue/30 group-hover:scale-110 transition-transform">
                    <metric.icon className="w-6 h-6 text-swarp-cyan" />
                  </div>
                  
                  {/* Value */}
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {metric.value}
                  </div>
                  
                  {/* Label */}
                  <div className="text-sm font-semibold text-white mb-1">
                    {metric.label}
                  </div>
                  
                  {/* Description */}
                  <div className="text-xs text-gray-400">
                    {metric.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
