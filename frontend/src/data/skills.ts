import type { SkillCategory } from '@/types'

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML', level: 90, color: '#E44D26' },
      { name: 'CSS', level: 85, color: '#1572B6' },
      { name: 'JavaScript', level: 80, color: '#F7DF1E' },
    ],
  },
  {
    title: 'Backend & Programming',
    skills: [
      { name: '.NET', level: 75, color: '#512BD4' },
      { name: 'C#', level: 78, color: '#239120' },
      { name: 'OOP', level: 82, color: '#FF6F00' },
      { name: 'CRUD', level: 85, color: '#00BCD4' },
    ],
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', level: 80, color: '#F05032' },
      { name: 'GitHub', level: 82, color: '#FFFFFF' },
    ],
  },
  {
    title: 'Systems',
    skills: [
      { name: 'Windows', level: 85, color: '#0078D6' },
      { name: 'Linux', level: 65, color: '#FCC624' },
    ],
  },
  {
    title: 'Networking & Hardware',
    skills: [
      { name: 'Networking', level: 70, color: '#00E5FF' },
      { name: 'Hardware', level: 75, color: '#7B61FF' },
    ],
  },
]

export const techStack3D = [
  { name: 'HTML', color: '#E44D26', type: 'cube' as const },
  { name: 'CSS', color: '#1572B6', type: 'sphere' as const },
  { name: 'JavaScript', color: '#F7DF1E', type: 'torus' as const },
  { name: 'C#', color: '#239120', type: 'cube' as const },
  { name: '.NET', color: '#512BD4', type: 'sphere' as const },
  { name: 'Git', color: '#F05032', type: 'torus' as const },
  { name: 'GitHub', color: '#FFFFFF', type: 'capsule' as const },
  { name: 'Linux', color: '#FCC624', type: 'cube' as const },
  { name: 'Windows', color: '#0078D6', type: 'sphere' as const },
  { name: 'Networking', color: '#00E5FF', type: 'torus' as const },
]
