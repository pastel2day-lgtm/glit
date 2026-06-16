'use client'
import { useState } from 'react'
import FadeUp from '@/components/ui/FadeUp'
import Diamond from '@/components/ui/Diamond'

export default function JoinSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

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
    <section id="join" className="py-24 md:py-36 px-6 bg-ivory">
      <div className="max-w-2xl mx-auto text-center">
        <FadeUp>
          <div className="flex justify-center mb-5">
            <Diamond className="w-6 h-6 text-coral" />
          </div>
          <p className="text-coral text-xs font-medium tracking-widest uppercase mb-4">Join</p>
          <h2 className="text-3xl md:text-4xl font-bold text-ink mb-5">
            당신의 글을
            <br className="md:hidden" /> 기다리고 있어요
          </h2>
          <p className="text-sub text-base md:text-lg leading-relaxed mb-3">
            글릿은 쓰는 사람들의 공간입니다.
          </p>
          <p className="text-sub/70 text-sm md:text-base leading-relaxed mb-12">
            매주 발행되는 에디토리얼 소식을 받거나,
            <br />
            직접 글을 보내 함께 만들어가세요.
          </p>
        </FadeUp>

        <FadeUp delay={100}>
          {submitted ? (
            <div className="bg-coral/10 border border-coral/20 rounded-2xl p-8 mb-6">
              <Diamond className="w-5 h-5 text-coral mx-auto mb-3" />
              <p className="text-coral font-semibold text-lg">글릿 소식을 받아볼 준비가 됐어요!</p>
              <p className="text-sub text-sm mt-2">매주 에디토리얼 뉴스레터를 보내드립니다.</p>
            </div>
          ) : (
            <form
              name="glit-subscribe"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 mb-3"
            >
              <input type="hidden" name="form-name" value="glit-subscribe" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일 주소를 입력하세요"
                required
                className="flex-1 px-5 py-3.5 rounded-full border border-ink/20 bg-white text-ink placeholder:text-sub/50 focus:outline-none focus:border-coral transition-colors text-sm"
              />
              <button
                type="submit"
                className="bg-ink text-ivory px-6 py-3.5 rounded-full text-sm font-medium hover:bg-coral transition-colors whitespace-nowrap"
              >
                소식 받아보기
              </button>
            </form>
          )}

          <p className="text-sub/40 text-xs mb-8">스팸 없이, 글과 소식만 보내드립니다.</p>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-ink/10" />
            <span className="text-xs text-sub/40 tracking-wider">또는</span>
            <div className="h-px flex-1 bg-ink/10" />
          </div>

          <a
            href="https://instagram.com/gleamit_glit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto bg-coral text-white px-8 py-4 rounded-full text-base font-medium hover:bg-coral/90 transition-colors"
          >
            에디토리얼 보내러 가기
          </a>
        </FadeUp>

        <FadeUp delay={220}>
          <div className="mt-16 pt-8 border-t border-ink/10">
            <div className="flex items-center justify-center gap-2 text-sub text-sm mb-2">
              <Diamond className="w-3 h-3 text-coral" />
              <span>글릿 · Gleam it, Glit!</span>
            </div>
            <p className="text-sub/40 text-xs">글을 쓰고 읽고 사는 모든 이들의 공간</p>
            <a
              href="https://instagram.com/gleamit_glit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-xs text-coral hover:underline"
            >
              @gleamit_glit
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
