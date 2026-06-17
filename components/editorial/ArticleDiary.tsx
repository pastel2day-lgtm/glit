/* eslint-disable @next/next/no-img-element */
'use client'
import type { Article } from '@/lib/editorialArticles'
import Diamond from '@/components/ui/Diamond'

export default function ArticleDiary({ article }: { article: Article }) {
  return (
    <div className="min-h-screen bg-[#f8f3eb] text-ink">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex items-center justify-between bg-[#f8f3eb]/90 backdrop-blur-sm border-b border-ink/6">
        <a href="/" className="flex items-center gap-2">
          <Diamond className="w-4 h-4 text-coral" />
          <span className="font-bold text-base tracking-tight">글릿</span>
        </a>
        <a href="/#archive" className="text-xs text-sub/50 hover:text-coral transition-colors">
          ← 에디토리얼
        </a>
      </header>

      <div className="pt-14 max-w-3xl mx-auto px-6 md:px-12">
        {/* Small image top-right */}
        <div className="pt-14 pb-10 grid grid-cols-1 md:grid-cols-[1fr_260px] gap-10 items-start">
          <div>
            <p className="text-sub/35 text-xs font-mono tracking-wider mb-5">{article.issue} · {article.date} · {article.readTime} 읽기</p>
            <p className="text-coral text-xs font-medium tracking-widest uppercase mb-3">{article.category}</p>
            <h1 className="text-2xl md:text-3xl font-bold text-ink leading-snug mb-3">
              {article.title}
            </h1>
            <p className="text-sub text-sm leading-relaxed mb-6">{article.subtitle}</p>
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
                className="w-full h-full object-cover sepia-[0.18] saturate-[0.75]"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-ink/10 mb-12" />

        {/* Body — diary style: tight paragraphs, lots of breathing room between sections */}
        <article className="max-w-xl pb-24">
          {article.body.map((section, i) => {
            if (section.type === 'pullquote') {
              return (
                <div
                  key={i}
                  className="my-10 py-8 border-y border-ink/8 text-center"
                >
                  <p className="text-ink font-bold text-xl md:text-2xl leading-snug">
                    {section.text}
                  </p>
                </div>
              )
            }
            if (section.type === 'italic') {
              return (
                <p key={i} className="my-5 text-sub italic text-sm md:text-base leading-loose pl-4 border-l-2 border-ink/15">
                  {section.text}
                </p>
              )
            }
            if (section.type === 'divider') {
              return (
                <div key={i} className="my-10 flex gap-2 items-center">
                  {[0, 1, 2].map((d) => (
                    <div key={d} className="w-1 h-1 rounded-full bg-ink/25" />
                  ))}
                </div>
              )
            }
            return (
              <p
                key={i}
                className="mb-5 text-ink/75 text-sm md:text-base leading-[1.85]"
              >
                {section.text}
              </p>
            )
          })}

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-ink/8 flex items-center justify-between flex-wrap gap-4">
            <div className="text-xs text-sub/35 font-mono">
              {article.issue} · 글릿 에디토리얼
            </div>
            <a
              href="/#archive"
              className="text-sm text-coral font-medium hover:text-coral/70 transition-colors"
            >
              ← 다른 글 보기
            </a>
          </div>
        </article>
      </div>
    </div>
  )
}
