import React, { useState, useEffect } from 'react'
import { useTimeZone } from '../contexts/TimeZoneContext'

const DetailedDateToTimestampConverter: React.FC = () => {
  // 使用上下文获取时区
  const { timeZone } = useTimeZone()
  
  // 使用状态钩子管理表单输入和结果
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [second, setSecond] = useState('')
  const [timestamp, setTimestamp] = useState('')
  const [futureDates, setFutureDates] = useState<{ days: number; timestamp: number }[]>([])
  const [error, setError] = useState('')

  // 组件加载时设置年份为当前年
  useEffect(() => {
    setYear(new Date().getFullYear().toString())
  }, [])

  // 将输入的日期转换为时间戳
  const convertToTimestamp = () => {
    setError('')
    setTimestamp('')
    setFutureDates([])

    const inputDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour) || 0,
      parseInt(minute) || 0,
      parseInt(second) || 0
    )

    if (isNaN(inputDate.getTime())) {
      setError('Invalid date. Please check your input.')
      return
    }

    // 创建一个带有时区的日期对象
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
    const dateString = new Intl.DateTimeFormat('en-US', options).format(inputDate)
    const zonedDate = new Date(dateString)

    // 计算当前时间戳和未来日期的时间戳
    const currentTimestamp = Math.floor(zonedDate.getTime() / 1000)
    setTimestamp(currentTimestamp.toString())

    // 计算未来100天、200天和365天的时间戳
    const futureDatesList = [100, 200, 365].map(days => {
      const futureDate = new Date(zonedDate.getTime() + days * 24 * 60 * 60 * 1000)
      return {
        days,
        timestamp: Math.floor(futureDate.getTime() / 1000)
      }
    })
    setFutureDates(futureDatesList)
  }

  // 格式化日期显示
  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000)
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
    return `${new Intl.DateTimeFormat('en-US', options).format(date).replace(/(\d+)\/(\d+)\/(\d+),\s/, '$3-$1-$2 ')} (${timeZone})`
  }

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Detailed Date to Timestamp Converter</h3>
      {/* 显示当前时区 */}
      <div className="mb-2 text-sm text-gray-600">{timeZone}</div>
      
      {/* 日期输入表单 */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {/* 年、月、日、时、分、秒输入框 */}
        <div className="flex items-center">
          <span className="mr-2 text-sm">Year:</span>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            className="p-2 border border-gray-300 rounded flex-grow"
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm">Month:</span>
          <input
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            placeholder="Month"
            min="1"
            max="12"
            className="p-2 border border-gray-300 rounded flex-grow"
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm">Day:</span>
          <input
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            placeholder="Day"
            min="1"
            max="31"
            className="p-2 border border-gray-300 rounded flex-grow"
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm">Hour:</span>
          <input
            type="number"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            placeholder="Hour"
            min="0"
            max="23"
            className="p-2 border border-gray-300 rounded flex-grow"
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm">Minute:</span>
          <input
            type="number"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            placeholder="Minute"
            min="0"
            max="59"
            className="p-2 border border-gray-300 rounded flex-grow"
          />
        </div>
        <div className="flex items-center">
          <span className="mr-2 text-sm">Second:</span>
          <input
            type="number"
            value={second}
            onChange={(e) => setSecond(e.target.value)}
            placeholder="Second"
            min="0"
            max="59"
            className="p-2 border border-gray-300 rounded flex-grow"
          />
        </div>
      </div>

      {/* 转换按钮 */}
      <button
        onClick={convertToTimestamp}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mb-2"
      >
        Convert to Timestamp
      </button>

      {/* 显示错误信息 */}
      {error && (
        <div className="text-red-500 mb-2">{error}</div>
      )}

      {/* 显示当前时间戳 */}
      {timestamp && (
        <div className="bg-white p-2 rounded mb-2">
          <strong>Current Timestamp:</strong> {timestamp} ({formatDate(parseInt(timestamp))})
        </div>
      )}

      {/* 显示未来日期的时间戳 */}
      {futureDates.map(({ days, timestamp }) => (
        <div key={days} className="bg-white p-2 rounded mb-2">
          <strong>Timestamp after {days} days:</strong> {timestamp} ({formatDate(timestamp)})
        </div>
      ))}
    </div>
  )
}

export default DetailedDateToTimestampConverter
