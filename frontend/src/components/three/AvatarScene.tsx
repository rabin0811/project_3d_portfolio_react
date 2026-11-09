import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Text } from '@react-three/drei'
import { type Group, type Points, BufferGeometry, Float32BufferAttribute, AdditiveBlending } from 'three'
import { Avatar } from './Avatar'
import { SpeedLines, FlashOverlay } from './SectionTravel'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useDeviceTier } from '@/hooks/useDeviceTier'

const sections = [
  { label: 'Home', y: 3.5, color: '#00E5FF' },
  { label: 'About', y: 2.5, color: '#7B61FF' },
  { label: 'Skills', y: 1.5, color: '#00FFFF' },
  { label: 'Tech', y: 0.5, color: '#7B61FF' },
  { label: 'Projects', y: -0.5, color: '#00E5FF' },
  { label: 'Contact', y: -1.5, color: '#00FFFF' },
]

function SectionLabel({ label, position, active, color }: {
  label: string
  position: [number, number, number]
  active: boolean
  color: string
}) {
  return (
    <group position={position}>
      <mesh>
        <circleGeometry args={[active ? 0.08 : 0.035, 12]} />
        <meshBasicMaterial color={active ? color : '#444'} transparent opacity={active ? 1 : 0.5} />
      </mesh>
      {active && (
        <>
          <mesh>
            <ringGeometry args={[0.1, 0.14, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.15, 0.18, 16]} />
            <meshBasicMaterial color={color} transparent opacity={0.2} />
          </mesh>
        </>
      )}
      <sprite position={[active ? 0.55 : 0.35, 0, 0]} scale={[1.2, 0.3, 1]}>
        <spriteMaterial transparent opacity={active ? 1 : 0.3}>
          <Text
            position={[0, 0, 0]}
            fontSize={0.08}
            color={active ? color : '#888'}
            anchorX="left"
            anchorY="middle"
          >
            {label}
          </Text>
        </spriteMaterial>
      </sprite>
    </group>
  )
}

function AvatarTrail({ active, speed }: { active: boolean; speed: number }) {
  const TRAIL_LENGTH = 40
  const trailRef = useRef<Points>(null)
  const positionsRef = useRef(new Float32Array(TRAIL_LENGTH * 3))

  useFrame(() => {
    if (trailRef.current) {
      const array = positionsRef.current
      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        array[i * 3] = array[(i - 1) * 3]
        array[i * 3 + 1] = array[(i - 1) * 3 + 1]
        array[i * 3 + 2] = array[(i - 1) * 3 + 2]
      }
      const parent = trailRef.current.parent
      if (parent) {
        array[0] = parent.position.x
        array[1] = parent.position.y - 0.4
        array[2] = parent.position.z
      }
      trailRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  const geo = useMemo(() => {
    const g = new BufferGeometry()
    g.setAttribute('position', new Float32BufferAttribute(positionsRef.current, 3))
    return g
  }, [])

  return (
    <points ref={trailRef} geometry={geo}>
      <pointsMaterial
        size={active ? Math.min(0.05 + speed * 0.05, 0.12) : 0.02}
        color="#00E5FF"
        transparent
        opacity={active ? Math.min(0.6 + speed * 0.3, 1) : 0.2}
        blending={AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

export function AvatarScene() {
  const progress = useScrollProgress()
  const { config } = useDeviceTier()
  const groupRef = useRef<Group>(null)
  const leanRef = useRef<Group>(null)
  const [speed, setSpeed] = useState(0)

  const totalRange = sections[0].y - sections[sections.length - 1].y
  const targetY = sections[0].y - progress * totalRange

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const diff = targetY - groupRef.current.position.y
      groupRef.current.position.y += diff * 0.06
      const currentSpeed = Math.abs(diff) * 3
      setSpeed((prev) => prev + (currentSpeed - prev) * 0.05)
      groupRef.current.position.x = Math.sin(clock.elapsedTime * 0.3) * 0.1
    }
    if (leanRef.current) {
      const targetLean = Math.min(speed * 0.2, 0.4)
      leanRef.current.rotation.z += (targetLean - leanRef.current.rotation.z) * 0.05
    }
  })

  const activeIndex = Math.min(
    Math.floor(progress * (sections.length - 1)),
    sections.length - 1
  )

  const isMoving = speed > 0.08

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[2, 3, 3]} intensity={0.8} color="#00E5FF" />
      <pointLight position={[-2, 1, 2]} intensity={0.4} color="#7B61FF" />
      <pointLight position={[1, -1, 2]} intensity={0.3} color="#00FFFF" />

      <FlashOverlay />
      <SpeedLines active={isMoving && speed > 0.3} />

      <group ref={groupRef}>
        <AvatarTrail active={isMoving} speed={speed} />

        <Float
          speed={isMoving ? 1.5 : 0.5}
          rotationIntensity={isMoving ? 0.2 : 0.05}
          floatIntensity={isMoving ? 0.4 : 0.15}
        >
          <group ref={leanRef}>
            <Avatar />
          </group>
        </Float>

        {isMoving && (
          <mesh position={[0, -0.6, 0]}>
            <planeGeometry args={[Math.min(0.6 + speed * 0.5, 2), 0.02]} />
            <meshBasicMaterial
              color="#00E5FF"
              transparent
              opacity={Math.min(speed * 0.3, 0.5)}
              blending={AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}
      </group>

      <mesh position={[-1.4, 0, -0.2]}>
        <planeGeometry args={[0.015, 6]} />
        <meshBasicMaterial color="#333" transparent opacity={0.3} depthWrite={false} />
      </mesh>

      <mesh position={[-1.4, sections[sections.length - 1].y, -0.2]}>
        <planeGeometry args={[0.03, totalRange]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.15} depthWrite={false} />
      </mesh>

      <mesh position={[-1.4, sections[sections.length - 1].y + (totalRange * (1 - progress)) / 2, -0.19]}>
        <planeGeometry args={[0.04, totalRange * progress]} />
        <meshBasicMaterial color="#00E5FF" transparent opacity={0.5} depthWrite={false} />
      </mesh>

      {sections.map((section, i) => (
        <SectionLabel
          key={section.label}
          position={[-1.4, sections[0].y - (i / (sections.length - 1)) * 5, 0]}
          label={section.label}
          active={i === activeIndex}
          color={section.color}
        />
      ))}

      <StarField count={80} />
    </>
  )
}

function StarField({ count }: { count: number }) {
  const geometry = useMemo(() => {
    const g = new BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    g.setAttribute('position', new Float32BufferAttribute(pos, 3))
    return g
  }, [])

  return (
    <points geometry={geometry}>
      <pointsMaterial
        size={0.012}
        color="#7B61FF"
        transparent
        opacity={0.25}
        blending={AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
