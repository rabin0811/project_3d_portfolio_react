import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { type Mesh } from 'three'

export function Lighting() {
  const lightRef = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(clock.elapsedTime * 0.5) * 3
      lightRef.current.position.z = Math.cos(clock.elapsedTime * 0.5) * 3
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#7B61FF" />
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#00E5FF" />
      <mesh ref={lightRef}>
        <pointLight intensity={2} distance={10} color="#00FFFF" />
      </mesh>
      <hemisphereLight args={['#00E5FF', '#7B61FF', 0.3]} />
    </>
  )
}
