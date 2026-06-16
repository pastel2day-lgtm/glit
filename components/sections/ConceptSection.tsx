'use client'
import Diamond from '@/components/ui/Diamond'
import FadeUp from '@/components/ui/FadeUp'

const concepts = [
  {
    num: '01',
    label: '쓰기',
    eng: 'Writing',
    text: '하루의 결을 붙잡는 가장 조용한 방식.',
    desc: '완성된 글이 아니어도 괜찮습니다. 오늘의 한 문장을 적는 순간, 삶은 조금 더 선명해집니다.',
  },
  {
    num: '02',
    label: '읽기',
    eng: 'Reading',
    text: '타인의 문장 속에서 나의 마음을 발견하는 일.',
    desc: '다른 사람의 언어가 내 안의 감정을 대신 말해줄 때, 우리는 혼자가 아니라는 것을 알게 됩니다.',
  },
  {
    num: '03',
    label: '삶',
    eng: 'Life',
    text: '가장 보통의 시간이 가장 아름다운 소재가 된다.',
    desc: '특별하지 않아도 좋습니다. 오늘의 산책, 오래 머문 생각, 작은 다정함이 글릿의 재료입니다.',
  },
]

export default function ConceptSection() {
  return (
    <section id="concept" className="border-t border-ink/10 bg-ivory">
      <FadeUp>
        <div className="mx-auto grid max-w-6xl gap-6 border-b border-ink/10 px-5 py-12 md:grid-cols-[1fr_18rem] md:px-8">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-coral">Concept</p>
            <h2 className="text-4xl font-black leading-none tracking-[-0.035em] text-ink md:text-7xl">
              Why We Write
            </h2>
          </div>
          <p className="self-end text-sm leading-7 text-sub md:text-right">
            글릿이 믿는 세 가지. 쓰고, 읽고, 살아가는 일만으로도 충분히 빛나는 사람들을 위한 기준입니다.
          </p>
        </div>
      </FadeUp>

      <div className="mx-auto max-w-6xl divide-y divide-ink/10 px-5 md:px-8">
        {concepts.map((item, index) => (
          <FadeUp key={item.num} delay={index * 80}>
            <div className="group grid gap-5 py-9 transition-colors hover:bg-white/35 md:grid-cols-[5rem_10rem_2rem_1fr_17rem] md:items-center md:px-4">
              <span className="font-mono text-4xl font-bold text-ink/12 transition-colors group-hover:text-coral/30">
                {item.num}
              </span>
              <div>
                <p className="text-2xl font-black tracking-[-0.02em] text-ink">{item.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-sub/45">{item.eng}</p>
              </div>
              <Diamond className="hidden h-3 w-3 text-coral/45 md:block" />
              <p className="text-lg font-semibold leading-snug text-ink md:text-xl">{item.text}</p>
              <p className="text-sm leading-7 text-sub md:text-right">{item.desc}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}
