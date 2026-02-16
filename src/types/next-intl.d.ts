declare module 'next-intl' {
  import type { ReactNode } from 'react';

  export function NextIntlClientProvider(props: {
    locale?: string;
    messages?: Record<string, unknown>;
    children: ReactNode;
  }): JSX.Element;

  export function useLocale(): string;

  export function useTranslations(namespace?: string): (
    key?: string,
    values?: Record<string, string | number | boolean>
  ) => string;
}

declare module 'next-intl/server' {
  export function getRequestConfig<T>(factory: () => Promise<T>): () => Promise<T>;
  export function getLocale(): Promise<string>;
  export function getMessages(): Promise<Record<string, unknown>>;
  export function getTranslations(namespace?: string): Promise<(
    key?: string,
    values?: Record<string, string | number | boolean>
  ) => string>;
}

declare module 'next-intl/plugin' {
  const createNextIntlPlugin: (requestConfigPath?: string) => (config: Record<string, unknown>) => Record<string, unknown>;
  export default createNextIntlPlugin;
}
