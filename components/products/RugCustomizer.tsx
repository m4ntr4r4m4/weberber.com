'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

const DESIGNS = [
  {
    id: 'beni-ourain',
    nameKey: 'designs.beniOurain' as const,
    renderSVG: (baseColor: string, patternColor: string) => (
      <svg viewBox="0 0 400 600" className="w-full h-full drop-shadow-2xl transition-all duration-300">
        <rect width="400" height="600" rx="10" fill={baseColor} />
        <path d="M 20 0 L 20 -20 M 40 0 L 40 -20 M 60 0 L 60 -20 M 80 0 L 80 -20 M 100 0 L 100 -20 M 120 0 L 120 -20 M 140 0 L 140 -20 M 160 0 L 160 -20 M 180 0 L 180 -20 M 200 0 L 200 -20 M 220 0 L 220 -20 M 240 0 L 240 -20 M 260 0 L 260 -20 M 280 0 L 280 -20 M 300 0 L 300 -20 M 320 0 L 320 -20 M 340 0 L 340 -20 M 360 0 L 360 -20 M 380 0 L 380 -20" stroke={baseColor} strokeWidth="3" />
        <path d="M 20 600 L 20 620 M 40 600 L 40 620 M 60 600 L 60 620 M 80 600 L 80 620 M 100 600 L 100 620 M 120 600 L 120 620 M 140 600 L 140 620 M 160 600 L 160 620 M 180 600 L 180 620 M 200 600 L 200 620 M 220 600 L 220 620 M 240 600 L 240 620 M 260 600 L 260 620 M 280 600 L 280 620 M 300 600 L 300 620 M 320 600 L 320 620 M 340 600 L 340 620 M 360 600 L 360 620 M 380 600 L 380 620" stroke={baseColor} strokeWidth="3" />

        <g stroke={patternColor} strokeWidth="8" fill="none" strokeLinejoin="round">
          <path d="M 200 100 L 300 200 L 200 300 L 100 200 Z" />
          <path d="M 200 300 L 300 400 L 200 500 L 100 400 Z" />
          <path d="M 50 50 L 100 100 M 350 50 L 300 100 M 50 550 L 100 500 M 350 550 L 300 500" strokeWidth="6" />
        </g>
      </svg>
    ),
  },
  {
    id: 'azilal',
    nameKey: 'designs.azilal' as const,
    renderSVG: (baseColor: string, patternColor: string) => (
      <svg viewBox="0 0 400 600" className="w-full h-full drop-shadow-2xl transition-all duration-300">
        <rect width="400" height="600" rx="10" fill={baseColor} />
        <g stroke={patternColor} strokeWidth="12" fill="none" strokeLinecap="round">
          <path d="M 80 100 Q 150 50 200 150 T 320 120" />
          <path d="M 60 250 Q 120 350 250 250 T 350 300" />
          <path d="M 100 450 Q 200 400 250 500 T 340 450" />
          <circle cx="200" cy="350" r="15" fill={patternColor} />
          <circle cx="100" cy="180" r="10" fill={patternColor} />
          <circle cx="300" cy="200" r="12" fill={patternColor} />
        </g>
      </svg>
    ),
  },
  {
    id: 'checkered',
    nameKey: 'designs.checkered' as const,
    renderSVG: (baseColor: string, patternColor: string) => (
      <svg viewBox="0 0 400 600" className="w-full h-full drop-shadow-2xl transition-all duration-300">
        <rect width="400" height="600" rx="10" fill={baseColor} />
        <g fill={patternColor}>
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 4 }).map((_, col) => {
              if ((row + col) % 2 === 0) {
                return <rect key={`${row}-${col}`} x={col * 100} y={row * 100} width="100" height="100" />;
              }
              return null;
            })
          )}
        </g>
      </svg>
    ),
  }
];

const COLORS = [
  { id: 'creamWool', nameKey: 'colors.creamWool' as const, value: '#F5F5DC' },
  { id: 'charcoalBlack', nameKey: 'colors.charcoalBlack' as const, value: '#2C3539' },
  { id: 'terracotta', nameKey: 'colors.terracotta' as const, value: '#E2725B' },
  { id: 'atlasBlue', nameKey: 'colors.atlasBlue' as const, value: '#007FFF' },
  { id: 'saffronYellow', nameKey: 'colors.saffronYellow' as const, value: '#F4C430' },
  { id: 'oliveGreen', nameKey: 'colors.oliveGreen' as const, value: '#808000' },
];

const SIZES = [
  { id: 'small', labelKey: 'sizes.small' as const, priceMultiplier: 1 },
  { id: 'medium', labelKey: 'sizes.medium' as const, priceMultiplier: 1.8 },
  { id: 'large', labelKey: 'sizes.large' as const, priceMultiplier: 2.5 },
  { id: 'xlarge', labelKey: 'sizes.xlarge' as const, priceMultiplier: 3.2 },
];

const BASE_PRICE = 299;

