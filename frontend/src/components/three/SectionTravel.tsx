import { useRef, useCallback, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { type Group, type Mesh } from 'three'

interface TravelState {
  active: boolean
  fromY: number
  toY: number
  progress: number
}

let travelState: TravelState = { active: false, fromY: 0, toY: 0, progress: 0 }
let setTravelCallback: ((state: TravelState) => void) | null = null

export function triggerTravel(fromY: number, toY: number) {
  travelState = { active: true, fromY, toY, progress: 0 }
  if (setTravelCallback) {
    setTravelCallback(travelState)
  }
}

export function useTravel() {
  const stateRef = useRef(travelState)
  useFrame(() => {
    if (stateRef.current.active) {
      stateRef.current.progress += 0.02
      if (stateRef.current.progress >= 1) {
        stateRef.current.active = false
        stateRef.current.progress = 1
      }
    }
  })
  return { travel: stateRef.current }
}

export function SpeedLines({ active }: { active: boolean }) {
  const linesRef = useRef<Group>(null)

  useFrame(() => {
    if (linesRef.current) {
      linesRef.current.visible = active
      if (active) {
        linesRef.current.children.forEach((child) => {
          const mesh = child as Mesh
          const scale = mesh.scale.z + 0.05
          if (scale > 3) {
            mesh.scale.z = 0.1
            mesh.position.z = -2
          } else {
            mesh.scale.z = scale
            mesh.position.z += 0.1
          }
        })
      }
    }
  })

  return (
    <group ref={linesRef} visible={false}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 3,
            Math.random() * 2 - 2,
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <boxGeometry args={[0.01, 0.01, 0.1]} />
          <meshBasicMaterial color="#00E5FF" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  )
}

export function FlashOverlay() {
  const ref = useRef<Mesh>(null)
  const [state, setState] = useState<TravelState>(travelState)

  useEffect(() => {
    setTravelCallback = setState
    return () => { setTravelCallback = null }
  }, [])

  useFrame(() => {
    if (ref.current && state.active && state.progress > 0 && state.progress < 1) {
      ref.current.visible = true
      const intensity = Math.sin(state.progress * Math.PI) * 0.3
      ;(ref.current.material as any).opacity = intensity
    } else if (ref.current) {
      ref.current.visible = false
    }
  })

  return (
    <mesh ref={ref} position={[0, 0, -1]} visible={false}>
      <planeGeometry args={[4, 6]} />
      <meshBasicMaterial color="#00E5FF" transparent opacity={0} depthWrite={false} />
    </mesh>
  )
}
