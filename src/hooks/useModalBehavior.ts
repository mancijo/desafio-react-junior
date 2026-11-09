import { useEffect, useRef, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Comportamento de modal acessível:
 * - ao abrir, move o foco para `initialFocusRef` (ou para o contêiner);
 * - `Esc` chama `onClose`;
 * - `Tab` e `Shift+Tab` circulam apenas dentro do contêiner (foco preso);
 * - impede a rolagem da página ao fundo;
 * - ao fechar, devolve o foco ao elemento que estava focado antes da abertura.
 */
export function useModalBehavior(
  containerRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  initialFocusRef?: RefObject<HTMLElement | null>,
): void {
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const previouslyFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null
    ;(initialFocusRef?.current ?? container).focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !container) return

      const focusables = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusables.length === 0) {
        event.preventDefault()
        container.focus()
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      const active = document.activeElement
      const outside = !container.contains(active)

      if (event.shiftKey && (active === first || outside)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (active === last || outside)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      if (previouslyFocused?.isConnected) previouslyFocused.focus()
    }
  }, [containerRef, initialFocusRef])
}
