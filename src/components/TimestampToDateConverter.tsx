'use client'

import { useMemo, useState } from 'react'
import { useTimeZone } from '@/contexts/TimeZoneContext'
import { formatTimestamp } from '@/utils/datetime'
import { timeZones } from '@/utils/timeZones'

type TimestampToDateConverterProps = {
  initialTimestamp?: string
}

export default function TimestampToDateConverter({
  initialTimestamp = '',
}: TimestampToDateConverterProps) {
  const [timestamp, setTimestamp] = useState(initialTimestamp)
  const { timeZone } = useTimeZone()

  // Purely derived from the input and the selected zone, so it is computed
  // during render rather than synced through an effect.
  const { convertedDates, error } = useMemo(() => {
    const trimmed = timestamp.trim()
    if (!trimmed) {
      return { convertedDates: {}, error: null }
    }

    const parsed = Number(trimmed)
    if (!Number.isFinite(parsed)) {
      return { convertedDates: {}, error: 'Invalid timestamp' }
    }

    return {
      convertedDates: Object.fromEntries(
        timeZones.map((zone) => [zone, formatTimestamp(parsed, zone)]),
      ),
      error: null,
    }
  }, [timestamp])

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">Convert Epoch time to date</h2>
      <label htmlFor="timestamp-input" className="sr-only">
        Unix timestamp
      </label>
      <input
        id="timestamp-input"
        type="text"
        inputMode="numeric"
        value={timestamp}
        onChange={(event) => setTimestamp(event.target.value)}
        placeholder="Enter Unix timestamp"
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        type="button"
        onClick={() => setTimestamp((current) => current.trim())}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mb-2"
      >
        Convert to Date
      </button>
      {error && (
        <p className="mb-2 text-red-600" role="alert">
          {error}
        </p>
      )}
      {Object.keys(convertedDates).length > 0 && (
        <div className="bg-white p-4 rounded shadow-md">
          <h4 className="text-lg font-semibold mb-3">Conversion Results:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(convertedDates).map(([zone, date]) => (
              <div
                key={zone}
                className={`p-3 rounded-lg transition-colors ${
                  zone === timeZone
                    ? 'bg-blue-100 border-2 border-blue-300'
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className="font-semibold text-gray-700 mb-1">{zone}</div>
                <div className="text-sm text-gray-600">{date}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
