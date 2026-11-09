import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { type Mesh, type Points, BufferGeometry, Float32BufferAttribute, AdditiveBlending } from 'three'
import { Particles } from './Particles'

function EnergyCore() {
  const coreRef = useRef<Mesh>(null)
  const glowRef = useRef<Mesh>(null)
  const outerRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (coreRef.current) {
      coreRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 2) * 0.1)
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 3) * 0.15)
      ;(glowRef.current.material as any).opacity = 0.25 + Math.sin(clock.elapsedTime * 2.5) * 0.1
    }
    if (outerRef.current) {
      outerRef.current.rotation.y = clock.elapsedTime * 0.2
      ;(outerRef.current.material as any).opacity = 0.08 + Math.sin(clock.elapsedTime * 0.8) * 0.04
    }
  })

  return (
    <group>
      {/* Outer ring */}
      <mesh ref={outerRef}>
        <ringGeometry args={[0.6, 0.7, 64]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.1} side={2} depthWrite={false} />
      </mesh>

      <mesh ref={coreRef}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={3}
          metalness={0.3}
          roughness={0.1}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[0.45, 20, 20]} />
        <meshBasicMaterial
          color="#00FFFF"
          transparent
          opacity={0.25}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <pointLight intensity={8} color="#00E5FF" distance={8} />
    </group>
  )
}

function DataParticles() {
  const count = 120
  const particlesRef = useRef<Points>(null)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 1 + Math.random() * 1.8
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.cos(phi)
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
      speeds[i] = 0.2 + Math.random() * 0.3
    }
    return { pos, speeds }
  }, [])

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const p = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        const theta = Math.atan2(p[i * 3 + 2], p[i * 3])
        const newTheta = theta + positions.speeds[i] * 0.01
        const r = Math.sqrt(p[i * 3] ** 2 + p[i * 3 + 2] ** 2)
        p[i * 3] = r * Math.cos(newTheta)
        p[i * 3 + 2] = r * Math.sin(newTheta)
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
      particlesRef.current.rotation.y = clock.elapsedTime * 0.05
    }
  })

  const geo = useMemo(() => {
    const g = new BufferGeometry()
    g.setAttribute('position', new Float32BufferAttribute(positions.pos, 3))
    return g
  }, [])

  return (
    <points ref={particlesRef} geometry={geo}>
      <pointsMaterial
        size={0.035}
        color="#00E5FF"
        transparent
        opacity={0.5}
        blending={AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function WireframeSphere({ radius, color }: { radius: number; color: string }) {
  const meshRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.2
      meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.1
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 24, 24]} />
      <meshBasicMaterial wireframe color={color} transparent opacity={0.08} />
    </mesh>
  )
}

export function ContactScene() {
  const sphereRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = clock.elapsedTime * 0.3
      sphereRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 3, 0]} intensity={4} color="#00E5FF" distance={10} />
      <pointLight position={[2, -1, 2]} intensity={2} color="#7B61FF" distance={6} />
      <pointLight position={[-2, 1, -2]} intensity={1.5} color="#00FFFF" distance={5} />

      <EnergyCore />

      <Float speed={1.5} floatIntensity={1.5}>
        <mesh ref={sphereRef}>
          <sphereGeometry args={[2.5, 48, 48]} />
          <meshBasicMaterial wireframe color="#00E5FF" transparent opacity={0.1} />
        </mesh>
      </Float>

      <WireframeSphere radius={2} color="#7B61FF" />

      <DataParticles />

      <Particles count={400} color="#00E5FF" size={0.012} />
      <Particles count={150} color="#7B61FF" size={0.008} />
    </>
  )
}
