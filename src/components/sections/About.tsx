import { BIO } from '../../lib/data'
import { useReveal } from '../../hooks/useReveal'
import './About.css'

export default function About() {
  const { ref: imageRef, visible: imageVisible } = useReveal()
  const { ref: contentRef, visible: contentVisible } = useReveal()

  return (
    <section className="about section section-alt" id="about">
      <div className="container">
        <div className="about__inner">
          <div
            className={`about__image-wrap reveal-left ${imageVisible ? 'visible' : ''}`}
            ref={imageRef as React.RefObject<HTMLDivElement>}
          >
            <div className="about__image-frame">
              <img
                src="/assets/images/cw-hero-ai.png"
                alt="Charles Winfield"
                className="about__image"
              />
            </div>
            <div className="about__image-accent" />
          </div>

          <div
            className={`about__content reveal-right ${contentVisible ? 'visible' : ''}`}
            ref={contentRef as React.RefObject<HTMLDivElement>}
          >
            <span className="section-label">Who I Am</span>
            <h2 className="about__title">
              About <span>Charles</span>
            </h2>
            <p className="about__text">{BIO.about}</p>

            <div className="about__stats">
              {[
                { number: '16', label: 'Modules Completed' },
                { number: '15+', label: 'Projects Built' },
                { number: '13+', label: 'Technologies' },
                { number: '100%', label: 'Passion Driven' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className={`about__stat reveal-delay-${i + 1} ${contentVisible ? 'visible' : ''}`}
                >
                  <div className="about__stat-number">{stat.number}</div>
                  <div className="about__stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
