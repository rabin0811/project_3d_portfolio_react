import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { type Group } from 'three'
import { Hoverboard } from './Hoverboard'

export function Avatar() {
  const groupRef = useRef<Group>(null)
  const armLeftRef = useRef<Group>(null)
  const armRightRef = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(clock.elapsedTime * 1.5) * 0.15
    }
    if (armLeftRef.current) {
      armLeftRef.current.rotation.z = -0.3 + Math.sin(clock.elapsedTime * 2) * 0.15
    }
    if (armRightRef.current) {
      armRightRef.current.rotation.z = 0.3 - Math.sin(clock.elapsedTime * 2 + 1) * 0.15
    }
  })

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.22, 0.35, 12]} />
        <meshStandardMaterial
          color="#e8e8e8"
          metalness={0.7}
          roughness={0.3}
          emissive="#7B61FF"
          emissiveIntensity={0.05}
        />
      </mesh>

      {/* Chest accent */}
      <mesh position={[0, 0.28, 0.12]}>
        <planeGeometry args={[0.15, 0.1]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.6} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color="#e8e8e8"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Visor */}
      <mesh position={[0, 0.55, 0.16]}>
        <sphereGeometry args={[0.1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Helmet ring */}
      <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.02, 8, 24]} />
        <meshStandardMaterial
          color="#7B61FF"
          emissive="#7B61FF"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Left Arm */}
      <group ref={armLeftRef} position={[-0.22, 0.3, 0]}>
        <mesh position={[0, -0.12, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 0.25, 8]} />
          <meshStandardMaterial color="#e8e8e8" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -0.25, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#cccccc" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={armRightRef} position={[0.22, 0.3, 0]}>
        <mesh position={[0, -0.12, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 0.25, 8]} />
          <meshStandardMaterial color="#e8e8e8" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.25, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#cccccc" metalness={0.5} roughness={0.4} />
        </mesh>
      </group>

      {/* Left Leg */}
      <mesh position={[-0.08, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.2, 8]} />
        <meshStandardMaterial color="#cccccc" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.08, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.06, 0.2, 8]} />
        <meshStandardMaterial color="#cccccc" metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Jetpack */}
      <mesh position={[0, 0.25, -0.12]}>
        <boxGeometry args={[0.16, 0.2, 0.08]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.8}
          roughness={0.2}
          emissive="#00E5FF"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Jetpack thrusters */}
      {[-0.06, 0.06].map((x) => (
        <mesh key={x} position={[x, 0.15, -0.16]}>
          <cylinderGeometry args={[0.03, 0.04, 0.06, 8]} />
          <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.6} />
        </mesh>
      ))}

      <Hoverboard />
    </group>
  )
}
