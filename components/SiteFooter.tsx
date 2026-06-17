import Diamond from '@/components/ui/Diamond'

interface SiteFooterProps {
  tone?: 'light' | 'dark'
}

export default function SiteFooter({ tone = 'light' }: SiteFooterProps) {
  const muted = tone === 'dark' ? 'text-ivory/45' : 'text-sub/45'
  const border = tone === 'dark' ? 'border-white/10' : 'border-ink/10'
  const hover = tone === 'dark' ? 'hover:text-ivory' : 'hover:text-ink'

  return (
    <footer className={`border-t ${border} px-6 py-8`}>
      <div className="mx-auto flex max-w-6xl flex-col gap-5 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div>
          <div className={`mb-2 flex items-center justify-center gap-2 text-sm font-semibold md:justify-start ${muted}`}>
            <Diamond className="h-3 w-3 text-coral" />
            <span>글릿 · Gleam it, Glit!</span>
          </div>
          <p className={`text-xs leading-6 ${muted}`}>
            매주 화요일 발행되는 에디토리얼 매거진. 글을 쓰고 읽고 살아가는 사람들을 위한 공간.
          </p>
        </div>

        <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs ${muted}`}>
          <a
            href="https://instagram.com/gleamit_glit"
            target="_blank"
            rel="noopener noreferrer"
            className={`transition-colors ${hover}`}
          >
            Instagram
          </a>
          <a href="/privacy" className={`transition-colors ${hover}`}>
            개인정보처리방침
          </a>
          <span className={tone === 'dark' ? 'text-ivory/25' : 'text-sub/30'}>© 2026 Glit Editorial</span>
        </div>
      </div>
    </footer>
  )
}
