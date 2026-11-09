import { cn } from '@/utils/cn'

interface NeonTextProps {
  children: string
  as?: 'h1' | 'h2' | 'h3' | 'span'
  className?: string
}

export function NeonText({ children, as: Tag = 'span', className }: NeonTextProps) {
  return (
    <Tag
      className={cn(
        'text-gradient font-bold tracking-tight',
        className
      )}
    >
      {children}
    </Tag>
  )
}
