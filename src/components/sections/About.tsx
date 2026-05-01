import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Compass, PenTool, Code2, Rocket } from 'lucide-react'
import { useTranslation } from 'react-i18next'
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

const PROCESS_ICONS = [Compass, PenTool, Code2, Rocket]

export default function About() {
  const { t } = useTranslation()
  const lineRef = useRef<HTMLDivElement>(null)
  const lineInView = useInView(lineRef, { once: true })

  const stats = [
    { to: 5,   suffix: '+', labelKey: 'about.stat_years'    },
    { to: 15,  suffix: '+', labelKey: 'about.stat_projects' },
    { to: 13,  suffix: '+', labelKey: 'about.stat_tech'     },
    { to: 100, suffix: '%', labelKey: 'about.stat_passion'  },
  ]

  const bioParagraphs = t('about.bio', { returnObjects: true }) as string[]
  const process = t('about.process', { returnObjects: true }) as Array<{ number: string; title: string; desc: string }>

  return (
    <section className="about section section-alt" id="about">
      <div className="container">

        {/* Header */}
        <motion.div className="about__header" {...inView(0)}>
          <span className="section-label">{t('about.section_label')}</span>
          <h2 className="about__title">{t('about.title')} <span>{t('about.title_name')}</span></h2>
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
              {bioParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="about__stats">
              {stats.map((stat, i) => (
                <motion.div key={stat.labelKey} className="about__stat" {...inView(0.25 + i * 0.07)}>
                  <div className="about__stat-number">
                    <CountUp to={stat.to} suffix={stat.suffix} />
                  </div>
                  <div className="about__stat-label">{t(stat.labelKey)}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Process */}
        <motion.div className="about__process-header" {...inView(0.1)}>
          <span className="section-label">{t('about.process_label')}</span>
          <h3 className="about__process-title">{t('about.process_title')}</h3>
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
          {process.map((step, i) => {
            const Icon = PROCESS_ICONS[i]
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
