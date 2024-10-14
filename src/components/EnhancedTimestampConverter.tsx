import React from 'react'
import dynamic from 'next/dynamic'
import TimestampToDateConverter from './TimestampToDateConverter'
import DateToTimestampConverter from './DateToTimestampConverter'
import DetailedDateToTimestampConverter from './DetailedDateToTimestampConverter'
import RealtimeConverter from './RealtimeConverter'

const LiveTimestampDisplay = dynamic(() => import('./LiveTimestampDisplay'), { ssr: false })

const EnhancedTimestampConverter: React.FC = () => {
  return (
    <div className="space-y-4">
      <LiveTimestampDisplay />
      <TimestampToDateConverter />
      <DateToTimestampConverter />
      <DetailedDateToTimestampConverter />
      <RealtimeConverter />
    </div>
  )
}

export default EnhancedTimestampConverter
