import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Trail } from '@react-three/drei'
import { type Mesh, type Group } from 'three'
import { Particles } from './Particles'
import { Lighting } from './Lighting'
import { useMousePosition } from '@/hooks/useMousePosition'

function OrbitalRing({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const ringRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.sin(clock.elapsedTime * speed) * 0.3
      ringRef.current.rotation.z = Math.cos(clock.elapsedTime * speed * 0.7) * 0.2
    }
  })

  return (
    <mesh ref={ringRef}>
      <ringGeometry args={[radius, radius + 0.015, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} side={2} depthWrite={false} />
    </mesh>
  )
}

function OrbitingSphere({ radius, speed, size, color, offset = 0 }: { radius: number; speed: number; size: number; color: string; offset?: number }) {
  const groupRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const angle = clock.elapsedTime * speed + offset
      groupRef.current.position.x = Math.cos(angle) * radius
      groupRef.current.position.z = Math.sin(angle) * radius
      groupRef.current.position.y = Math.sin(angle * 0.5) * 0.3
    }
  })

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[size, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      <pointLight intensity={0.5} color={color} distance={2} />
    </group>
  )
}

export function HeroScene() {
  const meshRef = useRef<Mesh>(null)
  const groupRef = useRef<Group>(null)
  const mouse = useMousePosition()

  const targetPos = useMemo(() => ({ x: 0, y: 0 }), [])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      targetPos.x += (mouse.normalizedX * 0.5 - targetPos.x) * 0.05
      targetPos.y += (mouse.normalizedY * 0.5 - targetPos.y) * 0.05

      meshRef.current.rotation.x = targetPos.y * 0.8 + Math.sin(clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y = targetPos.x * 0.8 + clock.elapsedTime * 0.15
      meshRef.current.position.x = targetPos.x * 0.5
      meshRef.current.position.y = targetPos.y * 0.5
    }
    if (groupRef.current) {
      groupRef.current.position.x = targetPos.x * 0.3
      groupRef.current.position.y = targetPos.y * 0.3
    }
  })

  return (
    <>
      <Lighting />

      <Particles count={800} color="#00E5FF" size={0.02} />
      <Particles count={200} color="#7B61FF" size={0.015} />

      <group ref={groupRef}>
        <OrbitalRing radius={2.5} color="#00E5FF" speed={0.3} />
        <OrbitalRing radius={3} color="#7B61FF" speed={0.2} />
        <OrbitalRing radius={3.5} color="#00FFFF" speed={0.15} />

        <OrbitingSphere radius={2.5} speed={0.5} size={0.08} color="#00E5FF" offset={0} />
        <OrbitingSphere radius={3} speed={-0.4} size={0.06} color="#7B61FF" offset={1.5} />
        <OrbitingSphere radius={3.5} speed={0.3} size={0.1} color="#00FFFF" offset={3} />
        <OrbitingSphere radius={2} speed={-0.6} size={0.04} color="#FF6B9D" offset={4.5} />
      </group>

      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={3}>
        <Trail
          width={1}
          length={5}
          color="#00E5FF"
          attenuation={(t) => t * t}
        >
          <mesh ref={meshRef} castShadow scale={1.3}>
            <torusKnotGeometry args={[1, 0.35, 200, 32]} />
            <MeshDistortMaterial
              color="#00E5FF"
              emissive="#7B61FF"
              emissiveIntensity={0.4}
              roughness={0.1}
              metalness={0.95}
              distort={0.35}
              speed={3}
              clearcoat={1}
            />
          </mesh>
        </Trail>
      </Float>

      {[-3, -2, -1, 1, 2, 3].map((x, i) => (
        <mesh key={i} position={[x * 1.5, Math.sin(x) * 1.5, -4]}>
          <sphereGeometry args={[0.025, 12, 12]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#00FFFF' : '#7B61FF'} transparent opacity={0.5} />
        </mesh>
      ))}
    </>
  )
}
