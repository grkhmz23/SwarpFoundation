'use server';

import { setUserLocale } from './locale';
import { Locale } from './config';

export async function changeLocale(locale: Locale) {
  await setUserLocale(locale);
}
