"use client";

import React from "react";
import { LegalPageLayout } from "@/components/ui/legal-page-layout";

const sections = [
  {
    id: "commitment",
    title: "Our Security Commitment",
    content: (
      <p>
        At Swarp Foundation, security is foundational to everything we build. We implement rigorous,
        multi-layered security practices across all of our products and services — from SwarpPay to
        our blockchain protocols — to protect our users&apos; data, assets, and trust. This page outlines
        our approach to security and provides guidance on how to report vulnerabilities.
      </p>
    ),
  },
  {
    id: "infrastructure",
    title: "Infrastructure Security",
    content: (
      <>
        <p>Our infrastructure is built with defense-in-depth principles:</p>
        <ul className="list-none space-y-2 mt-3">
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Encryption in Transit:</strong> All data transmitted between you and our services is encrypted using TLS 1.3 with 256-bit AES encryption</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Encryption at Rest:</strong> All stored data is encrypted using AES-256, with encryption keys managed through industry-standard key management systems</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Network Security:</strong> We employ firewalls, intrusion detection and prevention systems (IDS/IPS), and DDoS protection across all environments</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Isolated Environments:</strong> Production, staging, and development environments are strictly isolated with separate access controls</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Redundancy:</strong> Multi-region deployments ensure high availability and disaster recovery capabilities</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "smart-contract",
    title: "Smart Contract Security",
    content: (
      <>
        <p>
          As a blockchain-native company, smart contract security is a core competency. Our approach includes:
        </p>
        <ul className="list-none space-y-2 mt-3">
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Internal Audits:</strong> All smart contracts undergo rigorous internal security reviews before deployment</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Formal Verification:</strong> Critical protocol logic is formally verified where applicable</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Upgrade Mechanisms:</strong> Contracts are designed with secure upgrade patterns to address issues without compromising user funds</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">On-Chain Monitoring:</strong> Continuous monitoring of deployed contracts for anomalous behavior, with automated alerting and response</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "application",
    title: "Application Security",
    content: (
      <>
        <p>We follow secure software development lifecycle (SSDLC) practices:</p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "Secure code reviews on all changes before deployment",
            "Automated static and dynamic application security testing (SAST/DAST) in CI/CD pipelines",
            "Dependency scanning and vulnerability management for third-party libraries",
            "Regular penetration testing by both internal teams and external security firms",
            "Content Security Policy (CSP) and other HTTP security headers enforced across all web properties",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#00D4FF] mt-1 text-xs">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "account-security",
    title: "Account Security",
    content: (
      <>
        <p>We provide and recommend multiple layers of account protection:</p>
        <ul className="list-none space-y-2 mt-3">
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Multi-Factor Authentication (MFA):</strong> Available and strongly recommended for all accounts</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Session Management:</strong> Secure session handling with automatic timeouts and device-based session tracking</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Login Alerts:</strong> Notifications for new device logins and suspicious activity</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Password Requirements:</strong> Strong password policies with bcrypt hashing and salting</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-protection",
    title: "Data Protection & Privacy",
    content: (
      <>
        <p>
          We adhere to strict data protection standards in compliance with GDPR and applicable
          regulations:
        </p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "Data minimization: we only collect information necessary to provide our services",
            "Role-based access controls (RBAC) limit employee access to customer data on a need-to-know basis",
            "All access to sensitive data is logged and audited",
            "Regular data protection impact assessments (DPIAs)",
            "Automated data retention and deletion policies in compliance with regulatory requirements",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#00D4FF] mt-1 text-xs">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          For full details, see our{" "}
          <a href="/privacy" className="text-[#00D4FF] hover:text-[#00FFF0] underline underline-offset-2 transition-colors">
            Privacy Policy
          </a>.
        </p>
      </>
    ),
  },
  {
    id: "incident-response",
    title: "Incident Response",
    content: (
      <>
        <p>
          We maintain a documented incident response plan and are prepared to respond swiftly to
          security events:
        </p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "24/7 monitoring and alerting for security events",
            "Defined severity classification and escalation procedures",
            "Post-incident review and remediation processes",
            "Notification to affected users within 72 hours of confirmed breaches as required by GDPR",
            "Coordination with law enforcement and regulatory authorities when necessary",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#00D4FF] mt-1 text-xs">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "vulnerability-disclosure",
    title: "Responsible Vulnerability Disclosure",
    content: (
      <>
        <p>
          We value the security research community and welcome responsible disclosure of
          vulnerabilities. If you discover a security issue in any Swarp product or service:
        </p>
        <div className="mt-4 p-4 rounded-xl border border-[#00FFF0]/10 bg-[#00FFF0]/[0.03]">
          <p className="text-white/80 font-semibold mb-2">How to Report</p>
          <ul className="list-none space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-[#00FFF0] mt-1 text-xs">›</span>
              <span>
                Email your findings to{" "}
                <a href="mailto:security@swarppay.com" className="text-[#00D4FF] hover:text-[#00FFF0] underline underline-offset-2 transition-colors">
                  security@swarppay.com
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00FFF0] mt-1 text-xs">›</span>
              <span>Include a detailed description of the vulnerability and steps to reproduce</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00FFF0] mt-1 text-xs">›</span>
              <span>Allow reasonable time for us to investigate and remediate before public disclosure</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00FFF0] mt-1 text-xs">›</span>
              <span>Do not access or modify other users&apos; data during testing</span>
            </li>
          </ul>
        </div>
        <p className="mt-3 text-white/50 text-[13px]">
          We are committed to working with security researchers and will not pursue legal action
          against individuals who report vulnerabilities in good faith and in accordance with this policy.
        </p>
      </>
    ),
  },
  {
    id: "compliance",
    title: "Compliance & Certifications",
    content: (
      <>
        <p>We maintain compliance with applicable regulatory and industry standards:</p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "GDPR compliance for all EU user data processing",
            "Italian OAM regulatory compliance where applicable",
            "MiCA (Markets in Crypto-Assets Regulation) readiness",
            "AML/KYC procedures in accordance with 5AMLD and 6AMLD",
            "Regular third-party security assessments and audits",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#00D4FF] mt-1 text-xs">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "user-recommendations",
    title: "Security Recommendations for Users",
    content: (
      <>
        <p>We recommend the following best practices to keep your account secure:</p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "Enable multi-factor authentication (MFA) on your account",
            "Use a unique, strong password that you don't reuse across services",
            "Keep your devices and browsers up to date with the latest security patches",
            "Be vigilant against phishing: Swarp will never ask for your password or private keys via email or chat",
            "Review your account activity regularly and report any suspicious transactions immediately",
            "Store private keys and recovery phrases securely offline — never share them with anyone",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#00D4FF] mt-1 text-xs">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
];

export default function SecurityPage() {
  return (
    <LegalPageLayout
      title="Security"
      subtitle="Trust / Security"
      lastUpdated="August 2025"
      sections={sections}
      contactEmail="security@swarppay.com"
      contactAddress="Viale Tunisia 22, 20124, Milano, Italy"
    />
  );
}
