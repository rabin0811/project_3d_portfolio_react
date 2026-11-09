import { FiBookOpen, FiAward, FiTarget } from 'react-icons/fi'
import { educationList } from '@/data/education'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const eduIcons = [
  <FiBookOpen size={20} />,
  <FiAward size={20} />,
  <FiTarget size={20} />,
]

function TimelineItem({
  education,
  index,
}: {
  education: (typeof educationList)[0]
  index: number
}) {
  const [ref, isInView] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 })
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={`relative flex items-center gap-8 mb-12 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col md:flex-row`}
    >
      <div className="flex-1">
        <div className="glass rounded-2xl p-6 hover:neon-glow transition-all duration-500 group relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent to-accent-secondary opacity-50 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
              {eduIcons[index] || <FiBookOpen size={20} />}
            </div>
            <div>
              <span className="text-xs font-mono text-accent tracking-wider uppercase">
                {education.period}
              </span>
            </div>
          </div>
          <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{education.degree}</h3>
          <p className="text-text-secondary mt-1 font-medium">{education.institution}</p>
          <p className="text-sm text-text-secondary/70 mt-3 leading-relaxed">{education.description}</p>
        </div>
      </div>

      <div className="relative flex items-center justify-center w-8">
        <div className="w-4 h-4 rounded-full bg-accent shadow-[0_0_12px_rgba(0,229,255,0.5)] z-10 ring-4 ring-bg" />
        <div className="absolute top-4 w-[2px] h-full bg-gradient-to-b from-accent/50 via-accent-secondary/30 to-transparent" />
      </div>

      <div className="flex-1 hidden md:block" />
    </div>
  )
}

export function EducationTimeline() {
  return (
    <section id="education" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-accent uppercase tracking-widest mb-4">
            My Journey
          </span>
          <h2 className="section-title">
            Education <span className="text-gradient">Timeline</span>
          </h2>
        </div>

        <div className="mt-16 relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent via-accent-secondary to-accent/10 -translate-x-1/2" />
          {educationList.map((edu, i) => (
            <TimelineItem key={edu.degree} education={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
