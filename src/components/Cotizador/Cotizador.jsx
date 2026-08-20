import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import { projectTypes, features, services } from '../../data/cotizador'
import './Cotizador.css'

export default function Cotizador() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedFeatures, setSelectedFeatures] = useState([])
  const [selectedServices, setSelectedServices] = useState([])

  const [showModal, setShowModal] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [contactSent, setContactSent] = useState(false)

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')

  const [turnstileToken, setTurnstileToken] = useState('')
  const [contactTurnstileToken, setContactTurnstileToken] = useState('')

  const [message, setMessage] = useState('')

  const projectPrice = selectedProject?.basePrice || 0

  const featuresTotal = selectedFeatures.reduce(
    (total, feature) => total + feature.price,
    0
  )

  const servicesTotal = selectedServices
    .filter((service) => !service.isMonthly)
    .reduce(
      (total, service) => total + service.price,
      0
    )

  const monthlyTotal = selectedServices
    .filter((service) => service.isMonthly)
    .reduce(
      (total, service) => total + service.price,
      0
    )

  const total =
    projectPrice +
    featuresTotal +
    servicesTotal

  const formatPrice = (value) => {
    return `$${value.toLocaleString('es-AR')}`
  }

  const toggleFeature = (feature) => {
    setSelectedFeatures((current) => {
      const exists = current.some(
        (item) => item.id === feature.id
      )

      if (exists) {
        return current.filter(
          (item) => item.id !== feature.id
        )
      }

      return [...current, feature]
    })
  }

  const toggleService = (service) => {
    setSelectedServices((current) => {
      const exists = current.some(
        (item) => item.id === service.id
      )

      if (exists) {
        return current.filter(
          (item) => item.id !== service.id
        )
      }

      return [...current, service]
    })
  }

  const isFeatureSelected = (id) => {
    return selectedFeatures.some(
      (feature) => feature.id === id
    )
  }

  const isServiceSelected = (id) => {
    return selectedServices.some(
      (service) => service.id === id
    )
  }

  const handleSendQuote = async () => {
    if (!nombre.trim()) {
      setMessage('Ingresá tu nombre.')
      return
    }

    if (!email.trim()) {
      setMessage('Ingresá tu email.')
      return
    }

    if (!turnstileToken) {
      setMessage('Completá la verificación de seguridad.')
      return
    }

    setSending(true)
    setMessage('')

    try {
      const response = await fetch(
        '/api/send-quote',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre,
            email,
            project: selectedProject,
            features: selectedFeatures,
            services: selectedServices,
            total,
            monthlyTotal,
            turnstileToken
          })
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.message ||
          'No se pudo enviar el presupuesto.'
        )
      }

      setSent(true)

    } catch (error) {

      console.error(
        'Error enviando presupuesto:',
        error
      )

      setMessage(
        'No pudimos enviar el presupuesto. Intentá nuevamente.'
      )

    } finally {
      setSending(false)
    }
  }

  const handleSendContact = async (e) => {
    e.preventDefault()

    const form = e.currentTarget

    const contactNombre = form.nombre.value.trim()
    const contactEmail = form.email.value.trim()
    const tipoProyecto = form.tipoProyecto.value
    const mensaje = form.mensaje.value.trim()

    if (!contactNombre) {
      setMessage('Ingresá tu nombre.')
      return
    }

    if (!contactEmail) {
      setMessage('Ingresá tu email.')
      return
    }

    if (!mensaje) {
      setMessage('Contame brevemente sobre tu proyecto.')
      return
    }

    if (!contactTurnstileToken) {
      setMessage('Completá la verificación de seguridad.')
      return
    }

    setSending(true)
    setMessage('')

    try {
      const response = await fetch(
        '/api/send-contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nombre: contactNombre,
            email: contactEmail,
            tipoProyecto,
            mensaje,
            turnstileToken: contactTurnstileToken
          })
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.message ||
          'No se pudo enviar la consulta.'
        )
      }

      form.reset()
      setContactTurnstileToken('')
      setMessage('')
      setContactSent(true)

    } catch (error) {

      console.error(
        'Error enviando consulta:',
        error
      )

      setMessage(
        'No pudimos enviar la consulta. Intentá nuevamente.'
      )

    } finally {
      setSending(false)
    }
  }

  return (
    <div className="cotizador-page">

      <section className="hero">

        <div className="hero-content">

          <div className="hero-label">
            ✦ COTIZADOR DE PROYECTOS WEB
          </div>

          <h1>
            Convertí tu idea en{' '}
            <span>
              un proyecto real.
            </span>
          </h1>

          <p>
            Elegí lo que necesitás, personalizá tu proyecto
            y obtené una estimación de presupuesto al instante.
          </p>

        </div>

      </section>

      <main
        id="cotizador"
        className="quote-container"
      >

        <div className="quote-content">

          <section className="quote-section">

            <div className="section-heading">

              <div className="step-number">
                01
              </div>

              <div>
                <h2>
                  Tipo de proyecto
                </h2>

                <p>
                  ¿Qué tipo de solución necesitás?
                </p>
              </div>

            </div>

            <div className="project-grid">

              {projectTypes.map((project) => (

                <div
                  key={project.id}
                  className={`
                    quote-card
                    project-card
                    ${
                      selectedProject?.id === project.id
                        ? 'selected'
                        : ''
                    }
                  `}
                  onClick={() =>
                    setSelectedProject(project)
                  }
                >

                  <div className="card-top">

                    <div className="card-icon">

                      {project.id === 1 && (
                        <span>◈</span>
                      )}

                      {project.id === 2 && (
                        <span>▣</span>
                      )}

                      {project.id === 3 && (
                        <span>◆</span>
                      )}

                      {project.id === 4 && (
                        <span>⌘</span>
                      )}

                    </div>

                    <div className="selection-check">
                      ✓
                    </div>

                  </div>

                  <h3>
                    {project.name}
                  </h3>

                  <p>
                    {project.description}
                  </p>

                  <div className="card-price">

                    Desde

                    <strong>
                      {formatPrice(project.basePrice)}
                    </strong>

                  </div>

                </div>

              ))}

            </div>

          </section>

          <section className="quote-section">

            <div className="section-heading">

              <div className="step-number">
                02
              </div>

              <div>

                <h2>
                  Funcionalidades
                </h2>

                <p>
                  Personalizá tu proyecto con las
                  funciones que necesitás.
                </p>

              </div>

            </div>

            <div className="options-grid">

              {features.map((feature) => (

                <div
                  key={feature.id}
                  className={`
                    quote-option
                    feature-option
                    ${
                      isFeatureSelected(feature.id)
                        ? 'selected'
                        : ''
                    }
                  `}
                  onClick={() =>
                    toggleFeature(feature)
                  }
                >

                  <div className="option-check">
                    ✓
                  </div>

                  <div className="option-info">

                    <h3>
                      {feature.name}
                    </h3>

                    <p>
                      {feature.description}
                    </p>

                  </div>

                  <div className="option-price">
                    +{formatPrice(feature.price)}
                  </div>

                </div>

              ))}

            </div>

          </section>

          <section className="quote-section">

            <div className="section-heading">

              <div className="step-number">
                03
              </div>

              <div>

                <h2>
                  Servicios adicionales
                </h2>

                <p>
                  Sumá servicios para completar
                  tu proyecto.
                </p>

              </div>

            </div>

            <div className="options-grid">

              {services.map((service) => (

                <div
                  key={service.id}
                  className={`
                    quote-option
                    service-option
                    ${
                      isServiceSelected(service.id)
                        ? 'selected'
                        : ''
                    }
                  `}
                  onClick={() =>
                    toggleService(service)
                  }
                >

                  <div className="option-check">
                    ✓
                  </div>

                  <div className="option-info">

                    <h3>
                      {service.name}
                    </h3>

                    <p>
                      {service.description}
                    </p>

                  </div>

                  <div className="option-price">

                    +{formatPrice(service.price)}

                    {service.isMonthly && (
                      <small>
                        /mes
                      </small>
                    )}

                  </div>

                </div>

              ))}

            </div>

          </section>

        </div>

        <aside className="quote-summary">

          <div className="summary-header">

            <div>

              <span>
                TU PRESUPUESTO
              </span>

              <h2>
                Resumen
              </h2>

            </div>

            <div className="summary-icon">
              $
            </div>

          </div>

          <div className="summary-items">

            <div className="summary-line">

              <span>
                Proyecto
              </span>

              <strong>
                {formatPrice(projectPrice)}
              </strong>

            </div>

            <div className="summary-line">

              <span>
                Funcionalidades
              </span>

              <strong>
                {formatPrice(featuresTotal)}
              </strong>

            </div>

            <div className="summary-line">

              <span>
                Servicios
              </span>

              <strong>
                {formatPrice(servicesTotal)}
              </strong>

            </div>

          </div>

          <div className="summary-divider" />

          <div className="total-container">

            <span>
              Total estimado
            </span>

            <strong>
              {formatPrice(total)}
            </strong>

          </div>

          <div className="monthly-container">

            <div>

              <span>
                Mantenimiento
              </span>

              <small>
                Servicio mensual
              </small>

            </div>

            <strong>
              {formatPrice(monthlyTotal)} / mes
            </strong>

          </div>

          <button
            className="generate-button"
            type="button"
            onClick={() => {
              setMessage('')
              setSent(false)
              setShowModal(true)
            }}
          >

            Generar presupuesto

            <span>
              →
            </span>

          </button>

          <p className="summary-note">

            * Los valores son estimativos y pueden variar
            según los requerimientos finales del proyecto.

          </p>

        </aside>

      </main>

      <section
        id="como-funciona"
        className="how-it-works"
      >

        <div className="how-header">

          <span className="how-label">
            CÓMO FUNCIONA
          </span>

          <h2>
            Cotizar es simple.
          </h2>

          <p>
            Completá estos tres pasos y obtené una estimación
            de tu proyecto en pocos minutos.
          </p>

        </div>

        <div className="steps-container">

          <div className="simple-step">

            <span className="simple-step-number">
              01
            </span>

            <div>

              <h3>
                Elegí tu proyecto
              </h3>

              <p>
                Seleccioná el tipo de solución que necesitás.
              </p>

            </div>

          </div>

          <div className="step-arrow">
            →
          </div>

          <div className="simple-step">

            <span className="simple-step-number">
              02
            </span>

            <div>

              <h3>
                Personalizalo
              </h3>

              <p>
                Agregá las funcionalidades y servicios que quieras.
              </p>

            </div>

          </div>

          <div className="step-arrow">
            →
          </div>

          <div className="simple-step">

            <span className="simple-step-number">
              03
            </span>

            <div>

              <h3>
                Obtené tu presupuesto
              </h3>

              <p>
                Revisá el valor estimado de tu proyecto.
              </p>

            </div>

          </div>

        </div>

        <div className="estimate-note">

          <span className="estimate-note-icon">
            i
          </span>

          <span>
            El valor obtenido es una estimación inicial y puede variar
            según los requerimientos finales del proyecto.
          </span>

        </div>

      </section>

      <section
        id="contacto"
        className="contact-section"
      >

        <div className="contact-container">

          <div className="contact-info">

            <span className="contact-label">
              CONTACTO
            </span>

            <h2>
              ¿Hablamos de{' '}
              <span>
                tu proyecto?
              </span>
            </h2>

            <p>
              Contame qué tenés en mente, qué necesitás
              desarrollar o qué problema querés resolver.
              Analicemos juntos la mejor solución.
            </p>

            <div className="contact-details">

              <a
                href="mailto:joaquinaandrade27@gmail.com"
                className="contact-detail"
              >

                <span className="contact-detail-icon">
                  ✉
                </span>

                <div>

                  <small>
                    Email
                  </small>

                  <strong>
                    joaquinaandrade27@gmail.com
                  </strong>

                </div>

              </a>

            </div>

          </div>

          <div className="contact-form-container">

            <div className="contact-form-header">

              <span>
                CONTAME SOBRE TU PROYECTO
              </span>

              <h3>
                Empecemos una conversación
              </h3>

            </div>

            <form
              className="contact-form"
              onSubmit={handleSendContact}
            >

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="contact-nombre">
                    Nombre
                  </label>

                  <input
                    type="text"
                    id="contact-nombre"
                    name="nombre"
                    placeholder="Tu nombre"
                  />

                </div>

                <div className="form-group">

                  <label htmlFor="contact-email">
                    Email
                  </label>

                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="tu@email.com"
                  />

                </div>

              </div>

              <div className="form-group">

                <label htmlFor="tipoProyecto">
                  Tipo de proyecto
                </label>

                <select
                  id="tipoProyecto"
                  name="tipoProyecto"
                  defaultValue=""
                >

                  <option value="">
                    Seleccioná una opción
                  </option>

                  {projectTypes.map((project) => (

                    <option
                      key={project.id}
                      value={project.name}
                    >
                      {project.name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="form-group">

                <label htmlFor="mensaje">
                  Contame sobre tu proyecto
                </label>

                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="6"
                  placeholder="¿Qué necesitás desarrollar? ¿Qué problema querés resolver? ¿Hay alguna funcionalidad que consideres importante?"
                />

              </div>

              <div className="turnstile-container">

                <Turnstile
                  siteKey={
                    import.meta.env.VITE_TURNSTILE_SITE_KEY
                  }
                  onSuccess={(token) => {
                    setContactTurnstileToken(token)
                    setMessage('')
                  }}
                  onExpire={() => {
                    setContactTurnstileToken('')
                  }}
                  onError={() => {
                    setContactTurnstileToken('')
                  }}
                />

              </div>

              {message && (
                <p className="quote-modal-message">
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="contact-submit"
                disabled={sending}
              >

                {sending
                  ? 'Enviando...'
                  : 'Enviar consulta'
                }

                {!sending && (
                  <span>
                    →
                  </span>
                )}

              </button>

            </form>

          </div>

        </div>

      </section>

      {/* MODAL DEL COTIZADOR */}

      {showModal && (

        <div className="quote-modal-overlay">

          <div className="quote-modal">

            {!sent ? (

              <>

                <button
                  type="button"
                  className="quote-modal-close"
                  onClick={() => {
                    setShowModal(false)
                    setMessage('')
                  }}
                >
                  ×
                </button>

                <span className="quote-modal-label">
                  TU PRESUPUESTO
                </span>

                <h2>
                  Recibí tu cotización
                </h2>

                <p>
                  Dejanos tus datos y te enviaremos el detalle
                  de tu presupuesto por email.
                </p>

                <div className="quote-modal-summary">

                  <div>

                    <span>
                      Proyecto
                    </span>

                    <strong>
                      {selectedProject?.name ||
                        'No seleccionado'}
                    </strong>

                  </div>

                  <div>

                    <span>
                      Total estimado
                    </span>

                    <strong>
                      {formatPrice(total)}
                    </strong>

                  </div>

                  {monthlyTotal > 0 && (

                    <div>

                      <span>
                        Mantenimiento
                      </span>

                      <strong>
                        {formatPrice(monthlyTotal)} / mes
                      </strong>

                    </div>

                  )}

                </div>

                <div className="quote-modal-form">

                  <div className="form-group">

                    <label htmlFor="quote-nombre">
                      Nombre
                    </label>

                    <input
                      id="quote-nombre"
                      type="text"
                      placeholder="Tu nombre"
                      value={nombre}
                      onChange={(e) =>
                        setNombre(e.target.value)
                      }
                    />

                  </div>

                  <div className="form-group">

                    <label htmlFor="quote-email">
                      Email
                    </label>

                    <input
                      id="quote-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />

                  </div>

                  <div className="turnstile-container">

                    <Turnstile
                      siteKey={
                        import.meta.env
                          .VITE_TURNSTILE_SITE_KEY
                      }
                      onSuccess={(token) => {
                        setTurnstileToken(token)
                        setMessage('')
                      }}
                      onExpire={() => {
                        setTurnstileToken('')
                      }}
                      onError={() => {
                        setTurnstileToken('')
                      }}
                    />

                  </div>

                  {message && (

                    <p className="quote-modal-message">
                      {message}
                    </p>

                  )}

                  <button
                    type="button"
                    className="contact-submit"
                    disabled={sending}
                    onClick={handleSendQuote}
                  >

                    {sending
                      ? 'Enviando...'
                      : 'Enviar presupuesto'}

                    {!sending && (
                      <span>
                        →
                      </span>
                    )}

                  </button>

                </div>

              </>

            ) : (

              <div className="quote-success">

                <div className="quote-success-icon">
                  ✓
                </div>

                <h2>
                  ¡Presupuesto enviado!
                </h2>

                <p>
                  Recibimos tu solicitud correctamente.
                  Te enviaremos el detalle por email y nos
                  pondremos en contacto con vos.
                </p>

                <button
                  type="button"
                  className="contact-submit"
                  onClick={() => {
                    setShowModal(false)
                    setSent(false)
                    setNombre('')
                    setEmail('')
                    setTurnstileToken('')
                    setMessage('')
                  }}
                >
                  Cerrar
                </button>

              </div>

            )}

          </div>

        </div>

      )}

      {/* MODAL DE CONTACTO */}

      {contactSent && (

        <div className="quote-modal-overlay">

          <div className="quote-modal">

            <button
              type="button"
              className="quote-modal-close"
              onClick={() => {
                setContactSent(false)
                setMessage('')
              }}
            >
              ×
            </button>

            <div className="quote-success">

              <div className="quote-success-icon">
                ✓
              </div>

              <h2>
                ¡Consulta enviada!
              </h2>

              <p>
                Recibimos tu mensaje correctamente.
                Te contactaré a la brevedad para hablar
                sobre tu proyecto.
              </p>

              <button
                type="button"
                className="contact-submit"
                onClick={() => {
                  setContactSent(false)
                  setMessage('')
                }}
              >
                Cerrar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}