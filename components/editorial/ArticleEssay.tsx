/* eslint-disable @next/next/no-img-element */
'use client'
import type { Article } from '@/lib/editorialArticles'
import Diamond from '@/components/ui/Diamond'

export default function ArticleEssay({ article }: { article: Article }) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      {/* Nav */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 py-4 flex items-center justify-between bg-ivory/90 backdrop-blur-sm border-b border-ink/8">
        <a href="/" className="flex items-center gap-2">
          <Diamond className="w-4 h-4 text-coral" />
          <span className="font-bold text-base tracking-tight">글잇</span>
        </a>
        <a href="/#archive" className="text-xs text-sub/50 hover:text-coral transition-colors">
          ← 에디토리얼
        </a>
      </header>

      {/* Hero image */}
      <div className="pt-14 relative h-[60vh] overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover sepia-[0.12] saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 text-center">
          <span className="inline-block text-xs text-coral font-medium tracking-widest uppercase border border-coral/30 px-3 py-1 bg-ivory/80 backdrop-blur-sm mb-4">
            {article.category}
          </span>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-2xl mx-auto px-6 pb-24 -mt-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-sub/40 text-xs font-mono tracking-wider mb-4">{article.issue} · {article.date}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-ink leading-snug mb-4">
            {article.title}
          </h1>
          <p className="text-sub italic text-base leading-relaxed mb-8">{article.subtitle}</p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-salmon/60 flex items-center justify-center">
              <Diamond className="w-3 h-3 text-coral" />
            </div>
            <div className="text-left">
              <p className="text-ink text-sm font-semibold">{article.author}</p>
              <p className="text-sub/60 text-xs">{article.authorRole} · {article.readTime} 읽기</p>
            </div>
          </div>
          <div className="mt-8 flex items-center gap-4 justify-center">
            <div className="h-px flex-1 max-w-[80px] bg-coral/25" />
            <Diamond className="w-2 h-2 text-coral/40" />
            <div className="h-px flex-1 max-w-[80px] bg-coral/25" />
          </div>
        </div>

        {/* Body */}
        <div className="space-y-0">
          {article.body.map((section, i) => {
            if (section.type === 'pullquote') {
              return (
                <blockquote
                  key={i}
                  className="my-10 border-l-2 border-coral pl-6"
                >
                  <p className="text-ink/75 text-xl md:text-2xl italic font-medium leading-relaxed">
                    {section.text}
                  </p>
                </blockquote>
              )
            }
            if (section.type === 'italic') {
              return (
                <p key={i} className="my-6 text-sub/70 italic text-base leading-loose">
                  {section.text}
                </p>
              )
            }
            if (section.type === 'divider') {
              return (
                <div key={i} className="flex justify-center my-10">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-10 bg-ink/12" />
                    <Diamond className="w-2 h-2 text-coral/40" />
                    <div className="h-px w-10 bg-ink/12" />
                  </div>
                </div>
              )
            }
            // First paragraph gets drop-cap treatment
            if (section.type === 'paragraph' && i === 0) {
              return (
                <p
                  key={i}
                  className="mt-0 mb-6 text-ink text-base md:text-lg leading-[1.9] first-letter:text-5xl first-letter:font-bold first-letter:text-coral first-letter:float-left first-letter:mr-2 first-letter:leading-none first-letter:mt-1"
                >
                  {section.text}
                </p>
              )
            }
            return (
              <p key={i} className="mb-6 text-ink/80 text-base md:text-lg leading-[1.9]">
                {section.text}
              </p>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-10 border-t border-ink/8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs text-sub/40">
              <Diamond className="w-2.5 h-2.5 text-coral/50" />
              <span>글잇 · {article.issue}</span>
            </div>
            <a
              href="/#archive"
              className="text-sm text-coral font-medium hover:text-coral/70 transition-colors"
            >
              ← 다른 글 보기
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}
