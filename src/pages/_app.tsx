import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import { Clock, Globe } from 'lucide-react'
import { TimeZoneProvider, useTimeZone } from '../contexts/TimeZoneContext'
import { timeZones } from '../utils/timeZones'
import React, { useEffect } from 'react'

function NavBar() {
  const { timeZone, setTimeZone } = useTimeZone()

  useEffect(() => {
    const savedTimeZone = localStorage.getItem('selectedTimeZone')
    if (savedTimeZone) {
      setTimeZone(savedTimeZone)
    }
  }, [setTimeZone])

  const handleTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimeZone = e.target.value
    setTimeZone(newTimeZone)
    localStorage.setItem('selectedTimeZone', newTimeZone)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <Link href="https://timestamp.run/" className="flex items-center">
            <img src="/icon/favicon-32x32.png" alt="Timestamp.run icon" className="h-6 w-6 mr-2" />
            <span className="text-xl font-semibold">Timestamp.run</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Globe size={20} className="text-gray-500 mr-2" />
              <select
                value={timeZone}
                onChange={handleTimeZoneChange}
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
            <Link href="/detailed-date-to-timestamp" className="text-gray-700 hover:text-blue-500">Epoch Converter</Link>
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
