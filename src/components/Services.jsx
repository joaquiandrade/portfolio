import { services } from '../data/services'
import useScrollReveal from '../hooks/useScrollReveal'
import './Services.css'

export default function Services() {
  const ref = useScrollReveal()

  return (
    <section id="servicios" className="section services" ref={ref}>
      <div className="container">
        <p className="eyebrow reveal">&gt; qué puedo hacer</p>
        <h2 className="section-title reveal">Esto es lo que resuelvo</h2>
        <p className="section-lede reveal">
          Sin tecnicismos: si tu negocio necesita algo de esto, probablemente pueda ayudarte.
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-item reveal">
              <h3 className="service-item-title">{service.title}</h3>
              <p className="service-item-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
