import React, { useState } from 'react'
import { useTimeZone } from '../contexts/TimeZoneContext'

const DateToTimestampConverter: React.FC = () => {
  const [dateInput, setDateInput] = useState('')
  const [convertedTimestamp, setConvertedTimestamp] = useState('')
  const [error, setError] = useState('')
  const { timeZone } = useTimeZone()

  const validateAndConvertDate = () => {
    setError('')
    setConvertedTimestamp('')

    const dateFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/

    if (!dateFormatRegex.test(dateInput)) {
      setError('Invalid date format. Please use YYYY-MM-DD HH:mm:ss')
      return
    }

    try {
      const date = new Date(dateInput)
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date')
      }

      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }

      const formatter = new Intl.DateTimeFormat('en-US', options)
      const parts = formatter.formatToParts(date)
      const dateObject: { [key: string]: string } = {}
      parts.forEach(part => {
        dateObject[part.type] = part.value
      })

      const convertedDate = new Date(
        `${dateObject.year}-${dateObject.month}-${dateObject.day}T${dateObject.hour}:${dateObject.minute}:${dateObject.second}`
      )
      const timestamp = Math.floor(convertedDate.getTime() / 1000)
      setConvertedTimestamp(`${timestamp}`)
    } catch (err) {
      setError('Invalid date. Please enter a valid date and time.')
    }
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Date to Timestamp Converter</h3>
      <div className="mb-2 text-sm text-gray-600">Time Zone: {timeZone}</div>
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={dateInput}
          onChange={(e) => setDateInput(e.target.value)}
          placeholder="Enter date (YYYY-MM-DD HH:mm:ss)"
          className="flex-grow p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={validateAndConvertDate}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mb-2"
      >
        Convert to Timestamp
      </button>
      {error && (
        <div className="text-red-500 mb-2">{error}</div>
      )}
      {convertedTimestamp && (
        <div className="bg-white p-2 rounded">
          <strong>Converted Timestamp:</strong> {convertedTimestamp}
        </div>
      )}
    </div>
  )
}

export default DateToTimestampConverter
