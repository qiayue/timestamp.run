import React, { useState, useEffect, useCallback } from 'react'
import { Play, Pause, RefreshCw, Globe } from 'lucide-react'
import TimestampToDateConverter from './TimestampToDateConverter'
import DateToTimestampConverter from './DateToTimestampConverter'
import DetailedDateToTimestampConverter from './DetailedDateToTimestampConverter'

interface EnhancedTimestampConverterProps {
  defaultTimeZone: string;
}

const timeZones = [
  'UTC',
  'America/New_York',
  'America/Los_Angeles',
  'America/Chicago',
  'America/Toronto',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Moscow',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Dubai',
  'Asia/Singapore',
  'Australia/Sydney',
  'Australia/Melbourne',
  'Pacific/Auckland',
  'Africa/Cairo',
  'Africa/Johannesburg',
  'America/Sao_Paulo',
  'Atlantic/Reykjavik'
]

const EnhancedTimestampConverter: React.FC<EnhancedTimestampConverterProps> = ({ defaultTimeZone }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isRunning, setIsRunning] = useState(true)
  const [selectedTimeZone, setSelectedTimeZone] = useState(defaultTimeZone)

  const updateTime = useCallback(() => {
    setCurrentTime(new Date())
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
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: selectedTimeZone
    };
    return date.toLocaleString('en-US', options)
      .replace(/(\d+)\/(\d+)\/(\d+),/, '$3-$1-$2')
      .replace(/,/, '');
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
      <div className="text-3xl font-bold text-center">{formatTime(currentTime)}</div>
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
          value={selectedTimeZone}
          onChange={(e) => setSelectedTimeZone(e.target.value)}
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