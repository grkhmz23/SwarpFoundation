"use client";

import React from "react";
import { LegalPageLayout } from "@/components/ui/legal-page-layout";

const sections = [
  {
    id: "what-are-cookies",
    title: "What Are Cookies",
    content: (
      <p>
        Cookies are small text files that are placed on your device when you visit our website. They
        are widely used to make websites work more efficiently and provide information to website
        owners. Cookies help us understand how you use our site and improve your experience.
      </p>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Cookies",
    content: (
      <>
        <p>We use cookies for the following purposes:</p>
        <ul className="list-none space-y-2 mt-3">
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Essential Cookies:</strong> Required for the website to function properly, including authentication and security features</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Performance Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting information anonymously</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Functionality Cookies:</strong> Enable enhanced functionality and personalization, such as remembering your preferences</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Analytics Cookies:</strong> Allow us to count visits and traffic sources to measure and improve site performance</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "types",
    title: "Types of Cookies We Use",
    content: (
      <>
        <div className="space-y-5">
          <div>
            <p className="text-white/80 font-medium mb-2">3.1 Essential Cookies</p>
            <p>
              These cookies are necessary for the website to function and cannot be switched off in
              our systems. They are usually only set in response to actions you take, such as setting
              your privacy preferences, logging in, or filling in forms.
            </p>
            <ul className="list-none space-y-1 mt-2 text-white/50">
              {["Session management cookies", "Security cookies", "Authentication cookies", "Load balancing cookies"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#00D4FF]/50 mt-1 text-xs">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white/80 font-medium mb-2">3.2 Analytics Cookies</p>
            <p>
              We use analytics services to help us understand how users interact with our website.
              These cookies collect information about your visit, including pages viewed, time spent on
              the site, and any errors encountered.
            </p>
            <ul className="list-none space-y-1 mt-2 text-white/50">
              {["Google Analytics", "Usage statistics cookies", "Performance measurement cookies"].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#00D4FF]/50 mt-1 text-xs">›</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-white/80 font-medium mb-2">3.3 Functionality Cookies</p>
            <p>
              These cookies enable the website to provide enhanced functionality and personalization.
              They may be set by us or by third-party providers whose services we have added to our pages.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "third-party",
    title: "Third-Party Cookies",
    content: (
      <>
        <p>
          In addition to our own cookies, we may also use various third-party cookies to report usage
          statistics and deliver advertisements. Third-party services we use include:
        </p>
        <ul className="list-none space-y-2 mt-3">
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Google Analytics:</strong> For website analytics and reporting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Social Media Platforms:</strong> For social media integration and sharing functionality</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Payment Processors:</strong> For secure payment processing</span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "managing",
    title: "Managing Cookies",
    content: (
      <>
        <p>
          You have the right to decide whether to accept or reject cookies. You can exercise your
          cookie preferences through:
        </p>
        <ul className="list-none space-y-2 mt-3">
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Cookie Consent Banner:</strong> When you first visit our website, you can accept or reject non-essential cookies</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Browser Settings:</strong> Most web browsers allow you to control cookies through their settings</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00D4FF] mt-1 text-xs">›</span>
            <span><strong className="text-white/80">Cookie Preference Center:</strong> You can change your cookie preferences at any time</span>
          </li>
        </ul>
        <p className="mt-3 text-white/50 text-[13px]">
          Please note that if you choose to disable essential cookies, some features of our website
          may not function properly.
        </p>
      </>
    ),
  },
  {
    id: "browser-instructions",
    title: "Browser-Specific Instructions",
    content: (
      <>
        <p>To manage cookies in your specific browser, please refer to the following:</p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { browser: "Chrome", path: "Settings › Privacy and security › Cookies" },
            { browser: "Firefox", path: "Settings › Privacy & Security › Cookies" },
            { browser: "Safari", path: "Preferences › Privacy › Cookies" },
            { browser: "Edge", path: "Settings › Cookies and site permissions" },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-lg border border-white/[0.06] bg-white/[0.02]">
              <p className="text-white/80 font-medium text-[13px]">{item.browser}</p>
              <p className="text-white/40 text-[12px] mt-0.5">{item.path}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "dnt",
    title: "Do Not Track Signals",
    content: (
      <p>
        Some browsers include a &quot;Do Not Track&quot; (DNT) feature that signals to websites that you do
        not want to have your online activity tracked. We currently do not respond to DNT signals due
        to the lack of industry consensus on how to interpret these signals.
      </p>
    ),
  },
  {
    id: "mobile",
    title: "Mobile Device Identifiers",
    content: (
      <p>
        When you use our mobile applications, we may collect mobile device identifiers and similar
        technologies for the same purposes as we use cookies on our website. You can manage these
        through your device settings.
      </p>
    ),
  },
  {
    id: "updates",
    title: "Updates to This Policy",
    content: (
      <p>
        We may update this Cookie Policy from time to time to reflect changes in our practices or for
        other operational, legal, or regulatory reasons. We will notify you of any material changes by
        updating the &quot;Last updated&quot; date at the top of this policy.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      subtitle="Legal / Cookies"
      lastUpdated="August 2025"
      sections={sections}
      contactEmail="info@swarppay.com"
      contactAddress="Viale Tunisia 22, 20124, Milano, Italy"
    />
  );
}
