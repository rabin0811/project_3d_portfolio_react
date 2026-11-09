import { useState } from 'react'
import { FiDownload, FiX, FiExternalLink, FiCheckCircle } from 'react-icons/fi'
import { certifications } from '@/data/certifications'

export function Certifications() {
  const [selectedCert, setSelectedCert] = useState<(typeof certifications)[0] | null>(null)

  return (
    <section id="certifications" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-accent uppercase tracking-widest mb-4">Credentials</span>
          <h2 className="section-title"><span className="text-gradient">Certifications</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-3xl mx-auto">
          {certifications.map((cert, i) => (
            <CertificationCard key={i} cert={cert} onClick={() => setSelectedCert(cert)} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="glass-strong rounded-2xl p-8 max-w-lg w-full relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-secondary" />
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <FiCheckCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{selectedCert.title}</h3>
                  <p className="text-text-secondary text-sm">Issued by {selectedCert.issuer}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-lg hover:bg-white/5 text-text-secondary hover:text-accent transition-all"
              >
                <FiX size={20} />
              </button>
            </div>
            <p className="text-text-secondary/70 text-sm mb-4">{selectedCert.date}</p>
            <p className="text-text-secondary leading-relaxed">{selectedCert.description}</p>
            <button className="mt-6 flex items-center gap-2 text-sm text-accent hover:text-accent-glow transition-colors">
              <FiDownload size={14} /> Download Certificate
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

function CertificationCard({ cert, onClick }: { cert: typeof certifications[0]; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="glass rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:neon-glow group relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
        <FiExternalLink className="text-accent" size={20} />
      </div>
      <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
        {cert.title}
      </h3>
      <p className="text-sm text-text-secondary mb-1">{cert.issuer}</p>
      <p className="text-xs text-text-secondary/50">{cert.date}</p>
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <FiExternalLink className="text-accent" size={14} />
      </div>
    </div>
  )
}
