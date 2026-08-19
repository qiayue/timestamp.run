'use client'

import { useSyncExternalStore } from 'react'

// Never notifies: the value flips once, when React moves from the server
// snapshot to the client one.
const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

/**
 * False while rendering on the server and during hydration, true afterwards.
 * Use it to gate values that only exist in the browser — the visitor's clock,
 * for instance — without risking a hydration mismatch.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
