// Grano de película sobre toda la página: un tile SVG feTurbulence en data-URI.
// Sin JS. La animación (8 fps) y el blend viven en CSS bajo media queries.
const NOISE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>"
  )

export default function Grain() {
  return <div className="grain" aria-hidden="true" style={{ backgroundImage: `url("${NOISE}")` }} />
}
