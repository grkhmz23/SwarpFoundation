"use client";

import React from "react";
import { LegalPageLayout } from "@/components/ui/legal-page-layout";

const sections = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p>
          We collect information you provide directly to us, information we obtain automatically
          when you use our services, and information from third parties. This includes:
        </p>
        <ul className="list-none space-y-2 mt-3">
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Personal Information:</strong> Name, email address, phone number, date of birth</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Financial Information:</strong> Bank account details, transaction history, wallet addresses</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Identity Verification:</strong> Government-issued ID, proof of address</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Device Information:</strong> IP address, device type, operating system, browser type</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Usage Data:</strong> How you interact with our services, features used</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "Provide, maintain, and improve our services",
            "Process transactions and send related information",
            "Verify your identity and prevent fraud",
            "Comply with legal obligations and regulatory requirements",
            "Send you technical notices, updates, and security alerts",
            "Provide customer support and respond to your requests",
            "Analyze usage patterns to improve our services",
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
    id: "information-sharing",
    title: "Information Sharing",
    content: (
      <>
        <p>We may share your information in the following circumstances:</p>
        <ul className="list-none space-y-2 mt-3">
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Service Providers:</strong> Third-party companies that help us provide our services</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Legal Requirements:</strong> When required by law or to protect our rights</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Business Transfers:</strong> In connection with mergers, acquisitions, or asset sales</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Consent:</strong> When you have given us explicit consent to share your information</span>
          </li>
        </ul>
        <p className="mt-4 p-3 rounded-lg border border-[#00FFF0]/10 bg-[#00FFF0]/[0.03] text-white/70">
          We do not sell, rent, or trade your personal information to third parties for marketing purposes.
        </p>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <>
        <p>
          We implement appropriate technical and organizational security measures to protect your
          personal information against unauthorized access, alteration, disclosure, or destruction.
          Our security measures include:
        </p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "256-bit SSL encryption for data transmission",
            "Multi-factor authentication",
            "Regular security audits and penetration testing",
            "SOC 2 compliance certification",
            "Employee access controls and training",
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
    id: "data-retention",
    title: "Data Retention",
    content: (
      <p>
        We retain your personal information for as long as necessary to provide our services,
        comply with legal obligations, resolve disputes, and enforce our agreements. Specific
        retention periods vary based on the type of information and applicable legal requirements.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <>
        <p>
          Depending on your location, you may have the following rights regarding your personal information:
        </p>
        <ul className="list-none space-y-2 mt-3">
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Access:</strong> Request access to your personal information</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Correction:</strong> Request correction of inaccurate information</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Deletion:</strong> Request deletion of your personal information</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Portability:</strong> Request a copy of your data in a portable format</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Restriction:</strong> Request restriction of processing</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Objection:</strong> Object to processing of your personal information</span>
          </li>
        </ul>
        <p className="mt-3">
          To exercise these rights, please contact us using the information provided below.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and Tracking",
    content: (
      <p>
        We use cookies and similar tracking technologies to collect and use personal information
        about you. For detailed information about how we use cookies and how you can manage your
        cookie preferences, please refer to our{" "}
        <a href="/cookies" className="text-[#00D4FF] hover:text-[#00FFF0] underline underline-offset-2 transition-colors">
          Cookie Policy
        </a>.
      </p>
    ),
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    content: (
      <p>
        Your information may be transferred to and processed in countries other than your country
        of residence. We ensure that such transfers comply with applicable data protection laws and
        provide adequate protection for your personal information.
      </p>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: (
      <p>
        Our services are not intended for children under the age of 18. We do not knowingly collect
        personal information from children under 18. If you believe we have collected information
        from a child under 18, please contact us immediately.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any material
        changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot;
        date. Your continued use of our services after any changes constitutes acceptance of the
        updated policy.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Legal / Privacy"
      lastUpdated="August 2025"
      sections={sections}
      contactEmail="info@swarppay.com"
      contactAddress="Viale Tunisia 22, 20124, Milano, Italy"
    />
  );
}
