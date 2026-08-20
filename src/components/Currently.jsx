import useScrollReveal from '../hooks/useScrollReveal'
import './Currently.css'

const ITEMS = [
  'Desarrollando soluciones digitales para resolver problemas reales de negocios',
  'Construyendo sistemas, APIs y aplicaciones web a medida',
  'Creando productos propios y explorando nuevas ideas para ayudar a otros negocios',
  'Estudiando Tecnicatura Universitaria en Programación — UTN FRGP',
]

export default function Currently() {
  const ref = useScrollReveal()

  return (
    <section className="section currently" ref={ref}>
      <div className="container">
        <div className="currently-panel reveal">
          <p className="eyebrow">~ actualmente</p>
          <ul className="currently-list">
            {ITEMS.map((item) => (
              <li key={item}>
                <span className="currently-pulse" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
