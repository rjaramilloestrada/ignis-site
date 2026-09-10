import { BRAND } from '../constants.js'

export default function Footer() {
  return (
    <footer>
      <div className="foot-logo">
        IGN<span className="ac">IS</span>
      </div>
      <div className="foot-center">{BRAND.location}</div>
      <div className="foot-right">© 2026 {BRAND.name} · {BRAND.legalName}</div>
    </footer>
  )
}
