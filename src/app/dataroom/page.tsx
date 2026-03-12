import type { Metadata } from "next";
import Image from "next/image";
import type { ComponentType } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ChevronRight,
  Coins,
  FileLock2,
  FileStack,
  FileText,
  Globe,
  Landmark,
  Mail,
  MonitorSmartphone,
  Network,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

type ResourceLink = {
  label: string;
  href: string;
};

type RoomSection = {
  numeral: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  links: ResourceLink[];
};

type TeamEntry = {
  name: string;
  role: string;
  href: string;
};

type ContactEntry = {
  name: string;
  role: string;
  linkedin: string;
  email: string;
};

const heroLinks: ResourceLink[] = [
  {
    label: "Overview",
    href: "https://drive.google.com/file/d/1uMJEbbWoIpnbRyvfQ8pZoZNLObABCjac/view?usp=sharing",
  },
  {
    label: "Pitch Deck",
    href: "https://drive.google.com/file/d/1BK9ZdAh-cAGselbBXNG0MV0ty4JXfZUm/view?usp=sharing",
  },
  {
    label: "Whitepaper",
    href: "https://drive.google.com/file/d/1bGvITaB1xa-saPgLLJ5PWem5HqP7v-UC/view?usp=sharing",
  },
  {
    label: "Tokenomics",
    href: "https://drive.google.com/file/d/1joeA1YrSRBiIb5BoMYEdA1kCPSx9Uhzj/view?usp=sharing",
  },
  {
    label: "Compliance & Risk Summary",
    href: "https://drive.google.com/file/d/1xAesyqm-sPWzx91ltpEa8Bf8NndsfCi3/view?usp=sharing",
  },
  {
    label: "Website",
    href: "https://swarppay.com",
  },
  {
    label: "Live Demo",
    href: "https://dash.swarppay.com",
  },
];

const roomSections: RoomSection[] = [
  {
    numeral: "I.",
    title: "Core Documents",
    icon: FileText,
    links: [
      heroLinks[0],
      heroLinks[1],
      heroLinks[2],
      heroLinks[3],
      heroLinks[4],
    ],
  },
  {
    numeral: "II.",
    title: "Product & Platform",
    icon: MonitorSmartphone,
    links: [
      heroLinks[5],
      heroLinks[6],
      heroLinks[0],
      heroLinks[2],
    ],
  },
  {
    numeral: "III.",
    title: "Token & Launch Design",
    icon: Coins,
    links: [
      heroLinks[3],
      heroLinks[2],
      heroLinks[1],
    ],
  },
  {
    numeral: "IV.",
    title: "Compliance & Risk",
    icon: ShieldCheck,
    links: [
      heroLinks[4],
      heroLinks[2],
    ],
  },
  {
    numeral: "V.",
    title: "Team & Partners",
    icon: UserRound,
    links: [
      {
        label: "Salah Eddine Maniar - Founder, Business and Vision",
        href: "https://www.linkedin.com/in/salah-eddine-maniar-b89a03201/",
      },
      {
        label: "Steve Mancini - Co-founder, Go-to-Market Strategy",
        href: "https://www.linkedin.com/in/steve-mancini-53a1181ab/",
      },
      {
        label: "Gorkhmaz Beydullayev - Blockchain Lead, Technical Coordinator",
        href: "https://www.linkedin.com/in/gorkhmaz-beydullayev/",
      },
      {
        label: "David Dobrovitsky - CMO",
        href: "https://www.linkedin.com/in/david-dobrovitsky/",
      },
      {
        label: "Andreas Schreck - Public Relations and Communications",
        href: "https://www.linkedin.com/in/andreas-schreck/",
      },
      {
        label: "Angelo Formisano - Content Creator and Community Manager",
        href: "https://www.linkedin.com/in/angelo-formisano-a65368232/",
      },
      {
        label: "Lucia Granaci - Administration and Operations",
        href: "https://www.linkedin.com/in/lucia-granaci-73341b282/",
      },
      {
        label: "Tecaudex - Development Partner",
        href: "https://www.tecaudex.com/",
      },
    ],
  },
  {
    numeral: "VI.",
    title: "Investment Terms",
    icon: Landmark,
    links: [
      heroLinks[1],
      heroLinks[3],
    ],
  },
];

