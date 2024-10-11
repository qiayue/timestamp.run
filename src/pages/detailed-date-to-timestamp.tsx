import Head from 'next/head'
import DetailedDateToTimestampConverterComponent from '@/components/DetailedDateToTimestampConverter'

export default function DetailedDateToTimestampConverter() {
  return (
    <div className="max-w-4xl mx-auto">
      <Head>
        <title>Detailed Date to Timestamp Converter | Time Converter</title>
        <meta name="description" content="Convert detailed date and time to Unix timestamps with future date calculations. Ideal for precise time-based operations and planning." />
      </Head>
      <h1 className="text-3xl font-bold mb-6">Detailed Date to Timestamp Converter</h1>
      <DetailedDateToTimestampConverterComponent />
      
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="mb-4">
          The Detailed Date to Timestamp Converter allows you to input a date and time using separate fields for year, 
          month, day, hour, minute, and second. It then converts this detailed input into a Unix timestamp and provides 
          additional timestamps for future dates (100 days, 200 days, and 365 days later).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Separate input fields for each date and time component</li>
          <li>Conversion to Unix timestamp</li>
          <li>Automatic calculation of future timestamps</li>
          <li>Input validation to ensure correct date and time values</li>
          <li>Default current year for easier input</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Why is the year field pre-filled?</h3>
            <p>The year field is pre-filled with the current year for convenience, but you can change it if needed.</p>
          </div>
          <div>
            <h3 className="font-semibold">What are the future timestamps used for?</h3>
            <p>The future timestamps (100 days, 200 days, 365 days later) can be useful for planning, scheduling, or calculating expiration dates.</p>
          </div>
          <div>
            <h3 className="font-semibold">Can I leave some fields blank?</h3>
            <p>Yes, if you leave hour, minute, or second fields blank, they will default to 0. However, year, month, and day are required for accurate conversion.</p>
          </div>
        </div>
      </section>
    </div>
  )
}