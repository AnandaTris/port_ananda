'use client'

import { useState } from 'react'

const navigation = [
  { href: '#work', label: 'Work' },
  { href: '#principles', label: 'Principles' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="header-inner">
          <a className="site-mark" href="#main-content">
            <span>ANANDA</span>
            <span aria-hidden="true">/</span>
            <span>PRODUCT + AI BUILDER</span>
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
              <a href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}
