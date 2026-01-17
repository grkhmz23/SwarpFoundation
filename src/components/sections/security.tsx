"use client";

import { Shield, Lock, Eye, AlertTriangle, CheckCircle, FileCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Multi-Layer Security",
    description: "Defense-in-depth architecture with encryption at rest and in transit, hardware security modules, and strict access controls.",
  },
  {
    icon: Eye,
    title: "24/7 Monitoring",
    description: "Real-time threat detection, automated alerts, and continuous security monitoring across all infrastructure.",
  },
  {
    icon: Lock,
    title: "Compliance Ready",
    description: "SOC 2, GDPR, and industry-standard compliance frameworks built into our development process.",
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    description: "Dedicated security team with documented incident response procedures and 15-minute response time SLA.",
  },
  {
    icon: CheckCircle,
    title: "Regular Audits",
    description: "Quarterly security audits by leading firms, penetration testing, and continuous vulnerability assessments.",
  },
  {
    icon: FileCheck,
    title: "Smart Contract Audits",
    description: "All contracts audited by multiple independent firms before deployment with public audit reports.",
  },
];

const auditBadges = [
  { name: "CertiK", status: "Audited" },
  { name: "Quantstamp", status: "Audited" },
  { name: "Trail of Bits", status: "Audited" },
  { name: "SOC 2", status: "Certified" },
];

export function Security() {
  return (
    <section id="security" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-swarp-darker via-swarp-dark to-swarp-darker" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400 font-medium">Enterprise Security</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Security by</span>{" "}
            <span className="text-gradient">Design</span>
          </h2>
          <p className="text-lg text-gray-400">
            Bank-grade security infrastructure protecting billions in digital assets with zero breaches.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securityFeatures.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-swarp-dark/50 backdrop-blur-sm border border-swarp-blue/20 hover:border-green-500/50 transition-all duration-300 group"
            >
              <div className="mb-4 p-3 w-fit rounded-lg bg-green-500/10 border border-green-500/20 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Audit Badges */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Audited & Certified</h3>
            <p className="text-gray-400">Verified by industry-leading security firms</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {auditBadges.map((badge) => (
              <div
                key={badge.name}
                className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-swarp-blue/10 border border-green-500/20 text-center group hover:border-green-500/50 transition-all duration-300"
              >
                <div className="text-lg font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
                  {badge.name}
                </div>
                <div className="inline-flex items-center space-x-1 px-2 py-1 rounded-full bg-green-500/20 text-xs text-green-400">
                  <CheckCircle className="w-3 h-3" />
                  <span>{badge.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Stats */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-r from-green-500/10 to-swarp-blue/10 border border-green-500/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">0</div>
              <div className="text-sm text-gray-400">Security Breaches</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-sm text-gray-400">Encryption Coverage</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">15min</div>
              <div className="text-sm text-gray-400">Incident Response SLA</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
