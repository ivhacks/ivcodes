'use client'

import { useRef, useEffect } from 'react'

export default function FitTitle({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fit = () => {
      // Only fit on desktop — on mobile the CSS handles it with a fixed size
      if (!window.matchMedia('(min-width: 768px)').matches) {
        el.style.fontSize = ''
        return
      }
      const container = el.parentElement!
      let size = 6
      el.style.fontSize = `${size}rem`
      while (el.scrollWidth > container.clientWidth && size > 1) {
        size -= 0.25
        el.style.fontSize = `${size}rem`
      }
      // One extra step down for breathing room
      size -= 0.25
      el.style.fontSize = `${size}rem`
    }

    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [children])

  return (
    <h1 ref={ref} className="m-0 leading-tight text-[1.5em] md:whitespace-nowrap md:leading-[1.2] md:pb-1">
      {children}
    </h1>
  )
}
