import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SITE_CONFIG } from '@/lib/constants'
import CookieBanner from '@/components/ui/CookieBanner'

export const metadata = {
  title: 'Habimint — Premium Habit Journals | From Aham to Ananta',
  description: 'Discover Fall Forward and Version 2.0 — premium guided journals by Habimint designed to transform your habits, mindset and life.',
  keywords: 'wellness journal, self-growth, personal development, habit tracker, mindfulness, Indian wellness, Fall Forward, Version 2.0, guided journal, transformation',
  authors: [{ name: SITE_CONFIG.name }],
  icons: {
    icon: '/icon-07.jpg',
    apple: '/icon-07.jpg',
    shortcut: '/icon-07.jpg',
  },
  openGraph: {
    title: 'Habimint — Premium Habit Journals | From Aham to Ananta',
    description: 'Discover Fall Forward and Version 2.0 — premium guided journals by Habimint designed to transform your habits, mindset and life. From Aham to Ananta.',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/icon-07.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/icon-07.jpg" />
        <link rel="shortcut icon" href="/icon-07.jpg" type="image/jpeg" />
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}