import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Links from './pages/Links'
import PageBackground from './components/PageBackground'
import './App.css'

function App() {
  return (
    <HashRouter>
      <PageBackground />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </HashRouter>
  )
}

export default App
