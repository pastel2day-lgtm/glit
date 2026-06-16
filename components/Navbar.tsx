'use client'
import { useState, useEffect } from 'react'
import Diamond from '@/components/ui/Diamond'

const links = [
  { label: 'Concept', href: '#concept' },
  { label: 'Editorial', href: '#archive' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-ivory/95 backdrop-blur-sm border-b border-ink/10' : ''
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <Diamond className="w-4 h-4 text-coral group-hover:scale-110 transition-transform duration-200" />
          <span className="font-bold text-xl text-ink tracking-tight">글릿</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sub hover:text-coral transition-colors text-sm font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#join"
          className="hidden md:inline-block bg-coral text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-coral/90 transition-colors"
        >
          참여하기
        </a>

        <button
          className="md:hidden text-ink p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴 열기"
        >
          <span className="text-xl leading-none">{menuOpen ? '✕' : '☰'}</span>
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-ivory border-t border-ink/10 px-6 py-5 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-sub hover:text-coral transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#join"
            onClick={() => setMenuOpen(false)}
            className="bg-coral text-white px-5 py-2.5 rounded-full text-sm font-medium text-center hover:bg-coral/90 transition-colors"
          >
            참여하기
          </a>
        </div>
      )}
    </header>
  )
}
