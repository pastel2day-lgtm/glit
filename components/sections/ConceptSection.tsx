'use client'
import FadeUp from '@/components/ui/FadeUp'

const concepts = [
  {
    num: '01',
    label: '글쓰기',
    eng: 'Writing',
    text: '이 한 문장이 당신의 오늘을 빛나게 만듭니다.',
  },
  {
    num: '02',
    label: '읽기',
    eng: 'Reading',
    text: '다른 사람의 글 속에서, 나의 이야기를 발견하세요.',
  },
  {
    num: '03',
    label: '삶',
    eng: 'Life',
    text: '일상이라는 소재로 만들어낸 아름다운 이야기들.',
  },
]

export default function ConceptSection() {
  return (
    <section id="concept" className="py-24 md:py-36 px-6 bg-ivory">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-coral text-xs font-medium tracking-widest uppercase mb-4">
              Concept
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink">
              글쓰기{' '}
              <span className="text-sub/50 font-light mx-1">|</span>
              읽기{' '}
              <span className="text-sub/50 font-light mx-1">|</span>
              삶
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {concepts.map((item, i) => (
            <FadeUp key={item.label} delay={i * 110}>
              <div className="group p-8 border border-ink/10 rounded-2xl hover:border-coral/30 hover:bg-salmon/10 transition-all duration-300 h-full">
                <p className="text-coral text-xs font-mono mb-6 tracking-widest">{item.num}</p>
                <h3 className="text-2xl font-bold text-ink mb-1">{item.label}</h3>
                <p className="text-sub text-sm mb-7">{item.eng}</p>
                <div className="w-8 h-px bg-coral/30 mb-7 group-hover:w-14 transition-all duration-300" />
                <p className="text-ink/75 leading-relaxed text-base">{item.text}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
