// @ts-nocheck
'use client'

import { Grid as GridDrei } from '@react-three/drei'

const Grid = () => (
  // <GridDrei rotation={[Math.PI / 2, 0, 0]} position={[0,0,-10]} cellColor={'#505050'} sectionColor="#303030" infiniteGrid followCamera />
  <GridDrei rotation={[0, Math.PI / 2, 0]}  enderOrder={-1} position={[0, 0, -3]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3} sectionThickness={1.5} sectionColor={[0.5, 0.5, 10]} fadeDistance={30} />
)


export { Grid }
