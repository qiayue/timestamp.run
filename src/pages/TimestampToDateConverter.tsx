import React from 'react'
import { Helmet } from 'react-helmet'
import TimestampToDateConverterComponent from '../components/TimestampToDateConverter'

const TimestampToDateConverter: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>Timestamp to Date Converter | Timestamp.run</title>
        <meta name="description" content="Convert Unix timestamps to human-readable dates. Easy-to-use tool for developers and time management." />
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Timestamp to Date Converter</h1>
      <TimestampToDateConverterComponent />
      
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <p className="mb-4">
          The Timestamp to Date Converter takes a Unix timestamp (a number representing seconds since January 1, 1970) 
          and converts it into a human-readable date and time. Simply enter the timestamp, click the convert button, 
          and see the result instantly.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Convert Unix timestamps to readable dates</li>
          <li>Supports both positive and negative timestamps</li>
          <li>Instant conversion with no page reload</li>
          <li>Clear and user-friendly interface</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">What format is the converted date in?</h3>
            <p>The converted date is displayed in the format: YYYY-MM-DD HH:MM:SS.</p>
          </div>
          <div>
            <h3 className="font-semibold">Can I convert timestamps from before 1970?</h3>
            <p>Yes, you can convert negative timestamps, which represent dates before January 1, 1970.</p>
          </div>
          <div>
            <h3 className="font-semibold">What time zone is used for the conversion?</h3>
            <p>The converter uses UTC (Coordinated Universal Time) for all conversions.</p>
          </div>
        </div>
      </section>
      <script defer data-domain="timestamp.run" src="https://click.pageview.click/js/script.js"></script>
    </div>
  )
}

export default TimestampToDateConverter