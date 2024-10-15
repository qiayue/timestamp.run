import React, { useState, useEffect } from 'react'
import { useTimeZone } from '../contexts/TimeZoneContext'

const DateToTimestampConverter: React.FC = () => {
  const [date, setDate] = useState('')
  const [timestamp, setTimestamp] = useState<number | null>(null)
  const { timeZone } = useTimeZone()

  useEffect(() => {
    if (date) {
      convertToTimestamp()
    }
  }, [timeZone])

  const convertToTimestamp = () => {
    const inputDate = new Date(date)
    if (isNaN(inputDate.getTime())) {
      setTimestamp(null)
      return
    }
    setTimestamp(Math.floor(inputDate.getTime() / 1000))
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">Datetime to timestamp</h2>
      <div className="flex items-center mb-2 border border-gray-300 rounded overflow-hidden">
        <div className="bg-gray-200 p-2 text-sm text-gray-600 border-r border-gray-300">
          {timeZone}
        </div>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Enter date (YYYY-MM-DD HH:mm:ss)"
          className="flex-grow p-2"
        />
      </div>
      <button
        onClick={convertToTimestamp}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mb-2"
      >
        Convert to Timestamp
      </button>
      {timestamp && (
        <div className="bg-white p-2 rounded">
          <strong>Converted Timestamp:</strong> {timestamp}
        </div>
      )}
    </div>
  )
}

export default DateToTimestampConverter
