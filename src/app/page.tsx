import type { Metadata } from 'next'
import EnhancedTimestampConverter from '@/components/EnhancedTimestampConverter'

export const metadata: Metadata = {
  title: 'Unix timestamp to date converter free online',
  description:
    'Epoch and unix timestamp converter free. Date and time function timestamp for various programming languages. Use it now.',
  alternates: { canonical: 'https://timestamp.run/' },
}

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">Unix timestamp to date and datetime to timestamp Converter</h1>
      <h2 className="text-xl font-semibold mb-4 text-center">Free unix timestamp and epoch time to date tool. Supports Epoch unix time in seconds and minutes.</h2>
      <EnhancedTimestampConverter />
    </div>
  )
}
