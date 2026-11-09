import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, type PointsMaterial, BufferGeometry, Float32BufferAttribute } from 'three'

interface ParticlesProps {
  count?: number
  color?: string
  size?: number
}

export function Particles({ count = 500, color = '#00E5FF', size = 0.02 }: ParticlesProps) {
  const ref = useRef<Points>(null)

  const { geometry, speeds } = useMemo(() => {
    const geo = new BufferGeometry()
    const positions = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      spd[i] = 0.01 + Math.random() * 0.02
    }
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    return { geometry: geo, speeds: spd }
  }, [count])

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.02
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.05
    }
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={2}
      />
    </points>
  )
}
