import { useTranslation } from 'react-i18next'
import { LINKS } from '../lib/data'
import { useReveal } from '../hooks/useReveal'
import { LinkCard } from '../components/ui/LinkCard'
import FooterCTA from '../components/sections/FooterCTA'
import './Links.css'

export default function Links() {
  const { t } = useTranslation()
  const { ref: headerRef, visible: headerVisible } = useReveal()
  const { ref: gridRef, visible: gridVisible } = useReveal()

  return (
    <main className="links-page">
      <section className="links section">
        <div className="container">

          <div
            className={`links__header reveal ${headerVisible ? 'visible' : ''}`}
            ref={headerRef as React.RefObject<HTMLDivElement>}
          >
            <span className="section-label">{t('links.label')}</span>
            <h1 className="links__title">
              {t('links.title')} <span className="links__title-gradient">{t('links.title_accent')}</span>
            </h1>
            <p className="links__subtitle">{t('links.subtitle')}</p>
          </div>

          <div className="links__grid" ref={gridRef as React.RefObject<HTMLDivElement>}>
            {LINKS.map((link, i) => (
              <LinkCard key={link.id} link={link} index={i} visible={gridVisible} />
            ))}
          </div>

        </div>
      </section>
      <FooterCTA />
    </main>
  )
}
