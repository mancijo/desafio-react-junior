import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

/** Chave da escolha salva. O script inline do index.html usa a mesma chave. */
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
    // Sem localStorage (modo privado, bloqueio): a escolha vale só nesta visita.
  }
}

function systemTheme(): Theme {
  return typeof window.matchMedia === 'function' && window.matchMedia(DARK_QUERY).matches
    ? 'dark'
    : 'light'
}

interface ThemeState {
  theme: Theme
  /** O visitante já escolheu um modo pelo botão (nesta ou em visitas anteriores). */
  hasChoice: boolean
}

function initialState(): ThemeState {
  const stored = readStoredTheme()
  return stored ? { theme: stored, hasChoice: true } : { theme: systemTheme(), hasChoice: false }
}

/**
 * Modo claro/escuro:
 * - sem escolha salva, segue `prefers-color-scheme` (inclusive se mudar com a página aberta);
 * - o botão alterna e salva a escolha em `localStorage`, que passa a prevalecer;
 * - aplica a classe `dark` no `<html>` (Tailwind `darkMode: 'class'`).
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
