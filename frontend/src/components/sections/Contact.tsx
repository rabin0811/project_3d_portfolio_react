import { useState, type FormEvent } from 'react'
import { Canvas } from '@react-three/fiber'
import { FiSend, FiCheck, FiMapPin, FiMail, FiPhone } from 'react-icons/fi'
import { ContactScene } from '@/components/three/ContactScene'
import { Button } from '@/components/ui/Button'
import { useDeviceTier } from '@/hooks/useDeviceTier'
import { personalInfo } from '@/data/personal'

export function Contact() {
  const { config } = useDeviceTier()
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError('')

    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'http://localhost:5000'
      const message = form.subject.trim()
        ? `${form.subject.trim()}\n\n${form.message}`
        : form.message

      const response = await fetch(`${apiBase.replace(/\/$/, '')}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message }),
      })

      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || 'Unable to send your message right now.')
      }

      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch (submitError) {
      setStatus('error')
      setError(submitError instanceof Error ? submitError.message : 'Unable to send your message right now.')
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-mono text-accent uppercase tracking-widest mb-4">Let's Talk</span>
          <h2 className="section-title">Get In <span className="text-gradient">Touch</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <InputField label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
                <InputField label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
              </div>
              <InputField label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/30 focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === 'sending'}>
                {status === 'sent' ? <><FiCheck size={18} /> Sent Successfully</> : status === 'sending' ? <><FiSend size={18} /> Sending...</> : <><FiSend size={18} /> Send Message</>}
              </Button>
              {status === 'error' && (
                <p className="text-sm text-red-400" role="alert">{error}</p>
              )}
            </form>

            <div className="flex flex-wrap gap-4 mt-8">
              {[
                { icon: <FiMail size={16} />, text: personalInfo.name.toLowerCase().replace(' ', '.') + '@email.com' },
                { icon: <FiPhone size={16} />, text: '+977 9762342058' },
                { icon: <FiMapPin size={16} />, text: 'Nepal' },
              ].map((info) => (
                <div key={info.text} className="flex items-center gap-2 text-sm text-text-secondary">
                  <span className="text-accent">{info.icon}</span>
                  {info.text}
                </div>
              ))}
            </div>
          </div>

          <div className="h-[400px] lg:h-auto rounded-2xl overflow-hidden glass relative">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={config.pixelRatio}>
              <ContactScene />
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  )
}

function InputField({ label, type = 'text', value, onChange, required }: {
  label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text-secondary mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/30 focus:outline-none focus:border-accent/50 focus:bg-white/[0.05] transition-all duration-300"
        placeholder={`Your ${label.toLowerCase()}`}
      />
    </div>
  )
}
