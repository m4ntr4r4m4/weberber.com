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
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

// Export font classNames so the locale layout can apply them to <html>
export { inter, playfair };

// Next.js requires a root layout for global things like the root not-found boundary
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
