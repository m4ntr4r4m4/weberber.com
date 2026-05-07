# Project Notes & Architecture Decisions

## Architecture
- **Headless E-commerce Approach**: We are using Option 1 (Next.js for Presentation, Shopify for Data). 
  - **Static Pages**: All static pages (e.g., About Us, Contact, FAQ) will be built directly in Next.js to maintain the Weberber Design System, ensure high performance, and unify the i18n routing.
  - **Shopify API**: Shopify is strictly used as the data engine (handling products, inventory, cart, and checkout).

## Company Information
- **Operation Office & Showroom**: Calle de Ruiz 22, Madrid
- **Default Language**: Spanish (`es`)
- **Supported Translations**: English (`en`)
