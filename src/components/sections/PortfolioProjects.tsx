import { PROJECTS } from '../../lib/data'
import { useReveal } from '../../hooks/useReveal'
import './PortfolioProjects.css'

export default function PortfolioProjects() {
  const { ref: headerRef, visible: headerVisible } = useReveal()
  const { ref: gridRef, visible: gridVisible } = useReveal()

  return (
    <section className="p-projects section" id="projects">
      <div className="container">

        <div
          className={`p-projects__header reveal ${headerVisible ? 'visible' : ''}`}
          ref={headerRef as React.RefObject<HTMLDivElement>}
        >
          <span className="section-label">What I've Built</span>
          <h2 className="p-section-title">Projects</h2>
        </div>

        <div
          className="p-projects__grid"
          ref={gridRef as React.RefObject<HTMLDivElement>}
        >
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              className={`p-project-card reveal reveal-delay-${i + 1} ${gridVisible ? 'visible' : ''}`}
            >
              <div className="p-project-card__img-wrap">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="p-project-card__img"
                  />
                ) : (
                  <div className="p-project-card__placeholder">
                    <div className="p-project-card__placeholder-grid" />
                    <span className="p-project-card__placeholder-label">{project.name}</span>
                  </div>
                )}
                <span className="p-project-card__category">{project.category}</span>
              </div>

              <div className="p-project-card__body">
                <div className="p-project-card__meta">
                  <span className="p-project-card__year">{project.year}</span>
                </div>
                <h3 className="p-project-card__name">{project.name}</h3>
                <p className="p-project-card__desc">{project.description}</p>
                <div className="p-project-card__tags">
                  {project.tech.map(t => (
                    <span key={t} className="p-project-card__tag">{t}</span>
                  ))}
                </div>
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-project-card__link"
                  >
                    View on GitHub →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
