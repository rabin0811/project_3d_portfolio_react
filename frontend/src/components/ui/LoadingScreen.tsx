import { useEffect, useState } from 'react'
import { useUIStore } from '@/store/useUIStore'

export function LoadingScreen() {
  const { isLoading, setLoading } = useUIStore()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setLoading(false), 400)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
    return () => clearInterval(interval)
  }, [setLoading])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent-secondary/5 rounded-full blur-[60px]" />
      </div>

      <div className="relative mb-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gradient-full" style={{ fontFamily: 'var(--font-display)' }}>
          Rabin
        </h1>
        <p className="text-lg text-text-secondary font-mono text-center mt-2 tracking-widest">HUMAGAIN</p>
      </div>

      <div className="w-64 relative">
        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full relative"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: 'linear-gradient(90deg, #00E5FF, #7B61FF)',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
        <p className="mt-4 text-xs text-text-secondary/50 font-mono text-center tracking-wider">
          {Math.round(Math.min(progress, 100))}%
        </p>
      </div>
    </div>
  )
}
