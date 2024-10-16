import React, { useState, useEffect } from 'react'
import { useTimeZone } from '../contexts/TimeZoneContext'
import moment from 'moment-timezone'  // 导入 moment-timezone

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
    const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
    
    const timestamp = moment.tz(dateString, timeZone).valueOf() / 1000
    
    setTimestamp(Math.floor(timestamp))
    calculateFutureDates(Math.floor(timestamp))
  }

  const calculateFutureDates = (currentTimestamp: number) => {
    setFutureDates({
      '100 days later': moment.unix(currentTimestamp).add(100, 'days').unix(),
      '200 days later': moment.unix(currentTimestamp).add(200, 'days').unix(),
      '365 days later': moment.unix(currentTimestamp).add(365, 'days').unix()
    })
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-2xl font-semibold mb-2">Unix timestamp and epoch to date</h3>
      <div className="grid grid-cols-3 gap-4 mb-2">
        <div className="flex items-center">
          <label htmlFor="year" className="mr-2 text-sm font-medium text-gray-700 w-12">Year:</label>
          <input
            id="year"
            type="number"
            value={date.year}
            onChange={(e) => setDate({ ...date, year: parseInt(e.target.value) })}
            placeholder="YYYY"
            className="flex-grow p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="month" className="mr-2 text-sm font-medium text-gray-700 w-14">Month:</label>
          <input
            id="month"
            type="number"
            value={date.month}
            onChange={(e) => setDate({ ...date, month: parseInt(e.target.value) })}
            placeholder="1-12"
            className="flex-grow p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="day" className="mr-2 text-sm font-medium text-gray-700 w-10">Day:</label>
          <input
            id="day"
            type="number"
            value={date.day}
            onChange={(e) => setDate({ ...date, day: parseInt(e.target.value) })}
            placeholder="1-31"
            className="flex-grow p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="hour" className="mr-2 text-sm font-medium text-gray-700 w-12">Hour:</label>
          <input
            id="hour"
            type="number"
            value={date.hour}
            onChange={(e) => setDate({ ...date, hour: parseInt(e.target.value) })}
            placeholder="0-23"
            className="flex-grow p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="minute" className="mr-2 text-sm font-medium text-gray-700 w-12">Minute:</label>
          <input
            id="minute"
            type="number"
            value={date.minute}
            onChange={(e) => setDate({ ...date, minute: parseInt(e.target.value) })}
            placeholder="0-59"
            className="flex-grow p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center">
          <label htmlFor="second" className="mr-2 text-sm font-medium text-gray-700 w-12">Second:</label>
          <input
            id="second"
            type="number"
            value={date.second}
            onChange={(e) => setDate({ ...date, second: parseInt(e.target.value) })}
            placeholder="0-59"
            className="flex-grow p-2 border border-gray-300 rounded"
          />
        </div>
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
