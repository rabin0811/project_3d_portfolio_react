import { useImageCycle } from '@/hooks/useImageCycle'
import { useTilt } from '@/hooks/useTilt'

export function ProfileImage() {
  const { currentImage, isLoading } = useImageCycle({ folder: '/images/profile' })
  const { ref, handleMouseMove, handleMouseLeave } = useTilt<HTMLDivElement>({ maxTilt: 15, scale: 1.05 })

  if (isLoading || !currentImage) {
    return (
      <div className="w-64 h-64 rounded-2xl bg-white/5 animate-pulse relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/20 to-accent-secondary/20 blur-xl" />
        <div className="relative w-full h-full rounded-2xl glass-strong p-1">
          <div className="w-full h-full rounded-xl bg-gradient-to-br from-accent/5 to-accent-secondary/5 flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="perspective-1000">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-64 h-64 preserve-3d cursor-pointer"
      >
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-accent/30 via-accent-secondary/30 to-accent/30 blur-2xl" />
        <div className="absolute -inset-2 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] bg-gradient-to-r from-accent/20 to-accent-secondary/20 blur-xl" />

        <div className="relative w-full h-full rounded-2xl overflow-hidden glass-strong neon-glow p-1 bg-bg/50">
          <div className="w-full h-full rounded-xl overflow-hidden">
            <img src={currentImage} alt="Rabin Humagain" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>

        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-accent rounded-tl-lg" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-accent-secondary rounded-tr-lg" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-accent-secondary rounded-bl-lg" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-accent rounded-br-lg" />
      </div>
    </div>
  )
}
