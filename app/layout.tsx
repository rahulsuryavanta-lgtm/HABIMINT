"use client"
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import CookieBanner from '@/components/ui/CookieBanner'
import { Toaster } from "react-hot-toast";
import { AppStore } from '@/stores'
import { Provider } from 'react-redux'
import Header from '@/components/layout/Header'



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
        <script dangerouslySetInnerHTML={{ __html: 'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);' }} />
      </head>
      <body className="antialiased">
        <Provider store={AppStore}>
          {/* <Header /> */}
          <Navbar />
          <main className="min-h-screen overflow-x-hidden w-full">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}