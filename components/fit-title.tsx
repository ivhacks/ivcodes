'use client'

import { useRef, useEffect } from 'react'

export default function FitTitle({ children }: { children: string }) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const fit = () => {
      const container = el.parentElement!
      let size = 6 // rem start — roughly 5-6 lines of body text height
      el.style.fontSize = `${size}rem`
      while (el.scrollWidth > container.clientWidth && size > 1) {
        size -= 0.25
        el.style.fontSize = `${size}rem`
      }
    }

    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [children])

  return (
    <h1 ref={ref} className="m-0 whitespace-nowrap leading-none" style={{ fontSize: '12rem' }}>
      {children}
    </h1>
  )
}
