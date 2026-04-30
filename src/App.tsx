import { useEffect } from 'react'
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Header from './components/Header'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Links from './pages/Links'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Admin from './pages/Admin'
import PageBackground from './components/PageBackground'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}


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
      <ScrollToTop />
      <PageBackground />
      {!isLoginPage && <Header />}
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.35 } }} exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}>
          <Routes location={location}>
            <Route path="/"          element={<Home />}      />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/links"     element={<Links />}     />
            <Route path="/contact"   element={<Contact />}   />
            <Route path="/login"     element={<Login />}     />
            <Route path="/backoffice" element={<Admin />}    />
            <Route path="/admin"     element={<Admin />}     />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default App
