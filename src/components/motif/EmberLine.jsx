// Línea de sección que se "enciende": 1px de borde, un segmento de acento que
// crece de izquierda a derecha y una chispa ámbar que la recorre una vez.
// Todo en CSS, disparado por el ancestro [data-revealed="true"] (ver Reveal).
export default function EmberLine({ className = '' }) {
  return (
    <div className={`ember-line ${className}`} aria-hidden="true">
      <span className="ember-line-fill" />
      <span className="ember-line-spark" />
    </div>
  )
}
