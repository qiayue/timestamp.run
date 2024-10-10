import React, { useState } from 'react'

const DateToTimestampConverter: React.FC = () => {
  const [dateInput, setDateInput] = useState('')
  const [convertedTimestamp, setConvertedTimestamp] = useState('')
  const [error, setError] = useState('')

  const validateAndConvertDate = () => {
    setError('')
    setConvertedTimestamp('')

    // Regular expression to match YYYY-MM-DD HH:mm:ss format
    const dateFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/

    if (!dateFormatRegex.test(dateInput)) {
      setError('Invalid date format. Please use YYYY-MM-DD HH:mm:ss')
      return
    }

    const date = new Date(dateInput)

    if (isNaN(date.getTime())) {
      setError('Invalid date. Please enter a valid date and time.')
      return
    }

    const timestamp = Math.floor(date.getTime() / 1000)
    setConvertedTimestamp(timestamp.toString())
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Date to Timestamp Converter</h3>
      <input
        type="text"
        value={dateInput}
        onChange={(e) => setDateInput(e.target.value)}
        placeholder="Enter date (YYYY-MM-DD HH:mm:ss)"
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
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