import { TICKER } from '../../data/ticker.js'

// Marquee CSS puro: el track se duplica (la copia va aria-hidden) y se
// desplaza -50% en loop. Pausa en hover; estático con reduced-motion.
function Row({ hidden }) {
  return (
    <div className="ticker-row" aria-hidden={hidden ? 'true' : undefined}>
      {TICKER.map((item) => (
        <span className="ticker-item" key={item}>
          <span className="ticker-dot" aria-hidden="true">
            ·
          </span>
          {item}
        </span>
      ))}
    </div>
  )
}

export default function Ticker() {
  return (
    <div className="ticker" aria-label="Industrias donde ya trabajamos y stack con el que construimos">
      <div className="ticker-track">
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
