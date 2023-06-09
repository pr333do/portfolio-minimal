"use client"

import { View as ViewImpl, OrbitControls } from "@react-three/drei"
import { forwardRef, useRef, useImperativeHandle, MutableRefObject, ReactNode, HTMLAttributes } from "react"
import { Common } from "./Common"
import { Three } from "./Three"

interface CanvasProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  orbit?: boolean
}

 const Canvas = forwardRef<HTMLDivElement,CanvasProps>(({ children, orbit = true, ...props }, ref) => {
  const localRef = useRef<HTMLDivElement>(null)
  
  useImperativeHandle(ref, () => localRef.current!)

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef as MutableRefObject<HTMLElement>}>
          <Common  />
          {children}
          {orbit && <OrbitControls minDistance={2} maxDistance={100} />}
        </ViewImpl>
      </Three>
    </>
  )
})

export { Canvas }
