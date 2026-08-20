import useScrollReveal from '../hooks/useScrollReveal'
import './Contact.css'

const CONTACT_LINKS = [
  { id: 'linkedin', label: 'LinkedIn', value: 'Joaquina Andrade', href: 'https://www.linkedin.com/in/joaquina-andrade-383520187/' },
  { id: 'email', label: 'Email', value: 'joaquinaandrade27@gmail.com', href: 'mailto:joaquinaandrade27@gmail.com' }
]

export default function Contact() {
  const ref = useScrollReveal()

  return (
    <section id="contacto" className="section contact" ref={ref}>
      <div className="container">
        <div className="contact-panel reveal">
          <p className="eyebrow">// contacto</p>
          <h2 className="section-title">¿Tenés un proyecto en mente?</h2>
          <p className="section-lede" style={{ marginBottom: '2.5rem' }}>
            Contame de qué se trata. Respondo por cualquiera de estos medios.
          </p>

          <div className="contact-links">
            {CONTACT_LINKS.map((link) => (
              <a key={link.id} href={link.href} className="contact-link" target="_blank" rel="noreferrer">
                <span className="contact-link-label">{link.label}</span>
                <span className="contact-link-value">{link.value}</span>
                <span className="contact-link-arrow">→</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
