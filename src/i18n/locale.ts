'use server';

import { cookies } from 'next/headers';
import { defaultLocale, Locale, locales } from './config';

const COOKIE_NAME = 'SWARP_LOCALE';

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(COOKIE_NAME)?.value;

  if (cookieLocale && isLocale(cookieLocale)) {
    return cookieLocale;
  }

  return defaultLocale;
}

export async function setUserLocale(locale: Locale): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
}
