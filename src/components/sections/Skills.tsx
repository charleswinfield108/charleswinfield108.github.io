import { Wrench, Lightbulb } from 'lucide-react'
import { PROGRESS_SKILLS, TECH_STACK, SOFT_SKILLS } from '../../lib/data'
import './Skills.css'

export default function Skills() {
  return (
    <section className="skills section" id="skills">
      <div className="container">

        {/* Top: progress bars | icon | description */}
        <div className="skills__top">
          <div className="skills__progress-list">
            {PROGRESS_SKILLS.map(skill => (
              <div key={skill.id} className="skills__progress-item">
                <div className="skills__progress-header">
                  <span className="skills__progress-name">{skill.name}</span>
                  <span className="skills__progress-pct">{skill.percentage}%</span>
                </div>
                <div className="skills__progress-track">
                  <div
                    className="skills__progress-fill"
                    style={{ '--target-width': `${skill.percentage}%` } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="skills__center-icon">
            <div className="skills__icon-ring">
              <Wrench size={32} />
            </div>
            <div className="skills__icon-line" />
          </div>

          <div className="skills__description">
            <span className="section-label">What I Know</span>
            <h3>Technical Skills</h3>
            <p>
              I build full-stack applications from the ground up — from designing
              database schemas and REST APIs to crafting responsive, accessible
              user interfaces. My toolkit spans the modern JavaScript ecosystem,
              and I'm always learning what the industry demands next.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="skills__stack">
          <div className="skills__stack-header">
            <span className="section-label">Tools I Use</span>
            <h3 className="skills__stack-title">Technology Stack</h3>
          </div>
          <div className="skills__icons-grid">
            {TECH_STACK.map(tech => (
              <div key={tech.id} className="skills__icon-item">
                <img src={tech.icon} alt={tech.name} />
                <span className="skills__icon-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="skills__soft">
          <div className="skills__soft-icon">
            <Lightbulb size={32} />
          </div>
          <div className="skills__soft-content">
            <h3>Skills &amp; Attributes</h3>
            <div className="skills__soft-list">
              {SOFT_SKILLS.map(skill => (
                <div key={skill.id} className="skills__soft-item">
                  <p className="skills__soft-name">{skill.name}</p>
                  <p className="skills__soft-desc">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
