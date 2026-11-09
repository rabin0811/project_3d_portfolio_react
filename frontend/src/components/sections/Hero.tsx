import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { FiArrowDown } from 'react-icons/fi'
import { FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa'
import { HeroScene } from '@/components/three/HeroScene'
import { ProfileImage } from '@/components/profile/ProfileImage'
import { Button } from '@/components/ui/Button'
import { personalInfo, socialLinks } from '@/data/personal'
import { useDeviceTier } from '@/hooks/useDeviceTier'

function Typewriter({ titles }: { titles: string[] }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = titles[index]
    let timeout: number

    if (!deleting && text === current) {
      timeout = window.setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % titles.length)
    } else {
      timeout = window.setTimeout(
        () => setText(deleting ? current.slice(0, -1) : current.slice(0, text.length + 1)),
        deleting ? 40 : 80
      )
    }

    return () => window.clearTimeout(timeout)
  }, [text, deleting, index, titles])

  return (
    <span className="text-gradient-full">
      {text}
      <span className="animate-pulse text-accent">|</span>
    </span>
  )
}

export function Hero() {
  const { config } = useDeviceTier()

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 mesh-gradient opacity-60" />
      </div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={config.pixelRatio}
          gl={{ antialias: true, alpha: true }}
        >
          <HeroScene />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/30 to-bg pointer-events-none z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs font-mono text-text-secondary tracking-wider uppercase">Available for opportunities</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 leading-[1.05]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Hi, I'm{' '}
              <span className="text-gradient-full">{personalInfo.name.split(' ')[0]}</span>
              <br />
              <span className="text-white/90">{personalInfo.name.split(' ').slice(1).join(' ')}</span>
            </h1>

            <div className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 h-12" style={{ fontFamily: 'var(--font-display)' }}>
              <Typewriter titles={personalInfo.titles} />
            </div>

            <p className="text-text-secondary text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              {personalInfo.description}
            </p>

            <div className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8">
              {[
                { value: `${personalInfo.stats.projects}+`, label: 'Projects' },
                { value: `${personalInfo.stats.technologies}+`, label: 'Technologies' },
                { value: `${personalInfo.stats.learningHours}+`, label: 'Hours Learned' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                  <div className="text-xs text-text-secondary font-mono uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                variant="primary"
                size="lg"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Projects
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Me
              </Button>
              <Button variant="ghost" size="lg" href="/cv">
                View Resume
              </Button>
            </div>

            <div className="flex gap-3 justify-center lg:justify-start mt-8">
              <a
                href={socialLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:neon-glow transition-all duration-300"
              >
                <FaGithub size={18} />
              </a>
              <a
                href={socialLinks[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:neon-glow transition-all duration-300"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={socialLinks[4].url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-text-secondary hover:text-accent hover:neon-glow transition-all duration-300"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full border border-accent/10" />
            <div className="absolute -inset-16 rounded-full border border-accent-secondary/5" />
            <ProfileImage />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] font-mono text-text-secondary/50 uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center pt-1.5">
          <div className="w-[2px] bg-accent rounded-full" style={{ height: '8px' }} />
        </div>
      </div>
    </section>
  )
}
