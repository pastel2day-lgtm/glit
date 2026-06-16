/* eslint-disable @next/next/no-img-element */
'use client'
import FadeUp from '@/components/ui/FadeUp'

const featured = {
  category: '에세이',
  issue: 'Vol.01',
  title: '비 오는 날, 왜 글이 더 필요해질까',
  excerpt:
    '창밖으로 빗소리가 들리는 오후에는 꼭 적고 싶은 마음이 생긴다. 흐린 날의 문장이 우리를 조금 더 투명하게 만드는 이유.',
  author: '김서연',
  authorRole: '에디터',
  readTime: '6분',
  image: '/images/glit-rain-essay.png',
}

const cards = [
  {
    category: '일상',
    issue: 'Vol.01',
    title: '아무도 묻지 않는 것들에 대하여',
    excerpt: '사소해서 지나친 질문들이 어느 날 가장 오래 남는 문장이 되는 순간.',
    readTime: '3분',
    image: '/images/glit-editorial-still-life.png',
  },
  {
    category: '감상',
    issue: 'Vol.01',
    title: '오늘과 어제 사이에서',
    excerpt: '매일의 경계 위에서 우리는 무언가를 놓고, 또 무언가를 안고 살아간다.',
    readTime: '4분',
    image: '/images/glit-writer-studio.png',
  },
]

export default function EditorialSection() {
  return (
    <section id="archive" className="border-t border-ink/10 bg-[#f8f1e7]">
      <FadeUp>
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-5 border-b border-ink/10 px-5 py-12 md:px-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-coral">Editorial</p>
            <h2 className="text-4xl font-black leading-none tracking-[-0.035em] text-ink md:text-7xl">
              This Issue
            </h2>
          </div>
          <p className="hidden pb-1 font-mono text-xs uppercase tracking-[0.2em] text-sub/45 md:block">
            Vol.01 · 2026
          </p>
        </div>
      </FadeUp>

      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <FadeUp>
          <article className="group grid border border-ink/10 bg-ivory/70 shadow-[0_28px_70px_rgba(46,43,40,0.07)] transition-all hover:border-coral/35 md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative min-h-72 overflow-hidden md:min-h-[32rem]">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover sepia-[0.1] saturate-[0.88] transition-transform duration-700 group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-ink/10" />
              <span className="absolute left-5 top-5 bg-coral px-3 py-1.5 text-xs font-semibold text-white">
                {featured.category}
              </span>
            </div>
            <div className="flex flex-col justify-between p-7 md:p-10">
              <div>
                <div className="mb-8 flex items-center gap-3">
                  <span className="font-mono text-xs text-sub/50">{featured.issue}</span>
                  <span className="border border-coral/25 px-2.5 py-1 text-xs font-semibold text-coral">
                    Featured
                  </span>
                </div>
                <h3 className="max-w-xl text-3xl font-black leading-tight tracking-[-0.025em] text-ink transition-colors group-hover:text-coral md:text-5xl">
                  {featured.title}
                </h3>
                <p className="mt-6 max-w-lg text-sm leading-7 text-sub md:text-base">{featured.excerpt}</p>
              </div>
              <div className="mt-10 flex items-center justify-between border-t border-ink/10 pt-5">
                <div>
                  <p className="text-sm font-bold text-ink">{featured.author}</p>
                  <p className="mt-1 text-xs text-sub/50">
                    {featured.authorRole} · {featured.readTime} 읽기
                  </p>
                </div>
                <span className="text-sm font-bold text-coral">읽기 →</span>
              </div>
            </div>
          </article>
        </FadeUp>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {cards.map((item, index) => (
            <FadeUp key={item.title} delay={index * 80 + 90}>
              <article className="group grid min-h-full grid-cols-[9rem_1fr] border border-ink/10 bg-ivory/60 transition-all hover:border-coral/35 sm:grid-cols-[14rem_1fr]">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full min-h-52 w-full object-cover sepia-[0.12] saturate-[0.85] transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-coral">{item.category}</span>
                    <span className="font-mono text-xs text-sub/40">{item.issue}</span>
                  </div>
                  <h3 className="text-xl font-black leading-snug tracking-[-0.02em] text-ink transition-colors group-hover:text-coral">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-sub">{item.excerpt}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                    <span className="text-xs text-sub/45">{item.readTime} 읽기</span>
                    <span className="text-sm font-bold text-coral">읽기 →</span>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
