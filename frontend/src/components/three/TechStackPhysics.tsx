import { useRef, useCallback, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Physics, RigidBody, type RapierRigidBody } from '@react-three/rapier'
import { Float, Text, Html } from '@react-three/drei'
import { Lighting } from './Lighting'
import { Particles } from './Particles'
import { techStack3D } from '@/data/skills'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import * as THREE from 'three'

type TechType = 'cube' | 'sphere' | 'torus' | 'capsule'

const geometryMap: Record<TechType, { args: number[]; type: string }> = {
  cube: { args: [0.5, 0.5, 0.5], type: 'box' },
  sphere: { args: [0.35, 24, 24], type: 'sphere' },
  torus: { args: [0.3, 0.12, 16, 32], type: 'torus' },
  capsule: { args: [0.2, 0.4, 8, 16], type: 'capsule' },
}

function TechObject({
  name,
  color,
  type,
  position,
}: {
  name: string
  color: string
  type: TechType
  position: [number, number, number]
}) {
  const rigidBodyRef = useRef<RapierRigidBody>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const handleClick = useCallback(() => {
    if (rigidBodyRef.current) {
      const impulse = new THREE.Vector3(
        (Math.random() - 0.5) * 8,
        Math.random() * 6 + 3,
        (Math.random() - 0.5) * 8
      )
      rigidBodyRef.current.applyImpulse(impulse, true)
      setClicked(true)
      setTimeout(() => setClicked(false), 500)
    }
  }, [])

  const geoConfig = geometryMap[type]

  const renderGeometry = () => {
    switch (type) {
      case 'cube':
        return <boxGeometry args={[0.5, 0.5, 0.5]} />
      case 'sphere':
        return <sphereGeometry args={[0.35, 24, 24]} />
      case 'torus':
        return <torusGeometry args={[0.3, 0.12, 16, 32]} />
      case 'capsule':
        return <capsuleGeometry args={[0.2, 0.4, 8, 16]} />
    }
  }

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <RigidBody
        ref={rigidBodyRef}
        position={position}
        colliders="hull"
        restitution={0.6}
        friction={0.2}
        density={2}
        linearDamping={0.3}
        angularDamping={0.4}
      >
        <group>
          <mesh
            castShadow
            onClick={handleClick}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            scale={hovered ? 1.4 : clicked ? 1.6 : 1}
          >
            {renderGeometry()}
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={hovered ? 1 : 0.2}
              roughness={hovered ? 0.1 : 0.3}
              metalness={0.8}
              transparent
              opacity={0.95}
            />
          </mesh>

          {hovered && (
            <sprite position={[0, 0.6, 0]} scale={[0.8, 0.4, 1]}>
              <spriteMaterial transparent opacity={0.9}>
                <Html distanceFactor={8} center>
                  <div className="glass-strong px-4 py-2 rounded-xl whitespace-nowrap text-sm font-semibold"
                    style={{ color, borderColor: `${color}44`, backgroundColor: `${color}11` }}>
                    {name}
                  </div>
                </Html>
              </spriteMaterial>
            </sprite>
          )}

          {hovered && (
            <pointLight position={[0, 0, 0]} intensity={2} color={color} distance={3} />
          )}
        </group>
      </RigidBody>
    </Float>
  )
}

function GlassDome() {
  return (
    <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[12, 12]} />
      <meshStandardMaterial
        color="#0a0a1a"
        metalness={0.9}
        roughness={0.1}
        transparent
        opacity={0.3}
      />
    </mesh>
  )
}

function ConnectionLines({ colors }: { colors: string[] }) {
  const lineRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (lineRef.current) {
      lineRef.current.rotation.y = clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={lineRef}>
      {colors.map((color, i) => {
        const angle = (i / colors.length) * Math.PI * 2
        const radius = 2.5
        const start = new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius)
        const end = new THREE.Vector3(Math.cos(angle + 0.5) * radius, 0, Math.sin(angle + 0.5) * radius)
        const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5)
        mid.y = 1

        const points = [start, mid, end]
        const curve = new THREE.CatmullRomCurve3(points)
        const curvePoints = curve.getPoints(20)

        return (
          <mesh key={i} position={[0, -0.3, 0]}>
            <tubeGeometry args={[new THREE.CatmullRomCurve3(curvePoints), 20, 0.008, 8, false]} />
            <meshBasicMaterial color={color} transparent opacity={0.15} />
          </mesh>
        )
      })}
    </group>
  )
}

export function TechStackPlayground() {
  const { config, tier } = useDeviceTier()
  const activeTechs = techStack3D.slice(0, config.physicsBodies)

  const positions: [number, number, number][] = activeTechs.map((_, i) => {
    const angle = (i / activeTechs.length) * Math.PI * 2
    const radius = 2 + Math.random() * 1.2
    return [
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 2,
      Math.sin(angle) * radius,
    ]
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 5, 0]} intensity={3} color="#00E5FF" distance={15} />
      <pointLight position={[-3, 2, 3]} intensity={1} color="#7B61FF" distance={10} />
      <directionalLight position={[2, 4, 2]} intensity={0.5} castShadow />

      <Particles count={config.particleCount} color="#7B61FF" size={0.025} />

      <GlassDome />

      {tier !== 'low' && <ConnectionLines colors={activeTechs.map((t) => t.color)} />}

      <Physics gravity={[0, -4, 0]}>
        {activeTechs.map((tech, i) => (
          <TechObject
            key={tech.name}
            name={tech.name}
            color={tech.color}
            type={tech.type}
            position={positions[i]}
          />
        ))}
      </Physics>
    </>
  )
}
