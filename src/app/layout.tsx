import type { Metadata } from 'next';
import { Inter, Noto_Sans_Bengali } from 'next/font/google';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const notoSansBengali = Noto_Sans_Bengali({ 
  subsets: ['bengali'],
  variable: '--font-noto-sans-bengali',
});

export const metadata: Metadata = {
  title: 'BanglaFashion - Premium Clothing for Bangladesh',
  description: 'Discover premium clothing for every occasion. From traditional elegance to modern fashion, find your perfect look with Bangladesh\'s finest collection.',
  keywords: 'bangladesh, clothing, fashion, traditional, modern, ecommerce, online shopping',
  authors: [{ name: 'BanglaFashion Team' }],
  creator: 'BanglaFashion',
  publisher: 'BanglaFashion',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bangladeshfashion.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'bn': '/bn',
    },
  },
  openGraph: {
    title: 'BanglaFashion - Premium Clothing for Bangladesh',
    description: 'Discover premium clothing for every occasion. From traditional elegance to modern fashion, find your perfect look with Bangladesh\'s finest collection.',
    url: 'https://bangladeshfashion.com',
    siteName: 'BanglaFashion',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'BanglaFashion - Premium Clothing',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BanglaFashion - Premium Clothing for Bangladesh',
    description: 'Discover premium clothing for every occasion. From traditional elegance to modern fashion, find your perfect look with Bangladesh\'s finest collection.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansBengali.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#0ea5e9" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BanglaFashion" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="BanglaFashion" />
      </head>
      <body className={`${inter.className} antialiased bg-white text-gray-900`}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}