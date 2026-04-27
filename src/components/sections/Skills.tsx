import { Monitor, Server, Database, Palette, Brain, MessageSquare, Zap } from 'lucide-react'
import { PROGRESS_SKILLS, TECH_STACK, SOFT_SKILLS } from '../../lib/data'
import { useReveal } from '../../hooks/useReveal'
import './Skills.css'

const SKILL_ICONS = [Monitor, Server, Database, Palette]
const SOFT_ICONS = [Brain, MessageSquare, Zap]

export default function Skills() {
  const { ref: cardsRef, visible: cardsVisible } = useReveal()
  const { ref: stackRef, visible: stackVisible } = useReveal()
  const { ref: softRef, visible: softVisible } = useReveal()

  return (
    <section className="skills section" id="skills">
      <div className="container">

        {/* Section header */}
        <div className={`skills__header reveal ${cardsVisible ? 'visible' : ''}`}>
          <span className="section-label">What I Know</span>
          <h2 className="skills__header-title">Technical Skills</h2>
        </div>

        {/* 4 skill cards */}
        <div
          className={`skills__cards-grid reveal ${cardsVisible ? 'visible' : ''}`}
          ref={cardsRef as React.RefObject<HTMLDivElement>}
        >
          {PROGRESS_SKILLS.map((skill, i) => {
            const Icon = SKILL_ICONS[i]
            return (
              <div
                key={skill.id}
                className={`skills__card reveal-delay-${i + 1} ${cardsVisible ? 'visible' : ''}`}
              >
                <div className="skills__card-icon">
                  <Icon size={26} />
                </div>
                <h3 className="skills__card-title">{skill.name}</h3>
                <p className="skills__card-desc">{skill.description}</p>
                <div className="skills__bar-header">
                  <span className="skills__bar-label">{skill.name}</span>
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
            <span className="section-label">Tools I Use</span>
            <h3 className="skills__stack-title">Technology Stack</h3>
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
            <span className="section-label">How I Work</span>
            <h3 className="skills__soft-title">Interpersonal Skills</h3>
          </div>

          <div className="skills__soft-grid">
            {SOFT_SKILLS.map((skill, i) => {
              const Icon = SOFT_ICONS[i]
              return (
                <div
                  key={skill.id}
                  className={`skills__soft-card reveal-delay-${i + 1} ${softVisible ? 'visible' : ''}`}
                >
                  <div className="skills__soft-card-icon">
                    <Icon size={24} />
                  </div>
                  <h4 className="skills__soft-name">{skill.name}</h4>
                  <p className="skills__soft-desc">{skill.description}</p>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
