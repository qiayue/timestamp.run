import React, { useState } from 'react'
import { useTimeZone } from '../contexts/TimeZoneContext'
import { timeZones } from '../utils/timeZones'

const TimestampToDateConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState('')
  const [convertedDates, setConvertedDates] = useState<{ [key: string]: string }>({})
  const { timeZone } = useTimeZone()

  const convertTimestamp = () => {
    const inputTimestamp = parseInt(timestamp.trim())
    if (isNaN(inputTimestamp)) {
      setConvertedDates({ error: 'Invalid timestamp' })
      return
    }

    const date = new Date(inputTimestamp * 1000) // Convert seconds to milliseconds
    const formattedDates = timeZones.reduce((acc, zone) => {
      acc[zone] = formatDate(date, zone)
      return acc
    }, {} as { [key: string]: string })
    setConvertedDates(formattedDates)
  }

  const formatDate = (date: Date, tz: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }
    return new Intl.DateTimeFormat('en-US', options).format(date).replace(/(\d+)\/(\d+)\/(\d+),\s/, '$3-$1-$2 ')
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Timestamp to Date Converter</h3>
      <input
        type="text"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        placeholder="Enter Unix timestamp"
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        onClick={convertTimestamp}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mb-2"
      >
        Convert to Date
      </button>
      {Object.keys(convertedDates).length > 0 && (
        <div className="bg-white p-4 rounded shadow-md">
          <h4 className="text-lg font-semibold mb-3">转换结果：</h4>
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

export default TimestampToDateConverter
