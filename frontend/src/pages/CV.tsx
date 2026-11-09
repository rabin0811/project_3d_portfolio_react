import { useEffect } from 'react'
import { FiDownload, FiGithub, FiLinkedin, FiGlobe, FiMapPin, FiPhone, FiMail } from 'react-icons/fi'
import { resumeData } from '@/data/resume'
import { Button } from '@/components/ui/Button'

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="text-lg font-bold text-accent border-b border-white/10 pb-2 mb-4 uppercase tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
      {children}
    </h2>
  )
}

export function CV() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-bg pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 md:p-12 print:shadow-none print:bg-white print:text-black">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8 print:mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white print:text-black" style={{ fontFamily: 'var(--font-display)' }}>
                {resumeData.name}
              </h1>
              <p className="text-lg text-accent print:text-blue-700 mt-1" style={{ fontFamily: 'var(--font-display)' }}>
                {resumeData.title}
              </p>
              <div className="flex flex-wrap gap-3 mt-3 text-sm text-text-secondary print:text-gray-600">
                <span className="flex items-center gap-1"><FiMapPin size={14} /> {resumeData.location}</span>
                <span className="flex items-center gap-1"><FiMail size={14} /> {resumeData.email}</span>
                <span className="flex items-center gap-1"><FiPhone size={14} /> {resumeData.phone}</span>
              </div>
            </div>
            <div className="flex gap-3 print:hidden">
              <Button variant="primary" size="sm" onClick={() => window.print()}>
                <FiDownload size={16} /> Download PDF
              </Button>
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'}>
                Back to Portfolio
              </Button>
            </div>
          </div>

          <div className="flex gap-4 mb-8 text-sm">
            <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-text-secondary hover:text-accent print:text-gray-600 print:no-underline transition-colors">
              <FiGithub size={16} /> GitHub
            </a>
            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-text-secondary hover:text-accent print:text-gray-600 print:no-underline transition-colors">
              <FiLinkedin size={16} /> LinkedIn
            </a>
            <a href={resumeData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-text-secondary hover:text-accent print:text-gray-600 print:no-underline transition-colors">
              <FiGlobe size={16} /> Portfolio
            </a>
          </div>

          <div className="mb-8">
            <SectionTitle>Professional Summary</SectionTitle>
            <p className="text-text-secondary print:text-gray-700 leading-relaxed text-sm">{resumeData.summary}</p>
          </div>

          <div className="mb-8">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.title}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                    <h3 className="font-semibold text-white print:text-black">{exp.title}</h3>
                    <span className="text-xs text-text-secondary print:text-gray-500 font-mono">{exp.period}</span>
                  </div>
                  <p className="text-sm text-accent print:text-blue-700 mb-2">{exp.company}</p>
                  <ul className="list-disc list-inside space-y-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-sm text-text-secondary print:text-gray-700 leading-relaxed">{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <SectionTitle>Education</SectionTitle>
            <div className="space-y-4">
              {resumeData.education.map((edu) => (
                <div key={edu.degree} className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white print:text-black text-sm">{edu.degree}</h3>
                    <p className="text-xs text-text-secondary print:text-gray-600">{edu.school} — {edu.details}</p>
                  </div>
                  <span className="text-xs text-text-secondary print:text-gray-500 font-mono mt-1 sm:mt-0">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <SectionTitle>Skills</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {resumeData.skills.map((group) => (
                <div key={group.category}>
                  <h3 className="text-sm font-semibold text-white print:text-black mb-2">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span key={skill} className="text-xs px-3 py-1 rounded-full glass print:bg-gray-100 print:text-gray-700 print:border print:border-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <SectionTitle>Certifications</SectionTitle>
            <div className="space-y-3">
              {resumeData.certifications.map((cert) => (
                <div key={cert.name} className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white print:text-black text-sm">{cert.name}</h3>
                    <p className="text-xs text-text-secondary print:text-gray-600">{cert.issuer} — {cert.description}</p>
                  </div>
                  <span className="text-xs text-text-secondary print:text-gray-500 font-mono mt-1 sm:mt-0">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <SectionTitle>Projects</SectionTitle>
            <div className="space-y-4">
              {resumeData.projects.map((project) => (
                <div key={project.name}>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white print:text-black text-sm">{project.name}</h3>
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full glass print:bg-gray-100 print:text-gray-600">{t}</span>
                    ))}
                  </div>
                  <p className="text-xs text-text-secondary print:text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <SectionTitle>Languages</SectionTitle>
              <div className="flex gap-3">
                {resumeData.languages.map((lang) => (
                  <span key={lang} className="text-text-secondary print:text-gray-700">{lang}</span>
                ))}
              </div>
            </div>
            <div>
              <SectionTitle>Interests</SectionTitle>
              <div className="flex flex-wrap gap-2">
                {resumeData.interests.map((int) => (
                  <span key={int} className="text-text-secondary print:text-gray-700">{int}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
