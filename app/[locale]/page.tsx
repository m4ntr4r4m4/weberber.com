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

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  const categories = [
    { name: t('categories.rugs') || 'Rugs', slug: 'rugs', img: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80' },
    { name: t('categories.pillows') || 'Pillows', slug: 'pillows', img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80' },
    { name: t('categories.candles') || 'Candles', slug: 'candles', img: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80' },
    { name: t('categories.ceramic') || 'Ceramic', slug: 'ceramic', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80' },
    { name: t('categories.arganOil') || 'Argan Oil', slug: 'argan-oil', img: 'https://images.unsplash.com/photo-1608248593842-83b333792044?auto=format&fit=crop&q=80' },
    { name: t('categories.brassLamps') || 'Brass Lamps', slug: 'brass-lamps', img: 'https://images.unsplash.com/photo-1540981493580-8ea1113e9958?auto=format&fit=crop&q=80' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://admin.moroccan-carpet.com/wp-content/uploads/2024/08/DSC4382-1-edited.jpg"
            alt="Authentic Moroccan home goods"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Text Band with Opacity */}
        <div className="absolute inset-0 flex items-center z-10">
          <div className="w-full bg-black/60 py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center text-white">
                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                  {t('heroTitle')}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
                  {t('heroSubtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/shop"
                    className="bg-primary text-white px-8 py-4 rounded hover:bg-primary-600 transition-colors font-medium"
                  >
                    {t('shopNow')}
                  </Link>
                  <Link
                    href="/collections"
                    className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded hover:bg-white/20 transition-colors font-medium border border-white/30"
                  >
                    {t('viewCollections')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Logos */}
      <TrustLogos />

      {/* Featured Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900">
              {t('categoriesTitle')}
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              {t('categoriesSubtitle')}
            </p>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.slug} 
                href={`/collections/${category.slug}`}
                className="group relative overflow-hidden rounded shadow-md"
              >
                <div 
                  className="h-80 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url("${category.img}")` }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-white text-2xl font-serif">{category.name}</h3>
                  <span className="text-primary-300 text-sm uppercase tracking-wider font-semibold mt-2 inline-block opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {t('shopNow')} →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/collections"
              className="inline-block border-2 border-gray-900 text-gray-900 px-8 py-3 rounded hover:bg-gray-900 hover:text-white transition-colors font-medium"
            >
              {t('viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-gray-900">
                {t('whyTitle')}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t('whyDescription')}
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary">✋</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{t('handmade')}</h3>
                    <p className="text-sm text-gray-500">{t('handmadeDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary">🏔️</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{t('authentic')}</h3>
                    <p className="text-sm text-gray-500">{t('authenticDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary">🤝</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{t('fairTrade')}</h3>
                    <p className="text-sm text-gray-500">{t('fairTradeDesc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary">🌿</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{t('natural')}</h3>
                    <p className="text-sm text-gray-500">{t('naturalDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative aspect-square rounded overflow-hidden">
              <Image
                src="https://admin.moroccan-carpet.com/wp-content/uploads/2025/07/011-1-1120x800-1.jpg"
                alt="Moroccan artisan"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Custom Design CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 text-white rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-10 md:p-14">
                <span className="text-primary text-sm font-medium uppercase tracking-wider">
                  {t('forDesigners')}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mt-3 mb-6">
                  {t('customTitle')}
                </h2>
                <p className="text-gray-300 mb-8">
                  {t('customDescription')}
                </p>
                <ul className="space-y-3 text-gray-300 mb-8">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> {t('customSize')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> {t('colorMatch')}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span> {t('tradePricing')}
                  </li>
                </ul>
                <a
                  href="mailto:Contact@weberber.com?subject=Custom%20Design%20Inquiry"
                  className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary-600 transition-colors font-medium"
                >
                  {t('inquire')}
                </a>
              </div>
              <div className="relative min-h-[300px] md:min-h-0">
                <Image
                  src="https://admin.moroccan-carpet.com/wp-content/uploads/2025/07/DSC_7333-1-1120x800-1.jpg"
                  alt="Custom design"
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900">
              {t('reviewsTitle')}
            </h2>
            <p className="text-gray-600">
              {t('reviewsSubtitle')}
            </p>
          </div>
          <ReviewsSlider />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded overflow-hidden">
              <Image
                src="https://admin.moroccan-carpet.com/wp-content/uploads/2025/07/DSC_2859-1-1120x800-1.jpg"
                alt="Our workshop"
                fill
                className="object-cover"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="text-primary text-sm font-medium uppercase tracking-wider">
                {t('experienceMorocco')}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mt-3 mb-6 text-gray-900">
                {t('visitTitle')}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t('visitDescription')}
              </p>
              <div className="bg-gray-50 rounded p-6 mb-6">
                <h3 className="font-medium mb-4 text-gray-900">{t('getInTouch')}</h3>
                <div className="space-y-2 text-gray-600 text-sm">
                  <p>📧 <a href="mailto:Contact@weberber.com" className="text-primary hover:underline">Contact@weberber.com</a></p>
                  <p>💬 <a href="https://wa.me/212624219261" className="text-primary hover:underline">+212 624 219 261</a></p>
                  <p>📍 Atlas Mountains, Morocco</p>
                </div>
              </div>
              <Link
                href="/contact"
                className="inline-block bg-primary text-white px-6 py-3 rounded hover:bg-primary-600 transition-colors font-medium"
              >
                {t('contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
