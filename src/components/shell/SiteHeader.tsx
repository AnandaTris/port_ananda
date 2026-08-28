'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

const navigation = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#stack', label: 'Stack' },
  { href: '#research', label: 'Research' },
  { href: '#contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const homeAnchor = (anchor: string) => (pathname === '/' ? anchor : `/${anchor}`)

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="site-mark" href={homeAnchor('#main-content')}>
            <span>ANANDA</span>
            <span aria-hidden="true">/</span>
            <span>SINGAPORE</span>
          </a>
          <button
            aria-controls="primary-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="menu-toggle"
            onClick={() => setIsOpen((open) => !open)}
            type="button"
          >
            <span aria-hidden="true">{isOpen ? 'Close' : 'Menu'}</span>
          </button>
          <nav
            aria-label="Primary navigation"
            className={`header-nav${isOpen ? ' is-open' : ''}`}
            id="primary-navigation"
          >
            {navigation.map((item) => (
              <a href={homeAnchor(item.href)} key={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}
