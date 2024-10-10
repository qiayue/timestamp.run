import React from 'react'
import { Helmet } from 'react-helmet'
import EnhancedTimestampConverter from '../components/EnhancedTimestampConverter'

const RealtimeConverter: React.FC = () => {
  // 获取当前时区
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>Realtime Timestamp Converter | Time Converter</title>
        <meta name="description" content="Convert between current time and Unix timestamp in real-time. Features multiple time zones and live updates." />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">实时时间戳转换器</h1>
      <EnhancedTimestampConverter defaultTimeZone={currentTimeZone} />
      
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="mb-4">
          The Realtime Timestamp Converter provides a live view of the current time and its corresponding Unix timestamp. 
          It updates every second, allowing you to see the timestamp change in real-time. You can also pause, resume, 
          and manually refresh the time.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Live updating current time and timestamp</li>
          <li>Multiple time zone support</li>
          <li>Pause and resume functionality</li>
          <li>Manual refresh option</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">What is a Unix timestamp?</h3>
            <p>A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT).</p>
          </div>
          <div>
            <h3 className="font-semibold">Why does the timestamp change every second?</h3>
            <p>The timestamp increments every second because it represents the current time in seconds since the Unix epoch.</p>
          </div>
          <div>
            <h3 className="font-semibold">Can I use this converter for different time zones?</h3>
            <p>Yes, you can select different time zones from the dropdown menu to see the current time in various locations.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RealtimeConverter