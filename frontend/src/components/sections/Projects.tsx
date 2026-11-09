import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { projects } from '@/data/projects'
import { Badge } from '@/components/ui/Badge'

export function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-secondary/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-accent uppercase tracking-widest mb-4">My Work</span>
          <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const gradients = [
              'from-accent/20 via-accent-secondary/10 to-transparent',
              'from-accent-secondary/20 via-accent/10 to-transparent',
              'from-accent/15 via-accent-warm/10 to-transparent',
            ]
            return (
              <div
                key={project.id}
                className="glass rounded-2xl p-6 transition-all duration-500 hover:neon-glow h-full flex flex-col group relative overflow-hidden"
              >
                <div className={`w-full h-44 rounded-xl bg-gradient-to-br ${gradients[0]} mb-4 flex items-center justify-center overflow-hidden relative`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.1),transparent_70%)]" />
                  <div className="text-6xl font-bold text-gradient opacity-15 group-hover:opacity-25 transition-opacity" style={{ fontFamily: 'var(--font-display)' }}>
                    {project.title.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent/50" />
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                  {project.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <Badge key={tech}>{tech}</Badge>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto pt-4 border-t border-white/5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors"
                    >
                      <FiGithub size={14} />
                      <span>Code</span>
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-glow transition-colors"
                    >
                      <FiExternalLink size={14} />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
