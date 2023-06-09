'use client'

import { Html } from "@react-three/drei"
import { ReactNode } from "react"

import { Lens } from './Lens'

interface LensCursorProps {
  children: ReactNode
}

export const LensCursor = ({ children }: LensCursorProps) => {
  return (
    <Lens>

          {children}

    </Lens>
  )
}
