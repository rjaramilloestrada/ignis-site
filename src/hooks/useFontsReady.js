import { useEffect, useState } from 'react'

// true cuando las fuentes cargaron o pasaron `maxWait` ms (lo que ocurra
// primero). El hero espera esto para que el wordmark no se revele en fallback.
export default function useFontsReady(maxWait = 500) {
  const [ready, setReady] = useState(() => !(typeof document !== 'undefined' && document.fonts))
  useEffect(() => {
    if (ready) return undefined
    let done = false
    const finish = () => {
      if (done) return
      done = true
      setReady(true)
      document.documentElement.classList.remove('fonts-loading')
    }
    document.documentElement.classList.add('fonts-loading')
    const t = setTimeout(finish, maxWait)
    document.fonts.ready.then(finish)
    return () => clearTimeout(t)
  }, [ready, maxWait])
  return ready
}
