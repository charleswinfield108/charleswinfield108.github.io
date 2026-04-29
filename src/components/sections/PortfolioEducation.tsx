import { EDUCATION } from '../../lib/data'
import { useReveal } from '../../hooks/useReveal'
import './PortfolioEducation.css'

export default function PortfolioEducation() {
  const { ref: headerRef, visible: headerVisible } = useReveal()
  const { ref: timelineRef, visible: timelineVisible } = useReveal()

  return (
    <section className="p-education section" id="education">
      <div className="container">

        <div
          className={`p-education__header reveal ${headerVisible ? 'visible' : ''}`}
          ref={headerRef as React.RefObject<HTMLDivElement>}
        >
          <span className="section-label">Where I Learned</span>
          <h2 className="p-section-title">Education</h2>
        </div>

        <div
          className="p-timeline"
          ref={timelineRef as React.RefObject<HTMLDivElement>}
        >
          {EDUCATION.map((entry, i) => (
            <div
              key={entry.id}
              className={`p-timeline__entry reveal reveal-delay-${i + 1} ${timelineVisible ? 'visible' : ''}`}
            >
              <div className="p-timeline__dot" />
              <div className="p-timeline__card">
                <div className="p-timeline__date">{entry.startDate} – {entry.endDate}</div>
                <h3 className="p-timeline__name">{entry.institution}</h3>
                <div className="p-timeline__program">{entry.program}</div>
                <p className="p-timeline__desc">{entry.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
