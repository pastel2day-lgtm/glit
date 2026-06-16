'use client'
import { useState } from 'react'
import Diamond from '@/components/ui/Diamond'
import FadeUp from '@/components/ui/FadeUp'

export default function JoinSection() {
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
    <section id="join" className="border-t border-ink/10 bg-[#f8f1e7] px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <FadeUp>
          <div className="mb-6 flex justify-center">
            <Diamond className="h-5 w-5 text-coral" />
          </div>
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-coral">Join</p>
          <h2 className="text-4xl font-black leading-tight tracking-[-0.035em] text-ink md:text-6xl">
            당신의 글을
            <br />
            기다리고 있어요
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-sub md:text-lg">
            글잇은 쓰는 사람들의 공간입니다. 매주 발행되는 에디토리얼 소식을 받고,
            직접 글을 보내 함께 만들어가요.
          </p>
        </FadeUp>

        <FadeUp delay={110}>
          <div className="mt-12 border border-ink/10 bg-ivory/70 p-4 shadow-[0_26px_70px_rgba(46,43,40,0.07)] md:p-6">
            {submitted ? (
              <div className="px-4 py-8">
                <Diamond className="mx-auto mb-4 h-5 w-5 text-coral" />
                <p className="text-xl font-black text-ink">글잇 소식을 받을 준비가 되었어요.</p>
                <p className="mt-2 text-sm text-sub">다음 에디토리얼에서 만나요.</p>
              </div>
            ) : (
              <form
                name="glit-subscribe"
                method="POST"
                data-netlify="true"
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <input type="hidden" name="form-name" value="glit-subscribe" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="이메일 주소를 입력하세요"
                  required
                  className="min-h-14 flex-1 rounded-full border border-ink/15 bg-white px-5 text-sm text-ink outline-none transition-colors placeholder:text-sub/45 focus:border-coral"
                />
                <button
                  type="submit"
                  className="min-h-14 rounded-full bg-ink px-7 text-sm font-semibold text-ivory transition-all hover:-translate-y-0.5 hover:bg-coral"
                >
                  소식 받아보기
                </button>
              </form>
            )}
          </div>

          <p className="mt-4 text-xs text-sub/45">스팸 없이, 글과 소식만 보내드립니다.</p>

          <div className="my-9 flex items-center gap-4">
            <div className="h-px flex-1 bg-ink/10" />
            <span className="text-xs tracking-[0.2em] text-sub/40">또는</span>
            <div className="h-px flex-1 bg-ink/10" />
          </div>

          <a
            href="https://instagram.com/gleamit_glit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-coral px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-ink"
          >
            에디토리얼 보내러 가기
          </a>
        </FadeUp>

        <FadeUp delay={220}>
          <footer className="mt-16 border-t border-ink/10 pt-8">
            <div className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold text-sub">
              <Diamond className="h-3 w-3 text-coral" />
              <span>글잇 · Gleam it, Glit!</span>
            </div>
            <p className="text-xs text-sub/45">글을 쓰고 읽고 사는 모든 이를 위한 공간</p>
            <a
              href="https://instagram.com/gleamit_glit"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-xs font-semibold text-coral hover:text-ink"
            >
              @gleamit_glit
            </a>
          </footer>
        </FadeUp>
      </div>
    </section>
  )
}
