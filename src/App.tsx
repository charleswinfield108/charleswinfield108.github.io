import { useEffect } from 'react'
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Links from './pages/Links'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Admin from './pages/Admin'
import PageBackground from './components/PageBackground'
import './App.css'

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}

function AppContent() {
  const navigate = useNavigate()
  const location = useLocation()
  const isLoginPage = location.pathname === '/login'

  // Keyboard shortcut: Ctrl+Shift+L to go to login
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
        e.preventDefault()
        navigate('/login')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  return (
    <>
      <PageBackground />
      {!isLoginPage && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/links" element={<Links />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}

export default App
