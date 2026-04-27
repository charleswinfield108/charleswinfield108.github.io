import { useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { PROJECTS } from '../../lib/data'
import './SelectedWorks.css'

export default function SelectedWorks() {
  const [active, setActive] = useState(0)

  const project = PROJECTS[active]

  const prev = () => setActive(i => (i - 1 + PROJECTS.length) % PROJECTS.length)
  const next = () => setActive(i => (i + 1) % PROJECTS.length)

  return (
    <section className="works section section-alt" id="works">
      <div className="container">
        <div className="works__header">
          <span className="section-label">My Work</span>
          <h2 className="works__title">Selected Works</h2>
        </div>

        <div className="works__inner">
          <ul className="works__list">
            {PROJECTS.map((p, i) => (
              <li
                key={p.id}
                className={`works__item${i === active ? ' active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="works__item-bullet" />
                <div className="works__item-body">
                  <p className="works__item-category">{p.category}</p>
                  <p className="works__item-name">{p.name}</p>
                  <p className="works__item-desc">{p.description}</p>
                  <div className="works__item-tags">
                    {p.tech.map(t => (
                      <span key={t} className="works__tag">{t}</span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>

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

            <div className="works__preview-actions">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="works__link"
                >
                  View Full Project <ArrowRight size={14} />
                </a>
              )}
              <div className="works__nav-btns">
                <button className="works__nav-btn" onClick={prev} aria-label="Previous project">
                  <ChevronLeft size={16} />
                </button>
                <button className="works__nav-btn" onClick={next} aria-label="Next project">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
