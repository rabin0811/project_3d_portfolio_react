import { type ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function Button({ children, variant = 'primary', size = 'md', href, onClick, className, type = 'button', disabled = false }: ButtonProps) {
  const baseStyles = 'relative inline-flex items-center gap-2 font-medium rounded-xl transition-all duration-300 cursor-pointer border overflow-hidden group'

  const variants = {
    primary: 'bg-accent text-bg border-accent hover:shadow-[0_0_25px_rgba(0,229,255,0.35)] hover:bg-accent/90 font-semibold',
    secondary: 'border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/60 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)]',
    ghost: 'border-transparent text-text-secondary hover:text-text-primary hover:bg-white/5',
  }

  const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3 text-sm', lg: 'px-8 py-4 text-base' }

  const content = (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </span>
  )

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>
  return <button type={type} onClick={onClick} disabled={disabled} className={disabled ? 'opacity-70 cursor-wait' : undefined}>{content}</button>
}
