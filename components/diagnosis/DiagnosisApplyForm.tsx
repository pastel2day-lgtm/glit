'use client'
import { useState } from 'react'
import Diamond from '@/components/ui/Diamond'

export default function DiagnosisApplyForm() {
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')
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
    <div className="flex min-h-screen flex-col bg-ink text-ivory">
      <header className="border-b border-white/10 px-6 py-5">
        <a href="/" className="flex items-center gap-2 text-sm font-bold text-ivory">
          <Diamond className="h-4 w-4 text-coral" />
          글릿
        </a>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[#1b1916] p-8 shadow-[0_32px_80px_rgba(0,0,0,0.25)]">
          <div className="mb-8 text-center">
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-coral/80">에센스 진단 신청</p>
            <h1 className="text-3xl font-black leading-tight">진단 신청서를 작성해주세요</h1>
            <p className="mt-3 text-sm leading-relaxed text-ivory/55">
              성함과 연락처를 남겨주시면 일정 확인을 위해 빠르게 안내드릴게요.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="mb-4 text-xs uppercase tracking-[0.32em] text-coral">완료</p>
              <h2 className="mb-3 text-2xl font-bold text-ivory">신청이 접수되었습니다</h2>
              <p className="text-sm leading-relaxed text-ivory/55">
                작성해주신 연락처로 일정 확인을 위해 곧 연락드릴게요.
              </p>
              <a
                href="/diagnosis"
                className="mt-8 inline-block rounded-full bg-coral px-7 py-3 text-sm font-semibold text-ink transition hover:bg-coral/90"
              >
                진단 페이지로 돌아가기
              </a>
            </div>
          ) : (
            <form
              name="glit-diagnosis-apply"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <input type="hidden" name="form-name" value="glit-diagnosis-apply" />

              <label className="block text-sm text-ivory/60">
                <span className="mb-2 block text-ivory/80">성함</span>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="성함을 입력해 주세요"
                  required
                  className="w-full rounded-full border border-white/10 bg-[#14120f] px-5 py-4 text-ivory outline-none transition placeholder:text-ivory/28 focus:border-coral"
                />
              </label>

              <label className="block text-sm text-ivory/60">
                <span className="mb-2 block text-ivory/80">연락처</span>
                <input
                  type="tel"
                  name="contact"
                  value={contact}
                  onChange={(event) => setContact(event.target.value)}
                  placeholder="연락처를 입력해 주세요"
                  required
                  className="w-full rounded-full border border-white/10 bg-[#14120f] px-5 py-4 text-ivory outline-none transition placeholder:text-ivory/28 focus:border-coral"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-coral px-6 py-4 text-sm font-semibold text-ink transition hover:bg-coral/90"
              >
                일정 확인 요청하기
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}
