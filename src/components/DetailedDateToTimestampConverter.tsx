'use client'

import { useMemo, useState } from 'react'
import { useTimeZone } from '@/contexts/TimeZoneContext'
import { useIsHydrated } from '@/hooks/useIsHydrated'
import { addDaysToTimestamp, buildTimestamp, type DateParts } from '@/utils/datetime'

const FUTURE_OFFSETS = [100, 200, 365]

const FIELDS = [
  { key: 'year', label: 'Year:', placeholder: 'YYYY', labelWidth: 'w-12' },
  { key: 'month', label: 'Month:', placeholder: '1-12', labelWidth: 'w-14' },
  { key: 'day', label: 'Day:', placeholder: '1-31', labelWidth: 'w-10' },
  { key: 'hour', label: 'Hour:', placeholder: '0-23', labelWidth: 'w-12' },
  { key: 'minute', label: 'Minute:', placeholder: '0-59', labelWidth: 'w-12' },
  { key: 'second', label: 'Second:', placeholder: '0-59', labelWidth: 'w-12' },
] as const satisfies ReadonlyArray<{
  key: keyof DateParts
  label: string
  placeholder: string
  labelWidth: string
}>

/** Empty strings keep the inputs clearable instead of collapsing to NaN. */
type DraftParts = Record<keyof DateParts, string>

function currentParts(): DraftParts {
  const now = new Date()
  return {
    year: String(now.getFullYear()),
    month: String(now.getMonth() + 1),
    day: String(now.getDate()),
    hour: String(now.getHours()),
    minute: String(now.getMinutes()),
    second: String(now.getSeconds()),
  }
}

export default function DetailedDateToTimestampConverter() {
  const { timeZone } = useTimeZone()
  const isHydrated = useIsHydrated()
  // The default value depends on the visitor's clock, so it is filled in after
  // hydration to keep the server and client markup identical.
  const [draft, setDraft] = useState<DraftParts | null>(null)
  const defaultParts = useMemo(
    () => (isHydrated ? currentParts() : null),
    [isHydrated],
  )
  const date = draft ?? defaultParts

  const timestamp = useMemo(() => {
    if (!date) return null
    return buildTimestamp(
      {
        year: Number(date.year),
        month: Number(date.month),
        day: Number(date.day),
        hour: Number(date.hour),
        minute: Number(date.minute),
        second: Number(date.second),
      },
      timeZone,
    )
  }, [date, timeZone])

  const futureDates = useMemo(() => {
    if (timestamp === null) return []
    return FUTURE_OFFSETS.map((days) => ({
      label: `${days} days later`,
      value: addDaysToTimestamp(timestamp, days, timeZone),
    }))
  }, [timestamp, timeZone])

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
      <h3 className="text-2xl font-semibold mb-2">Unix timestamp and epoch to date</h3>
      <div className="grid grid-cols-3 gap-4 mb-2">
        {FIELDS.map(({ key, label, placeholder, labelWidth }) => (
          <div key={key} className="flex items-center">
            <label
              htmlFor={key}
              className={`mr-2 text-sm font-medium text-gray-700 ${labelWidth}`}
            >
              {label}
            </label>
            <input
              id={key}
              type="number"
              value={date?.[key] ?? ''}
              onChange={(event) =>
                setDraft((current) => ({
                  ...(current ?? defaultParts ?? currentParts()),
                  [key]: event.target.value,
                }))
              }
              placeholder={placeholder}
              className="grow p-2 border border-gray-300 rounded"
            />
          </div>
        ))}
      </div>
      <div className="mb-2 text-sm text-gray-600">
        Time Zone: {timeZone} (All inputs are treated as {timeZone})
      </div>
      <button
        type="button"
        onClick={() => setDraft((current) => ({ ...(current ?? date ?? currentParts()) }))}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors mb-2"
      >
        Convert to Timestamp
      </button>
      {date && timestamp === null && (
        <p className="mb-2 text-red-600" role="alert">
          Enter a valid date and time.
        </p>
      )}
      {timestamp !== null && (
        <div className="bg-white p-2 rounded whitespace-pre-wrap">
          <strong>Converted Timestamp:</strong>
          <br />
          {timestamp}
        </div>
      )}
      {futureDates.length > 0 && (
        <div className="bg-white p-2 rounded whitespace-pre-wrap">
          <strong>Future Dates:</strong>
          <br />
          {futureDates.map(({ label, value }) => (
            <div key={label}>
              {label}: {value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
