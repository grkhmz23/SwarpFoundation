import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";
import { Header3D } from "@/components/ui/header-3d";
import { Footer } from "@/components/ui/footer";
import { LegalModalProvider } from "@/components/ui/legal-modal";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Locale, rtlLocales } from "@/i18n/config";

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
  const locale = await getLocale();
  const messages = await getMessages();
  const isRtl = rtlLocales.includes(locale as Locale);

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"}>
      <body className={geist.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AetherBackground>
            <LegalModalProvider>
              <Header3D />
              {children}
              <Footer />
            </LegalModalProvider>
          </AetherBackground>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
