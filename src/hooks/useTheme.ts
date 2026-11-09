import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

/** Storage key of the saved choice. The inline script in index.html uses the same key. */
export const THEME_STORAGE_KEY = 'theme'
const DARK_QUERY = '(prefers-color-scheme: dark)'

function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null
  }
}

function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    // No localStorage (private mode, blocked): the choice only lasts for this visit.
  }
}

function systemTheme(): Theme {
  return typeof window.matchMedia === 'function' && window.matchMedia(DARK_QUERY).matches
    ? 'dark'
    : 'light'
}

interface ThemeState {
  theme: Theme
  /** The visitor already picked a mode with the button (in this or a previous visit). */
  hasChoice: boolean
}

function initialState(): ThemeState {
  const stored = readStoredTheme()
  return stored ? { theme: stored, hasChoice: true } : { theme: systemTheme(), hasChoice: false }
}

/**
 * Light/dark mode:
 * - without a saved choice, follows `prefers-color-scheme` (including changes while the page is open);
 * - the button toggles and saves the choice in `localStorage`, which then prevails;
 * - applies the `dark` class to `<html>` (Tailwind `darkMode: 'class'`).
 */
export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [state, setState] = useState<ThemeState>(initialState)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark')
  }, [state.theme])

  useEffect(() => {
    if (state.hasChoice || typeof window.matchMedia !== 'function') return

    const query = window.matchMedia(DARK_QUERY)
    const handleChange = (event: MediaQueryListEvent) =>
      setState({ theme: event.matches ? 'dark' : 'light', hasChoice: false })

    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [state.hasChoice])

  const toggleTheme = useCallback(() => {
    setState((current) => {
      const next: Theme = current.theme === 'dark' ? 'light' : 'dark'
      saveTheme(next)
      return { theme: next, hasChoice: true }
    })
  }, [])

  return { theme: state.theme, toggleTheme }
}
