export const locales = ['en', 'it', 'fr', 'es', 'de', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  it: 'Italiano',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  ar: 'العربية',
};

export const rtlLocales: Locale[] = ['ar'];
