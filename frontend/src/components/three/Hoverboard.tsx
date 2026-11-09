import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { type Group, type Mesh } from 'three'

export function Hoverboard() {
  const groupRef = useRef<Group>(null)
  const glowRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 2) * 0.08
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 1.5) * 0.03
    }
    if (glowRef.current) {
      glowRef.current.scale.x = 1 + Math.sin(clock.elapsedTime * 3) * 0.1
      glowRef.current.scale.z = 1 + Math.cos(clock.elapsedTime * 3.5) * 0.1
      ;(glowRef.current.material as any).opacity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.06, 0.3]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.2}
          emissive="#00E5FF"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[0.55, 0.02, 0.25]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>

      <mesh ref={glowRef} position={[0, -0.06, 0]}>
        <planeGeometry args={[0.7, 0.4]} />
        <meshBasicMaterial
          color="#00E5FF"
          transparent
          opacity={0.3}
          depthWrite={false}
          blending={2}
        />
      </mesh>

      <pointLight position={[0, -0.1, 0]} intensity={0.5} color="#00E5FF" distance={1} />

      {[-0.25, 0.25].map((x) => (
        <mesh key={x} position={[x, 0.08, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.02, 0.08, 0.02]} />
          <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.8} />
        </mesh>
      ))}
    </group>
  )
}
