import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { Clock } from 'lucide-react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-xl font-semibold">Time Converter</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-500">Realtime</Link>
              <Link href="/timestamp-to-date" className="text-gray-700 hover:text-blue-500">Timestamp to Date</Link>
              <Link href="/date-to-timestamp" className="text-gray-700 hover:text-blue-500">Date to Timestamp</Link>
              <Link href="/detailed-date-to-timestamp" className="text-gray-700 hover:text-blue-500">Detailed Date to Timestamp</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-6 py-8">
        <Component {...pageProps} />
      </div>
    </div>
  )
}