import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import NavBar from '@/components/NavBar'
import { TimeZoneProvider } from '@/contexts/TimeZoneContext'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://timestamp.run'),
  title: {
    default: 'Unix timestamp to date converter free online',
    template: '%s',
  },
  icons: {
    icon: [
      { url: '/icon/favicon.ico' },
      { url: '/icon/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [{ url: '/icon/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/icon/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TimeZoneProvider>
          <div className="min-h-screen bg-gray-100">
            <NavBar />
            <div className="container mx-auto px-6 py-8">{children}</div>
          </div>
        </TimeZoneProvider>
        <Script
          defer
          data-domain="timestamp.run"
          src="https://click.pageview.click/js/script.js"
        />
      </body>
    </html>
  )
}
