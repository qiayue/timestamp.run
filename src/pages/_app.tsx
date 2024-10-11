import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { Clock, Globe } from 'lucide-react'
import { TimeZoneProvider, useTimeZone } from '../contexts/TimeZoneContext'
import { timeZones } from '../utils/timeZones'

function NavBar() {
  const { timeZone, setTimeZone } = useTimeZone()

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-blue-500 mr-2" />
            <span className="text-xl font-semibold">Time Converter</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Globe size={20} className="text-gray-500 mr-2" />
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="p-2 border border-gray-300 rounded"
              >
                {timeZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            <Link href="/" className="text-gray-700 hover:text-blue-500">Realtime</Link>
            <Link href="/timestamp-to-date" className="text-gray-700 hover:text-blue-500">Timestamp to Date</Link>
            <Link href="/date-to-timestamp" className="text-gray-700 hover:text-blue-500">Date to Timestamp</Link>
            <Link href="/detailed-date-to-timestamp" className="text-gray-700 hover:text-blue-500">Detailed Date to Timestamp</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TimeZoneProvider>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <div className="container mx-auto px-6 py-8">
          <Component {...pageProps} />
        </div>
      </div>
    </TimeZoneProvider>
  )
}