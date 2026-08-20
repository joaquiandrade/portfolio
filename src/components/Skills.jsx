import { skillGroups } from '../data/skills'
import useScrollReveal from '../hooks/useScrollReveal'
import './Skills.css'

export default function Skills() {
  const ref = useScrollReveal()

  return (
    <section id="stack" className="section skills" ref={ref}>
      <div className="container">
        <p className="eyebrow reveal">// stack</p>
        <h2 className="section-title reveal">Tecnologías con las que trabajo</h2>
        <p className="section-lede reveal">
          Un stack pensado para construir de punta a punta: del backend en .NET a la base de
          datos, pasando por el frontend y las herramientas del día a día.
        </p>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div key={group.id} className="skills-card reveal">
              <p className="skills-card-prompt">{group.prompt}</p>
              <h3 className="skills-card-label">{group.label}</h3>
              <ul className="skills-badges">
                {group.items.map((item) => (
                  <li key={item} className="badge">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