const platformPillars = [
  {
    title: "Unified custody",
    description:
      "Custodial trading, wallet abstraction, and structured on/off-ramp access built to reduce fragmented onboarding.",
    icon: ShieldCheck,
  },
  {
    title: "Curated launches",
    description:
      "Identity-gated token access designed to reduce bot capture and improve fairness during primary distribution.",
    icon: Coins,
  },
  {
    title: "SwarpID layer",
    description:
      "Identity-gated participation, higher integrity launch flows, and stronger controls across higher-risk actions.",
    icon: BadgeCheck,
  },
  {
    title: "Infra expansion",
    description:
      "An expanding product surface across Solana and Bitcoin infrastructure, treasury rails, and connected financial tools.",
    icon: Network,
  },
];

const teamEntries: TeamEntry[] = [
  {
    name: "Salah Eddine Maniar",
    role: "Founder, Business and Vision",
    href: "https://www.linkedin.com/in/salah-eddine-maniar-b89a03201/",
  },
  {
    name: "Steve Mancini",
    role: "Co-founder, Go-to-Market Strategy",
    href: "https://www.linkedin.com/in/steve-mancini-53a1181ab/",
  },
  {
    name: "Gorkhmaz Beydullayev",
    role: "Blockchain Lead, Technical Coordinator",
    href: "https://www.linkedin.com/in/gorkhmaz-beydullayev/",
  },
  {
    name: "David Dobrovitsky",
    role: "CMO",
    href: "https://www.linkedin.com/in/david-dobrovitsky/",
  },
  {
    name: "Andreas Schreck",
    role: "Public Relations and Communications",
    href: "https://www.linkedin.com/in/andreas-schreck/",
  },
  {
    name: "Angelo Formisano",
    role: "Content Creator and Community Manager",
    href: "https://www.linkedin.com/in/angelo-formisano-a65368232/",
  },
  {
    name: "Lucia Granaci",
    role: "Administration and Operations",
    href: "https://www.linkedin.com/in/lucia-granaci-73341b282/",
  },
  {
    name: "Tecaudex",
    role: "Development Partner",
    href: "https://www.tecaudex.com/",
  },
];

const contacts: ContactEntry[] = [
  {
    name: "Salah Eddine Maniar",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/salah-eddine-maniar-b89a03201/",
    email: "info@swarppay.com",
  },
  {
    name: "David Dobrovitsky",
    role: "Investor Relations",
    linkedin: "https://www.linkedin.com/in/david-dobrovitsky/",
    email: "info@swarppay.com",
  },
];

export const metadata: Metadata = {
  title: "[SwarpPay Seed] VC Deal Room",
  description:
    "Private investor relations data room for SwarpPay seed materials, platform overview, and core documents.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://dataroom.swarpfoundation.com",
  },
};

