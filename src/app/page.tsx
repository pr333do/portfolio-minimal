import { Logo } from '@/components/models/Logo'
import { Canvas } from '@/libs/three/components/Canvas'
import { Grid } from '@/libs/three/components/Grid'

export default function Home() {
  return (
    <main className="">
      <Canvas className='pointer-events-auto absolute  inset-0' orbit={false}>
        <Logo/>
        <Grid/>
      </Canvas>
    </main>
  )
}
