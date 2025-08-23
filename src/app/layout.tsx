import type { Metadata } from 'next'
import { Inter, Noto_Sans_Bengali } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Providers } from '@/components/providers/Providers'

const inter = Inter({ subsets: ['latin'] })
const bengali = Noto_Sans_Bengali({ subsets: ['bengali'] })

export const metadata: Metadata = {
  title: 'বাংলাদেশ ফ্যাশন - Premium Clothing Store',
  description: 'Discover the latest trends in traditional and modern clothing. Shop for Saree, Salwar Kameez, Panjabi, and more.',
  keywords: 'Bangladesh, clothing, fashion, traditional wear, Saree, Salwar Kameez, Panjabi, Lungi',
  authors: [{ name: 'Bangladesh Fashion' }],
  openGraph: {
    title: 'বাংলাদেশ ফ্যাশন - Premium Clothing Store',
    description: 'Discover the latest trends in traditional and modern clothing',
    url: 'https://bangladeshfashion.com',
    siteName: 'বাংলাদেশ ফ্যাশন',
    locale: 'bn_BD',
    type: 'website',
  },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className={`${inter.className} ${bengali.className}`}>
        <Providers>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}