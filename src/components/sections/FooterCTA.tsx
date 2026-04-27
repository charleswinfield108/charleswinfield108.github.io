import { SOCIAL_LINKS } from '../../lib/data'
import './FooterCTA.css'

export default function FooterCTA() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-cta section" id="contact">
      <div className="container">
        <div className="footer-cta__inner">
          <div className="footer-cta__left">
            <h2 className="footer-cta__title">
              Let's Build a <span>Project!</span>
            </h2>
            <p className="footer-cta__sub">
              Reach Out To Me Today, and Let's Build Something Great.
            </p>
            <a
              href="mailto:charleswinfield108@gmail.com"
              className="btn btn-primary"
            >
              Get Started Today
            </a>
          </div>

          <div className="footer-cta__right">
            <p className="footer-cta__connect-label">Connect With Me Online</p>
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
          </div>
        </div>

        <div className="footer-cta__bar">
          <p className="footer-cta__copy">
            © {year} Charles Winfield. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
