import { useState, useEffect } from 'react'
import { HiMenu, HiX } from 'react-icons/hi'
import { navLinks } from '@/data/navigation'
import { cn } from '@/utils/cn'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navLinks.filter(l => l.href.startsWith('#')).map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(sections[i])
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const id = href.replace('#', '')
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = href
    }
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled ? 'glass-strong py-3 shadow-lg shadow-black/20' : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={() => handleNavClick('#hero')}
            className="relative text-xl font-bold"
          >
            <span className="text-gradient-full">RH</span>
            <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent-secondary rounded-full" />
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '')
              const isActive = link.href.startsWith('#') && activeSection === sectionId
              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    'relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                    isActive ? 'text-accent bg-accent/10 border border-accent/20' : 'text-text-secondary hover:text-text-primary'
                  )}
                >
                  {link.label}
                </button>
              )
            })}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-text-primary p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center md:hidden bg-bg/95 backdrop-blur-xl">
          <div className="relative z-10 flex flex-col items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-2xl font-medium py-3 px-8 rounded-xl text-text-secondary hover:text-accent hover:bg-accent/5 transition-all duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
