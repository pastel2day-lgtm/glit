'use client'
import Diamond from '@/components/ui/Diamond'

export default function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex flex-col bg-ivory overflow-hidden">
      {/* Top editorial strip */}
      <div className="border-b border-ink/8 px-6 md:px-12 py-2.5 flex items-center justify-between">
        <span className="text-xs text-sub/40 tracking-widest uppercase font-mono">Vol.01 · 2026 Spring</span>
        <div className="hidden md:flex items-center gap-1 text-xs text-sub/30">
          <span>글쓰기</span>
          <span className="mx-1.5 text-coral/30">◆</span>
          <span>읽기</span>
          <span className="mx-1.5 text-coral/30">◆</span>
          <span>삶</span>
        </div>
        <span className="text-xs text-sub/40 font-mono tracking-wide">GLIT EDITORIAL</span>
      </div>

      {/* Main hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-20 relative">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-salmon/40 blur-3xl" />
          <div className="absolute bottom-1/3 left-[5%] w-72 h-72 rounded-full bg-coral/8 blur-3xl" />
        </div>

        <div className="relative w-full max-w-5xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 justify-center md:justify-start">
            <Diamond className="w-3 h-3 text-coral" />
            <span className="text-xs text-coral font-medium tracking-widest uppercase">
              에디토리얼 매거진
            </span>
          </div>

          {/* Headline */}
          <div className="text-center md:text-left mb-10">
            <h1 className="text-[clamp(4rem,12vw,9rem)] font-bold text-ink leading-[0.9] tracking-tight mb-6">
              글릿
            </h1>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              <div className="h-px w-12 bg-coral" />
              <p className="text-coral text-base md:text-lg italic font-medium tracking-wide">
                Gleam it, Glit!
              </p>
            </div>
          </div>

          {/* Two-column body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-center md:text-left">
            <div>
              <blockquote className="text-ink/55 text-lg md:text-xl italic leading-relaxed mb-4 border-l-2 border-coral/30 pl-4 text-left">
                "글이 있는 곳에, 삶이 있다."
              </blockquote>
              <p className="text-sub text-sm leading-relaxed">
                이 빛나는 순간들을 함께 모아가는 공간입니다.<br />
                글을 쓰고, 읽고, 살아가는 모든 이를 위해.
              </p>
            </div>
            <div className="flex flex-col justify-center items-center md:items-end gap-4">
              <a
                href="/#join"
                className="w-full md:w-auto bg-ink text-ivory px-8 py-4 rounded-full text-sm font-medium hover:bg-coral transition-colors text-center"
              >
                소식 받아보기
              </a>
              <a
                href="/diagnosis"
                className="w-full md:w-auto border border-ink/20 text-ink px-8 py-4 rounded-full text-sm font-medium hover:border-coral hover:text-coral transition-colors text-center"
              >
                ◆ 에센스 진단하기
              </a>
            </div>
          </div>

          {/* Stats / tags bar */}
          <div className="flex items-center gap-0 border-t border-b border-ink/8 py-4 overflow-x-auto">
            {[
              { label: '에디토리얼', val: 'Editorial' },
              { label: '인터뷰', val: 'Interview' },
              { label: '에센스 진단', val: 'Diagnosis' },
              { label: '뉴스레터', val: 'Newsletter' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex-1 min-w-[120px] px-6 text-center border-r border-ink/8 last:border-r-0"
              >
                <p className="text-ink font-semibold text-base">{item.label}</p>
                <p className="text-sub/40 text-xs tracking-wider">{item.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pb-8 flex justify-center">
        <a
          href="#concept"
          className="inline-flex flex-col items-center gap-1.5 text-ink/30 hover:text-coral transition-colors group"
        >
          <span className="text-xs tracking-widest uppercase font-mono">scroll</span>
          <span className="text-base group-hover:translate-y-1 transition-transform duration-200">↓</span>
        </a>
      </div>
    </section>
  )
}
