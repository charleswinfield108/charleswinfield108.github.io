import { useTranslation } from 'react-i18next'
import { useReveal } from '../../hooks/useReveal'
import './PortfolioHero.css'

export default function PortfolioHero() {
  const { t } = useTranslation()
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
            <span className="section-label">{t('portfolio_hero.label')}</span>
            <h1 className="p-hero__title">
              {t('portfolio_hero.title')}<br />
              <span className="p-hero__title-accent">{t('portfolio_hero.title_accent')}</span>
            </h1>
            <p className="p-hero__sub">{t('portfolio_hero.subtitle')}</p>
            <a href="/assets/images/CW Resume.pdf" download className="btn btn-primary">
              {t('portfolio_hero.download')}
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
                  {t('portfolio_hero.badge_available')}
                </div>
                <div className="p-hero__stats-row">
                  <div className="p-hero__stat">
                    <span className="p-hero__stat-num">30+</span>
                    <span className="p-hero__stat-label">{t('portfolio_hero.stat_projects')}</span>
                  </div>
                  <span className="p-hero__stat-div" />
                  <div className="p-hero__stat">
                    <span className="p-hero__stat-num">16</span>
                    <span className="p-hero__stat-label">{t('portfolio_hero.stat_modules')}</span>
                  </div>
                  <span className="p-hero__stat-div" />
                  <div className="p-hero__stat">
                    <span className="p-hero__stat-num">5+</span>
                    <span className="p-hero__stat-label">{t('portfolio_hero.stat_years')}</span>
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
