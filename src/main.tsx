import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n/index'
import './index.css'
import App from './App.tsx'

// Apply saved theme before first paint to avoid flash
const saved = localStorage.getItem('theme')
const osLight = window.matchMedia('(prefers-color-scheme: light)').matches
document.documentElement.dataset.theme = saved || (osLight ? 'light' : 'dark')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
