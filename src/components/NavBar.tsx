'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Globe } from 'lucide-react'
import { useTimeZone } from '@/contexts/TimeZoneContext'
import { timeZones } from '@/utils/timeZones'

const links = [
  { href: '/', label: 'Realtime' },
  { href: '/timestamp-to-date', label: 'Timestamp to Date' },
  { href: '/date-to-timestamp', label: 'Date to Timestamp' },
  { href: '/detailed-date-to-timestamp', label: 'Epoch Converter' },
]

export default function NavBar() {
  const { timeZone, setTimeZone } = useTimeZone()

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/icon/favicon-32x32.png"
              alt="Timestamp.run icon"
              width={32}
              height={32}
              className="h-6 w-6 mr-2"
            />
            <span className="text-xl font-semibold">Timestamp.run</span>
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <Globe size={20} className="text-gray-500 mr-2" />
              <label htmlFor="timezone" className="sr-only">
                Time zone
              </label>
              <select
                id="timezone"
                value={timeZone}
                onChange={(event) => setTimeZone(event.target.value)}
                className="p-2 border border-gray-300 rounded"
              >
                {timeZones.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 hover:text-blue-500"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
