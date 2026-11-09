import { cn } from '@/utils/cn'

interface BadgeProps {
  children: string
  className?: string
  color?: string
}

export function Badge({ children, className, color }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-medium border transition-all duration-300 hover:scale-105',
        className
      )}
      style={{
        borderColor: color ? `${color}30` : 'rgba(255,255,255,0.08)',
        backgroundColor: color ? `${color}10` : 'rgba(255,255,255,0.03)',
        color: color || undefined,
      }}
    >
      {children}
    </span>
  )
}
