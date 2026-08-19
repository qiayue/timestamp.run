import { TZDate } from '@date-fns/tz'
import { addDays, format, isValid } from 'date-fns'

/** The display format used everywhere in the app. */
export const DISPLAY_FORMAT = 'yyyy-MM-dd HH:mm:ss'

/** Formats an instant as wall-clock time in the given IANA time zone. */
export function formatInTimeZone(date: Date, timeZone: string): string {
  return format(new TZDate(date.getTime(), timeZone), DISPLAY_FORMAT)
}

/** Formats a Unix timestamp (seconds) as wall-clock time in the given time zone. */
export function formatTimestamp(timestamp: number, timeZone: string): string {
  return formatInTimeZone(new Date(timestamp * 1000), timeZone)
}

/** Converts an instant to a Unix timestamp in seconds. */
export function toUnixSeconds(date: Date): number {
  return Math.floor(date.getTime() / 1000)
}

/**
 * Parses a `YYYY-MM-DD[ HH:mm[:ss]]` string as wall-clock time in the given
 * time zone and returns the Unix timestamp in seconds, or null if unparseable.
 * The separator between date and time may be a space or a `T`.
 */
export function parseDateInTimeZone(
  input: string,
  timeZone: string,
): number | null {
  const match = input
    .trim()
    .match(/^(\d{4})-(\d{1,2})-(\d{1,2})(?:[T ](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/)
  if (!match) return null

  const [, year, month, day, hour = '0', minute = '0', second = '0'] = match
  return buildTimestamp(
    {
      year: Number(year),
      month: Number(month),
      day: Number(day),
      hour: Number(hour),
      minute: Number(minute),
      second: Number(second),
    },
    timeZone,
  )
}

export type DateParts = {
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

/**
 * Converts calendar parts interpreted as wall-clock time in the given time zone
 * into a Unix timestamp in seconds, or null if the parts are not a real date.
 */
export function buildTimestamp(
  parts: DateParts,
  timeZone: string,
): number | null {
  const { year, month, day, hour, minute, second } = parts
  if (!Object.values(parts).every(Number.isFinite)) return null
  if (month < 1 || month > 12 || day < 1 || day > 31) return null
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null
  if (second < 0 || second > 59) return null

  const date = new TZDate(year, month - 1, day, hour, minute, second, timeZone)
  if (!isValid(date)) return null
  // Reject overflow such as 2024-02-31 rolling forward into March.
  if (date.getDate() !== day || date.getMonth() !== month - 1) return null

  return toUnixSeconds(date)
}

/**
 * Adds whole days to a Unix timestamp, keeping the wall-clock time of day in
 * the given zone. Across a DST boundary that is deliberately not the same as
 * adding `days * 86400` seconds.
 */
export function addDaysToTimestamp(
  timestamp: number,
  days: number,
  timeZone: string,
): number {
  return toUnixSeconds(addDays(new TZDate(timestamp * 1000, timeZone), days))
}
