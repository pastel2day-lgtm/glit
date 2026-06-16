'use client'
import FadeUp from '@/components/ui/FadeUp'

const editorials = [
  {
    category: '에세이',
    episode: 'ep.04',
    title: '오늘의 날씨, 그리고 이 글이 필요한 이유들.',
    excerpt:
      '비가 오는 날이면 꼭 이런 생각이 든다. 지금 이 순간을 붙잡아두고 싶다는, 어딘가에 남겨두고 싶다는 마음.',
    readTime: '4분',
  },
  {
    category: '일상',
    episode: 'ep.04',
    title: '아무도 묻지 않는 것들은 무엇일까?',
    excerpt:
      '누군가의 일상 속 당연한 것들. 그것이 사실은 가장 특별한 이야기인지도 모른다는 생각을 자주 한다.',
    readTime: '3분',
  },
  {
    category: '단상',
    episode: 'ep.04',
    title: '어제와 오늘 그 사이, 이야기하고 싶은 것 몇 가지.',
    excerpt:
      '매일의 경계선에서 우리는 무언가를 잃고, 또 무언가를 얻는다. 그 사이에서 글은 가장 조용한 목격자가 된다.',
    readTime: '5분',
  },
]

export default function EditorialSection() {
  return (
    <section id="archive" className="py-24 md:py-36 px-6 bg-salmon/20">
      <div className="max-w-5xl mx-auto">
        <FadeUp>
          <div className="text-center mb-16">
            <p className="text-coral text-xs font-medium tracking-widest uppercase mb-4">
              Editorial
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-ink">지금 이 글들</h2>
            <p className="text-sub mt-3 text-base">글릿에서 엄선한 에디토리얼 글 모음</p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {editorials.map((item, i) => (
            <FadeUp key={i} delay={i * 100}>
              <article className="bg-ivory rounded-2xl p-7 hover:shadow-md transition-all duration-300 group cursor-pointer h-full flex flex-col">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs text-coral font-medium border border-coral/30 px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-xs text-sub/60 font-mono">{item.episode}</span>
                </div>

                <h3 className="text-base md:text-lg font-bold text-ink leading-snug mb-3 group-hover:text-coral transition-colors duration-200">
                  {item.title}
                </h3>

                <p className="text-sub text-sm leading-relaxed flex-1 mb-5">{item.excerpt}</p>

                <div className="flex items-center justify-between pt-4 border-t border-ink/8">
                  <span className="text-xs text-sub/60">{item.readTime} 읽기</span>
                  <span className="text-coral text-sm font-medium group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
                    읽기 →
                  </span>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
