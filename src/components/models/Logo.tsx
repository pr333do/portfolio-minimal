// @ts-nocheck
"use client"

import * as THREE from "three";
import { MeshTransmissionMaterial, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import { useControls, button } from 'leva'

type GLTFResult = GLTF & {
  nodes: {
    Text: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

function Logo(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/glass333.glb") as GLTFResult;

  const head = useRef<THREE.Group>(null)
  const stripe = useRef<THREE.MeshBasicMaterial>(null)
  const light = useRef<THREE.PointLight>(null)

 const { ...config } = useControls({
    backside: true,
    backsideThickness: { value: 0.3, min: 0, max: 2 },
    samples: { value: 16, min: 1, max: 32, step: 1 },
    resolution: { value: 1024, min: 64, max: 2048, step: 64 },
    transmission: { value: 1, min: 0, max: 1 },
    clearcoat: { value: 0, min: 0.1, max: 1 },
    clearcoatRoughness: { value: 0.0, min: 0, max: 1 },
    thickness: { value: 0.3, min: 0, max: 5 },
    chromaticAberration: { value: 5, min: 0, max: 5 },
    anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
    roughness: { value:0.10, min: 0, max: 1, step: 0.01 },
    distortion: { value: 0.5, min: 0, max: 4, step: 0.01 },
    distortionScale: { value: 0.2, min: 0.01, max: 1, step: 0.01 },
    temporalDistortion: { value: 0.01, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.5, min: 0, max: 2, step: 0.01 },
    color: '#97e873',
    gColor: '#ff7eb3',
    screenshot: button(() => {
      // Save the canvas as a *.png
      const link = document.createElement('a')
      link.setAttribute('download', 'canvas.png')
      link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
      link.click()
    })
  })

  useFrame((state, delta) => {
    if (!light.current || !head.current) return

    const t = (1 + Math.sin(state.clock.elapsedTime * 2)) / 2
    // stripe.current.color.setRGB(1 + t * 10, 2, 20 + t * 50)
    easing.dampE(head.current.rotation, [0, state.pointer.x * (state.camera.position.z > 1 ? 1 : -1), 0], 0.4, delta)
    light.current.intensity = 1 + t * 2
  })
  
  return (
    <group ref={head} {...props} dispose={null}>
      <mesh
        receiveShadow
        geometry={nodes.Text.geometry}
        material={materials["Material.001"]}
        scale={1}
        rotation={[Math.PI/2,0,0]}
      >
        <MeshTransmissionMaterial buffer={undefined}  {...config} />

        {/* <meshBasicMaterial ref={stripe} toneMapped={false} /> */}
        <pointLight ref={light} intensity={0.5} color={[10, 2, 5]} distance={2.5} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/glass333.glb");

export { Logo }
