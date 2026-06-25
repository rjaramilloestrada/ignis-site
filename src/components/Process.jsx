import { PROCESS } from '../data/process.js'

export default function Process() {
  return (
    <section id="proceso" className="section section-border">
      <div className="sec-label">— El proceso</div>
      <h2 className="sec-headline">
        Cómo<span className="ac"> trabajamos</span>
      </h2>

      <div className="process-grid">
        {PROCESS.map((p) => (
          <div className="process-step" key={p.num}>
            <div className="process-num">{p.num}</div>
            <h3 className="process-title">{p.title}</h3>
            <p className="process-desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
