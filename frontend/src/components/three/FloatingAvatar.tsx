import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { AvatarScene } from './AvatarScene'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import { useUIStore } from '@/store/useUIStore'

export function FloatingAvatar() {
  const { config } = useDeviceTier()
  const isLoading = useUIStore((s) => s.isLoading)

  if (isLoading) return null

  return (
    <div className="fixed right-0 top-0 h-screen w-[180px] z-30 pointer-events-none hidden lg:block">
      <div className="absolute inset-0 bg-gradient-to-l from-bg/40 to-transparent" />
      <Canvas
        camera={{ position: [3, 1.5, 4], fov: 30 }}
        dpr={config.pixelRatio}
        gl={{ antialias: true, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <AvatarScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
