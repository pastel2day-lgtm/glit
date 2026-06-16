/* eslint-disable @next/next/no-img-element */
'use client'
import FadeUp from '@/components/ui/FadeUp'
import Diamond from '@/components/ui/Diamond'

export default function InterviewTeaserSection() {
  return (
    <section className="bg-salmon/20 border-t border-ink/8">
      <FadeUp>
        <div className="px-6 md:px-12 py-10 border-b border-ink/8 flex items-end justify-between gap-4">
          <div>
            <p className="text-coral text-xs font-medium tracking-widest uppercase mb-2">Interview</p>
            <h2 className="text-4xl md:text-6xl font-bold text-ink leading-tight tracking-tight">
              Writers&apos; Voice
            </h2>
          </div>
          <a
            href="/interview"
            className="hidden md:inline-flex items-center gap-2 text-sm text-coral font-medium hover:gap-3 transition-all pb-1"
          >
            전체 인터뷰 보기 →
          </a>
        </div>
      </FadeUp>

      <div className="px-6 md:px-12 py-14">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Featured interviewee */}
          <FadeUp>
            <div className="relative group cursor-pointer" onClick={() => window.location.href = '/interview'}>
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop&q=80"
                  alt="이하은 소설가"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent rounded-2xl" />
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-white/60 text-xs font-mono mb-1 block">Vol.01 · Featured</span>
                <p className="text-white text-xl font-bold leading-snug">
                  "완성하지 않아도 괜찮아요"
                </p>
                <p className="text-white/70 text-sm mt-1">이하은 · 소설가</p>
              </div>
            </div>
          </FadeUp>

          {/* Text side */}
          <FadeUp delay={120}>
            <div className="flex flex-col gap-6">
              <div>
                <blockquote className="border-l-2 border-coral pl-5 mb-6">
                  <p className="text-ink text-xl md:text-2xl font-medium leading-relaxed italic">
                    "잘 써지든 안 써지든,<br />일단 앉는 것.<br />그게 저의 유일한 규칙이에요."
                  </p>
                  <footer className="mt-3 text-sub text-sm">— 이하은, 소설가</footer>
                </blockquote>
                <p className="text-sub text-sm leading-loose">
                  글릿 인터뷰는 글을 쓰는 사람들의 내면을 기록합니다.
                  완벽한 작가의 이야기가 아닌, 지금도 쓰고 있는 사람들의 솔직한 목소리.
                </p>
              </div>

              {/* Mini list */}
              <div className="space-y-3 border-t border-ink/8 pt-6">
                {[
                  { name: '박지우', role: '에세이스트', subject: '불완전한 문장이 더 솔직합니다' },
                  { name: '김도현', role: '시인', subject: '시는 침묵으로 씁니다' },
                  { name: '최수아', role: '독립출판 작가', subject: '단 한 명을 위한 글' },
                ].map((item, i) => (
                  <a
                    key={i}
                    href="/interview"
                    className="flex items-center justify-between group py-2 border-b border-ink/6 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <Diamond className="w-2 h-2 text-coral/50 group-hover:text-coral transition-colors shrink-0" />
                      <div>
                        <span className="text-ink text-sm font-medium group-hover:text-coral transition-colors">
                          {item.name}
                        </span>
                        <span className="text-sub/50 text-xs ml-2">{item.role}</span>
                      </div>
                    </div>
                    <span className="text-sub/50 text-xs hidden sm:block truncate max-w-[180px] text-right">
                      {item.subject}
                    </span>
                  </a>
                ))}
              </div>

              <a
                href="/interview"
                className="inline-flex items-center gap-2 bg-coral text-white px-6 py-3.5 rounded-full text-sm font-medium hover:bg-coral/90 transition-colors self-start"
              >
                전체 인터뷰 보기 →
              </a>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
