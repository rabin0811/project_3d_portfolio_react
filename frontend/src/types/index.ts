export interface Skill {
  name: string
  level: number
  color: string
  icon?: string
}

export interface SkillCategory {
  title: string
  skills: Skill[]
}

export interface Education {
  degree: string
  institution: string
  period: string
  description: string
}

export interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  github?: string
  liveDemo?: string
  image?: string
}

export interface Certification {
  title: string
  issuer: string
  date: string
  description: string
  image?: string
  link?: string
}

export interface NavLink {
  label: string
  href: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}
