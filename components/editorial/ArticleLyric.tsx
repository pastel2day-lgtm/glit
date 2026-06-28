/* eslint-disable @next/next/no-img-element */
'use client'
import type { Article } from '@/lib/editorialArticles'
import Diamond from '@/components/ui/Diamond'

export default function ArticleLyric({ article }: { article: Article }) {
  return (
    <div className="min-h-screen bg-[#f0e9df] text-ink">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100">
          <Diamond className="h-3.5 w-3.5 text-coral" />
          <span className="text-sm font-bold tracking-tight">글릿</span>
        </a>
        <a href="/#archive" className="text-xs text-sub/40 transition-colors hover:text-coral">
          에디토리얼
        </a>
      </header>

      <div className="relative flex h-[70vh] flex-col items-center justify-end overflow-hidden pb-16 pt-14">
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover brightness-[0.88] sepia-[0.25] saturate-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0e9df]/10 via-[#f0e9df]/30 to-[#f0e9df]" />
        </div>
        <div className="relative z-10 mx-auto max-w-xl px-6 text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-widest text-coral/80">
            {article.issue} · {article.category}
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-ink md:text-4xl">{article.title}</h1>
          <p className="text-base italic text-ink/55">{article.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 border-y border-ink/8 px-6 py-6 text-xs text-sub/45 md:gap-6">
        <span>{article.author}</span>
        <Diamond className="h-1.5 w-1.5 text-coral/40" />
        <span>{article.authorRole}</span>
        <Diamond className="h-1.5 w-1.5 text-coral/40" />
        <span>{article.readTime} 읽기</span>
        <Diamond className="h-1.5 w-1.5 text-coral/40" />
        <span>{article.date}</span>
      </div>

      <article className="mx-auto max-w-lg px-8 py-16 text-center">
        {article.body.map((section, i) => {
          if (section.type === 'pullquote') {
            return (
              <div key={i} className="my-14">
                <p className="mb-3 select-none font-serif text-4xl leading-none text-coral/70">"</p>
                <p className="text-xl font-medium italic leading-relaxed text-ink md:text-2xl">{section.text}</p>
              </div>
            )
          }
          if (section.type === 'italic') {
            return (
              <p key={i} className="my-8 text-base italic leading-loose text-sub/60 md:text-lg">
                {section.text}
              </p>
            )
          }
          if (section.type === 'divider') {
            return (
              <div key={i} className="my-12 flex items-center justify-center">
                <div className="mx-3 h-px w-6 bg-ink/15" />
                <Diamond className="h-1.5 w-1.5 text-ink/20" />
                <div className="mx-3 h-px w-6 bg-ink/15" />
              </div>
            )
          }
          return (
            <p key={i} className="mb-8 text-base leading-[2.1] text-ink/70 md:text-lg">
              {section.text}
            </p>
          )
        })}

        <div className="mt-16 flex flex-col items-center gap-3">
          <Diamond className="h-4 w-4 text-coral/40" />
          <p className="font-mono text-xs tracking-wider text-sub/35">{article.issue} · 글릿</p>
          <a href="/#archive" className="mt-4 text-sm font-medium text-coral transition-colors hover:text-coral/70">
            다른 글 보기
          </a>
        </div>
      </article>
    </div>
  )
}
