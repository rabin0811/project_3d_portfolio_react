import { useState, useEffect } from 'react'
import { getDeviceTier, TIER_CONFIG, type DeviceTier } from '@/utils/performance'

export function useDeviceTier() {
  const [tier, setTier] = useState<DeviceTier>('high')
  const config = TIER_CONFIG[tier]

  useEffect(() => {
    setTier(getDeviceTier())
  }, [])

  return { tier, config }
}
