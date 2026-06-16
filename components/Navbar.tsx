'use client'
import { useEffect, useState } from 'react'
import Diamond from '@/components/ui/Diamond'

const links = [
  { label: 'Concept', href: '#concept' },
  { label: 'Editorial', href: '#archive' },
  { label: 'Interview', href: '/interview' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-ink/8 bg-ivory/88 backdrop-blur-md' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#home" className="group flex items-center gap-2" aria-label="글잇 홈">
          <Diamond className="h-4 w-4 text-coral transition-transform duration-200 group-hover:scale-110" />
          <span className="text-xl font-bold tracking-[-0.02em] text-ink">글잇</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-sub transition-colors hover:text-coral"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#join"
          className="hidden rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ink md:inline-flex"
        >
          참여하기
        </a>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="메뉴 열기"
          aria-expanded={menuOpen}
        >
          <span className="text-lg leading-none">{menuOpen ? '×' : '☰'}</span>
        </button>
      </nav>

      {menuOpen && (
        <div className="border-t border-ink/10 bg-ivory px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-sub transition-colors hover:text-coral"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#join"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-coral px-5 py-3 text-center text-sm font-semibold text-white"
            >
              참여하기
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
