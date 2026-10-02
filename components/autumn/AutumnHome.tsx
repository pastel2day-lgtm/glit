/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from 'react'
import FadeUp from '@/components/ui/FadeUp'
import SiteFooter from '@/components/SiteFooter'
import { Cloud, FeltDiamond, HillScene, Leaf } from '@/components/autumn/Felt'
import articles from '@/lib/editorialArticles'
import seasonSentences from '@/lib/seasonSentences'

export type Variant = 'felt' | 'paper'

const navLinks = [
  { label: 'Concept', href: '#concept' },
  { label: 'Editorial', href: '/editorial' },
  { label: 'Sentences', href: '/sentences' },
  { label: 'Interview', href: '/interview' },
  { label: 'About', href: '#about' },
]

const concepts = [
  {
    num: '01',
    label: '쓰기',
    eng: 'Writing',
    text: '하루의 결을 붙잡는 가장 조용한 방식.',
    desc: '완성된 글이 아니어도 괜찮습니다. 오늘의 한 문장을 적는 순간, 삶은 조금 더 선명해집니다.',
    leaf: { kind: 'oval' as const, color: '#B5532E' },
  },
  {
    num: '02',
    label: '읽기',
    eng: 'Reading',
    text: '타인의 문장 속에서 나의 마음을 발견하는 일.',
    desc: '다른 사람의 언어가 내 안의 감정을 대신 말해줄 때, 우리는 혼자가 아니라는 것을 알게 됩니다.',
    leaf: { kind: 'ginkgo' as const, color: '#E9B52F' },
  },
  {
    num: '03',
    label: '삶',
    eng: 'Life',
    text: '가장 보통의 시간이 가장 아름다운 소재가 된다.',
    desc: '특별하지 않아도 좋습니다. 오늘의 산책, 오래 머문 생각, 작은 다정함이 글릿의 재료입니다.',
    leaf: { kind: 'oval' as const, color: '#6F7D35' },
  },
]

// 인터뷰 문장·제목은 /interview 페이지의 내용을 그대로 가져옵니다.
const featuredInterview = {
  name: '권민혁',
  role: '에세이스트',
  subject: '불완전한 문장이 더 솔직합니다',
  quote: ['저는 문법적으로 완전한 문장보다', '숨이 끊기는 문장을 더 좋아해요.'],
  image: '/images/interview-korean-essayist.png',
}

const interviews = [
  { name: '문지희', role: '소설가', subject: '완성하지 않아도 괜찮아요' },
  { name: '박수지', role: '시인', subject: '시는 침묵으로 씁니다' },
  { name: '김유인', role: '독립출판 작가', subject: '단 한 명을 위한 글' },
]

const toCard = (article: (typeof articles)[number]) => ({ ...article, href: `/editorial/${article.slug}` })
const featured = toCard(articles[0])
const cards = articles.slice(1, 3).map(toCard)

