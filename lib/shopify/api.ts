/**
 * Shopify Admin REST API Integration
 * Note: These calls MUST ONLY be made from Server Components or API Routes.
 */

const SHOPIFY_DOMAIN = process.env.SHOPIFY_DOMAIN; // e.g., 'weberber.myshopify.com'
const SHOPIFY_ADMIN_ACCESS_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const API_VERSION = '2024-01'; // Use a recent stable version

export async function fetchShopifyREST(endpoint: string, options: RequestInit = {}) {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_ADMIN_ACCESS_TOKEN) {
    throw new Error('Shopify environment variables are not configured.');
  }

  const url = `https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}/${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    'X-Shopify-Access-Token': SHOPIFY_ADMIN_ACCESS_TOKEN,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`Shopify REST API Error: ${response.status} ${response.statusText}`, errorBody);
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getProducts() {
  const data = await fetchShopifyREST('products.json?status=active');
  return data.products;
}

export async function getProduct(id: string) {
  const data = await fetchShopifyREST(`products/${id}.json`);
  return data.product;
}

export async function getCollections() {
  const data = await fetchShopifyREST('custom_collections.json');
  return data.custom_collections;
}
