import { BIO } from '../../lib/data'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <h1 className="hero__name">
              <span className="hero__hello">Hello!</span> I'm Charles Winfield.
            </h1>
            <div className="hero__tagline-block">
              <p className="hero__tagline">
                I Create Scalable Digital Products<br />
                with <span className="hero__tagline-accent">AI, Experience, and Skill.</span>
              </p>
              <p className="hero__bio">{BIO.intro}</p>
            </div>
            <div className="hero__ctas">
              <a href="#contact" className="btn btn-outline hero__btn-contact">Get In Contact</a>
              <a href="#works" className="btn btn-primary">View My Work</a>
            </div>
          </div>

          <div className="hero__image-wrap">
            <div className="hero__image-ring">
              <img
                src="/assets/images/hero-image.png"
                alt="Charles Winfield"
                className="hero__image"
              />
            </div>
            <div className="hero__code-box">&lt;/&gt;</div>
          </div>
        </div>
      </div>
    </section>
  )
}