function ExternalResource({
  href,
  label,
  compact = false,
}: {
  href: string;
  label: string;
  compact?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] text-sm text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-cyan-400/[0.06] hover:text-white ${
        compact ? "px-3 py-2" : "px-4 py-3"
      }`}
    >
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4 text-cyan-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

export default function DataroomPage() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#040612] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-0 h-[32rem] w-[32rem] rounded-full bg-cyan-500/14 blur-3xl" />
        <div className="absolute right-[-8%] top-[18rem] h-[28rem] w-[28rem] rounded-full bg-indigo-500/14 blur-3xl" />
        <div className="absolute bottom-[-8rem] left-1/2 h-[22rem] w-[44rem] -translate-x-1/2 rounded-full bg-emerald-400/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(circle_at_top,black,transparent_78%)]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="rounded-[28px] border border-white/10 bg-black/25 p-4 shadow-[0_0_80px_rgba(0,0,0,0.24)] backdrop-blur-xl sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                <Image
                  src="/logo_transparent.png"
                  alt="Swarp Foundation"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                  Swarp Foundation
                </p>
                <h1 className="text-lg font-semibold text-white sm:text-xl">
                  [SwarpPay Seed] VC Deal Room
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                <FileLock2 className="h-3.5 w-3.5" />
                Private IR Materials
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                <CalendarDays className="h-3.5 w-3.5 text-cyan-300" />
                Updated: March 2026
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:gap-10">
          <div className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,18,36,0.96),rgba(6,9,20,0.9))] p-6 shadow-[0_0_90px_rgba(6,12,28,0.5)] backdrop-blur-xl sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              Investor Relations
            </div>

            <h2 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl">
              SwarpPay is building a structured gateway into digital assets.
            </h2>

            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              <strong className="font-semibold text-white">SwarpPay</strong> is a custodial
              crypto-fintech platform building a simpler and more structured gateway into digital
              assets through unified custody, on/off-ramp access, curated token launches,
              SwarpID-powered identity-gated participation, and expanding Solana + Bitcoin
              infrastructure.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
              Our mission is to make crypto more accessible, fairer, and more structured by solving
              fragmented onboarding, bot-dominated launches, weak market integrity, and poor user
              experience through one unified platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {heroLinks.map((link) => (
                <ExternalResource key={link.label} href={link.href} label={link.label} />
              ))}
            </div>
          </div>

          <aside className="rounded-[32px] border border-cyan-400/15 bg-[radial-gradient(circle_at_top_left,rgba(0,212,255,0.16),transparent_46%),linear-gradient(180deg,rgba(10,16,28,0.92),rgba(5,8,18,0.96))] p-6 shadow-[0_0_90px_rgba(0,212,255,0.08)] backdrop-blur-xl sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold uppercase tracking-[0.26em] text-cyan-200/80">
                Platform Snapshot
              </p>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                Seed Materials
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {platformPillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                    <pillar.icon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{pillar.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                  <BriefcaseBusiness className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-400">
                    Deal Room Use
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    This page is designed as a focused investor materials hub. It is not linked in
                    the public site navigation and is marked no-index for search engines.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                <ShieldCheck className="h-5 w-5 text-cyan-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Custody + access</p>
                <p className="text-sm text-slate-400">Unified onboarding and account rails</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10">
                <Coins className="h-5 w-5 text-indigo-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Launch infrastructure</p>
                <p className="text-sm text-slate-400">Curated token access with identity gates</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10">
                <FileStack className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Compliance posture</p>
                <p className="text-sm text-slate-400">Structured risk controls and oversight</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10">
                <Building2 className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Investor materials</p>
                <p className="text-sm text-slate-400">Deck, whitepaper, demo, and contacts</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="grid gap-5 xl:grid-cols-2">
            {roomSections.map((section) => (
              <div
                key={section.title}
                className="rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,15,28,0.94),rgba(6,9,19,0.88))] p-6 shadow-[0_0_80px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                      {section.numeral}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-white">{section.title}</h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                    <section.icon className="h-5 w-5 text-cyan-300" />
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  {section.links.map((link) => (
                    <a
                      key={`${section.title}-${link.label}`}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200 transition-all duration-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.05]"
                    >
                      <span className="pr-4">{link.label}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside className="flex flex-col gap-5 lg:sticky lg:top-8 lg:h-fit">
            <div className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                Contact
              </p>
              <h3 className="mt-3 text-2xl font-bold text-white">Investor Contacts</h3>

              <div className="mt-5 flex flex-col gap-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.name}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <p className="text-lg font-semibold text-white">{contact.name}</p>
                    <p className="mt-1 text-sm text-slate-400">{contact.role}</p>

                    <div className="mt-4 flex flex-col gap-2">
                      <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200"
                      >
                        <Globe className="h-4 w-4" />
                        LinkedIn
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
                        className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white"
                      >
                        <Mail className="h-4 w-4 text-cyan-300" />
                        {contact.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">
                Platform Links
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <ExternalResource href="https://swarppay.com" label="Website" compact />
                <ExternalResource href="https://dash.swarppay.com" label="Live Demo" compact />
              </div>
            </div>

            <div className="rounded-[30px] border border-amber-400/15 bg-amber-400/[0.04] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-amber-200/80">
                Disclaimer
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                All figures, timelines, valuation ranges, product availability, projections, and
                regulatory pathways are preliminary and may be updated as product development,
                market conditions, partner relationships, and legal requirements evolve.
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-300">
                This material is for discussion purposes only and does not constitute an offer or
                solicitation to buy or sell securities, tokens, or financial products.
                Forward-looking statements are subject to risks and uncertainties.
              </p>
            </div>
          </aside>
        </section>

        <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,16,30,0.92),rgba(5,8,18,0.96))] p-6 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                Team & Partners
              </p>
              <h3 className="mt-2 text-3xl font-bold text-white">Operating team and key partner set</h3>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Founder, go-to-market, technical coordination, communications, operations, and
              development support are consolidated here for investor review.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {teamEntries.map((entry) => (
              <a
                key={entry.name}
                href={entry.href}
                target="_blank"
                rel="noreferrer"
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-cyan-400/[0.05]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                  <UserRound className="h-5 w-5 text-cyan-300" />
                </div>
                <p className="mt-4 text-lg font-semibold text-white">{entry.name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{entry.role}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
                  Open Profile
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
