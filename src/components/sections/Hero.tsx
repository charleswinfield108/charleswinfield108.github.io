import { BIO } from '../../lib/data'
import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero__inner">
          <div className="hero__content">
            <p className="hero__greeting">Hello! I'm</p>
            <h1 className="hero__name">
              Charles <span>Winfield</span>.
            </h1>
            <p className="hero__tagline">{BIO.tagline}</p>
            <p className="hero__bio">{BIO.intro}</p>
            <div className="hero__ctas">
              <a href="#contact" className="btn btn-primary">Get In Contact</a>
              <a href="#works" className="btn btn-outline">View My Work</a>
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
            <div className="hero__float hero__float--code">&lt;/&gt;</div>
            <div className="hero__float hero__float--tag">Full-Stack Dev</div>
          </div>
        </div>
      </div>
    </section>
  )
}
