/* eslint-disable @next/next/no-img-element */
'use client'
import { useMemo, useState } from 'react'
import Diamond from '@/components/ui/Diamond'
import SiteFooter from '@/components/SiteFooter'
import articles from '@/lib/editorialArticles'

export default function EditorialIndex() {
  const categories = useMemo(() => {
    const set = Array.from(new Set(articles.map((a) => a.category)))
    return ['전체', ...set]
  }, [])
  const [category, setCategory] = useState('전체')

  const visible = category === '전체' ? articles : articles.filter((a) => a.category === category)

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-ink/8 bg-ivory/90 px-6 py-4 backdrop-blur-sm">
        <a href="/" className="flex items-center gap-2">
          <Diamond className="h-4 w-4 text-coral" />
          <span className="text-base font-bold tracking-tight">글릿</span>
        </a>
        <a href="/sentences" className="text-xs text-sub/60 transition-colors hover:text-coral">
          문장 아카이브
        </a>
      </header>

      <section className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex items-end justify-between gap-5 border-b border-ink/10 py-14 md:py-20">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-coral">Editorial</p>
            <h1 className="text-4xl font-black leading-[1.05] tracking-[-0.035em] text-ink md:text-7xl">
              모든 이야기
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-sub">
              매주 화요일, 글릿이 발행한 에디토리얼을 모았어요. 작은 문장이 하루를 바꾸는 순간을 기록합니다.
            </p>
          </div>
          <p className="hidden shrink-0 pb-2 font-mono text-xs uppercase tracking-[0.2em] text-sub/45 md:block">
            {articles.length} Stories
          </p>
        </div>

        {/* 카테고리 필터 */}
        <div className="flex flex-wrap gap-2 py-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={[
                'rounded-full border px-4 py-2 text-xs font-semibold transition-colors',
                category === cat
                  ? 'border-coral bg-coral text-white'
                  : 'border-ink/15 text-sub hover:border-coral/40 hover:text-coral',
              ].join(' ')}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 글 목록 */}
        <div className="grid gap-6 pb-16 md:grid-cols-2 md:pb-20">
          {visible.map((a) => (
            <a key={a.slug} href={`/editorial/${a.slug}`} className="block">
              <article className="group grid h-full grid-rows-[auto_1fr] border border-ink/10 bg-[#fffaf1]/70 transition-colors hover:border-coral/35">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="h-full w-full object-cover sepia-[0.1] saturate-[0.88] transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-coral px-3 py-1.5 text-xs font-semibold text-white">
                    {a.category}
                  </span>
                </div>
                <div className="flex flex-col p-6 md:p-8">
                  <div className="mb-4 flex items-center gap-3 font-mono text-xs text-sub/45">
                    <span>{a.issue}</span>
                    <span className="h-1 w-1 rounded-full bg-sub/30" />
                    <span>{a.date}</span>
                  </div>
                  <h2 className="text-2xl font-black leading-tight tracking-[-0.02em] text-ink transition-colors group-hover:text-coral md:text-3xl">
                    {a.title}
                  </h2>
                  <p className="mt-4 flex-1 text-sm leading-7 text-sub">{a.subtitle}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-ink/8 pt-4 text-xs text-sub/50">
                    <span>
                      {a.author} · {a.readTime} 읽기
                    </span>
                    <span className="text-sm font-bold text-coral">읽기</span>
                  </div>
                </div>
              </article>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
