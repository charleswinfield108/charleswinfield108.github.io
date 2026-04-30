import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { SOCIAL_LINKS } from '../../lib/data'
import './FooterCTA.css'

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' as const } },
  viewport: { once: true, amount: 0.2 },
})

export default function FooterCTA({ showBanner = true }: { showBanner?: boolean }) {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-cta" id="contact">
      <div className="container">

        {showBanner && (
          <motion.div
            className="footer-cta__banner"
            {...inView(0)}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <h2 className="footer-cta__banner-title">Let's Build a Project!</h2>
            <p className="footer-cta__banner-sub">
              Interested in working together? Reach out today and let's build something great. I'll bring the code.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Get Started
            </Link>
          </motion.div>
        )}

        <motion.div className="footer-cta__bottom" {...inView(0.15)}>
          <img src="/assets/logo/cw-logo.svg" alt="Charles Winfield" className="footer-cta__logo" />
          <p className="footer-cta__tagline">Building scalable digital products, one line at a time.</p>
          <a href="mailto:charleswinfield108@gmail.com" className="footer-cta__email">
            <Mail size={14} />
            charleswinfield108@gmail.com
          </a>
          <div className="footer-cta__socials">
            {SOCIAL_LINKS.map(link => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                className="footer-cta__social-link" aria-label={link.name}>
                <img src={link.icon} alt={link.imageAlt} />
              </a>
            ))}
          </div>
          <p className="footer-cta__copy">© {year} Charles Winfield. All rights reserved.</p>
        </motion.div>

      </div>
    </footer>
  )
}
