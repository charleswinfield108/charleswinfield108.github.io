import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
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
      </Routes>
    </HashRouter>
  )
}

export default App
