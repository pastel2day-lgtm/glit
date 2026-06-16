/* eslint-disable @next/next/no-img-element */
'use client'
import { useState } from 'react'
import Diamond from '@/components/ui/Diamond'
import FadeUp from '@/components/ui/FadeUp'

const featured = {
  issue: 'Vol.01',
  category: 'FEATURED INTERVIEW',
  name: '이하은',
  role: '소설가 · 글쓰기 코치',
  subject: '완성하지 않아도 괜찮아요',
  subtitle: '쓰는 것 자체가 이미 충분합니다',
  pullQuote: '잘 써지든 안 써지든, 일단 앉는 것. 그게 저의 유일한 규칙이에요.',
  intro:
    '이하은 작가를 만난 건 그녀의 첫 소설이 출간되고 두 달이 지났을 무렵이었다. 조용한 카페에서 아메리카노 한 잔을 앞에 두고, 그녀는 매일 아침 6시에 일어나 글을 쓴다고 담담하게 말했다. 특별한 영감이 올 때까지 기다리지 않는다고. 그냥 앉는 것이 전부라고.',
  qa: [
    {
      q: '매일 글을 쓴다고 하셨는데, 쓰고 싶지 않은 날엔 어떻게 하세요?',
      a: '그냥 앉아요. (웃음) 쓰고 싶지 않은 날에도 일단 책상 앞에 앉습니다. 잘 써지든 안 써지든, 앉는다는 행위 자체가 저에게는 글쓰기예요. 손가락이 움직이지 않으면 그냥 화면을 바라보고 있기도 해요. 그러다 보면 결국 뭔가 나오더라고요.',
    },
    {
      q: '완성도에 대한 두려움을 느끼는 독자들에게 어떤 말을 해주고 싶으세요?',
      a: '독자들이 종종 물어요. "완성도가 낮은 글을 올려도 되냐"고요. 저는 항상 이렇게 답해요. 완성하지 않아도 좋습니다. 쓰고 있다는 것 자체가 이미 충분합니다. 우리는 너무 자주 결과물로 자신을 판단해요. 하지만 글쓰기의 가장 중요한 순간은 아무도 읽지 않은 그 초안에 있거든요.',
    },
    {
      q: '글릿 독자들에게 한 마디 해주신다면요?',
      a: '당신의 이야기는 충분히 아름답습니다. 아무도 당신처럼 살지 않았고, 아무도 당신이 본 것을 보지 못했어요. 그게 이미 글이 될 이유가 됩니다. 오늘 딱 한 문장만 써보세요. 그게 시작이에요.',
    },
  ],
  image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&h=1100&fit=crop&q=80',
  date: '2026년 1월',
}

const interviews = [
  {
    issue: 'Vol.02',
    name: '박지우',
    role: '에세이스트',
    subject: '불완전한 문장이 더 솔직합니다',
    pullQuote: '사람의 감정은 원래 불완전하니까요.',
    excerpt:
      '"저는 문법적으로 완전한 문장보다 숨이 끊기는 문장을 더 좋아해요. 독자가 그 끊어짐에서 자신의 감정을 넣게 되거든요. 그게 글쓰기의 마법이라고 생각해요."',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=700&fit=crop&q=80',
    date: '2026년 2월',
    readTime: '8분',
  },
  {
    issue: 'Vol.03',
    name: '김도현',
    role: '시인',
    subject: '시는 침묵으로 씁니다',
    pullQuote: '행간의 여백이 독자의 마음을 채웁니다.',
    excerpt:
      '"시에서 가장 중요한 건 쓰인 것이 아니라 쓰이지 않은 것들이에요. 저는 항상 지우는 과정에서 시가 완성된다고 느낍니다. 쓰는 것보다 지우는 데 더 오래 걸려요."',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&q=80',
    date: '2026년 3월',
    readTime: '10분',
  },
  {
    issue: 'Vol.04',
    name: '최수아',
    role: '독립출판 작가',
    subject: '단 한 명을 위한 글',
    pullQuote: '"이게 내 얘기다"라고 느끼면 성공한 거예요.',
    excerpt:
      '"저는 독자를 특정한 한 사람으로 상상하고 씁니다. 모든 사람에게 닿으려 하면 아무에게도 닿지 못해요. 딱 한 명의 마음에 정확히 닿는 글을 쓰고 싶어요."',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=700&fit=crop&q=80',
    date: '2026년 4월',
    readTime: '7분',
  },
]

