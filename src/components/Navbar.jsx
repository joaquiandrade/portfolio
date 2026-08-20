import { useEffect, useState } from 'react'
import './Navbar.css'

const LINKS = [
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#stack', label: 'Stack' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#servicios', label: 'Qué hago' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`navbar ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#top" className="navbar-brand">
          <span className="navbar-brand-mark">&lt;/&gt;</span>
          joaquiandrade<span className="navbar-brand-dot">.</span>dev
        </a>

        <nav className="navbar-links" aria-label="Navegación principal">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#contacto" className="btn btn-secondary navbar-cta">
          Contactarme
        </a>

        <button
          className={`navbar-toggle ${open ? 'is-open' : ''}`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav className={`navbar-mobile ${open ? 'is-open' : ''}`} aria-label="Navegación mobile">
        {LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#contacto" className="btn btn-primary" onClick={() => setOpen(false)}>
          Contactarme
        </a>
      </nav>
    </header>
  )
}
