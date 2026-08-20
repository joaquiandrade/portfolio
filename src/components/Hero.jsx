import { useEffect, useState } from 'react'
import './Hero.css'

const LINES = [
  { type: 'prompt', text: 'joaquina --why-code' },
  { type: 'blank' },
  { type: 'output', text: 'curiosidad > código' },
  { type: 'output', text: 'problema  →  lógica  →  solución' },
  { type: 'output', text: 'aprender haciendo' },
  { type: 'status', text: 'estado : construyendo...' },
]

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    if (visibleLines >= LINES.length) return
    const delay = LINES[visibleLines].type === 'prompt' ? 500 : 220
    const t = setTimeout(() => setVisibleLines((v) => v + 1), delay)
    return () => clearTimeout(t)
  }, [visibleLines])

  return (
    <section id="top" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">// desarrolladora web</p>
          <h1 className="hero-title">
            Hola, soy <span className="hero-title-accent">Joaquina</span>
          </h1>
          <p className="hero-role">Full Stack Developer / Desarrolladora Web</p>
          <p className="hero-description">
            Creo soluciones digitales a medida para negocios que buscan simplificar procesos, ahorrar tiempo y trabajar de una forma más eficiente.
              <br />
            Desarrollo aplicaciones web, APIs y sistemas de gestión utilizando
            tecnologías modernas y el ecosistema .NET.
          </p>
          <div className="hero-actions">
            <a href="#proyectos" className="btn btn-primary">
              Conocé mis proyectos
            </a>
            <a href="#contacto" className="btn btn-secondary">
              Hablemos de tu idea 
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden={false}>
          <div className="terminal">
            <div className="terminal-bar">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
              <span className="terminal-title">joaquina.dev — zsh</span>
            </div>
            <div className="terminal-body">
              {LINES.slice(0, visibleLines).map((line, i) => {
                if (line.type === 'blank') return <div key={i} className="terminal-blank" />
                if (line.type === 'prompt') {
                  return (
                    <p key={i} className="terminal-line terminal-prompt">
                      <span className="terminal-caret">$</span> {line.text}
                    </p>
                  )
                }
                if (line.type === 'status') {
                  return (
                    <p key={i} className="terminal-line terminal-status">
                      {line.text}
                    </p>
                  )
                }
                return (
                  <p key={i} className="terminal-line">
                    {line.text}
                  </p>
                )
              })}
              <span className={`terminal-cursor ${visibleLines >= LINES.length ? 'is-blinking' : ''}`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
