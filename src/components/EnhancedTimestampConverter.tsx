import React, { useState, useEffect, useCallback } from 'react'
import { Play, Pause, RefreshCw, Globe } from 'lucide-react'
import TimestampToDateConverter from './TimestampToDateConverter'
import DateToTimestampConverter from './DateToTimestampConverter'
import DetailedDateToTimestampConverter from './DetailedDateToTimestampConverter'
import { useTimeZone } from '../contexts/TimeZoneContext'
import { timeZones } from '../utils/timeZones'

const EnhancedTimestampConverter: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(() => new Date())
  const [isRunning, setIsRunning] = useState(false)
  const { timeZone, setTimeZone } = useTimeZone()

  const updateTime = useCallback(() => {
    setCurrentTime(new Date())
  }, [])

  useEffect(() => {
    setIsRunning(true)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning) {
      interval = setInterval(updateTime, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, updateTime])

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

  const getTimestamp = (date: Date): number => {
    return Math.floor(date.getTime() / 1000)
  }

  const handlePauseResume = () => {
    setIsRunning(!isRunning)
  }

  const handleRefresh = () => {
    updateTime()
  }

  return (
    <div className="space-y-4">
      <div className="text-3xl font-bold text-center">{formatTime(currentTime)} ({timeZone})</div>
      <div className="text-xl text-center">Timestamp: {getTimestamp(currentTime)}</div>
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
      <div className="flex items-center justify-center space-x-2">
        <Globe size={24} />
        <select
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          {timeZones.map((zone) => (
            <option key={zone} value={zone}>
              {zone.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>
      <TimestampToDateConverter />
      <DateToTimestampConverter />
      <DetailedDateToTimestampConverter />
    </div>
  )
}

export default EnhancedTimestampConverter