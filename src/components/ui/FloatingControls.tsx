import { Sun, Moon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '../../context/ThemeContext'
import './FloatingControls.css'

export default function FloatingControls() {
  const { theme, toggleTheme } = useThemeContext()
  const { i18n } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  return (
    <div className="floating-controls">
      <div className="floating-controls__lang">
        <button
          className={`floating-controls__lang-btn${lang === 'en' ? ' active' : ''}`}
          onClick={() => i18n.changeLanguage('en')}
          aria-label="Switch to English"
        >
          EN
        </button>
        <span className="floating-controls__lang-sep">|</span>
        <button
          className={`floating-controls__lang-btn${lang === 'fr' ? ' active' : ''}`}
          onClick={() => i18n.changeLanguage('fr')}
          aria-label="Passer en français"
        >
          FR
        </button>
      </div>

      <button
        className="floating-controls__theme-btn"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
      </button>
    </div>
  )
}
