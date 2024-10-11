import React, { useState, useEffect } from 'react'

const DetailedDateToTimestampConverter: React.FC = () => {
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [second, setSecond] = useState('')
  const [timestamp, setTimestamp] = useState('')
  const [futureDates, setFutureDates] = useState<{ days: number; timestamp: number }[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])

  const convertToTimestamp = () => {
    setError('')
    setTimestamp('')
    setFutureDates([])

    const date = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour) || 0,
      parseInt(minute) || 0,
      parseInt(second) || 0
    )

    if (isNaN(date.getTime())) {
      setError('Invalid date. Please check your inputs.')
      return
    }

    const currentTimestamp = Math.floor(date.getTime() / 1000)
    setTimestamp(currentTimestamp.toString())

    const futureDatesList = [100, 200, 365].map(days => {
      const futureDate = new Date(date.getTime() + days * 24 * 60 * 60 * 1000)
      return {
        days,
        timestamp: Math.floor(futureDate.getTime() / 1000)
      }
    })
    setFutureDates(futureDatesList)
  }

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
    const pad = (num: number) => num.toString().padStart(2, '0')
    
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Detailed Date to Timestamp Converter</h3>
      <div className="grid grid-cols-3 gap-2 mb-2">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="Year"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="Month"
          min="1"
          max="12"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder="Day"
          min="1"
          max="31"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
          placeholder="Hour"
          min="0"
          max="23"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={minute}
          onChange={(e) => setMinute(e.target.value)}
          placeholder="Minute"
          min="0"
          max="59"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={second}
          onChange={(e) => setSecond(e.target.value)}
          placeholder="Second"
          min="0"
          max="59"
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <button
        onClick={convertToTimestamp}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mb-2"
      >
        Convert to Timestamp
      </button>
      {error && (
        <div className="text-red-500 mb-2">{error}</div>
      )}
      {timestamp && (
        <div className="bg-white p-2 rounded mb-2">
          <strong>Current Timestamp:</strong> {timestamp} ({formatDate(parseInt(timestamp))})
        </div>
      )}
      {futureDates.map(({ days, timestamp }) => (
        <div key={days} className="bg-white p-2 rounded mb-2">
          <strong>Timestamp after {days} days:</strong> {timestamp} ({formatDate(timestamp)})
        </div>
      ))}
    </div>
  )
}

export default DetailedDateToTimestampConverter