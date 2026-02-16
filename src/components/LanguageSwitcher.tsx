'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { changeLocale } from '@/i18n/actions';
import { localeNames, locales, Locale } from '@/i18n/config';

export function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const onSelect = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      setOpen(false);
      return;
    }

    startTransition(async () => {
      await changeLocale(nextLocale);
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <div className="relative z-[120]" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={t('select')}
        className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold tracking-wide text-white transition-colors hover:text-[#00D4FF]"
        style={{
          background: 'rgba(10, 14, 39, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18" />
          <path d="M12 3a14 14 0 0 0 0 18" />
        </svg>
        <span>{locale.toUpperCase()}</span>
      </button>

      <div
        className={`absolute end-0 top-[calc(100%+8px)] min-w-[170px] rounded-lg p-1 transition-all duration-200 ${
          open ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
        style={{
          background: 'rgba(10, 14, 39, 0.95)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
        }}
      >
        {locales.map((item) => {
          const selected = item === locale;
          return (
            <button
              type="button"
              key={item}
              disabled={isPending}
              onClick={() => onSelect(item)}
              className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-white transition-colors hover:text-[#00D4FF] ${
                selected ? 'bg-[#00D4FF]/10' : 'bg-transparent'
              }`}
              style={selected ? { borderInlineStart: '2px solid #00D4FF' } : undefined}
            >
              <span>{localeNames[item]}</span>
              <span className="text-[10px] uppercase text-white/50">{item}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LanguageSwitcher;
