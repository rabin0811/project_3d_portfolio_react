import { useState, useEffect } from 'react'
import { FiArrowUp } from 'react-icons/fi'

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full glass-strong text-accent hover:neon-glow-strong transition-all duration-300 cursor-pointer group"
    >
      <FiArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/10 to-accent-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  )
}
