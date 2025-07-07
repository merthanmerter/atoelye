import { defineRouting } from 'next-intl/routing';
import pathnames from './data/paths.json' with { type: 'json' };

export const routing = defineRouting({
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
  localeDetection: true,
  pathnames,
});
