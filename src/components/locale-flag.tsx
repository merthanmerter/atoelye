import { cn } from '@/lib/utils';
import 'flag-icons/css/flag-icons.min.css';
import { useLocale } from 'next-intl';
import type React from 'react';

/**
 * Converts a locale string to a country code for flag display
 * @param locale - The locale string (e.g., 'en', 'en-US')
 * @returns The corresponding country code for flag display
 */
function localeToCountry(locale: string): string {
  if (locale.includes('-')) {
    const region = locale.split('-')[1].toLowerCase();
    return region;
  }

  const specialCases: Record<string, string> = {
    en: 'gb', // English -> Great Britain
    zh: 'cn', // Chinese -> China
    cs: 'cz', // Czech -> Czech Republic
    da: 'dk', // Danish -> Denmark
    el: 'gr', // Greek -> Greece
    ja: 'jp', // Japanese -> Japan
    ko: 'kr', // Korean -> South Korea
    sv: 'se', // Swedish -> Sweden
    uk: 'ua', // Ukrainian -> Ukraine
    vi: 'vn', // Vietnamese -> Vietnam
    es: 'es', // Spanish -> Spain
    fr: 'fr', // French -> France
  };

  return specialCases[locale] || locale;
}

export function LocaleFlag(): React.ReactElement {
  const locale = useLocale();

  return (
    <span
      className={cn(
        `fi fi-${localeToCountry(locale)}`,
        'inline-block size-4',
        'bg-center bg-cover bg-no-repeat'
      )}
    />
  );
}
