import { useRef, useCallback, type RefObject } from 'react'

interface TiltConfig {
  maxTilt?: number
  scale?: number
  speed?: number
  glare?: boolean
}

export function useTilt<T extends HTMLElement = HTMLDivElement>(config: TiltConfig = {}) {
  const { maxTilt = 10, scale = 1.02, speed = 400 } = config
  const ref = useRef<T | null>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      const rotateX = ((y - centerY) / centerY) * -maxTilt
      const rotateY = ((x - centerX) / centerX) * maxTilt

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`
      el.style.transition = `transform ${speed}ms ease-out`
    },
    [maxTilt, scale, speed]
  )

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    el.style.transition = `transform ${speed}ms ease-out`
  }, [speed])

  return { ref: ref as RefObject<T | null>, handleMouseMove, handleMouseLeave }
}
