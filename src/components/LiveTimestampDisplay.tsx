import React, { useState, useEffect, useCallback } from 'react'
import { Play, Pause, RefreshCw } from 'lucide-react'
import { useTimeZone } from '../contexts/TimeZoneContext'

// 实时时间戳显示组件
const LiveTimestampDisplay: React.FC = () => {
  // 状态管理：当前时间、是否运行、时区
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  const [isRunning, setIsRunning] = useState(true)
  const { timeZone } = useTimeZone()

  // 更新时间的回调函数
  const updateTime = useCallback(() => {
    setCurrentTime(new Date())
  }, [])

  // 副作用：设置和清理定时器
  useEffect(() => {
    updateTime()
    let interval: NodeJS.Timeout | null = null
    if (isRunning) {
      interval = setInterval(updateTime, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, updateTime])

  // 格式化时间函数
  const formatTime = (date: Date): string => {
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

  // 获取时间戳函数
  const getTimestamp = (date: Date): number => {
    return Math.floor(date.getTime() / 1000)
  }

  // 暂停/恢复处理函数
  const handlePauseResume = () => {
    setIsRunning(!isRunning)
  }

  // 刷新处理函数
  const handleRefresh = () => {
    updateTime()
  }

  // 如果当前时间为空，不渲染任何内容
  if (!currentTime) {
    return null
  }

  // 渲染组件
  return (
    <div className="space-y-4 bg-blue-100 p-6 rounded-lg shadow-md">
      <div className="text-xl font-bold text-center">
        <span className="text-sm font-normal block mb-1">Current Unix Timestamp:</span>
        {getTimestamp(currentTime)}
      </div>
      <div className="text-xl font-bold text-center">
        <span className="text-sm font-normal block mb-1">Current Time ({timeZone}):</span>
        {formatTime(currentTime)}
      </div>
      <div className="flex justify-center space-x-2">
        <button
          onClick={handlePauseResume}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={handleRefresh}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          <RefreshCw size={24} />
        </button>
      </div>
    </div>
  )
}

export default LiveTimestampDisplay
