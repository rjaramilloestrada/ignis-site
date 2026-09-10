// Numeral gigante contorneado que se rellena de acento al encenderse.
// Se enciende por CSS cuando el ancestro tiene data-revealed="true", o de
// forma explícita con `lit` (la escalera lo controla por etapa de scroll).
export default function BigNumeral({ children, lit, className = '', delay = 0 }) {
  return (
    <span
      className={`big-num ${className}`}
      data-lit={lit === undefined ? undefined : String(lit)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}
