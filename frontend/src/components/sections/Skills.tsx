import { FiTerminal, FiLayout, FiTool, FiServer, FiWifi } from 'react-icons/fi'
import { skillCategories } from '@/data/skills'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <FiLayout size={20} />,
  'Backend & Programming': <FiTerminal size={20} />,
  'Tools & Platforms': <FiTool size={20} />,
  Systems: <FiServer size={20} />,
  'Networking & Hardware': <FiWifi size={20} />,
}

function SkillCard({ name, level, color }: { name: string; level: number; color: string }) {
  const [ref, isInView] = useIntersectionObserver<HTMLDivElement>()

  return (
    <div ref={ref} className="glass rounded-xl p-5 group cursor-pointer transition-all duration-300 hover:neon-glow relative overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-medium text-sm text-text-primary group-hover:text-white transition-colors">{name}</span>
        <span className="text-xs font-mono text-text-secondary/70">{level}%</span>
      </div>

      <div className="h-2 rounded-full bg-white/5 overflow-hidden relative">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: isInView ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 12px ${color}66`,
          }}
        />
      </div>

      <div
        className="absolute -bottom-2 -right-2 w-16 h-16 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
      />
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-secondary/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-accent uppercase tracking-widest mb-4">What I Know</span>
          <h2 className="section-title">Skills & <span className="text-gradient">Expertise</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div key={category.title} className="glass rounded-2xl p-6 hover:neon-glow transition-all duration-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  {categoryIcons[category.title] || <FiTerminal size={20} />}
                </div>
                <h3 className="text-lg font-semibold text-accent" style={{ fontFamily: 'var(--font-display)' }}>
                  {category.title}
                </h3>
              </div>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} name={skill.name} level={skill.level} color={skill.color} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
