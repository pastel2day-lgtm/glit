/* eslint-disable @next/next/no-img-element */
'use client'
import type { Article } from '@/lib/editorialArticles'
import Diamond from '@/components/ui/Diamond'

export default function ArticleDiary({ article }: { article: Article }) {
  return (
    <div className="min-h-screen bg-[#f8f3eb] text-ink">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-ink/6 bg-[#f8f3eb]/90 px-6 py-4 backdrop-blur-sm">
        <a href="/" className="flex items-center gap-2">
          <Diamond className="h-4 w-4 text-coral" />
          <span className="text-base font-bold tracking-tight">글릿</span>
        </a>
        <a href="/#archive" className="text-xs text-sub/50 transition-colors hover:text-coral">
          에디토리얼
        </a>
      </header>

      <div className="mx-auto max-w-3xl px-6 pt-14 md:px-12">
        <div className="grid grid-cols-1 items-start gap-10 pb-10 pt-14 md:grid-cols-[1fr_260px]">
          <div>
            <p className="mb-5 font-mono text-xs tracking-wider text-sub/35">
              {article.issue} · {article.date} · {article.readTime} 읽기
            </p>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-coral">{article.category}</p>
            <h1 className="mb-3 text-2xl font-bold leading-snug text-ink md:text-3xl">{article.title}</h1>
            <p className="mb-6 text-sm leading-relaxed text-sub">{article.subtitle}</p>
            <div className="flex items-center gap-2 text-xs text-sub/50">
              <span className="font-medium text-ink">{article.author}</span>
              <span>·</span>
              <span>{article.authorRole}</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="aspect-[3/4] overflow-hidden border border-ink/10">
              <img
                src={article.image}
                alt={article.title}
                className="h-full w-full object-cover sepia-[0.18] saturate-[0.75]"
              />
            </div>
          </div>
        </div>

        <div className="mb-12 border-t border-ink/10" />

        <article className="max-w-xl pb-24">
          {article.body.map((section, i) => {
            if (section.type === 'pullquote') {
              return (
                <div key={i} className="my-10 border-y border-ink/8 py-8 text-center">
                  <p className="text-xl font-bold leading-snug text-ink md:text-2xl">{section.text}</p>
                </div>
              )
            }
            if (section.type === 'italic') {
              return (
                <p key={i} className="my-5 border-l-2 border-ink/15 pl-4 text-sm italic leading-loose text-sub md:text-base">
                  {section.text}
                </p>
              )
            }
            if (section.type === 'divider') {
              return (
                <div key={i} className="my-10 flex items-center gap-2">
                  {[0, 1, 2].map((d) => (
                    <div key={d} className="h-1 w-1 rounded-full bg-ink/25" />
                  ))}
                </div>
              )
            }
            return (
              <p key={i} className="mb-5 text-sm leading-[1.85] text-ink/75 md:text-base">
                {section.text}
              </p>
            )
          })}

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-ink/8 pt-8">
            <div className="font-mono text-xs text-sub/35">{article.issue} · 글릿 에디토리얼</div>
            <a href="/#archive" className="text-sm font-medium text-coral transition-colors hover:text-coral/70">
              다른 글 보기
            </a>
          </div>
        </article>
      </div>
    </div>
  )
}
