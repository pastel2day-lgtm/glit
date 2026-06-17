/* eslint-disable @next/next/no-img-element */
'use client'
import Diamond from '@/components/ui/Diamond'
import FadeUp from '@/components/ui/FadeUp'

const interviews = [
  { name: '권민혁', role: '에세이스트', subject: '불완전한 문장이 더 솔직합니다' },
  { name: '박수지', role: '시인', subject: '시는 침묵으로 열립니다' },
  { name: '김유인', role: '독립출판 작가', subject: '작은 이름을 위한 글' },
]

export default function InterviewTeaserSection() {
  return (
    <section className="border-t border-ink/10 bg-salmon/22">
      <FadeUp>
        <div className="mx-auto flex max-w-6xl items-end justify-between gap-5 border-b border-ink/10 px-5 py-12 md:px-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-coral">Interview</p>
            <h2 className="text-4xl font-black leading-none tracking-[-0.035em] text-ink md:text-7xl">
              Writers&apos; Voice
            </h2>
          </div>
          <a
            href="/interview"
            className="hidden pb-1 text-sm font-bold text-coral transition-colors hover:text-ink md:block"
          >
            전체 인터뷰 보기 →
          </a>
        </div>
      </FadeUp>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <FadeUp>
          <a href="/interview" className="group block">
            <div className="relative border border-ink/10 bg-ivory/55 p-3">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/interview-korean-featured.png"
                  alt="인터뷰이 초상"
                  className="h-full w-full object-cover sepia-[0.14] saturate-[0.82] transition-transform duration-700 group-hover:scale-[1.035]"
                />
              </div>
              <div className="absolute inset-x-3 bottom-3 bg-gradient-to-t from-ink/78 via-ink/28 to-transparent p-6 pt-24">
                <span className="mb-2 block font-mono text-xs text-white/62">Vol.01 · Featured</span>
                <p className="text-2xl font-black leading-snug text-white">
                  "완성하지 않아도 괜찮아요."
                </p>
                <p className="mt-2 text-sm text-white/72">문지희 · 소설가</p>
              </div>
            </div>
          </a>
        </FadeUp>

        <FadeUp delay={120}>
          <div>
            <blockquote className="border-l border-coral/55 pl-6">
              <p className="text-2xl font-semibold italic leading-relaxed tracking-[-0.02em] text-ink md:text-4xl">
                "문장은 늘 조금 늦게 오지만,
                <br />
                기다린 사람에게는 정확히 도착해요."
              </p>
              <footer className="mt-4 text-sm text-sub">문지희, 소설가</footer>
            </blockquote>

            <p className="mt-7 max-w-2xl text-sm leading-7 text-sub md:text-base">
              글릿 인터뷰는 글을 쓰는 사람들의 내면을 기록합니다. 완벽한 성공담이 아니라,
              지금도 쓰고 있는 사람들의 온도와 리듬을 묻습니다.
            </p>

            <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
              {interviews.map((item) => (
                <a
                  key={item.name}
                  href="/interview"
                  className="group grid gap-3 py-4 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div className="flex items-center gap-3">
                    <Diamond className="h-2.5 w-2.5 shrink-0 text-coral/55 transition-colors group-hover:text-coral" />
                    <div>
                      <span className="font-bold text-ink transition-colors group-hover:text-coral">
                        {item.name}
                      </span>
                      <span className="ml-2 text-xs text-sub/50">{item.role}</span>
                    </div>
                  </div>
                  <span className="text-sm text-sub/65 sm:text-right">{item.subject}</span>
                </a>
              ))}
            </div>

            <a
              href="/interview"
              className="mt-8 inline-flex rounded-full bg-coral px-6 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ink"
            >
              전체 인터뷰 보기
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
