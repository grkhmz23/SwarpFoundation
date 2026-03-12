"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { KeyboardLink } from "@/components/ui/keyboard-button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useServicesData } from "@/lib/services-data";
import { useTranslations } from "next-intl";

const accentMap = {
  cyan: {
    badge: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
    icon: "border-cyan-400/25 bg-cyan-400/10 text-cyan-300",
    glow: "from-cyan-400/20 via-cyan-400/10 to-transparent",
  },
  purple: {
    badge: "border-purple-400/30 bg-purple-400/10 text-purple-200",
    icon: "border-purple-400/25 bg-purple-400/10 text-purple-300",
    glow: "from-purple-400/20 via-purple-400/10 to-transparent",
  },
} as const;

export function ServicesOverviewSection() {
  const services = useServicesData();
  const previewLabel = useTranslations("servicesPage.preview");
  const nav = useTranslations("nav.items");
  const hero = useTranslations("servicesPage.hero");
  const cta = useTranslations("servicesPage.cta");
  const ideaActions = useTranslations("ideaSection.actions");
  const featuredServices = services.slice(0, 6);
  const serviceSummary = featuredServices
    .slice(0, 3)
    .map((service) => service.title)
    .join(" • ");

  return (
    <section className="relative py-20 sm:py-24" aria-labelledby="services-overview-heading">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute inset-x-0 top-8 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
              {nav("services")}
            </div>

            <h2
              id="services-overview-heading"
              className="mt-5 max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl"
            >
              {hero("titleMain")} <span className="text-gradient">{hero("titleAccent")}</span>
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              {hero("description")}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-cyan-400/15 bg-cyan-400/5 p-4 shadow-[0_0_40px_rgba(0,255,240,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {nav("services")}
                </p>
                <p className="mt-2 text-3xl font-black text-white">{services.length}</p>
                <p className="mt-2 text-sm text-slate-300">
                  {previewLabel("availableCount", { count: services.length })}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {cta("title")}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{cta("button")}</p>
                <p className="mt-2 text-sm text-slate-300">
                  {serviceSummary}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <KeyboardLink
                href="/services"
                size="lg"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                {ideaActions("exploreServices")}
              </KeyboardLink>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-300 transition-colors hover:border-cyan-400/30 hover:text-white"
              >
                {cta("button")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {featuredServices.map((service) => {
              const accent = accentMap[service.color];

              return (
                <Link key={service.id} href="/services" className="group block h-full">
                  <Card className="relative h-full border-white/10 bg-white/[0.04]">
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r opacity-70 transition-opacity duration-300 group-hover:opacity-100",
                        accent.glow
                      )}
                    />

                    <CardContent className="flex h-full flex-col p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg",
                            accent.icon
                          )}
                        >
                          <service.icon className="h-5 w-5" />
                        </div>

                        <span
                          className={cn(
                            "rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em]",
                            accent.badge
                          )}
                        >
                          {service.timeline}
                        </span>
                      </div>

                      <div className="mt-5 space-y-3">
                        <div>
                          <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-100">
                            {service.title}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-slate-400">{service.short}</p>
                        </div>

                        <p className="text-sm leading-6 text-slate-300">{service.desc}</p>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.proof.map((proof) => (
                          <span
                            key={proof}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-xs text-slate-300"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-cyan-300" />
                            {proof}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-200">
                        {ideaActions("exploreServices")}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
