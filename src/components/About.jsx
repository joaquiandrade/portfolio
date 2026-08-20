import useScrollReveal from '../hooks/useScrollReveal'
import './About.css'

export default function About() {
  const ref = useScrollReveal()

  return (
    <section id="sobre-mi" className="section about" ref={ref}>
      <div className="container about-grid">
        <div className="reveal">
          <p className="eyebrow">// sobre-mí</p>
          <h2 className="section-title">Quién soy</h2>
        </div>

        <div className="about-content reveal">
          <p>
            Soy <strong>Joaquina Andrade</strong>, Full Stack Developer y estudiante de la
            Tecnicatura Universitaria en Programación en la UTN FRGP. Trabajo principalmente
            con el ecosistema <strong>.NET</strong>, construyendo aplicaciones web, APIs y
            sistemas de gestión. Me gusta involucrarme en cada proyecto, entender cómo funciona el negocio
            y transformar sus necesidades y problemas en soluciones de software simples y útiles.
          </p>
          <p>
        Me interesa entender el problema real detrás de cada negocio: cómo trabajan, qué tareas les quitan
        tiempo y qué necesitan para hacer su día a día más simple. Mi objetivo es crear soluciones pensadas para
        cada cliente y adaptadas a la forma en que trabaja su negocio.
          </p>
        </div>
      </div>
    </section>
  )
}
