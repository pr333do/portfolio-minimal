import { Suspense } from "react";
import { Environment, Lightformer, PerspectiveCamera } from "@react-three/drei";

interface CommonProps {
  color?: any
}

export const Common = ({ color = undefined }: CommonProps) => (
  <Suspense fallback={null}>
    <fog attach="fog" args={['black', 15, 21.5]} />

    {color && <color attach='background' args={[color]} />}
    <ambientLight intensity={1} />
    <pointLight position={[-3, -3, -3]} color='white' intensity={20} />
    {/* <directionalLight color="white" position={[2, 0, 5]}  intensity={20}/> */}
    {/* <directionalLight color="white" position={[2, 0, 5]} rotation={[Math.PI * 90 / 2, 0, 0]}  intensity={20} /> */}
      <Environment resolution={32}>
        <group rotation={[-Math.PI / 4, -0.3, 0]}>
          <Lightformer intensity={20} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
          <Lightformer type="ring" intensity={2} rotation-y={Math.PI / 2} position={[-0.1, -1, -5]} scale={10} />
        </group>
        </Environment>
    
    <PerspectiveCamera makeDefault fov={40} position={[0, 0, 3]} />
  </Suspense>
)
