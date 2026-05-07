import RugCustomizer from '@/components/products/RugCustomizer';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'custom' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
  };
}

export default function CustomRugPage() {
  return (
    <main className="min-h-screen bg-white">
      <RugCustomizer />
    </main>
  );
}
