import { useEffect, useState } from 'react'
import { FiCode, FiServer, FiMonitor, FiCpu } from 'react-icons/fi'
import { personalInfo } from '@/data/personal'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const [ref, isInView] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.5 })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [isInView, target])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-gradient" style={{ fontFamily: 'var(--font-display)' }}>
        {count}{suffix}
      </div>
    </div>
  )
}

const stats = [
  { label: 'Projects Completed', target: personalInfo.stats.projects, icon: <FiCode size={20} />, color: '#00E5FF' },
  { label: 'Technologies', target: personalInfo.stats.technologies, icon: <FiServer size={20} />, color: '#7B61FF' },
  { label: 'Certifications', target: personalInfo.stats.certifications, icon: <FiMonitor size={20} />, color: '#00FFFF' },
  { label: 'Learning Hours', target: 2000, suffix: '+', icon: <FiCpu size={20} />, color: '#FF6B9D' },
]

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-accent uppercase tracking-widest mb-4">
            Who I Am
          </span>
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            {personalInfo.about.split('\n\n').map((paragraph, i) => (
              <p key={i} className="text-text-secondary leading-relaxed text-base md:text-lg">
                {paragraph}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 pt-4">
              {['React', '.NET', 'C#', 'Three.js', 'Linux', 'Git'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg glass text-xs font-mono text-accent/80 border border-accent/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-2xl p-6 text-center group hover:neon-glow transition-all duration-500 relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 w-16 h-16 blur-xl"
                    style={{ background: `radial-gradient(circle, ${stat.color}, transparent)` }}
                  />
                  <div
                    className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: `${stat.color}15`, color: stat.color }}
                  >
                    {stat.icon}
                  </div>
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  <p className="text-sm text-text-secondary mt-2 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
