import { useState, useEffect } from 'react'
import { FiGithub, FiStar, FiGitBranch, FiArrowUpRight } from 'react-icons/fi'

interface Repo {
  id: number
  name: string
  description: string
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string
}

export function GitHubSection() {
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.github.com/users/rabin0811/repos?sort=updated&per_page=6')
      .then((res) => res.json())
      .then((data) => {
        setRepos(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <section id="github" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-secondary/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-accent uppercase tracking-widest mb-4">Open Source</span>
          <h2 className="section-title"><span className="text-gradient">GitHub</span> Activity</h2>
        </div>

        <div className="text-center mb-8">
          <a
            href="https://github.com/rabin0811"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass text-sm text-text-secondary hover:text-accent hover:neon-glow transition-all duration-300"
          >
            <FiGithub size={18} />
            <span>github.com/rabin0811</span>
            <FiArrowUpRight size={14} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass rounded-2xl p-6 animate-pulse h-36">
                  <div className="h-4 w-1/2 bg-white/5 rounded mb-3" />
                  <div className="h-3 w-full bg-white/5 rounded mb-2" />
                  <div className="h-3 w-3/4 bg-white/5 rounded" />
                </div>
              ))
            : repos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-2xl p-6 hover:neon-glow transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-sm group-hover:text-accent transition-colors truncate pr-4" style={{ fontFamily: 'var(--font-display)' }}>
                      {repo.name}
                    </h3>
                    <FiArrowUpRight className="text-text-secondary shrink-0 group-hover:text-accent transition-colors" size={16} />
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 mb-4">
                    {repo.description || 'No description available'}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: getLangColor(repo.language) }} />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1"><FiStar size={12} /> {repo.stargazers_count}</span>
                    <span className="flex items-center gap-1"><FiGitBranch size={12} /> {repo.forks_count}</span>
                  </div>
                </a>
              ))}
        </div>
      </div>
    </section>
  )
}

function getLangColor(lang: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    'C#': '#239120',
    CSS: '#1572B6',
    HTML: '#E44D26',
    Python: '#3572A5',
    Shell: '#89E051',
    Ruby: '#CC342D',
    Go: '#00ADD8',
    Rust: '#DEA584',
  }
  return colors[lang] || '#FFFFFF'
}
