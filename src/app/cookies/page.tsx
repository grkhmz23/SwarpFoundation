"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { LegalPageLayout } from "@/components/ui/legal-page-layout";

function List({ items }: { items: string[] }) {
  return (
    <ul className="list-none space-y-2 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2">
          <span className="text-[#00D4FF] mt-1 text-xs">›</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CookiesPage() {
  const t = useTranslations("legal.cookies");
  const sections = ["s1", "s2", "s3", "s4", "s5", "s6"].map((id) => ({
    id: t(`sections.${id}.id`),
    title: t(`sections.${id}.title`),
    content: (
      <>
        <p>{t(`sections.${id}.intro`)}</p>
        <List
          items={[
            t(`sections.${id}.items.0`),
            t(`sections.${id}.items.1`),
            t(`sections.${id}.items.2`),
            t(`sections.${id}.items.3`),
          ].filter((v) => v.trim().length > 0)}
        />
        {t(`sections.${id}.note`).trim().length > 0 ? <p className="mt-3">{t(`sections.${id}.note`)}</p> : null}
      </>
    ),
  }));

  return (
    <LegalPageLayout
      title={t("title")}
      subtitle={t("subtitle")}
      lastUpdated={t("lastUpdated")}
      sections={sections}
      contactEmail={t("contactEmail")}
      contactAddress={t("contactAddress")}
    />
  );
}
