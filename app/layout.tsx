import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WEBERBER | Moroccan Handcrafted Excellence',
  description: 'Authentic headless ecommerce experience for weberber.com',
};

// Next.js requires a root layout for global things like the root not-found boundary
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
