import { Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei'

const TechStackPlayground = lazy(() =>
  import('@/components/three/TechStackPhysics').then((m) => ({
    default: m.TechStackPlayground,
  }))
)

export function TechStack3D() {
  const [ref, isInView] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 })
  const { config } = useDeviceTier()

  return (
    <section id="tech-stack" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-accent uppercase tracking-widest mb-4">Interactive</span>
          <h2 className="section-title"><span className="text-gradient">Tech Stack</span></h2>
          <p className="section-subtitle mt-4">
            Click or hover on any technology to interact with it. Each object represents a skill with physics-based behavior.
          </p>
        </div>
      </div>

      <div className="h-[500px] md:h-[600px] mt-12">
        {isInView && (
          <Suspense
            fallback={
              <div className="h-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            }
          >
            <Canvas
              camera={{ position: [0, 2, 8], fov: 50 }}
              dpr={config.pixelRatio}
              shadows={config.shadows}
            >
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2.5}
                minPolarAngle={Math.PI / 4}
                autoRotate
                autoRotateSpeed={1}
              />
              <TechStackPlayground />
              {config.bloom && (
                <EffectComposer>
                  <Bloom intensity={0.3} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
                </EffectComposer>
              )}
            </Canvas>
          </Suspense>
        )}
      </div>
    </section>
  )
}