export default function InterviewPage() {
  const [expandedQ, setExpandedQ] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-ivory text-ink">
      {/* ── NAV ── */}
      <header className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-ink/8 bg-ivory/90 backdrop-blur-sm sticky top-0 z-50">
        <a href="/" className="flex items-center gap-2 group">
          <Diamond className="w-4 h-4 text-coral group-hover:scale-110 transition-transform" />
          <span className="font-bold text-lg text-ink tracking-tight">글릿</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-sub font-medium">
          <a href="/#concept" className="hover:text-coral transition-colors">Concept</a>
          <a href="/#archive" className="hover:text-coral transition-colors">Editorial</a>
          <a href="/interview" className="text-coral font-semibold">Interview</a>
          <a href="/#about" className="hover:text-coral transition-colors">About</a>
        </nav>
        <a href="/#join" className="hidden md:inline-block bg-coral text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-coral/90 transition-colors">
          참여하기
        </a>
        <a href="/" className="md:hidden text-xs text-sub/50 hover:text-coral transition-colors">← 홈으로</a>
      </header>

      {/* ── MASTHEAD ── */}
      <FadeUp>
        <section className="px-6 md:px-12 pt-16 pb-12 border-b border-ink/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-start justify-between gap-6 flex-wrap">
              <div>
                <p className="text-coral text-xs tracking-widest uppercase font-medium mb-3">Glit Magazine</p>
                <h1 className="text-6xl md:text-8xl font-bold text-ink leading-none tracking-tight">
                  INTER<br />VIEW
                </h1>
              </div>
              <div className="text-right self-end pb-2">
                <p className="text-sub/50 text-xs tracking-wider mb-1">2026 Spring</p>
                <p className="text-sub text-sm max-w-[220px] leading-relaxed text-right">
                  글을 쓰는 사람들의 이야기.<br />글릿이 직접 만나 나눈 대화.
                </p>
              </div>
            </div>
            <div className="mt-10 flex gap-6 text-xs text-sub/50 tracking-wider">
              {['소설가', '에세이스트', '시인', '독립출판'].map((tag) => (
                <span key={tag} className="border-l border-ink/15 pl-3 first:border-l-0 first:pl-0">{tag}</span>
              ))}
            </div>
          </div>
        </section>
      </FadeUp>

      {/* ── FEATURED INTERVIEW ── */}
      <section className="py-16 md:py-24 px-6 md:px-12 border-b border-ink/8">
        <div className="max-w-6xl mx-auto">
          <FadeUp>
            <div className="flex items-center gap-4 mb-10">
              <span className="text-xs text-coral font-mono tracking-widest">{featured.issue}</span>
              <div className="h-px flex-1 bg-ink/10" />
              <span className="text-xs text-sub/40 tracking-widest uppercase">{featured.category}</span>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Image */}
            <FadeUp>
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-coral text-white px-4 py-2 rounded-xl text-xs font-medium">
                  {featured.date}
                </div>
              </div>
            </FadeUp>

            {/* Content */}
            <FadeUp delay={120}>
              <div className="lg:pt-6">
                <p className="text-sub text-sm mb-1">{featured.role}</p>
                <h2 className="text-4xl md:text-5xl font-bold text-ink leading-tight mb-2">
                  {featured.name}
                </h2>
                <p className="text-coral text-xl font-medium mb-6">{featured.subject}</p>

                <blockquote className="border-l-2 border-coral pl-5 mb-8">
                  <p className="text-ink/70 text-lg italic leading-relaxed">
                    "{featured.pullQuote}"
                  </p>
                </blockquote>

                <p className="text-sub text-sm leading-loose mb-10">{featured.intro}</p>

                {/* Q&A */}
                <div className="space-y-4">
                  {featured.qa.map((item, i) => (
                    <div
                      key={i}
                      className="border border-ink/8 rounded-xl overflow-hidden bg-white/40"
                    >
                      <button
                        className="w-full text-left px-5 py-4 flex items-start justify-between gap-3 group"
                        onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                      >
                        <div className="flex gap-3 items-start">
                          <span className="text-coral text-xs font-mono mt-0.5 shrink-0">Q.</span>
                          <span className="text-ink text-sm font-medium leading-snug group-hover:text-coral transition-colors">
                            {item.q}
                          </span>
                        </div>
                        <span className="text-sub/40 text-lg leading-none mt-0.5 shrink-0">
                          {expandedQ === i ? '−' : '+'}
                        </span>
                      </button>
                      {expandedQ === i && (
                        <div className="px-5 pb-5 border-t border-ink/6">
                          <div className="flex gap-3 pt-4">
                            <span className="text-sub/50 text-xs font-mono mt-0.5 shrink-0">A.</span>
                            <p className="text-sub text-sm leading-loose">{item.a}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <FadeUp>
        <div className="py-10 px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex items-center gap-6">
            <div className="h-px flex-1 bg-ink/8" />
            <span className="text-xs tracking-widest text-sub/30 uppercase">More Interviews</span>
            <div className="h-px flex-1 bg-ink/8" />
          </div>
        </div>
      </FadeUp>

      {/* ── INTERVIEW GRID ── */}
      <section className="pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {interviews.map((item, i) => (
            <FadeUp key={i} delay={i * 80}>
              <article className="group flex flex-col h-full">
                {/* Photo */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-white/70 font-mono">{item.issue}</span>
                    <p className="text-white font-bold text-lg leading-snug mt-1">{item.subject}</p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sub text-xs mb-0.5">{item.role}</p>
                    <p className="text-ink font-bold text-lg">{item.name}</p>
                  </div>
                  <span className="text-xs text-sub/40 border border-ink/10 px-2.5 py-1 rounded-full">
                    {item.readTime}
                  </span>
                </div>

                <blockquote className="border-l-2 border-coral/40 pl-3 mb-4">
                  <p className="text-sub/70 text-xs italic leading-relaxed">{item.pullQuote}</p>
                </blockquote>

                <p className="text-sub text-sm leading-relaxed flex-1 mb-4 line-clamp-4">
                  {item.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-ink/8">
                  <span className="text-xs text-sub/40">{item.date}</span>
                  <span className="text-coral text-sm font-medium group-hover:translate-x-0.5 transition-transform inline-block">
                    읽기 →
                  </span>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <FadeUp>
        <section className="bg-salmon/30 py-20 px-6 text-center border-t border-ink/8">
          <Diamond className="w-6 h-6 text-coral mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-ink mb-3">
            당신의 이야기도 글릿에 실릴 수 있어요
          </h2>
          <p className="text-sub text-base mb-8 max-w-sm mx-auto leading-relaxed">
            글을 쓰는 사람이라면 누구든. 글릿에 당신의 이야기를 보내주세요.
          </p>
          <a
            href="/#join"
            className="inline-block bg-coral text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-coral/90 transition-colors"
          >
            글릿에 참여하기 →
          </a>
        </section>
      </FadeUp>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-6 text-center border-t border-ink/8">
        <div className="flex items-center justify-center gap-2 text-sub/40 text-xs">
          <Diamond className="w-3 h-3 text-coral/50" />
          <span>글릿 · Gleam it, Glit!</span>
          <span className="text-ink/15">·</span>
          <a href="/" className="hover:text-coral transition-colors">홈으로</a>
        </div>
      </footer>
    </div>
  )
}
