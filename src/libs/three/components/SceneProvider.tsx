'use client'

import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import { r3f } from '@/libs/three/global'
import { ReactNode, useRef } from 'react'

interface SceneProviderProps {
  children: ReactNode
}

export default function SceneProvider({ children }: SceneProviderProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <div
      ref={ref}
    >
      {children}
      <Canvas 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref as unknown as HTMLElement}
        eventPrefix='client'
      >
        {/* @ts-ignore */}
        <r3f.Out />
        <Preload all />
      </Canvas>
    </div>
  )
}
