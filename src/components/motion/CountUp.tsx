'use client'

import { animate, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  target: number
  suffix?: string
}

const formatter = new Intl.NumberFormat('en-US')

export function CountUp({ target, suffix = '' }: CountUpProps) {
  const reduceMotion = useReducedMotion()
  const elementRef = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(target)

  useEffect(() => {
    if (reduceMotion || typeof IntersectionObserver === 'undefined') return

    const element = elementRef.current
    if (!element) return

    let controls: ReturnType<typeof animate> | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        controls = animate(0, target, {
          duration: 1.1,
          // The same spring the reveals use, so the one animation that predates
          // the motion layer stops being a stylistic outlier. The clamp is what
          // the overshoot costs: without it the counter briefly displays a
          // number larger than the number of projects that exist.
          ease: [0.34, 1.56, 0.64, 1],
          onUpdate: (latest) => setValue(Math.min(target, Math.round(latest))),
        })
      },
      { threshold: 0.4 },
    )

    observer.observe(element)
    return () => {
      observer.disconnect()
      controls?.stop()
    }
  }, [reduceMotion, target])

  return (
    <span ref={elementRef}>
      {formatter.format(value)}
      {suffix}
    </span>
  )
}
