import { GetServerSideProps } from 'next'
import Head from 'next/head'
import TimestampToDateConverterComponent from '@/components/TimestampToDateConverter'
import { timeZones } from '@/utils/timeZones'

interface TimestampPageProps {
  timestamp: string
  convertedDates: { [key: string]: string }
}

export default function TimestampPage({ timestamp, convertedDates }: TimestampPageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Head>
        <title>{`Timestamp ${timestamp} Conversion | Timestamp.run`}</title>
        <meta name="description" content={`Convert Unix timestamp ${timestamp} to human-readable dates across multiple time zones.`} />
      </Head>
      <h1 className="text-3xl font-bold mb-6">Timestamp {timestamp} Conversion</h1>
      <TimestampToDateConverterComponent initialTimestamp={timestamp} initialConvertedDates={convertedDates} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { timestamp } = context.params as { timestamp: string }
  
  const inputTimestamp = parseInt(timestamp)
  if (isNaN(inputTimestamp)) {
    return { notFound: true }
  }

  const date = new Date(inputTimestamp * 1000)
  const convertedDates = timeZones.reduce((acc, zone) => {
    acc[zone] = formatDate(date, zone)
    return acc
  }, {} as { [key: string]: string })

  return {
    props: {
      timestamp,
      convertedDates,
    },
  }
}

function formatDate(date: Date, tz: string): string {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: tz,
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
