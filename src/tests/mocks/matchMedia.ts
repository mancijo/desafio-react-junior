type Listener = (event: MediaQueryListEvent) => void

export interface MatchMediaController {
  /** Simulates a change in the system preference while the page is open. */
  change: (matches: boolean) => void
}

/**
 * Replaces window.matchMedia (missing in jsdom) with a controllable version.
 * `matches` tells whether the system prefers dark mode.
 */
export function mockMatchMedia(matches: boolean): MatchMediaController {
  let current = matches
  const listeners = new Set<Listener>()

  window.matchMedia = (query: string): MediaQueryList => {
    const mql: MediaQueryList = {
      get matches() {
        return current
      },
      media: query,
      onchange: null,
      addEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
        listeners.add(listener as Listener)
      },
      removeEventListener: (_type: string, listener: EventListenerOrEventListenerObject) => {
        listeners.delete(listener as Listener)
      },
      addListener: (listener) => {
        if (listener) listeners.add(listener as Listener)
      },
      removeListener: (listener) => {
        if (listener) listeners.delete(listener as Listener)
      },
      dispatchEvent: () => true,
    }
    return mql
  }

  return {
    change(next: boolean) {
      current = next
      listeners.forEach((listener) => listener({ matches: next } as MediaQueryListEvent))
    },
  }
}
