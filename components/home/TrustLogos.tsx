import Image from 'next/image';
import { useTranslations } from 'next-intl';

const logos = [
  {
    src: 'https://admin.moroccan-carpet.com/wp-content/uploads/2025/01/LABEL-STEP-400x400.png',
    alt: 'Label STEP Fair Trade Certification',
    title: 'Label STEP',
  },
  {
    src: 'https://admin.moroccan-carpet.com/wp-content/uploads/2025/06/CONDE-NAST-400x400.png',
    alt: 'Condé Nast Traveller Featured',
    title: 'Condé Nast',
  },
  {
    src: 'https://admin.moroccan-carpet.com/wp-content/uploads/2025/01/COVER-MAGAZINE-400x400.png',
    alt: 'Cover Magazine Featured',
    title: 'Cover Magazine',
  },
  {
    src: 'https://admin.moroccan-carpet.com/wp-content/uploads/2025/01/KOHAN-TEXTILE-400x400.png',
    alt: 'Kohan Textile Journal',
    title: 'Kohan Textile',
  },
  {
    src: 'https://admin.moroccan-carpet.com/wp-content/uploads/2025/01/MINISTRY-OF-TOURISM-400x400.png',
    alt: 'Morocco Ministry of Tourism',
    title: 'Ministry of Tourism',
  },
];

export default function TrustLogos() {
  const t = useTranslations('trust');
  return (
    <section
      style={{
        padding: '72px 40px',
        background: 'var(--bg-warm, #fafaf7)',
        borderTop: '1px solid rgba(0,0,0,0.04)',
        borderBottom: '1px solid rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto' }}>
        <p
          style={{
            textAlign: 'center',
            fontSize: 10,
            letterSpacing: '0.34em',
            color: 'var(--fg-3)',
            textTransform: 'uppercase',
            marginBottom: 44,
            fontFamily: 'var(--font-sans)',
          }}
        >
          {t('asFeaturedIn')}
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 40,
          }}
        >
          {logos.map((logo) => (
            <div
              key={logo.title}
              className="trust-logo-item"
              style={{ position: 'relative' }}
              title={logo.title}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="80px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
