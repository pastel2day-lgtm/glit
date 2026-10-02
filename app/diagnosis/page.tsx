import type { Metadata } from 'next'
import DiagnosisQuiz from '@/components/diagnosis/DiagnosisQuiz'

export const metadata: Metadata = {
  title: '문장 결 검사',
  description:
    '36개의 질문으로 나의 문장 결을 찾고, 결에 맞는 책과 문장을 큐레이션 받아보세요.',
  openGraph: {
    title: '문장 결 검사 · 글릿',
    description:
      '36개의 질문으로 나의 문장 결을 찾고, 결에 맞는 책과 문장을 큐레이션 받아보세요.',
    type: 'website',
  },
}

export default function DiagnosisPage() {
  return (
    <>
      {/* Hidden form for Netlify Forms bot detection — 결과지의 큐레이션 신청 폼과 필드가 같아야 합니다. */}
      <form name="glit-curation-apply" data-netlify="true" netlify-honeypot="bot-field" className="hidden">
        <input type="hidden" name="form-name" value="glit-curation-apply" />
        <input type="text" name="bot-field" />
        <input type="text" name="name" />
        <input type="number" name="age" />
        <input type="tel" name="phone" />
        <input type="text" name="scores" />
        <input type="checkbox" name="privacy" />
      </form>
      <DiagnosisQuiz />
    </>
  )
}
