/* eslint-disable @next/next/no-img-element */
'use client'
import FadeUp from '@/components/ui/FadeUp'

const featured = {
  category: '에세이',
  issue: 'Vol.04',
  title: '비 오는 날, 이 글이 필요한 이유',
  excerpt:
    '창밖으로 빗소리가 들릴 때면 꼭 글을 쓰고 싶어진다. 오늘 같은 날, 단 한 줄이라도 적어두는 것이 얼마나 중요한지에 대해 이야기하려 한다.',
  author: '김서연',
  authorRole: '에디터',
  readTime: '6분',
  image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&h=700&fit=crop&q=80',
}

const cards = [
  {
    category: '일상',
    issue: 'Vol.04',
    title: '아무도 묻지 않는 것들에 대하여',
    excerpt: '당신의 하루에도 아무도 묻지 않는 것들이 분명 있을 것이다.',
    readTime: '3분',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&h=460&fit=crop&q=80',
  },
  {
    category: '단상',
    issue: 'Vol.04',
    title: '오늘과 어제 사이에서',
    excerpt: '매일의 경계. 우리는 그 사이에서 무언가를 잃고, 또 무언가를 얻으며 살아간다.',
    readTime: '4분',
    image: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=700&h=460&fit=crop&q=80',
  },
]

export default function EditorialSection() {
  return (
    <section id="archive" className="bg-ivory border-t border-ink/8">
      {/* Header */}
      <FadeUp>
        <div className="px-6 md:px-12 py-10 border-b border-ink/8 flex items-end justify-between gap-4">
          <div>
            <p className="text-coral text-xs font-medium tracking-widest uppercase mb-2">Editorial</p>
            <h2 className="text-4xl md:text-6xl font-bold text-ink leading-tight tracking-tight">
              This Issue
            </h2>
          </div>
          <p className="hidden md:block text-sub/50 text-xs tracking-wider pb-1 font-mono">Vol.04 · 2026</p>
        </div>
      </FadeUp>

      <div className="px-6 md:px-12 py-14 max-w-6xl mx-auto">
        {/* Featured — full width horizontal */}
        <FadeUp>
          <article className="group grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-0 rounded-2xl overflow-hidden border border-ink/8 bg-white/50 hover:border-coral/20 hover:shadow-md transition-all duration-300 mb-8 cursor-pointer">
            <div className="relative h-64 md:h-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-ink/10" />
              <div className="absolute top-4 left-4">
                <span className="text-xs text-white font-medium bg-coral/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {featured.category}
                </span>
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-xs text-sub/50 font-mono">{featured.issue}</span>
                  <span className="text-xs text-coral/60 font-medium border border-coral/20 px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-ink leading-snug mb-4 group-hover:text-coral transition-colors duration-200">
                  {featured.title}
                </h3>
                <p className="text-sub text-sm leading-relaxed mb-6">{featured.excerpt}</p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-ink/8">
                <div>
                  <p className="text-ink text-sm font-medium">{featured.author}</p>
                  <p className="text-sub/50 text-xs">{featured.authorRole} · {featured.readTime} 읽기</p>
                </div>
                <span className="text-coral text-sm font-medium group-hover:translate-x-0.5 transition-transform inline-block">
                  읽기 →
                </span>
              </div>
            </div>
          </article>
        </FadeUp>

        {/* Two-column cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((item, i) => (
            <FadeUp key={i} delay={i * 80 + 80}>
              <article className="group bg-white/50 rounded-2xl overflow-hidden border border-ink/8 hover:border-coral/20 hover:shadow-sm transition-all duration-300 flex flex-col cursor-pointer">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-ink/10" />
                  <span className="absolute top-4 left-4 text-xs text-white font-medium bg-coral/75 backdrop-blur-sm px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs text-sub/40 font-mono mb-2">{item.issue}</span>
                  <h3 className="text-lg font-bold text-ink leading-snug mb-3 group-hover:text-coral transition-colors duration-200 flex-1">
                    {item.title}
                  </h3>
                  <p className="text-sub text-sm leading-relaxed mb-4">{item.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-ink/8">
                    <span className="text-xs text-sub/40">{item.readTime} 읽기</span>
                    <span className="text-coral text-sm font-medium group-hover:translate-x-0.5 transition-transform inline-block">
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
