import { SOCIAL_LINKS } from '../../lib/data'
import { useReveal } from '../../hooks/useReveal'
import './FooterCTA.css'

export default function FooterCTA() {
  const year = new Date().getFullYear()
  const { ref: bannerRef, visible: bannerVisible } = useReveal()
  const { ref: bottomRef, visible: bottomVisible } = useReveal()

  return (
    <footer className="footer-cta" id="contact">
      <div className="container">

        {/* CTA Banner */}
        <div
          className={`footer-cta__banner reveal ${bannerVisible ? 'visible' : ''}`}
          ref={bannerRef as React.RefObject<HTMLDivElement>}
        >
          <h2 className="footer-cta__banner-title">Let's Build a Project!</h2>
          <p className="footer-cta__banner-sub">
            Interested in working together? Reach out today and let's build something great. I'll bring the code.
          </p>
          <a
            href="mailto:charleswinfield108@gmail.com"
            className="btn btn-primary"
          >
            Get Started
          </a>
        </div>

        {/* Footer bottom */}
        <div
          className={`footer-cta__bottom reveal ${bottomVisible ? 'visible' : ''}`}
          ref={bottomRef as React.RefObject<HTMLDivElement>}
        >
          <img
            src="/assets/logo/cw-logo.svg"
            alt="Charles Winfield"
            className="footer-cta__logo"
          />
          <p className="footer-cta__tagline">
            Building scalable digital products, one line at a time.
          </p>
          <div className="footer-cta__socials">
            {SOCIAL_LINKS.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-cta__social-link"
                aria-label={link.name}
              >
                <img src={link.icon} alt={link.imageAlt} />
              </a>
            ))}
          </div>
          <p className="footer-cta__copy">
            © {year} Charles Winfield. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}
