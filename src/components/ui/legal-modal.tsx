"use client";

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────
   HELPERS
   ───────────────────────────────────────────── */

function Li({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="text-[#00D4FF] mt-1 text-xs shrink-0">›</span>
      <span>{children}</span>
    </li>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <strong className="text-white/80">{children}</strong>;
}

function Callout({ color = "cyan", title, children }: { color?: "cyan" | "amber" | "red"; title?: string; children: React.ReactNode }) {
  const border = { cyan: "border-[#00FFF0]/10", amber: "border-amber-500/20", red: "border-red-500/20" };
  const bg = { cyan: "bg-[#00FFF0]/[0.03]", amber: "bg-amber-500/[0.04]", red: "bg-red-500/[0.04]" };
  const tc = { cyan: "text-[#00FFF0]/90", amber: "text-amber-300/90", red: "text-red-300/90" };
  return (
    <div className={`mt-4 p-4 rounded-xl border ${border[color]} ${bg[color]} text-[13px] text-white/60`}>
      {title && <p className={`${tc[color]} font-semibold mb-2`}>{title}</p>}
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTENT — Privacy
   ───────────────────────────────────────────── */

type Sec = { title: string; content: React.ReactNode };
type LPage = { title: string; subtitle: string; sections: Sec[]; email: string };

const privacy: LPage = {
  title: "Privacy Policy", subtitle: "Legal / Privacy", email: "info@swarppay.com",
  sections: [
    { title: "Information We Collect", content: (<><p>We collect information you provide directly to us, information we obtain automatically when you use our services, and information from third parties:</p><ul className="list-none space-y-2 mt-3"><Li><B>Personal Information:</B> Name, email address, phone number, date of birth</Li><Li><B>Financial Information:</B> Bank account details, transaction history, wallet addresses</Li><Li><B>Identity Verification:</B> Government-issued ID, proof of address</Li><Li><B>Device Information:</B> IP address, device type, operating system, browser type</Li><Li><B>Usage Data:</B> How you interact with our services, features used</Li></ul></>) },
    { title: "How We Use Your Information", content: (<><p>We use the information we collect to:</p><ul className="list-none space-y-2 mt-3">{["Provide, maintain, and improve our services","Process transactions and send related information","Verify your identity and prevent fraud","Comply with legal obligations and regulatory requirements","Send you technical notices, updates, and security alerts","Provide customer support and respond to your requests","Analyze usage patterns to improve our services"].map((t,i)=><Li key={i}>{t}</Li>)}</ul></>) },
    { title: "Information Sharing", content: (<><p>We may share your information in the following circumstances:</p><ul className="list-none space-y-2 mt-3"><Li><B>Service Providers:</B> Third-party companies that help us provide our services</Li><Li><B>Legal Requirements:</B> When required by law or to protect our rights</Li><Li><B>Business Transfers:</B> In connection with mergers, acquisitions, or asset sales</Li><Li><B>Consent:</B> When you have given us explicit consent</Li></ul><Callout>We do not sell, rent, or trade your personal information to third parties for marketing purposes.</Callout></>) },
    { title: "Data Security", content: (<><p>We implement appropriate technical and organizational security measures:</p><ul className="list-none space-y-2 mt-3">{["256-bit SSL encryption for data transmission","Multi-factor authentication","Regular security audits and penetration testing","SOC 2 compliance certification","Employee access controls and training"].map((t,i)=><Li key={i}>{t}</Li>)}</ul></>) },
    { title: "Data Retention", content: <p>We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.</p> },
    { title: "Your Rights", content: (<><p>Depending on your location, you may have these rights:</p><ul className="list-none space-y-2 mt-3"><Li><B>Access:</B> Request access to your personal information</Li><Li><B>Correction:</B> Request correction of inaccurate information</Li><Li><B>Deletion:</B> Request deletion of your personal information</Li><Li><B>Portability:</B> Request a copy of your data in a portable format</Li><Li><B>Restriction:</B> Request restriction of processing</Li><Li><B>Objection:</B> Object to processing of your personal information</Li></ul></>) },
    { title: "Cookies and Tracking", content: <p>We use cookies and similar tracking technologies. For detailed information, please refer to our Cookie Policy.</p> },
    { title: "International Data Transfers", content: <p>Your information may be transferred to and processed in countries other than your country of residence. We ensure compliance with applicable data protection laws.</p> },
    { title: "Children's Privacy", content: <p>Our services are not intended for children under the age of 18. We do not knowingly collect personal information from children.</p> },
    { title: "Changes to This Policy", content: <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy and updating the &ldquo;Last updated&rdquo; date.</p> },
  ],
};

/* ─────────────────────────────────────────────
   CONTENT — Terms
   ───────────────────────────────────────────── */

const terms: LPage = {
  title: "Terms of Service", subtitle: "Legal / Terms", email: "info@swarppay.com",
  sections: [
    { title: "Acceptance of Terms", content: <p>By accessing and using Swarp Pay (&ldquo;the Service&rdquo;), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree, please do not use this service.</p> },
    { title: "Service Description", content: (<><p>Swarp Pay is a digital payment platform that enables users to send, receive, and convert money globally between traditional fiat currencies and cryptocurrencies:</p><ul className="list-none space-y-2 mt-3">{["Global money transfers","Real-time currency conversion","Cryptocurrency wallet integration","Non-custodial transaction processing","Multi-asset support for 100+ cryptocurrencies and fiat currencies"].map((t,i)=><Li key={i}>{t}</Li>)}</ul><Callout color="amber" title="⚠ Regulatory Disclaimer">Cryptocurrency and digital asset services may be subject to regulatory requirements in your jurisdiction. You are responsible for complying with all applicable laws.</Callout><Callout color="red" title="⚠ Risk Warnings"><p>Trading and holding digital assets involves substantial risk: price volatility, loss of capital, irreversible transactions, technical risks, and regulatory risk.</p><p className="mt-2 font-semibold text-red-300/80">Only invest what you can afford to lose.</p></Callout></>) },
    { title: "Regulatory & Licensing Status", content: (<><p>SWARP FOUNDATION S.R.L. — registered in Italy (Registration: 14284090967, REA: MI-2771688).</p><ul className="list-none space-y-2 mt-3"><Li><B>VASP:</B> Compliance with virtual asset service provider regulations</Li><Li><B>Italian:</B> OAM compliance where applicable</Li><Li><B>EU:</B> MiCA, 5AMLD, and 6AMLD adherence</Li><Li><B>GDPR:</B> Full compliance for all EU users</Li></ul></>) },
    { title: "User Accounts", content: <p>You must create an account and provide accurate, complete information. You are responsible for safeguarding your credentials and all activities under your account. Notify us immediately of unauthorized use.</p> },
    { title: "Acceptable Use", content: (<><p>Prohibited activities include:</p><ul className="list-none space-y-2 mt-3">{["Money laundering or terrorist financing","Fraud or fraudulent transactions","Violation of applicable laws or regulations","Unauthorized access to other users' accounts","Distribution of malware or harmful code"].map((t,i)=><Li key={i}>{t}</Li>)}</ul></>) },
    { title: "Fees and Charges", content: <p>All applicable fees will be clearly disclosed before you complete any transaction. We reserve the right to change our fee structure with reasonable notice.</p> },
    { title: "AML/KYC Compliance", content: (<ul className="list-none space-y-2"><Li><B>Identity Verification:</B> Valid government-issued ID and proof of address required</Li><Li><B>Transaction Monitoring:</B> We monitor for suspicious activity</Li><Li><B>Sanctions Screening:</B> All users screened against international sanctions lists</Li><Li><B>Record Keeping:</B> Maintained as required by law</Li></ul>) },
    { title: "Limitation of Liability", content: <p>To the fullest extent permitted by law, Swarp Pay shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.</p> },
    { title: "Termination", content: <p>We may terminate or suspend your account immediately, without prior notice, for breach of these Terms or at our sole discretion.</p> },
    { title: "Governing Law", content: <p>These Terms are governed by the laws of Italy. You agree to the exclusive jurisdiction of the courts in Milan, Italy.</p> },
  ],
};

/* ─────────────────────────────────────────────
   CONTENT — Security
   ───────────────────────────────────────────── */

const security: LPage = {
  title: "Security", subtitle: "Trust / Security", email: "security@swarppay.com",
  sections: [
    { title: "Our Commitment", content: <p>At Swarp Foundation, security is foundational to everything we build. We implement rigorous, multi-layered security practices across all products to protect users&apos; data, assets, and trust.</p> },
    { title: "Infrastructure Security", content: (<ul className="list-none space-y-2"><Li><B>Encryption in Transit:</B> TLS 1.3 with 256-bit AES encryption</Li><Li><B>Encryption at Rest:</B> AES-256 with industry-standard key management</Li><Li><B>Network Security:</B> Firewalls, IDS/IPS, and DDoS protection</Li><Li><B>Isolated Environments:</B> Strict production/staging/dev separation</Li><Li><B>Redundancy:</B> Multi-region deployments for high availability</Li></ul>) },
    { title: "Smart Contract Security", content: (<ul className="list-none space-y-2"><Li><B>Internal Audits:</B> Rigorous security reviews before deployment</Li><Li><B>Formal Verification:</B> Critical protocol logic formally verified</Li><Li><B>Upgrade Mechanisms:</B> Secure upgrade patterns protecting user funds</Li><Li><B>On-Chain Monitoring:</B> Continuous anomaly detection with automated alerting</Li></ul>) },
    { title: "Application Security", content: (<ul className="list-none space-y-2">{["Secure code reviews on all changes","Automated SAST/DAST in CI/CD pipelines","Dependency scanning and vulnerability management","Regular penetration testing","Content Security Policy and HTTP security headers"].map((t,i)=><Li key={i}>{t}</Li>)}</ul>) },
    { title: "Account Security", content: (<ul className="list-none space-y-2"><Li><B>MFA:</B> Available and strongly recommended for all accounts</Li><Li><B>Session Management:</B> Automatic timeouts and device tracking</Li><Li><B>Login Alerts:</B> Notifications for new device logins</Li><Li><B>Password Security:</B> Strong policies with bcrypt hashing</Li></ul>) },
    { title: "Incident Response", content: (<ul className="list-none space-y-2">{["24/7 monitoring and alerting","Defined severity classification and escalation","Post-incident review and remediation","User notification within 72 hours of confirmed breaches (GDPR)","Law enforcement coordination when necessary"].map((t,i)=><Li key={i}>{t}</Li>)}</ul>) },
    { title: "Vulnerability Disclosure", content: (<Callout title="How to Report"><ul className="list-none space-y-2"><Li>Email findings to <a href="mailto:security@swarppay.com" className="text-[#00D4FF] hover:text-[#00FFF0] underline underline-offset-2">security@swarppay.com</a></Li><Li>Include detailed description and steps to reproduce</Li><Li>Allow reasonable time for investigation before public disclosure</Li></ul></Callout>) },
    { title: "User Recommendations", content: (<ul className="list-none space-y-2">{["Enable multi-factor authentication (MFA)","Use a unique, strong password","Keep devices and browsers up to date","Be vigilant against phishing — we never ask for passwords via email","Review account activity regularly","Store private keys and recovery phrases securely offline"].map((t,i)=><Li key={i}>{t}</Li>)}</ul>) },
  ],
};

/* ─────────────────────────────────────────────
   CONTENT — Cookies
   ───────────────────────────────────────────── */

const cookies: LPage = {
  title: "Cookie Policy", subtitle: "Legal / Cookies", email: "info@swarppay.com",
  sections: [
    { title: "What Are Cookies", content: <p>Cookies are small text files placed on your device when you visit our website. They help us understand how you use our site and improve your experience.</p> },
    { title: "How We Use Cookies", content: (<ul className="list-none space-y-2"><Li><B>Essential Cookies:</B> Required for the website to function properly</Li><Li><B>Performance Cookies:</B> Help us understand how visitors interact with our website</Li><Li><B>Functionality Cookies:</B> Enable enhanced functionality and personalization</Li><Li><B>Analytics Cookies:</B> Allow us to count visits and traffic sources</Li></ul>) },
    { title: "Types of Cookies", content: (<div className="space-y-4"><div><p className="text-white/80 font-medium mb-1">Essential Cookies</p><p>Session management, security, authentication, and load balancing. Cannot be switched off.</p></div><div><p className="text-white/80 font-medium mb-1">Analytics Cookies</p><p>Google Analytics, usage statistics, and performance measurement.</p></div><div><p className="text-white/80 font-medium mb-1">Functionality Cookies</p><p>Enable personalization set by us or third-party providers.</p></div></div>) },
    { title: "Third-Party Cookies", content: (<ul className="list-none space-y-2"><Li><B>Google Analytics:</B> Website analytics and reporting</Li><Li><B>Social Media:</B> Integration and sharing functionality</Li><Li><B>Payment Processors:</B> Secure payment processing</Li></ul>) },
    { title: "Managing Cookies", content: (<><ul className="list-none space-y-2"><Li><B>Cookie Consent Banner:</B> Accept or reject non-essential cookies on first visit</Li><Li><B>Browser Settings:</B> Control through your browser preferences</Li><Li><B>Cookie Preference Center:</B> Change preferences at any time</Li></ul><div className="mt-4 grid grid-cols-2 gap-2">{[{b:"Chrome",p:"Settings › Privacy › Cookies"},{b:"Firefox",p:"Settings › Privacy › Cookies"},{b:"Safari",p:"Preferences › Privacy"},{b:"Edge",p:"Settings › Cookies"}].map((x)=>(<div key={x.b} className="p-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02]"><p className="text-white/70 font-medium text-[12px]">{x.b}</p><p className="text-white/30 text-[11px]">{x.p}</p></div>))}</div></>) },
    { title: "Do Not Track", content: <p>We currently do not respond to DNT signals due to the lack of industry consensus.</p> },
    { title: "Updates", content: <p>We may update this Cookie Policy from time to time. Changes will be reflected by updating the &ldquo;Last updated&rdquo; date.</p> },
  ],
};

/* ─────────────────────────────────────────────
   PAGE MAP
   ───────────────────────────────────────────── */

const PAGES: Record<string, LPage> = { privacy, terms, security, cookies };
const PAGE_KEYS = ["privacy", "terms", "security", "cookies"] as const;
const SHORT_LABELS: Record<string, string> = { privacy: "Privacy", terms: "Terms", security: "Security", cookies: "Cookies" };

/* ─────────────────────────────────────────────
   CONTEXT
   ───────────────────────────────────────────── */

type LegalModalCtx = {
  openLegal: (page: string) => void;
  closeLegal: () => void;
};

const Ctx = createContext<LegalModalCtx>({ openLegal: () => {}, closeLegal: () => {} });

export function useLegalModal() {
  return useContext(Ctx);
}

/* ─────────────────────────────────────────────
   PROVIDER — wraps your layout
   ───────────────────────────────────────────── */

export function LegalModalProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<string | null>(null);

  const openLegal = useCallback((page: string) => setActive(page), []);
  const closeLegal = useCallback(() => setActive(null), []);

  // Lock scroll when modal open
  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [active]);

  return (
    <Ctx.Provider value={{ openLegal, closeLegal }}>
      {children}
      {active && PAGES[active] && <ModalOverlay page={PAGES[active]} activeKey={active} onSwitch={setActive} onClose={closeLegal} />}
    </Ctx.Provider>
  );
}

/* ─────────────────────────────────────────────
   MODAL OVERLAY
   ───────────────────────────────────────────── */

function ModalOverlay({ page, activeKey, onSwitch, onClose }: { page: LPage; activeKey: string; onSwitch: (k: string) => void; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Scroll to top when switching pages
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [activeKey]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop — click to close */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div
        className="relative z-10 w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl border border-white/[0.1] shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(180deg, rgba(10, 14, 26, 0.97) 0%, rgba(6, 10, 20, 0.98) 100%)",
          backdropFilter: "blur(40px)",
          animation: "legalIn 0.22s ease-out",
        }}
      >
        {/* Top glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[80px] bg-gradient-to-b from-[#00D4FF]/[0.06] to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-4 border-b border-white/[0.06] shrink-0 bg-white/[0.01]">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <div className="h-[3px] w-5 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#9D4EDD]" />
              <span className="text-[10px] font-mono tracking-[0.18em] uppercase text-[#00FFF0]/50">{page.subtitle}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">{page.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-white hover:border-white/25 hover:bg-white/[0.08] transition-all cursor-pointer shrink-0 ml-4"
            aria-label="Close"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M1 1l10 10M11 1L1 11" /></svg>
          </button>
        </div>

        {/* ── SCROLLABLE CONTENT ── */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-7 legal-scroll">
          <p className="text-[11px] text-white/25 font-mono">Last updated: August 2025</p>

          {page.sections.map((sec, i) => (
            <div key={i}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="font-mono text-[11px] text-[#00D4FF]/40 font-semibold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[14px] font-semibold text-white/85">{sec.title}</h3>
              </div>
              <div className="text-[13px] text-white/50 leading-relaxed pl-7 space-y-2">{sec.content}</div>
            </div>
          ))}

          {/* Contact */}
          <div className="pt-5 border-t border-white/[0.06]">
            <p className="text-[13px] text-white/35">
              Questions? Contact{" "}
              <a href={`mailto:${page.email}`} className="text-[#00D4FF] hover:text-[#00FFF0] transition-colors">{page.email}</a>
              <span className="mx-1.5 text-white/10">•</span>
              Viale Tunisia 22, 20124, Milano, Italy
            </p>
          </div>
        </div>

        {/* ── TAB BAR ── */}
        <div className="px-6 sm:px-8 py-3 border-t border-white/[0.06] bg-white/[0.015] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1">
            {PAGE_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => onSwitch(key)}
                className={`text-[11px] px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeKey === key
                    ? "bg-[#00D4FF]/10 text-[#00D4FF] border border-[#00D4FF]/25"
                    : "text-white/30 hover:text-white/60 border border-transparent hover:border-white/10"
                }`}
              >
                {SHORT_LABELS[key]}
              </button>
            ))}
          </div>
          <span className="text-[9px] text-white/15 font-mono tracking-wider hidden sm:block">SWARP FOUNDATION S.R.L.</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes legalIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .legal-scroll::-webkit-scrollbar { width: 5px; }
        .legal-scroll::-webkit-scrollbar-track { background: transparent; }
        .legal-scroll::-webkit-scrollbar-thumb { background: rgba(0, 212, 255, 0.12); border-radius: 3px; }
        .legal-scroll::-webkit-scrollbar-thumb:hover { background: rgba(0, 212, 255, 0.25); }
      `}</style>
    </div>
  );
}