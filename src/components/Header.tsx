import { NavLink } from 'react-router-dom'
import { Download, House, FolderOpen, Link2, Mail } from 'lucide-react'
import './Header.css'

const NAV_LINKS = [
  { label: 'Home',      to: '/',          icon: House      },
  { label: 'Portfolio', to: '/portfolio', icon: FolderOpen },
  { label: 'Links',     to: '/links',     icon: Link2      },
  { label: 'Contact',   to: '/contact',   icon: Mail       },
]

export default function Header() {
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
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => isActive ? 'active' : ''}
                >
                  {link.label}
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
                Resume
                <Download size={14} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="mobile-nav" aria-label="Mobile navigation">
        {NAV_LINKS.map(link => {
          const Icon = link.icon
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `mobile-nav__item${isActive ? ' active' : ''}`}
            >
              <Icon size={22} />
              <span>{link.label}</span>
            </NavLink>
          )
        })}
      </nav>
    </>
  )
}
