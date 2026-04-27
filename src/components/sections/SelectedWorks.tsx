import { useState } from 'react'
import { PROJECTS } from '../../lib/data'
import './SelectedWorks.css'

export default function SelectedWorks() {
  const [active, setActive] = useState(0)
  const project = PROJECTS[active]

  return (
    <section className="works section" id="works">
      <div className="container">

        {/* Section title */}
        <div className="works__header">
          <span className="section-label">My Work</span>
          <h2 className="works__title">Selected Works</h2>
        </div>

        <div className="works__inner">
          {/* Left side */}
          <div className="works__left">
            <div className="works__numbers">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  className={`works__num-btn${i === active ? ' active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`View project ${i + 1}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>

            <div className="works__divider">
              <div
                className="works__active-dot"
                style={{ top: `${active * 80 + 30}px` }}
              />
            </div>

            <div className="works__detail">
              <div className="works__detail-body">
                <p className="works__project-name">{project.name}</p>
                <p className="works__project-category">{project.category}</p>
                <p className="works__project-desc">{project.description}</p>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="works__view-link"
                  >
                    View Full Project
                  </a>
                )}
                <div className="works__tags">
                  {project.tech.map(t => (
                    <span key={t} className="works__tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side — preview */}
          <div className="works__preview">
            <div className="works__preview-frame">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="works__preview-img"
                />
              ) : (
                <div className="works__preview-placeholder">
                  <div className="works__preview-teal" />
                  <span>{project.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
