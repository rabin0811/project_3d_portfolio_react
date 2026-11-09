import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface GlassCardProps {
  children: ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
}

export function GlassCard({ children, className, glow, hover }: GlassCardProps) {
  return (
    <div
      className={cn(
        'glass rounded-2xl p-6 transition-all duration-300',
        glow && 'neon-glow',
        hover && 'cursor-pointer hover:-translate-y-2 hover:scale-[1.02]',
        className
      )}
    >
      {children}
    </div>
  )
}
