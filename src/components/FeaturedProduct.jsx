import './FeaturedProduct.css'

import gestionDashboard from '../assets/gestion.png'
import gestionVentas from '../assets/facturacion.png'
import gestionArticulos from '../assets/articulos.png'
import gestionLogin from '../assets/login.png'

const screenshots = [
  {
    image: gestionDashboard,
    label: 'Dashboard',
    className: 'gallery-dashboard',
  },
  {
    image: gestionVentas,
    label: 'Facturación',
    className: 'gallery-facturacion',
  },
  {
    image: gestionArticulos,
    label: 'Artículos',
    className: 'gallery-articulos',
  },
  {
    image: gestionLogin,
    label: 'Login',
    className: 'gallery-login',
  },
]

export default function FeaturedProduct() {
  return (
    <article className="featured-product">

      <div className="featured-product-content">

        {/* INFORMACIÓN */}

        <div className="featured-product-info">

          <div className="featured-product-badge">
            <span className="badge-dot" />
            SOLUCIÓN PARA NEGOCIOS
          </div>

          <h3 className="featured-product-title">
            Sistema de gestión
            <span> para comercios</span>
          </h3>

          <p className="featured-product-description">
            Una herramienta pensada para pequeños y medianos comercios
            que quieren dejar atrás las planillas y tener su negocio
            organizado en un solo lugar.
          </p>

          <div className="featured-product-features">

            <div className="product-feature">
              <span>01</span>
              <strong>Ventas</strong>
              <p>Registrá y consultá tus operaciones.</p>
            </div>

            <div className="product-feature">
              <span>02</span>
              <strong>Stock</strong>
              <p>Conocé qué tenés disponible en todo momento.</p>
            </div>

            <div className="product-feature">
              <span>03</span>
              <strong>Artículos</strong>
              <p>Administrá productos, precios y categorías.</p>
            </div>

            <div className="product-feature">
              <span>04</span>
              <strong>Clientes</strong>
              <p>Centralizá la información de tus clientes.</p>
            </div>

          </div>

          <div className="featured-product-actions">
            <a
              href="#contacto"
              className="btn btn-primary"
            >
              Quiero saber más →
            </a>
          </div>

        </div>


        {/* GALERÍA */}

        <div className="featured-product-visual">

          <div className="product-gallery-grid">

            {screenshots.map((screenshot) => (
              <div
                key={screenshot.label}
                className={`gallery-image ${screenshot.className}`}
              >

                <img
                  src={screenshot.image}
                  alt={screenshot.label}
                />

                <span className="gallery-label">
                  {screenshot.label}
                </span>

              </div>
            ))}

          </div>

          <div className="featured-product-floating">
            <span>✓</span>
            Adaptable a tu negocio
          </div>

        </div>

      </div>


      {/* TECNOLOGÍAS */}

      <div className="featured-product-footer">

        <span>Construido con</span>

        <div className="product-stack">
          <span>C#</span>
          <span>.NET 8</span>
          <span>ASP.NET Core</span>
          <span>SQL Server</span>
          <span>JavaScript</span>
        </div>

      </div>

    </article>
  )
}