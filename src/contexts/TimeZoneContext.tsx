'use client'

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from 'react'
import { timeZones } from '@/utils/timeZones'

const STORAGE_KEY = 'selectedTimeZone'
const DEFAULT_TIME_ZONE = 'UTC'

type TimeZoneContextType = {
  timeZone: string
  setTimeZone: (timeZone: string) => void
}

const TimeZoneContext = createContext<TimeZoneContextType | undefined>(undefined)

const listeners = new Set<() => void>()

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange)
  // Keep other tabs of the site in sync with the selected zone.
  window.addEventListener('storage', onStoreChange)
  return () => {
    listeners.delete(onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

function getSnapshot() {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved && timeZones.includes(saved) ? saved : DEFAULT_TIME_ZONE
}

// The server has no stored preference, so it always renders the default. React
// re-reads the real value right after hydration.
function getServerSnapshot() {
  return DEFAULT_TIME_ZONE
}

export function TimeZoneProvider({ children }: { children: React.ReactNode }) {
  const timeZone = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  )

  const setTimeZone = useCallback((next: string) => {
    window.localStorage.setItem(STORAGE_KEY, next)
    for (const listener of listeners) listener()
  }, [])

  const value = useMemo(
    () => ({ timeZone, setTimeZone }),
    [timeZone, setTimeZone],
  )

  return (
    <TimeZoneContext.Provider value={value}>{children}</TimeZoneContext.Provider>
  )
}

export function useTimeZone() {
  const context = useContext(TimeZoneContext)
  if (context === undefined) {
    throw new Error('useTimeZone must be used within a TimeZoneProvider')
  }
  return context
}
