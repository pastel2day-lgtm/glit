'use client'
import Diamond from '@/components/ui/Diamond'

export default function HeroSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col items-center justify-center relative bg-salmon overflow-hidden px-6"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-coral/15 blur-3xl" />
        <div className="absolute bottom-1/3 left-1/5 w-64 h-64 rounded-full bg-ivory/25 blur-3xl" />
        <div className="absolute top-2/3 right-1/5 w-48 h-48 rounded-full bg-coral/10 blur-2xl" />
      </div>

      <div className="relative text-center max-w-2xl mx-auto">
        <div className="flex justify-center mb-8">
          <Diamond className="w-10 h-10 text-coral" />
        </div>

        <h1 className="text-7xl md:text-9xl font-bold text-ink leading-none mb-3 tracking-tight">
          글릿
        </h1>
        <p className="text-coral text-base md:text-lg italic font-medium mb-10 tracking-widest">
          Gleam it, Glit!
        </p>

        <div className="mb-10">
          <div className="flex items-center gap-3 justify-center mb-5">
            <div className="h-px flex-1 max-w-[60px] bg-ink/15" />
            <span className="text-xs text-sub/50 tracking-widest uppercase">editorial</span>
            <div className="h-px flex-1 max-w-[60px] bg-ink/15" />
          </div>
          <blockquote className="text-ink/60 text-lg md:text-xl italic leading-relaxed">
            "글이 있는 곳에, 삶이 있다."
          </blockquote>
        </div>

        <p className="text-ink text-xl md:text-2xl font-medium leading-relaxed mb-5">
          이 빛나는 순간들을 함께 모아가는 공간입니다.
        </p>
        <p className="text-ink/65 text-base md:text-lg leading-loose">
          글을 쓰고픈 사람, 글을 읽고 싶은 사람,
          <br />
          글쓰기가 일상이 되길 바라는 모든 이를 위해.
        </p>

        <div className="flex justify-center gap-3 mt-8">
          {['글쓰기', '읽기', '삶'].map((tag) => (
            <span
              key={tag}
              className="text-xs text-coral border border-coral/40 px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/#join"
            className="bg-ink text-ivory px-7 py-3.5 rounded-full text-sm font-medium hover:bg-coral transition-colors"
          >
            소식 받아보기
          </a>
          <a
            href="/diagnosis"
            className="border border-ink/25 text-ink px-7 py-3.5 rounded-full text-sm font-medium hover:border-coral hover:text-coral transition-colors"
          >
            ◆ 에센스 진단하기
          </a>
        </div>

        <div className="mt-12">
          <a
            href="#concept"
            className="inline-flex flex-col items-center gap-2 text-ink/40 hover:text-coral transition-colors group"
            aria-label="아래로 스크롤"
          >
            <span className="text-xs tracking-widest uppercase font-medium">scroll</span>
            <span className="text-lg group-hover:translate-y-1 transition-transform duration-200">↓</span>
          </a>
        </div>
      </div>
    </section>
  )
}
