import Noise from "@/assets/vectors/noise.svg"

const Overlay = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 opacity-5 [&>svg]:h-full [&>svg]:w-full">
      <Noise/>
    </div>
  )
}

export { Overlay }
