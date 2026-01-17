"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const openRoles = [
  {
    title: "Senior Solana Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$150k - $220k",
    description: "Build next-gen DeFi protocols and infrastructure on Solana.",
  },
  {
    title: "AI/ML Engineer",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    salary: "$140k - $200k",
    description: "Develop AI models for trading, analytics, and automation.",
  },
  {
    title: "Smart Contract Auditor",
    department: "Security",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $190k",
    description: "Audit smart contracts and identify security vulnerabilities.",
  },
];

const perks = [
  "🌍 Fully Remote",
  "💰 Competitive Salary + Equity",
  "🏥 Health & Dental Insurance",
  "🏖️ Unlimited PTO",
  "📚 Learning Budget",
  "💻 Latest Tech Stack",
];

export function Careers() {
  return (
    <section id="careers" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-swarp-darker" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-swarp-accent/10 border border-swarp-accent/20 mb-6">
            <span className="text-sm text-swarp-accent font-medium">We&apos;re Hiring!</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Join the</span>{" "}
            <span className="text-gradient">Lab</span>
          </h2>
          <p className="text-lg text-gray-400">
            Work with cutting-edge technology, solve complex problems, and shape the future of blockchain and AI.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left: Open Roles */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Open Positions</h3>
            {openRoles.map((role) => (
              <Card key={role.title} hover>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl mb-2">{role.title}</CardTitle>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="px-3 py-1 rounded-full bg-swarp-blue/10 border border-swarp-blue/20 text-xs text-swarp-cyan font-medium whitespace-nowrap">
                        {role.department}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-swarp-cyan" />
                      {role.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-swarp-cyan" />
                      {role.type}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1 text-swarp-cyan" />
                      {role.salary}
                    </div>
                  </div>
                  <Link href="#contact">
                    <Button variant="outline" size="sm" className="group">
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Right: Perks & Culture */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-swarp-dark/50 backdrop-blur-sm border border-swarp-blue/20">
              <h3 className="text-xl font-bold text-white mb-4">Why Swarp?</h3>
              <div className="space-y-3">
                {perks.map((perk) => (
                  <div key={perk} className="flex items-center text-sm text-gray-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-swarp-cyan mr-2" />
                    {perk}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-br from-swarp-blue/10 to-swarp-purple/10 border border-swarp-blue/20">
              <h3 className="text-xl font-bold text-white mb-2">Our Culture</h3>
              <p className="text-sm text-gray-400 mb-4">
                We&apos;re a team of builders who value innovation, ownership, and continuous learning. Work from anywhere, collaborate globally.
              </p>
              <Link href="#about">
                <Button variant="ghost" size="sm" className="group">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">Don&apos;t see a role that fits? We&apos;re always looking for talented people.</p>
          <Link href="#contact">
            <Button size="lg" variant="outline">
              Send Us Your Resume
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
