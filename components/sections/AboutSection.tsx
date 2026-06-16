'use client'
import FadeUp from '@/components/ui/FadeUp'
import Diamond from '@/components/ui/Diamond'

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-36 px-6 bg-salmon">
      <div className="max-w-3xl mx-auto text-center">
        <FadeUp>
          <div className="flex justify-center mb-5">
            <Diamond className="w-6 h-6 text-coral" />
          </div>
          <p className="text-coral text-xs font-medium tracking-widest uppercase mb-6">About</p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink leading-snug mb-10">
            글릿이 모아가는 것들
          </h2>
        </FadeUp>

        <FadeUp delay={120}>
          <p className="text-ink/85 text-lg md:text-xl leading-relaxed mb-5">
            글릿은 빛나는 글을 수집하는 에디토리얼 공간입니다.
          </p>
          <p className="text-ink/65 text-base md:text-lg leading-loose mb-5">
            누군가의 글 속에서 오늘 하루를 위한 단 한 줄이
            <br className="hidden md:block" />
            당신에게 닿길 바라며,
          </p>
          <p className="text-ink/65 text-base md:text-lg leading-loose mb-12">
            가장 보통의 일상 속에서 반짝이는 것들을 모아갑니다.
            <br />
            가장 작은 문장에서, 가장 큰 위로가 시작됩니다.
          </p>
        </FadeUp>

        <FadeUp delay={220}>
          <a
            href="https://instagram.com/gleamit_glit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-coral hover:text-coral/80 transition-colors"
          >
            <Diamond className="w-3 h-3" />
            <span className="text-sm font-medium">@gleamit_glit</span>
          </a>
        </FadeUp>
      </div>
    </section>
  )
}
