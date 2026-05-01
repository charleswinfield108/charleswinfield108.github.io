import { Monitor, Server, Database, Palette, Brain, MessageSquare, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { PROGRESS_SKILLS, TECH_STACK } from '../../lib/data'
import { useReveal } from '../../hooks/useReveal'
import './Skills.css'

const SKILL_ICONS = [Monitor, Server, Database, Palette]
const SOFT_ICONS = [Brain, MessageSquare, Zap]

export default function Skills() {
  const { t } = useTranslation()
  const { ref: cardsRef, visible: cardsVisible } = useReveal()
  const { ref: stackRef, visible: stackVisible } = useReveal()
  const { ref: softRef, visible: softVisible } = useReveal()

  const progressLabels = t('skills.progress', { returnObjects: true }) as Array<{ name: string; desc: string }>
  const softSkills = t('skills.soft', { returnObjects: true }) as Array<{ name: string; desc: string }>

  return (
    <section className="skills section" id="skills">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22B1C4" />
            <stop offset="100%" stopColor="#F0CC18" />
          </linearGradient>
        </defs>
      </svg>
      <div className="container">

        {/* Section header */}
        <div className={`skills__header reveal ${cardsVisible ? 'visible' : ''}`}>
          <span className="section-label">{t('skills.tech_label')}</span>
          <h2 className="skills__soft-title">{t('skills.tech_title')}</h2>
        </div>

        {/* 4 skill cards */}
        <div
          className={`skills__cards-grid reveal ${cardsVisible ? 'visible' : ''}`}
          ref={cardsRef as React.RefObject<HTMLDivElement>}
        >
          {PROGRESS_SKILLS.map((skill, i) => {
            const Icon = SKILL_ICONS[i]
            const label = progressLabels[i]
            return (
              <div
                key={skill.id}
                className={`skills__card reveal-delay-${i + 1} ${cardsVisible ? 'visible' : ''}`}
              >
                <div className="skills__card-icon">
                  <Icon size={26} />
                </div>
                <h3 className="skills__card-title">{label?.name ?? skill.name}</h3>
                <p className="skills__card-desc">{label?.desc ?? skill.description}</p>
                <div className="skills__bar-header">
                  <span className="skills__bar-label">{label?.name ?? skill.name}</span>
                  <span className="skills__bar-pct">{skill.percentage}%</span>
                </div>
                <div className="skills__bar-track">
                  <div
                    className={`skills__bar-fill${cardsVisible ? ' animate' : ''}`}
                    style={{ '--target-width': `${skill.percentage}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Tech Stack marquee */}
        <div
          className={`skills__stack reveal ${stackVisible ? 'visible' : ''}`}
          ref={stackRef as React.RefObject<HTMLDivElement>}
        >
          <div className="skills__stack-header">
            <span className="section-label">{t('skills.stack_label')}</span>
            <h3 className="skills__stack-title">{t('skills.stack_title')}</h3>
          </div>
          <div className="skills__marquee">
            <div className="skills__marquee-track">
              {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                <div key={`${tech.id}-${i}`} className="skills__icon-item">
                  <img src={tech.icon} alt={tech.name} />
                  <span className="skills__icon-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interpersonal Skills */}
        <div
          className={`skills__soft reveal ${softVisible ? 'visible' : ''}`}
          ref={softRef as React.RefObject<HTMLDivElement>}
        >
          <div className="skills__soft-header">
            <span className="section-label">{t('skills.soft_label')}</span>
            <h3 className="skills__soft-title">{t('skills.soft_title')}</h3>
          </div>

          <div className="skills__soft-grid">
            {softSkills.map((skill, i) => {
              const Icon = SOFT_ICONS[i]
              return (
                <div
                  key={i}
                  className={`skills__soft-card reveal-delay-${i + 1} ${softVisible ? 'visible' : ''}`}
                >
                  <div className="skills__soft-card-icon">
                    <Icon size={24} />
                  </div>
                  <h4 className="skills__soft-name">{skill.name}</h4>
                  <p className="skills__soft-desc">{skill.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
