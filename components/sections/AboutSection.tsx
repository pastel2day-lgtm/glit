'use client'
import FadeUp from '@/components/ui/FadeUp'
import Diamond from '@/components/ui/Diamond'

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-36 px-6 bg-salmon">
      <div className="max-w-3xl mx-auto">
        <FadeUp>
          <div className="text-center mb-14">
            <div className="flex justify-center mb-5">
              <Diamond className="w-6 h-6 text-coral" />
            </div>
            <p className="text-coral text-xs font-medium tracking-widest uppercase mb-6">About</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink leading-snug">
              글릿이 모아가는 것들
            </h2>
          </div>
        </FadeUp>

        {/* Pull quote */}
        <FadeUp delay={100}>
          <blockquote className="text-center mb-14 px-4">
            <p className="text-coral text-5xl leading-none mb-2 font-serif select-none">"</p>
            <p className="text-ink text-xl md:text-2xl font-medium leading-relaxed italic">
              가장 작은 문장에서,
              <br />
              가장 큰 위로가 시작됩니다.
            </p>
          </blockquote>
        </FadeUp>

        {/* Two-column body */}
        <FadeUp delay={180}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
            <div>
              <h3 className="text-ink font-semibold mb-3 text-sm tracking-wide uppercase">글릿은</h3>
              <p className="text-ink/65 text-base leading-loose">
                빛나는 글을 수집하는 에디토리얼 공간입니다. 매주 새로운 에피소드와 함께,
                쓰고 읽고 살아가는 것의 의미를 함께 찾아갑니다.
              </p>
            </div>
            <div>
              <h3 className="text-ink font-semibold mb-3 text-sm tracking-wide uppercase">우리가 믿는 것</h3>
              <p className="text-ink/65 text-base leading-loose">
                누군가의 글 속에서 오늘 하루를 위한 단 한 줄이 당신에게 닿길 바랍니다.
                가장 보통의 일상 속에서 반짝이는 것들을 모아갑니다.
              </p>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={250}>
          <div className="text-center">
            <a
              href="https://instagram.com/gleamit_glit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-coral hover:text-coral/80 transition-colors"
            >
              <Diamond className="w-3 h-3" />
              <span className="text-sm font-medium">@gleamit_glit</span>
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
