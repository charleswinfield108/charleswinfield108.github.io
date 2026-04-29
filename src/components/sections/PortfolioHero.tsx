import { useReveal } from '../../hooks/useReveal'
import './PortfolioHero.css'

export default function PortfolioHero() {
  const { ref: leftRef, visible: leftVisible } = useReveal()
  const { ref: rightRef, visible: rightVisible } = useReveal()

  return (
    <section className="p-hero">
      <div className="container">
        <div className="p-hero__inner">

          <div
            className={`p-hero__content reveal-left ${leftVisible ? 'visible' : ''}`}
            ref={leftRef as React.RefObject<HTMLDivElement>}
          >
            <span className="section-label">My Portfolio</span>
            <h1 className="p-hero__title">
              Experience &amp;<br />
              <span className="p-hero__title-accent">Projects.</span>
            </h1>
            <p className="p-hero__sub">
              Full-Stack MERN Developer &middot; U.S. Army Veteran &middot; 30+ Projects Built
            </p>
            <a
              href="/assets/charles-winfield-cv.pdf"
              download
              className="btn btn-primary"
            >
              Download CV
            </a>
          </div>

          <div
            className={`p-hero__right reveal-right ${rightVisible ? 'visible' : ''}`}
            ref={rightRef as React.RefObject<HTMLDivElement>}
          >
            <div className="p-hero__card">
              <div className="p-hero__img-wrap">
                <img
                  src="/assets/images/cw-hero-ai.png"
                  alt="Charles Winfield — Full-Stack Developer and U.S. Army Veteran"
                  className="p-hero__img"
                />
              </div>
              <div className="p-hero__card-body">
                <div className="p-hero__badge">
                  <span className="p-hero__badge-dot" />
                  Available for Work
                </div>
                <div className="p-hero__stats-row">
                  <div className="p-hero__stat">
                    <span className="p-hero__stat-num">30+</span>
                    <span className="p-hero__stat-label">Projects Built</span>
                  </div>
                  <span className="p-hero__stat-div" />
                  <div className="p-hero__stat">
                    <span className="p-hero__stat-num">16</span>
                    <span className="p-hero__stat-label">Modules Done</span>
                  </div>
                  <span className="p-hero__stat-div" />
                  <div className="p-hero__stat">
                    <span className="p-hero__stat-num">5+</span>
                    <span className="p-hero__stat-label">Yrs Experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
