import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Compass, PenTool, Code2, Rocket } from 'lucide-react'
import { BIO } from '../../lib/data'
import './About.css'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
  viewport: { once: true, amount: 0.2 },
})

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: v => setVal(Math.round(v)),
    })
    return controls.stop
  }, [isInView, to])

  return <span ref={ref}>{val}{suffix}</span>
}

const STATS = [
  { to: 5,   suffix: '+', label: 'Years Experience'   },
  { to: 15,  suffix: '+', label: 'Projects Built'    },
  { to: 13,  suffix: '+', label: 'Technologies'      },
  { to: 100, suffix: '%', label: 'Passion Driven'    },
]

const PROCESS = [
  {
    icon: Compass,
    number: '01',
    title: 'Discovery & Strategy',
    desc: 'Establishing the "Why" and "What." I identify the problem, study the landscape, document requirements, define the MVP, and select the right tech stack for the job.',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Architecture & Design',
    desc: 'Creating the blueprint. I design UI/UX wireframes alongside the backend schema and API contracts — planning exactly how data flows from a user\'s click to the database.',
  },
  {
    icon: Code2,
    number: '03',
    title: 'Implementation',
    desc: 'The heavy lifting. I build the responsive frontend, set up server logic and database integration, then connect the two via APIs to deliver a cohesive, functional application.',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'QA & Launch',
    desc: 'Ensuring stability and going live. Unit tests, integration tests, and bug fixes confirm the build is production-ready before deploying to AWS, Vercel, or Heroku.',
  },
]

export default function About() {
  const lineRef = useRef<HTMLDivElement>(null)
  const lineInView = useInView(lineRef, { once: true })

  return (
    <section className="about section section-alt" id="about">
      <div className="container">

        {/* Header */}
        <motion.div className="about__header" {...inView(0)}>
          <span className="section-label">Who I Am</span>
          <h2 className="about__title">About <span>Charles</span></h2>
        </motion.div>

        {/* Bio row */}
        <div className="about__bio-row">
          <motion.div
            className="about__photo-wrap"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1, ease: 'easeOut' } }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="about__photo-frame">
              {/* AI-generated portrait — created with ChatGPT (DALL·E) */}
              <img src="/assets/images/cw-hero-ai.png" alt="Charles Winfield" className="about__photo" />
            </div>
            <div className="about__photo-accent" />
          </motion.div>

          <motion.div className="about__bio-content" {...inView(0.2)}>
            <div className="about__text">
              {BIO.about.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="about__stats">
              {STATS.map((stat, i) => (
                <motion.div key={stat.label} className="about__stat" {...inView(0.25 + i * 0.07)}>
                  <div className="about__stat-number">
                    <CountUp to={stat.to} suffix={stat.suffix} />
                  </div>
                  <div className="about__stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Process */}
        <motion.div className="about__process-header" {...inView(0.1)}>
          <span className="section-label">How I Work</span>
          <h3 className="about__process-title">My Development Process</h3>
        </motion.div>

        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="aboutIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22B1C4" />
              <stop offset="100%" stopColor="#F0CC18" />
            </linearGradient>
          </defs>
        </svg>

        <div className="about__process-grid" ref={lineRef}>
          <div className={`about__process-line${lineInView ? ' animate' : ''}`} />
          {PROCESS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                className="about__process-card"
                {...inView(0.1 + i * 0.12)}
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              >
                <div className="about__process-top">
                  <div className="about__process-icon">
                    <Icon size={22} stroke="url(#aboutIconGradient)" />
                  </div>
                  <span className="about__process-num">{step.number}</span>
                </div>
                <h4 className="about__process-name">{step.title}</h4>
                <p className="about__process-desc">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
