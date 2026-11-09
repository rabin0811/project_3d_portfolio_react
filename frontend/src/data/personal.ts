import type { SocialLink } from '@/types'

export const personalInfo = {
  name: 'Rabin Humagain',
  shortName: 'Rabin',
  role: 'Computer Engineering Student',
  institution: 'ISMT College',
  institutionPeriod: '2081–Present',
  titles: [
    'Full Stack Developer',
    'Backend Enthusiast',
    'Linux Learner',
    'Computer Engineering Student',
  ],
  description:
    'Passionate Computer Engineering student focused on modern web development, backend systems, Linux environments, networking, and continuous learning.',
  about: `I'm a passionate Computer Engineering student at ISMT College with a deep love for building modern web applications and exploring backend systems. My journey started with curiosity about how websites work, which led me to dive into full-stack development.

I specialize in .NET and C# for building robust backend solutions, while crafting immersive frontend experiences with modern tools. Beyond coding, I'm an avid Linux learner and enjoy understanding how systems work at a fundamental level.

When I'm not coding, you'll find me exploring networking concepts, troubleshooting hardware, or contributing to open-source projects. I believe in continuous learning and strive to push the boundaries of what I can create.`,
  stats: {
    projects: 12,
    technologies: 15,
    certifications: 2,
    learningHours: 2000,
  },
}

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/rabin0811', icon: 'FaGithub' },
  { platform: 'LinkedIn', url: 'https://np.linkedin.com/in/rabin-humagain-417a35410', icon: 'FaLinkedin' },
  { platform: 'Facebook', url: 'https://facebook.com/rabin.humagai', icon: 'FaFacebook' },
  { platform: 'Instagram', url: 'https://instagram.com/ra_bin', icon: 'FaInstagram' },
  { platform: 'WhatsApp', url: 'https://wa.me/9779762342058', icon: 'FaWhatsapp' },
]
