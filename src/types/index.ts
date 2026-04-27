export interface ProgressSkill {
  id: string
  name: string
  description: string
  percentage: number
}

export interface TechIcon {
  id: string
  name: string
  icon: string
}

export interface Project {
  id: string
  name: string
  subtitle: string
  year: string
  category: string
  tech: string[]
  description: string
  image: string
  imageAlt: string
  repoUrl?: string
  liveUrl?: string
}

export interface SocialLink {
  id: string
  name: string
  url: string
  icon: string
  imageAlt: string
}
