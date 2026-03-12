import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";
import { LegalModalProvider } from "@/components/ui/legal-modal";
import { AuthSessionProvider } from "@/components/providers/session-provider";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Locale, rtlLocales } from "@/i18n/config";
import { SiteChrome } from "@/components/ui/site-chrome";

const AetherBackground = dynamic(
  () => import("@/components/ui/aether-background"),
  { ssr: false }
);

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/logo_transparent.png",
      apple: "/logo_transparent.png",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "";
  const locale = await getLocale();
  const messages = await getMessages();
  const isRtl = rtlLocales.includes(locale as Locale);

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <body className={geist.className}>
        <AuthSessionProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AetherBackground>
              <LegalModalProvider>
                <SiteChrome host={host}>{children}</SiteChrome>
              </LegalModalProvider>
            </AetherBackground>
          </NextIntlClientProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
