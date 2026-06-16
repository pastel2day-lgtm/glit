'use client'
import Diamond from '@/components/ui/Diamond'

const channels = [
  { label: '에디토리얼', val: 'Editorial' },
  { label: '인터뷰', val: 'Interview' },
  { label: '에센스 진단', val: 'Diagnosis' },
  { label: '뉴스레터', val: 'Newsletter' },
]

export default function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden bg-ivory">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-8rem] top-28 h-[34rem] w-[34rem] rounded-full bg-salmon/35 blur-3xl" />
        <div className="absolute bottom-16 left-[-10rem] h-[24rem] w-[24rem] rounded-full bg-coral/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,43,40,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(46,43,40,0.025)_1px,transparent_1px)] bg-[size:72px_72px] opacity-45" />
      </div>

      <div className="relative border-b border-ink/8 px-5 py-3 md:px-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-[0.68rem] uppercase tracking-[0.22em] text-sub/45">
          <span className="font-mono">Vol.01 · 2026 Spring</span>
          <span className="font-mono">Glit Editorial</span>
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-12 pt-28 md:px-8 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <Diamond className="h-3 w-3 text-coral" />
              <span className="text-xs font-semibold uppercase tracking-[0.26em] text-coral">
                에디토리얼 매거진
              </span>
            </div>

            <h1 className="text-[clamp(4.6rem,14vw,11rem)] font-black leading-[0.82] tracking-[-0.045em] text-ink">
              글릿
            </h1>

            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-14 bg-coral" />
              <p className="text-base font-semibold italic tracking-wide text-coral md:text-lg">
                Gleam it, Glit!
              </p>
            </div>

            <blockquote className="mt-11 max-w-xl border-l border-coral/45 pl-5">
              <p className="text-xl font-medium italic leading-relaxed text-ink/70 md:text-2xl">
                "글이 있는 곳에, 삶이 있다."
              </p>
              <p className="mt-5 text-sm leading-7 text-sub md:text-base">
                이 빛나는 순간들을 함께 모아가는 공간입니다. 글을 쓰고, 읽고,
                살아가는 모든 이를 위해.
              </p>
            </blockquote>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#join"
                className="rounded-full bg-ink px-7 py-4 text-center text-sm font-semibold text-ivory shadow-[0_18px_40px_rgba(46,43,40,0.18)] transition-all hover:-translate-y-0.5 hover:bg-coral"
              >
                소식 받아보기
              </a>
              <a
                href="/diagnosis"
                className="rounded-full border border-ink/18 bg-ivory/50 px-7 py-4 text-center text-sm font-semibold text-ink backdrop-blur transition-all hover:-translate-y-0.5 hover:border-coral hover:text-coral"
              >
                에센스 진단하기
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-8 top-8 hidden h-24 w-24 border-l border-t border-coral/35 lg:block" />
            <div className="absolute -right-4 bottom-10 hidden h-20 w-20 border-b border-r border-ink/15 lg:block" />
            <div className="relative ml-auto max-w-[34rem] border border-ink/10 bg-[#f8f1e7]/78 p-4 shadow-[0_34px_80px_rgba(46,43,40,0.09)] backdrop-blur">
              <div className="aspect-[4/5] overflow-hidden bg-salmon/20">
                <img
                  src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1000&h=1250&fit=crop&q=85"
                  alt="책상 위 노트와 연필"
                  className="h-full w-full object-cover sepia-[0.16] saturate-[0.86]"
                />
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-5 border-t border-ink/10 pt-4 mt-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-coral">Current Issue</p>
                  <p className="mt-1 text-lg font-bold text-ink">작은 문장이 머무는 곳</p>
                </div>
                <p className="self-end font-mono text-xs text-sub/55">01 / 04</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid border-y border-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((item) => (
            <a
              key={item.val}
              href={item.val === 'Diagnosis' ? '/diagnosis' : item.val === 'Interview' ? '/interview' : `#${item.val === 'Editorial' ? 'archive' : 'join'}`}
              className="group border-b border-ink/10 px-5 py-5 transition-colors hover:bg-white/40 sm:border-r sm:last:border-r-0 lg:border-b-0"
            >
              <p className="text-base font-bold text-ink transition-colors group-hover:text-coral">
                {item.label}
              </p>
              <p className="mt-1 text-xs tracking-[0.18em] text-sub/45">{item.val}</p>
            </a>
          ))}
        </div>
      </div>

      <a
        href="#concept"
        className="relative mx-auto mb-7 inline-flex flex-col items-center gap-1.5 text-ink/35 transition-colors hover:text-coral"
      >
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.26em]">scroll</span>
        <span className="text-lg leading-none">↓</span>
      </a>
    </section>
  )
}
