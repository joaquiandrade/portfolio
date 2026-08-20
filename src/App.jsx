import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Services from './components/Services'
import Currently from './components/Currently'
import Contact from './components/Contact'
import Footer from './components/Footer'

import Cotizador from './components/Cotizador/Cotizador'

function Portfolio() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Currently />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Portfolio />} />

        <Route path="/cotizador" element={<Cotizador />} />

      </Routes>
    </BrowserRouter>
  )
}