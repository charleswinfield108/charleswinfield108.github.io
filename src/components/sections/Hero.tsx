import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Send } from 'lucide-react'
import './Hero.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
})

const fadeRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.3, ease: 'easeOut' as const } },
}

const TECH_PILLS = ['MongoDB', 'Express.JS', 'React', 'Node.JS', 'AI Developer']

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero__inner">

          {/* Left — heading + CTA */}
          <div className="hero__content">
            <motion.h1 className="hero__name" {...fadeUp(0)}>
              <span className="hero__wave">👋</span>
              <span className="hero__name-hello">{t('hero.greeting')}</span>
              <span className="hero__name-main">Charles</span>
            </motion.h1>

            <motion.p className="hero__tagline" {...fadeUp(0.15)}>
              {t('hero.tagline')}{' '}
              <span className="hero__tagline-accent">{t('hero.tagline_accent')}</span>
            </motion.p>

            <motion.p className="hero__bio" {...fadeUp(0.25)}>{t('hero.bio')}</motion.p>

            <motion.div className="hero__ctas" {...fadeUp(0.35)}>
              <Link
                to="/contact"
                className="btn btn-outline header__hire"
              >
                {t('hero.cta_contact')}
                <Send size={14} />
              </Link>
              <Link to="/portfolio" className="btn btn-outline">{t('hero.cta_work')}</Link>
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
                    {t('hero.badge_role')}
                  </div>
                  <div className="hero__badge">
                    <span className="hero__badge-dot" />
                    {t('hero.badge_available')}
                  </div>
                </div>

                <div className="hero__tech-row">
                  {TECH_PILLS.map(pill => (
                    <span key={pill} className="hero__tech-pill">{pill}</span>
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
