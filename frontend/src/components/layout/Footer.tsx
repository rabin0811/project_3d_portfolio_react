import { FiGithub, FiLinkedin, FiInstagram, FiHeart, FiArrowUp } from 'react-icons/fi'
import { FaFacebook, FaWhatsapp } from 'react-icons/fa'
import { personalInfo, socialLinks } from '@/data/personal'
import { navLinks } from '@/data/navigation'

const iconMap: Record<string, React.ReactNode> = {
  FaGithub: <FiGithub size={18} />,
  FaLinkedin: <FiLinkedin size={18} />,
  FaFacebook: <FaFacebook size={18} />,
  FaInstagram: <FiInstagram size={18} />,
  FaWhatsapp: <FaWhatsapp size={18} />,
}

export function Footer() {
  const scrollToSection = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/5 bg-bg">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gradient-full mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              {personalInfo.name}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              {personalInfo.role} at {personalInfo.institution}. Building modern web experiences with passion and precision.
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:neon-glow transition-all duration-300"
                >
                  {iconMap[link.icon] || <FiGithub size={18} />}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-text-secondary hover:text-accent hover:translate-x-1 transition-all duration-300 text-left flex items-center gap-1.5"
                >
                  <span className="w-1 h-1 rounded-full bg-accent/40" />
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
              Get In Touch
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-text-secondary">
                Open to opportunities and collaborations. Let's build something amazing together.
              </p>
              <a
                href="https://wa.me/9779762342058"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm hover:bg-accent/20 transition-colors"
              >
                <FaWhatsapp size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary flex items-center gap-1.5">
            &copy; {new Date().getFullYear()} {personalInfo.name}. Crafted with
            <FiHeart size={12} className="text-accent-warm" />
            and lots of coffee.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors"
          >
            Back to top <FiArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
