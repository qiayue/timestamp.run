'use client'

import { useEffect, useMemo, useState } from 'react'
import { Pause, Play, RefreshCw } from 'lucide-react'
import { useTimeZone } from '@/contexts/TimeZoneContext'
import { useIsHydrated } from '@/hooks/useIsHydrated'
import { formatInTimeZone, toUnixSeconds } from '@/utils/datetime'

export default function LiveTimestampDisplay() {
  const isHydrated = useIsHydrated()
  const [tickedTime, setTickedTime] = useState<Date | null>(null)
  const [isRunning, setIsRunning] = useState(true)
  const { timeZone } = useTimeZone()

  // The visitor's clock only exists in the browser, so the first reading waits
  // for hydration; after that the interval takes over.
  const initialTime = useMemo(
    () => (isHydrated ? new Date() : null),
    [isHydrated],
  )
  const currentTime = tickedTime ?? initialTime

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => setTickedTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [isRunning])

  if (!currentTime) {
    return null
  }

  return (
    <div className="space-y-4 bg-blue-100 p-6 rounded-lg shadow-md">
      <div className="text-xl font-bold text-center">
        <span className="text-sm font-normal block mb-1">Current Unix Timestamp:</span>
        {toUnixSeconds(currentTime)}
      </div>
      <div className="text-xl font-bold text-center">
        <span className="text-sm font-normal block mb-1">Current Time ({timeZone}):</span>
        {formatInTimeZone(currentTime, timeZone)}
      </div>
      <div className="flex justify-center space-x-2">
        <button
          type="button"
          onClick={() => setIsRunning((running) => !running)}
          aria-label={isRunning ? 'Pause the clock' : 'Resume the clock'}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          type="button"
          onClick={() => setTickedTime(new Date())}
          aria-label="Refresh the current time"
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          <RefreshCw size={24} />
        </button>
      </div>
    </div>
  )
}
