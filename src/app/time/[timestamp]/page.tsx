import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import TimestampToDateConverter from '@/components/TimestampToDateConverter'

type PageProps = {
  params: Promise<{ timestamp: string }>
}

function isValidTimestamp(raw: string): boolean {
  return /^-?\d+$/.test(raw) && Number.isSafeInteger(Number(raw))
}

// A timestamp's conversion never changes, so pages are rendered once on first
// request and then served from the cache.
export function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { timestamp } = await params

  return {
    title: `Timestamp ${timestamp} Conversion | Timestamp.run`,
    description: `Convert Unix timestamp ${timestamp} to human-readable dates across multiple time zones.`,
    alternates: { canonical: `/time/${timestamp}` },
  }
}

export default async function TimestampPage({ params }: PageProps) {
  const { timestamp } = await params

  if (!isValidTimestamp(timestamp)) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Timestamp {timestamp} Conversion</h1>
      <TimestampToDateConverter initialTimestamp={timestamp} />
    </div>
  )
}
