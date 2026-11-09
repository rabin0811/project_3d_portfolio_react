export type DeviceTier = 'low' | 'medium' | 'high'

export function getDeviceTier(): DeviceTier {
  if (typeof window === 'undefined') return 'high'

  const gpu = (navigator as any).gpu
  const memory = (navigator as any).deviceMemory || 4
  const cores = navigator.hardwareConcurrency || 4
  const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent)

  if (isMobile || memory <= 4 || cores <= 4) return 'low'
  if (memory <= 8 || cores <= 6) return 'medium'
  return 'high'
}

export const TIER_CONFIG = {
  low: {
    particleCount: 100,
    shadows: false,
    bloom: false,
    physicsBodies: 8,
    pixelRatio: 1,
  },
  medium: {
    particleCount: 300,
    shadows: true,
    bloom: true,
    physicsBodies: 15,
    pixelRatio: 1.5,
  },
  high: {
    particleCount: 800,
    shadows: true,
    bloom: true,
    physicsBodies: 25,
    pixelRatio: Math.min(window.devicePixelRatio, 2),
  },
}
