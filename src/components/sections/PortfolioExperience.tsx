import { useTranslation } from 'react-i18next'
import { WORK_EXPERIENCE } from '../../lib/data'
import { useReveal } from '../../hooks/useReveal'
import './PortfolioExperience.css'

export default function PortfolioExperience() {
  const { t } = useTranslation()
  const { ref: headerRef, visible: headerVisible } = useReveal()
  const { ref: timelineRef, visible: timelineVisible } = useReveal()

  return (
    <section className="p-experience section" id="experience">
      <div className="container">

        <div
          className={`p-experience__header reveal ${headerVisible ? 'visible' : ''}`}
          ref={headerRef as React.RefObject<HTMLDivElement>}
        >
          <span className="section-label">{t('experience.label')}</span>
          <h2 className="p-section-title">{t('experience.title')}</h2>
        </div>

        <div className="p-timeline" ref={timelineRef as React.RefObject<HTMLDivElement>}>
          {WORK_EXPERIENCE.map((entry, i) => (
            <div
              key={entry.id}
              className={`p-timeline__entry reveal reveal-delay-${i + 1} ${timelineVisible ? 'visible' : ''}`}
            >
              <div className="p-timeline__dot" />
              <div className="p-timeline__card">
                <div className="p-timeline__date">{entry.startDate} – {entry.endDate}</div>
                <h3 className="p-timeline__name">{entry.role}</h3>
                <div className="p-timeline__program">{entry.organization}</div>
                <p className="p-timeline__desc">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
