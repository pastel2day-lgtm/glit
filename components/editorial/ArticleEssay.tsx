/* eslint-disable @next/next/no-img-element */
'use client'
import type { Article } from '@/lib/editorialArticles'
import Diamond from '@/components/ui/Diamond'

export default function ArticleEssay({ article }: { article: Article }) {
  return (
    <div className="min-h-screen bg-ivory text-ink">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-ink/8 bg-ivory/90 px-6 py-4 backdrop-blur-sm">
        <a href="/" className="flex items-center gap-2">
          <Diamond className="h-4 w-4 text-coral" />
          <span className="text-base font-bold tracking-tight">글릿</span>
        </a>
        <a href="/#archive" className="text-xs text-sub/50 transition-colors hover:text-coral">
          에디토리얼
        </a>
      </header>

      <div className="relative h-[60vh] overflow-hidden pt-14">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover sepia-[0.12] saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ivory" />
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 text-center">
          <span className="inline-block border border-coral/30 bg-ivory/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-coral backdrop-blur-sm">
            {article.category}
          </span>
        </div>
      </div>

      <article className="relative z-10 mx-auto -mt-6 max-w-2xl px-6 pb-24">
        <div className="mb-14 text-center">
          <p className="mb-4 font-mono text-xs tracking-wider text-sub/40">
            {article.issue} · {article.date}
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-snug text-ink md:text-4xl">{article.title}</h1>
          <p className="mb-8 text-base italic leading-relaxed text-sub">{article.subtitle}</p>
          <div className="flex items-center justify-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-salmon/60">
              <Diamond className="h-3 w-3 text-coral" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-ink">{article.author}</p>
              <p className="text-xs text-sub/60">
                {article.authorRole} · {article.readTime} 읽기
              </p>
            </div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px max-w-[80px] flex-1 bg-coral/25" />
            <Diamond className="h-2 w-2 text-coral/40" />
            <div className="h-px max-w-[80px] flex-1 bg-coral/25" />
          </div>
        </div>

        <div>
          {article.body.map((section, i) => {
            if (section.type === 'pullquote') {
              return (
                <blockquote key={i} className="my-10 border-l-2 border-coral pl-6">
                  <p className="text-xl font-medium italic leading-relaxed text-ink/75 md:text-2xl">
                    {section.text}
                  </p>
                </blockquote>
              )
            }
            if (section.type === 'italic') {
              return (
                <p key={i} className="my-6 text-base italic leading-loose text-sub/70">
                  {section.text}
                </p>
              )
            }
            if (section.type === 'divider') {
              return (
                <div key={i} className="my-10 flex justify-center">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-10 bg-ink/12" />
                    <Diamond className="h-2 w-2 text-coral/40" />
                    <div className="h-px w-10 bg-ink/12" />
                  </div>
                </div>
              )
            }
            if (section.type === 'paragraph' && i === 0) {
              return (
                <p
                  key={i}
                  className="mb-6 mt-0 text-base leading-[1.9] text-ink first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-coral md:text-lg"
                >
                  {section.text}
                </p>
              )
            }
            return (
              <p key={i} className="mb-6 text-base leading-[1.9] text-ink/80 md:text-lg">
                {section.text}
              </p>
            )
          })}
        </div>

        <div className="mt-16 border-t border-ink/8 pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-sub/40">
              <Diamond className="h-2.5 w-2.5 text-coral/50" />
              <span>글릿 · {article.issue}</span>
            </div>
            <a href="/#archive" className="text-sm font-medium text-coral transition-colors hover:text-coral/70">
              다른 글 보기
            </a>
          </div>
        </div>
      </article>
    </div>
  )
}
