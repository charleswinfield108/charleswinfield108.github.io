import { BIO } from '../../lib/data'
import './About.css'

export default function About() {
  return (
    <section className="about section section-alt" id="about">
      <div className="container">
        <div className="about__inner">
          <div className="about__image-wrap">
            <div className="about__image-frame">
              <img
                src="/assets/images/hero-image.png"
                alt="Charles Winfield"
                className="about__image"
              />
            </div>
            <div className="about__image-accent" />
          </div>

          <div className="about__content">
            <span className="section-label">Who I Am</span>
            <h2 className="about__title">
              About <span>Charles</span>
            </h2>
            <p className="about__text">{BIO.about}</p>

            <div className="about__stats">
              <div className="about__stat">
                <div className="about__stat-number">16</div>
                <div className="about__stat-label">Modules Completed</div>
              </div>
              <div className="about__stat">
                <div className="about__stat-number">15+</div>
                <div className="about__stat-label">Projects Built</div>
              </div>
              <div className="about__stat">
                <div className="about__stat-number">13+</div>
                <div className="about__stat-label">Technologies</div>
              </div>
              <div className="about__stat">
                <div className="about__stat-number">100%</div>
                <div className="about__stat-label">Passion Driven</div>
              </div>
            </div>

            <a href="#contact" className="btn btn-primary">Let's Work Together</a>
          </div>
        </div>
      </div>
    </section>
  )
}