export default function RugCustomizer() {
  const t = useTranslations('customizer');
  const [selectedDesign, setSelectedDesign] = useState(DESIGNS[0]);
  const [baseColor, setBaseColor] = useState(COLORS[0]);
  const [patternColor, setPatternColor] = useState(COLORS[1]);
  const [selectedSize, setSelectedSize] = useState(SIZES[1]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const calculatePrice = () => Math.round(BASE_PRICE * selectedSize.priceMultiplier);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    const cartPayload = {
      attributes: {
        'Custom Design': t(selectedDesign.nameKey),
        'Base Color': t(baseColor.nameKey),
        'Pattern Color': t(patternColor.nameKey),
      },
      quantity: 1,
    };

    console.log('Preparing to send to Shopify Cart API:', cartPayload);

    await new Promise(resolve => setTimeout(resolve, 800));

    alert(t('addedAlert', {
      design: t(selectedDesign.nameKey),
      base: t(baseColor.nameKey),
      pattern: t(patternColor.nameKey),
      size: t(selectedSize.labelKey),
    }));
    setIsAddingToCart(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-600 mt-2">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Left Column: Live Preview */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex items-center justify-center min-h-[500px]">
              <div className="w-full max-w-[300px]">
                {selectedDesign.renderSVG(baseColor.value, patternColor.value)}
              </div>

              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-sm">
                {t('badge100Wool')}
              </div>
              <div className="absolute top-4 right-4 bg-primary/10 px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm">
                {t('badgeLivePreview')}
              </div>
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="lg:col-span-7 bg-white rounded-xl shadow-sm border border-gray-100 p-8">

            {/* Design Selector */}
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">{t('stepPattern')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DESIGNS.map(design => (
                  <button
                    key={design.id}
                    onClick={() => setSelectedDesign(design)}
                    className={`p-4 rounded-lg border-2 text-left transition-all ${
                      selectedDesign.id === design.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-full h-24 mb-3 rounded overflow-hidden opacity-80">
                      {design.renderSVG('#e5e7eb', '#9ca3af')}
                    </div>
                    <span className="block text-sm font-medium text-gray-900">{t(design.nameKey)}</span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="my-8 border-gray-100" />

            {/* Color Selectors */}
            <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Base Color */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 flex justify-between">
                  <span>{t('stepBaseColor')}</span>
                  <span className="text-gray-500 font-normal">{t(baseColor.nameKey)}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map(color => (
                    <button
                      key={`base-${color.id}`}
                      onClick={() => setBaseColor(color)}
                      className={`w-10 h-10 rounded-full border shadow-sm flex items-center justify-center transition-transform hover:scale-110 ${
                        baseColor.id === color.id ? 'ring-2 ring-offset-2 ring-primary border-transparent' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={t(color.nameKey)}
                      aria-label={t('selectBaseColorAria', { color: t(color.nameKey) })}
                    >
                      {baseColor.id === color.id && (
                        <Check size={16} className={color.value === '#F5F5DC' || color.value === '#F4C430' ? 'text-gray-900' : 'text-white'} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pattern Color */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4 flex justify-between">
                  <span>{t('stepPatternColor')}</span>
                  <span className="text-gray-500 font-normal">{t(patternColor.nameKey)}</span>
                </h3>
                <div className="flex flex-wrap gap-3">
                  {COLORS.map(color => (
                    <button
                      key={`pattern-${color.id}`}
                      onClick={() => setPatternColor(color)}
                      className={`w-10 h-10 rounded-full border shadow-sm flex items-center justify-center transition-transform hover:scale-110 ${
                        patternColor.id === color.id ? 'ring-2 ring-offset-2 ring-primary border-transparent' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={t(color.nameKey)}
                      aria-label={t('selectPatternColorAria', { color: t(color.nameKey) })}
                    >
                      {patternColor.id === color.id && (
                        <Check size={16} className={color.value === '#F5F5DC' || color.value === '#F4C430' ? 'text-gray-900' : 'text-white'} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <hr className="my-8 border-gray-100" />

            {/* Size Selector */}
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-4">{t('stepSize')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SIZES.map(size => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-3 text-sm rounded-lg border flex justify-between items-center transition-all ${
                      selectedSize.id === size.id
                        ? 'border-primary bg-primary/5 font-semibold text-primary'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <span>{t(size.labelKey)}</span>
                    <span className="text-xs">+€{Math.round(BASE_PRICE * size.priceMultiplier) - BASE_PRICE}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Footer */}
            <div className="bg-gray-50 -mx-8 -mb-8 p-8 rounded-b-xl border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">{t('totalLabel')}</p>
                <p className="text-3xl font-serif font-bold text-gray-900">€{calculatePrice()}</p>
                <p className="text-xs text-green-600 mt-1 font-medium">{t('freeShipping')}</p>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-full md:w-auto px-8 py-4 bg-primary text-white font-medium rounded-lg shadow-md hover:bg-primary-600 transition-colors flex items-center justify-center gap-2 ${
                  isAddingToCart ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isAddingToCart ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t('saving')}
                  </>
                ) : (
                  t('addToCart')
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
