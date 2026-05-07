'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { locales, defaultLocale, localeLabels, localeFlags, type Locale } from '@/i18n';

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [switching, setSwitching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations('nav');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = useCallback(async (newLocale: Locale) => {
    if (newLocale === currentLocale || switching) return;
    setSwitching(true);
    setIsOpen(false);

    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;

    const safetyTimer = setTimeout(() => setSwitching(false), 5000);

    try {
      // Simple navigation: just swap the locale prefix
      const prefix = newLocale === defaultLocale ? '' : `/${newLocale}`;
      window.location.href = `${prefix}${pathname}`;
    } catch {
      const prefix = newLocale === defaultLocale ? '' : `/${newLocale}`;
      window.location.href = `${prefix}${pathname}`;
    } finally {
      clearTimeout(safetyTimer);
      setSwitching(false);
    }
  }, [currentLocale, pathname, switching]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-gray-100 transition-colors"
        aria-label={t('selectLanguage')}
        disabled={switching}
      >
        <span className="text-xl">{localeFlags[currentLocale as Locale]}</span>
        <span className="hidden sm:inline text-sm font-medium text-gray-700">
          {switching ? '…' : localeLabels[currentLocale as Locale]}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg border border-gray-200 py-2 z-50">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={`w-full text-left px-4 py-2 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${locale === currentLocale ? 'bg-gray-100' : ''
                }`}
            >
              <span className="text-xl">{localeFlags[locale]}</span>
              <span className="text-sm font-medium text-gray-700">
                {localeLabels[locale]}
              </span>
              {locale === currentLocale && (
                <svg className="w-4 h-4 ml-auto" style={{ color: '#a4243b' }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
