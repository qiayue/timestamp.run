import React, { useState } from 'react'

const TimestampToDateConverter: React.FC = () => {
  const [timestamp, setTimestamp] = useState('')
  const [convertedDate, setConvertedDate] = useState('')

  const convertTimestamp = () => {
    const inputTimestamp = parseInt(timestamp.trim())
    if (isNaN(inputTimestamp)) {
      setConvertedDate('Invalid timestamp')
      return
    }

    const date = new Date(inputTimestamp * 1000) // Convert seconds to milliseconds
    const formattedDate = formatDate(date)
    setConvertedDate(formattedDate)
  }

  const formatDate = (date: Date): string => {
    const pad = (num: number) => num.toString().padStart(2, '0')
    
    const year = date.getFullYear()
    const month = pad(date.getMonth() + 1)
    const day = pad(date.getDate())
    const hours = pad(date.getHours())
    const minutes = pad(date.getMinutes())
    const seconds = pad(date.getSeconds())

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
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
      {convertedDate && (
        <div className="bg-white p-2 rounded">
          <strong>Converted Date:</strong> {convertedDate}
        </div>
      )}
    </div>
  )
}

export default TimestampToDateConverter