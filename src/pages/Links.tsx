import { LINKS } from '../lib/data'
import { useReveal } from '../hooks/useReveal'
import { LinkCard } from '../components/ui/LinkCard'
import './Links.css'

export default function Links() {
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
            <span className="section-label">Find Me Online</span>
            <h1 className="links__title">Links</h1>
            <p className="links__subtitle">
              Everything in one place — profiles, projects, and places to connect.
            </p>
          </div>

          <div
            className="links__grid"
            ref={gridRef as React.RefObject<HTMLDivElement>}
          >
            {LINKS.map((link, i) => (
              <LinkCard
                key={link.id}
                link={link}
                index={i}
                visible={gridVisible}
              />
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}
