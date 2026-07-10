'use client'
import { useMemo, useState } from 'react'
import Diamond from '@/components/ui/Diamond'
import SiteFooter from '@/components/SiteFooter'
import { sentences, GRAIN_LABELS, GRAIN_ORDER, type Grain } from '@/lib/sentences'

type Filter = 'ALL' | Grain

export default function SentenceArchive() {
  const [filter, setFilter] = useState<Filter>('ALL')

  const visible = useMemo(
    () => (filter === 'ALL' ? sentences : sentences.filter((s) => s.grain === filter)),
    [filter]
  )

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-ink/8 bg-ivory/90 px-6 py-4 backdrop-blur-sm">
        <a href="/" className="flex items-center gap-2">
          <Diamond className="h-4 w-4 text-coral" />
          <span className="text-base font-bold tracking-tight">글릿</span>
        </a>
        <a href="/diagnosis" className="text-xs text-sub/60 transition-colors hover:text-coral">
          내 결 찾기
        </a>
      </header>

      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="border-b border-ink/10 py-14 md:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-coral">Sentence Archive</p>
          <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.035em] text-ink md:text-7xl">
            빛나는 문장을
            <br />
            <span className="text-coral">모아둡니다.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-8 text-sub">
            글릿이 수집한 문장들이에요. 마음의 결에 따라 오래 머무는 문장이 달라져요. 지금 당신에게
            가까운 결을 골라보세요.
          </p>
        </div>

        {/* 결 필터 */}
        <div className="sticky top-[3.75rem] z-30 -mx-5 bg-ivory/92 px-5 py-4 backdrop-blur-sm md:-mx-8 md:px-8">
          <div className="flex flex-wrap gap-2">
            <FilterChip active={filter === 'ALL'} onClick={() => setFilter('ALL')}>
              전체
            </FilterChip>
            {GRAIN_ORDER.map((grain) => (
              <FilterChip key={grain} active={filter === grain} onClick={() => setFilter(grain)}>
                {GRAIN_LABELS[grain]}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* 문장 카드 */}
        <div className="grid gap-5 py-10 md:grid-cols-2 md:py-14">
          {visible.map((s) => (
            <article
              key={s.id}
              className="flex flex-col justify-between border border-ink/10 bg-[#fffaf1]/80 p-7 transition-colors hover:border-coral/35 md:p-9"
            >
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <span className="border border-coral/25 px-2.5 py-1 text-xs font-semibold text-coral">
                    {s.theme}
                  </span>
                  <span className="text-xs text-sub/45">{GRAIN_LABELS[s.grain]}</span>
                </div>
                <p className="text-xl font-medium leading-[1.85] tracking-[-0.01em] text-ink md:text-2xl">
                  “{s.text}”
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 border-t border-ink/8 pt-5 text-xs text-sub/55">
                <Diamond className="h-2.5 w-2.5 text-coral/50" />
                <span>결이 닿는 책 · 「{s.book}」 {s.author}</span>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mb-20 border border-coral/25 bg-[#fffaf1]/70 px-6 py-12 text-center md:px-12">
          <h2 className="text-2xl font-black leading-9 text-ink md:text-3xl">
            내 결에 맞는 문장은
            <br />
            어떤 것일까요?
          </h2>
          <p className="mt-4 text-sm leading-7 text-sub">
            36개의 질문으로 지금 당신의 문장 결을 찾아드릴게요.
          </p>
          <a
            href="/diagnosis"
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-coral px-10 text-sm font-bold text-white transition-colors hover:bg-ink"
          >
            내 문장 결 찾기
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'rounded-full border px-4 py-2 text-xs font-semibold transition-colors',
        active
          ? 'border-coral bg-coral text-white'
          : 'border-ink/15 bg-transparent text-sub hover:border-coral/40 hover:text-coral',
      ].join(' ')}
    >
      {children}
    </button>
  )
}
