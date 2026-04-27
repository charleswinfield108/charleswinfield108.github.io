import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Download } from 'lucide-react'
import './Header.css'

const NAV_LINKS = [
  { label: 'Home',      to: '/'          },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Links',     to: '/links'     },
  { label: 'Contact',   to: '/contact'   },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <NavLink to="/" className="header__brand" onClick={() => setOpen(false)}>
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

          <nav className={`header__nav${open ? ' open' : ''}`}>
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {link.label}
                <span className="header__nav-dot" />
              </NavLink>
            ))}
          </nav>

          <div className="header__actions">
            <a
              href="/assets/charles-winfield-cv.pdf"
              download
              className="btn btn-outline header__hire"
            >
              <Download size={14} />
              Resume
            </a>
            <button
              className="header__menu-btn"
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X size={20} color="white" /> : <Menu size={20} color="white" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
