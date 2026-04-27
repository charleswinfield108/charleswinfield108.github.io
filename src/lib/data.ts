import type { ProgressSkill, TechIcon, Project, SocialLink } from '../types'

export const BIO = {
  name: 'Charles Winfield',
  tagline: 'I Create Scalable Digital Products with AI, Experience, and Skill',
  intro:
    'A Full-Stack Developer with a passion for building clean, performant web applications. Trained across 16 modules of intensive full-stack development, I bring both technical depth and creative problem-solving to every project I touch.',
  about:
    "I'm a Full-Stack Developer based in Canada, with experience building end-to-end web applications using modern JavaScript frameworks, relational and non-relational databases, and cloud-based backend services. My journey through the CodeBoxx Full-Stack Development Program has given me hands-on experience with real-world client simulations — from corporate websites to food delivery platforms. I'm passionate about writing clean, maintainable code and creating digital experiences that are fast, accessible, and intuitive.",
}

export const PROGRESS_SKILLS: ProgressSkill[] = [
  { id: 'frontend', name: 'Frontend Development', percentage: 85 },
  { id: 'backend', name: 'Backend Development', percentage: 75 },
  { id: 'database', name: 'Database & API Design', percentage: 72 },
  { id: 'uiux', name: 'UI / UX Design', percentage: 65 },
]

export const TECH_STACK: TechIcon[] = [
  { id: 'js',         name: 'JavaScript', icon: '/assets/icons/javascript-original.svg' },
  { id: 'ts',         name: 'TypeScript', icon: '/assets/icons/typescript-original.svg' },
  { id: 'react',      name: 'React',      icon: '/assets/icons/react.svg' },
  { id: 'nextjs',     name: 'Next.js',    icon: '/assets/icons/nextjs-original-wordmark_wht.svg' },
  { id: 'nodejs',     name: 'Node.js',    icon: '/assets/icons/nodejs-plain-wordmark.svg' },
  { id: 'express',    name: 'Express',    icon: '/assets/icons/express-original-wordmark.svg' },
  { id: 'html',       name: 'HTML5',      icon: '/assets/icons/html5-plain-wordmark.svg' },
  { id: 'bootstrap',  name: 'Bootstrap',  icon: '/assets/icons/bootstrap-original-wordmark.svg' },
  { id: 'tailwind',   name: 'Tailwind',   icon: '/assets/icons/tailwindcss-original-wordmark_wht.svg' },
  { id: 'mongodb',    name: 'MongoDB',    icon: '/assets/icons/mongodb-original-wordmark.svg' },
  { id: 'supabase',   name: 'Supabase',   icon: '/assets/icons/supabase-plain-wordmark_wht.svg' },
  { id: 'redux',      name: 'Redux',      icon: '/assets/icons/redux-original.svg' },
  { id: 'vite',       name: 'Vite',       icon: '/assets/icons/vitejs-original.svg' },
]

export const SOFT_SKILLS = [
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    description:
      'I approach every challenge methodically — breaking complex requirements into testable, incremental steps that ship on time.',
  },
  {
    id: 'communication',
    name: 'Communication',
    description:
      'I communicate clearly with both technical teammates and non-technical stakeholders, keeping everyone aligned and informed.',
  },
  {
    id: 'adaptability',
    name: 'Adaptability',
    description:
      'Comfortable switching between languages, frameworks, and problem domains — I thrive in fast-moving environments.',
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'rocket-elevators',
    name: 'Rocket Elevators',
    category: 'Corporate Website',
    tech: ['React', 'Node.js', 'MySQL', 'REST API'],
    description:
      'A full-stack corporate web application for a fictional elevator company. Features a customer portal, elevator monitoring dashboard, and a complete REST API serving data to web and mobile clients.',
    image: '',
    imageAlt: 'Rocket Elevators corporate website preview',
    repoUrl: 'https://github.com/charleswinfield108',
  },
  {
    id: 'codebloggs',
    name: 'CodeBloggs',
    category: 'Blog Platform',
    tech: ['React', 'Express', 'MongoDB', 'Redux'],
    description:
      'A developer-focused blogging platform with full CRUD operations, user authentication, and a rich text editor. Built with a RESTful Express API and a React frontend powered by Redux state management.',
    image: '',
    imageAlt: 'CodeBloggs blog platform preview',
    repoUrl: 'https://github.com/charleswinfield108',
  },
  {
    id: 'rocket-food',
    name: 'Rocket Food Delivery',
    category: 'Mobile + Web App',
    tech: ['React Native', 'Node.js', 'PostgreSQL'],
    description:
      'A food delivery application with real-time order tracking, restaurant listings, and a courier management back office. Delivered as a cross-platform mobile app with a companion web admin dashboard.',
    image: '',
    imageAlt: 'Rocket Food Delivery app preview',
    repoUrl: 'https://github.com/charleswinfield108',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com/charleswinfield108',
    icon: '/assets/icons/github-original-wordmark_wht.svg',
    imageAlt: 'Charles Winfield on GitHub',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/charles-winfield',
    icon: '/assets/icons/javascript-original.svg',
    imageAlt: 'Charles Winfield on LinkedIn',
  },
]
