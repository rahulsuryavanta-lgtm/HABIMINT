import './globals.css'
import { SITE_CONFIG } from '@/lib/constants/constants'


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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: 'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);' }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}