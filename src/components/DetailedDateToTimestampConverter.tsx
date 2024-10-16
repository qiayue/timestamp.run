import React, { useState, useEffect } from 'react'
import { useTimeZone } from '../contexts/TimeZoneContext'

const DetailedDateToTimestampConverter: React.FC = () => {
  const { timeZone } = useTimeZone()
  const now = new Date()
  const [date, setDate] = useState({
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours(),
    minute: now.getMinutes(),
    second: now.getSeconds()
  })
  const [timestamp, setTimestamp] = useState<number | null>(null)
  const [futureDates, setFutureDates] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    convertToTimestamp()
  }, [date, timeZone])

  const convertToTimestamp = () => {
    const { year, month, day, hour, minute, second } = date
    const inputDate = new Date(year, month - 1, day, hour, minute, second)

    if (isNaN(inputDate.getTime())) {
      setTimestamp(null)
      setFutureDates({})
      return
    }

    // 获取时区偏移（分钟）
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'short'
    })
    const tzMatch = formatter.format(inputDate).match(/\s([A-Z]+)$/)
    const tzAbbr = tzMatch ? tzMatch[1] : ''
    const tzOffset = getTimezoneOffset(tzAbbr, inputDate)

    // 计算 UTC 时间
    const utcTime = inputDate.getTime() + tzOffset * 60 * 1000
    const currentTimestamp = Math.floor(utcTime / 1000)

    setTimestamp(currentTimestamp)
    calculateFutureDates(currentTimestamp)
  }

  const getTimezoneOffset = (tzAbbr: string, date: Date): number => {
    const tzOffsets: { [key: string]: number } = {
      'PDT': 420,
      'PST': 480,
      // 添加其他时区缩写和偏移量
    }
    return tzOffsets[tzAbbr] || 0
  }

  const calculateFutureDates = (currentTimestamp: number) => {
    // 计算未来时间戳
    const future100Days = new Date(currentTimestamp * 1000 + 100 * 24 * 60 * 60 * 1000)
    const future200Days = new Date(currentTimestamp * 1000 + 200 * 24 * 60 * 60 * 1000)
    const future365Days = new Date(currentTimestamp * 1000 + 365 * 24 * 60 * 60 * 1000)

    setFutureDates({
      '100 days later': Math.floor(future100Days.getTime() / 1000),
      '200 days later': Math.floor(future200Days.getTime() / 1000),
      '365 days later': Math.floor(future365Days.getTime() / 1000)
    })
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-2xl font-semibold mb-2">Unix timestamp and epoch to date</h3>
      <div className="grid grid-cols-3 gap-2 mb-2">
        <input
          type="number"
          value={date.year}
          onChange={(e) => setDate({ ...date, year: parseInt(e.target.value) })}
          placeholder="Year"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={date.month}
          onChange={(e) => setDate({ ...date, month: parseInt(e.target.value) })}
          placeholder="Month (1-12)"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={date.day}
          onChange={(e) => setDate({ ...date, day: parseInt(e.target.value) })}
          placeholder="Day (1-31)"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={date.hour}
          onChange={(e) => setDate({ ...date, hour: parseInt(e.target.value) })}
          placeholder="Hour (0-23)"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={date.minute}
          onChange={(e) => setDate({ ...date, minute: parseInt(e.target.value) })}
          placeholder="Minute (0-59)"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={date.second}
          onChange={(e) => setDate({ ...date, second: parseInt(e.target.value) })}
          placeholder="Second (0-59)"
          className="p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-2 text-sm text-gray-600">
        Time Zone: {timeZone} (All inputs are treated as {timeZone})
      </div>
      <button
        onClick={convertToTimestamp}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mb-2"
      >
        Convert to Timestamp
      </button>
      {timestamp && (
        <div className="bg-white p-2 rounded whitespace-pre-wrap">
          <strong>Converted Timestamp:</strong>
          <br />
          {timestamp}
        </div>
      )}
      {Object.keys(futureDates).length > 0 && (
        <div className="bg-white p-2 rounded whitespace-pre-wrap">
          <strong>Future Dates:</strong>
          <br />
          {Object.keys(futureDates).map((key, index) => (
            <div key={index}>
              {key}: {futureDates[key]}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DetailedDateToTimestampConverter
