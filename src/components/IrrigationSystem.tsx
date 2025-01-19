'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export default function IrrigationSystem() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group>
      {/* Base Platform */}
      <mesh position={[0, -1, 0]} receiveShadow>
        <boxGeometry args={[4, 0.2, 4]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Central Pole */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 2, 16]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>

      {/* Rotating Sprinkler Arm */}
      <mesh ref={meshRef} position={[0, 1, 0]} castShadow>
        <group>
          {/* Main Arm */}
          <mesh position={[1, 0, 0]}>
            <boxGeometry args={[2, 0.1, 0.1]} />
            <meshStandardMaterial color="#2E7D32" />
          </mesh>

          {/* Sprinkler Heads */}
          {[-0.8, 0, 0.8].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#4CAF50" />
            </mesh>
          ))}
        </group>
      </mesh>

      {/* Water Droplets */}
      {Array.from({ length: 20 }).map((_, i) => {
        const x = Math.sin(i * 0.5) * 2
        const z = Math.cos(i * 0.5) * 2
        return (
          <mesh key={i} position={[x, Math.random() * 2, z]} castShadow>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#87CEEB" transparent opacity={0.6} />
          </mesh>
        )
      })}
    </group>
  )
} 