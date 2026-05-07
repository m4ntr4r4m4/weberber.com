/**
 * Single source of truth for the storefront's category taxonomy.
 *
 * Each top-level slug maps 1-to-1 to a Shopify collection handle of the same name.
 * Subcategory slugs likewise map to Shopify collection handles. If a Shopify
 * collection doesn't exist (yet) for a given slug, the corresponding page
 * renders the editorial "coming soon — visit the Madrid showroom" empty state.
 *
 * Display strings come from translations: `categories.{slug}.name`,
 * `categories.{slug}.subs.{slug}`, etc. Adding a category means: add it here,
 * add its translation keys, create the matching Shopify collection.
 */

export interface SubCategory {
  slug: string;
  /** key under `categories.{parentSlug}.subs.{slug}` */
  nameKey: string;
}

export interface Category {
  slug: string;
  /** key under `categories.{slug}` for the eyebrow / sub-label */
  eyebrowKey: string;
  /** key under `categories.{slug}.name` */
  nameKey: string;
  /** Hero image used on category landing + home grid. CDN-hosted. */
  heroImg: string;
  /** Whether to span 2 columns on the home grid. */
  span2?: boolean;
  subs: SubCategory[];
}

export const CATEGORIES: Category[] = [
  {
    slug: 'rugs',
    nameKey: 'name',
    eyebrowKey: 'eyebrow',
    heroImg: 'https://admin.moroccan-carpet.com/wp-content/uploads/2024/08/DSC4382-1-edited.jpg',
    span2: true,
    subs: [
      { slug: 'beni-ourain', nameKey: 'beniOurain' },
      { slug: 'azilal', nameKey: 'azilal' },
      { slug: 'boujad', nameKey: 'boujad' },
      { slug: 'kilim', nameKey: 'kilim' },
      { slug: 'vintage', nameKey: 'vintage' },
      { slug: 'custom', nameKey: 'custom' },
    ],
  },
  {
    slug: 'pottery',
    nameKey: 'name',
    eyebrowKey: 'eyebrow',
    heroImg: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80',
    subs: [
      { slug: 'tamegroute', nameKey: 'tamegroute' },
      { slug: 'safi', nameKey: 'safi' },
      { slug: 'fez', nameKey: 'fez' },
      { slug: 'tadelakt', nameKey: 'tadelakt' },
      { slug: 'planters', nameKey: 'planters' },
    ],
  },
  {
    slug: 'textiles',
    nameKey: 'name',
    eyebrowKey: 'eyebrow',
    heroImg: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80',
    subs: [
      { slug: 'kilim-cushions', nameKey: 'kilimCushions' },
      { slug: 'wool-cushions', nameKey: 'woolCushions' },
      { slug: 'sabra-silk', nameKey: 'sabraSilk' },
      { slug: 'throws', nameKey: 'throws' },
    ],
  },
  {
    slug: 'light',
    nameKey: 'name',
    eyebrowKey: 'eyebrow',
    heroImg: 'https://admin.moroccan-carpet.com/wp-content/uploads/2025/07/DSC_7333-1-1120x800-1.jpg',
    subs: [
      { slug: 'scented-candles', nameKey: 'scentedCandles' },
      { slug: 'beeswax', nameKey: 'beeswax' },
      { slug: 'brass-lamps', nameKey: 'brassLamps' },
      { slug: 'lanterns', nameKey: 'lanterns' },
      { slug: 'holders', nameKey: 'holders' },
    ],
  },
  {
    slug: 'wood',
    nameKey: 'name',
    eyebrowKey: 'eyebrow',
    heroImg: 'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?auto=format&fit=crop&q=80',
    subs: [
      { slug: 'bowls', nameKey: 'bowls' },
      { slug: 'boxes', nameKey: 'boxes' },
      { slug: 'sculpture', nameKey: 'sculpture' },
      { slug: 'boards', nameKey: 'boards' },
    ],
  },
  {
    slug: 'apothecary',
    nameKey: 'name',
    eyebrowKey: 'eyebrow',
    heroImg: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80',
    subs: [
      { slug: 'argan-culinary', nameKey: 'arganCulinary' },
      { slug: 'argan-cosmetic', nameKey: 'arganCosmetic' },
      { slug: 'soaps', nameKey: 'soaps' },
      { slug: 'gift-sets', nameKey: 'giftSets' },
    ],
  },
];

export const CATEGORY_SLUGS = CATEGORIES.map((c) => c.slug);

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
