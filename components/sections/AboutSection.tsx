'use client'
import FadeUp from '@/components/ui/FadeUp'
import Diamond from '@/components/ui/Diamond'

export default function AboutSection() {
  return (
    <section id="about" className="bg-salmon/25 border-t border-ink/8">
      {/* Header */}
      <FadeUp>
        <div className="px-6 md:px-12 py-10 border-b border-ink/8">
          <p className="text-coral text-xs font-medium tracking-widest uppercase mb-2">About</p>
          <h2 className="text-4xl md:text-6xl font-bold text-ink leading-tight tracking-tight">
            About Glit
          </h2>
        </div>
      </FadeUp>

      <div className="px-6 md:px-12 py-16 max-w-6xl mx-auto">
        {/* Big pull quote */}
        <FadeUp>
          <blockquote className="mb-16">
            <p className="text-3xl md:text-5xl font-bold text-ink leading-tight tracking-tight max-w-3xl">
              가장 작은 문장에서,{' '}
              <span className="text-coral">가장 큰 위로가</span>{' '}
              시작됩니다.
            </p>
          </blockquote>
        </FadeUp>

        {/* Two columns */}
        <FadeUp delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-ink/8 pt-12">
            <div className="md:col-span-2 space-y-6">
              <p className="text-ink/75 text-base md:text-lg leading-loose">
                글릿은 빛나는 글을 수집하는 에디토리얼 공간입니다.
                쓰고 읽고 살아가는 것의 의미를 함께 찾아가는, 쓰는 사람들의 공간.
              </p>
              <p className="text-sub text-base leading-loose">
                매주 발행되는 에디토리얼에는 작가들의 인터뷰, 에세이, 단상이 담깁니다.
                누군가의 글 속에서 오늘 하루를 위한 단 한 줄이 당신에게 닿길 바랍니다.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {['에디토리얼', '인터뷰', '뉴스레터', '글쓰기 커뮤니티'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-coral border border-coral/25 px-3 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="border-l-2 border-coral/30 pl-5">
                <p className="text-xs text-sub/50 tracking-wider uppercase mb-1">창간</p>
                <p className="text-ink font-semibold">2026년 봄</p>
              </div>
              <div className="border-l-2 border-coral/30 pl-5">
                <p className="text-xs text-sub/50 tracking-wider uppercase mb-1">발행</p>
                <p className="text-ink font-semibold">매주 화요일</p>
              </div>
              <div className="border-l-2 border-coral/30 pl-5">
                <p className="text-xs text-sub/50 tracking-wider uppercase mb-1">채널</p>
                <a
                  href="https://instagram.com/gleamit_glit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-coral font-semibold hover:text-coral/70 transition-colors text-sm"
                >
                  @gleamit_glit
                </a>
              </div>
              <div className="border-l-2 border-coral/30 pl-5">
                <p className="text-xs text-sub/50 tracking-wider uppercase mb-1">인터뷰</p>
                <a
                  href="/interview"
                  className="text-coral font-semibold hover:text-coral/70 transition-colors text-sm flex items-center gap-1"
                >
                  <Diamond className="w-2.5 h-2.5" />
                  Writers&apos; Voice
                </a>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
