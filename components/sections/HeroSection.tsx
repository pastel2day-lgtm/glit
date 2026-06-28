'use client'
import Diamond from '@/components/ui/Diamond'

const channels = [
  { label: '에디토리얼', val: 'Editorial', href: '#archive' },
  { label: '인터뷰', val: 'Interview', href: '/interview' },
  { label: '문장 결 검사', val: 'Diagnosis', href: '/diagnosis' },
  { label: '뉴스레터', val: 'Newsletter', href: '#join' },
]

export default function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col overflow-hidden bg-ivory pt-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[8%] top-[21%] h-[34rem] w-[34rem] rounded-full bg-salmon/30 blur-3xl" />
        <div className="absolute left-[4%] bottom-[18%] h-56 w-56 rounded-full bg-coral/7 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(255,255,255,0.28),transparent_32%),linear-gradient(rgba(46,43,40,0.026)_1px,transparent_1px)] bg-[size:100%_100%,88px_88px]" />
      </div>

      <div className="relative border-b border-ink/8 px-6 py-2.5 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[0.68rem] uppercase tracking-[0.22em] text-sub/40">
          <span className="font-mono">Vol.01 · 2026 Spring</span>
          <div className="hidden items-center gap-2 md:flex">
            <span>쓰기</span>
            <Diamond className="h-1.5 w-1.5 text-coral/35" />
            <span>읽기</span>
            <Diamond className="h-1.5 w-1.5 text-coral/35" />
            <span>삶</span>
          </div>
          <span className="font-mono">Glit Editorial</span>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-20 md:px-12">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8 flex items-center justify-center gap-3 md:justify-start">
            <Diamond className="h-3 w-3 text-coral" />
            <span className="text-xs font-medium uppercase tracking-[0.24em] text-coral">
              에디토리얼 매거진
            </span>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h1 className="mb-6 text-[clamp(4.4rem,12vw,9rem)] font-black leading-[0.9] tracking-[-0.045em] text-ink">
              글릿
            </h1>
            <div className="flex items-center justify-center gap-4 md:justify-start">
              <div className="h-px w-12 bg-coral" />
              <p className="text-base font-semibold italic tracking-wide text-coral md:text-lg">
                Gleam it, Glit!
              </p>
            </div>
          </div>

          <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="text-center md:text-left">
              <blockquote className="mb-5 border-l border-coral/35 pl-5 text-left">
                <p className="text-lg italic leading-relaxed text-ink/62 md:text-xl">
                  "글이 있는 곳에, 삶이 있다."
                </p>
              </blockquote>
              <p className="text-sm leading-7 text-sub">
                이 빛나는 순간들을 함께 모아가는 공간입니다.
                <br />
                글을 쓰고, 읽고, 살아가는 모든 이를 위해.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 md:items-end">
              <a
                href="#join"
                className="w-full rounded-full bg-ink px-8 py-4 text-center text-sm font-semibold text-ivory shadow-[0_16px_34px_rgba(46,43,40,0.14)] transition-all hover:-translate-y-0.5 hover:bg-coral md:w-auto"
              >
                소식 받아보기
              </a>
              <a
                href="/diagnosis"
                className="w-full rounded-full border border-ink/18 bg-ivory/30 px-8 py-4 text-center text-sm font-semibold text-ink backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-coral hover:text-coral md:w-auto"
              >
                <span className="mr-2 inline-block text-[0.6rem] text-coral">◆</span>
                문장 결 검사하기
              </a>
            </div>
          </div>

          <div className="grid border-y border-ink/8 sm:grid-cols-2 md:grid-cols-4">
            {channels.map((item) => (
              <a
                key={item.val}
                href={item.href}
                className="group border-b border-ink/8 px-6 py-4 text-center transition-colors hover:bg-white/30 sm:border-r sm:last:border-r-0 md:border-b-0"
              >
                <p className="text-base font-bold text-ink transition-colors group-hover:text-coral">
                  {item.label}
                </p>
                <p className="mt-1 text-xs tracking-[0.18em] text-sub/40">{item.val}</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#concept"
        className="relative mx-auto mb-8 inline-flex flex-col items-center gap-1.5 text-ink/30 transition-colors hover:text-coral"
      >
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.26em]">scroll</span>
        <span className="text-base leading-none">↓</span>
      </a>
    </section>
  )
}
