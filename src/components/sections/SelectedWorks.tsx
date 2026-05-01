import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../../lib/data'
import './SelectedWorks.css'

export default function SelectedWorks() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [modalProject, setModalProject] = useState<typeof PROJECTS[0] | null>(null)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const scrollable = el.offsetHeight - window.innerHeight
      const scrolled = -el.getBoundingClientRect().top
      const progress = Math.max(0, Math.min(1, scrolled / scrollable))
      setActive(Math.min(PROJECTS.length - 1, Math.floor(progress * PROJECTS.length)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalProject(null) }
    if (modalProject) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalProject])

  const scrollToProject = (i: number) => {
    const el = sectionRef.current
    if (!el) return
    const scrollable = el.offsetHeight - window.innerHeight
    const target = el.offsetTop + (i / PROJECTS.length) * scrollable
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  return (
    <>
      <section className="works" id="works" ref={sectionRef}>
        <div className="works__sticky">
          <div className="container works__container">

            <div className="works__header-wrap">
              <p className="section-label">{t('works.label')}</p>
              <h2 className="works__header-title">{t('works.title')}</h2>
            </div>

            <div className="works__inner">

              <div className="works__left">
                <div className="works__counter">
                  <div className="works__nav">
                    {PROJECTS.map((_, i) => (
                      <button
                        key={i}
                        className={`works__nav-num${i === active ? ' active' : ''}`}
                        onClick={() => scrollToProject(i)}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                  <div className="works__counter-bottom">
                    <span className="works__counter-current">
                      {String(active + 1).padStart(2, '0')}
                    </span>
                    <span className="works__counter-sep">
                      /&nbsp;{String(PROJECTS.length).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div className="works__list-wrap">
                  <div key={PROJECTS[active].id} className="works__item active">
                    <div className="works__item-year">
                      <span className="works__item-dot" />
                      {PROJECTS[active].year}
                    </div>

                    <h3 className="works__item-name">{PROJECTS[active].name}</h3>

                    <div className="works__item-detail">
                      <p className="works__item-desc">{PROJECTS[active].description}</p>
                      <Link to="/portfolio" className="works__item-link">
                        {t('works.view_portfolio')}
                      </Link>
                      <div className="works__item-tags">
                        {PROJECTS[active].tech.map(tag => (
                          <span key={tag} className="works__item-tag-pill">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="works__preview">
                {PROJECTS.map((p, i) => {
                  const state = i < active ? 'past' : i === active ? 'active' : 'next'
                  return (
                    <div key={p.id} className={`works__preview-frame ${state}`}>
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.imageAlt}
                          className="works__preview-img works__preview-img--clickable"
                          onClick={() => setModalProject(p)}
                        />
                      ) : (
                        <div className="works__preview-placeholder">
                          <div className="works__placeholder-grid" />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

            </div>
          </div>
        </div>
      </section>

      {modalProject && (
        <div className="works__modal-overlay" onClick={() => setModalProject(null)}>
          <div className="works__modal" onClick={e => e.stopPropagation()}>
            <button className="works__modal-close" onClick={() => setModalProject(null)}>✕</button>
            <img src={modalProject.image} alt={modalProject.imageAlt} className="works__modal-img" />
            <div className="works__modal-body">
              <h3 className="works__modal-title">{modalProject.name}</h3>
              <p className="works__modal-desc">{modalProject.description}</p>
              <div className="works__modal-tags">
                {modalProject.tech.map(tag => (
                  <span key={tag} className="works__item-tag-pill">{tag}</span>
                ))}
              </div>
              {modalProject.repoUrl && (
                <a href={modalProject.repoUrl} target="_blank" rel="noopener noreferrer" className="works__item-link">
                  {t('works.view_full')}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
