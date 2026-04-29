import RugCustomizer from '@/components/products/RugCustomizer';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'nav' });

  return {
    title: `Design Your Own Moroccan Rug | WEBERBER`,
    description: 'Customize your authentic Moroccan rug. Choose patterns, colors, and sizes. Handwoven in the Atlas Mountains.',
  };
}

export default function CustomRugPage() {
  return (
    <main className="min-h-screen bg-white">
      <RugCustomizer />
    </main>
  );
}
