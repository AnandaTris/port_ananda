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
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (latest) => setValue(Math.round(latest)),
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
