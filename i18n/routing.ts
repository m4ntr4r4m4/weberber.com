import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr', 'es', 'de', 'ar', 'ja', 'sv', 'fi'] as const,
  defaultLocale: 'en',
  // English has no prefix, other languages have prefix
  localePrefix: 'as-needed',
});
