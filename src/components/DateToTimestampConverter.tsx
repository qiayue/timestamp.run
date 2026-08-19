'use client'

import { useMemo, useState } from 'react'
import { useTimeZone } from '@/contexts/TimeZoneContext'
import { formatTimestamp, parseDateInTimeZone } from '@/utils/datetime'

export default function DateToTimestampConverter() {
  const [date, setDate] = useState('')
  const { timeZone } = useTimeZone()

  // Recomputed whenever the input or the selected time zone changes: the same
  // wall-clock time maps to a different instant in each zone.
  const { timestamp, error } = useMemo(() => {
    if (!date.trim()) {
      return { timestamp: null, error: null }
    }

    const parsed = parseDateInTimeZone(date, timeZone)
    if (parsed === null) {
      return { timestamp: null, error: 'Enter a date as YYYY-MM-DD HH:mm:ss' }
    }

    return { timestamp: parsed, error: null }
  }, [date, timeZone])

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">Date to Timestamp Converter</h2>
      <div className="flex items-center mb-2 border border-gray-300 rounded overflow-hidden">
        <div className="bg-gray-200 p-2 text-sm text-gray-600 border-r border-gray-300">
          {timeZone}
        </div>
        <label htmlFor="date-input" className="sr-only">
          Date
        </label>
        <input
          id="date-input"
          type="text"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          placeholder="Enter date (YYYY-MM-DD HH:mm:ss)"
          className="grow p-2"
        />
      </div>
      <button
        type="button"
        onClick={() => setDate((current) => current.trim())}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mb-2"
      >
        Convert to Timestamp
      </button>
      {error && (
        <p className="mb-2 text-red-600" role="alert">
          {error}
        </p>
      )}
      {timestamp !== null && (
        <div className="bg-white p-2 rounded">
          <strong>Converted Timestamp:</strong> {timestamp}
          <br />
          <strong>Formatted Date and Time:</strong>{' '}
          {formatTimestamp(timestamp, timeZone)}
        </div>
      )}
    </div>
  )
}
