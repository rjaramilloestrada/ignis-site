import { useState } from 'react'
import { SERVICE_TABS } from '../data/services.js'

export default function Services() {
  const [active, setActive] = useState(SERVICE_TABS[0].id)

  return (
    <section id="servicios" className="section">
      <div className="sec-label">— Servicios</div>
      <h2 className="sec-headline">
        Lo que<span className="ac"> construimos</span>
      </h2>
      <p className="sec-subtext">
        Desarrollo digital y agentes de IA para empresas que quieren crecer sin
        contratar más personas.
      </p>

      <div className="tab-switcher">
        {SERVICE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`tab-btn ${active === tab.id ? 'active' : ''}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {SERVICE_TABS.map((tab) => (
        <div
          key={tab.id}
          id={tab.gridId}
          className={`card-grid ${active === tab.id ? '' : 'hidden'}`}
        >
          {tab.services.map((s) => (
            <div className="service-card" key={s.name}>
              <div className="card-top">
                <span className="card-tag">{s.tag}</span>
                <span className="card-arrow">↗</span>
              </div>
              <h3 className="card-name">{s.name}</h3>
              <p className="card-desc">{s.desc}</p>
              <ul className="card-benefits">
                {s.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </section>
  )
}
