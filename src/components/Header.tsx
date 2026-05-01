import { NavLink } from 'react-router-dom'
import { Download, House, FolderOpen, Link2, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import './Header.css'

const NAV_ICONS = [House, FolderOpen, Link2, Mail]

export default function Header() {
  const { t } = useTranslation()

  const navLinks = [
    { key: 'nav.home',      to: '/'          },
    { key: 'nav.portfolio', to: '/portfolio' },
    { key: 'nav.links',     to: '/links'     },
    { key: 'nav.contact',   to: '/contact'   },
  ]

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__inner">
            <NavLink to="/" className="header__brand">
              <img
                src="/assets/logo/cw-logo.svg"
                alt="Charles Winfield logo"
                className="header__logo"
              />
              <div className="header__title">
                Charles Winfield
                <span className="header__title-role">| Fullstack Developer</span>
              </div>
            </NavLink>

            <div className="header__spacer" />

            <nav className="header__nav">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {t(link.key)}
                  <span className="header__nav-dot" />
                </NavLink>
              ))}
            </nav>

            <div className="header__actions">
              <a
                href="/assets/images/CW Resume.pdf"
                download
                className="btn btn-outline header__hire"
              >
                {t('nav.resume')}
                <Download size={14} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navLinks.map((link, i) => {
          const Icon = NAV_ICONS[i]
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `mobile-nav__item${isActive ? ' active' : ''}`}
            >
              <Icon size={22} />
              <span>{t(link.key)}</span>
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}
