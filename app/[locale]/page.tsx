import { Suspense } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import ReviewsSlider from '@/components/home/ReviewsSlider';
import TrustLogos from '@/components/home/TrustLogos';

export const revalidate = 3600;

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  const categories = [
    {
      name: t('categories.rugsName'),
      sub: t('categories.rugsSub'),
      slug: 'rugs',
      img: 'https://admin.moroccan-carpet.com/wp-content/uploads/2024/08/DSC4382-1-edited.jpg',
      span2: true,
    },
    {
      name: t('categories.pillowsName'),
      sub: t('categories.pillowsSub'),
      slug: 'pillows',
      img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80',
      span2: false,
    },
    {
      name: t('categories.ceramicName'),
      sub: t('categories.ceramicSub'),
      slug: 'ceramic',
      img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80',
      span2: false,
    },
    {
      name: t('categories.candlesName'),
      sub: t('categories.candlesSub'),
      slug: 'candles',
      img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80',
      span2: false,
    },
    {
      name: t('categories.brassLampsName'),
      sub: t('categories.brassLampsSub'),
      slug: 'brass-lamps',
      img: 'https://admin.moroccan-carpet.com/wp-content/uploads/2025/07/DSC_7333-1-1120x800-1.jpg',
      span2: false,
    },
  ];

  const features = [
    { num: '01', title: t('features.handKnottedTitle'), desc: t('features.handKnottedDesc') },
    { num: '02', title: t('features.naturalDyesTitle'), desc: t('features.naturalDyesDesc') },
    { num: '03', title: t('features.labelStepTitle'), desc: t('features.labelStepDesc') },
    { num: '04', title: t('features.lifetimeCareTitle'), desc: t('features.lifetimeCareDesc') },
  ];

  const visitRows: [string, string][] = [
    [t('visitAtelierLabel'), t('visitAtelierValue')],
    [t('visitMailLabel'), t('visitMailValue')],
    [t('visitVoiceLabel'), t('visitVoiceValue')],
    [t('visitHoursLabel'), t('visitHoursValue')],
  ];

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', height: '92vh', minHeight: 720, overflow: 'hidden', background: '#0d0c0a' }}>
        <Image
          src="https://admin.moroccan-carpet.com/wp-content/uploads/2024/08/DSC4382-1-edited.jpg"
          alt={t('heroTitleLine2')}
          fill
          className="object-cover hero-kenburns"
          style={{ opacity: 0.82 }}
          priority
          sizes="100vw"
        />
        {/* gradient vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(13,12,10,.55) 0%, rgba(13,12,10,.05) 35%, rgba(13,12,10,0) 60%, rgba(13,12,10,.75) 100%)' }} />

        {/* corner ornaments */}
        <div style={{ position: 'absolute', left: 40, top: 40, color: 'rgba(255,255,255,.5)', fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
          {t('heroBadgeLeft')}
        </div>
        <div style={{ position: 'absolute', right: 40, top: 40, color: 'rgba(255,255,255,.5)', fontSize: 11, letterSpacing: '.28em', textTransform: 'uppercase', fontFamily: 'var(--font-sans)' }}>
          {t('heroBadgeRight')}
        </div>

        {/* copy block — bottom-left */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 96px', maxWidth: 1280, margin: '0 auto', left: 0, right: 0 }}>
          <div style={{ maxWidth: 760 }}>
            <div style={{ color: 'rgba(255,255,255,.7)', fontSize: 11, letterSpacing: '.34em', textTransform: 'uppercase', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'var(--font-sans)' }}>
              <span style={{ width: 36, height: 1, background: 'rgba(255,255,255,.5)', display: 'inline-block' }} />
              {t('heroEyebrow')}
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontStyle: 'italic', color: '#fff', fontSize: 'clamp(56px, 8vw, 112px)', lineHeight: 1.02, letterSpacing: '-0.015em', margin: 0 }}>
              {t('heroTitleLine1')}<br />
              <span style={{ fontStyle: 'normal', fontWeight: 500 }}>{t('heroTitleLine2')}</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,.78)', fontSize: 17, lineHeight: 1.7, maxWidth: 520, marginTop: 36, fontWeight: 300, fontFamily: 'var(--font-sans)' }}>
              {t('heroSubtitle')}
            </p>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginTop: 44 }}>
              <Link
                href="/shop"
                style={{ color: '#fff', fontSize: 12, letterSpacing: '.24em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,.6)', paddingBottom: 6, fontFamily: 'var(--font-sans)' }}
              >
                {t('heroCtaPrimary')}
              </Link>
              <Link
                href="/custom"
                style={{ color: 'rgba(255,255,255,.7)', fontSize: 12, letterSpacing: '.24em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-sans)' }}
              >
                {t('heroCtaSecondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST LOGOS ──────────────────────────────────────────────── */}
      <TrustLogos />

      {/* ── CATEGORY GRID ────────────────────────────────────────────── */}
      <section style={{ padding: '140px 40px 120px', background: 'var(--bg-warm, #fafaf7)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'end', marginBottom: 64, gap: 40 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '.34em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 18, fontFamily: 'var(--font-sans)' }}>
                {t('categoriesEyebrow')}
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(40px, 5vw, 68px)', lineHeight: 1.05, margin: 0, color: 'var(--fg-1)', letterSpacing: '-.015em' }}>
                {t('categoriesTitleLine1')}<br /><em style={{ fontWeight: 400 }}>{t('categoriesTitleLine2')}</em>
              </h2>
            </div>
            <p style={{ color: 'var(--fg-2)', fontSize: 17, lineHeight: 1.75, fontWeight: 300, maxWidth: 460, justifySelf: 'end', fontFamily: 'var(--font-sans)', margin: 0 }}>
              {t('categoriesIntro')}
            </p>
          </div>

          {/* 3-column grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
            {categories.map((cat, idx) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                style={{
                  gridColumn: cat.span2 ? 'span 2' : undefined,
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'block',
                  aspectRatio: cat.span2 ? '16/9' : '4/5',
                  textDecoration: 'none',
                }}
                className="category-tile"
              >
                <Image
                  src={cat.img}
                  alt={cat.name}
                  fill
                  className="object-cover category-tile-img"
                  sizes={cat.span2 ? '(max-width:768px) 100vw, 67vw' : '(max-width:768px) 100vw, 33vw'}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
                {/* overlay gradient */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(0,0,0,.52) 0%, transparent 55%)', transition: 'background 400ms' }} />
                {/* label */}
                <div style={{ position: 'absolute', left: 28, right: 28, bottom: 28, color: '#fff' }}>
                  <div style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.75)', marginBottom: 10, fontFamily: 'var(--font-sans)' }}>
                    {cat.sub}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 36, margin: 0, letterSpacing: '-.01em' }}>
                      {cat.name}
                    </h3>
                    <span style={{ fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,.7)', paddingBottom: 4, fontFamily: 'var(--font-sans)' }}>
                      {t('categoryExplore')}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 72 }}>
            <Link
              href="/collections"
              style={{ fontSize: 12, letterSpacing: '.26em', textTransform: 'uppercase', color: 'var(--fg-1)', textDecoration: 'none', borderBottom: '1px solid var(--fg-1)', paddingBottom: 6, fontFamily: 'var(--font-sans)' }}
            >
              {t('categoriesCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE — portrait + quote + list ─────────────────────── */}
      <section style={{ padding: '160px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 96, alignItems: 'center' }}>
          {/* Portrait side */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
              <Image
                src="https://admin.moroccan-carpet.com/wp-content/uploads/2025/07/011-1-1120x800-1.jpg"
                alt={t('whyQuoteAuthor')}
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Quote card */}
            <div style={{ position: 'absolute', left: -28, bottom: -28, background: 'var(--bg-warm, #fafaf7)', padding: '24px 32px', maxWidth: 280, borderLeft: '1px solid var(--primary)' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, lineHeight: 1.5, color: 'var(--fg-1)' }}>
                &ldquo;{t('whyQuote')}&rdquo;
              </div>
              <div style={{ fontSize: 10, letterSpacing: '.26em', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 14, fontFamily: 'var(--font-sans)' }}>
                {t('whyQuoteAuthor')}
              </div>
            </div>
          </div>

          {/* Copy side */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: '.34em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 22, fontFamily: 'var(--font-sans)' }}>
              {t('whyEyebrow')}
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(40px, 4.5vw, 60px)', lineHeight: 1.08, margin: '0 0 32px', color: 'var(--fg-1)', letterSpacing: '-.015em' }}>
              {t('whyTitleLine1')}<br /><em style={{ fontWeight: 400 }}>{t('whyTitleLine2')}</em>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--fg-2)', fontWeight: 300, marginBottom: 48, fontFamily: 'var(--font-sans)' }}>
              {t('whyDescription')}
            </p>
            <div>
              {features.map((f, i) => (
                <div
                  key={f.num}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '60px 1fr',
                    gap: 28,
                    padding: '24px 0',
                    borderTop: '1px solid rgba(0,0,0,.08)',
                    borderBottom: i === features.length - 1 ? '1px solid rgba(0,0,0,.08)' : 'none',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 18, color: 'var(--primary)' }}>
                    {f.num}
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--fg-1)', marginBottom: 4, fontFamily: 'var(--font-sans)' }}>{f.title}</div>
                    <div style={{ fontSize: 14, color: 'var(--fg-2)', fontWeight: 300, lineHeight: 1.6, fontFamily: 'var(--font-sans)' }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL SPREAD (Custom CTA) ─────────────────────────────── */}
      <section style={{ background: 'var(--bg-warm, #fafaf7)', padding: '0 0' }}>
        <div style={{ maxWidth: '100%', display: 'grid', gridTemplateColumns: '5fr 4fr', alignItems: 'stretch' }}>
          <div style={{ position: 'relative', minHeight: 560 }}>
            <Image
              src="https://admin.moroccan-carpet.com/wp-content/uploads/2025/07/DSC_7333-1-1120x800-1.jpg"
              alt={t('customTitleLine2')}
              fill
              className="object-cover"
              loading="lazy"
              sizes="60vw"
            />
          </div>
          <div style={{ background: '#1a1814', color: '#fff', padding: '80px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: '.34em', textTransform: 'uppercase', color: 'var(--primary-300, #f4a9b6)', marginBottom: 22, fontFamily: 'var(--font-sans)' }}>
                {t('customEyebrow')}
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 40, lineHeight: 1.15, margin: '0 0 24px', letterSpacing: '-.01em' }}>
                {t('customTitleLine1')} <em>{t('customTitleLine2')}</em>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: 'rgba(255,255,255,.7)', fontWeight: 300, marginTop: 0, fontFamily: 'var(--font-sans)' }}>
                {t('customDescription')}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'grid', gap: 12 }}>
                {[t('customBenefit1'), t('customBenefit2'), t('customBenefit3')].map((item) => (
                  <li key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: 'rgba(255,255,255,.8)', fontFamily: 'var(--font-sans)' }}>
                    <span style={{ color: 'var(--primary-300, #f4a9b6)', flexShrink: 0 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,.15)' }}>
              <div style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,.5)', fontFamily: 'var(--font-sans)' }}>
                {t('customMeta')}
              </div>
              <a
                href="mailto:Contact@weberber.com?subject=Custom%20Design%20Inquiry"
                style={{ color: '#fff', fontSize: 12, letterSpacing: '.24em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,.7)', paddingBottom: 4, fontFamily: 'var(--font-sans)' }}
              >
                {t('customCta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────────────────────── */}
      <section style={{ padding: '120px 40px', background: '#fff' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 64 }}>
            <div style={{ fontSize: 11, letterSpacing: '.34em', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 18, fontFamily: 'var(--font-sans)' }}>
              {t('reviewsEyebrow')}
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, margin: '0 auto', color: 'var(--fg-1)', maxWidth: 560 }}>
              {t('reviewsTitle')}
            </h2>
          </div>
          <Suspense>
            <ReviewsSlider />
          </Suspense>
        </div>
      </section>

      {/* ── VISIT / ATELIER ───────────────────────────────────────────── */}
      <section style={{ padding: '160px 40px', background: 'var(--bg-warm, #fafaf7)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1.05fr', gap: 96, alignItems: 'center' }}>
          {/* Copy */}
          <div>
            <div style={{ fontSize: 11, letterSpacing: '.34em', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 22, fontFamily: 'var(--font-sans)' }}>
              {t('visitEyebrow')}
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: 'clamp(40px, 4.5vw, 60px)', lineHeight: 1.08, margin: 0, letterSpacing: '-.015em', color: 'var(--fg-1)' }}>
              {t('visitTitleLine1')}<br /><em style={{ fontWeight: 400 }}>{t('visitTitleLine2')}</em>
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--fg-2)', fontWeight: 300, margin: '32px 0 48px', maxWidth: 460, fontFamily: 'var(--font-sans)' }}>
              {t('visitDescription')}
            </p>
            <div style={{ display: 'grid', gap: 22, marginBottom: 48 }}>
              {visitRows.map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, paddingBottom: 18, borderBottom: '1px solid rgba(0,0,0,.08)' }}>
                  <div style={{ fontSize: 10, letterSpacing: '.28em', textTransform: 'uppercase', color: 'var(--fg-3)', paddingTop: 4, fontFamily: 'var(--font-sans)' }}>{k}</div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: 18, color: 'var(--fg-1)' }}>{v}</div>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              style={{ fontSize: 12, letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--fg-1)', textDecoration: 'none', borderBottom: '1px solid var(--fg-1)', paddingBottom: 6, fontFamily: 'var(--font-sans)' }}
            >
              {t('visitCta')}
            </Link>
          </div>

          {/* Portrait */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden' }}>
              <Image
                src="https://admin.moroccan-carpet.com/wp-content/uploads/2025/07/DSC_2859-1-1120x800-1.jpg"
                alt="Weberber atelier"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* postage-stamp ornament */}
            <div style={{ position: 'absolute', top: 24, right: 24, width: 96, height: 96, border: '1px solid rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: 13, lineHeight: 1.3, textAlign: 'center', padding: 8 }}>
              Maison<br />WEBERBER<br />
              <span style={{ fontStyle: 'normal', fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase' }}>{t('visitStampEst')}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
