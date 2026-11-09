import { cn } from '@/utils/cn'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'card' | 'image' | 'circle'
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  const variants = {
    text: 'h-4 w-full rounded',
    card: 'h-48 w-full rounded-2xl',
    image: 'h-64 w-full rounded-2xl',
    circle: 'h-12 w-12 rounded-full',
  }

  return (
    <div
      className={cn(
        'animate-pulse bg-white/5',
        variants[variant],
        className
      )}
    />
  )
}
