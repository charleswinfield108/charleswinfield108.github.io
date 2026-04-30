import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BIO } from '../../lib/data'
import './Hero.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
})

const fadeRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.3, ease: 'easeOut' as const } },
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero__inner">

          {/* Left — heading + CTA */}
          <div className="hero__content">
            <motion.h1 className="hero__name" {...fadeUp(0)}>
              <span className="hero__wave">👋</span>
              <span className="hero__name-hello">Hi, I'm</span>
              <span className="hero__name-main">Charles</span>
            </motion.h1>

            <motion.p className="hero__tagline" {...fadeUp(0.15)}>
              I Create Scalable Digital Products With{' '}
              <span className="hero__tagline-accent">AI, Experience, And Skill.</span>
            </motion.p>

            <motion.p className="hero__bio" {...fadeUp(0.25)}>{BIO.intro}</motion.p>

            <motion.div className="hero__ctas" {...fadeUp(0.35)}>
              <Link to="/contact" className="btn btn-outline hero__btn-contact">Get In Contact</Link>
              <Link to="/portfolio" className="btn btn-primary">View My Work</Link>
            </motion.div>
          </div>

          {/* Right — profile card */}
          <motion.div className="hero__right" {...fadeRight}>
            <div className="hero__profile-card">
              <div className="hero__profile-img-wrap">
                {/* AI-generated portrait — created with ChatGPT (DALL·E) */}
                <img
                  src="/assets/images/cw-hero-ai.png"
                  alt="Charles Winfield"
                  className="hero__profile-img"
                />
              </div>

              <div className="hero__profile-body">
                <div className="hero__profile-body-row">
                  <div className="hero__badge">
                    <span className="hero__badge-dot" />
                    Full Stack MERN Developer
                  </div>
                  <div className="hero__badge">
                    <span className="hero__badge-dot" />
                    Available for Work
                  </div>
                </div>

                <div className="hero__tech-row">
                  {['MongoDB', 'Express.JS', 'React', 'Node.JS', 'AI Developer'].map(t => (
                    <span key={t} className="hero__tech-pill">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

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
