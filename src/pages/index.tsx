import Head from 'next/head'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import { TimeZoneProvider } from '../contexts/TimeZoneContext'
import EnhancedTimestampConverter from '../components/EnhancedTimestampConverter'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <Head>
        <link rel="icon" type="image/png" href="/icon/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <title>Timestamp Converter | Timestamp.run</title>
        <meta name="description" content="Convert between timestamps and dates, and view real-time timestamps. Supports multiple time zones and detailed date inputs." />
      </Head>
      <h1 className="text-3xl font-bold mb-6">Unix timestamp to date and datetime to timestamp Converter</h1>
      <h2 className="text-xl font-semibold mb-4">Free unix timestamp and epoch time to date tool. Supports Epoch unix time in seconds and minutes.</h2>
      <EnhancedTimestampConverter />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return { props: {} }
}
