import { useEffect, useRef, useCallback } from 'react'
import { useUIStore } from '@/store/useUIStore'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorVariant = useUIStore((s) => s.cursorVariant)

  const updatePosition = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      const size = cursorVariant === 'hover' ? 40 : 12
      cursorRef.current.style.width = `${size}px`
      cursorRef.current.style.height = `${size}px`
      cursorRef.current.style.left = `${e.clientX}px`
      cursorRef.current.style.top = `${e.clientY}px`
    }
  }, [cursorVariant])

  useEffect(() => {
    window.addEventListener('mousemove', updatePosition)
    return () => window.removeEventListener('mousemove', updatePosition)
  }, [updatePosition])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
      style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        border: '1px solid rgba(255,255,255,0.3)',
        backgroundColor: 'transparent',
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.15s ease, height 0.15s ease',
      }}
    />
  )
}
