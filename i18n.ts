import { getRequestConfig } from 'next-intl/server';
import { routing } from './i18n/routing';

// Re-export for convenience
export { routing };
export const locales = routing.locales;
export const defaultLocale = routing.defaultLocale;
export type Locale = (typeof locales)[number];

// Locale labels
export const localeLabels: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

// Locale flags (emoji)
export const localeFlags: Record<Locale, string> = {
  es: '🇪🇸',
  en: '🇬🇧',
};

// RTL languages (none currently)
export const rtlLocales: Locale[] = [];

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}/common.json`)).default,
  };
});
