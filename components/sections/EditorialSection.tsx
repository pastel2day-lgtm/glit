/* eslint-disable @next/next/no-img-element */
'use client'
import FadeUp from '@/components/ui/FadeUp'

const featured = {
  category: '에세이',
  episode: 'Vol.04',
  title: '비 오는 날, 이 글이 필요한 이유',
  excerpt:
    '창밖으로 빗소리가 들릴 때면 꼭 글을 쓰고 싶어진다. 오늘 같은 날, 단 한 줄이라도 적어두는 것이 얼마나 중요한지에 대해 이야기하려 한다. 우리는 너무 자주, 지금 이 순간을 그냥 흘려보낸다.',
  author: '김서연 · 에디터',
  readTime: '6분',
  image:
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&h=600&fit=crop&q=80',
}

const cards = [
  {
    category: '일상',
    episode: 'Vol.04',
    title: '아무도 묻지 않는 것들에 대하여',
    excerpt:
      '당신의 하루에도 아무도 묻지 않는 것들이 분명 있을 것이다. 그 침묵 속에 담긴 이야기들.',
    readTime: '3분',
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&h=460&fit=crop&q=80',
  },
  {
    category: '단상',
    episode: 'Vol.04',
    title: '오늘과 어제 사이에서',
    excerpt:
      '매일의 경계. 우리는 그 사이에서 무언가를 잃고, 또 무언가를 얻으며 살아간다.',
    readTime: '4분',
    image:
      'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=700&h=460&fit=crop&q=80',
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

        {/* Featured article */}
        <FadeUp>
          <article className="group bg-ivory rounded-3xl overflow-hidden mb-6 cursor-pointer hover:shadow-lg transition-shadow duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-ink/10" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs text-coral font-medium border border-coral/30 px-2.5 py-1 rounded-full">
                    {featured.category}
                  </span>
                  <span className="text-xs text-sub/60 font-mono">{featured.episode}</span>
                  <span className="text-xs text-coral/60 font-medium">Featured</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-ink leading-snug mb-4 group-hover:text-coral transition-colors duration-200">
                  {featured.title}
                </h3>
                <p className="text-sub text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-sub/60">
                    {featured.author} · {featured.readTime} 읽기
                  </span>
                  <span className="text-coral text-sm font-medium group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
                    읽기 →
                  </span>
                </div>
              </div>
            </div>
          </article>
        </FadeUp>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((item, i) => (
            <FadeUp key={i} delay={i * 100 + 100}>
              <article className="group bg-ivory rounded-2xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-ink/10" />
                  <span className="absolute top-4 left-4 text-xs text-white font-medium bg-coral/80 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-ink leading-snug mb-3 group-hover:text-coral transition-colors duration-200">
                    {item.title}
                  </h3>
                  <p className="text-sub text-sm leading-relaxed flex-1 mb-4">{item.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-ink/8">
                    <span className="text-xs text-sub/60">
                      {item.episode} · {item.readTime} 읽기
                    </span>
                    <span className="text-coral text-sm font-medium group-hover:translate-x-0.5 transition-transform duration-200 inline-block">
                      읽기 →
                    </span>
                  </div>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}
