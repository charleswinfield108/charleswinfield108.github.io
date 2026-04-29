import type { ProgressSkill, TechIcon, Project, SocialLink, EducationEntry, WorkEntry, ExternalLink } from '../types'

export const BIO = {
  name: 'Charles Winfield',
  tagline: 'I Create Scalable Digital Products with AI, Experience, and Skill',
  intro:
    'A Full-Stack Developer with a passion for building clean, performant web applications. Trained across 16 modules of intensive full-stack development, I bring both technical depth and creative problem-solving to every project I touch.',
  about:
    "I'm a Full-Stack Developer based in Canada, with experience building end-to-end web applications using modern JavaScript frameworks, relational and non-relational databases, and cloud-based backend services. My journey through the CodeBoxx Full-Stack Development Program has given me hands-on experience with real-world client simulations — from corporate websites to food delivery platforms. I'm passionate about writing clean, maintainable code and creating digital experiences that are fast, accessible, and intuitive.",
}

export const PROGRESS_SKILLS: ProgressSkill[] = [
  {
    id: 'frontend',
    name: 'Front End Development',
    description:
      'Building responsive, pixel-perfect interfaces with React, TypeScript, and modern CSS. I translate designs into fast, accessible user experiences with smooth micro-interactions and clean component architecture.',
    percentage: 85,
  },
  {
    id: 'backend',
    name: 'Back End Development',
    description:
      'Designing and building RESTful APIs and server-side logic with Node.js and Express. From authentication systems to data pipelines, I architect back-end solutions that are reliable, secure, and built to scale.',
    percentage: 75,
  },
  {
    id: 'database',
    name: 'Database & API Design',
    description:
      'Modeling relational and document-based schemas with MySQL, PostgreSQL, MongoDB, and Supabase. I design APIs that are intuitive, versioned, and optimised for performance from day one.',
    percentage: 72,
  },
  {
    id: 'uiux',
    name: 'UI / UX Design',
    description:
      'Translating user requirements into wireframes and polished interfaces. I approach every design decision with usability, visual hierarchy, and brand consistency in mind — from concept through to final pixel.',
    percentage: 65,
  },
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
    subtitle: 'Enterprise Elevator Management',
    year: '2024',
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
    subtitle: 'Developer Community Platform',
    year: '2024',
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
    name: 'Rocket Food',
    subtitle: 'Food Delivery Application',
    year: '2023',
    category: 'Mobile + Web App',
    tech: ['React Native', 'Node.js', 'PostgreSQL'],
    description:
      'A food delivery application with real-time order tracking, restaurant listings, and a courier management back office. Delivered as a cross-platform mobile app with a companion web admin dashboard.',
    image: '',
    imageAlt: 'Rocket Food Delivery app preview',
    repoUrl: 'https://github.com/charleswinfield108',
  },
]

export const EDUCATION: EducationEntry[] = [
  {
    id: 'codeboxx',
    institution: 'CodeBoxx Technology',
    program: 'Full Stack MERN Developer',
    startDate: 'Jan 2026',
    endDate: 'Present',
    description:
      'Developing full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js) across 16 intensive modules. Completed 30+ development projects spanning corporate websites, food delivery platforms, mobile apps, and API-driven dashboards.',
  },
  {
    id: 'cscc',
    institution: 'Columbus State Community College',
    program: 'Interactive Multimedia',
    startDate: 'Aug 2012',
    endDate: 'May 2015',
    description:
      'Studied Interactive Multimedia, gaining foundational skills in digital design, web development, and user interface principles that continue to inform my approach to front-end development.',
  },
]

export const WORK_EXPERIENCE: WorkEntry[] = [
  {
    id: 'freelance',
    role: 'Freelance Web Designer',
    organization: 'Freelance',
    startDate: 'Jan 2020',
    endDate: 'Present',
    description:
      'Designed and developed responsive websites for independent clients, agencies, and small businesses across the Columbus, Ohio area and remotely. Worked directly with stakeholders to gather requirements, translate designs into production-ready code, and deliver polished digital experiences on time and within budget.',
  },
  {
    id: 'customer-service',
    role: 'Customer Service Associate',
    organization: 'Various Organizations',
    startDate: 'Oct 2001',
    endDate: 'Jan 2020',
    description:
      'Provided customer-facing support across multiple organizations, developing strong communication, conflict-resolution, and problem-solving skills. Built a consistent track record of reliability and adaptability across diverse industries and team environments.',
  },
  {
    id: 'army',
    role: 'Administrative Sergeant',
    organization: 'US Army',
    startDate: 'Feb 1997',
    endDate: 'Oct 2001',
    description:
      'Served in the United States Army, attaining the rank of Sergeant with an Honorable Discharge. Supported personnel administration and leadership coordination, building strong organizational discipline, team leadership, and the ability to perform under pressure.',
  },
]

export const LINKS: ExternalLink[] = [
  {
    id: 'github',
    title: 'GitHub',
    description:
      'Browse my public repositories, open-source contributions, and the source code behind every project in my portfolio. Most of my work lives here.',
    url: 'https://github.com/charleswinfield108',
    image: '/assets/images/link-github.png',
    imageAlt: 'GitHub profile of Charles Winfield',
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    description:
      'Connect with me professionally. My profile includes my full work history, education, and the story behind my transition into full-stack development.',
    url: 'https://linkedin.com/in/charles-winfield',
    image: '/assets/images/link-linkedin.png',
    imageAlt: 'LinkedIn profile of Charles Winfield',
  },
  {
    id: 'portfolio-live',
    title: 'Live Portfolio',
    description:
      'The deployed version of this portfolio on GitHub Pages — a good starting point for anyone who wants to see my work, skills, and contact information.',
    url: 'https://charleswinfield.github.io',
    image: '/assets/images/link-portfolio.png',
    imageAlt: 'Live portfolio website — charleswinfield.github.io',
  },
  {
    id: 'leetcode',
    title: 'LeetCode',
    description:
      'My LeetCode profile where I practice data structures and algorithms. Solving challenges regularly to sharpen problem-solving skills beyond the full-stack curriculum.',
    url: 'https://leetcode.com/charleswinfield108',
    image: '/assets/images/link-leetcode.png',
    imageAlt: 'LeetCode profile of Charles Winfield',
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
