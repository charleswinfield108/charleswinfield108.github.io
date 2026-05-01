import { Mail, MapPin } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import ContactForm from '../components/ui/ContactForm'
import FooterCTA from '../components/sections/FooterCTA'
import './Contact.css'

export default function Contact() {
  const { t } = useTranslation()
  const { ref: infoRef, visible: infoVisible } = useReveal()
  const { ref: formRef, visible: formVisible } = useReveal()

  return (
    <main className="contact-page">
      <div className="container">

        <div className="contact-page__heading">
          <span className="section-label">{t('contact.label')}</span>
          <h1>
            {t('contact.heading')} <span className="contact-page__gradient">{t('contact.heading_accent')}</span>
          </h1>
          <p className="contact-page__sub">{t('contact.subtitle')}</p>
        </div>

        <div className="contact-page__body">

          <aside
            ref={infoRef as React.RefObject<HTMLElement>}
            className={`contact-page__info reveal reveal-left ${infoVisible ? 'visible' : ''}`}
          >
            <h2>{t('contact.info_heading')}</h2>

            <ul className="contact-page__info-list">
              <li>
                <span className="contact-page__info-icon"><Mail size={18} /></span>
                <div>
                  <span className="contact-page__info-label">{t('contact.email_label')}</span>
                  <a href="mailto:charleswinfield108@gmail.com">charleswinfield108@gmail.com</a>
                </div>
              </li>
              <li>
                <span className="contact-page__info-icon"><MapPin size={18} /></span>
                <div>
                  <span className="contact-page__info-label">{t('contact.location_label')}</span>
                  <span>{t('contact.location_value')}</span>
                </div>
              </li>
            </ul>

            <div className="contact-page__socials">
              <a
                href="https://www.linkedin.com/in/charles-winfield-full-stack/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-page__social-btn"
                aria-label="LinkedIn"
              >
                <img src="/assets/icons/linkedin.svg" alt="" aria-hidden="true" className="contact-page__social-icon" />
                {t('contact.linkedin')}
              </a>
              <a
                href="https://github.com/charleswinfield108"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-page__social-btn"
                aria-label="GitHub"
              >
                <img src="/assets/icons/github-sm.svg" alt="" aria-hidden="true" className="contact-page__social-icon" />
                {t('contact.github')}
              </a>
            </div>
          </aside>

          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className={`contact-page__form-wrap reveal reveal-right ${formVisible ? 'visible' : ''}`}
          >
            <ContactForm />
          </div>

        </div>
      </div>
      <FooterCTA showBanner={false} />
    </main>
  )
}
