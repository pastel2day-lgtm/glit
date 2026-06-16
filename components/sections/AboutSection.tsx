'use client'
import Diamond from '@/components/ui/Diamond'
import FadeUp from '@/components/ui/FadeUp'

const tags = ['에디토리얼', '인터뷰', '뉴스레터', '글쓰기 커뮤니티']

export default function AboutSection() {
  return (
    <section id="about" className="border-t border-ink/10 bg-ivory">
      <FadeUp>
        <div className="mx-auto max-w-6xl border-b border-ink/10 px-5 py-12 md:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.26em] text-coral">About</p>
          <h2 className="text-4xl font-black leading-none tracking-[-0.035em] text-ink md:text-7xl">
            About Glit
          </h2>
        </div>
      </FadeUp>

      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <FadeUp>
          <p className="max-w-4xl text-4xl font-black leading-tight tracking-[-0.035em] text-ink md:text-6xl">
            가장 작은 문장에서,
            <br />
            <span className="text-coral">가장 나다운 하루가</span> 시작됩니다.
          </p>
        </FadeUp>

        <FadeUp delay={110}>
          <div className="mt-12 grid gap-12 border-t border-ink/10 pt-12 md:grid-cols-[1fr_18rem]">
            <div className="space-y-6">
              <p className="text-lg leading-9 text-ink/76">
                글릿은 빛나는 글을 수집하는 에디토리얼 공간입니다. 쓰고 읽고 살아가는
                일의 태도를 함께 찾아가며, 작은 문장이 하루를 바꾸는 순간을 기록합니다.
              </p>
              <p className="text-base leading-8 text-sub">
                매주 발행되는 에디토리얼에는 작가들의 인터뷰, 에세이, 감상이 담깁니다.
                완결된 글 너머에서 오늘을 위한 한 줄이 당신에게 닿기를 바랍니다.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <span key={tag} className="border border-coral/25 px-3 py-1.5 text-xs font-semibold text-coral">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Info label="창간" value="2026년 봄" />
              <Info label="발행" value="매주 화요일" />
              <Info label="채널" value="@gleamit_glit" href="https://instagram.com/gleamit_glit" />
              <Info label="인터뷰" value="Writers' Voice" href="/interview" withDiamond />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Info({
  label,
  value,
  href,
  withDiamond = false,
}: {
  label: string
  value: string
  href?: string
  withDiamond?: boolean
}) {
  const content = (
    <span className="inline-flex items-center gap-2 font-bold text-coral transition-colors hover:text-ink">
      {withDiamond && <Diamond className="h-2.5 w-2.5" />}
      {value}
    </span>
  )

  return (
    <div className="border-l border-coral/35 pl-5">
      <p className="mb-1 text-xs uppercase tracking-[0.2em] text-sub/50">{label}</p>
      {href ? (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <p className="font-bold text-ink">{value}</p>
      )}
    </div>
  )
}
