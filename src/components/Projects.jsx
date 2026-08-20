import { projects } from '../data/projects'
import useScrollReveal from '../hooks/useScrollReveal'
import FeaturedProduct from './FeaturedProduct'
import './Projects.css'

function ProjectMock({ name, accent }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className={`project-mock project-mock-${accent}`}>
      <div className="project-mock-bar">
        <span />
        <span />
        <span />
      </div>
      <div className="project-mock-body">
        <span className="project-mock-initials">{initials}</span>
      </div>
    </div>
  )
}

export default function Projects() {
  const ref = useScrollReveal()

  // El producto propio se muestra de manera destacada
  const featuredProject = projects.find((project) => project.featured)

  // El resto continúa mostrándose como tarjetas normales
  const regularProjects = projects.filter((project) => !project.featured)

  return (
    <section id="proyectos" className="section projects" ref={ref}>
      <div className="container">

        <p className="eyebrow reveal">$ proyectos</p>

        <h2 className="section-title reveal">
          Proyectos
        </h2>

        <p className="section-lede reveal">
          Algunos de los sistemas y soluciones que desarrollé para
          resolver necesidades reales de distintos negocios.
        </p>

        {/* PRODUCTO PROPIO */}
        {featuredProject && (
          <div className="reveal">
            <FeaturedProduct />
          </div>
        )}

        {/* PROYECTOS NORMALES */}
        <div className="projects-grid">
          {regularProjects.map((project) => (
            <article
              key={project.id}
              className="project-card reveal"
            >
{project.image ? (
  <div className="project-image">
    <img
      src={project.image}
      alt={`Captura de ${project.name}`}
    />
  </div>
) : (
  <ProjectMock
    name={project.name}
    accent={project.accent}
  />
)}

              <div className="project-card-body">

                <h3 className="project-card-title">
                  {project.name}
                </h3>

                <p className="project-card-description">
                  {project.description}
                </p>

                <ul className="project-card-stack">
                  {project.stack.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>

                <div className="project-card-actions">

                  {project.demo && (
                    <a
                      href={project.demo}
                      className="btn btn-secondary project-btn"
                    >
                      Ver más
                    </a>
                  )}

                  {project.github && (
                    <a
                      href={project.github}
                      className="btn btn-secondary project-btn"
                    >
                      GitHub
                    </a>
                  )}

                </div>

              </div>
            </article>
          ))}

          <article className="project-card project-card-empty reveal">
            <div className="project-card-empty-content">
              <span className="project-card-empty-mark">+</span>
              <p>Próximo proyecto en camino</p>
            </div>
          </article>

        </div>
      </div>
    </section>
  )
}