import { BIO } from '../../lib/data'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero__inner">

          {/* Left — heading + CTA */}
          <div className="hero__content">
            <h1 className="hero__name">
              <span className="hero__wave">👋</span>
              <span className="hero__name-hello">Hi, I'm</span>
              <span className="hero__name-main">Charles</span>
            </h1>

            <p className="hero__tagline">
              I Create Scalable Digital Products With{' '}
              <span className="hero__tagline-accent">AI, Experience, And Skill.</span>
            </p>

            <p className="hero__bio">{BIO.intro}</p>

            <div className="hero__ctas">
              <a href="#contact" className="btn btn-outline hero__btn-contact">Get In Contact</a>
              <a href="#works" className="btn btn-primary">View My Work</a>
            </div>
          </div>

          {/* Right — profile card + bio */}
          <div className="hero__right">
            <div className="hero__profile-card">
              <div className="hero__profile-img-wrap">
                <img
                  src="/assets/images/cw-hero-ai.png"
                  alt="Charles Winfield"
                  className="hero__profile-img"
                />
              </div>

              <div className="hero__profile-body">
                <div className="hero__badge">
                  <span className="hero__badge-dot" />
                  Available for Work
                </div>

                <div className="hero__stats-row">
                  <div className="hero__stats-item">
                    <span className="hero__stats-number">15+</span>
                    <span className="hero__stats-label">Projects</span>
                  </div>
                  <div className="hero__stats-divider" />
                  <div className="hero__stats-item">
                    <span className="hero__stats-number">13+</span>
                    <span className="hero__stats-label">Technologies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
      </div>
    </section>
  )
}
