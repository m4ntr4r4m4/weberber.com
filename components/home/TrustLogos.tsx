import Image from 'next/image';

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
  return (
    <section className="py-12 md:py-16 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <p className="text-center text-xs text-gray-500 mb-8 uppercase tracking-widest">
          Featured & Certified By
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {logos.map((logo) => (
            <div
              key={logo.title}
              className="relative w-24 h-24 md:w-32 md:h-32 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              title={logo.title}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 96px, 128px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
