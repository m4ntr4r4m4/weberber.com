'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  locale: string;
}

export default function Header({ locale: _locale }: HeaderProps) {
  const t = useTranslations('nav');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  // Load cart count from localStorage
  useEffect(() => {
    const loadCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const count = cart.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 1), 0);
      setCartCount(count);
    };
    loadCartCount();
    const handleCartUpdate = () => loadCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  // Detect scroll for subtle shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const leftLinks = [
    { href: '/shop',        label: t('shop') },
    { href: '/collections', label: t('collections') },
    { href: '/custom',      label: t('customOrders') },
  ];

  const rightLinks = [
    { href: '/about',   label: t('about') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <>
      {/* Announcement bar */}
      <div
        className="text-white text-center py-2 text-xs tracking-wider"
        style={{ backgroundColor: 'var(--primary)', letterSpacing: '0.08em', fontSize: '0.75rem' }}
      >
        <span>{t('announcement')}</span>
      </div>

      {/* Main header */}
      <header
        className="sticky top-0 z-50 bg-white"
        style={{
          borderBottom: '1px solid var(--border)',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          transition: 'box-shadow 200ms ease',
        }}
      >
        <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 40px' }}>

          {/* Desktop — three-column centered layout */}
          <div className="hidden lg:grid" style={{ gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', height: 72 }}>

            {/* Left nav */}
            <nav className="flex items-center gap-9">
              {leftLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="wm-nav hover:text-primary transition-colors"
                  style={{ color: 'var(--fg-2)', textDecoration: 'none' }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Centre wordmark */}
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1.625rem',
                letterSpacing: '0.32em',
                color: 'var(--fg-1)',
                textDecoration: 'none',
                paddingLeft: '0.32em', // compensates for tracking
                lineHeight: 1,
              }}
            >
              WEBERBER
            </Link>

            {/* Right nav + actions */}
            <div className="flex items-center justify-end gap-7">
              {rightLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="wm-nav hover:text-primary transition-colors"
                  style={{ color: 'var(--fg-2)', textDecoration: 'none' }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Vertical separator */}
              <span style={{ width: 1, height: 18, background: 'rgba(0,0,0,0.1)', flexShrink: 0 }} />

              {/* Language switcher */}
              <LanguageSwitcher />

              {/* Cart */}
              <Link
                href="/cart"
                style={{ position: 'relative', color: 'var(--fg-2)', lineHeight: 1 }}
                aria-label={t('cartLabel')}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                </svg>
                {cartCount > 0 && (
                  <span style={{ position: 'absolute', top: -8, right: -10, fontSize: 10, color: 'var(--fg-1)', fontFamily: 'var(--font-sans)', lineHeight: 1 }}>
                    ({cartCount})
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile — logo + hamburger */}
          <div className="lg:hidden flex items-center justify-between" style={{ height: 60 }}>
            <Link
              href="/"
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1.25rem',
                letterSpacing: '0.22em',
                color: 'var(--fg-1)',
                textDecoration: 'none',
              }}
            >
              WEBERBER
            </Link>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link href="/cart" style={{ position: 'relative', color: 'var(--fg-2)' }} aria-label={t('cartLabel')}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                </svg>
                {cartCount > 0 && (
                  <span style={{ position: 'absolute', top: -8, right: -10, fontSize: 10, color: 'var(--fg-1)' }}>({cartCount})</span>
                )}
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={t('toggleMenu')}
                style={{ color: 'var(--fg-2)', padding: 4, background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {mobileMenuOpen ? (
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-5" style={{ borderTop: '1px solid var(--border)' }}>
              <nav className="flex flex-col gap-5">
                {[...leftLinks, ...rightLinks].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="wm-nav hover:text-primary transition-colors"
                    style={{ color: 'var(--fg-2)', textDecoration: 'none' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
