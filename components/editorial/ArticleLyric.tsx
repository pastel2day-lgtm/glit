/* eslint-disable @next/next/no-img-element */
'use client'
import type { Article } from '@/lib/editorialArticles'
import Diamond from '@/components/ui/Diamond'

export default function ArticleLyric({ article }: { article: Article }) {
  return (
    <div className="min-h-screen bg-[#f0e9df] text-ink">
      {/* Nav — minimal */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
          <Diamond className="w-3.5 h-3.5 text-coral" />
          <span className="font-bold text-sm tracking-tight">글릿</span>
        </a>
        <a href="/#archive" className="text-xs text-sub/40 hover:text-coral transition-colors">
          ← 에디토리얼
        </a>
      </header>

      {/* Full-screen intro */}
      <div className="relative pt-14 h-[70vh] flex flex-col items-center justify-end pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover sepia-[0.25] saturate-[0.6] brightness-[0.88]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0e9df]/10 via-[#f0e9df]/30 to-[#f0e9df]" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
          <p className="text-coral/80 text-xs tracking-widest uppercase font-medium mb-4">{article.issue} · {article.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-ink leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-ink/55 italic text-base">{article.subtitle}</p>
        </div>
      </div>

      {/* Meta strip */}
      <div className="flex items-center justify-center gap-6 py-6 border-y border-ink/8 text-xs text-sub/45">
        <span>{article.author}</span>
        <Diamond className="w-1.5 h-1.5 text-coral/40" />
        <span>{article.authorRole}</span>
        <Diamond className="w-1.5 h-1.5 text-coral/40" />
        <span>{article.readTime} 읽기</span>
        <Diamond className="w-1.5 h-1.5 text-coral/40" />
        <span>{article.date}</span>
      </div>

      {/* Body — lyric/prose-poem: centered, narrow, generous white space */}
      <article className="max-w-lg mx-auto px-8 py-16 text-center">
        {article.body.map((section, i) => {
          if (section.type === 'pullquote') {
            return (
              <div key={i} className="my-14">
                <p className="text-coral/70 text-4xl leading-none mb-3 font-serif select-none">"</p>
                <p className="text-ink text-xl md:text-2xl font-medium leading-relaxed italic">
                  {section.text}
                </p>
              </div>
            )
          }
          if (section.type === 'italic') {
            return (
              <p key={i} className="my-8 text-sub/60 italic text-base md:text-lg leading-loose">
                {section.text}
              </p>
            )
          }
          if (section.type === 'divider') {
            return (
              <div key={i} className="my-12 flex items-center justify-center">
                <div className="w-6 h-px bg-ink/15 mx-3" />
                <Diamond className="w-1.5 h-1.5 text-ink/20" />
                <div className="w-6 h-px bg-ink/15 mx-3" />
              </div>
            )
          }
          return (
            <p
              key={i}
              className="mb-8 text-ink/70 text-base md:text-lg leading-[2.1]"
            >
              {section.text}
            </p>
          )
        })}

        {/* Closing */}
        <div className="mt-16 flex flex-col items-center gap-3">
          <Diamond className="w-4 h-4 text-coral/40" />
          <p className="text-xs text-sub/35 tracking-wider font-mono">{article.issue} · 글릿</p>
          <a
            href="/#archive"
            className="mt-4 text-sm text-coral font-medium hover:text-coral/70 transition-colors"
          >
            ← 다른 글 보기
          </a>
        </div>
      </article>
    </div>
  )
}
