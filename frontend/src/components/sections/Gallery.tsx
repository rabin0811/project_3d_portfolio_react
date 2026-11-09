import { useState } from 'react'
import { FiImage } from 'react-icons/fi'

const categories = ['All', 'Development', 'Design', 'Projects']

const placeholderItems = [
  { id: 1, title: 'Web Application', category: 'Development', aspect: 'aspect-[4/3]' },
  { id: 2, title: 'UI Design', category: 'Design', aspect: 'aspect-square' },
  { id: 3, title: '3D Portfolio', category: 'Projects', aspect: 'aspect-[3/4]' },
  { id: 4, title: 'API Dashboard', category: 'Development', aspect: 'aspect-[4/3]' },
  { id: 5, title: 'Mobile View', category: 'Design', aspect: 'aspect-[3/4]' },
  { id: 6, title: 'Open Source', category: 'Projects', aspect: 'aspect-square' },
]

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? placeholderItems
    : placeholderItems.filter(item => item.category === activeCategory)

  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-accent uppercase tracking-widest mb-4">Portfolio</span>
          <h2 className="section-title"><span className="text-gradient">Gallery</span></h2>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent text-bg shadow-lg shadow-accent/25'
                  : 'glass text-text-secondary hover:text-accent hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="glass rounded-2xl overflow-hidden break-inside-avoid group hover:neon-glow transition-all duration-500"
            >
              <div className={`${item.aspect} bg-gradient-to-br from-accent/10 via-accent-secondary/5 to-transparent flex items-center justify-center relative`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,229,255,0.08),transparent_60%)]" />
                <div className="flex flex-col items-center gap-3 opacity-30 group-hover:opacity-50 transition-opacity">
                  <FiImage size={32} className="text-accent" />
                  <span className="text-xs text-text-secondary font-mono">{item.category}</span>
                </div>
              </div>
              <div className="p-4">
                <h4 className="text-sm font-semibold group-hover:text-accent transition-colors">{item.title}</h4>
                <p className="text-xs text-text-secondary/60 mt-1">
                  Add images to <code className="text-accent text-xs">/images/gallery/</code>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
