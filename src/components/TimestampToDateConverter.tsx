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
      setConvertedDates({ error: '无效的时间戳' })
      return
    }

    const date = new Date(inputTimestamp * 1000) // 将秒转换为毫秒
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
      <h3 className="text-lg font-semibold mb-2">时间戳转日期转换器</h3>
      <input
        type="text"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
        placeholder="输入 Unix 时间戳"
        className="w-full p-2 border border-gray-300 rounded mb-2"
      />
      <button
        onClick={convertTimestamp}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mb-2"
      >
        转换为日期
      </button>
      {Object.keys(convertedDates).length > 0 && (
        <div className="bg-white p-2 rounded">
          <strong>转换后的日期：</strong>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
            {Object.entries(convertedDates).map(([zone, date]) => (
              <div key={zone} className={`p-2 ${zone === timeZone ? 'bg-blue-100' : ''}`}>
                <span className="font-semibold">{zone}:</span> {date}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default TimestampToDateConverter