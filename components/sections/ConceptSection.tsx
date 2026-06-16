'use client'
import FadeUp from '@/components/ui/FadeUp'

const concepts = [
  {
    num: '01',
    label: '글쓰기',
    eng: 'Writing',
    text: '단 한 줄의 문장이 오늘 하루를 바꾼다.',
    desc: '쓴다는 것은 내면을 들여다보는 일입니다. 막막하더라도, 오늘의 한 문장이 쌓여 당신만의 이야기가 됩니다.',
  },
  {
    num: '02',
    label: '읽기',
    eng: 'Reading',
    text: '타인의 글 속에서, 나를 발견하는 법.',
    desc: '다른 사람의 언어가 내 감정을 대신 말해줄 때, 우리는 외롭지 않다는 것을 알게 됩니다.',
  },
  {
    num: '03',
    label: '삶',
    eng: 'Life',
    text: '가장 보통의 순간이 가장 아름다운 소재가 된다.',
    desc: '특별하지 않아도 좋습니다. 오늘의 날씨, 어제의 대화, 그 작은 것들이 글이 되는 곳이 글릿입니다.',
  },
]

export default function ConceptSection() {
  return (
    <section id="concept" className="py-24 md:py-36 px-6 bg-ivory">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-coral text-xs font-medium tracking-widest uppercase mb-4">Concept</p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink">
              글쓰기{' '}
              <span className="text-sub/40 font-light mx-1">|</span>
              읽기{' '}
              <span className="text-sub/40 font-light mx-1">|</span>
              삶
            </h2>
            <p className="text-sub mt-4 text-base max-w-md mx-auto leading-relaxed">
              글릿이 믿는 세 가지. 쓰고, 읽고, 살아가는 것만으로 충분합니다.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concepts.map((item, i) => (
            <FadeUp key={item.label} delay={i * 110}>
              <div className="group relative p-8 border border-ink/10 rounded-2xl hover:border-coral/40 hover:shadow-sm bg-white/40 hover:bg-white/70 transition-all duration-300 h-full overflow-hidden">
                <span className="absolute -top-4 -right-2 text-[7rem] font-bold text-ink/5 leading-none select-none pointer-events-none group-hover:text-coral/8 transition-colors duration-300">
                  {item.num}
                </span>

                <p className="text-coral text-xs font-mono mb-5 tracking-widest relative z-10">{item.num}</p>
                <h3 className="text-2xl font-bold text-ink mb-1 relative z-10">{item.label}</h3>
                <p className="text-sub text-sm mb-5 relative z-10">{item.eng}</p>

                <p className="text-ink font-medium text-base mb-4 leading-snug relative z-10">{item.text}</p>

                <div className="w-8 h-px bg-coral/30 mb-5 group-hover:w-16 transition-all duration-300 relative z-10" />

                <p className="text-ink/55 text-sm leading-relaxed relative z-10">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
