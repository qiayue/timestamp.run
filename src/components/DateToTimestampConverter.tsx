import React, { useState, useEffect } from 'react'
import { useTimeZone } from '../contexts/TimeZoneContext'

// 日期转时间戳转换器组件
const DateToTimestampConverter: React.FC = () => {
  // 状态hooks
  const [date, setDate] = useState('') // 日期输入
  const [timestamp, setTimestamp] = useState<number | null>(null) // 转换后的时间戳
  const { timeZone } = useTimeZone() // 从上下文获取时区

  // 添加这行来打印时区
  console.log('timeZone:', timeZone)

  // 当时区变化时重新计算时间戳
  useEffect(() => {
    if (date) {
      convertToTimestamp()
    }
  }, [timeZone, date])

  // 转换日期为时间戳的函数
  const convertToTimestamp = () => {
    const [datePart, timePart] = date.split(' ')
    if (!datePart || !timePart) {
      setTimestamp(null)
      return
    }

    const [year, month, day] = datePart.split('-').map(Number)
    const [hour, minute, second] = timePart.split(':').map(Number)

    if ([year, month, day, hour, minute, second].some(isNaN)) {
      setTimestamp(null)
      return
    }

    // 创建一个表示输入时间的 Date 对象
    const inputDate = new Date(year, month - 1, day, hour, minute, second)

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

    setTimestamp(Math.floor(utcTime / 1000))
  }

  const getTimezoneOffset = (tzAbbr: string, date: Date): number => {
    const tzOffsets: { [key: string]: number } = {
      'PDT': 420,
      'PST': 480,
      // 添加其他时区缩写和偏移��
    }
    return tzOffsets[tzAbbr] || 0
  }

  // 格式化日期时间的函数
  const formatDate = (inputTimestamp: number): string => {
    const date = new Date(inputTimestamp * 1000)
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
    return new Intl.DateTimeFormat('en-US', options).format(date).replace(/(\d+)\/(\d+)\/(\d+),\s/, '$3-$1-$2 ')
  }

  // 组件渲染
  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">Datetime to timestamp</h2>
      <div className="flex items-center mb-2 border border-gray-300 rounded overflow-hidden">
        <div className="bg-gray-200 p-2 text-sm text-gray-600 border-r border-gray-300">
          {timeZone} {/* 显示当前时区 */}
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
          <br />
          <strong>Formatted Date and Time:</strong> {formatDate(timestamp)}
        </div>
      )}
    </div>
  )
}

export default DateToTimestampConverter