export default function AutumnHome({ variant }: { variant: Variant }) {
  const felt = variant === 'felt'
  const heading = felt
    ? 'font-jua text-5xl leading-none text-au-ink md:text-7xl'
    : 'text-4xl font-black leading-none tracking-[-0.035em] text-au-ink md:text-7xl'

  return (
    <main className={`felt break-keep text-au-ink ${felt ? 'bg-au-cream' : 'bg-au-linen'}`}>
      <Nav felt={felt} />
      {felt ? <FeltHero /> : <PaperHero />}

      {/* 가을의 문장 */}
      <section id="sentences" className={`felt ${felt ? 'bg-au-mustard' : 'border-t border-au-ink/10'}`}>
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <FadeUp>
            <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.26em] ${felt ? 'text-au-ink/70' : 'text-au-rust'}`}>
              Sentences
            </p>
            <h2 className={heading}>가을의 문장</h2>
            <p className="mt-6 text-xl font-bold leading-snug md:text-2xl">
              떨어진 잎을 줍듯, 오래 남는 문장을 줍습니다.
            </p>
            <p className={`mt-3 max-w-xl text-base leading-7 ${felt ? 'text-au-ink/80' : 'text-au-ink/70'}`}>
              선선한 계절에 다시 꺼내 읽고 싶은, 오래 사랑받은 책 속의 한 줄.
            </p>
          </FadeUp>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {seasonSentences.map((s, i) => {
              const tone = felt
                ? ['bg-au-rust text-au-cream', 'bg-au-cream text-au-ink', 'bg-au-bark text-au-cream'][i]
                : 'bg-white/70 text-au-ink'
              return (
                <FadeUp key={s.book} delay={i * 90}>
                  <figure
                    className={`felt stitch flex h-full min-h-[16rem] flex-col md:min-h-[22rem] justify-between rounded-[28px] p-8 ${tone} ${
                      felt ? 'shadow-[0_10px_0_rgba(58,46,37,0.12)]' : 'stitch-dark border border-au-ink/10'
                    } ${i === 1 && felt ? 'stitch-dark md:-translate-y-4' : ''}`}
                  >
                    <blockquote>
                      <span className={`block h-8 font-serif text-7xl leading-none ${felt ? 'opacity-60' : 'text-au-rust'}`}>“</span>
                      <p className="mt-2 text-xl font-semibold leading-relaxed">{s.text}</p>
                    </blockquote>
                    <figcaption className="mt-8 text-sm opacity-75">
                      『{s.book}』 · {s.author}
                    </figcaption>
                  </figure>
                </FadeUp>
              )
            })}
          </div>

          <a
            href="/sentences"
            className={`mt-10 inline-block text-sm font-bold underline underline-offset-4 ${felt ? 'text-au-ink' : 'text-au-rust'}`}
          >
            모든 문장 보기 →
          </a>
        </div>
      </section>

      {/* Concept */}
      <section id="concept" className={`felt ${felt ? 'bg-au-cream' : 'border-t border-au-ink/10'}`}>
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <FadeUp>
            <div className="grid gap-6 border-b border-au-ink/10 pb-10 md:grid-cols-[1fr_18rem]">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-au-rust">Concept</p>
                <h2 className={heading}>Why We Write</h2>
              </div>
              <p className="self-end text-sm leading-7 text-au-ink/65 md:text-right">
                글릿이 믿는 세 가지. 쓰고, 읽고, 살아가는 일만으로도 충분히 빛나는 사람들을 위한 기준입니다.
              </p>
            </div>
          </FadeUp>
          <div className="divide-y divide-au-ink/10">
            {concepts.map((item, i) => (
              <FadeUp key={item.num} delay={i * 80}>
                <div className="grid gap-4 py-9 md:grid-cols-[5rem_10rem_1fr_17rem] md:items-center">
                  {felt ? (
                    <Leaf kind={item.leaf.kind} color={item.leaf.color} className="h-14 w-14" />
                  ) : (
                    <span className="font-mono text-4xl font-bold text-au-rust/35">{item.num}</span>
                  )}
                  <div>
                    <p className={felt ? 'font-jua text-3xl' : 'text-2xl font-black tracking-[-0.02em]'}>{item.label}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-au-ink/45">{item.eng}</p>
                  </div>
                  <p className="text-lg font-semibold leading-snug md:text-xl">{item.text}</p>
                  <p className="text-sm leading-7 text-au-ink/65 md:text-right">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial */}
      <section id="archive" className={`felt border-t border-au-ink/10 ${felt ? 'bg-au-linen' : 'bg-[#F2E8D5]'}`}>
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <FadeUp>
            <div className="flex items-end justify-between gap-5">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-au-rust">Editorial</p>
                <h2 className={heading}>This Issue</h2>
              </div>
              <p className="hidden pb-1 font-mono text-xs uppercase tracking-[0.2em] text-au-ink/45 md:block">
                {featured.issue} · 2026 가을
              </p>
            </div>
          </FadeUp>

          <FadeUp>
            <a href={featured.href} className="group mt-12 block">
              <article
                className={`grid overflow-hidden md:grid-cols-[0.95fr_1.05fr] ${
                  felt ? 'felt stitch stitch-dark rounded-[32px] bg-au-cream' : 'border border-au-ink/10 bg-au-linen'
                }`}
              >
                <div className="relative min-h-72 overflow-hidden md:min-h-[30rem]">
                  <img
                    src={featured.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-between p-8 md:p-10">
                  <div>
                    <p className="text-xs font-semibold text-au-rust">
                      {featured.category} · {featured.issue}
                    </p>
                    <h3
                      className={`mt-6 text-3xl leading-tight transition-colors group-hover:text-au-rust md:text-5xl ${
                        felt ? 'font-jua' : 'font-black tracking-[-0.025em]'
                      }`}
                    >
                      {featured.title}
                    </h3>
                    <p className="mt-5 max-w-lg text-base leading-7 text-au-ink/70">{featured.subtitle}</p>
                  </div>
                  <div className="mt-10 flex items-center justify-between border-t border-au-ink/10 pt-5 text-sm">
                    <span className="text-au-ink/55">
                      {featured.author} {featured.authorRole} · {featured.readTime} 읽기
                    </span>
                    <span className="font-bold text-au-rust">읽기</span>
                  </div>
                </div>
              </article>
            </a>
          </FadeUp>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {cards.map((item, i) => (
              <FadeUp key={item.slug} delay={i * 80 + 90}>
                <a href={item.href} className="group block h-full">
                  <article
                    className={`grid h-full grid-cols-[8rem_1fr] overflow-hidden sm:grid-cols-[11rem_1fr] ${
                      felt ? 'felt rounded-[24px] bg-au-cream' : 'border border-au-ink/10 bg-au-linen'
                    }`}
                  >
                    <div className="relative min-h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col p-5">
                      <p className="text-xs font-semibold text-au-rust">{item.category}</p>
                      <h3
                        className={`mt-3 text-xl leading-snug transition-colors group-hover:text-au-rust ${
                          felt ? 'font-jua text-2xl' : 'font-black'
                        }`}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-au-ink/65">{item.subtitle}</p>
                      <p className="mt-4 text-xs text-au-ink/45">{item.readTime} 읽기</p>
                    </div>
                  </article>
                </a>
              </FadeUp>
            ))}
          </div>

          <a
            href="/editorial"
            className={`mt-10 inline-flex px-6 py-3 text-sm font-semibold transition-colors ${
              felt
                ? 'rounded-full bg-au-ink text-au-cream hover:bg-au-rust'
                : 'border border-au-ink/20 hover:border-au-rust hover:text-au-rust'
            }`}
          >
            모든 이야기 보기 →
          </a>
        </div>
      </section>

      {/* Interview */}
      <section id="interview" className={`felt border-t border-au-ink/10 ${felt ? 'bg-[#E4DDBC]' : ''}`}>
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <FadeUp>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-au-rust">Interview</p>
            <h2 className={`${heading} mb-10`}>Writers&apos; Voice</h2>
            <a href="/interview" className="group block">
              <div className={`overflow-hidden ${felt ? 'felt stitch rounded-[32px] bg-au-olive p-3' : 'border border-au-ink/10 p-3'}`}>
                <div className={`relative aspect-[4/5] overflow-hidden ${felt ? 'rounded-[24px]' : ''}`}>
                  <img
                    src={featuredInterview.image}
                    alt={`${featuredInterview.role} ${featuredInterview.name} 인터뷰 사진`}
                    className="h-full w-full object-cover object-[50%_20%] sepia-[0.12] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-au-ink/80 via-au-ink/30 to-transparent p-6 pt-20">
                    <p className="text-xl font-bold leading-snug text-white md:text-2xl">{featuredInterview.subject}</p>
                    <p className="mt-1 text-sm text-white/75">
                      {featuredInterview.name} · {featuredInterview.role}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </FadeUp>

          <FadeUp delay={120}>
            <blockquote className="border-l-2 border-au-rust/60 pl-6">
              <p className="text-2xl font-semibold leading-relaxed tracking-[-0.02em] md:text-4xl">
                “{featuredInterview.quote[0]}
                <br />
                {featuredInterview.quote[1]}”
              </p>
              <footer className="mt-4 text-sm text-au-ink/60">
                {featuredInterview.name}, {featuredInterview.role}
              </footer>
            </blockquote>
            <p className="mt-7 max-w-2xl text-base leading-7 text-au-ink/70">
              글릿 인터뷰는 글을 쓰는 사람들의 내면을 기록합니다. 완벽한 성공담이 아니라, 지금도 쓰고 있는 사람들의
              온도와 리듬을 묻습니다.
            </p>
            <div className="mt-8 divide-y divide-au-ink/10 border-y border-au-ink/10">
              {interviews.map((item) => (
                <a key={item.name} href="/interview" className="group grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <span>
                    <span className="font-bold transition-colors group-hover:text-au-rust">{item.name}</span>
                    <span className="ml-2 text-xs text-au-ink/50">{item.role}</span>
                  </span>
                  <span className="text-sm text-au-ink/65 sm:text-right">{item.subject}</span>
                </a>
              ))}
            </div>
            <a
              href="/interview"
              className={`mt-8 inline-flex px-6 py-3.5 text-sm font-semibold transition-colors ${
                felt ? 'rounded-full bg-au-ink text-au-cream hover:bg-au-rust' : 'border border-au-ink/20 hover:border-au-rust hover:text-au-rust'
              }`}
            >
              전체 인터뷰 보기
            </a>
          </FadeUp>
        </div>
      </section>

      {/* About */}
      <section id="about" className={`felt border-t border-au-ink/10 ${felt ? 'bg-au-cream' : ''}`}>
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <FadeUp>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-au-rust">About</p>
            <p
              className={`max-w-4xl leading-tight ${
                felt ? 'font-jua text-4xl md:text-6xl' : 'text-4xl font-black tracking-[-0.035em] md:text-6xl'
              }`}
            >
              가장 작은 문장에서,
              <br />
              <span className="text-au-rust">가장 나다운 하루가</span> 시작됩니다.
            </p>
          </FadeUp>
          <FadeUp delay={110}>
            <div className="mt-12 grid gap-12 border-t border-au-ink/10 pt-12 md:grid-cols-[1fr_16rem]">
              <div className="space-y-6">
                <p className="text-lg leading-9 text-au-ink/80">
                  글릿은 빛나는 글을 수집하는 에디토리얼 공간입니다. 쓰고 읽고 살아가는 일의 태도를 함께 찾아가며, 작은
                  문장이 하루를 바꾸는 순간을 기록합니다.
                </p>
                <p className="text-base leading-8 text-au-ink/65">
                  매월 발행되는 에디토리얼에는 작가들의 인터뷰, 에세이, 감상이 담깁니다. 완결된 글 너머에서 오늘을 위한
                  한 줄이 당신에게 닿기를 바랍니다.
                </p>
              </div>
              <dl className="space-y-5 text-sm">
                {[
                  ['창간', '2026년 봄'],
                  ['발행', '매월'],
                ].map(([k, v]) => (
                  <div key={k} className="border-l-2 border-au-rust/40 pl-4">
                    <dt className="text-xs uppercase tracking-[0.2em] text-au-ink/50">{k}</dt>
                    <dd className="mt-1 font-bold">{v}</dd>
                  </div>
                ))}
                <div className="border-l-2 border-au-rust/40 pl-4">
                  <dt className="text-xs uppercase tracking-[0.2em] text-au-ink/50">채널</dt>
                  <dd className="mt-1 font-bold text-au-rust">
                    <a href="https://instagram.com/gleamit_glit" target="_blank" rel="noopener noreferrer">
                      @gleamit_glit
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </FadeUp>
        </div>
      </section>

      <Join felt={felt} />
    </main>
  )
}

function Nav({ felt }: { felt: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-au-ink/10 bg-au-cream/90 backdrop-blur-md' : ''
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#home" className="flex items-center gap-2" aria-label="글릿 홈">
          <FeltDiamond className="h-5 w-5" />
          <span className={felt ? 'font-jua text-2xl' : 'text-xl font-bold tracking-[-0.02em]'}>글릿</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-au-ink/70 transition-colors hover:text-au-rust">
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#join"
          className="hidden rounded-full bg-au-rust px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-au-ink md:inline-flex"
        >
          소식 받아보기
        </a>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-au-ink/15 bg-au-cream/70 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
        >
          <span className="text-lg leading-none">{open ? '×' : '☰'}</span>
        </button>
      </nav>
      {open && (
        <div className="border-t border-au-ink/10 bg-au-cream px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-base font-medium text-au-ink/75">
                {l.label}
              </a>
            ))}
            <a
              href="#join"
              onClick={() => setOpen(false)}
              className="rounded-full bg-au-rust px-5 py-3 text-center text-sm font-semibold text-white"
            >
              소식 받아보기
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

// 글릿 아이덴티티 문장 — 원래 홈 히어로의 문안을 그대로 씁니다.
const heroLabel = '에디토리얼 매거진'
const heroCopy = '“글이 있는 곳에, 삶이 있다.”'
const heroSub = (
  <>
    이 빛나는 순간들을 함께 모아가는 공간입니다.
    <br />
    글을 쓰고, 읽고, 살아가는 모든 이를 위해.
  </>
)

function FallingLeaves() {
  const leaves = [
    { kind: 'oval' as const, color: '#B5532E', pos: 'left-[8%] top-[34%] hidden h-12 w-12 md:block', r: '-20deg', d: '0s' },
    { kind: 'ginkgo' as const, color: '#F2C649', pos: 'right-[7%] top-[13%] h-11 w-11 md:right-[12%] md:top-[40%] md:h-14 md:w-14', r: '15deg', d: '1.5s' },
    { kind: 'oval' as const, color: '#9E4430', pos: 'right-[26%] top-[18%] h-9 w-9 hidden md:block', r: '40deg', d: '3s' },
    { kind: 'ginkgo' as const, color: '#E9B52F', pos: 'left-[22%] top-[16%] h-10 w-10 hidden md:block', r: '-35deg', d: '2.2s' },
  ]
  return (
    <>
      {leaves.map((l) => (
        <Leaf
          key={l.pos}
          kind={l.kind}
          color={l.color}
          className={`leaf-sway pointer-events-none absolute ${l.pos}`}
          style={{ '--r': l.r, animationDelay: l.d } as React.CSSProperties}
        />
      ))}
    </>
  )
}

function FeltHero() {
  return (
    <section id="home" className="felt relative flex min-h-[100svh] flex-col overflow-hidden bg-au-sky">
      <Cloud className="pointer-events-none absolute -left-6 top-24 w-40 md:left-[6%] md:w-60" />
      <Cloud className="pointer-events-none absolute right-[5%] top-28 hidden w-72 md:block" />
      <FallingLeaves />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-1 flex-col items-center px-5 pb-[34vh] pt-28 text-center md:pb-[22vw] md:pt-32">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-au-ink/70">
          <FeltDiamond className="h-3.5 w-3.5" />
          {heroLabel}
        </p>
        <h1 className="puffy font-jua text-[clamp(5.5rem,17vw,11rem)] leading-[0.95]">글릿</h1>
        <p className="mt-2 font-jua text-xl text-au-ink/70 md:text-2xl">Gleam it, Glit!</p>
        <p className="mt-8 text-2xl font-bold leading-snug text-au-ink md:text-4xl">{heroCopy}</p>
        <p className="mt-4 max-w-md text-base leading-7 text-au-ink/75">{heroSub}</p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <a
            href="#sentences"
            className="rounded-full bg-au-rust px-8 py-4 text-sm font-bold text-white shadow-[0_6px_0_#7E3A1F] transition-transform hover:-translate-y-0.5"
          >
            가을의 문장 읽기
          </a>
          <a href="/diagnosis" className="text-sm font-semibold text-au-ink underline underline-offset-4">
            나의 문장 결 알아보기 →
          </a>
        </div>
      </div>

      <HillScene className="pointer-events-none absolute inset-x-0 bottom-0 h-[34vh] min-h-[220px] w-full md:h-[21vw] md:min-h-0" />
    </section>
  )
}

function PaperHero() {
  return (
    <section id="home" className="relative overflow-hidden pt-24 md:pt-28">
      <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-6xl items-center gap-12 px-5 pb-16 md:grid-cols-[1.05fr_0.95fr] md:px-8">
        <div>
          <p className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-[0.24em] text-au-rust">
            <FeltDiamond className="h-3.5 w-3.5" />
            {heroLabel}
          </p>
          <h1 className="text-[clamp(4.4rem,12vw,8.5rem)] font-black leading-[0.9] tracking-[-0.045em]">글릿</h1>
          <div className="mt-4 flex items-center gap-4">
            <div className="h-px w-12 bg-au-rust" />
            <p className="text-lg font-semibold italic text-au-rust">Gleam it, Glit!</p>
          </div>
          <p className="mt-10 text-2xl font-bold leading-snug md:text-4xl">{heroCopy}</p>
          <p className="mt-4 max-w-md text-base leading-7 text-au-ink/70">{heroSub}</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <a
              href="#sentences"
              className="rounded-full bg-au-ink px-8 py-4 text-center text-sm font-bold text-au-cream transition-colors hover:bg-au-rust"
            >
              가을의 문장 읽기
            </a>
            <a href="/diagnosis" className="text-center text-sm font-semibold text-au-ink underline underline-offset-4">
              나의 문장 결 알아보기 →
            </a>
          </div>
        </div>

        <div className="felt stitch relative aspect-[4/5] overflow-hidden rounded-[36px] bg-au-sky shadow-[0_24px_60px_rgba(58,46,37,0.18)]">
          <Cloud className="absolute left-6 top-10 w-36" />
          <Cloud className="absolute right-4 top-32 w-28" />
          <Leaf kind="ginkgo" color="#F2C649" className="leaf-sway absolute right-16 top-14 h-12 w-12" />
          <Leaf
            kind="oval"
            color="#B5532E"
            className="leaf-sway absolute left-1/3 top-[38%] h-10 w-10"
            style={{ '--r': '30deg', animationDelay: '2s' } as React.CSSProperties}
          />
          <HillScene className="absolute inset-x-0 bottom-0 h-[58%] w-full" />
        </div>
      </div>
    </section>
  )
}

function Join({ felt }: { felt: boolean }) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      })
    } finally {
      setSubmitted(true)
    }
  }

  return (
    <section id="join" className="border-t border-au-ink/10">
      <div className={`felt relative overflow-hidden ${felt ? 'bg-au-sky' : 'bg-[#F2E8D5]'}`}>
      <div className={`relative z-10 mx-auto max-w-4xl px-5 pt-24 text-center md:pt-32 ${felt ? 'pb-[26vh] md:pb-[23vw]' : 'pb-20'}`}>
        <FadeUp>
          <FeltDiamond className="mx-auto mb-6 h-7 w-7" />
          <h2
            className={
              felt
                ? 'puffy font-jua text-5xl leading-tight md:text-6xl'
                : 'text-4xl font-black leading-tight tracking-[-0.035em] md:text-6xl'
            }
          >
            이번 가을,
            <br />
            문장 하나를 함께 받아보세요
          </h2>
          <p className={`mx-auto mt-6 max-w-xl text-base leading-8 md:text-lg ${felt ? 'text-au-ink/80' : 'text-au-ink/70'}`}>
            글릿은 쓰는 사람들의 공간입니다. 매월 발행되는 에디토리얼 소식을 받고, 직접 글을 보내 함께 만들어가요.
          </p>
        </FadeUp>

        <FadeUp delay={110}>
          <div className={`felt stitch stitch-dark mt-10 rounded-[28px] bg-au-cream p-4 md:p-5 ${felt ? 'shadow-[0_10px_0_rgba(58,46,37,0.12)]' : ''}`}>
            {submitted ? (
              <div className="px-4 py-8">
                <p className="text-xl font-black">글릿 소식을 받을 준비가 되었어요.</p>
                <p className="mt-2 text-sm text-au-ink/65">다음 에디토리얼에서 만나요.</p>
              </div>
            ) : (
              <form
                name="glit-subscribe"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="relative z-10 flex flex-col gap-3 sm:flex-row"
              >
                <input type="hidden" name="form-name" value="glit-subscribe" />
                <label htmlFor="join-email" className="sr-only">
                  이메일 주소
                </label>
                <input
                  id="join-email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소를 입력하세요"
                  required
                  className="min-h-14 flex-1 rounded-full border border-au-ink/15 bg-white px-5 text-sm outline-none transition-colors placeholder:text-au-ink/40 focus:border-au-rust"
                />
                <button
                  type="submit"
                  className="min-h-14 rounded-full bg-au-rust px-7 text-sm font-bold text-white transition-colors hover:bg-au-ink"
                >
                  소식 받아보기
                </button>
              </form>
            )}
          </div>
          <p className="mt-4 text-xs leading-6 text-au-ink/55">
            매월 발행됩니다. 구독 신청 시 이메일 수신과 개인정보처리방침에 동의한 것으로 간주됩니다.
          </p>
          <a
            href="https://instagram.com/gleamit_glit"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-sm font-semibold text-au-ink underline underline-offset-4"
          >
            쓴 글을 보내고 싶다면 → Instagram @gleamit_glit
          </a>
        </FadeUp>
      </div>

      {felt && <HillScene props={false} className="pointer-events-none absolute inset-x-0 bottom-0 h-[24vh] min-h-[160px] w-full md:h-[21vw] md:min-h-0" />}
      </div>
      <div className={`felt ${felt ? 'bg-au-cream' : 'bg-[#F2E8D5]'}`}>
        <SiteFooter />
      </div>
    </section>
  )
}
