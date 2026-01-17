'use client'
import { Code2, Brain, Shield, Wrench } from 'lucide-react';
import { ElectricCard } from '@/components/ui/electric-card';

export function Services() {
  const services = [
    { icon: Code2, title: "Smart Contracts", desc: "Blockchain programs, DEX integrations" },
    { icon: Brain, title: "AI & Automation", desc: "Custom LLMs, trading agents" },
    { icon: Shield, title: "Security Audits", desc: "Code review, attack analysis" },
    { icon: Wrench, title: "Dev Tools", desc: "SDKs, CLI tools, frameworks" }
  ];

  return (
    <section id="services" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-5xl font-bold text-white text-center mb-16">What We Build</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {services.map(s => (
            <ElectricCard 
              key={s.title}
              color="#39E0CF"
              badge={s.icon.name}
              title={s.title}
              description={s.desc}
              width="100%"
              aspectRatio="4 / 5"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
