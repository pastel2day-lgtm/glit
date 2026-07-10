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
  return <DiagnosisQuiz />
}
