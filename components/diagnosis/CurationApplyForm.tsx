'use client'
import { useState } from 'react'
import { CURATION_SHEET_URL } from '@/lib/curationSheet'

type Status = 'idle' | 'sending' | 'done' | 'error'

const FORM_NAME = 'glit-curation-apply'

// 010-1234-5678 / 011-123-4567 꼴로 하이픈을 넣어줍니다.
function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length < 4) return digits
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`
  return `${digits.slice(0, 3)}-${digits.slice(3, digits.length - 4)}-${digits.slice(-4)}`
}

const inputClass =
  'min-h-14 w-full rounded-full border-2 border-transparent bg-white px-5 text-sm text-au-ink outline-none transition-colors placeholder:text-au-ink/35 focus:border-au-rust'

/**
 * 결과지 하단의 맞춤 큐레이션 신청 폼.
 * Netlify Forms(관리 화면·CSV)로 보내고, CURATION_SHEET_URL이 있으면 구글 스프레드시트에도 함께 보냅니다.
 */
export default function CurationApplyForm({ scores }: { scores: string }) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [phone, setPhone] = useState('')
  const [privacy, setPrivacy] = useState(false)
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    const body = new URLSearchParams(new FormData(event.currentTarget) as unknown as Record<string, string>).toString()
    const requests: Promise<boolean>[] = [
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      }).then((res) => res.ok),
    ]
    if (CURATION_SHEET_URL) {
      // Apps Script 웹 앱은 CORS 응답을 주지 않아서, 보내기만 하고 응답은 읽지 않습니다.
      requests.push(
        fetch(CURATION_SHEET_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body,
        }).then(() => true),
      )
    }

    const results = await Promise.allSettled(requests)
    const ok = results.some((r) => r.status === 'fulfilled' && r.value)
    setStatus(ok ? 'done' : 'error')
  }

  if (status === 'done') {
    return (
      <div className="relative z-10 py-4" role="status">
        <p className="font-jua text-2xl">신청이 접수됐어요</p>
        <p className="mt-3 text-sm leading-7 text-au-ink/80">
          남겨주신 번호로 48시간 안에
          <br />
          당신의 결에 맞는 책 목록을 보내드릴게요.
        </p>
      </div>
    )
  }

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="relative z-10 mx-auto mt-8 max-w-md space-y-3 text-left"
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <input type="hidden" name="scores" value={scores} />
      <p className="hidden">
        <label>
          비워두세요 <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid grid-cols-[1fr_6.5rem] gap-3">
        <label className="block">
          <span className="mb-1.5 block pl-4 text-xs font-semibold text-au-ink/70">이름</span>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름"
            autoComplete="name"
            maxLength={30}
            required
            className={inputClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block pl-4 text-xs font-semibold text-au-ink/70">나이</span>
          <input
            type="number"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="나이"
            inputMode="numeric"
            min={1}
            max={120}
            required
            className={inputClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block pl-4 text-xs font-semibold text-au-ink/70">휴대폰 번호</span>
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          placeholder="010-0000-0000"
          autoComplete="tel"
          inputMode="numeric"
          pattern="01[016789]-[0-9]{3,4}-[0-9]{4}"
          title="휴대폰 번호를 010-0000-0000 형식으로 입력해 주세요"
          required
          className={inputClass}
        />
      </label>

      <label className="flex items-start gap-2.5 px-2 pt-2 text-xs leading-5 text-au-ink/75">
        <input
          type="checkbox"
          name="privacy"
          checked={privacy}
          onChange={(e) => setPrivacy(e.target.checked)}
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-au-rust"
        />
        <span>
          <strong className="font-semibold text-au-ink">[필수] 개인정보 수집·이용 동의</strong> — 맞춤 큐레이션 전달을 위해
          이름·나이·휴대폰 번호·검사 결과를 수집하며, 전달이 끝나면 지체 없이 파기합니다. 동의하지 않으면 신청할 수 없어요.{' '}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
            개인정보처리방침
          </a>
        </span>
      </label>

      {status === 'error' && (
        <p className="px-2 text-xs font-semibold text-au-brick" role="alert">
          신청을 보내지 못했어요. 잠시 후 다시 시도해 주세요.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-2 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-au-rust px-8 text-base font-bold text-white shadow-[0_5px_0_#7E3A1F] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
      >
        {status === 'sending' ? '신청하는 중…' : '신청하기'}
      </button>
    </form>
  )
}
