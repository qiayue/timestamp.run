import React from 'react'
import { Helmet } from 'react-helmet'
import DateToTimestampConverterComponent from '../components/DateToTimestampConverter'

const DateToTimestampConverter: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>Date to Timestamp Converter | Timestamp.run</title>
        <meta name="description" content="Convert dates to Unix timestamps. Perfect for developers working with time-based data and calculations." />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Date to Timestamp Converter</h1>
      <DateToTimestampConverterComponent />
      
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="mb-4">
          The Date to Timestamp Converter allows you to input a date and time in the format YYYY-MM-DD HH:MM:SS, 
          and it will convert it to a Unix timestamp. This timestamp represents the number of seconds that have 
          elapsed since January 1, 1970 (midnight UTC/GMT).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Convert any date and time to a Unix timestamp</li>
          <li>Input validation to ensure correct date format</li>
          <li>Instant conversion without page reload</li>
          <li>Support for dates from 1970 onwards</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">What is the correct format for entering dates?</h3>
            <p>Enter dates in the format YYYY-MM-DD HH:MM:SS, for example: 2023-05-15 14:30:00</p>
          </div>
          <div>
            <h3 className="font-semibold">Can I convert dates before 1970?</h3>
            <p>This converter is designed for dates from January 1, 1970 onwards. Dates before 1970 will result in negative timestamps, which are not supported by this tool.</p>
          </div>
          <div>
            <h3 className="font-semibold">What time zone is used for the conversion?</h3>
            <p>The converter assumes all input dates are in UTC (Coordinated Universal Time).</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DateToTimestampConverter