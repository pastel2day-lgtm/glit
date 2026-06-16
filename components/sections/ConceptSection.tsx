'use client'
import FadeUp from '@/components/ui/FadeUp'
import Diamond from '@/components/ui/Diamond'

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
    <section id="concept" className="bg-ivory border-t border-ink/8">
      {/* Big editorial label */}
      <FadeUp>
        <div className="px-6 md:px-12 py-10 border-b border-ink/8 flex items-end justify-between gap-4">
          <div>
            <p className="text-coral text-xs font-medium tracking-widest uppercase mb-2">Concept</p>
            <h2 className="text-4xl md:text-6xl font-bold text-ink leading-tight tracking-tight">
              Why We Write
            </h2>
          </div>
          <p className="hidden md:block text-sub text-sm max-w-[280px] text-right leading-relaxed pb-1">
            글릿이 믿는 세 가지.<br />쓰고, 읽고, 살아가는 것만으로 충분합니다.
          </p>
        </div>
      </FadeUp>

      {/* Three concept rows */}
      <div className="divide-y divide-ink/8">
        {concepts.map((item, i) => (
          <FadeUp key={item.label} delay={i * 80}>
            <div className="group px-6 md:px-12 py-10 grid grid-cols-12 gap-6 items-center hover:bg-white/40 transition-colors duration-300 cursor-default">
              {/* Number */}
              <div className="col-span-2 md:col-span-1">
                <span className="text-3xl md:text-4xl font-bold text-ink/10 group-hover:text-coral/20 transition-colors duration-300 font-mono">
                  {item.num}
                </span>
              </div>

              {/* Korean label */}
              <div className="col-span-4 md:col-span-2">
                <p className="text-xl md:text-2xl font-bold text-ink">{item.label}</p>
                <p className="text-sub/50 text-xs tracking-wider mt-0.5">{item.eng}</p>
              </div>

              {/* Divider */}
              <div className="hidden md:block col-span-1">
                <Diamond className="w-3 h-3 text-coral/30 mx-auto group-hover:text-coral/60 transition-colors" />
              </div>

              {/* Headline */}
              <div className="col-span-6 md:col-span-5">
                <p className="text-ink font-medium text-base md:text-lg leading-snug">{item.text}</p>
              </div>

              {/* Description — desktop only */}
              <div className="hidden md:block col-span-3">
                <p className="text-sub/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
