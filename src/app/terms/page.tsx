"use client";

import React from "react";
import { LegalPageLayout } from "@/components/ui/legal-page-layout";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: (
      <p>
        By accessing and using Swarp Pay (&quot;the Service&quot;), you accept and agree to be bound by the
        terms and provisions of this agreement. If you do not agree to abide by the above, please do
        not use this service.
      </p>
    ),
  },
  {
    id: "service-description",
    title: "Service Description",
    content: (
      <>
        <p>
          Swarp Pay is a digital payment platform that enables users to send, receive, and convert
          money globally between traditional fiat currencies and cryptocurrencies. Our services include:
        </p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "Global money transfers",
            "Real-time currency conversion",
            "Cryptocurrency wallet integration",
            "Non-custodial transaction processing",
            "Multi-asset support for 100+ cryptocurrencies and fiat currencies",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#00D4FF] mt-1 text-xs">›</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.04]">
          <p className="text-amber-300/90 text-[13px] font-semibold mb-2">⚠ Regulatory Disclaimer</p>
          <p className="text-white/60 text-[13px]">
            Cryptocurrency and digital asset services may be subject to regulatory requirements in your
            jurisdiction. By using our services, you acknowledge that you are responsible for complying
            with all applicable laws and regulations in your jurisdiction. Cryptocurrency regulations
            vary by country and may change without notice. Some services may not be available in all
            jurisdictions. We reserve the right to restrict or terminate services based on regulatory
            requirements.
          </p>
        </div>
        <div className="mt-4 p-4 rounded-xl border border-red-500/20 bg-red-500/[0.04]">
          <p className="text-red-300/90 text-[13px] font-semibold mb-2">⚠ Risk Warnings</p>
          <div className="text-white/60 text-[13px] space-y-1">
            <p>Trading and holding digital assets involves substantial risk. You should be aware of:</p>
            <ul className="list-none space-y-1 mt-2">
              {[
                "Price Volatility: Cryptocurrency prices can fluctuate dramatically in short periods",
                "Loss of Capital: You may lose some or all of your invested capital",
                "Irreversible Transactions: Cryptocurrency transactions cannot be reversed once confirmed",
                "Technical Risks: Smart contract bugs, network issues, and security vulnerabilities may result in loss of funds",
                "Regulatory Risk: Changes in regulations may affect the value and legality of digital assets",
                "No Guarantees: Past performance does not guarantee future results",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400/70 mt-1 text-xs">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 font-semibold text-red-300/80">
              Only invest what you can afford to lose. Consult with a financial advisor before making
              investment decisions.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "regulatory",
    title: "Regulatory & Licensing Status",
    content: (
      <>
        <p>
          SWARP FOUNDATION S.R.L. is a company registered in Italy (Company Registration Number:
          14284090967, REA: MI-2771688).
        </p>
        <div className="mt-4 space-y-3">
          <p className="text-white/80 font-medium">Licensing and Regulatory Framework:</p>
          <ul className="list-none space-y-2">
            {[
              { label: "VASP", desc: "We are committed to operating in compliance with applicable regulations for virtual asset service providers in all jurisdictions where we offer services" },
              { label: "Money Transmitter", desc: "Where required by law, we will obtain appropriate money transmitter or payment services licenses before offering services" },
              { label: "Italian Regulations", desc: "We comply with Italian regulations including those set forth by Organismo Agenti e Mediatori (OAM) where applicable" },
              { label: "EU Regulations", desc: "We adhere to EU directives including MiCA (Markets in Crypto-Assets Regulation), 5AMLD, and 6AMLD where applicable" },
              { label: "Data Protection", desc: "We comply with GDPR (General Data Protection Regulation) for all EU users" },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-[#00D4FF] mt-1 text-xs">›</span>
                <span><strong className="text-white/80">{item.label}:</strong> {item.desc}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] text-white/60 text-[13px]">
          <p className="font-semibold text-white/70 mb-1">Jurisdictional Restrictions</p>
          <p>
            Our services may not be available in certain countries or regions including but not limited
            to countries subject to international sanctions. We continuously monitor regulatory
            developments and may modify service availability based on legal requirements.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "user-accounts",
    title: "User Accounts",
    content: (
      <p>
        To use our services, you must create an account and provide accurate, complete, and current
        information. You are responsible for safeguarding your account credentials and all activities
        that occur under your account. You must immediately notify us of any unauthorized use of your
        account.
      </p>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    content: (
      <>
        <p>
          You agree not to use the Service for any unlawful purpose or in any way that could damage,
          disable, or impair the Service. Prohibited activities include but are not limited to:
        </p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "Money laundering or terrorist financing",
            "Fraud or fraudulent transactions",
            "Violation of any applicable laws or regulations",
            "Unauthorized access to other users' accounts",
            "Distribution of malware or harmful code",
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
    id: "fees",
    title: "Fees and Charges",
    content: (
      <p>
        Swarp Pay charges fees for certain transactions and services. All applicable fees will be
        clearly disclosed before you complete any transaction. We reserve the right to change our fee
        structure with reasonable notice.
      </p>
    ),
  },
  {
    id: "security-privacy",
    title: "Security and Privacy",
    content: (
      <p>
        We implement industry-standard security measures to protect your account and personal
        information. However, no system is completely secure, and you acknowledge that you use the
        Service at your own risk. For detailed information about how we collect and use your data,
        please review our{" "}
        <a href="/privacy" className="text-[#00D4FF] hover:text-[#00FFF0] underline underline-offset-2 transition-colors">
          Privacy Policy
        </a>.
      </p>
    ),
  },
  {
    id: "aml-kyc",
    title: "Anti-Money Laundering (AML) & Know Your Customer (KYC)",
    content: (
      <>
        <p>
          Swarp Pay is committed to preventing money laundering, terrorist financing, and other
          financial crimes. To comply with applicable laws and regulations, we implement comprehensive
          AML/KYC procedures:
        </p>
        <ul className="list-none space-y-2 mt-3">
          {[
            { label: "Identity Verification", desc: "Users must provide valid government-issued identification and proof of address" },
            { label: "Enhanced Due Diligence", desc: "High-value transactions may require additional verification" },
            { label: "Transaction Monitoring", desc: "We monitor transactions for suspicious activity" },
            { label: "Reporting Obligations", desc: "We are required to report suspicious activities to relevant authorities" },
            { label: "Sanctions Screening", desc: "We screen all users and transactions against international sanctions lists" },
            { label: "Record Keeping", desc: "We maintain records of customer due diligence and transactions as required by law" },
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#00D4FF] mt-1 text-xs">›</span>
              <span><strong className="text-white/80">{item.label}:</strong> {item.desc}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          By using our services, you consent to our collection, verification, and retention of your
          personal information for AML/KYC purposes. Failure to provide required information or
          cooperate with verification procedures may result in account suspension or termination.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: (
      <p>
        To the fullest extent permitted by law, Swarp Pay shall not be liable for any indirect,
        incidental, special, consequential, or punitive damages, including without limitation loss of
        profits, data, or use, arising out of or relating to your use of the Service.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <p>
        We may terminate or suspend your account and access to the Service immediately, without prior
        notice, if you breach these Terms of Service or for any other reason at our sole discretion.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content: (
      <p>
        We reserve the right to modify these terms at any time. We will notify users of any material
        changes via email or through the Service. Your continued use of the Service after such
        modifications constitutes acceptance of the updated terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <p>
        These Terms of Service are governed by and construed in accordance with the laws of Italy,
        and you agree to submit to the exclusive jurisdiction of the courts in Milan, Italy for the
        resolution of any disputes.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      subtitle="Legal / Terms"
      lastUpdated="August 2025"
      sections={sections}
      contactEmail="info@swarppay.com"
      contactAddress="Viale Tunisia 22, 20124, Milano, Italy"
    />
  );
}
