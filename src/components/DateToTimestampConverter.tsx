import React, { useState, useEffect } from 'react'
import { useTimeZone } from '../contexts/TimeZoneContext'
import moment from 'moment-timezone' // 导入 moment-timezone

// 日期转时间戳转换器组件
const DateToTimestampConverter: React.FC = () => {
  // 状态hooks
  const [date, setDate] = useState('') // 日期输入
  const [timestamp, setTimestamp] = useState<number | null>(null) // 转换后的时间戳
  const { timeZone } = useTimeZone() // 从上下文获取时区


  // 当时区变化时重新计算时间戳
  useEffect(() => {
    if (date) {
      convertToTimestamp()
    }
  }, [timeZone, date])

  // 转换日期为时间戳的函数
  const convertToTimestamp = () => {
    if (!date) {
      setTimestamp(null)
      return
    }

    const timestampInTimeZone = moment.tz(date, timeZone).valueOf()
    const timestampInSeconds = Math.floor(timestampInTimeZone / 1000)
    setTimestamp(timestampInSeconds)
  }

  // 格式化日期时间的函数
  const formatDate = (inputTimestamp: number): string => {
    return moment.tz(inputTimestamp * 1000, timeZone).format('YYYY-MM-DD HH:mm:ss')
  }

  // 组件渲染
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">Date to Timestamp Converter</h2>
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
      {timestamp !== null && (
        <div className="bg-white p-2 rounded">
          <strong>Converted Timestamp:</strong> {timestamp}
          <br />
          <strong>Formatted Date and Time:</strong> {formatDate(timestamp)}
        </div>
      )}
    </div>
  )
}

export default DateToTimestampConverter
